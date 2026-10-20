"""Quote reservation records are private to the quote submission endpoint."""
from fastapi import APIRouter

# Do not expose generated public CRUD for spam/idempotency reservations.
router = APIRouter(prefix="/api/v1/quote_requests", tags=["quote_requests"])
