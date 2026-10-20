import asyncio
import hashlib
import json
import os
import re
import smtplib
import ssl
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from sqlalchemy import select, func, text
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from core.telemetry import observe_external_http
from models.quote_requests import Quote_requests

router = APIRouter(prefix="/api/v1/quote", tags=["quote"])
COUNTRIES = set("AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split())

class QuoteInput(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    company_name: str = Field(min_length=1, max_length=200)
    country: str
    quantity_packs: int = Field(strict=True, gt=0, le=1000000000)
    contact_name: str = Field(min_length=1, max_length=120)
    business_email: EmailStr
    phone: str = Field(default="", max_length=80)
    message: str = Field(default="", max_length=5000)
    website: str = Field(default="", max_length=200)
    elapsed_ms: int = Field(ge=2000)
    request_key: str = Field(pattern=r"^[a-f0-9-]{36}$")

    @field_validator("country")
    @classmethod
    def valid_country(cls, value):
        if value not in COUNTRIES:
            raise ValueError("Select a country")
        return value

    @field_validator("company_name", "contact_name", "phone")
    @classmethod
    def no_header_injection(cls, value):
        if "\r" in value or "\n" in value:
            raise ValueError("Invalid field")
        return value


def smtp_config():
    names = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD"]
    if not all(os.getenv(name) for name in names):
        raise HTTPException(503, "Email submission is not configured. Please contact us by WhatsApp or email.")
    try:
        port = int(os.environ["SMTP_PORT"])
    except ValueError:
        raise HTTPException(503, "Email submission is not configured.")
    return os.environ["SMTP_HOST"], port, os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"]


def send_email(data: QuoteInput):
    host, port, user, password = smtp_config()
    msg = EmailMessage()
    msg["From"] = "AGNAVELIS <export@agnavelis.com>"
    msg["To"] = "export@agnavelis.com"
    msg["Reply-To"] = str(data.business_email)
    msg["Subject"] = "AGNAVELIS B2B quote request"
    msg["Message-ID"] = f"<{data.request_key}@agnavelis.com>"
    msg.set_content("\n".join([
        f"Company name: {data.company_name}", f"Country: {data.country}",
        f"Quantity requested (packs): {data.quantity_packs}", "1 pack = 100 sticks",
        f"Contact name: {data.contact_name}", f"Business email: {data.business_email}",
        f"Phone / WhatsApp: {data.phone or '(not provided)'}",
        f"Message: {data.message or '(not provided)'}", f"Request ID: {data.request_key}",
    ]))
    cls = smtplib.SMTP_SSL if port == 465 else smtplib.SMTP
    kwargs = {"context": ssl.create_default_context()} if port == 465 else {}
    with cls(host, port, timeout=20, **kwargs) as smtp:
        if port != 465:
            smtp.starttls(context=ssl.create_default_context())
        smtp.login(user, password)
        refused = smtp.send_message(msg)
        if refused:
            raise RuntimeError("Recipient refused")


def check_smtp():
    host, port, user, password = smtp_config()
    cls = smtplib.SMTP_SSL if port == 465 else smtplib.SMTP
    kwargs = {"context": ssl.create_default_context()} if port == 465 else {}
    with cls(host, port, timeout=15, **kwargs) as smtp:
        if port != 465:
            smtp.starttls(context=ssl.create_default_context())
        smtp.login(user, password)


@router.get("/status")
async def quote_status():
    try:
        if os.getenv("QUOTE_EMAIL_ENABLED", "false").lower() != "true":
            return {"configured": False}
        await observe_external_http(asyncio.to_thread(check_smtp))
        return {"configured": True}
    except Exception:
        return {"configured": False}


@router.post("/submit")
async def submit_quote(data: QuoteInput, request: Request, db: AsyncSession = Depends(get_db)):
    if data.website:
        raise HTTPException(422, "Submission rejected.")
    if os.getenv("QUOTE_EMAIL_ENABLED", "false").lower() != "true":
        raise HTTPException(503, "Online quote submission is not enabled. Please contact us by WhatsApp or email.")
    smtp_config()
    payload = data.model_dump(exclude={"website", "elapsed_ms", "request_key"}, mode="json")
    digest = hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()
    # Hash trusted connection address; never trust client-supplied forwarding headers.
    ip_hash = hashlib.sha256((request.client.host if request.client else "unknown").encode()).hexdigest()
    # Serialize short reservation transactions across server instances.
    await db.execute(text("SELECT pg_advisory_xact_lock(73409121)"))
    existing = await db.scalar(select(Quote_requests).where(Quote_requests.request_key == data.request_key))
    if existing:
        state = existing.status
        same = existing.payload_hash == digest
        await db.commit()
        if not same:
            raise HTTPException(409, "Request ID already used. Reload the form for a new request.")
        if state == "accepted":
            return {"accepted": True, "request_id": data.request_key}
        raise HTTPException(409, "This request has already been attempted. Contact us if its status is uncertain.")
    since = datetime.now(timezone.utc) - timedelta(minutes=10)
    recent = await db.scalar(select(func.count()).select_from(Quote_requests).where(
        Quote_requests.ip_hash == ip_hash, Quote_requests.created_at >= since))
    duplicate = await db.scalar(select(Quote_requests.id).where(
        Quote_requests.payload_hash == digest, Quote_requests.created_at >= since,
        Quote_requests.status.in_(["pending", "accepted", "uncertain"])).limit(1))
    if recent >= 5 or duplicate:
        await db.commit()
        raise HTTPException(429, "Please wait before submitting again or contact us by WhatsApp.")
    record = Quote_requests(request_key=data.request_key, payload_hash=digest, ip_hash=ip_hash, status="pending")
    db.add(record)
    await db.commit()
    record_id = record.id
    try:
        await observe_external_http(asyncio.to_thread(send_email, data))
    except Exception:
        record = await db.get(Quote_requests, record_id)
        record.status = "uncertain"
        await db.commit()
        raise HTTPException(502, "Email submission could not be confirmed. Your details are preserved. Please contact us by WhatsApp or email; do not repeat this request.")
    record = await db.get(Quote_requests, record_id)
    record.status = "accepted"
    await db.commit()
    return {"accepted": True, "request_id": data.request_key}
