import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import { Icon } from '../components/Icon'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand, jobs, type Job } from '../data/content'

function mailtoFor(job: Job) {
  const subject = `Application: ${job.title}`
  const body = [
    `Hi NestHub team,`,
    ``,
    `I'd like to apply for the ${job.title} role. My resume is attached.`,
    ``,
    `Name:`,
    `Phone:`,
    `Portfolio / LinkedIn / GitHub:`,
  ].join('\n')
  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function Careers() {
  useDocumentTitle(
    'Careers at NestHub Solution — Jaipur Web & App Development Agency',
    'Open roles at NestHub Solution: React Native Developer, Business Development Executive and MERN Stack Intern (Jaipur / remote). Apply today.',
    '/careers',
  )

  return (
    <main id="top" className="relative z-[1] pb-28 pt-32 sm:pb-32 sm:pt-36">
      <section className="mx-auto max-w-[1320px] px-6">
        <Reveal className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Careers</span>
          <h1 className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.08] tracking-[-.035em] text-balance">
            Build the web and mobile apps with us.
          </h1>
          <p className="text-pretty mt-5 text-[17px] sm:text-[18px] leading-[1.65] text-muted">
            NestHub Solution is a small, senior-led team based in Jaipur, working with clients across India. We hire
            for craft and ownership, not headcount — every open role below is a real seat on real client work.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pt-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {jobs.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.06}>
              <TiltCard max={5} className="h-full rounded-[20px]">
                <div className="flex h-full flex-col rounded-[20px] border border-line bg-white p-7 shadow-[0_8px_40px_rgba(0,0,0,.05)] sm:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-brand-50">
                    <Icon name="briefcase" color="#2563EB" size={20} />
                  </span>
                  <h2 className="mt-5 text-[22px] font-semibold tracking-[-.02em]">{job.title}</h2>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[14px] font-medium text-muted">
                    <span className="flex items-center gap-1.5">
                      <Icon name="briefcase" size={14} color="#6B7280" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="mapPin" size={14} color="#6B7280" />
                      {job.location}
                    </span>
                  </div>
                  <p className="mt-4 text-[16px] leading-[1.6] text-muted">{job.description}</p>

                  <div className="mt-5">
                    <div className="text-[12.5px] font-bold uppercase tracking-[.08em] text-ink">You'll do</div>
                    <ul className="mt-2.5 grid gap-1.5">
                      {job.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2 text-[15px] leading-[1.55] text-muted">
                          <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <div className="text-[12.5px] font-bold uppercase tracking-[.08em] text-ink">What we're after</div>
                    <ul className="mt-2.5 grid gap-1.5">
                      {job.requirements.map((r) => (
                        <li key={r} className="flex gap-2 text-[15px] leading-[1.55] text-muted">
                          <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.a
                    href={mailtoFor(job)}
                    whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-7 flex h-13 items-center justify-center rounded-2xl bg-brand-500 text-[15.5px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.24)]"
                  >
                    Apply for this role
                  </motion.a>
                  <p className="mt-3 text-center text-[13.5px] text-muted">
                    {'Send your resume to '}
                    <a href={`mailto:${brand.email}`} className="font-semibold text-brand-500">
                      {brand.email}
                    </a>
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[720px] px-6 pt-24 sm:pt-28">
        <Reveal>
          <div className="rounded-[20px] border border-line bg-white p-8 text-center shadow-[0_8px_40px_rgba(0,0,0,.05)] sm:p-10">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-brand-50">
              <Icon name="send" color="#2563EB" size={20} />
            </span>
            <h2 className="mt-5 text-[24px] sm:text-[28px] font-bold leading-[1.15] tracking-[-.03em]">How to apply</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted">
              {'Found a role above that fits? Email your resume to '}
              <a href={`mailto:${brand.email}`} className="font-semibold text-brand-500">
                {brand.email}
              </a>
              {' with the role title in the subject line. We reply to every application within 2 business days.'}
            </p>
            <motion.a
              href={`mailto:${brand.email}?subject=${encodeURIComponent('Application: ')}`}
              whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex h-13 items-center justify-center rounded-2xl bg-brand-500 px-8 text-[15.5px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.24)]"
            >
              {`Email ${brand.email}`}
            </motion.a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
