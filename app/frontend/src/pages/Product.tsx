import { Link } from 'react-router-dom';
import { AlertTriangle, FileText } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '@/components/Seo';
import QuoteCta from '@/components/QuoteCta';
import SiteLayout, { Breadcrumbs } from '@/components/SiteLayout';
import {
  CONTRAINDICATIONS,
  IFU_DOCUMENT,
  IMAGES,
  INTENDED_PURPOSE,
  MANUFACTURER,
  SPECIFICATION,
  STORAGE,
  WARNINGS,
} from '@/lib/site';

/** Main product page for the silver nitrate applicator sticks. */
export default function Product() {
  const path = '/silver-nitrate-applicator-sticks';
  const title = '75% Silver Nitrate Wooden Applicator Sticks | AGNAVELIS';
  const description =
    'Explore 75% silver nitrate / 25% potassium nitrate wooden applicator sticks from AGNAVELIS. Request product details and a B2B export quotation.';

  const specification = [...SPECIFICATION];
  const requiredRows = [
    { match: /composition/i, label: 'Active tip composition', value: '75% silver nitrate (AgNO₃) / 25% potassium nitrate (KNO₃)' },
    { match: /shaft|applicator material/i, label: 'Applicator shaft', value: 'Rigid wooden shaft' },
    { match: /length/i, label: 'Applicator length', value: 'Confirmed per order and destination market' },
    { match: /pack.*quantity|quantity.*pack/i, label: 'Pack quantity', value: 'Confirmed per order and destination market' },
  ];
  requiredRows.forEach(({ match, label, value }) => {
    if (!specification.some((row) => match.test(row.label))) {
      specification.push({ label, value });
    }
  });

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Silver Nitrate Applicator Sticks', path },
  ]);

  return (
    <SiteLayout>
      <Seo
        title={title}
        description={description}
        path={path}
        canonicalUrl="https://www.agnavelis.com/silver-nitrate-applicator-sticks/"
        jsonLd={[breadcrumbs]}
      />

      <div className="site-container pt-8">
        <Breadcrumbs current="Silver Nitrate Applicator Sticks" />
      </div>

      {/* Intro */}
      <section className="site-container grid gap-10 py-10 lg:grid-cols-5 lg:gap-12 lg:py-14">
        <div className="lg:col-span-3">
          <h1>75% Silver Nitrate Wooden Applicator Sticks</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            AGNAVELIS Silver Nitrate Applicator Sticks are non-sterile, single-use
            applicators with a tip containing 75% silver nitrate and 25% potassium
            nitrate on a rigid wooden shaft. They are intended for controlled, localised
            chemical cauterisation of small, clearly defined superficial tissue areas by
            trained healthcare professionals.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The sticks are supplied in applicator stick format as individually packed
            sticks, presented in the AGNAVELIS packaging tube. The rigid wooden shaft is
            designed to support controlled and precise placement of the treated tip. The
            product is a Class I medical device manufactured by{' '}
            {MANUFACTURER.legalName} in {MANUFACTURER.country}, and it is intended for
            professional use only.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This product information is intended for medical distributors, healthcare
            wholesalers and importers evaluating their sourcing requirements.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuoteCta location="product_hero">
              Request a Quote
            </QuoteCta>
            <Link
              to="/instructions-for-use"
              className="inline-flex items-center justify-center gap-2 rounded-md border
                border-primary/30 px-5 py-3 text-sm font-semibold text-primary
                transition-colors duration-200 hover:md:border-primary hover:md:bg-secondary"
            >
              <FileText aria-hidden="true" className="h-4 w-4" />
              Read the complete IFU
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Please include your company name, destination country and estimated order quantity.
            Specify your required applicator length and pack quantity so we can confirm the
            current product and packaging details.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <img
            src={IMAGES.hero.src}
            width={IMAGES.hero.width}
            height={IMAGES.hero.height}
            alt={IMAGES.hero.alt}
            loading="eager"
            decoding="async"
            className="h-auto w-full rounded-lg border border-border bg-white"
          />
          <img
            src={IMAGES.tubeOpen.src}
            width={IMAGES.tubeOpen.width}
            height={IMAGES.tubeOpen.height}
            alt={IMAGES.tubeOpen.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-lg border border-border bg-white"
          />
        </div>
      </section>

      {/* Specification table */}
      <section
        aria-labelledby="spec-heading"
        className="border-y border-border bg-secondary/45 py-14"
      >
        <div className="site-container">
          <h2 id="spec-heading">Product Specification</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Every value below is taken from the product label, the product brochure or the
            current Instructions for Use.
          </p>

          <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                AGNAVELIS Silver Nitrate Applicator Sticks specification
              </caption>
              <tbody>
                {specification.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <th
                      scope="row"
                      className="w-full max-w-[15rem] bg-secondary/40 px-5 py-4 align-top
                        font-semibold text-primary sm:w-[38%]"
                    >
                      {row.label}
                    </th>
                    <td className="px-5 py-4 align-top text-muted-foreground">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Applicator length, pack quantity, catalogue references and expiry data are
            confirmed per order and per market. Send an enquiry to receive the current
            packaging and reference details for your destination country.
          </p>
        </div>
      </section>

      {/* Intended purpose */}
      <section aria-labelledby="purpose-heading" className="site-container py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="purpose-heading">Intended Purpose</h2>
            <p className="mt-3 text-muted-foreground">
              The product is intended to provide controlled, localised chemical
              cauterisation of small and clearly defined superficial tissue areas.
              Clinical use must remain within the indications supported by the
              manufacturer&apos;s technical documentation.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {INTENDED_PURPOSE.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Intended Users and Patients</h2>
            <p className="mt-3 text-muted-foreground">
              <strong className="font-semibold text-primary">Intended user:</strong>{' '}
              trained healthcare professionals.
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong className="font-semibold text-primary">Patient population:</strong>{' '}
              patients for whom localised chemical cauterisation is clinically indicated.
              Use in paediatric patients, or during pregnancy or breastfeeding, should
              follow an individual professional clinical assessment.
            </p>

            <h3 className="mt-8">Contraindications</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              {CONTRAINDICATIONS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Warnings and storage */}
      <section
        aria-labelledby="warnings-heading"
        className="border-y border-border bg-secondary/45 py-14"
      >
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0 text-destructive" />
              <h2 id="warnings-heading">Warnings Summary</h2>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Summarised from the current Instructions for Use. The complete warnings and
              precautions, application instructions and first-aid information are given in
              the IFU, which takes precedence over any summary on this page.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {WARNINGS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Storage Information</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {STORAGE.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg border border-border bg-card p-6">
              <h3 className="text-base">Complete Instructions for Use</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {IFU_DOCUMENT.number}, {IFU_DOCUMENT.revision}, issued{' '}
                {IFU_DOCUMENT.issueDate}. {IFU_DOCUMENT.languages}.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/instructions-for-use"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent
                    underline underline-offset-4"
                >
                  <FileText aria-hidden="true" className="h-4 w-4" />
                  Open the IFU page
                </Link>
                <a
                  href={IFU_DOCUMENT.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent
                    underline underline-offset-4"
                >
                  Download IFU ({IFU_DOCUMENT.fileLabel})
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applicator formats */}
      <section aria-labelledby="formats-heading" className="site-container py-14">
        <div className="max-w-3xl">
          <h2 id="formats-heading">Wooden and Flexible Plastic Applicator Formats</h2>
          <p className="mt-4 text-muted-foreground">
            AGNAVELIS uses a rigid wooden shaft. Some products in the international market
            use flexible plastic applicators. Buyers should select the format appropriate
            to their professional requirements.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="site-container pb-14 lg:pb-20">
        <div className="rounded-lg bg-primary px-6 py-12 text-center sm:px-12">
          <h2 className="!text-primary-foreground">
            Request price and export terms
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Please include your company name, destination country and estimated order quantity.
            Specify your required applicator length and pack quantity so we can confirm the
            current product and packaging details.
          </p>
          <div className="mt-8 flex justify-center">
            <QuoteCta location="product_bottom" onDark>
              Request a Quote
            </QuoteCta>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
