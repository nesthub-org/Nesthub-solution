import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { testimonials } from '../../data/content'

function useResponsivePerPage() {
  const [perPage, setPerPage] = useState(2)
  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 768 ? 1 : 2)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return perPage
}

export function Testimonials() {
  const perPage = useResponsivePerPage()
  const pageCount = Math.max(1, testimonials.length - perPage + 1)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index > pageCount - 1) setIndex(0)
  }, [pageCount, index])

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % pageCount), 5200)
    return () => clearInterval(id)
  }, [pageCount])

  function go(delta: number) {
    setIndex((i) => (i + delta + pageCount) % pageCount)
  }

  const step = perPage === 1 ? 100 : 50
  const gap = perPage === 1 ? 0 : 12

  return (
    <section className="mt-28 border-y border-line bg-surface sm:mt-32">
      <div className="mx-auto max-w-[1320px] px-6 py-24 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <h2 className="max-w-[640px] text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
              What Our Clients Say
            </h2>
            <div className="flex gap-2">
              <motion.button
                onClick={() => go(-1)}
                whileHover={{ y: -2, borderColor: '#111111' }}
                whileTap={{ scale: 0.94 }}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white"
              >
                <span className="ml-0.5 block h-2 w-2 rotate-45 border-b-[1.8px] border-l-[1.8px] border-ink" />
              </motion.button>
              <motion.button
                onClick={() => go(1)}
                whileHover={{ y: -2, borderColor: '#111111' }}
                whileTap={{ scale: 0.94 }}
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white"
              >
                <span className="mr-0.5 block h-2 w-2 rotate-45 border-r-[1.8px] border-t-[1.8px] border-ink" />
              </motion.button>
            </div>
          </div>
        </Reveal>

        <div className="mt-11 overflow-hidden">
          <motion.div
            className="flex"
            style={{ gap }}
            animate={{ x: `calc(${-index * step}% - ${index * gap}px)` }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-[20px] border border-line bg-white p-8 sm:p-10 shadow-[0_8px_40px_rgba(0,0,0,.05)]"
                style={{ flex: `0 0 calc(${perPage === 1 ? 100 : 50}% - ${perPage === 1 ? 0 : 12}px)` }}
              >
                <div className="flex gap-0.5 text-ink">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className="text-[15px]">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-pretty mt-5.5 text-[19px] sm:text-[22px] font-medium leading-[1.5] tracking-[-.015em]">
                  {`“${t.quote}”`}
                </p>
                <div className="mt-8 flex items-center gap-3.5">
                  <motion.span
                    whileHover={{ scale: 1.08, rotate: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    className="flex h-13 w-13 items-center justify-center rounded-full border border-line bg-brand-50 text-[15px] font-bold text-brand-500"
                  >
                    {t.initials}
                  </motion.span>
                  <span className="flex-1">
                    <span className="block text-[16px] font-semibold">{t.name}</span>
                    <span className="block text-[15px] text-muted">{`${t.role} · ${t.company}`}</span>
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
