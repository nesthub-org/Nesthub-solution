import { WhatsAppGlyph, WhatsAppLink } from '../WhatsAppButton'
import { buyerQuestions } from '../../data/content'

// Most visitors are comparing us with cheaper quotes. Rather than ignore that,
// this hands them the questions to put to everyone, including us.
export function AskThem() {
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
          <WhatsAppLink
            message="Hi NestHub! I'm comparing a few agencies and have some questions for you."
            placement="ask_them"
            className="mt-6 inline-flex h-[54px] items-center gap-2.5 rounded-[15px] bg-marker px-6 text-[16px] font-bold text-ink transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppGlyph size={20} color="#0B1026" />
            Ask us anything
          </WhatsAppLink>
        </div>

        <ol className="list-none p-0">
          {buyerQuestions.map((item, i) => (
            <li key={item.q} className="rise grid grid-cols-[34px_1fr] gap-x-2 border-t border-white/30 py-5 sm:grid-cols-[48px_1fr] sm:py-6">
              <span className="pt-1 font-mono text-[13px] font-semibold text-marker">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-[21px] font-bold leading-[1.15] tracking-[-.02em] sm:text-[26px]">{item.q}</h3>
                <p className="mt-2 text-[16px] leading-[1.5] text-white/90 sm:text-[17px]">{item.a}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
