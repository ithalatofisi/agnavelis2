/**
 * Single source of truth for every AGNAVELIS fact published on this website.
 *
 * SOURCE DOCUMENTS (owner-supplied, verified):
 *  - IFU-AGN-00, Rev. 00, issued 03.09.2026 — English section
 *    ("AGNAVELIS_Silver_Nitrate_IFU_TR_EN_ISO_Symbols.docx")
 *  - "Genco_Silver_Nitrate_Brochure_Professional.pdf"
 *  - Product photographs of the AGNAVELIS kraft tube and wooden applicators
 *
 * RULE: Nothing may be added here unless it appears in one of those documents.
 * Facts deliberately NOT published because they are absent from all sources:
 * applicator length, pack quantity, CE / FDA / ISO certification, shelf-life
 * duration, validated storage temperature range, MOQ, production capacity,
 * lead time, private label / OEM availability, distributor network, samples.
 */

/* ------------------------------------------------------------------------- */
/* WhatsApp configuration                                                     */
/* ------------------------------------------------------------------------- */

/**
 * CONFIGURATION CONSTANT — WhatsApp business number in international format,
 * digits only, no "+", no spaces. Supplied by the site owner.
 * If this is set to an empty string, every WhatsApp CTA and the sticky button
 * are hidden automatically across the whole site.
 */
export const WHATSAPP_NUMBER = '905059166388';

/** Human-readable form of the same number, for display next to the CTAs. */
export const WHATSAPP_NUMBER_DISPLAY = '+90 505 916 63 88';

/** True only when a usable international number has been configured. */
export const WHATSAPP_ENABLED = /^\d{8,15}$/.test(WHATSAPP_NUMBER);

/** Default enquiry message used by the sticky button. */
export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello, I am interested in AGNAVELIS Silver Nitrate Applicator Sticks for B2B import/distribution. Company: ___ Country: ___ Estimated quantity: ___';

/** Quotation message used by the primary conversion CTAs. */
export const WHATSAPP_QUOTATION_MESSAGE =
  'Hello, I would like to receive information and an export quotation for AGNAVELIS Silver Nitrate Applicator Sticks. Destination country:';

/** Documentation request message used on the documentation and IFU pages. */
export const WHATSAPP_DOCUMENTATION_MESSAGE =
  'Hello, I would like to request available product documentation for AGNAVELIS Silver Nitrate Applicator Sticks. Company: ___ Country: ___ Documents required: ___';

/** Builds a wa.me link with a URL-encoded prefilled English message. */
export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ------------------------------------------------------------------------- */
/* Site-wide constants                                                        */
/* ------------------------------------------------------------------------- */

export const SITE_URL = 'https://agnavelis.com';
export const BRAND = 'AGNAVELIS';
export const PRODUCT_NAME = 'AGNAVELIS Silver Nitrate Applicator Sticks';

/** Manufacturer details — from the IFU manufacturer block and brochure footer. */
export const MANUFACTURER = {
  legalName: 'Genco Tıbbi Cihazlar San. Tic. Ltd. Şti.',
  shortName: 'Genco Tıbbi Cihazlar',
  street: 'Meriç Mah. 5746/5 Sk. No: 3 İç Kapı No: Z1',
  district: 'Bornova',
  city: 'İzmir',
  country: 'Türkiye',
  phone: '+90 232 462 16 49',
  email: 'info@gencotibbi.com',
  website: 'https://www.gencotibbi.com',
  websiteLabel: 'www.gencotibbi.com',
} as const;

/** Document identity — from the IFU header block. */
export const IFU_DOCUMENT = {
  number: 'IFU-AGN-00',
  revision: 'Rev. 00',
  issueDate: '03.09.2026',
  title: 'Instructions for Use / Kullanım Kılavuzu',
  languages: 'English and Turkish in one document',
  href: '/docs/AGNAVELIS-Silver-Nitrate-Applicator-Sticks-IFU-EN-TR-Rev00.docx',
  fileLabel: 'DOCX',
} as const;

/** Brochure — supplied and suitable for publication. */
export const BROCHURE = {
  href: '/docs/AGNAVELIS-Silver-Nitrate-Applicator-Sticks-Brochure.pdf',
  fileLabel: 'PDF, 2 pages',
} as const;

/* ------------------------------------------------------------------------- */
/* Product images (owner-supplied photographs only)                           */
/* ------------------------------------------------------------------------- */

export const IMAGES = {
  hero: {
    src: '/assets/agnavelis-silver-nitrate-applicator-sticks-wooden-shafts-hero.webp',
    width: 2048,
    height: 1152,
    alt: 'AGNAVELIS 75 percent silver nitrate applicator sticks with wooden shafts leaning against the kraft packaging tube',
  },
  tubeLabel: {
    src: '/assets/agnavelis-silver-nitrate-applicator-sticks-kraft-tube-label.webp',
    fallback:
      '/assets/agnavelis-silver-nitrate-applicator-sticks-kraft-tube-label.png',
    width: 1024,
    height: 1024,
    alt: 'AGNAVELIS silver nitrate applicator sticks kraft tube showing the product label with composition, Class I medical device, non-sterile and single use statements',
  },
  tubeOpen: {
    src: '/assets/agnavelis-silver-nitrate-applicator-sticks-tube-open-lid.webp',
    width: 1024,
    height: 1024,
    alt: 'Opened AGNAVELIS kraft packaging tube with wooden silver nitrate applicator sticks and the detached lid beside it',
  },
} as const;

/* ------------------------------------------------------------------------- */
/* Product specification — every row traceable to a source document           */
/* ------------------------------------------------------------------------- */

export interface SpecRow {
  label: string;
  value: string;
}

export const SPECIFICATION: SpecRow[] = [
  { label: 'Product name', value: 'AGNAVELIS Silver Nitrate Applicator Sticks' },
  { label: 'Brand', value: 'AGNAVELIS' },
  {
    label: 'Active tip composition',
    value: '75% silver nitrate / 25% potassium nitrate',
  },
  { label: 'Applicator shaft', value: 'Rigid wooden shaft' },
  { label: 'Device status', value: 'Medical device, Class I' },
  { label: 'Sterility', value: 'Non-sterile' },
  { label: 'Reuse', value: 'Single use — do not reuse, reprocess or re-sterilise' },
  { label: 'Presentation', value: 'Applicator stick format, individually packed sticks' },
  { label: 'Intended users', value: 'Trained healthcare professionals' },
  {
    label: 'Intended purpose',
    value:
      'Controlled, localised chemical cauterisation of small, clearly defined superficial tissue areas',
  },
  { label: 'Legal manufacturer', value: 'Genco Tıbbi Cihazlar San. Tic. Ltd. Şti.' },
  { label: 'Country of manufacture', value: 'Türkiye' },
  {
    label: 'Storage',
    value: 'Store dry, protected from light, in the original packaging',
  },
  {
    label: 'Reference documentation',
    value: 'Instructions for Use IFU-AGN-00, Rev. 00 (English and Turkish)',
  },
];

/** Intended-purpose bullets — paraphrased from IFU section 2 (English). */
export const INTENDED_PURPOSE: string[] = [
  'Chemical cauterisation of small superficial bleeding sites.',
  'Controlled reduction of excessive granulation or hypergranulation tissue.',
  'Clinically appropriate localised applications in wound and stoma care.',
  'Other small superficial lesions where localised cauterisation is considered appropriate by a healthcare professional.',
];

/** Warnings summary — condensed from IFU section 5 (English). */
export const WARNINGS: string[] = [
  'For professional use only.',
  'The product is non-sterile. Do not use where the procedure requires a sterile device.',
  'Single use only. Do not reuse, reprocess or re-sterilise.',
  'Do not touch the active tip with bare or wet hands. Wear appropriate gloves, and eye protection where indicated.',
  'Limit contact with healthy tissue; silver nitrate may cause chemical irritation and dark staining of healthy skin.',
  'Protect clothing, work surfaces and equipment, because silver nitrate may cause persistent brown-black stains.',
  'When used in or near the mouth, prevent ingestion of fragments of the active tip.',
  'Keep out of reach of children.',
  'Do not use if the packaging is damaged or wet, or if the product shows visible deterioration.',
];

/** Contraindications — paraphrased from IFU section 4 (English). */
export const CONTRAINDICATIONS: string[] = [
  'Known hypersensitivity to silver nitrate or potassium nitrate.',
  'Uncertain, atypically coloured or shaped lesions, or lesions suspected of malignancy, unless assessed by an appropriate physician.',
  'Direct application to the eye or peri-ocular tissues.',
  'Use over large body surface areas, on deep tissues, or outside the intended purpose.',
];

/** Storage and shelf-life handling — from IFU section 9 (English). */
export const STORAGE: string[] = [
  'Store dry, protected from light and in the original packaging.',
  'After opening, reseal the remaining product securely and protect it from moisture.',
  'The expiry date is stated on the label. Do not use after the expiry date.',
];

/** Sections summarised on the IFU landing page — mirrors the English IFU. */
export const IFU_SECTIONS: string[] = [
  'Product description',
  'Intended purpose',
  'Intended user and patient population',
  'Contraindications',
  'Warnings and precautions',
  'Instructions for use',
  'Expected effects and possible undesirable effects',
  'Accidental exposure',
  'Storage and shelf life',
  'Disposal',
  'Serious incident reporting',
  'Label information and symbols (ISO 15223-1)',
];

/* ------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* ------------------------------------------------------------------------- */

export interface NavItem {
  label: string;
  href: string;
}

export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Product', href: '/silver-nitrate-applicator-sticks/' },
  { label: 'Manufacturer', href: '/manufacturer' },
  { label: 'Documentation', href: '/quality-documentation' },
  { label: 'IFU', href: '/instructions-for-use' },
  { label: 'Contact', href: '/contact' },
];

/* ------------------------------------------------------------------------- */
/* FAQ — only questions answerable from the supplied documents                */
/* ------------------------------------------------------------------------- */

export interface FaqEntry {
  question: string;
  answer: string;
}

export const FAQ: FaqEntry[] = [
  {
    question: 'What are AGNAVELIS Silver Nitrate Applicator Sticks?',
    answer:
      'AGNAVELIS Silver Nitrate Applicator Sticks are non-sterile, single-use applicators with a treated tip, intended for controlled, localised chemical cauterisation of small, clearly defined superficial tissue areas by trained healthcare professionals. They are manufactured in Türkiye by Genco Tıbbi Cihazlar San. Tic. Ltd. Şti.',
  },
  {
    question: 'What is the composition of each applicator tip?',
    answer:
      'Each applicator tip contains 75% silver nitrate and 25% potassium nitrate, as stated on the product label and in the Instructions for Use.',
  },
  {
    question: 'Are AGNAVELIS applicators wooden or plastic?',
    answer:
      'AGNAVELIS applicators use a rigid wooden shaft. The wooden shaft is designed to support controlled and precise placement of the treated tip.',
  },
  {
    question: 'Are the applicator sticks sterile?',
    answer:
      'No. AGNAVELIS Silver Nitrate Applicator Sticks are supplied non-sterile and must not be used where the procedure requires a sterile device. They are single use only and must not be reused, reprocessed or re-sterilised.',
  },
  {
    question: 'Who are the applicator sticks intended for?',
    answer:
      'The product is intended for professional use only, by trained healthcare professionals. It is not intended for consumer or self-treatment use.',
  },
  {
    question: 'Who manufactures AGNAVELIS Silver Nitrate Applicator Sticks?',
    answer:
      'The legal manufacturer is Genco Tıbbi Cihazlar San. Tic. Ltd. Şti., located in Bornova, İzmir, Türkiye.',
  },
  {
    question: 'How should the product be stored?',
    answer:
      'Store the product dry, protected from light and in its original packaging. After opening, reseal the remaining product securely and protect it from moisture. Do not use after the expiry date stated on the label.',
  },
  {
    question: 'Are AGNAVELIS products available for international B2B supply?',
    answer:
      'Yes. AGNAVELIS Silver Nitrate Applicator Sticks are offered to medical device distributors, hospital and clinic suppliers, healthcare wholesalers and importers. Enquiries are handled directly by the manufacturer.',
  },
  {
    question: 'How can a distributor request a quotation?',
    answer:
      'Distributors can send an export enquiry by WhatsApp with their company name, destination country and estimated quantity. Enquiries can also be sent by email to info@gencotibbi.com.',
  },
  {
    question: 'Where can healthcare professionals access the Instructions for Use?',
    answer:
      'The current Instructions for Use (IFU-AGN-00, Rev. 00) can be viewed and downloaded from the Instructions for Use page of this website. The document contains both English and Turkish text.',
  },
];
