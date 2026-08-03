import { useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { TextField, Button, MenuItem } from '@mui/material'
import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import { Icon } from '../components/Icon'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand, jobs, type Job } from '../data/content'

export function Careers() {
  useDocumentTitle(
    'Careers at NestHub Solution — Jaipur Web Development Agency',
    'Open roles at NestHub Solution: Business Development Executive (Jaipur) and SDE Intern (remote/Jaipur). Apply today.',
  )

  const formRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Job['id']>(jobs[0].id)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [coverLetter, setCoverLetter] = useState('')

  function applyFor(id: Job['id']) {
    setPosition(id)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const job = jobs.find((j) => j.id === position)
    const subject = `Application: ${job?.title ?? position}`
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      portfolio && `Portfolio/LinkedIn/GitHub: ${portfolio}`,
      '',
      'Cover letter:',
      coverLetter,
    ].filter(Boolean)
    const mailto = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`
    window.location.href = mailto
  }

  return (
    <main id="top" className="relative z-[1] pb-28 pt-32 sm:pb-32 sm:pt-36">
      <section className="mx-auto max-w-[1320px] px-6">
        <Reveal className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Careers</span>
          <h1 className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.08] tracking-[-.035em] text-balance">
            Build the web with us.
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

                  <motion.button
                    type="button"
                    onClick={() => applyFor(job.id)}
                    whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-7 flex h-13 items-center justify-center rounded-2xl bg-brand-500 text-[15.5px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.24)]"
                  >
                    Apply for this role
                  </motion.button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section ref={formRef} className="mx-auto max-w-[720px] scroll-mt-28 px-6 pt-24 sm:pt-28">
        <Reveal>
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Apply</span>
          <h2 className="mt-4 text-[28px] sm:text-[36px] font-bold leading-[1.1] tracking-[-.03em]">
            Send us your application
          </h2>
          <p className="mt-3 text-[16px] sm:text-[17px] leading-[1.6] text-muted">
            This opens your email client with everything pre-filled — review it and hit send. We reply to every
            application.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={handleSubmit}
            className="mt-9 rounded-[20px] border border-line bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,.05)] sm:p-9"
          >
            <TextField
              select
              label="Position"
              fullWidth
              value={position}
              onChange={(e) => setPosition(e.target.value as Job['id'])}
            >
              {jobs.map((job) => (
                <MenuItem key={job.id} value={job.id}>
                  {job.title}
                </MenuItem>
              ))}
            </TextField>

            <div className="mt-5 grid grid-cols-1 gap-4.5 sm:grid-cols-2">
              <TextField label="Full name" placeholder="Priya Sharma" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
              <TextField
                label="Email"
                type="email"
                placeholder="priya@example.com"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4.5 sm:grid-cols-2">
              <TextField
                label="Phone (optional)"
                type="tel"
                placeholder="+91 98765 43210"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Portfolio / LinkedIn / GitHub"
                placeholder="https://github.com/you"
                fullWidth
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <TextField
                label="Cover letter"
                placeholder="Tell us why you'd be a good fit and link to relevant work."
                fullWidth
                required
                multiline
                minRows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 3, height: 56, fontSize: 16 }}>
                Open Email to Apply
              </Button>
            </motion.div>
            <p className="mt-3.5 text-center text-[14px] text-muted">
              Prefer to email directly? Write to{' '}
              <a href={`mailto:${brand.email}`} className="font-semibold text-brand-500">
                {brand.email}
              </a>
            </p>
          </form>
        </Reveal>
      </section>
    </main>
  )
}
