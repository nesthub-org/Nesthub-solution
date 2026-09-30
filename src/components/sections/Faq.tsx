import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { faqs } from '../../data/content'
import { SplitText } from '../SplitText'

const PER_PAGE = 3
const totalPages = Math.ceil(faqs.length / PER_PAGE)

export function Faq() {
  const [page, setPage] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  function goToPage(next: number) {
    setPage(next)
    setOpenIndex(next * PER_PAGE)
  }

  const visible = faqs.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <section id="faq" className="mx-auto max-w-[860px] px-6 pt-28 sm:pt-32">
      <Reveal className="text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">FAQ</span>
        <SplitText className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
          Questions, answered
        </SplitText>
        <p className="text-pretty mx-auto mt-4 max-w-[560px] text-[17px] leading-[1.6] text-muted">
          Everything you need to know before booking a call — don't see yours, just ask.
        </p>
      </Reveal>

      <div className="mt-12 flex flex-col gap-3">
        {visible.map((item, i) => {
          const absoluteIndex = page * PER_PAGE + i
          const isOpen = openIndex === absoluteIndex
          return (
            <Reveal key={item.q} delay={Math.min(i * 0.04, 0.2)} tilt={false}>
              <div className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${isOpen ? 'border-brand-200' : 'border-line'}`}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : absoluteIndex)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[16px] font-semibold tracking-[-.01em] sm:text-[17px]">{item.q}</span>
                  <span
                    className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${isOpen ? 'border-brand-500 bg-brand-50' : 'border-line'}`}
                  >
                    <span className={`absolute h-[1.6px] w-3 rounded-full transition-colors duration-300 ${isOpen ? 'bg-brand-500' : 'bg-ink'}`} />
                    <motion.span
                      animate={{ rotate: isOpen ? 0 : 90 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`absolute h-[1.6px] w-3 rounded-full transition-colors duration-300 ${isOpen ? 'bg-brand-500' : 'bg-ink'}`}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-5 text-[15px] leading-[1.65] text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            className="flex h-9 items-center rounded-full border border-line px-4 text-[13.5px] font-semibold text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-35"
          >
            Prev
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-label={`Page ${i + 1}`}
                aria-current={page === i}
                className={`h-2 rounded-full transition-all duration-300 ${page === i ? 'w-6 bg-brand-500' : 'w-2 bg-line hover:bg-muted'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages - 1}
            className="flex h-9 items-center rounded-full border border-line px-4 text-[13.5px] font-semibold text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-35"
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}
