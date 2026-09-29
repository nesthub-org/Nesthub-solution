import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Faq } from '../components/sections/Faq'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand, openJobs, values, type Job } from '../data/content'

function mailtoFor(job?: Job) {
  const title = job?.title ?? ''
  const subject = `Application: ${title}`
  const body = [
    `Hi NestHub team,`,
    ``,
    job ? `I'd like to apply for the ${title} role. My resume is attached.` : `I'd like to apply. My resume is attached.`,
    ``,
    `Name:`,
    `Phone:`,
    `Portfolio / LinkedIn / GitHub:`,
  ].join('\n')
  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const outlined = { WebkitTextStroke: '1.5px var(--color-brand-500)', color: 'transparent' } as const

const applySteps = [
  { title: 'Send your resume', body: `Email ${brand.email} with the role title in the subject line.` },
  { title: 'Hear back fast', body: 'We reply to every application within 2 business days.' },
  { title: 'Meet the team', body: 'A conversation about your work, the role and how we work together.' },
]

export function Careers() {
  useDocumentTitle(
    'Careers at NestHub Solution — Jaipur Web & App Development Agency',
    'Open roles at NestHub Solution: Lead Generation Executive (Jaipur, full-time). Apply today.',
    '/careers',
  )

  const facts = [
    { label: 'Open roles', value: String(openJobs.length) },
    { label: 'Based in', value: 'Jaipur, India' },
    { label: 'Founded', value: brand.founded },
    { label: 'We reply within', value: '2 business days' },
  ]

  return (
    <main id="top" className="relative z-[1] pb-28 pt-32 sm:pb-32 sm:pt-40">
      {/* Hero */}
      <section className="relative mx-auto max-w-[1320px] px-6">
        <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />
        <Reveal>
          <div className="relative grid grid-cols-1 items-end gap-12 border-b border-line pb-12 lg:grid-cols-[1.4fr_.6fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink shadow-[0_2px_10px_rgba(17,17,17,.05)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                We're hiring
              </span>
              <h1 className="mt-6 text-[48px] font-bold leading-[.98] tracking-[-.05em] sm:text-[68px] lg:text-[84px]">
                Grow with
                <br />
                <span className="text-brand-500">NestHub.</span>
              </h1>
              <p className="mt-6 max-w-[580px] text-pretty text-[17px] leading-[1.65] text-muted sm:text-[18px]">
                NestHub Solution is a small, senior-led team based in Jaipur, working with clients across India. We hire
                for craft and ownership, not headcount — every open role below is a real seat on real client work.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 rounded-[20px] border border-line bg-white/80 p-6 shadow-[0_8px_40px_rgba(0,0,0,.04)] backdrop-blur">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[12.5px] text-muted">{f.label}</dt>
                  <dd className="mt-1 text-[19px] font-semibold leading-tight tracking-[-.02em] text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* Open roles */}
      <section id="openings" className="mx-auto max-w-[1320px] px-6 pt-20 sm:pt-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[13px] font-semibold text-brand-500">Open roles</span>
              <h2 className="mt-2 text-[32px] font-bold leading-[1.05] tracking-[-.04em] sm:text-[44px]">Current openings</h2>
            </div>
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-semibold text-muted">
              {openJobs.length} {openJobs.length === 1 ? 'position' : 'positions'}
            </span>
          </div>
        </Reveal>

        <div className="mt-6">
          {openJobs.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.06}>
              <JobRow job={job} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1320px] px-6 pt-24 sm:pt-28">
        <Reveal>
          <span className="text-[13px] font-semibold text-brand-500">Why NestHub</span>
          <h2 className="mt-2 max-w-[640px] text-[32px] font-bold leading-[1.05] tracking-[-.04em] sm:text-[44px]">
            What we value, every day.
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group h-full rounded-[22px] border border-line bg-white p-7 shadow-[0_8px_40px_rgba(0,0,0,.04)] transition-colors hover:border-brand-200"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 transition-colors group-hover:bg-brand-100">
                    <Icon name={v.icon} color="#2563EB" size={22} />
                  </span>
                  <span aria-hidden className="text-[40px] font-medium leading-none tracking-[-.05em]" style={outlined}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-.02em]">{v.title}</h3>
                <p className="mt-2 text-[15.5px] leading-[1.6] text-muted">{v.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How to apply */}
      <section className="mx-auto max-w-[1320px] px-4 pt-24 sm:px-6 sm:pt-28">
        <Reveal tilt={false}>
          <div className="relative overflow-hidden rounded-[28px] bg-[#07080b] px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.34),rgba(37,99,235,0)_65%)]"
            />
            <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <span className="text-[13px] font-semibold text-brand-500">How to apply</span>
                <h2 className="mt-3 text-[38px] font-bold leading-[1] tracking-[-.045em] text-white sm:text-[52px]">
                  Ready to <span className="text-brand-500">join us?</span>
                </h2>
                <p className="mt-5 max-w-[440px] text-[16.5px] leading-[1.6] text-white/60">
                  No forms, no portals. Email your resume and a line about why the role fits you.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <motion.a
                    href={mailtoFor(openJobs.length === 1 ? openJobs[0] : undefined)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-500 px-6 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,.35)] transition-colors hover:bg-brand-600"
                  >
                    <Icon name="send" color="#ffffff" size={16} />
                    Email your resume
                  </motion.a>
                  <a href={`mailto:${brand.email}`} className="text-[14px] font-medium text-white/60 transition-colors hover:text-white">
                    {brand.email}
                  </a>
                </div>
              </div>

              <ol className="grid gap-3">
                {applySteps.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[.03] px-5 py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-[12px] font-bold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block text-[16px] font-semibold text-white">{s.title}</span>
                      <span className="mt-0.5 block text-[14px] leading-[1.5] text-white/55">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </section>

      <Faq />
    </main>
  )
}

function JobRow({ job, index }: { job: Job; index: number }) {
  const chips = [
    { icon: 'briefcase', text: job.type },
    { icon: 'mapPin', text: job.location },
    { icon: 'clock', text: job.experience },
  ]

  return (
    <article className="grid grid-cols-1 items-start gap-10 border-b border-line py-12 last:border-b-0 sm:py-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-14">
      <div className="lg:sticky lg:top-32">
        <span aria-hidden className="block text-[64px] font-medium leading-none tracking-[-.05em] sm:text-[84px]" style={outlined}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-5 text-[30px] font-bold leading-[1.08] tracking-[-.035em] sm:text-[40px]">{job.title}</h3>

        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c.text}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink"
            >
              <Icon name={c.icon} size={13} color="#2563EB" />
              {c.text}
            </span>
          ))}
        </div>

        <p className="mt-6 max-w-[540px] text-[16.5px] leading-[1.65] text-muted">{job.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <motion.a
            href={mailtoFor(job)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-brand-500 px-6 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,.28)] transition-colors hover:bg-brand-600"
          >
            Apply for this role
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              <path d="M4 12h14M13 6l6 6-6 6" />
            </svg>
          </motion.a>
          <span className="text-[14px] text-muted">
            {'or email '}
            <a href={`mailto:${brand.email}`} className="font-semibold text-brand-500 hover:text-brand-600">
              {brand.email}
            </a>
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[24px] bg-[#07080b] p-7 shadow-[0_30px_70px_-30px_rgba(15,23,42,.6)] sm:p-9">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.32),rgba(37,99,235,0)_65%)]"
        />
        <div className="relative">
          <h4 className="text-[13px] font-semibold text-brand-500">What you'll do</h4>
          <ol className="mt-4 grid gap-2.5">
            {job.responsibilities.map((r, i) => (
              <li key={r} className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[.03] px-4 py-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-[10.5px] font-bold text-white/85">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14.5px] leading-[1.55] text-white/80">{r}</span>
              </li>
            ))}
          </ol>

          <h4 className="mt-8 text-[13px] font-semibold text-brand-500">What we're after</h4>
          <ul className="mt-4 grid gap-3">
            {job.requirements.map((r) => (
              <li key={r} className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-white/70">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-brand-200">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
