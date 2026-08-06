import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import { qrFeatures, productMockup } from '../../data/content'

const easeOut = [0.16, 1, 0.3, 1] as const

export function Product() {
  return (
    <section id="product" className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="relative flex justify-center">
          <div className="absolute inset-x-0 bottom-10 h-[300px] bg-[radial-gradient(320px_200px_at_50%_50%,rgba(37,99,235,.10),rgba(37,99,235,0)_70%)]" />
          <div className="relative" style={{ perspective: 1600 }}>
            <motion.div
              initial={{ rotateY: -115, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
              transition={{ duration: 1.1, ease: easeOut }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <TiltCard max={12} lift={0} className="w-[240px] sm:w-[260px]">
                <img
                  src={productMockup}
                  alt="ScanIt QR ordering app — live menu on a phone"
                  className="animate-floaty-slow w-full drop-shadow-[0_30px_90px_rgba(0,0,0,.18)]"
                />
              </TiltCard>
            </motion.div>
          </div>
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
