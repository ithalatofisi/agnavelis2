import { FormEvent, useEffect, useRef, useState } from 'react';
import { trackLeadOnce } from '@/lib/analytics';
import { WhatsAppCta } from '@/components/SiteLayout';
import { WHATSAPP_QUOTATION_MESSAGE } from '@/lib/site';

const CODES = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
const names = new Intl.DisplayNames(['en'], { type: 'region' });
const countries = CODES.map(code => ({ code, name: names.of(code) || code })).sort((a, b) => a.name.localeCompare(b.name));
const inputClass = 'mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-base text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

export default function QuoteForm() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const busy = useRef(false);
  const started = useRef(Date.now());
  const requestKey = useRef('');
  useEffect(() => {
    if (window.location.hash === '#b2b-quote') document.getElementById('b2b-quote')?.scrollIntoView();
    let active = true;
    import('@/lib/api').then(({ client }) => client.apiCall.invoke({ url: '/api/v1/quote/status', method: 'GET' }))
      .then(res => { if (active) setConfigured(res.data?.configured === true); })
      .catch(() => { if (active) setConfigured(false); });
    return () => { active = false; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (busy.current || success || configured !== true) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const quantity = String(values.get('quantity_packs') || '');
    if (!/^[1-9]\d*$/.test(quantity) || Number(quantity) > 1000000000) {
      setError('Enter a positive whole number of packs.'); return;
    }
    if (!String(values.get('company_name')).trim() || !String(values.get('contact_name')).trim()) {
      setError('Please enter your company name and contact name.'); return;
    }
    if (Date.now() - started.current < 2000) { setError('Please review your details before submitting.'); return; }
    busy.current = true;
    setSending(true); setError('');
    if (!requestKey.current) requestKey.current = crypto.randomUUID();
    try {
      const { client } = await import('@/lib/api');
      const res = await client.apiCall.invoke({ url: '/api/v1/quote/submit', method: 'POST', data: {
        company_name: String(values.get('company_name')).trim(),
        country: String(values.get('country')),
        quantity_packs: Number(quantity),
        contact_name: String(values.get('contact_name')).trim(),
        business_email: String(values.get('business_email')).trim(),
        phone: String(values.get('phone') || '').trim(), message: String(values.get('message') || '').trim(),
        website: String(values.get('website') || ''), elapsed_ms: Date.now() - started.current,
        request_key: requestKey.current,
      } });
      if (res.data?.accepted !== true || res.data?.request_id !== requestKey.current) throw new Error('Not accepted');
      setSuccess(true);
      trackLeadOnce(requestKey.current);
    } catch {
      setError('Your submission could not be confirmed. Your details are preserved. Please use WhatsApp or email if the problem persists.');
    } finally { busy.current = false; setSending(false); }
  }

  return (
    <section id="b2b-quote" aria-labelledby="quote-heading" className="site-container scroll-mt-24 py-10 lg:py-14">
      <div className="max-w-3xl rounded-lg border border-border bg-card p-6 sm:p-8">
        <h2 id="quote-heading">Request a B2B Quote</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">For distributors, importers and medical supply companies. Please share your company details, destination country and required quantity.</p>
        {configured !== true && <p role="status" className="mt-4 text-sm text-muted-foreground">{configured === null ? 'Checking email submission availability…' : 'Online quote submission is unavailable. Please contact export@agnavelis.com or use WhatsApp below.'}</p>}
        <form id="b2b-quote-form" onSubmit={submit} className="mt-6">
          <fieldset disabled={sending || success} className="grid min-w-0 gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-primary">Company name *<input className={inputClass} name="company_name" required maxLength={200} autoComplete="organization" /></label>
            <label className="text-sm font-medium text-primary">Country *<select className={inputClass} name="country" required defaultValue="" autoComplete="country"><option value="" disabled>Select a country</option>{countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}</select></label>
            <label className="text-sm font-medium text-primary">Quantity requested (packs) *<input className={inputClass} name="quantity_packs" type="number" min="1" max="1000000000" step="1" required inputMode="numeric" aria-describedby="pack-note" /><span id="pack-note" className="mt-2 block text-xs text-muted-foreground">1 pack = 100 sticks</span></label>
            <label className="text-sm font-medium text-primary">Contact name *<input className={inputClass} name="contact_name" required maxLength={120} autoComplete="name" /></label>
            <label className="text-sm font-medium text-primary">Business email *<input className={inputClass} name="business_email" type="email" required maxLength={254} autoComplete="email" /></label>
            <label className="text-sm font-medium text-primary">Phone / WhatsApp (including country code)<input className={inputClass} name="phone" type="tel" maxLength={80} autoComplete="tel" /></label>
            <label className="text-sm font-medium text-primary sm:col-span-2">Message<textarea className={inputClass} name="message" rows={4} maxLength={5000} /></label>
            <div aria-hidden="true" className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <button disabled={sending || success || configured !== true} type="submit" className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">{sending ? 'Sending…' : 'Request a B2B Quote'}</button>
          </fieldset>
          {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
          {success && <p role="status" className="mt-4 text-sm text-primary">Your quote request has been accepted for email delivery. Thank you.</p>}
        </form>
        <p className="mt-5 text-xs text-muted-foreground">Your details are used to respond to your business enquiry. Required fields are marked *.</p>
        <div className="mt-5 flex flex-wrap items-center gap-4"><WhatsAppCta message={WHATSAPP_QUOTATION_MESSAGE}>Contact us on WhatsApp</WhatsAppCta><a href="mailto:export@agnavelis.com" className="text-sm font-medium text-accent underline">export@agnavelis.com</a></div>
      </div>
    </section>
  );
}
