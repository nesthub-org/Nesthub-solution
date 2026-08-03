import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { Icon } from '../Icon'
import { PhoneMockup } from '../PhoneMockup'
import { qrFeatures } from '../../data/content'

const menuItems = [
  { name: 'Margherita Pizza', price: '₹280', qty: 1 },
  { name: 'Caesar Salad', price: '₹190', qty: 0 },
  { name: 'Mango Lassi', price: '₹120', qty: 2 },
  { name: 'Garlic Bread', price: '₹140', qty: 0 },
]

export function Product() {
  return (
    <section id="product" className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="relative flex justify-center">
          <div className="absolute inset-x-0 bottom-10 h-[300px] bg-[radial-gradient(320px_200px_at_50%_50%,rgba(37,99,235,.10),rgba(37,99,235,0)_70%)]" />
          <PhoneMockup className="relative">
            <div className="px-5 pb-6.5 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold tracking-[.05em] text-brand-500">TABLE 4 · SCAN &amp; ORDER</div>
                  <div className="mt-1 text-[20px] font-bold tracking-[-.025em]">Today's Menu</div>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface">
                  <Icon name="qr" size={16} color="#2563EB" />
                </span>
              </div>
              <div className="mt-4 flex gap-1.5">
                {['All', 'Mains', 'Drinks', 'Desserts'].map((c, i) => (
                  <span
                    key={c}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${i === 0 ? 'bg-brand-500 text-white' : 'bg-surface text-muted'}`}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-4 grid gap-2.5">
                {menuItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl border border-line px-3.5 py-3">
                    <span>
                      <span className="block text-[14px] font-semibold">{item.name}</span>
                      <span className="block text-[12.5px] text-muted">{item.price}</span>
                    </span>
                    <span
                      className={`flex h-6.5 w-6.5 items-center justify-center rounded-full text-[12px] font-bold ${
                        item.qty > 0 ? 'bg-brand-500 text-white' : 'border border-line text-muted'
                      }`}
                    >
                      {item.qty > 0 ? item.qty : '+'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3.5">
                <span>
                  <span className="block text-[11px] font-semibold text-brand-500">3 items · ₹590</span>
                  <span className="block text-[14px] font-bold">Place Order</span>
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-white">→</span>
              </div>
            </div>
          </PhoneMockup>
        </div>

        <div>
          <Reveal>
            <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Our in-house product</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
              QR Scan. <span className="text-brand-500">Order.</span> Done.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4.5 max-w-[560px] text-[17px] sm:text-[18px] leading-[1.6] text-muted">
              A smart, contactless ordering system for restaurants, cafes &amp; food courts. Customers scan a QR code
              at their table — no app, no friction. Just browse, order, and pay.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3.5">
            {qrFeatures.map((f, i) => (
              <Reveal key={f.n} delay={0.05 + i * 0.05}>
                <FeatureRow feature={f} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                href="/#contact"
                whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
                whileTap={{ scale: 0.97 }}
                className="flex h-13 items-center gap-2 rounded-2xl bg-brand-500 px-6 text-[15.5px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.24)]"
              >
                Get Early Access →
              </motion.a>
              <span className="text-[14.5px] font-medium text-muted">Currently in development · Pilot available</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FeatureRow({ feature }: { feature: (typeof qrFeatures)[number] }) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex items-start gap-4.5 rounded-[20px] border border-line bg-white px-6 py-5.5 shadow-[0_8px_40px_rgba(0,0,0,.05)]"
    >
      <motion.span
        whileHover={{ scale: 1.1, rotate: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface group-hover:border-brand-500/40 group-hover:bg-brand-50"
      >
        <Icon name={feature.icon} color="#2563EB" size={20} />
      </motion.span>
      <span>
        <span className="block text-[18px] font-semibold tracking-[-.015em]">{feature.title}</span>
        <span className="mt-1 block text-[16px] leading-[1.55] text-muted">{feature.body}</span>
      </span>
    </motion.div>
  )
}
