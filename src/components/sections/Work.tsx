import { Reveal } from '../Reveal'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import { accentStyles, tones } from './Services/tones'
import { getDomain } from '../../utils/url'
import { projects } from '../../data/content'

// The homepage teases a handful of projects; the full set lives on /case-studies.
const featuredProjects = projects.slice(0, 4)

export function Work() {
  return (
    <section id="work" className="relative mt-28 overflow-hidden border-y border-line bg-surface sm:mt-32">
      {/* soft decorative wash, echoing the Services section's premium chrome */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 py-24 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-[700px]">
              <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Our work</span>
              <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
                Projects We're Proud Of
              </h2>
            </div>
            <a
              href="/case-studies"
              className="group flex h-13 items-center gap-2 rounded-2xl border border-line bg-white px-6 text-[16px] font-semibold text-ink transition-colors hover:border-ink"
            >
              All case studies
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <path d="M4 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featuredProjects.map((p, i) => {
            const a = accentStyles[p.accent]
            const t = tones[p.accent]
            const domain = getDomain(p.href)

            return (
              <Reveal key={p.title} delay={(i % 2) * 0.08} className="h-full">
                <TiltCard max={5} lift={-6} className="h-full rounded-[24px]">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} — open live site`}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_8px_40px_rgba(0,0,0,.05)] transition-[box-shadow,border-color] duration-500 ${a.border} ${a.shadowHover}`}
                  >
                    {/* browser chrome */}
                    <div className="relative overflow-hidden bg-gradient-to-b from-white to-[#F0F2F6]">
                      <div className="flex items-center gap-1.5 border-b border-line/70 px-4 py-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                        <span className="ml-2 flex-1 truncate rounded-full border border-line/60 bg-white px-3 py-1 text-center text-[11px] font-medium text-muted">
                          {domain}
                        </span>
                      </div>

                      <div className="flex items-center justify-center px-5 pb-3 pt-6">
                        <img
                          src={p.image}
                          alt={`${p.title} website, shown on a laptop screen`}
                          loading="lazy"
                          className="w-full max-w-[340px] object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,.12)] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      </div>

                      {/* hover overlay CTA */}
                      <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="mb-5 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-ink shadow-lg transition-transform duration-300 group-hover:translate-y-0">
                          Visit live site
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M7 17 17 7M9 7h8v8" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col border-t border-line px-6 pb-6 pt-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {p.logo ? (
                            <img
                              src={p.logo}
                              alt=""
                              aria-hidden
                              className="h-7 w-7 shrink-0 rounded-full border border-line bg-white object-contain p-0.5 shadow-sm"
                            />
                          ) : (
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${a.badgeBorder} ${a.badgeBg}`}>
                              <Icon name={p.icon ?? 'briefcase'} size={13} color={t[600]} />
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.07em] ${a.badgeBg} ${a.badgeText} ${a.badgeBorder}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${a.badgeDot}`} />
                            {p.category}
                          </span>
                        </div>
                        <span aria-hidden className="text-[12px] font-bold tracking-[.02em] text-line">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="mt-3 text-[18px] font-semibold tracking-[-.02em] text-ink">{p.title}</h3>
                      <p className="mt-1.5 flex-1 text-[14.5px] leading-[1.55] text-muted">{p.body}</p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border border-line bg-surface px-2 py-0.5 text-[11.5px] font-semibold text-muted transition-all duration-300 ${a.tagHover}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
