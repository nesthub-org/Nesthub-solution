import { motion } from 'framer-motion'
import { JsonLd } from '../components/JsonLd'
import { breadcrumb, graph, webPage, BUSINESS_ID } from '../lib/schema'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Contact } from '../components/sections/Contact'
import { BookCall } from '../components/sections/BookCall'
import { PageHero, SectionHead } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand } from '../data/content'

const channels = [
  { icon: 'send', label: 'Email', value: brand.email, href: `mailto:${brand.email}`, note: 'Best for briefs & documents' },
  { icon: 'chat', label: 'WhatsApp', value: brand.phone, href: `https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}`, note: 'Quickest reply' },
  { icon: 'video', label: 'Discovery call', value: '30 min · free', href: brand.calendly, note: 'Pick a slot on Calendly' },
  { icon: 'mapPin', label: 'Studio', value: brand.location, href: 'https://maps.google.com/?q=Jaipur,Rajasthan', note: 'Meetings by appointment' },
]

const next = [
  { n: '1', title: 'We reply within 24 hours', body: 'A real person reads your message and replies — usually the same day.' },
  { n: '2', title: 'Free discovery call', body: '30 minutes to understand your goals, audience and timeline.' },
  { n: '3', title: 'Written proposal', body: 'A clear scope, fixed quote and timeline you can share with your team.' },
]

const schema = graph(
  webPage({
    type: 'ContactPage',
    path: '/contact',
    name: 'Contact NestHub Solution',
    description: 'Contact NestHub Solution by email, WhatsApp or a free 30-minute discovery call. We reply within one business day.',
    speakable: ['h1', '.page-summary'],
    extra: { mainEntity: { '@id': BUSINESS_ID } },
  }),
  breadcrumb([{ name: 'Contact', path: '/contact' }]),
)

export function ContactPage() {
  useDocumentTitle(
    'Contact NestHub Solution — Start Your Project | Jaipur, India',
    'Contact NestHub Solution by email, WhatsApp or a free 30-minute discovery call. We reply within one business day.',
    '/contact',
    'contact web development agency Jaipur, hire web developer Jaipur, website quote India, NestHub Solution contact',
  )

  return (
    <main id="top" className="relative z-[1] pt-32 sm:pt-40">
      <JsonLd data={schema} />
      <PageHero
        crumb="Contact"
        eyebrow="We reply within one business day"
        title={
          <>
            Let&apos;s talk about
            <br />
            <span className="text-brand-500">your next big thing.</span>
          </>
        }
        description="Tell us about the project — a new website, a redesign, an AI feature or ongoing support. No pitch decks needed, just a few lines is plenty."
      />

      <section className="mx-auto max-w-[1320px] px-6 pt-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05} tilt={false}>
              <motion.a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col rounded-[22px] border border-line bg-white p-6 text-ink transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,.08)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 transition-colors group-hover:bg-brand-500">
                    <span className="group-hover:hidden">
                      <Icon name={c.icon} color="#2563EB" size={20} />
                    </span>
                    <span className="hidden group-hover:block">
                      <Icon name={c.icon} color="#ffffff" size={20} />
                    </span>
                  </span>
                  <span className="text-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-ink">↗</span>
                </div>
                <div className="mt-5 text-[12px] font-semibold uppercase tracking-[.1em] text-muted">{c.label}</div>
                <div className="mt-1 break-words text-[16.5px] font-semibold tracking-[-.01em]">{c.value}</div>
                <div className="mt-auto pt-3 text-[13px] text-muted">{c.note}</div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />

      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <SectionHead center eyebrow="What happens next" title="From message to plan in three steps." />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {next.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} tilt={false}>
              <div className="relative h-full rounded-[22px] border border-line bg-white p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[15px] font-bold text-white">{s.n}</span>
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-.02em]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="pb-4">
        <BookCall />
      </div>
    </main>
  )
}
