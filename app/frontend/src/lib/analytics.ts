type QuoteEvent = 'quote_form_click' | 'generate_lead' | 'whatsapp_click';
type EventParams = { form_id?: string; cta_location: string; product_id: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
const CONSENT_KEY = 'agnavelis-analytics-consent';
const MEASUREMENT_ID = 'G-7TMC0025H8';
let enabled = false;
let initialized = false;
const measuredLeads = new Set<string>();

export function readAnalyticsConsent(): string | null {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

function safePageLocation(): string {
  // Do not forward query strings, hashes, form values or arbitrary paths.
  const paths = ['/', '/contact', '/silver-nitrate-applicator-sticks', '/manufacturer', '/quality-documentation', '/instructions-for-use'];
  const path = location.pathname.replace(/\/$/, '') || '/';
  return location.origin + (paths.includes(path) ? path : '/');
}

export function setAnalyticsConsent(allowed: boolean): void {
  enabled = allowed;
  try { localStorage.setItem(CONSENT_KEY, allowed ? 'granted' : 'denied'); } catch { /* Session-only choice. */ }
  if (!allowed) {
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    // Hard-disable subsequent analytics, including automatic measurement.
    (window as unknown as Record<string, unknown>)[`ga-disable-${MEASUREMENT_ID}`] = true;
    return;
  }
  (window as unknown as Record<string, unknown>)[`ga-disable-${MEASUREMENT_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer!.push(args); };
  window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  if (!initialized) {
    initialized = true;
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      send_page_view: false,
      page_location: safePageLocation(),
      page_referrer: location.origin,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
    window.gtag('event', 'page_view', { page_location: safePageLocation() });
  }
}

export function trackQuoteEvent(name: QuoteEvent, params: EventParams): void {
  if (!enabled || !window.gtag) return;
  window.gtag('event', name, { ...params, page_location: safePageLocation() });
}

export function trackLeadOnce(requestId: string): void {
  if (measuredLeads.has(requestId)) return;
  measuredLeads.add(requestId);
  trackQuoteEvent('generate_lead', { form_id: 'b2b-quote', cta_location: 'contact_form', product_id: 'silver-nitrate-applicator-sticks' });
}

export function initializeAnalytics(): void {
  // Register before loading GA4 so WhatsApp message URLs cannot reach automatic click tracking.
  document.addEventListener('click', (event) => {
    const anchor = (event.target as Element)?.closest?.('a');
    if (!anchor) return;
    let url: URL;
    try { url = new URL(anchor.href); } catch { return; }
    if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com' || url.protocol === 'whatsapp:') {
      event.stopImmediatePropagation();
      const section = anchor.closest('header') ? 'header' : anchor.closest('footer') ? 'footer' : anchor.classList.contains('fixed') ? 'sticky' : 'page';
      trackQuoteEvent('whatsapp_click', { cta_location: section, product_id: 'silver-nitrate-applicator-sticks' });
    } else if (anchor.dataset.quoteLocation) {
      trackQuoteEvent('quote_form_click', { form_id: 'b2b-quote', cta_location: anchor.dataset.quoteLocation, product_id: 'silver-nitrate-applicator-sticks' });
    }
  }, true);
  if (readAnalyticsConsent() === 'granted') setAnalyticsConsent(true);
}
