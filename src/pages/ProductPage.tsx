import { useState } from 'react'
import { JsonLd } from '../components/JsonLd'
import { breadcrumb, graph, webPage, faqPage, BUSINESS_ID } from '../lib/schema'
import { SITE_URL } from '../lib/blog'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Product } from '../components/sections/Product'
import { PageCta, PageHero, PrimaryButton, GhostButton, SectionHead } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand, qrFeatures } from '../data/content'
import scanitPhone from '../assets/scanit-phone.webp'

const roles = [
  {
    id: 'guest',
    label: 'For guests',
    title: 'Scan, browse, order — in under a minute.',
    points: ['No app download or sign-up', 'Photos, prices and veg / non-veg tags', 'Live order status on their own phone', 'Call-waiter and bill-request buttons'],
  },
  {
    id: 'kitchen',
    label: 'For the kitchen',
    title: 'Every order lands on the screen instantly.',
    points: ['Orders grouped by table with timestamps', 'Accept, prepare, ready — one tap each', 'Sound alerts for new tickets', 'No more misheard or lost paper slips'],
  },
  {
    id: 'owner',
    label: 'For owners',
    title: 'Run the menu and see the numbers.',
    points: ['Edit dishes and prices in real time', 'Mark items sold-out in one click', 'Bestsellers, peak hours and revenue', 'Role-based access for managers and staff'],
  },
]

const benefits = [
  { icon: 'clock', stat: 'Faster', label: 'table turnover — guests order the moment they sit' },
  { icon: 'chart', stat: 'Bigger', label: 'baskets from photo-led menus and add-on prompts' },
  { icon: 'sync', stat: 'Zero', label: 'reprinting costs when prices or dishes change' },
  { icon: 'care', stat: 'Fewer', label: 'order mistakes between floor staff and kitchen' },
]

const fits = ['Cafés', 'Restaurants', 'Food courts', 'Cloud kitchens', 'Hotel room service', 'Bars & lounges', 'College canteens', 'Event stalls']

const productFaqs = [
  { q: 'Do guests need to install an app?', a: 'No. The QR opens a fast web menu in the phone browser — any Android or iPhone works.' },
  { q: 'How long does setup take?', a: 'Most venues are live within a few days. We load your menu, print the table QRs and train your staff.' },
  { q: 'Can I update the menu myself?', a: 'Yes. The owner dashboard lets you change prices, add dishes and mark items sold-out instantly.' },
  { q: 'Does it work with payments?', a: 'Online payment can be enabled, or guests can keep paying at the counter — it is your choice per venue.' },
  { q: 'Is there a pilot?', a: 'Yes, a pilot is available now. Book a demo and we will set one up for your venue.' },
]

const schema = graph(
  webPage({
    path: '/product',
    name: 'ScanIt — QR Menu & Ordering System for Restaurants',
    description: 'Contactless QR menu and ordering for cafés and restaurants. No app needed, live kitchen orders, menu management and analytics.',
    speakable: ['h1', '.page-summary'],
    extra: { mainEntity: { '@id': `${SITE_URL}/product#scanit` } },
  }),
  {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/product#scanit`,
    name: 'ScanIt',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Restaurant QR menu and ordering system',
    operatingSystem: 'Web browser (Android, iOS, desktop)',
    description:
      'ScanIt is a contactless QR menu and ordering system for cafés, restaurants and food courts. Guests scan a table QR code to browse and order without installing an app, and orders appear instantly on the kitchen display.',
    featureList: qrFeatures.map((f) => `${f.title}: ${f.body}`),
    audience: { '@type': 'BusinessAudience', audienceType: 'Restaurants, cafés, food courts, cloud kitchens' },
    publisher: { '@id': BUSINESS_ID },
    image: `${SITE_URL}/og-image.png`,
  },
  faqPage('/product', productFaqs),
  breadcrumb([{ name: 'Product', path: '/product' }]),
)

export function ProductPage() {
  useDocumentTitle(
    'ScanIt — QR Menu & Ordering System for Restaurants | NestHub Solution',
    'ScanIt by NestHub: contactless QR menu and ordering for cafés and restaurants. No app needed, live kitchen orders, menu management and analytics.',
    '/product',
    'QR code menu India, restaurant QR ordering system, contactless menu Jaipur, digital menu for cafe, ScanIt QR menu, restaurant ordering software India',
  )
  const [role, setRole] = useState(roles[0].id)
  const [open, setOpen] = useState<number | null>(0)
  const active = roles.find((r) => r.id === role) ?? roles[0]

  return (
    <main id="top" className="relative z-[1] pb-4 pt-32 sm:pt-40">
      <JsonLd data={schema} />
      <PageHero
        crumb="Product"
        eyebrow="ScanIt · built by NestHub"
        title={
          <>
            The QR menu your
            <br />
            <span className="text-brand-500">kitchen will love.</span>
          </>
        }
        description="ScanIt is a contactless menu and ordering system for cafés, restaurants and food courts. Guests scan the QR at their table, order from their phone, and the kitchen sees it instantly."
        aside={
          <div className="relative flex justify-center lg:justify-end">
            <div aria-hidden className="absolute inset-x-10 bottom-0 top-10 rounded-full bg-brand-500/20 blur-3xl" />
            <img src={scanitPhone} alt="ScanIt menu on a phone" width={600} height={1223} className="animate-floaty-slow relative w-[200px] drop-shadow-[0_30px_60px_rgba(0,0,0,.25)]" />
          </div>
        }
      >
        <PrimaryButton href={brand.calendly} external>
          Get a live demo →
        </PrimaryButton>
        <GhostButton href="#how-it-works">How it works</GhostButton>
      </PageHero>

      <div id="how-it-works" className="scroll-mt-24">
        <Product />
      </div>

      {/* Role switcher */}
      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <SectionHead center eyebrow="One system, three views" title="Built for everyone in the restaurant." />
        <div className="mt-10 flex justify-center">
          <div role="tablist" className="flex rounded-2xl border border-line bg-surface p-1.5">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={role === r.id}
                onClick={() => setRole(r.id)}
                className={`relative rounded-xl px-4 py-2 text-[14px] font-semibold transition-colors sm:px-6 ${role === r.id ? 'text-white' : 'text-muted hover:text-ink'}`}
              >
                {role === r.id && <motion.span layoutId="product-role" className="absolute inset-0 rounded-xl bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{r.label}</span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-10 grid max-w-[980px] grid-cols-1 items-center gap-8 rounded-[28px] border border-line bg-white p-8 sm:p-12 md:grid-cols-2"
          >
            <h3 className="text-balance text-[28px] font-bold leading-[1.15] tracking-[-.03em] sm:text-[34px]">{active.title}</h3>
            <ul className="grid gap-3.5">
              {active.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15.5px]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[12px] text-brand-500">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <SectionHead eyebrow="Features" title="Everything a modern venue needs." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {qrFeatures.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.06} tilt={false}>
              <div className="group h-full rounded-[22px] border border-line bg-white p-7 transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,.07)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 transition-transform group-hover:-rotate-6">
                    <Icon name={f.icon} color="#2563EB" size={22} />
                  </span>
                  <span className="font-mono text-[12px] font-bold text-brand-200">{f.n}</span>
                </div>
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-.02em]">{f.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
        <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-line bg-surface lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.stat + i} delay={i * 0.05} tilt={false}>
              <div className={`h-full border-line p-7 sm:p-9 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i < 3 ? 'lg:border-r' : ''}`}>
                <Icon name={b.icon} color="#2563EB" size={22} />
                <div className="mt-4 text-[30px] font-bold tracking-[-.04em]">{b.stat}</div>
                <p className="mt-1 text-[14.5px] leading-[1.5] text-muted">{b.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who it's for + FAQ */}
      <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-14 px-6 pt-28 sm:pt-32 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Who it's for" title="Anywhere people order food." />
          <Reveal tilt={false}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {fits.map((f) => (
                <span key={f} className="rounded-full border border-line bg-white px-4 py-2 text-[14.5px] font-medium">
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <div>
          <SectionHead eyebrow="ScanIt FAQ" title="Good questions." />
          <div className="mt-8 grid gap-3">
            {productFaqs.map((f, i) => (
              <div key={f.q} className={`overflow-hidden rounded-2xl border bg-white ${open === i ? 'border-brand-200' : 'border-line'}`}>
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15.5px] font-semibold">
                  {f.q}
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-[20px] font-light text-brand-500">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-4 text-[14.5px] leading-[1.6] text-muted">
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta title="See ScanIt running in your venue." body="Book a 30-minute demo — we'll show the guest, kitchen and owner views live and set up a pilot if it fits." />
    </main>
  )
}
