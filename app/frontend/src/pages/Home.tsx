import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Seo, { ORGANIZATION_ID } from '@/components/Seo';
import QuoteCta from '@/components/QuoteCta';
import SiteLayout from '@/components/SiteLayout';
import {
  FAQ,
  IFU_DOCUMENT,
  IMAGES,
  MANUFACTURER,
  SITE_URL,
} from '@/lib/site';

const GLANCE = [
  { label: 'Composition', value: '75% silver nitrate / 25% potassium nitrate' },
  { label: 'Applicator shaft', value: 'Rigid wooden shaft' },
  { label: 'Sterility', value: 'Non-sterile' },
  { label: 'Reuse', value: 'Single use only' },
  { label: 'Device status', value: 'Medical device, Class I' },
  { label: 'Country of manufacture', value: 'Türkiye' },
];

const CHANNELS = [
  {
    title: 'Medical device distributors',
    body: 'National and regional distributors building a wound care, stoma care or minor procedure portfolio.',
  },
  {
    title: 'Hospital and clinic suppliers',
    body: 'Suppliers serving hospital procurement, outpatient clinics and specialist departments.',
  },
  {
    title: 'Healthcare wholesalers',
    body: 'Wholesale operations supplying pharmacies, clinics and medical retailers within their market.',
  },
  {
    title: 'Importers',
    body: 'Importers who handle product registration and customs clearance in their destination country.',
  },
];

const REASONS = [
  {
    title: 'Defined 75/25 formulation',
    body: 'Every applicator tip carries a 75% silver nitrate and 25% potassium nitrate formulation, stated consistently on the label, in the brochure and in the Instructions for Use.',
  },
  {
    title: 'Rigid wooden shaft',
    body: 'Rigid wooden shaft designed to support controlled and precise placement of the treated tip during application.',
  },
  {
    title: 'Professional supply positioning',
    body: 'Supplied for professional use only, with clear non-sterile and single-use status so procurement teams can assess suitability without ambiguity.',
  },
  {
    title: 'Documentation with the product',
    body: `A bilingual English and Turkish Instructions for Use document (${IFU_DOCUMENT.number}, ${IFU_DOCUMENT.revision}) accompanies the product and is published on this website.`,
  },
  {
    title: 'Direct manufacturer contact',
    body: 'Enquiries are answered by the manufacturer in Türkiye, without an intermediary between the buyer and the production source.',
  },
  {
    title: 'ISO 15223-1 label symbols',
    body: 'Label symbols follow ISO 15223-1 for the information supplied by the manufacturer, supporting review by importers and regulatory teams.',
  },
];

const DOCUMENTS = [
  {
    title: 'Instructions for Use',
    body: `${IFU_DOCUMENT.number}, ${IFU_DOCUMENT.revision}, issued ${IFU_DOCUMENT.issueDate}. English and Turkish in a single document.`,
    status: 'Available now',
  },
  {
    title: 'Product brochure',
    body: 'Two-page professional brochure covering the formulation, typical applications and key product information.',
    status: 'Available now',
  },
  {
    title: 'Technical product information',
    body: 'Composition, presentation, handling and storage details compiled for procurement and product assessment.',
    status: 'On request',
  },
  {
    title: 'Quality and regulatory documents',
    body: 'Documents required for import review or registration in your market are discussed and provided on request.',
    status: 'On request',
  },
];

/** Home page: hero, product summary, audience, differentiators, FAQ and CTA. */
export default function Home() {
  const title = 'Silver Nitrate Applicator Sticks for B2B Buyers | AGNAVELIS';
  const description =
    'Discover AGNAVELIS silver nitrate applicator sticks for distributors and B2B buyers. Contact us for product details and an export quotation.';

  const organization = {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: MANUFACTURER.legalName,
    alternateName: 'AGNAVELIS',
    url: SITE_URL,
    email: MANUFACTURER.email,
    telephone: MANUFACTURER.phone,
    sameAs: [MANUFACTURER.website],
    address: {
      '@type': 'PostalAddress',
      streetAddress: MANUFACTURER.street,
      addressLocality: MANUFACTURER.district,
      addressRegion: MANUFACTURER.city,
      addressCountry: 'TR',
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'AGNAVELIS',
    inLanguage: 'en',
    publisher: { '@id': ORGANIZATION_ID },
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: FAQ.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };

  return (
    <SiteLayout>
      <Seo
        title={title}
        description={description}
        path="/"
        jsonLd={[organization, website, faqPage]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/60 to-background">
        <div className="site-container grid items-center gap-10 py-14 lg:grid-cols-5 lg:gap-12 lg:py-20">
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              International B2B supply · Made in Türkiye
            </p>
            <h1 className="mt-4">
              Silver Nitrate Applicator Sticks for B2B Buyers
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              AGNAVELIS applicator sticks combine 75% silver nitrate and 25% potassium
              nitrate on a rigid wooden shaft. Manufactured in Türkiye for professional
              healthcare supply channels.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuoteCta location="home_hero">
                Request a Quote
              </QuoteCta>
              <Link
                to="/silver-nitrate-applicator-sticks/"
                className="inline-flex items-center justify-center rounded-md border border-primary/30
                  px-5 py-3 text-sm font-semibold text-primary transition-colors duration-200
                  hover:md:border-primary hover:md:bg-secondary"
              >
                View Product Details
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Please include your company name, country and estimated order quantity.
            </p>

            <p className="mt-6 text-sm text-muted-foreground">
              For medical device distributors, hospital and clinic suppliers, healthcare
              wholesalers and importers. Professional use only — not for consumer sale.
            </p>
          </div>

          <div className="lg:col-span-2">
            <img
              src={IMAGES.hero.src}
              width={IMAGES.hero.width}
              height={IMAGES.hero.height}
              alt={IMAGES.hero.alt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-auto w-full rounded-lg border border-border bg-white shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Product at a glance */}
      <section aria-labelledby="glance-heading" className="site-container py-14 lg:py-16">
        <h2 id="glance-heading">Product at a Glance</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          AGNAVELIS Silver Nitrate Applicator Sticks are non-sterile, single-use
          applicators with a treated tip, intended for controlled, localised chemical
          cauterisation of small, clearly defined superficial tissue areas by trained
          healthcare professionals.
        </p>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {GLANCE.map((item) => (
            <div key={item.label} className="bg-card p-5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </dt>
              <dd className="mt-2 text-base font-medium text-primary">{item.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-sm text-muted-foreground">
          Full specifications, intended purpose and warnings are listed on the{' '}
          <Link
            to="/silver-nitrate-applicator-sticks/"
            className="font-medium text-accent underline underline-offset-4"
          >
            silver nitrate applicator sticks product page
          </Link>
          .
        </p>
      </section>

      {/* Designed for professional supply channels */}
      <section
        aria-labelledby="channels-heading"
        className="border-y border-border bg-secondary/45 py-14 lg:py-16"
      >
        <div className="site-container">
          <h2 id="channels-heading">Designed for Professional Supply Channels</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            AGNAVELIS is supplied business-to-business only. The product is intended for
            trained healthcare professionals, and this website does not offer consumer
            sales, pricing or online ordering.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {CHANNELS.map((channel) => (
              <div
                key={channel.title}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3>{channel.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {channel.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AGNAVELIS */}
      <section aria-labelledby="why-heading" className="site-container py-14 lg:py-16">
        <h2 id="why-heading">Why AGNAVELIS</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Each point below reflects the product as documented on the label, in the
          brochure and in the current Instructions for Use.
        </p>

        <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <div key={reason.title}>
              <h3 className="text-base">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Manufacturer information */}
      <section
        aria-labelledby="manufacturer-heading"
        className="border-y border-border bg-secondary/45 py-14 lg:py-16"
      >
        <div className="site-container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="manufacturer-heading">Manufacturer Information</h2>
            <p className="mt-3 text-muted-foreground">
              AGNAVELIS is a brand of {MANUFACTURER.legalName}, a medical device
              manufacturer based in {MANUFACTURER.district}, {MANUFACTURER.city},{' '}
              {MANUFACTURER.country}. Production, product documentation and export
              enquiries are handled by the manufacturer directly.
            </p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="w-40 shrink-0 font-semibold text-primary">
                  Legal manufacturer
                </dt>
                <dd className="text-muted-foreground">{MANUFACTURER.legalName}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="w-40 shrink-0 font-semibold text-primary">Address</dt>
                <dd className="text-muted-foreground">
                  {MANUFACTURER.street}, {MANUFACTURER.district} / {MANUFACTURER.city},{' '}
                  {MANUFACTURER.country}
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="w-40 shrink-0 font-semibold text-primary">Contact</dt>
                <dd className="text-muted-foreground">
                  <a
                    href={`mailto:${MANUFACTURER.email}`}
                    className="text-accent underline underline-offset-4"
                  >
                    {MANUFACTURER.email}
                  </a>{' '}
                  · {MANUFACTURER.phone}
                </dd>
              </div>
            </dl>

            <Link
              to="/manufacturer"
              className="mt-6 inline-flex text-sm font-semibold text-accent underline underline-offset-4"
            >
              Read the manufacturer profile
            </Link>
          </div>

          <img
            src={IMAGES.tubeLabel.src}
            width={IMAGES.tubeLabel.width}
            height={IMAGES.tubeLabel.height}
            alt={IMAGES.tubeLabel.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-lg border border-border bg-white"
          />
        </div>
      </section>

      {/* Documentation available on request */}
      <section aria-labelledby="docs-heading" className="site-container py-14 lg:py-16">
        <h2 id="docs-heading">Documentation Available on Request</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Published documents can be downloaded immediately. Additional documents are
          shared on request, according to the requirements of your market.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {DOCUMENTS.map((doc) => (
            <div
              key={doc.title}
              className="flex flex-col rounded-lg border border-border bg-card p-6"
            >
              <span
                className={[
                  'inline-flex w-fit rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
                  doc.status === 'Available now'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-secondary text-muted-foreground',
                ].join(' ')}
              >
                {doc.status}
              </span>
              <h3 className="mt-3 text-base">{doc.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {doc.body}
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/quality-documentation"
          className="mt-6 inline-flex text-sm font-semibold text-accent underline underline-offset-4"
        >
          Go to product documentation
        </Link>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="border-t border-border bg-secondary/45 py-14 lg:py-16"
      >
        <div className="site-container max-w-4xl">
          <h2 id="faq-heading">Product FAQ</h2>
          <p className="mt-3 text-muted-foreground">
            Answers below are taken from the product label, the brochure and the current
            Instructions for Use.
          </p>

          <Accordion type="single" collapsible className="mt-8">
            {FAQ.map((entry, index) => (
              <AccordionItem key={entry.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-primary">
                  {entry.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {entry.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="cta-heading" className="site-container py-14 lg:py-20">
        <div className="rounded-lg bg-primary px-6 py-12 text-center sm:px-12">
          <h2 id="cta-heading" className="!text-primary-foreground">
            Request an export quotation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Please include your company name, country and estimated order quantity.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <QuoteCta location="home_bottom" onDark>
              Request a Quote
            </QuoteCta>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md border border-white/40
                px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors
                duration-200 hover:md:bg-white/10"
            >
              See enquiry details
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
