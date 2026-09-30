import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { brand, qrFeatures } from '../../data/content'
import scanitPhone from '../../assets/scanit-phone.webp'
import { SplitText } from '../SplitText'

const STEP_MS = 3200

export function Product() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Walk through the steps like a live demo; hovering one holds it.
  useEffect(() => {
    if (paused || reduced) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % qrFeatures.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [paused, reduced])

  return (
    <section id="product" className="mx-auto max-w-[1320px] px-4 pt-28 sm:px-6 sm:pt-32">
      <Reveal tilt={false}>
        <div className="relative overflow-hidden rounded-[28px] bg-[#07080b] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.38),rgba(37,99,235,0)_65%)]"
          />

          <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
            <div>
              <span className="text-[13px] font-semibold text-brand-500">Our product for restaurants</span>
              <SplitText className="mt-4 text-[46px] font-bold leading-[.98] tracking-[-.045em] text-white sm:text-[62px] lg:text-[70px]">
                QR scan.
                <br />
                <span className="text-brand-500">Order.</span> Done.
              </SplitText>
              <p className="mt-6 max-w-[470px] text-[16.5px] leading-[1.6] text-white/60">
                A contactless menu and ordering system for cafés, restaurants and food courts. Guests scan the QR at
                their table, with no app to install, and your kitchen sees the order instantly.
              </p>

              <ol className="mt-8 grid max-w-[520px] gap-2.5" onMouseLeave={() => setPaused(false)}>
                {qrFeatures.map((f, i) => {
                  const on = i === active
                  return (
                    <li key={f.n}>
                      <button
                        type="button"
                        onMouseEnter={() => {
                          setActive(i)
                          setPaused(true)
                        }}
                        onFocus={() => {
                          setActive(i)
                          setPaused(true)
                        }}
                        onClick={() => setActive(i)}
                        aria-current={on ? 'step' : undefined}
                        className={`relative flex w-full items-start gap-4 overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-colors duration-300 ${
                          on ? 'border-brand-500/70 bg-brand-500/[.12]' : 'border-white/10 bg-white/[.03] hover:border-white/20'
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-bold transition-colors duration-300 ${
                            on ? 'bg-brand-500 text-white' : 'bg-white/10 text-white/80'
                          }`}
                        >
                          {f.n}
                        </span>
                        <span>
                          <span className="block text-[15px] font-semibold text-white">{f.title}</span>
                          <span className="mt-0.5 block text-[13.5px] leading-[1.5] text-white/55">{f.body}</span>
                        </span>
                        {on && !paused && !reduced && (
                          <motion.span
                            key={`progress-${active}`}
                            aria-hidden
                            className="absolute bottom-0 left-0 h-[2px] bg-brand-500"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                          />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <motion.a
                  href={brand.calendly}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex h-12 items-center rounded-xl bg-brand-500 px-6 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,.35)] transition-colors hover:bg-brand-600"
                >
                  Get a live demo
                </motion.a>
                <span className="text-[13.5px] font-medium text-white/45">Pilot available now</span>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div aria-hidden className="absolute inset-x-6 bottom-6 top-10 rounded-full bg-brand-500/25 blur-3xl" />
              <img
                src={scanitPhone}
                alt="ScanIt digital menu on a phone, showing a café's items with prices and add buttons"
                width={600}
                height={1223}
                loading="lazy"
                className="animate-floaty-slow relative w-[230px] drop-shadow-[0_40px_80px_rgba(0,0,0,.6)] sm:w-[270px] lg:w-[290px]"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
