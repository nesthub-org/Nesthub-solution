import { motion } from 'framer-motion'
import { JsonLd } from '../components/JsonLd'
import { breadcrumb, graph, webPage, BUSINESS_ID } from '../lib/schema'
import { SITE_URL } from '../lib/blog'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { TechStack } from '../components/sections/TechStack'
import { tones } from '../components/sections/Services/tones'
import { PageCta, PageHero, PrimaryButton, GhostButton, HeroFacts, SectionHead } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { services, steps } from '../data/content'

const engagement = [
  {
    title: 'Fixed-scope project',
    body: 'A defined brief, a firm quote and a launch date. Best for new websites, redesigns and MVPs.',
    points: ['Written scope & timeline', 'Milestone-based payments', '30 days post-launch support'],
  },
  {
    title: 'Monthly partnership',
    body: 'A dedicated slice of our team every month for growth work, new features and marketing.',
    points: ['Named engineer & designer', 'Monthly roadmap & report', 'Pause or scale any month'],
    featured: true,
  },
  {
    title: 'Audit & consultation',
    body: 'A one-off deep dive into your site, app or funnel with a prioritised list of fixes.',
    points: ['Performance & SEO audit', 'UX review with recordings', 'Action plan you can own'],
  },
]

const schema = graph(
  webPage({
    type: 'CollectionPage',
    path: '/services',
    name: 'Services — NestHub Solution',
    description: 'Website development, AI integration, mobile apps, UI/UX design, SEO and social media marketing from one senior team in Jaipur.',
    speakable: ['h1', '.page-summary'],
    extra: { mainEntity: { '@id': `${SITE_URL}/services#list` } },
  }),
  {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/services#list`,
    name: 'NestHub Solution services',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.body,
        serviceType: s.badge,
        url: `${SITE_URL}${s.href}`,
        provider: { '@id': BUSINESS_ID },
        areaServed: { '@type': 'Country', name: 'India' },
      },
    })),
  },
  breadcrumb([{ name: 'Services', path: '/services' }]),
)

export function ServicesPage() {
  useDocumentTitle(
    'Services — Web, AI, App, SEO & Design | NestHub Solution Jaipur',
    'Website development, AI integration, mobile apps, UI/UX design, SEO and social media marketing from one senior team in Jaipur.',
    '/services',
    'web development services Jaipur, AI integration agency India, mobile app development Jaipur, UI UX design agency, SEO company Jaipur, social media marketing agency India',
  )

  return (
    <main id="top" className="relative z-[1] pb-4 pt-32 sm:pt-40">
      <JsonLd data={schema} />
      <PageHero
        crumb="Services"
        eyebrow="What we do"
        title={
          <>
            Six services.
            <br />
            <span className="text-brand-500">One senior team.</span>
          </>
        }
        description="Strategy, design, engineering and growth under one roof — so nothing gets lost in a hand-off between agencies. Pick one service or combine them into a full launch."
        aside={
          <HeroFacts
            facts={[
              { label: 'Services', value: String(services.length) },
              { label: 'Hand-offs', value: '0' },
              { label: 'Reply time', value: '< 24h' },
              { label: 'Lighthouse', value: '98/100' },
            ]}
          />
        }
      >
        <PrimaryButton href="/contact">Start a project →</PrimaryButton>
        <GhostButton href="/process">See how we work</GhostButton>
      </PageHero>

      {/* Service index */}
      <section className="mx-auto max-w-[1320px] px-6 pt-16">
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const c = tones[s.accent]
            return (
              <Reveal key={s.title} delay={(i % 2) * 0.08} tilt={false}>
                <motion.a
                  href={s.href}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white p-7 text-ink transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,.08)] sm:p-9"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                    style={{ background: c[100] }}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: c[50], boxShadow: `inset 0 0 0 1px ${c[200]}` }}>
                      <Icon name={s.icon} color={c[600]} size={26} />
                    </span>
                    <span className="font-mono text-[13px] font-bold" style={{ color: c[400] }}>
                      {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="relative mt-6 text-[12px] font-semibold uppercase tracking-[.1em]" style={{ color: c[600] }}>
                    {s.badge}
                  </span>
                  <h2 className="relative mt-1.5 text-[26px] font-bold tracking-[-.03em] sm:text-[30px]">{s.title}</h2>
                  <p className="relative mt-3 text-[15.5px] leading-[1.65] text-muted">{s.body}</p>
                  <div className="relative mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line bg-surface px-3 py-1 text-[12.5px] font-medium text-ink/80">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="relative mt-auto flex items-center gap-2 pt-8 text-[14.5px] font-semibold" style={{ color: c[600] }}>
                    Explore {s.title}
                    <motion.span variants={{ rest: { x: 0 }, hover: { x: 6 } }}>→</motion.span>
                  </div>
                </motion.a>
              </Reveal>
            )
          })}
        </ol>
      </section>

      {/* How we engage */}
      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <SectionHead
          center
          eyebrow="Ways to work together"
          title="Pick the engagement that fits."
          body="Every engagement starts with a free 30-minute discovery call and a written proposal — no surprises later."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {engagement.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08} tilt={false}>
              <div
                className={`relative flex h-full flex-col rounded-[24px] border p-8 ${
                  e.featured ? 'border-ink bg-ink text-white shadow-[0_24px_60px_rgba(17,17,17,.2)]' : 'border-line bg-white'
                }`}
              >
                {e.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.08em] text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-[21px] font-semibold tracking-[-.02em]">{e.title}</h3>
                <p className={`mt-3 text-[15px] leading-[1.6] ${e.featured ? 'text-white/65' : 'text-muted'}`}>{e.body}</p>
                <ul className="mt-6 grid gap-3">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[14.5px]">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${e.featured ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-500'}`}>
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process teaser */}
      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Our process" title="From first call to launch in six steps." />
          <Reveal tilt={false}>
            <GhostButton href="/process">Full process →</GhostButton>
          </Reveal>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {steps.map((st, i) => (
            <Reveal key={st.n} delay={i * 0.05} tilt={false}>
              <div className="h-full rounded-2xl border border-line bg-white p-5">
                <span className="font-mono text-[12px] font-bold text-brand-500">{st.n}</span>
                <div className="mt-2 text-[16px] font-semibold tracking-[-.01em]">{st.title}</div>
                <div className="mt-1 text-[13px] text-muted">{st.duration}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <TechStack />
      <PageCta title="Not sure which service you need?" body="Tell us the goal, not the deliverable. We'll recommend the smallest thing that moves the needle." />
    </main>
  )
}
