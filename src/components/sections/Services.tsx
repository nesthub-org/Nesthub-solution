import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import { ServiceGraphic, tones } from '../ServiceGraphics'
import { services, type ServiceAccent } from '../../data/content'

// Tailwind needs literal class strings to pick them up at build time, so each
// accent's full utility list is spelled out here rather than interpolated.
const accents: Record<
  ServiceAccent,
  { iconBg: string; iconBorder: string; underline: string; tag: string; border: string; glow: string }
> = {
  violet: {
    iconBg: 'bg-violet-50 group-hover:bg-violet-100',
    iconBorder: 'border-violet-100 group-hover:border-violet-300',
    underline: 'bg-violet-500',
    tag: 'group-hover:border-violet-200 group-hover:bg-violet-50 group-hover:text-violet-700',
    border: 'hover:border-violet-200',
    glow: 'bg-violet-400',
  },
  sky: {
    iconBg: 'bg-sky-50 group-hover:bg-sky-100',
    iconBorder: 'border-sky-100 group-hover:border-sky-300',
    underline: 'bg-sky-500',
    tag: 'group-hover:border-sky-200 group-hover:bg-sky-50 group-hover:text-sky-700',
    border: 'hover:border-sky-200',
    glow: 'bg-sky-400',
  },
  orange: {
    iconBg: 'bg-orange-50 group-hover:bg-orange-100',
    iconBorder: 'border-orange-100 group-hover:border-orange-300',
    underline: 'bg-orange-500',
    tag: 'group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-700',
    border: 'hover:border-orange-200',
    glow: 'bg-orange-400',
  },
  emerald: {
    iconBg: 'bg-emerald-50 group-hover:bg-emerald-100',
    iconBorder: 'border-emerald-100 group-hover:border-emerald-300',
    underline: 'bg-emerald-500',
    tag: 'group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700',
    border: 'hover:border-emerald-200',
    glow: 'bg-emerald-400',
  },
  amber: {
    iconBg: 'bg-amber-50 group-hover:bg-amber-100',
    iconBorder: 'border-amber-100 group-hover:border-amber-300',
    underline: 'bg-amber-500',
    tag: 'group-hover:border-amber-200 group-hover:bg-amber-50 group-hover:text-amber-700',
    border: 'hover:border-amber-200',
    glow: 'bg-amber-400',
  },
  teal: {
    iconBg: 'bg-teal-50 group-hover:bg-teal-100',
    iconBorder: 'border-teal-100 group-hover:border-teal-300',
    underline: 'bg-teal-500',
    tag: 'group-hover:border-teal-200 group-hover:bg-teal-50 group-hover:text-teal-700',
    border: 'hover:border-teal-200',
    glow: 'bg-teal-400',
  },
}

// Alternating tilt for the corner illustrations so a 3x2 grid doesn't read
// as a mechanical repeat.
const rotations = [-6, 8, -5, 7, -7, 6]

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal>
        <div className="max-w-[760px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Services</span>
          <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
            Services That Deliver
          </h2>
          <p className="mt-4.5 text-[17px] sm:text-[18px] leading-[1.6] text-muted">
            One senior team across strategy, design, engineering and growth — no handoffs, no agencies inside
            agencies.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const a = accents[s.accent]
          return (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <TiltCard max={7} className="h-full rounded-[20px]">
                <div
                  className={`group relative h-full overflow-hidden rounded-[20px] border border-line bg-white px-7 pb-9 pt-8.5 shadow-[0_8px_40px_rgba(0,0,0,.05)] transition-colors duration-300 sm:px-8 ${a.border}`}
                >
                  {/* Soft accent glow that blooms in on hover */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25 ${a.glow}`}
                  />

                  {/* Floating illustration cluster, top-right corner */}
                  <ServiceGraphic icon={s.icon} accent={s.accent} rotate={rotations[i % rotations.length]} delay={i * 0.15} />

                  <div className="relative">
                    <motion.span
                      whileHover={{ rotate: -8, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                      className={`flex h-13 w-13 items-center justify-center rounded-2xl border transition-colors duration-300 ${a.iconBg} ${a.iconBorder}`}
                    >
                      <Icon name={s.icon} color={tones[s.accent][600]} />
                    </motion.span>

                    <h3 className="mt-6 text-[21px] font-semibold tracking-[-.02em]">{s.title}</h3>
                    <span className={`mt-2.5 block h-[3px] w-8 rounded-full transition-all duration-300 group-hover:w-12 ${a.underline}`} />
                    <p className="mt-3.5 text-[16.5px] leading-[1.6] text-muted">{s.body}</p>

                    <div className="mt-5.5 flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border border-line bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-muted transition-all duration-300 ${a.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
