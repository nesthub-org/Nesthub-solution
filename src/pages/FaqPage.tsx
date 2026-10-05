import { useMemo, useState } from 'react'
import { JsonLd } from '../components/JsonLd'
import { breadcrumb, graph, webPage, faqPage } from '../lib/schema'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { PageCta, PageHero, PrimaryButton, GhostButton } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand, faqs, type FaqItem } from '../data/content'

type Category = 'About us' | 'Services' | 'Pricing & timelines' | 'Working together'

// The shared FAQ list (also used on the homepage) gets a category here; a few
// page-only questions about working together are added on top.
const categorised: (FaqItem & { cat: Category })[] = [
  ...faqs.map((f) => ({
    ...f,
    cat: (/cost|long|price/i.test(f.q)
      ? 'Pricing & timelines'
      : /services|integrate|mobile apps/i.test(f.q)
        ? 'Services'
        : 'About us') as Category,
  })),
  {
    q: 'What do you need from me to get started?',
    a: 'Just a short call. Tell us your goals, audience and any deadlines — we turn that into a written brief and a fixed quote within a few days.',
    cat: 'Working together',
  },
  {
    q: 'How do payments work?',
    a: 'Fixed-scope projects are paid in milestones (typically at kick-off, design sign-off and launch). Monthly partnerships are billed at the start of each month.',
    cat: 'Pricing & timelines',
  },
  {
    q: 'Will I own the website and code?',
    a: 'Yes. Once the final invoice is paid, the code, design files, domain and content are fully yours.',
    cat: 'Working together',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Every project includes 30 days of post-launch support. After that, most clients move to a monthly plan with a named engineer.',
    cat: 'Working together',
  },
  {
    q: 'How will we communicate during the project?',
    a: 'A shared WhatsApp or Slack channel for quick questions, a weekly progress demo, and a staging link you can check any time.',
    cat: 'Working together',
  },
]

const categories: ('All' | Category)[] = ['All', 'About us', 'Services', 'Pricing & timelines', 'Working together']

function highlight(text: string, q: string) {
  if (!q) return text
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-brand-100 px-0.5 text-ink">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  )
}

const schema = graph(
  webPage({
    path: '/faq',
    name: 'FAQ — NestHub Solution',
    description: 'Answers about NestHub Solution: pricing, project timelines, AI integration, mobile apps, payments, ownership and support.',
    speakable: ['h1', '.page-summary'],
  }),
  faqPage('/faq', categorised),
  breadcrumb([{ name: 'FAQ', path: '/faq' }]),
)

export function FaqPage() {
  useDocumentTitle(
    'FAQ — Pricing, Timelines & Services | NestHub Solution',
    'Answers about NestHub Solution: pricing, project timelines, AI integration, mobile apps, payments, ownership and support.',
    '/faq',
    'website cost India, how long to build a website, web development FAQ, NestHub Solution questions',
  )
  const [cat, setCat] = useState<(typeof categories)[number]>('All')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>(categorised[0].q)

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return categorised.filter((f) => (cat === 'All' || f.cat === cat) && (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)))
  }, [cat, query])

  return (
    <main id="top" className="relative z-[1] pb-4 pt-32 sm:pt-40">
      <JsonLd data={schema} />
      <PageHero
        crumb="FAQ"
        eyebrow={`${categorised.length} answers`}
        title={
          <>
            Questions,
            <br />
            <span className="text-brand-500">answered.</span>
          </>
        }
        description="Everything you need to know before booking a call. Search below or browse by topic — and if yours isn't here, just ask."
      >
        <PrimaryButton href="/contact">Ask us directly →</PrimaryButton>
        <GhostButton href={`https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}`} external>
          WhatsApp us
        </GhostButton>
      </PageHero>

      <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-6 pt-14 lg:grid-cols-[280px_1fr]">
        <aside>
          <div className="lg:sticky lg:top-32">
            <label className="relative block">
              <span className="sr-only">Search questions</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions…"
                className="h-12 w-full rounded-xl border border-line bg-white pl-11 pr-4 text-[15px] outline-none transition-shadow focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(37,99,235,.1)]"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </label>
            <div className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {categories.map((c) => {
                const count = c === 'All' ? categorised.length : categorised.filter((f) => f.cat === c).length
                const active = cat === c
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    className={`flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-[14.5px] font-medium transition-colors ${
                      active ? 'bg-ink text-white' : 'border border-line bg-white text-muted hover:text-ink lg:border-transparent lg:bg-transparent lg:hover:bg-surface'
                    }`}
                  >
                    {c}
                    <span className={`text-[12px] ${active ? 'text-white/60' : 'text-muted/70'}`}>{count}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        <div className="grid content-start gap-3">
          {shown.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
              No matches for “{query}”.{' '}
              <a href="/contact" className="font-semibold">
                Ask us instead →
              </a>
            </div>
          )}
          {shown.map((item, i) => {
            const isOpen = open === item.q || (query.trim() !== '' && shown.length <= 3)
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.03, 0.15)} tilt={false}>
                <div className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${isOpen ? 'border-brand-200 shadow-[0_10px_30px_rgba(37,99,235,.06)]' : 'border-line'}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === item.q ? null : item.q)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span>
                      <span className="block text-[11.5px] font-semibold uppercase tracking-[.1em] text-brand-500">{item.cat}</span>
                      <span className="mt-1 block text-[16.5px] font-semibold tracking-[-.01em]">{highlight(item.q, query.trim())}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[18px] ${isOpen ? 'border-brand-500 bg-brand-50 text-brand-500' : 'border-line text-ink'}`}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                        <p className="px-6 pb-6 text-[15.5px] leading-[1.7] text-muted">{highlight(item.a, query.trim())}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <PageCta title="Still have a question?" body={`Email ${brand.email} or message us on WhatsApp — a real person replies within one business day.`} />
    </main>
  )
}
