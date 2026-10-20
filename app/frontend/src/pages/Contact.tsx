import QuoteForm from '@/components/QuoteForm';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Seo, { ORGANIZATION_ID, breadcrumbJsonLd } from '@/components/Seo';
import SiteLayout, { Breadcrumbs, WhatsAppCta } from '@/components/SiteLayout';
import {
  MANUFACTURER,
  SITE_URL,
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_ENABLED,
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_QUOTATION_MESSAGE,
  whatsappLink,
} from '@/lib/site';

const ENQUIRY_CHECKLIST = [
  'Company name and country',
  'Type of business (distributor, wholesaler, hospital supplier, importer)',
  'Estimated quantity and required packaging configuration',
  'Documents required for import review or registration in your market',
  'Preferred delivery terms and destination port or city',
];

/** Contact page — WhatsApp, email and telephone, no submitting form. */
export default function Contact() {
  const path = '/contact';
  const title = 'Contact AGNAVELIS for B2B Export Enquiries | AGNAVELIS';
  const description =
    'Contact the AGNAVELIS manufacturer by WhatsApp, email or telephone for silver nitrate applicator stick distribution, import and export enquiries.';

  const contactPage = {
    '@type': 'ContactPage',
    '@id': `${SITE_URL}${path}#contactpage`,
    url: `${SITE_URL}${path}`,
    name: 'Contact AGNAVELIS',
    about: { '@id': ORGANIZATION_ID },
    mainEntity: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: MANUFACTURER.legalName,
      email: MANUFACTURER.email,
      telephone: MANUFACTURER.phone,
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: MANUFACTURER.street,
        addressLocality: MANUFACTURER.district,
        addressRegion: MANUFACTURER.city,
        addressCountry: 'TR',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: MANUFACTURER.email,
          telephone: MANUFACTURER.phone,
          areaServed: 'Worldwide',
          availableLanguage: ['English', 'Turkish'],
        },
      ],
    },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Contact', path },
  ]);

  return (
    <SiteLayout>
      <Seo
        title={title}
        description={description}
        path={path}
        jsonLd={[contactPage, breadcrumbs]}
      />

      <div className="site-container pt-8">
        <Breadcrumbs current="Contact" />
      </div>

      <section className="site-container py-10 lg:py-14">
        <div className="max-w-3xl">
          <h1>Contact for B2B Export Enquiries</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            AGNAVELIS Silver Nitrate Applicator Sticks are supplied business-to-business
            only. Enquiries from medical device distributors, hospital and clinic
            suppliers, healthcare wholesalers and importers are answered directly by the
            manufacturer, {MANUFACTURER.legalName}.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This website does not offer consumer sales, online ordering or published
            pricing. Prices, packaging configurations and export terms are quoted per
            enquiry.
          </p>
        </div>
      </section>

      <QuoteForm />

      {/* Contact channels */}
      <section
        aria-labelledby="channels-heading"
        className="border-y border-border bg-secondary/45 py-14"
      >
        <div className="site-container">
          <h2 id="channels-heading">Contact Channels</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {WHATSAPP_ENABLED && (
              <article className="flex flex-col rounded-lg border border-accent/40 bg-card p-6">
                <MessageCircle aria-hidden="true" className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-base">WhatsApp (fastest)</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  The quickest way to reach the manufacturer. The link opens WhatsApp with
                  a prefilled English enquiry message that you can edit before sending.
                </p>
                <a
                  href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm font-semibold text-accent underline underline-offset-4"
                >
                  {WHATSAPP_NUMBER_DISPLAY}
                </a>
                <div className="mt-5">
                  <WhatsAppCta message={WHATSAPP_QUOTATION_MESSAGE}>
                    Start a WhatsApp enquiry
                  </WhatsAppCta>
                </div>
              </article>
            )}

            <article className="flex flex-col rounded-lg border border-border bg-card p-6">
              <Mail aria-hidden="true" className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-base">Email</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                Suitable for detailed enquiries, documentation requests and formal
                correspondence with attachments.
              </p>
              <a
                href={`mailto:export@agnavelis.com?subject=${encodeURIComponent(
                  'AGNAVELIS Silver Nitrate Applicator Sticks — B2B export enquiry'
                )}`}
                className="mt-4 text-sm font-semibold text-accent underline underline-offset-4"
              >
                export@agnavelis.com
              </a>
            </article>

            <article className="flex flex-col rounded-lg border border-border bg-card p-6">
              <Phone aria-hidden="true" className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-base">Telephone</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                Direct line to the manufacturer in İzmir, Türkiye, during Turkish business
                hours.
              </p>
              <a
                href={`tel:${MANUFACTURER.phone.replace(/\s/g, '')}`}
                className="mt-4 text-sm font-semibold text-accent underline underline-offset-4"
              >
                {MANUFACTURER.phone}
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Address and checklist */}
      <section aria-labelledby="address-heading" className="site-container py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="address-heading">Manufacturer Address</h2>
            <div className="mt-5 flex gap-3 rounded-lg border border-border bg-card p-6">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <address className="text-sm not-italic leading-relaxed text-muted-foreground">
                <strong className="block font-semibold text-primary">
                  {MANUFACTURER.legalName}
                </strong>
                {MANUFACTURER.street}
                <br />
                {MANUFACTURER.district} / {MANUFACTURER.city}
                <br />
                {MANUFACTURER.country}
                <br />
                <a
                  href={MANUFACTURER.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-medium text-accent underline underline-offset-4"
                >
                  {MANUFACTURER.websiteLabel}
                </a>
              </address>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Company details, brand ownership and manufacturing responsibility are
              described on the{' '}
              <Link
                to="/manufacturer"
                className="font-medium text-accent underline underline-offset-4"
              >
                manufacturer page
              </Link>
              .
            </p>
          </div>

          <div>
            <h2>What to Include in Your Enquiry</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Including the following information in your first message allows the
              manufacturer to reply with relevant details immediately.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {ENQUIRY_CHECKLIST.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg border border-border bg-secondary/50 p-6">
              <h3 className="text-base">Professional buyers only</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                AGNAVELIS Silver Nitrate Applicator Sticks are intended for use by trained
                healthcare professionals. The manufacturer does not supply the product to
                private consumers, and this website does not provide medical advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="site-container pb-14 lg:pb-20">
        <div className="rounded-lg bg-primary px-6 py-12 text-center sm:px-12">
          <h2 className="!text-primary-foreground">Ready to discuss distribution?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Send your company name, destination country and estimated quantity to receive
            product information and export terms for your market.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppCta message={WHATSAPP_QUOTATION_MESSAGE} variant="onDark">
              Request an Export Quotation
            </WhatsAppCta>
            <a
              href={`mailto:export@agnavelis.com?subject=${encodeURIComponent(
                'AGNAVELIS Silver Nitrate Applicator Sticks — B2B export enquiry'
              )}`}
              className="inline-flex items-center justify-center rounded-md border border-white/40
                px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors
                duration-200 hover:md:bg-white/10"
            >
              Send an email instead
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
