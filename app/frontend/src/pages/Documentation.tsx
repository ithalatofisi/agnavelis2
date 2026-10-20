import { Link } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '@/components/Seo';
import SiteLayout, { Breadcrumbs, WhatsAppCta } from '@/components/SiteLayout';
import {
  BROCHURE,
  IFU_DOCUMENT,
  MANUFACTURER,
  WHATSAPP_DOCUMENTATION_MESSAGE,
} from '@/lib/site';

interface DocCard {
  title: string;
  description: string;
  href?: string;
  fileLabel?: string;
}

const PUBLISHED: DocCard[] = [
  {
    title: `Instructions for Use — ${IFU_DOCUMENT.number}, ${IFU_DOCUMENT.revision}`,
    description: `The current Instructions for Use, issued ${IFU_DOCUMENT.issueDate}. Contains the product description, intended purpose, intended users, contraindications, warnings and precautions, application instructions, accidental exposure guidance, storage, disposal, incident reporting and the ISO 15223-1 label symbols. ${IFU_DOCUMENT.languages}.`,
    href: IFU_DOCUMENT.href,
    fileLabel: IFU_DOCUMENT.fileLabel,
  },
  {
    title: 'Product brochure',
    description:
      'Professional product brochure covering the 75% silver nitrate and 25% potassium nitrate formulation, the applicator stick presentation, typical professional applications, handling and storage guidance and manufacturer contact details.',
    href: BROCHURE.href,
    fileLabel: BROCHURE.fileLabel,
  },
];

const ON_REQUEST: DocCard[] = [
  {
    title: 'Technical product information',
    description:
      'Composition, presentation, packaging configuration, handling and storage information compiled for procurement review and product assessment.',
  },
  {
    title: 'Labelling artwork and symbol explanations',
    description:
      'Product label artwork together with the explanation of the ISO 15223-1 symbols used for the information supplied by the manufacturer.',
  },
  {
    title: 'Declaration and registration support documents',
    description:
      'Manufacturer declarations and supporting documents required for import review or device registration are discussed case by case, according to the requirements of your market.',
  },
  {
    title: 'Packaging and shipping information',
    description:
      'Carton configuration, packing details and shipping documentation requirements for the destination country, confirmed per order.',
  },
];

/** Product documentation hub. */
export default function Documentation() {
  const path = '/quality-documentation';
  const title = 'Product Documentation and IFU Downloads | AGNAVELIS';
  const description =
    'Download the AGNAVELIS Instructions for Use and product brochure, and see which technical and regulatory documents are available on request for importers.';

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Product Documentation', path },
  ]);

  return (
    <SiteLayout>
      <Seo
        title={title}
        description={description}
        path={path}
        jsonLd={[breadcrumbs]}
      />

      <div className="site-container pt-8">
        <Breadcrumbs current="Product Documentation" />
      </div>

      <section className="site-container py-10 lg:py-14">
        <div className="max-w-3xl">
          <h1>Product Documentation</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Documents that are already published can be downloaded from this page.
            Additional technical and regulatory documents are provided on request, based on
            the requirements of your market and the intended use of the documentation.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Registration requirements, permitted claims and required documents differ
            between countries. Importers and distributors remain responsible for verifying
            local requirements before placing the product on their market.
          </p>
        </div>
      </section>

      {/* Published documents */}
      <section
        aria-labelledby="published-heading"
        className="border-y border-border bg-secondary/45 py-14"
      >
        <div className="site-container">
          <h2 id="published-heading">Available for Download</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {PUBLISHED.map((doc) => (
              <article
                key={doc.title}
                className="flex flex-col rounded-lg border border-border bg-card p-6"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded bg-accent/10 px-2.5 py-1
                  text-[11px] font-semibold uppercase tracking-wider text-accent">
                  <FileText aria-hidden="true" className="h-3.5 w-3.5" />
                  {doc.fileLabel}
                </span>
                <h3 className="mt-3 text-base">{doc.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {doc.description}
                </p>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-4
                    py-2.5 text-sm font-semibold text-accent-foreground transition-colors
                    duration-200 hover:md:bg-accent/90"
                >
                  <Download aria-hidden="true" className="h-4 w-4" />
                  View / download
                </a>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            A summarised English overview of the Instructions for Use is also available on
            the{' '}
            <Link
              to="/instructions-for-use"
              className="font-medium text-accent underline underline-offset-4"
            >
              Instructions for Use page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* On request */}
      <section aria-labelledby="request-heading" className="site-container py-14">
        <h2 id="request-heading">Available on Request</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Tell us which documents your market requires and the manufacturer will confirm
          what can be provided for your enquiry.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {ON_REQUEST.map((doc) => (
            <article
              key={doc.title}
              className="rounded-lg border border-border bg-card p-6"
            >
              <span className="inline-flex w-fit rounded bg-secondary px-2.5 py-1 text-[11px]
                font-semibold uppercase tracking-wider text-muted-foreground">
                On request
              </span>
              <h3 className="mt-3 text-base">{doc.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {doc.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-card p-6 sm:p-8">
          <h3>Request documentation</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Send your company name, destination country and the documents you require. You
            can also write to{' '}
            <a
              href={`mailto:${MANUFACTURER.email}`}
              className="font-medium text-accent underline underline-offset-4"
            >
              {MANUFACTURER.email}
            </a>{' '}
            or call {MANUFACTURER.phone}.
          </p>
          <div className="mt-6">
            <WhatsAppCta message={WHATSAPP_DOCUMENTATION_MESSAGE}>
              Request documentation on WhatsApp
            </WhatsAppCta>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
