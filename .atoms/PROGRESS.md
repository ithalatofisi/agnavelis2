# Requirements & Progress

## Requirements Overview

Build the AGNAVELIS B2B export website (agnavelis.com) in a single implementation pass using the
existing Vite + React + TypeScript + Tailwind + shadcn/ui template. English-only, B2B export
oriented, no shop/cart/prices, no backend. WhatsApp is the sole conversion channel.

Verified sources of truth (uploaded by owner):
- `uploads/AGNAVELIS_Silver_Nitrate_IFU_TR_EN_ISO_Symbols.docx` (IFU-AGN-00, Rev. 00, 03.09.2026)
- `uploads/Genco_Silver_Nitrate_Brochure_Professional.pdf`
- 3 product photographs (wooden shafts, kraft tube, AGNAVELIS label)

## User Stories

- As a medical device distributor, I can read the exact composition, applicator material,
  sterility and single-use status before enquiring.
- As an importer, I can request an export quotation via WhatsApp with a prefilled English message.
- As a healthcare professional, I can view or download the English IFU.
- As a tender/registration buyer, I can see which documents exist and request the rest.
- As a crawler / AI system, I can extract brand, manufacturer, composition, material and
  country of manufacture from static HTML and JSON-LD.

## Task Breakdown

| ID | Task | Assignee | Status | Deps |
|----|------|----------|--------|------|
| T1 | Extract IFU + brochure facts, inspect product photos | Alex | Done | - |
| T2 | Copy product photos + IFU/brochure into public/, WebP conversion | Alex | Done | T1 |
| T3 | Design tokens: navy/medical blue/kraft palette in index.css | Alex | Done | T2 |
| T4 | Shared site data module (facts, FAQ, WhatsApp config) | Alex | Done | T3 |
| T5 | Layout components: Header, Footer, sticky WhatsApp, SEO head, JSON-LD | Alex | Done | T4 |
| T6 | Home page (hero, glance, channels, why, manufacturer, docs, FAQ, CTA) | Alex | Done | T5 |
| T7 | Product page with spec table + wooden/plastic format note | Alex | Done | T5 |
| T8 | Manufacturer, Documentation, IFU, Contact pages | Alex | Done | T5 |
| T9 | Routing + prerender all 6 routes to static HTML | Alex | Done | T6,T7,T8 |
| T10 | robots.txt, sitemap.xml, llms.txt, favicon, OG image | Alex | Done | T9 |
| T11 | Build, lint, QA all routes / links / JSON-LD | Alex | Done | T10 |

### Task Breakdown (checklist)

| ID | Görev | Durum |
|----|-------|-------|
| P1 | Yalnızca Product.tsx: B2B paragrafı, eksik tablo satırları, mevcut CTA destek metni | done |
| P2 | Lint/build ve ürün HTML içerik kontrolü | done |
| P3 | Ürün sayfasının doğrudan tarayıcı kontrolü (önizleme adresine bağlantı reddedildi) | blocked |
| Q1 | /contact formu, quote CTA yönlendirmeleri, SMTP API ve kalıcı tekrar/spam koruması; gönderim varsayılan kapalı | done |
| Q2 | İzin sonrası tek GA4 etiket ve kişisel veri içermeyen olaylar | done |
| Q3 | Lint/build, Python, kontrollü form/olay senaryoları ve 390/1440 px taşma kontrolü | done |
| Q4 | Gerçek SMTP teslimi ve GA4 DebugView: backend sırları tanımlı; SMTPServerDisconnected; gerçek test e-postası gönderilmedi | blocked |

- [x] Extract verified facts from IFU and brochure; confirm wooden shafts in photos
- [x] Copy and optimise product images and documents into public/
- [x] Replace design tokens with navy / medical blue / kraft palette
- [x] Build shared site-facts module and WhatsApp config constant
- [x] Build Header, Footer, StickyWhatsApp, Seo and JsonLd components
- [x] Build Home page with all required sections and FAQ
- [x] Build Product page with specification table
- [x] Build Manufacturer, Documentation, IFU and Contact pages
- [x] Wire 6 routes and prerender each to crawlable static HTML
- [x] Write robots.txt, sitemap.xml, llms.txt and favicon
- [x] Run build + lint, verify routes, links, images, JSON-LD

## Progress Log

- Extracted IFU (EN section) and brochure; confirmed Class I, non-sterile, single use, 75/25.
- Confirmed from photos: WOODEN shafts, kraft cardboard tube, AGNAVELIS label with blue shield.
- NOT documented anywhere -> omitted from site: applicator length, pack quantity, CE/FDA/ISO,
  MOQ, shelf-life value, lead time, private label/OEM, distributor network, samples.
- IFU storage temperature is an unresolved placeholder in the source document -> published only
  the qualitative storage wording ("store dry, protected from light, in original packaging").
- Implemented 6 pages, prerendered to static HTML, JSON-LD, sitemap, robots, llms.txt.
- Build and lint pass; all routes render and all WhatsApp/document links verified.
- Removed the template `vite-plugin-sitemap` so `dist/sitemap.xml` ships exactly the 6 canonical URLs (was 12 duplicated entries).
- Final static QA: unique title/description/canonical + JSON-LD on all 6 prerendered pages; no residual template metadata; no unsupported length/pack/CE/ISO/FDA/MOQ claims; images, PDF/DOCX downloads, robots.txt, llms.txt and favicon all present; single WhatsApp number 905059166388.
- Rendering check passed (grade 4).
