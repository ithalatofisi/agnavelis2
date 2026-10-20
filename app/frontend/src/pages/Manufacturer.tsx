import { Link } from 'react-router-dom';
import { Building2, Factory, Globe2, ShieldCheck } from 'lucide-react';
import Seo, { ORGANIZATION_ID, breadcrumbJsonLd } from '@/components/Seo';
import SiteLayout, { Breadcrumbs, WhatsAppCta } from '@/components/SiteLayout';
import {
  IFU_DOCUMENT,
  IMAGES,
  MANUFACTURER,
  SITE_URL,
  WHATSAPP_DEFAULT_MESSAGE,
} from '@/lib/site';

const CAPABILITY = [
  {
    icon: Factory,
    title: 'Own production of the AGNAVELIS brand',
    body: 'AGNAVELIS is the manufacturer\u2019s own brand. Silver nitrate applicator sticks are produced with the documented 75% silver nitrate and 25% potassium nitrate tip formulation on a rigid wooden shaft.',
  },
  {
    icon: ShieldCheck,
    title: 'Manufacturer responsibility for the device',
    body: `${MANUFACTURER.legalName} is the legal manufacturer stated on the label and in the Instructions for Use ${IFU_DOCUMENT.number}, ${IFU_DOCUMENT.revision}.`,
  },
  {
    icon: Globe2,
    title: 'Export-oriented communication',
    body: 'Product documentation is prepared in English and Turkish so that importers and distributors can review the device in their own market review process.',
  },
  {
    icon: Building2,
    title: 'Direct buyer contact',
    body: 'Distributor, wholesaler and importer enquiries are answered by the manufacturer, so technical and documentation questions reach the production source directly.',
  },
];

/** Manufacturer profile page. */
export default function Manufacturer() {
  const path = '/manufacturer';
  const title = 'Silver Nitrate Applicator Manufacturer in Türkiye | AGNAVELIS';
  const description =
    'AGNAVELIS is manufactured by Genco Tıbbi Cihazlar San. Tic. Ltd. Şti. in İzmir, Türkiye, supplying silver nitrate applicator sticks to international B2B buyers.';

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

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Manufacturer', path },
  ]);

  return (
    <SiteLayout>
      <Seo
        title={title}
        description={description}
        path={path}
        jsonLd={[organization, breadcrumbs]}
      />

      <div className="site-container pt-8">
        <Breadcrumbs current="Manufacturer" />
      </div>

      <section className="site-container grid gap-10 py-10 lg:grid-cols-5 lg:gap-12 lg:py-14">
        <div className="lg:col-span-3">
          <h1>Silver Nitrate Applicator Manufacturer in Türkiye</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            AGNAVELIS is a brand of {MANUFACTURER.legalName}, a medical device
            manufacturer based in {MANUFACTURER.district}, {MANUFACTURER.city},{' '}
            {MANUFACTURER.country}. The company produces AGNAVELIS Silver Nitrate
            Applicator Sticks and is named as the legal manufacturer on the product label
            and in the Instructions for Use.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The company works with medical device distributors, hospital and clinic
            suppliers, healthcare wholesalers and importers. Product documentation is
            supplied in English and Turkish, and business enquiries are handled directly by
            the manufacturer rather than through an intermediary.
          </p>

          <div className="mt-8">
            <WhatsAppCta message={WHATSAPP_DEFAULT_MESSAGE}>
              Contact the manufacturer
            </WhatsAppCta>
          </div>
        </div>

        <div className="lg:col-span-2">
          <img
            src={IMAGES.tubeOpen.src}
            width={IMAGES.tubeOpen.width}
            height={IMAGES.tubeOpen.height}
            alt={IMAGES.tubeOpen.alt}
            loading="eager"
            decoding="async"
            className="h-auto w-full rounded-lg border border-border bg-white"
          />
        </div>
      </section>

      {/* Company details */}
      <section
        aria-labelledby="details-heading"
        className="border-y border-border bg-secondary/45 py-14"
      >
        <div className="site-container">
          <h2 id="details-heading">Company Details</h2>

          <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Manufacturer company details</caption>
              <tbody>
                <tr className="border-b border-border">
                  <th
                    scope="row"
                    className="bg-secondary/40 px-5 py-4 align-top font-semibold text-primary sm:w-[38%]"
                  >
                    Legal manufacturer
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">
                    {MANUFACTURER.legalName}
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <th
                    scope="row"
                    className="bg-secondary/40 px-5 py-4 align-top font-semibold text-primary"
                  >
                    Brand
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">AGNAVELIS</td>
                </tr>
                <tr className="border-b border-border">
                  <th
                    scope="row"
                    className="bg-secondary/40 px-5 py-4 align-top font-semibold text-primary"
                  >
                    Address
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">
                    {MANUFACTURER.street}
                    <br />
                    {MANUFACTURER.district} / {MANUFACTURER.city}, {MANUFACTURER.country}
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <th
                    scope="row"
                    className="bg-secondary/40 px-5 py-4 align-top font-semibold text-primary"
                  >
                    Telephone
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">
                    <a
                      href={`tel:${MANUFACTURER.phone.replace(/\s/g, '')}`}
                      className="text-accent underline underline-offset-4"
                    >
                      {MANUFACTURER.phone}
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <th
                    scope="row"
                    className="bg-secondary/40 px-5 py-4 align-top font-semibold text-primary"
                  >
                    Email
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">
                    <a
                      href={`mailto:${MANUFACTURER.email}`}
                      className="text-accent underline underline-offset-4"
                    >
                      {MANUFACTURER.email}
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <th
                    scope="row"
                    className="bg-secondary/40 px-5 py-4 align-top font-semibold text-primary"
                  >
                    Corporate website
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">
                    <a
                      href={MANUFACTURER.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline underline-offset-4"
                    >
                      {MANUFACTURER.websiteLabel}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="bg-secondary/40 px-5 py-4 align-top font-semibold text-primary"
                  >
                    Country of manufacture
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">Türkiye</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Capability */}
      <section aria-labelledby="capability-heading" className="site-container py-14">
        <h2 id="capability-heading">Manufacturing and Supply Approach</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          The points below describe how the manufacturer works with international buyers.
          Commercial terms, packaging configurations and market-specific documentation are
          confirmed individually for each enquiry.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {CAPABILITY.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-6"
              >
                <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-base">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cross links */}
      <section className="border-t border-border bg-secondary/45 py-14">
        <div className="site-container grid gap-6 sm:grid-cols-3">
          <Link
            to="/silver-nitrate-applicator-sticks/"
            className="rounded-lg border border-border bg-card p-6 transition-colors
              duration-200 hover:md:border-accent"
          >
            <h3 className="text-base">Product specification</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Composition, shaft material, sterility and storage in one table.
            </p>
          </Link>
          <Link
            to="/quality-documentation"
            className="rounded-lg border border-border bg-card p-6 transition-colors
              duration-200 hover:md:border-accent"
          >
            <h3 className="text-base">Product documentation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Published documents and the documents available on request.
            </p>
          </Link>
          <Link
            to="/contact"
            className="rounded-lg border border-border bg-card p-6 transition-colors
              duration-200 hover:md:border-accent"
          >
            <h3 className="text-base">Contact and enquiries</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              WhatsApp, email and telephone details for B2B buyers.
            </p>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
