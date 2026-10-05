import { useState } from 'react'
import { JsonLd } from '../components/JsonLd'
import { breadcrumb, graph, webPage, BUSINESS_ID } from '../lib/schema'
import { AnimatePresence, motion } from 'framer-motion'
import { Partners } from '../components/sections/Partners'
import { Testimonials } from '../components/sections/Testimonials'
import { tones } from '../components/sections/Services/tones'
import { PageCta, PageHero, PrimaryButton, GhostButton, HeroFacts } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getDomain } from '../utils/url'
import { projects, projectKinds, type ProjectKind } from '../data/content'

type Filter = 'all' | ProjectKind

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All work' },
  ...projectKinds.filter((k) => projects.some((p) => p.kinds.includes(k.id))),
]

const schema = graph(
  webPage({
    type: 'CollectionPage',
    path: '/portfolio',
    name: 'Portfolio — NestHub Solution',
    description: 'Selected websites, e-commerce stores, apps and AI platforms built by NestHub Solution for brands across India.',
    speakable: ['h1', '.page-summary'],
  }),
  {
    '@type': 'ItemList',
    name: 'NestHub Solution portfolio',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.title,
        description: p.body,
        genre: p.category,
        keywords: p.tags.join(', '),
        url: p.href,
        creator: { '@id': BUSINESS_ID },
      },
    })),
  },
  breadcrumb([{ name: 'Portfolio', path: '/portfolio' }]),
)

export function PortfolioPage() {
  useDocumentTitle(
    'Portfolio — Websites, Apps & AI Projects | NestHub Solution',
    'Selected websites, e-commerce stores, apps and AI platforms built by NestHub Solution for brands across India.',
    '/portfolio',
    'web development portfolio Jaipur, website design examples India, e-commerce website portfolio, NestHub Solution projects',
  )
  const [filter, setFilter] = useState<Filter>('all')
  const shown = filter === 'all' ? projects : projects.filter((p) => p.kinds.includes(filter))

  return (
    <main id="top" className="relative z-[1] pb-4 pt-32 sm:pt-40">
      <JsonLd data={schema} />
      <PageHero
        crumb="Portfolio"
        eyebrow="Selected work"
        title={
          <>
            Work that ships
            <br />
            <span className="text-brand-500">and performs.</span>
          </>
        }
        description="Every project here is live and in use — from artisanal e-commerce to trading education platforms and pharma brand systems. Open any one to see the full case study."
        aside={
          <HeroFacts
            facts={[
              { label: 'Live projects', value: `${projects.length}+` },
              { label: 'Industries', value: String(new Set(projects.map((p) => p.category)).size) },
              { label: 'Satisfaction', value: '100%' },
              { label: 'Avg. Lighthouse', value: '98' },
            ]}
          />
        }
      >
        <PrimaryButton href="/case-studies">Read case studies →</PrimaryButton>
        <GhostButton href="/contact">Start yours</GhostButton>
      </PageHero>

      <section className="mx-auto max-w-[1320px] px-6 pt-14">
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = f.id === filter
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`relative rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
                  active ? 'border-ink text-white' : 'border-line bg-white text-muted hover:text-ink'
                }`}
              >
                {active && <motion.span layoutId="portfolio-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{f.label}</span>
              </button>
            )
          })}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => {
              const c = tones[p.accent]
              return (
                <motion.article
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
                  className="group overflow-hidden rounded-[24px] border border-line bg-white"
                >
                  <a href={`/case-studies#${p.slug}`} className="block text-ink">
                    <div className="relative aspect-[16/10] overflow-hidden" style={{ background: `linear-gradient(160deg, ${c[50]}, ${c[100]})` }}>
                      <img
                        src={p.screen}
                        alt={`${p.title} website`}
                        loading="lazy"
                        className="absolute inset-x-8 top-8 w-[calc(100%-4rem)] rounded-t-xl object-cover object-top shadow-[0_20px_50px_rgba(0,0,0,.18)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-3"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold backdrop-blur" style={{ color: c[700] }}>
                        {p.category}
                      </span>
                    </div>
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-[22px] font-bold tracking-[-.025em]">{p.title}</h2>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                          ↗
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-[15px] leading-[1.6] text-muted">{p.body}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-[13px]">
                        {p.outcome && (
                          <span className="font-semibold" style={{ color: c[600] }}>
                            ▲ {p.outcome}
                          </span>
                        )}
                        {p.stack && <span className="text-muted">{p.stack}</span>}
                        <span className="ml-auto font-mono text-muted">{getDomain(p.href)}</span>
                      </div>
                    </div>
                  </a>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <Partners />
      <Testimonials />
      <PageCta title="Your project could be next." />
    </main>
  )
}
