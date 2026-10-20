import { useState } from 'react';
import { readAnalyticsConsent, setAnalyticsConsent } from '@/lib/analytics';

export default function AnalyticsConsent() {
  const [open, setOpen] = useState(() => readAnalyticsConsent() === null);
  const choose = (allowed: boolean) => { setAnalyticsConsent(allowed); setOpen(false); };
  return (
    <>
      <div className="site-container py-3 text-center">
        <button type="button" className="text-xs text-muted-foreground underline underline-offset-4" onClick={() => setOpen(true)}>Analytics preferences</button>
      </div>
      {open && (
        <section aria-label="Analytics preferences" className="fixed bottom-0 left-0 z-[60] w-full border-t border-border bg-background p-4 shadow-lg sm:max-w-lg sm:rounded-tr-lg">
          <p className="text-sm text-primary">Optional analytics help us understand quote and WhatsApp interactions. We do not send your enquiry details to Google Analytics. You can accept or reject analytics without affecting the form.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose(false)} className="rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary">Reject analytics</button>
            <button type="button" onClick={() => choose(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Accept analytics</button>
          </div>
        </section>
      )}
    </>
  );
}
