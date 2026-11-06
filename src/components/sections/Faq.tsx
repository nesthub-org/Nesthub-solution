import { useState } from 'react'
import { faqs } from '../../data/content'

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
    <section id="faq" className="bg-paper py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div className="rise self-start lg:sticky lg:top-28">
          <p className="sheet-label text-blueprint">FAQ</p>
          <h2 className="mt-3 text-balance text-[38px] font-bold leading-[1.04] tracking-[-.035em] sm:text-[56px]">
            Questions, <span className="marker">answered</span>
          </h2>
          <p className="mt-4 max-w-[440px] text-pretty text-[17px] leading-[1.5] text-ink/75 sm:text-[19px]">
            Everything you need to know before booking a call — don&apos;t see yours, just ask.
          </p>
        </div>

        <div>
          <div className="flex flex-col gap-3">
            {visible.map((item, i) => {
              const absoluteIndex = page * PER_PAGE + i
              const isOpen = openIndex === absoluteIndex
              return (
                <div key={item.q} className="rise">
                  <div className={`overflow-hidden rounded-[18px] border bg-white transition-colors duration-300 ${isOpen ? 'border-blueprint' : 'border-ink/12'}`}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : absoluteIndex)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="font-display text-[17px] font-bold tracking-[-.015em] sm:text-[19px]">{item.q}</span>
                      <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? 'bg-marker' : 'bg-paper'}`}>
                        <span className="absolute h-[2px] w-3 rounded-full bg-ink" />
                        <span className={`absolute h-[2px] w-3 rounded-full bg-ink transition-transform duration-300 ${isOpen ? '' : 'rotate-90'}`} />
                      </span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-[15.5px] leading-[1.6] text-ink/75 sm:px-6">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="flex h-10 items-center rounded-full border border-ink/15 bg-white px-4 text-[13.5px] font-semibold text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-35"
              >
                Prev
              </button>
              <div className="flex items-center">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToPage(i)}
                    aria-label={`Page ${i + 1}`}
                    aria-current={page === i}
                    className="group flex h-10 min-w-7 items-center justify-center px-1"
                  >
                    <span className={`block h-2 rounded-full transition-all duration-300 ${page === i ? 'w-6 bg-blueprint' : 'w-2 bg-ink/20 group-hover:bg-ink/40'}`} />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages - 1}
                className="flex h-10 items-center rounded-full border border-ink/15 bg-white px-4 text-[13.5px] font-semibold text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-35"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
