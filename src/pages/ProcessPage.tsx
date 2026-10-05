import { motion } from 'framer-motion'
import { JsonLd } from '../components/JsonLd'
import { breadcrumb, graph, webPage } from '../lib/schema'
import { SITE_URL } from '../lib/blog'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { tones } from '../components/sections/Services/tones'
import { PageCta, PageHero, PrimaryButton, GhostButton, HeroFacts, SectionHead } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { steps, processHighlights, type ServiceAccent } from '../data/content'

const accentCycle: ServiceAccent[] = ['violet', 'sky', 'orange', 'emerald', 'amber', 'teal']

// What actually happens inside each step — keyed by step number.
const detail: Record<string, { weDo: string[]; youGet: string[]; youDo: string }> = {
  '01': {
    weDo: ['Kick-off call with your stakeholders', 'Audit of your current site, analytics & competitors', 'Define goals, audience and success metrics'],
    youGet: ['Written project brief', 'Sitemap & feature list', 'Fixed quote and timeline'],
    youDo: 'Share access, goals and any brand material you already have.',
  },
  '02': {
    weDo: ['Low-fidelity wireframes for key pages', 'Visual direction & design system in Figma', 'Live review sessions — not email threads'],
    youGet: ['Clickable Figma prototype', 'Design system (type, colour, components)', 'Mobile & desktop layouts'],
    youDo: 'Join two short review calls and sign off the design.',
  },
  '03': {
    weDo: ['Component-driven build in React / Next.js', 'CMS, integrations and AI features wired up', 'Preview link on every change'],
    youGet: ['Weekly progress demo', 'Private staging URL', 'Content entry guide'],
    youDo: 'Review the staging site and send content when ready.',
  },
  '04': {
    weDo: ['Cross-browser & cross-device QA', 'Accessibility and Core Web Vitals checks', 'Form, payment and tracking tests'],
    youGet: ['QA report with fixes logged', 'Lighthouse scores per page', 'Final sign-off checklist'],
    youDo: 'Do a final walkthrough and flag anything that feels off.',
  },
  '05': {
    weDo: ['Zero-downtime deploy & DNS switch', '301 redirects mapped from the old site', 'Analytics, Search Console & monitoring live'],
    youGet: ['Live website', 'Handover video & credentials', 'Launch-day support'],
    youDo: 'Celebrate. Share the link.',
  },
  '06': {
    weDo: ['Uptime & performance monitoring', 'Monthly report and improvement roadmap', 'Bug fixes and small changes'],
    youGet: ['A named engineer to message', 'Monthly performance report', 'Priority response'],
    youDo: 'Tell us what is next for the business.',
  },
}

function Column({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div>
      <div className="text-[12px] font-semibold uppercase tracking-[.1em] text-muted">{title}</div>
      <ul className="mt-3 grid gap-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-[14.5px] leading-[1.5] text-ink/85">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

const schema = graph(
  webPage({
    path: '/process',
    name: 'Our Process — How NestHub Builds Websites & Apps',
    description: 'Discovery, design, development, testing, launch and support — the six-step process NestHub Solution uses on every project.',
    speakable: ['h1', '.page-summary'],
  }),
  {
    '@type': 'HowTo',
    '@id': `${SITE_URL}/process#howto`,
    name: 'How NestHub Solution builds a website or app',
    description: 'The six-step process NestHub Solution follows on every website, app and AI project.',
    step: steps.map((st, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: st.title,
      text: `${st.body} Typical duration: ${st.duration}.`,
      url: `${SITE_URL}/process#step-${st.n}`,
    })),
  },
  breadcrumb([{ name: 'Process', path: '/process' }]),
)

export function ProcessPage() {
  useDocumentTitle(
    'Our Process — How NestHub Builds Websites & Apps | NestHub Solution',
    'Discovery, design, development, testing, launch and support — the six-step process NestHub Solution uses on every project.',
    '/process',
    'website development process, web design process steps, how long does a website take, agency project process India',
  )

  return (
    <main id="top" className="relative z-[1] pb-4 pt-32 sm:pt-40">
      <JsonLd data={schema} />
      <PageHero
        crumb="Process"
        eyebrow="How we work"
        title={
          <>
            Six steps.
            <br />
            <span className="text-brand-500">No surprises.</span>
          </>
        }
        description="You'll always know what is happening this week, what you'll get at the end of it, and what we need from you. Here is exactly how a NestHub project runs."
        aside={
          <HeroFacts
            facts={[
              { label: 'Steps', value: '6' },
              { label: 'Typical site', value: '3–5 wks' },
              { label: 'Landing page', value: '1–2 wks' },
              { label: 'Updates', value: 'Weekly' },
            ]}
          />
        }
      >
        <PrimaryButton href="/contact">Start step 01 →</PrimaryButton>
        <GhostButton href="/faq">Timeline FAQs</GhostButton>
      </PageHero>

      {/* Sticky step index + detailed steps */}
      <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 pt-16 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-32 grid gap-1">
            {steps.map((st, i) => (
              <a
                key={st.n}
                href={`#step-${st.n}`}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <span className="font-mono text-[12px] font-bold" style={{ color: tones[accentCycle[i]][500] }}>
                  {st.n}
                </span>
                {st.title}
                <span className="ml-auto text-[12px] text-muted/70">{st.duration}</span>
              </a>
            ))}
          </nav>
        </aside>

        <ol className="relative grid gap-6">
          {steps.map((st, i) => {
            const c = tones[accentCycle[i % accentCycle.length]]
            const d = detail[st.n]
            return (
              <motion.li
                key={st.n}
                id={`step-${st.n}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative scroll-mt-32 overflow-hidden rounded-[28px] border border-line bg-white"
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: c[400] }} />
                <div className="grid grid-cols-1 gap-8 p-7 sm:p-10 md:grid-cols-[auto_1fr]">
                  <div className="flex items-center gap-4 md:flex-col md:items-start">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: c[50], boxShadow: `inset 0 0 0 1px ${c[200]}` }}>
                      <Icon name={st.icon} color={c[600]} size={28} />
                    </span>
                    <span className="text-[56px] font-bold leading-none tracking-[-.06em]" style={{ color: c[200] }}>
                      {st.n}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-[28px] font-bold tracking-[-.03em] sm:text-[34px]">{st.title}</h2>
                      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold" style={{ background: c[50], color: c[700] }}>
                        <Icon name="clock" size={13} color={c[600]} />
                        {st.duration}
                      </span>
                    </div>
                    <p className="mt-3 max-w-[640px] text-[16.5px] leading-[1.65] text-muted">{st.body}</p>
                    <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <Column title="What we do" items={d.weDo} color={c[400]} />
                      <Column title="What you get" items={d.youGet} color={c[400]} />
                    </div>
                    <div className="mt-8 flex items-start gap-3 rounded-2xl bg-surface p-4 text-[14.5px]">
                      <span className="font-semibold text-ink">Your part:</span>
                      <span className="text-muted">{d.youDo}</span>
                    </div>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <SectionHead center eyebrow="Our promises" title="What stays true on every project." />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processHighlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.06} tilt={false}>
              <div className="h-full rounded-[22px] border border-line bg-white p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <Icon name={h.icon} color="#2563EB" size={22} />
                </span>
                <div className="mt-5 text-[17px] font-semibold tracking-[-.01em]">{h.title}</div>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <PageCta title="Ready for step 01?" body="Discovery starts with a free 30-minute call. You'll leave with a clear plan, whether or not we work together." />
    </main>
  )
}
