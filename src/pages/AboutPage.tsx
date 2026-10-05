import { motion } from 'framer-motion'
import { JsonLd } from '../components/JsonLd'
import { breadcrumb, graph, webPage, BUSINESS_ID } from '../lib/schema'
import { SITE_URL } from '../lib/blog'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Team } from '../components/sections/Team'
import { TrustBar } from '../components/sections/TrustBar'
import { Partners } from '../components/sections/Partners'
import { PageCta, PageHero, PrimaryButton, GhostButton, SectionHead } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { aboutIntro, brand, team, values } from '../data/content'

const story = [
  { year: '2025', title: 'NestHub is founded', body: 'Started in Jaipur with one idea: senior people doing the work themselves, no hand-offs.' },
  { year: '2025', title: 'First client launches', body: 'Vedyara Agro Foods goes live with a full e-commerce store — online sales triple.' },
  { year: '2025', title: 'ScanIt is born', body: 'We build our own QR ordering product for restaurants, alongside client work.' },
  { year: '2026', title: 'Growing across India', body: 'Clients from Delhi to Bangalore, plus AI integrations, apps and growth marketing.' },
]

const principles = [
  { n: '01', title: 'The people you meet build it', body: 'No sales team handing you off to juniors. The person on your discovery call is on your project.' },
  { n: '02', title: 'Fast is a feature', body: 'Every site we ship targets a 95+ Lighthouse score. Speed sells, and search engines agree.' },
  { n: '03', title: 'Written, not assumed', body: 'Scopes, timelines and decisions are written down so nobody is ever guessing.' },
  { n: '04', title: 'We stick around', body: 'Launch is the start. Most of our clients stay on for support and growth work.' },
]

const schema = graph(
  webPage({
    type: 'AboutPage',
    path: '/about',
    name: 'About NestHub Solution',
    description: aboutIntro,
    speakable: ['h1', '.page-summary'],
    extra: { mainEntity: { '@id': BUSINESS_ID } },
  }),
  ...team.map((m) => ({
    '@type': 'Person',
    name: m.name.replace(/^(Mr|Mrs|Ms|Miss)\.\s*/, ''),
    jobTitle: m.role,
    worksFor: { '@id': BUSINESS_ID },
    ...(m.img && { image: `${SITE_URL}${m.img}` }),
  })),
  breadcrumb([{ name: 'About', path: '/about' }]),
)

export function AboutPage() {
  useDocumentTitle(
    'About NestHub Solution — Web Development Studio in Jaipur',
    'Meet NestHub Solution: a senior web, AI and app development studio from Jaipur, founded in 2025, building for businesses across India.',
    '/about',
    'about NestHub Solution, web development company Jaipur, web agency team Jaipur, digital agency Rajasthan',
  )

  return (
    <main id="top" className="relative z-[1] pb-4 pt-32 sm:pt-40">
      <JsonLd data={schema} />
      <PageHero
        crumb="About"
        eyebrow={`Est. ${brand.founded} · ${brand.location}`}
        title={
          <>
            Building the web,
            <br />
            <span className="text-brand-500">one pixel at a time.</span>
          </>
        }
        description={aboutIntro}
      >
        <PrimaryButton href="/contact">Work with us →</PrimaryButton>
        <GhostButton href="/careers">Join the team</GhostButton>
      </PageHero>

      <TrustBar />

      {/* Story timeline */}
      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="Our story"
              title="Small on purpose."
              body="We started NestHub because too many businesses were paying agency prices for junior work and slow replies. So we built the studio we'd want to hire: small, senior, fast and honest."
            />
          </div>
          <ol className="relative border-l-2 border-line pl-8">
            {story.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pb-12 last:pb-0"
              >
                <span className="absolute -left-[42px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-500 bg-white">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                </span>
                <span className="font-mono text-[13px] font-bold text-brand-500">{s.year}</span>
                <h3 className="mt-1 text-[22px] font-semibold tracking-[-.02em]">{s.title}</h3>
                <p className="mt-2 max-w-[520px] text-[15.5px] leading-[1.6] text-muted">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <SectionHead center eyebrow="What we value" title="Three things we won't compromise on." />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} tilt={false}>
              <div className="h-full rounded-[22px] border border-line bg-white p-8">
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-50">
                  <Icon name={v.icon} color="#2563EB" />
                </span>
                <div className="mt-5 text-[20px] font-semibold tracking-[-.02em]">{v.title}</div>
                <p className="mt-2 text-[15.5px] leading-[1.6] text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles — dark band */}
      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <div className="overflow-hidden rounded-[28px] bg-[#07080b] p-8 sm:p-14">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">How we work</span>
          <h2 className="mt-3 max-w-[620px] text-[30px] font-bold leading-[1.1] tracking-[-.035em] text-white sm:text-[42px]">Four principles behind every project.</h2>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] bg-white/10 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.n} className="group bg-[#07080b] p-7 transition-colors hover:bg-white/[.03] sm:p-9">
                <span className="font-mono text-[13px] font-bold text-brand-500">{p.n}</span>
                <h3 className="mt-3 text-[20px] font-semibold tracking-[-.02em] text-white">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-white/55">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Team />
      <Partners />
      <PageCta title="Ready to work with Jaipur's top web studio?" body="Whether you're in Jaipur, Delhi, Mumbai or anywhere in India — let's build something great together." />
    </main>
  )
}
