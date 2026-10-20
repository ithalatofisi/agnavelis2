# Architecture Design

## System Overview

Static, fully client-free-content marketing site for AGNAVELIS Silver Nitrate Applicator Sticks.
Single-page-application shell (React Router) that is additionally **prerendered at build time** to
static HTML per route, so every indexable page ships crawlable text, unique metadata and JSON-LD
without a server. No backend, no database, no forms that submit. All conversion goes to WhatsApp
via `wa.me` deep links built from one configuration constant.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Build | Vite 5 |
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS + shadcn/ui primitives (Accordion, Card, Button, Table, Separator) |
| Routing | react-router-dom 6 |
| SEO | `vite-prerender-plugin` (already in devDependencies) + hand-written `<head>` injection |
| Icons | lucide-react |
| Hosting assumption | static file host at https://agnavelis.com |

## Module Design

| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Site facts | Single source of verified product/company facts, FAQ entries, nav model, WhatsApp config | `src/lib/site.ts` |
| SEO head | Per-page title, description, canonical, OG/Twitter, robots, JSON-LD injection | `src/components/Seo.tsx` |
| Layout | Header nav, footer with disclaimers, sticky WhatsApp button, page shell + breadcrumbs | `src/components/SiteLayout.tsx` |
| Pages | Six route components, content only | `src/pages/Home.tsx`, `Product.tsx`, `Manufacturer.tsx`, `Documentation.tsx`, `InstructionsForUse.tsx`, `Contact.tsx` |
| Routing | Route table for the six public URLs | `src/App.tsx` |
| Prerender | Renders each route to static HTML at build time | `prerender/site.js`, `vite.config.ts` |
| Static SEO files | robots, sitemap, llms.txt, favicon | `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/favicon.svg` |

## Tech Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering | Build-time prerender of all 6 routes | Brief requires key facts in server-rendered/static HTML for SEO and AI extraction; template already ships `vite-prerender-plugin`. |
| Enquiry channel | WhatsApp `wa.me` deep links only | No backend exists, so a submitting form is impossible; brief forbids non-functional forms. |
| WhatsApp number | Single exported constant `WHATSAPP_NUMBER` in `src/lib/site.ts`; UI hidden when empty | Brief requires one clearly marked configuration point and no button until a valid number exists. |
| Unverified facts | Omitted entirely (length, pack size, CE/FDA/ISO, MOQ, lead time, OEM) | Regulatory safety; brief forbids invention. |
| Sitemap | Hand-written `public/sitemap.xml`, template `Sitemap()` plugin left generating into dist but overridden by the static file | Guarantees only the 6 canonical URLs are listed. |
| Structured data | Organization + WebSite on home, Product + BreadcrumbList on product, BreadcrumbList on inner pages, FAQPage only where Q&A is visible | Matches visible content; avoids Offer/Review/AggregateRating per brief. |
| Images | Supplied photographs only, WebP with PNG fallback kept, explicit width/height, hero eager, rest lazy | Prevents CLS; brief bans AI renders and plastic applicators. |
| Colour system | Navy `#0f2f56`-family primary, medical blue accent, kraft warm neutral, tinted off-white base | Matches AGNAVELIS label and kraft tube. |

## File Tree Plan

```
app/frontend/
  index.html                      (favicon + base meta, mgx markers untouched)
  vite.config.ts                  (+ prerender of 6 routes)
  prerender/site.js               (prerender entry)
  public/
    robots.txt  sitemap.xml  llms.txt  favicon.svg
    assets/agnavelis-*.webp|png    (3 supplied photos)
    docs/AGNAVELIS-...-IFU-EN-TR-Rev00.docx
    docs/AGNAVELIS-...-Brochure.pdf
  src/
    lib/site.ts
    components/Seo.tsx  SiteLayout.tsx
    pages/Home.tsx  Product.tsx  Manufacturer.tsx  Documentation.tsx
          InstructionsForUse.tsx  Contact.tsx
    App.tsx  main.tsx  index.css
```

## Implementation Guide

1. `src/lib/site.ts` is the only place facts live. Never hardcode a product fact in a page.
2. Any new claim must be traceable to the IFU or brochure. If it is not in `site.ts`, it is not verified.
3. `WHATSAPP_NUMBER` empty string -> all WhatsApp CTAs and the sticky button disappear automatically.
4. Every page renders exactly one `<h1>` and passes `title`, `description`, `path` and optional
   `jsonLd` to `<Seo>`; `Seo` writes the canonical as `https://agnavelis.com` + path.
5. Adding a route means: create the page, add it to `App.tsx`, add it to `NAV`/`prerenderRoutes`
   in `vite.config.ts` and to `public/sitemap.xml`.
