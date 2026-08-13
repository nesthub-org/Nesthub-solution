import { useState, type FormEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../Reveal'
import { brand, needs } from '../../data/content'

// Same visual language MUI's outlined TextField gave us (14px radius, hairline
// border, brand-blue focus ring) — reproduced in plain Tailwind so the form no
// longer needs to pull in MUI + Emotion just for two field types.
const fieldClasses =
  'h-14 w-full rounded-[14px] border border-line bg-white px-4 text-[16px] text-ink placeholder:text-muted/70 transition-shadow outline-none hover:border-[#D8D8D8] focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(37,99,235,.10)]'

function Field({ label, id, ...props }: { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold text-ink">
        {label}
      </label>
      <input id={id} className={fieldClasses} {...props} />
    </div>
  )
}

function TextAreaField({
  label,
  id,
  ...props
}: { label: string; id: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold text-ink">
        {label}
      </label>
      <textarea id={id} className={`${fieldClasses} h-auto min-h-[110px] resize-y py-3.5`} {...props} />
    </div>
  )
}

const infoRows = [
  { label: 'EMAIL', value: brand.email },
  { label: 'PHONE', value: brand.phone },
  { label: 'OFFICE', value: brand.location },
]

// StaticForms (staticforms.xyz) — delivers submissions from this form to our inbox.
const STATICFORM_API_KEY = 'sf_96hcfm4egdje3k77kii2j9ma'

export function Contact() {
  const [need, setNeed] = useState(needs[0])
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSending(true)

    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          accessKey: STATICFORM_API_KEY,
          subject: `New project enquiry — ${need}`,
          replyTo: email,
          honeypot,
          name,
          email,
          phone,
          budget,
          need,
          message,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Something went wrong sending your message.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Something went wrong. Please email us directly at ${brand.email}.`,
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="mt-28 border-t border-line bg-surface sm:mt-32">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-16 px-6 py-24 sm:py-28 lg:grid-cols-[.9fr_1.1fr] lg:gap-18">
        <Reveal>
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Contact us</span>
          <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
            Or Send Us a Message
          </h2>
          <p className="mt-4.5 max-w-[460px] text-[17px] sm:text-[18px] leading-[1.6] text-muted">
            Have an idea? We'd love to hear about it.
          </p>

          <div className="mt-10 grid gap-[2px] overflow-hidden rounded-[20px] border border-line bg-line">
            {infoRows.map((row) => (
              <div key={row.label} className="bg-white px-6 py-5.5">
                <div className="text-[13px] font-semibold tracking-[.05em] text-muted">{row.label}</div>
                <div className="mt-1 text-[17px] font-semibold">{row.value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,.05)] sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-success"
                  >
                    <span className="block h-3.5 w-2.5 -translate-y-0.5 translate-x-0.5 rotate-[-45deg] border-b-[3px] border-l-[3px] border-white" />
                  </motion.span>
                  <h3 className="mt-6 text-[22px] font-semibold">Message received.</h3>
                  <p className="mt-2 max-w-[320px] text-[16px] leading-[1.6] text-muted">
                    {`Our team will get back to you from ${brand.email} shortly.`}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                >
                  {/* Honeypot spam trap — kept off-screen and off the tab order; real users never fill it. */}
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  />

                  <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                    <Field
                      id="contact-name"
                      label="Your name"
                      placeholder="Priya Sharma"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Field
                      id="contact-email"
                      label="Your email"
                      type="email"
                      placeholder="priya@company.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mt-5">
                    <span className="mb-2.5 block text-[14px] font-semibold">What do you need?</span>
                    <div className="flex flex-wrap gap-2">
                      {needs.map((label) => {
                        const active = need === label
                        return (
                          <button
                            type="button"
                            key={label}
                            onClick={() => setNeed(label)}
                            className={`rounded-full border px-4 py-2.5 text-[14.5px] font-semibold transition-colors ${
                              active ? 'border-brand-500 bg-brand-500 text-white' : 'border-line bg-white text-ink hover:border-ink'
                            }`}
                          >
                            {label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                    <Field
                      id="contact-phone"
                      label="Phone number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Field
                      id="contact-budget"
                      label="Budget range"
                      placeholder="₹50,000 – ₹5,00,000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>

                  <div className="mt-5">
                    <TextAreaField
                      id="contact-message"
                      label="Project details"
                      placeholder="A few sentences about the goal, timeline and what success looks like."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {error && (
                    <p className="mt-3.5 text-[14px] font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-brand-500 text-[16px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.24)] transition-shadow hover:shadow-[0_8px_28px_rgba(37,99,235,.34)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? 'Sending…' : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
