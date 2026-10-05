// Shared schema.org builders for per-route JSON-LD. The business, website and
// job nodes live once in index.html; everything page-specific is rendered by
// the page itself (via <JsonLd>) so each URL only describes itself.
import { SITE_URL } from './blog'
import { services, type FaqItem } from '../data/content'

export const BUSINESS_ID = `${SITE_URL}/#business`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  }
}

export function webPage(opts: {
  type?: string
  path: string
  name: string
  description: string
  /** CSS selectors of the passages voice assistants / answer engines should read aloud. */
  speakable?: string[]
  extra?: Record<string, unknown>
}) {
  const url = `${SITE_URL}${opts.path}`
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-IN',
    dateModified: '2026-10-05',
    ...(opts.speakable && { speakable: { '@type': 'SpeakableSpecification', cssSelector: opts.speakable } }),
    ...opts.extra,
  }
}

export function faqPage(path: string, items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${path}#faq`,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function graph(...nodes: unknown[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

/** Service + breadcrumb graph for a /services/* detail page, built from the shared services list. */
export function servicePageSchema(path: string, pageTitle: string, pageDescription: string) {
  const s = services.find((x) => x.href === path)
  const name = s?.title ?? pageTitle
  return graph(
    webPage({ path, name: pageTitle, description: pageDescription, speakable: ['h1'] }),
    {
      '@type': 'Service',
      '@id': `${SITE_URL}${path}#service`,
      name,
      serviceType: s?.badge ?? name,
      description: pageDescription,
      url: `${SITE_URL}${path}`,
      provider: { '@id': BUSINESS_ID },
      areaServed: [
        { '@type': 'City', name: 'Jaipur' },
        { '@type': 'Country', name: 'India' },
      ],
      ...(s && { keywords: s.tags.join(', ') }),
    },
    breadcrumb([
      { name: 'Services', path: '/services' },
      { name, path },
    ]),
  )
}
