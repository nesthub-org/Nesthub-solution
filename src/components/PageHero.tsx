import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { brand } from '../data/content'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  /** Breadcrumb label for the current page. */
  crumb: string
  children?: ReactNode
  aside?: ReactNode
}

/** Shared top-of-page block for the standalone nav pages (Services, About, …). */
export function PageHero({ eyebrow, title, description, crumb, children, aside }: PageHeroProps) {
  return (
    <section className="relative mx-auto max-w-[1320px] px-6">
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] opacity-[.5]"
        style={{
          backgroundImage: 'linear-gradient(#ececec 1px, transparent 1px), linear-gradient(90deg, #ececec 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 30% 20%, black 10%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 30% 20%, black 10%, transparent 65%)',
        }}
      />
      <Reveal tilt={false}>
        <div className="relative grid grid-cols-1 items-end gap-12 border-b border-line pb-12 lg:grid-cols-[1.35fr_.65fr]">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-medium text-muted">
              <a href="/" className="text-muted transition-colors hover:text-ink">
                Home
              </a>
              <span aria-hidden>/</span>
              <span className="text-ink">{crumb}</span>
            </nav>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink shadow-[0_2px_10px_rgba(17,17,17,.05)]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {eyebrow}
            </span>
            <h1 className="mt-6 text-balance text-[44px] font-bold leading-[.98] tracking-[-.05em] sm:text-[64px] lg:text-[78px]">
              {title}
            </h1>
            <div className="page-summary mt-6 max-w-[620px] text-pretty text-[17px] leading-[1.65] text-muted sm:text-[18px]">{description}</div>
            {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
          </div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </Reveal>
    </section>
  )
}

export function PrimaryButton({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-500 px-6 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,.28)]"
    >
      {children}
    </motion.a>
  )
}

export function GhostButton({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileHover={{ y: -2, borderColor: '#111111' }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex h-12 items-center rounded-xl border border-line bg-white px-6 text-[15px] font-semibold text-ink"
    >
      {children}
    </motion.a>
  )
}

/** Stat stack used in the hero's right column. */
export function HeroFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line">
      {facts.map((f) => (
        <div key={f.label} className="bg-white p-5">
          <dt className="text-[12px] font-semibold uppercase tracking-[.08em] text-muted">{f.label}</dt>
          <dd className="mt-1.5 text-[22px] font-bold tracking-[-.03em] text-ink">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Dark closing call-to-action shared by the nav pages. */
export function PageCta({
  title = "Let's build something great together.",
  body = "Tell us what you're planning — we'll reply within one business day with next steps and a clear quote.",
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal tilt={false}>
        <div className="relative overflow-hidden rounded-[28px] bg-[#07080b] px-8 py-14 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/30 blur-[100px]"
          />
          <h2 className="relative mx-auto max-w-[720px] text-balance text-[30px] font-bold leading-[1.1] tracking-[-.035em] text-white sm:text-[44px]">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[560px] text-pretty text-[16px] leading-[1.6] text-white/60 sm:text-[17px]">{body}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton href="/contact">Start a project →</PrimaryButton>
            <motion.a
              href={brand.calendly}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, borderColor: '#ffffff' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center rounded-xl border border-white/20 px-6 text-[15px] font-semibold text-white"
            >
              Book a free call
            </motion.a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/** Small section heading used inside the nav pages. */
export function SectionHead({ eyebrow, title, body, center }: { eyebrow: string; title: ReactNode; body?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-[720px] text-center' : 'max-w-[720px]'}>
      <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">{eyebrow}</span>
      <h2 className="mt-3 text-balance text-[30px] font-bold leading-[1.08] tracking-[-.035em] sm:text-[40px]">{title}</h2>
      {body && <p className="mt-4 text-pretty text-[16.5px] leading-[1.65] text-muted">{body}</p>}
    </Reveal>
  )
}
