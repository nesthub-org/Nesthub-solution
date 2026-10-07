import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { Parallax } from '../Parallax'
import { getDomain } from '../../utils/url'
import { projects, projectKinds, type Project, type ProjectKind } from '../../data/content'
import { SplitText } from '../SplitText'

type Filter = 'all' | ProjectKind

// The homepage features the first four projects; the full set lives on /case-studies.
const featured = projects.slice(0, 4)

// Only offer filters that actually have projects behind them.
const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...projectKinds.filter((k) => featured.some((p) => p.kinds.includes(k.id))),
]

export function Work() {
  const [filter, setFilter] = useState<Filter>('all')
  const shown = filter === 'all' ? featured : featured.filter((p) => p.kinds.includes(filter))

  return (
    <section id="work" className="relative mx-auto mt-28 max-w-[1320px] px-6 sm:mt-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <span className="text-[13px] font-semibold text-brand-500">Selected work</span>
            <SplitText className="mt-2 text-[34px] font-bold leading-[1.05] tracking-[-.04em] sm:text-[46px] lg:text-[56px]">
              Projects we're proud of
            </SplitText>
          </div>

          {filters.length > 2 && (
            <div role="tablist" aria-label="Filter projects" className="flex rounded-xl border border-line bg-surface p-1">
              {filters.map((f) => {
                const active = f.id === filter
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.id)}
                    className={`relative rounded-lg px-4 py-1.5 text-[13.5px] font-medium transition-colors ${active ? 'text-ink' : 'text-muted hover:text-ink'}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="work-filter"
                        className="absolute inset-0 rounded-lg bg-white shadow-[0_1px_4px_rgba(17,17,17,.1)] ring-1 ring-line"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{f.label}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </Reveal>

      <AnimatePresence mode="popLayout" initial={false}>
        {shown.map((p, i) => (
          <motion.article
            key={p.slug}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line py-12 sm:py-16"
          >
            <Reveal>
              <ProjectRow project={p} index={i} />
            </Reveal>
          </motion.article>
        ))}
      </AnimatePresence>

      <Reveal>
        <div className="mt-10 flex justify-center">
          <a
            href="/portfolio"
            className="group inline-flex h-12 items-center gap-2 rounded-2xl border border-line bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
          >
            All case studies
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              <path d="M4 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  )
}

function ProjectRow({ project: p, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1
  const meta = [
    { label: 'Built with', value: p.stack },
    { label: 'Outcome', value: p.outcome },
    { label: 'Year', value: p.year },
  ].filter((m): m is { label: string; value: string } => !!m.value)

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? 'lg:order-2' : undefined}>
        <Parallax offset={flip ? -40 : 40}>
          <BrowserFrame project={p} />
        </Parallax>
      </div>

      <div className={flip ? 'lg:order-1' : undefined}>
        <span
          aria-hidden
          className="block text-[64px] font-medium leading-none tracking-[-.05em] sm:text-[84px]"
          style={{ WebkitTextStroke: '1.5px var(--color-brand-500)', color: 'transparent' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="mt-4 text-[13px] font-semibold text-brand-500">{p.category}</p>
        <h3 className="mt-2 text-[30px] font-bold leading-[1.08] tracking-[-.035em] sm:text-[40px]">{p.title}</h3>
        <p className="mt-3 max-w-[540px] text-[16px] leading-[1.6] text-muted">{p.body}</p>

        {meta.length > 0 && (
          <dl
            className="mt-6 grid gap-4 border-t border-line pt-5"
            style={{ gridTemplateColumns: `repeat(${meta.length}, minmax(0, 1fr))` }}
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[12px] text-muted">{m.label}</dt>
                <dd className="mt-1 text-[14.5px] font-semibold leading-snug text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-brand-500 hover:text-brand-600"
        >
          Visit live site
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </div>
  )
}

function BrowserFrame({ project: p }: { project: Project }) {
  const domain = getDomain(p.href)
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${p.title}: open live site`}
      className="group block rounded-[18px] bg-[#0e1014] p-2 shadow-[0_30px_70px_-28px_rgba(15,23,42,.55)] ring-1 ring-black/10 transition-transform duration-500 ease-out hover:-translate-y-1.5 sm:p-2.5"
    >
      <div className="flex items-center gap-1.5 px-2 pb-2 pt-1 sm:pb-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[.07] px-3 text-[11px] text-white/55">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden className="shrink-0">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <span className="truncate">{domain}</span>
        </span>
      </div>
      <div className="relative aspect-[12/7] overflow-hidden rounded-[10px] bg-[#0e1014]">
        <img
          src={p.screen}
          alt={`${p.title} website`}
          loading="lazy"
          width={1200}
          height={700}
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="mb-5 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-ink shadow-lg transition-transform duration-300 group-hover:translate-y-0">
            Visit {domain}
          </span>
        </div>
      </div>
    </a>
  )
}
