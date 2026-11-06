import { useState } from 'react'
import { team } from '../../data/content'

export function Team() {
  // A member whose photo 404s falls back to the initials mark rather than a broken-image icon.
  const [broken, setBroken] = useState<string[]>([])

  return (
    <section id="team" className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-24">
      <div className="rise max-w-[780px]">
        <p className="sheet-label text-blueprint">Our team</p>
        <h2 className="mt-3 text-balance text-[38px] font-bold leading-[1.04] tracking-[-.035em] sm:text-[56px]">The people you&apos;ll work with</h2>
        <p className="mt-4 text-pretty text-[17px] leading-[1.5] text-ink/75 sm:text-[19px]">
          A small, senior crew from Jaipur — the same people who scope your project are the ones who build it.
        </p>
      </div>

      <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
        {team.map((m, i) => (
          <div key={m.name} className="rise">
            <article className="group relative aspect-[4/5] overflow-hidden rounded-[18px] bg-navy sm:rounded-[22px]">
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
                <div className="absolute inset-0 flex items-center justify-center bg-blueprint">
                  <span className="font-display text-[40px] font-bold tracking-[-.04em] text-white/90 sm:text-[56px]">{m.initials}</span>
                </div>
              )}

              {/* legibility gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />

              {/* index tag */}
              <span aria-hidden className="absolute left-2.5 top-2.5 rounded-[6px] bg-marker px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink sm:left-4 sm:top-4">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-[15.5px] font-bold leading-tight tracking-[-.02em] text-white sm:text-[20px]">{m.name}</h3>
                  <p className="mt-1 text-[12px] font-medium leading-snug text-white/85 sm:text-[14px]">{m.role}</p>
                </div>
              </div>

              {/* hover ring */}
              <span className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-marker sm:rounded-[22px]" />
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
