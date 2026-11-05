import { useState } from 'react'
import { team } from '../../data/content'

export function Team() {
  // A member whose photo 404s falls back to the initials mark rather than a broken-image icon.
  const [broken, setBroken] = useState<string[]>([])

  return (
    <section id="team" className="mx-auto max-w-[1320px] px-6 pt-20 sm:pt-28">
      <div className="rise mx-auto max-w-[820px] text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Our team</span>
        <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em] text-balance">
          The people you'll work with
        </h2>
        <p className="text-pretty mt-5 text-[17px] sm:text-[18px] leading-[1.65] text-muted">
          A small, senior crew from Jaipur — the same people who scope your project are the ones who build it.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1120px] grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {team.map((m, i) => (
          <div key={m.name} className="rise">
            <article className="group relative aspect-[4/5] overflow-hidden rounded-[18px] sm:rounded-[24px] bg-ink shadow-[0_10px_40px_rgba(17,17,17,.08)]">
              {m.img && !broken.includes(m.name) ? (
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  onError={() => setBroken((b) => [...b, m.name])}
                  style={{ objectPosition: m.imgPosition ?? 'center' }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-500 to-ink">
                  <span className="text-[40px] font-bold sm:text-[56px] tracking-[-.04em] text-white/90">{m.initials}</span>
                </div>
              )}

              {/* legibility gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* index tag */}
              <span className="absolute left-2.5 top-2.5 rounded-full border border-white/25 bg-black/25 px-2 py-0.5 font-mono text-[10px] sm:left-4 sm:top-4 sm:px-2.5 sm:py-1 sm:text-[11px] font-semibold text-white">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-[15px] font-semibold leading-tight sm:text-[19px] tracking-[-.02em] text-white">{m.name}</h3>
                  <div className="mt-1.5 flex items-center gap-1.5 sm:mt-2 sm:gap-2">
                    <span className="hidden h-px w-5 bg-brand-200 transition-all duration-500 group-hover:w-9 sm:block" />
                    <p className="text-[10.5px] font-medium uppercase leading-snug tracking-[.06em] text-white/75 sm:text-[13.5px]">{m.role}</p>
                  </div>
                </div>
              </div>

              {/* hover ring */}
              <span className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-inset sm:rounded-[24px] ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-brand-500/70" />
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
