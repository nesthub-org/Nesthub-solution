import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { budgets, brand, needs } from '../../data/content'
import { getSource, leadMessage, telHref, useLead, whatsappHref } from '../../lib/lead'
import { track } from '../../lib/track'
import { WhatsAppGlyph, WhatsAppLink } from '../WhatsAppButton'

// Same visual language MUI's outlined TextField gave us (14px radius, hairline
// border, brand-blue focus ring) — reproduced in plain Tailwind so the form no
// longer needs to pull in MUI + Emotion just for two field types.
const fieldClasses =
  'h-14 w-full rounded-[14px] border border-line bg-white px-4 text-[16px] text-ink placeholder:text-muted transition-shadow outline-none hover:border-[#D8D8D8] focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(19,55,207,.10)]'

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

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (next: string) => void }) {
  return (
    <div>
      <span className="mb-2.5 block text-[14px] font-semibold">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option
          return (
            <button
              type="button"
              key={option}
              onClick={() => onChange(active ? '' : option)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2.5 text-[14.5px] font-semibold transition-colors ${
                active ? 'border-brand-500 bg-brand-500 text-white' : 'border-line bg-white text-ink hover:border-ink'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ChannelLink({ href, label, value, external, onClick, children }: { href: string; label: string; value: string; external?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onClick={onClick}
      className="flex items-center gap-3.5 border-t border-white/15 py-4 text-white transition-colors hover:text-marker"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">{children}</span>
      <span>
        <span className="block text-[13px] text-white/70">{label}</span>
        <span className="block text-[16.5px] font-semibold">{value}</span>
      </span>
    </a>
  )
}

// StaticForms (staticforms.xyz) — delivers submissions from this form to our inbox.
const STATICFORM_API_KEY = 'sf_96hcfm4egdje3k77kii2j9ma'

export function Contact() {
  const lead = useLead()
  const [need, setNeed] = useState(needs[0])
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  // Follows the name typed into the homepage preview until the visitor edits it here.
  const [businessEdit, setBusinessEdit] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const business = businessEdit ?? lead.businessName

  // The same details as a chat, so a failed send still reaches us and a sent
  // form can carry straight on over WhatsApp.
  const chatHref = whatsappHref(
    [`Hi NestHub! I'm ${name || 'interested in a website'}${business ? ` from ${business}` : ''}.`, `I need: ${need || 'a website'}.`, phone && `My number: ${phone}`, message]
      .filter(Boolean)
      .join('\n'),
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (phone.replace(/\D/g, '').length < 10) {
      setPhoneError(true)
      return
    }
    setPhoneError(false)
    setSending(true)

    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          accessKey: STATICFORM_API_KEY,
          subject: `New project enquiry — ${need || 'Website'} — ${business || name}`,
          honeypot,
          name,
          phone,
          need,
          ...(business && { business }),
          ...(budget && { budget }),
          ...(message && { message }),
          ...(email && { email, replyTo: email }),
          ...(getSource() && { source: getSource() }),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Something went wrong sending your message.')
      }
      track('form_submit', { content_category: need || 'Website' })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong sending your message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[.9fr_1.1fr] lg:gap-18">
        <div className="rise">
          <p className="sheet-label text-marker">Let&apos;s talk</p>
          <h2 className="mt-3 text-[38px] font-bold leading-[1.04] tracking-[-.035em] sm:text-[56px]">Tell us about your business.</h2>
          <p className="mt-4 max-w-[460px] text-pretty text-[17px] leading-[1.5] text-white/80 sm:text-[19px]">
            Two details are enough. We usually reply the same day, and WhatsApp is the quickest way to reach us.
          </p>

          <WhatsAppLink
            message={leadMessage(lead)}
            placement="contact"
            className="mt-7 flex h-[58px] items-center justify-center gap-2.5 rounded-[15px] bg-[#25D366] text-[17px] font-bold text-[#06281A] transition-transform hover:-translate-y-0.5 sm:w-fit sm:px-8"
          >
            <WhatsAppGlyph size={21} color="#06281A" />
            Chat on WhatsApp
          </WhatsAppLink>

          <div className="mt-7 border-b border-white/15">
            <ChannelLink href={telHref} label="Call us" value={brand.phone} onClick={() => track('call_click', { content_category: 'contact' })}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
              </svg>
            </ChannelLink>
            <ChannelLink href={brand.calendly} label="Prefer to plan it?" value="Book a free 30-minute call" external onClick={() => track('calendly_click', { content_category: 'contact' })}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
                <path d="M3.5 10h17M8 3v4M16 3v4" />
              </svg>
            </ChannelLink>
            <ChannelLink href={`mailto:${brand.email}`} label="Email" value={brand.email}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m3.5 7 8.5 6 8.5-6" />
              </svg>
            </ChannelLink>
          </div>
        </div>

        <div className="rise">
          <div className="rounded-[22px] bg-white p-5 text-ink sm:p-9">
            {submitted ? (
                <div className="note-in flex min-h-[340px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success">
                    <span className="block h-3.5 w-2.5 -translate-y-0.5 translate-x-0.5 rotate-[-45deg] border-b-[3px] border-l-[3px] border-white" />
                  </span>
                  <h3 className="mt-6 text-[26px] font-bold tracking-[-.02em]">Got it, {name.trim().split(' ')[0]}.</h3>
                  <p className="mt-2 max-w-[340px] text-[16px] leading-[1.5] text-muted">
                    We&apos;ll get back to you on {phone}, usually the same day. Want to skip the wait?
                  </p>
                  <a
                    href={chatHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track('whatsapp_click', { content_category: 'form_success' })}
                    className="mt-5 flex h-[54px] items-center gap-2.5 rounded-[14px] bg-[#25D366] px-6 text-[16px] font-bold text-[#06281A]"
                  >
                    <WhatsAppGlyph size={20} color="#06281A" />
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
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
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div>
                      <Field
                        id="contact-phone"
                        label="WhatsApp or phone number"
                        type="tel"
                        inputMode="tel"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        required
                        aria-invalid={phoneError}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value)
                          setPhoneError(false)
                        }}
                      />
                      {phoneError && <p className="mt-1.5 text-[13.5px] font-medium text-red-600">Please enter a 10-digit number so we can reach you.</p>}
                    </div>
                  </div>

                  <div className="mt-5">
                    <Chips label="What do you need?" options={needs} value={need} onChange={setNeed} />
                  </div>

                  {showMore ? (
                    <div className="mt-5 grid gap-5">
                      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                        <Field
                          id="contact-business"
                          label="Business name"
                          placeholder="Sharma Dental Clinic"
                          autoComplete="organization"
                          value={business}
                          onChange={(e) => setBusinessEdit(e.target.value)}
                        />
                        <Field
                          id="contact-email"
                          label="Email"
                          type="email"
                          placeholder="priya@company.com"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <Chips label="Rough budget" options={budgets} value={budget} onChange={setBudget} />
                      <TextAreaField
                        id="contact-message"
                        label="Project details"
                        placeholder="A few sentences about the goal, timeline and what success looks like."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  ) : (
                    <button type="button" onClick={() => setShowMore(true)} className="mt-2.5 py-2.5 text-[14.5px] font-semibold text-brand-500 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-500">
                      Add more details (optional)
                    </button>
                  )}

                  {error && (
                    <p className="mt-4 text-[14px] font-medium text-red-600">
                      {error}{' '}
                      <a href={chatHref} target="_blank" rel="noreferrer" onClick={() => track('whatsapp_click', { content_category: 'form_error' })} className="font-bold text-red-700 underline underline-offset-2">
                        Send it on WhatsApp instead
                      </a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-blueprint text-[16.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-blueprint-deep disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? 'Sending…' : 'Send'}
                  </button>
                  <p className="mt-3 text-center text-[13px] text-muted">
                    We only use your number to talk about your project. <a href="/privacy" className="underline underline-offset-2">Privacy</a>
                  </p>
                </form>
              )}
          </div>
        </div>
      </div>
    </section>
  )
}
