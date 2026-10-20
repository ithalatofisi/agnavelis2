import { useEffect } from 'react';
import { SITE_URL } from '@/lib/site';

interface SeoProps {
  /** Unique page title. */
  title: string;
  /** Unique meta description. */
  description: string;
  /** Route path, e.g. "/manufacturer". Used for the self-referencing canonical. */
  path: string;
  /** Absolute or root-relative social sharing image. */
  image?: string;
  /** One or more JSON-LD graph objects rendered into a single script tag. */
  jsonLd?: Record<string, unknown>[];
  /** Absolute canonical URL override; defaults to SITE_URL + path. */
  canonicalUrl?: string;
}

const OG_IMAGE =
  '/assets/agnavelis-silver-nitrate-applicator-sticks-wooden-shafts-hero.webp';

/** Serialisable head element, matching the prerender plugin's head API. */
interface HeadElement {
  type: string;
  props: Record<string, string>;
}

interface SeoSnapshot {
  title: string;
  description: string;
  canonical: string;
  image: string;
  jsonLd?: string;
}

/**
 * Metadata captured during render so that the build-time prerenderer can write
 * it into each route's static HTML `<head>`.
 */
let snapshot: SeoSnapshot | null = null;

/** Clears the captured metadata before rendering the next route. */
export function resetSeoSnapshot(): void {
  snapshot = null;
}

/**
 * Builds the head payload consumed by `vite-prerender-plugin` for the route
 * that was just rendered.
 */
export function getSeoHead(): {
  lang: string;
  title: string;
  elements: Set<HeadElement>;
} {
  const elements = new Set<HeadElement>();
  const current = snapshot;

  if (!current) {
    return { lang: 'en', title: '', elements };
  }

  const metas: HeadElement[] = [
    { type: 'meta', props: { name: 'description', content: current.description } },
    { type: 'meta', props: { name: 'robots', content: 'index,follow' } },
    { type: 'link', props: { rel: 'canonical', href: current.canonical } },
    { type: 'meta', props: { property: 'og:title', content: current.title } },
    { type: 'meta', props: { property: 'og:description', content: current.description } },
    { type: 'meta', props: { property: 'og:url', content: current.canonical } },
    { type: 'meta', props: { property: 'og:type', content: 'website' } },
    { type: 'meta', props: { property: 'og:site_name', content: 'AGNAVELIS' } },
    { type: 'meta', props: { property: 'og:image', content: current.image } },
    { type: 'meta', props: { property: 'og:locale', content: 'en' } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
    { type: 'meta', props: { name: 'twitter:title', content: current.title } },
    { type: 'meta', props: { name: 'twitter:description', content: current.description } },
    { type: 'meta', props: { name: 'twitter:image', content: current.image } },
  ];

  metas.forEach((element) => elements.add(element));

  if (current.jsonLd) {
    elements.add({
      type: 'script',
      props: {
        type: 'application/ld+json',
        'data-agnavelis-jsonld': 'true',
        textContent: current.jsonLd,
      },
    });
  }

  return { lang: 'en', title: current.title, elements };
}

/** Creates or updates a single meta/link element, keyed by selector. */
function upsertHeadTag(
  tagName: 'meta' | 'link',
  identifier: { attr: string; value: string },
  contentAttr: string,
  content: string
): void {
  const selector = `${tagName}[${identifier.attr}="${identifier.value}"]`;
  let element = document.head.querySelector<HTMLElement>(selector);

  if (!element) {
    element = document.createElement(tagName);
    element.setAttribute(identifier.attr, identifier.value);
    document.head.appendChild(element);
  }

  element.setAttribute(contentAttr, content);
}

/** Serialises the JSON-LD graph into the exact string used in both modes. */
function serialiseJsonLd(jsonLd?: Record<string, unknown>[]): string | undefined {
  if (!jsonLd || jsonLd.length === 0) {
    return undefined;
  }

  return JSON.stringify(
    jsonLd.length === 1 ? jsonLd[0] : { '@context': 'https://schema.org', '@graph': jsonLd }
  );
}

/**
 * Injects per-page SEO metadata, a self-referencing canonical URL and JSON-LD.
 *
 * During the build-time prerender the data is captured synchronously while
 * rendering and written into the static HTML; in the browser the same values are
 * applied to `document.head` on navigation.
 */
export default function Seo({
  title,
  description,
  path,
  image = OG_IMAGE,
  jsonLd,
  canonicalUrl,
}: SeoProps) {
  const canonical = canonicalUrl ?? `${SITE_URL}${path === '/' ? '/' : path}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const serialisedJsonLd = serialiseJsonLd(jsonLd);

  // Captured during render so the prerenderer can read it after renderToString.
  snapshot = {
    title,
    description,
    canonical,
    image: absoluteImage,
    jsonLd: serialisedJsonLd,
  };

  useEffect(() => {
    document.title = title;

    upsertHeadTag('meta', { attr: 'name', value: 'description' }, 'content', description);
    upsertHeadTag('meta', { attr: 'name', value: 'robots' }, 'content', 'index,follow');
    upsertHeadTag('link', { attr: 'rel', value: 'canonical' }, 'href', canonical);

    upsertHeadTag('meta', { attr: 'property', value: 'og:title' }, 'content', title);
    upsertHeadTag(
      'meta',
      { attr: 'property', value: 'og:description' },
      'content',
      description
    );
    upsertHeadTag('meta', { attr: 'property', value: 'og:url' }, 'content', canonical);
    upsertHeadTag('meta', { attr: 'property', value: 'og:type' }, 'content', 'website');
    upsertHeadTag(
      'meta',
      { attr: 'property', value: 'og:site_name' },
      'content',
      'AGNAVELIS'
    );
    upsertHeadTag(
      'meta',
      { attr: 'property', value: 'og:image' },
      'content',
      absoluteImage
    );
    upsertHeadTag('meta', { attr: 'property', value: 'og:locale' }, 'content', 'en');

    upsertHeadTag(
      'meta',
      { attr: 'name', value: 'twitter:card' },
      'content',
      'summary_large_image'
    );
    upsertHeadTag('meta', { attr: 'name', value: 'twitter:title' }, 'content', title);
    upsertHeadTag(
      'meta',
      { attr: 'name', value: 'twitter:description' },
      'content',
      description
    );
    upsertHeadTag(
      'meta',
      { attr: 'name', value: 'twitter:image' },
      'content',
      absoluteImage
    );

    // Exactly one JSON-LD block per page: replace, never append.
    const existing = document.head.querySelector('script[data-agnavelis-jsonld]');
    if (existing) {
      existing.remove();
    }

    if (serialisedJsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-agnavelis-jsonld', 'true');
      script.textContent = serialisedJsonLd;
      document.head.appendChild(script);
    }
  }, [title, description, canonical, absoluteImage, serialisedJsonLd]);

  return null;
}

/** Organization node reused by several pages, kept identical for consistency. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Builds a BreadcrumbList for inner pages. */
export function breadcrumbJsonLd(
  trail: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
    })),
  };
}
