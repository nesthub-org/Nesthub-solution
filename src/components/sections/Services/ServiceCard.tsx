import { memo } from 'react'
import { motion } from 'framer-motion'
import { TiltCard } from '../../TiltCard'
import { Icon } from '../../Icon'
import { ServiceArtwork } from './ServiceArtwork'
import { accentStyles, tones, type AccentStyle, type TonePalette } from './tones'
import { badgeVariants, cardMinHeight } from './variants'
import type { Service } from '../../../data/content'

interface ServiceCardProps {
  service: Service
  index: number
}

function IconBadge({ service, t, a }: { service: Service; t: TonePalette; a: AccentStyle }) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 ${a.iconGlow}`}
    >
      <Icon name={service.icon} color={t[600]} size={22} />
    </span>
  )
}

function CategoryBadge({ label, a }: { label: string; a: AccentStyle }) {
  return (
    <motion.span
      variants={badgeVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[.08em] backdrop-blur-sm ${a.badgeBg} ${a.badgeText} ${a.badgeBorder}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${a.badgeDot}`} />
      {label}
    </motion.span>
  )
}

function TagList({ tags, a }: { tags: string[]; a: AccentStyle }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`rounded-full border border-line bg-surface px-2.5 py-1 text-[12px] font-semibold text-muted transition-all duration-300 ${a.tagHover}`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}


function ServiceCardImpl({ service, index }: ServiceCardProps) {
  const t = tones[service.accent]
  const a = accentStyles[service.accent]

  return (
    <TiltCard max={6} lift={-4} className={`h-full rounded-[32px] ${cardMinHeight}`}>
      <article
        aria-labelledby={`service-${index}-title`}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-black/[.06] bg-white/90 p-7 shadow-[0_1px_2px_rgba(0,0,0,.04),0_20px_45px_-24px_rgba(0,0,0,.18)] backdrop-blur-sm transition-[box-shadow,border-color] duration-500 sm:p-8 ${a.border} ${a.shadowHover}`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${a.glowFrom} to-transparent opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between">
            <IconBadge service={service} t={t} a={a} />
            <ServiceArtwork icon={service.icon} t={t} className="h-[76px] w-[90px] opacity-90" />
          </div>

          <div className="mt-5">
            <CategoryBadge label={service.badge} a={a} />
          </div>

          <h3 id={`service-${index}-title`} className="mt-3 text-[21px] font-bold tracking-[-.02em] text-ink">
            {service.title}
          </h3>
          <span className={`mt-2.5 block h-[3px] w-8 rounded-full transition-all duration-300 group-hover:w-12 ${a.underline}`} />
          <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-muted">{service.body}</p>

          <div className="mt-4">
            <TagList tags={service.tags} a={a} />
          </div>

        </div>
      </article>
    </TiltCard>
  )
}

export const ServiceCard = memo(ServiceCardImpl)
