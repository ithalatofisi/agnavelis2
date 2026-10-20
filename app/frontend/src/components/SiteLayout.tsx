import AnalyticsConsent from '@/components/AnalyticsConsent';
import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MessageCircle, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  MANUFACTURER,
  NAV,
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_ENABLED,
  WHATSAPP_NUMBER_DISPLAY,
  whatsappLink,
} from '@/lib/site';

/* ------------------------------------------------------------------------- */
/* WhatsApp CTA                                                               */
/* ------------------------------------------------------------------------- */

interface WhatsAppCtaProps {
  message: string;
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'onDark';
  className?: string;
}

/**
 * Crawlable anchor that opens WhatsApp with a prefilled English message.
 * Renders nothing when no valid number has been configured.
 */
export function WhatsAppCta({
  message,
  children,
  variant = 'primary',
  className = '',
}: WhatsAppCtaProps) {
  if (!WHATSAPP_ENABLED) {
    return null;
  }

  const base =
    'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold ' +
    'transition-colors duration-200 focus-visible:outline focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2';

  const variants: Record<string, string> = {
    primary: 'bg-accent text-accent-foreground hover:md:bg-accent/90',
    outline:
      '!bg-transparent hover:md:!bg-transparent border border-primary/30 text-primary hover:md:border-primary',
    onDark: 'bg-white text-primary hover:md:bg-white/90',
  };

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contact AGNAVELIS on WhatsApp — ${WHATSAPP_NUMBER_DISPLAY}`}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

/** Fixed WhatsApp button, visible on mobile and desktop. */
function StickyWhatsApp() {
  if (!WHATSAPP_ENABLED) {
    return null;
  }

  return (
    <a
      href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Send a B2B import enquiry to AGNAVELIS on WhatsApp"
      className="fixed bottom-5 right-4 z-50 inline-flex items-center gap-2 rounded-full
        bg-[#128C7E] px-4 py-3 text-sm font-semibold text-white shadow-md
        transition-colors duration-200 hover:md:bg-[#0f7568] sm:bottom-6 sm:right-6"
    >
      <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
      <span className="hidden sm:inline">Export enquiry</span>
      <span className="sr-only sm:hidden">Export enquiry on WhatsApp</span>
    </a>
  );
}

/* ------------------------------------------------------------------------- */
/* Brand mark                                                                 */
/* ------------------------------------------------------------------------- */

function BrandMark() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5"
      aria-label="AGNAVELIS — go to the home page"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-md bg-primary
          text-sm font-bold text-primary-foreground"
      >
        AG
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-[0.14em] text-primary">
          AGNAVELIS
        </span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Silver Nitrate Applicators
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------------- */
/* Header                                                                     */
/* ------------------------------------------------------------------------- */

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded px-3 py-2 text-sm font-medium transition-colors duration-200',
      isActive
        ? 'text-accent'
        : 'text-primary/80 hover:md:text-accent',
    ].join(' ');

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="site-container flex h-16 items-center justify-between gap-4 sm:h-20">
        <BrandMark />

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href} className={linkClass} end={item.href === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <WhatsAppCta
            message={WHATSAPP_DEFAULT_MESSAGE}
            className="!px-4 !py-2.5"
          >
            Export enquiry
          </WhatsAppCta>
        </div>

        <Sheet>
          <SheetTrigger
            aria-label="Open the navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md
              border border-border text-primary lg:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-xs">
            <SheetTitle className="text-left text-base">Navigation</SheetTitle>
            <nav aria-label="Mobile navigation" className="mt-6">
              <ul className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        [
                          'block rounded px-3 py-3 text-base font-medium',
                          isActive ? 'bg-secondary text-accent' : 'text-primary',
                        ].join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------------- */
/* Footer                                                                     */
/* ------------------------------------------------------------------------- */

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="site-container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-base font-bold tracking-[0.14em]">AGNAVELIS</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/80">
            Silver Nitrate Applicator Sticks with rigid wooden shafts, manufactured
            for international professional healthcare supply channels.
          </p>
          <p className="mt-4 text-sm text-primary-foreground/80">
            Manufactured by {MANUFACTURER.legalName}
            <br />
            {MANUFACTURER.district} / {MANUFACTURER.city}, {MANUFACTURER.country}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-semibold uppercase tracking-wider !text-primary-foreground">
            Site
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-primary-foreground/80 underline-offset-4
                    transition-colors duration-200 hover:md:text-white hover:md:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider !text-primary-foreground">
            Export enquiries
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-primary-foreground/80">
            <li>
              <a
                href={`mailto:${MANUFACTURER.email}`}
                className="underline-offset-4 hover:md:text-white hover:md:underline"
              >
                {MANUFACTURER.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${MANUFACTURER.phone.replace(/\s/g, '')}`}
                className="underline-offset-4 hover:md:text-white hover:md:underline"
              >
                {MANUFACTURER.phone}
              </a>
            </li>
            {WHATSAPP_ENABLED && (
              <li>
                <a
                  href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact AGNAVELIS on WhatsApp"
                  className="underline-offset-4 hover:md:text-white hover:md:underline"
                >
                  WhatsApp {WHATSAPP_NUMBER_DISPLAY}
                </a>
              </li>
            )}
            <li>
              <a
                href={MANUFACTURER.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:md:text-white hover:md:underline"
              >
                {MANUFACTURER.websiteLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="site-container flex flex-col gap-4 py-8 text-xs leading-relaxed text-primary-foreground/70">
          <p>
            <strong className="font-semibold text-primary-foreground/90">
              Medical information disclaimer:
            </strong>{' '}
            This website provides product and business information for medical device
            distributors, healthcare wholesalers, importers and healthcare professionals.
            It is not medical advice and does not replace the Instructions for Use.
            AGNAVELIS Silver Nitrate Applicator Sticks are for professional use only and
            must be used strictly in accordance with the current Instructions for Use and
            applicable local regulations. Product availability and registration
            requirements differ between countries.
          </p>
          <p>
            <strong className="font-semibold text-primary-foreground/90">
              Privacy notice:
            </strong>{' '}
            Optional Google Analytics is enabled only with your consent. Quote form
            details are sent to the manufacturer to answer your business enquiry and are
            not included in analytics events. You can change your analytics preference
            below. Details sent by WhatsApp, email or telephone are used to respond to
            your enquiry.
          </p>
          <p>
            © {year} {MANUFACTURER.legalName}. AGNAVELIS is a brand of{' '}
            {MANUFACTURER.shortName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------------- */
/* Page shell                                                                 */
/* ------------------------------------------------------------------------- */

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <AnalyticsConsent />
      <StickyWhatsApp />
    </div>
  );
}

/** Visible breadcrumb trail for inner pages, using crawlable anchors. */
export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            to="/"
            className="underline-offset-4 transition-colors duration-200 hover:md:text-accent hover:md:underline"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="font-medium text-primary">{current}</li>
      </ol>
    </nav>
  );
}
