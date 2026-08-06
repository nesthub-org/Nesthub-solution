import { Reveal } from '../Reveal'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import { projects } from '../../data/content'

export function Work() {
  return (
    <section id="work" className="mt-28 border-y border-line bg-surface sm:mt-32">
      <div className="mx-auto max-w-[1320px] px-6 py-24 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-[700px]">
              <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Our work</span>
              <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
                Projects We're Proud Of
              </h2>
            </div>
            <a
              href="/#contact"
              className="flex h-13 items-center rounded-2xl border border-line bg-white px-6 text-[16px] font-semibold text-ink hover:border-ink transition-colors"
            >
              All case studies
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06}>
              <TiltCard max={5} lift={-6} className="h-full rounded-[18px]">
                <div className="h-full overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_8px_40px_rgba(0,0,0,.05)]">
                  <div className="flex items-center justify-center bg-gradient-to-b from-white to-[#F0F2F6] px-5 pt-6 pb-2">
                    <img
                      src={p.image}
                      alt={`${p.title} website, shown on a laptop screen`}
                      loading="lazy"
                      className="w-full max-w-[300px] object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,.12)]"
                    />
                  </div>
                  <div className="border-t border-line px-6 pb-6 pt-5">
                    <div className="flex items-center gap-2">
                      {p.logo ? (
                        <img
                          src={p.logo}
                          alt=""
                          aria-hidden
                          className="h-6 w-6 rounded-full border border-line object-contain p-0.5"
                        />
                      ) : (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line bg-brand-50">
                          <Icon name={p.icon ?? 'briefcase'} size={12} color="#2563EB" />
                        </span>
                      )}
                      <span className="text-[11.5px] font-bold uppercase tracking-[.08em] text-brand-500">{p.category}</span>
                    </div>
                    <h3 className="mt-2.5 text-[18px] font-semibold tracking-[-.02em]">{p.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted">{p.body}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line bg-surface px-2 py-0.5 text-[11.5px] font-semibold text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
