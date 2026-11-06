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
        <div className="blueprint overflow-hidden rounded-[28px] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
            <div>
              <span className="sheet-label text-white/90">Our product for restaurants</span>
              <SplitText className="mt-4 text-[46px] font-bold leading-[.98] tracking-[-.045em] text-white sm:text-[62px] lg:text-[70px]">
                QR scan.
                <br />
                <span className="marker">Order.</span> Done.
              </SplitText>
              <p className="mt-6 max-w-[470px] text-[16.5px] leading-[1.6] text-white/90">
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
                          on ? 'border-marker bg-white/15' : 'border-white/25 bg-white/10 hover:border-white/50'
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-bold transition-colors duration-300 ${
                            on ? 'bg-marker text-ink' : 'bg-white/15 text-white'
                          }`}
                        >
                          {f.n}
                        </span>
                        <span>
                          <span className="block text-[15px] font-semibold text-white">{f.title}</span>
                          <span className="mt-0.5 block text-[13.5px] leading-[1.5] text-white/90">{f.body}</span>
                        </span>
                        {on && !paused && !reduced && (
                          <motion.span
                            key={`progress-${active}`}
                            aria-hidden
                            className="absolute bottom-0 left-0 h-[2px] bg-marker"
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
                  className="btn-primary"
                >
                  Get a live demo
                </motion.a>
                <span className="text-[13.5px] font-medium text-white/90">Pilot available now</span>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div aria-hidden className="absolute inset-x-6 bottom-6 top-10 rounded-full bg-blueprint-deep/60 blur-3xl" />
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
