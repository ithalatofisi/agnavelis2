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
        jsonLd={[
          breadcrumbs,
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "AGNAVELIS Silver Nitrate Applicator Sticks",
            "brand": {
              "@type": "Brand",
              "name": "AGNAVELIS"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "Genco Tıbbi Cihazlar San. Tic. Ltd. Şti."
            },
            "description": "Class I, non-sterile, single-use silver nitrate applicator sticks (75% silver nitrate / 25% potassium nitrate) for professional topical application.",
            "category": "Medical Device - Class I",
            "material": "75% silver nitrate / 25% potassium nitrate, rigid wooden shaft",
            "url": "https://www.agnavelis.com/silver-nitrate-applicator-sticks/",
            "image": IMAGES.hero.src,
            "isRelatedTo": "https://www.agnavelis.com/"
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AGNAVELIS",
            "legalName": "Genco Tıbbi Cihazlar San. Tic. Ltd. Şti.",
            "url": "https://www.agnavelis.com",
            "logo": "https://www.agnavelis.com/favicon.svg",
            "sameAs": ["https://www.gencotibbi.com"],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+90-232-462-16-49",
              "email": "info@gencotibbi.com",
              "contactType": "customer service",
              "availableLanguage": ["English", "Turkish"],
              "areaServed": "Worldwide"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Meriç Mah. 5746/5 Sk. No: 3 İç Kapı No: Z1",
              "addressLocality": "Bornova",
              "addressRegion": "İzmir",
              "addressCountry": "TR"
            }
          }
        ]}
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
            current product and packaging
