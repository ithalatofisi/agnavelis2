import { Link } from 'react-router-dom';
import { AlertTriangle, Download, Info } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '@/components/Seo';
import SiteLayout, { Breadcrumbs, WhatsAppCta } from '@/components/SiteLayout';
import {
  CONTRAINDICATIONS,
  IFU_DOCUMENT,
  IFU_SECTIONS,
  IMAGES,
  INTENDED_PURPOSE,
  MANUFACTURER,
  STORAGE,
  WARNINGS,
  WHATSAPP_DOCUMENTATION_MESSAGE,
} from '@/lib/site';

const APPLICATION_STEPS = [
  'Confirm that the product, the packaging and the expiry date on the label are intact and suitable for use.',
  'Clean and dry the application area in line with the applicable clinical procedure.',
  'Protect the surrounding healthy tissue so that contact is limited to the intended target area.',
  'Moisten the active tip only if the clinical procedure requires it, following the Instructions for Use.',
  'Apply the tip to the target area briefly and with controlled pressure, avoiding contact with healthy tissue.',
  'Observe the treated area, and remove excess product from surrounding tissue where indicated.',
  'Discard the applicator immediately after a single use, in accordance with local waste regulations.',
];

const EXPOSURE = [
  'Skin contact: rinse thoroughly with water. Temporary dark staining of the skin may occur.',
  'Eye contact: rinse immediately with plenty of water and seek medical assistance.',
  'Ingestion: do not induce vomiting, rinse the mouth and seek medical assistance.',
];

/** Instructions for Use landing page with an English summary and download links. */
export default function InstructionsForUse() {
  const path = '/instructions-for-use';
  const title = 'Instructions for Use (IFU) — Silver Nitrate | AGNAVELIS';
  const description =
    'Read the English summary of the AGNAVELIS Silver Nitrate Applicator Sticks Instructions for Use (IFU-AGN-00, Rev. 00) and download the full bilingual document.';

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Instructions for Use', path },
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
        <Breadcrumbs current="Instructions for Use" />
      </div>

      <section className="site-container grid gap-10 py-10 lg:grid-cols-5 lg:gap-12 lg:py-14">
        <div className="lg:col-span-3">
          <h1>Instructions for Use</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            This page summarises the Instructions for Use of AGNAVELIS Silver Nitrate
            Applicator Sticks in English. The complete document, containing both English
            and Turkish text, can be downloaded below.
          </p>

          <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            <div className="bg-card p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Document number
              </dt>
              <dd className="mt-1.5 font-medium text-primary">{IFU_DOCUMENT.number}</dd>
            </div>
            <div className="bg-card p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Revision
              </dt>
              <dd className="mt-1.5 font-medium text-primary">{IFU_DOCUMENT.revision}</dd>
            </div>
            <div className="bg-card p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Issue date
              </dt>
              <dd className="mt-1.5 font-medium text-primary">
                {IFU_DOCUMENT.issueDate}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={IFU_DOCUMENT.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5
                py-3 text-sm font-semibold text-accent-foreground transition-colors
                duration-200 hover:md:bg-accent/90"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Download the full IFU ({IFU_DOCUMENT.fileLabel})
            </a>
            <Link
              to="/quality-documentation"
              className="inline-flex items-center justify-center rounded-md border border-primary/30
                px-5 py-3 text-sm font-semibold text-primary transition-colors duration-200
                hover:md:border-primary hover:md:bg-secondary"
            >
              All product documentation
            </Link>
          </div>

          <div className="mt-8 flex gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-5">
            <AlertTriangle
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-primary">Professional use only.</strong>{' '}
              The summary on this page is provided for information and does not replace the
              complete Instructions for Use. In case of any difference, the downloadable
              document {IFU_DOCUMENT.number}, {IFU_DOCUMENT.revision} takes precedence.
              The product is non-sterile and single use, and it must be used only by
              trained healthcare professionals in accordance with applicable local
              regulations.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <img
            src={IMAGES.tubeLabel.src}
            width={IMAGES.tubeLabel.width}
            height={IMAGES.tubeLabel.height}
            alt={IMAGES.tubeLabel.alt}
            loading="eager"
            decoding="async"
            className="h-auto w-full rounded-lg border border-border bg-white"
          />
          <div className="mt-6 rounded-lg border border-border bg-card p-5">
            <h2 className="text-base">Sections in the full document</h2>
            <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {IFU_SECTIONS.map((section, index) => (
                <li key={section}>
                  <span className="mr-2 font-medium text-primary">{index + 1}.</span>
                  {section}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Product description and intended purpose */}
      <section
        aria-labelledby="summary-heading"
        className="border-y border-border bg-secondary/45 py-14"
      >
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="summary-heading">Product Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AGNAVELIS Silver Nitrate Applicator Sticks consist of a rigid wooden shaft
              with a treated tip containing 75% silver nitrate and 25% potassium nitrate.
              The product is a Class I medical device, supplied non-sterile and intended
              for single use. It is supplied in applicator stick format as individually
              packed sticks.
            </p>

            <h3 className="mt-8">Intended purpose</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              {INTENDED_PURPOSE.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8">Intended user and patient population</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The device is intended to be used by trained healthcare professionals, for
              patients in whom localised chemical cauterisation is clinically indicated. Use
              in paediatric patients, or during pregnancy or breastfeeding, should follow an
              individual professional clinical assessment.
            </p>

            <h3 className="mt-8">Contraindications</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              {CONTRAINDICATIONS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/70"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Warnings and Precautions</h2>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              {WARNINGS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/70"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8">Application overview</h3>
            <ol className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              {APPLICATION_STEPS.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center
                    rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              The full application procedure, including contact times and clinical
              considerations, is described in the complete Instructions for Use.
            </p>
          </div>
        </div>
      </section>

      {/* Effects, exposure, storage, disposal, reporting */}
      <section aria-labelledby="handling-heading" className="site-container py-14">
        <h2 id="handling-heading">Effects, Handling and Reporting</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base">Expected and undesirable effects</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The expected effect is localised chemical cauterisation of the treated area.
              Possible undesirable effects include a short-lived local burning or stinging
              sensation, irritation and temporary dark discolouration of the skin. Excessive
              or repeated application may cause deeper tissue damage than intended.
            </p>
          </article>

          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base">Accidental exposure</h3>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {EXPOSURE.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base">Storage and shelf life</h3>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {STORAGE.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base">Disposal</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Used applicators and unused product must be disposed of in accordance with
              local medical waste regulations. Do not dispose of the product with normal
              household waste.
            </p>
          </article>

          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base">Serious incident reporting</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              In the event of a serious incident related to the product, inform the
              manufacturer at{' '}
              <a
                href={`mailto:${MANUFACTURER.email}`}
                className="font-medium text-accent underline underline-offset-4"
              >
                {MANUFACTURER.email}
              </a>{' '}
              and notify the competent authority of your country.
            </p>
          </article>

          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base">Label symbols</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The product label uses symbols in line with ISO 15223-1 for the information
              supplied by the manufacturer, including the manufacturer, batch code, expiry
              date, single use, non-sterile status and the instruction to consult the
              Instructions for Use. Each symbol is explained in the full document.
            </p>
          </article>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-lg border border-border bg-secondary/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Need the document in a different format, or additional documentation for your
              market? Request it directly from the manufacturer.
            </p>
          </div>
          <WhatsAppCta
            message={WHATSAPP_DOCUMENTATION_MESSAGE}
            className="shrink-0"
          >
            Request documentation
          </WhatsAppCta>
        </div>
      </section>
    </SiteLayout>
  );
}
