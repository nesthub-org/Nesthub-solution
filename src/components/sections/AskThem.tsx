import { useState } from 'react'
import { WhatsAppGlyph, WhatsAppLink } from '../WhatsAppButton'
import { buyerQuestions } from '../../data/content'
import { track } from '../../lib/track'

const shareListHref = `https://wa.me/?text=${encodeURIComponent(
  `Questions to ask any web agency before paying:\n\n${buyerQuestions.map((item, i) => `${i + 1}. ${item.q}`).join('\n')}`,
)}`

// Most visitors are comparing us with cheaper quotes. Rather than ignore that,
// this hands them the questions to put to everyone, including us. Ticking the
// ones they care about turns the button into a message that asks exactly those.
export function AskThem() {
  const [ticked, setTicked] = useState<number[]>([])
  const toggle = (i: number) => setTicked((list) => (list.includes(i) ? list.filter((n) => n !== i) : [...list, i].sort((a, b) => a - b)))

  const message = ticked.length
    ? `Hi NestHub! Before I decide, can you answer these for me?\n\n${ticked.map((i) => `- ${buyerQuestions[i].q}`).join('\n')}`
    : "Hi NestHub! I'm comparing a few agencies and have some questions for you."

  return (
    <section className="blueprint py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-9 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div className="rise self-start lg:sticky lg:top-28">
          <p className="sheet-label text-white/90">Before you choose</p>
          <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-[-.035em] sm:text-[52px] lg:text-[60px]">
            Comparing agencies? <span className="marker">Good.</span> Ask all of them these.
          </h2>
          <p className="mt-4 max-w-[480px] text-pretty text-[17px] leading-[1.5] text-white/90 sm:text-[19px]">
            The lowest quote isn&apos;t always the lowest cost. Six answers tell you who you&apos;re really dealing with. Here are ours.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <WhatsAppLink
              message={message}
              placement="ask_them"
              className="inline-flex h-[54px] items-center gap-2.5 rounded-[15px] bg-marker px-6 text-[16px] font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppGlyph size={20} color="#0B1026" />
              {ticked.length ? `Ask us ${ticked.length === 1 ? 'this one' : `these ${ticked.length}`}` : 'Ask us anything'}
            </WhatsAppLink>
            <a
              href={shareListHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('checklist_share')}
              className="py-2 text-[15px] font-semibold text-white underline decoration-marker decoration-2 underline-offset-4"
            >
              Save this list
            </a>
          </div>
        </div>

        <div>
          <p className="rise pb-3 text-[15px] font-semibold text-white/90">Tap the ones that matter to you.</p>
          <ol className="list-none p-0">
            {buyerQuestions.map((item, i) => {
              const on = ticked.includes(i)
              return (
                <li key={item.q} className="rise border-t border-white/30">
                  <button type="button" aria-pressed={on} onClick={() => toggle(i)} className="group grid w-full grid-cols-[38px_1fr] gap-x-2 py-5 text-left sm:grid-cols-[52px_1fr] sm:py-6">
                    <span className={`tick ${on ? 'tick-on' : ''}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    <span>
                      <span className={`block font-display text-[21px] font-bold leading-[1.15] tracking-[-.02em] transition-colors sm:text-[26px] ${on ? 'text-marker' : 'text-white group-hover:text-marker'}`}>{item.q}</span>
                      <span className="mt-2 block text-[16px] leading-[1.5] text-white/90 sm:text-[17px]">{item.a}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
