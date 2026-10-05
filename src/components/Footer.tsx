import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { brand, footerLinks } from '../data/content'
import { Logo, LogoFallback } from './Logo'
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from './SocialIcons'

const socials = [
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/company/nesthub-solution' },
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/nesthubsolution' },
  { label: 'Facebook', Icon: FacebookIcon, href: 'https://www.facebook.com/nesthubsolution' },
  { label: 'WhatsApp', Icon: WhatsAppIcon, href: `https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}` },
]

function useJaipurTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30_000)
    return () => clearInterval(id)
  }, [])
  return time
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="group relative inline-flex w-fit items-center gap-1.5 text-[15.5px] text-white/60 transition-colors hover:text-white">
      <span className="h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-3" />
      {label}
    </a>
  )
}

function ColumnTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[.18em] text-white/40">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </div>
  )
}

export function Footer() {
  const time = useJaipurTime()
  const wordRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(96,165,250,.9), rgba(37,99,235,.35) 40%, rgba(255,255,255,.06) 70%)`

  const onMove = (e: React.PointerEvent) => {
    const r = wordRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0b] text-white">
      {/* ambient glow + grid */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-6">
        {/* CTA band */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 py-16 md:flex-row md:items-end md:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12.5px] text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Taking on new projects
            </div>
            <h2 className="mt-5 max-w-[640px] text-[clamp(34px,5vw,60px)] font-semibold leading-[1.02] tracking-[-.04em]">
              Got an idea? <span className="text-shimmer">Let&apos;s build it</span> together.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-ink"
            >
              Start a project
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </motion.a>
            <a
              href={brand.calendly}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Book a call
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <Logo size={46} />
              <LogoFallback size={46} />
              <span className="text-[17px] font-bold tracking-[-.02em]">{brand.name}</span>
            </div>
            <p className="mt-5 max-w-[320px] text-[15.5px] leading-relaxed text-white/55">
              We craft digital experiences that drive growth. From concept to launch, we build websites that make an
              impact.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ label, Icon, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, backgroundColor: '#2563EB', borderColor: '#2563EB' }}
                  whileTap={{ scale: 0.92 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-white"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <ColumnTitle>Explore</ColumnTitle>
            <div className="mt-5 grid gap-3">
              {footerLinks.quick.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </div>
          </div>

          <div>
            <ColumnTitle>Services</ColumnTitle>
            <div className="mt-5 grid gap-3">
              {footerLinks.services.map((l, i) => (
                <FooterLink key={i} {...l} />
              ))}
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <ColumnTitle>Say hello</ColumnTitle>
            <div className="mt-5 grid gap-3">
              <a
                href={`mailto:${brand.email}`}
                className="group w-fit text-[17px] font-medium text-white transition-colors hover:text-brand-200"
              >
                {brand.email}
                <span className="block h-px w-0 bg-brand-200 transition-all duration-300 group-hover:w-full" />
              </a>
              <a href={`tel:${brand.phone.replace(/\s+/g, '')}`} className="w-fit text-[15.5px] text-white/60 transition-colors hover:text-white">
                {brand.phone}
              </a>
              <div className="mt-2 rounded-2xl border border-white/10 bg-white/[.03] p-4">
                <div className="text-[14.5px] text-white/80">{brand.location}</div>
                <div className="mt-1 flex items-center gap-2 font-mono text-[12.5px] text-white/45">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                  Local time · {time} IST
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center">
          <span className="text-[13.5px] text-white/40">{`© ${new Date().getFullYear()} ${brand.name}. Crafted with care in Jaipur.`}</span>
          <span className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px]">
            <a href="/#top" className="text-white/40 transition-colors hover:text-white">
              Privacy
            </a>
            <a href="/#top" className="text-white/40 transition-colors hover:text-white">
              Terms
            </a>
            <a href="/admin/login" rel="nofollow" className="text-white/40 transition-colors hover:text-white">
              Admin login
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              Back to top
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
            </button>
          </span>
        </div>
      </div>

      {/* Giant wordmark — decorative; also gives the floating WhatsApp / assistant buttons empty space to sit over */}
      <div ref={wordRef} onPointerMove={onMove} aria-hidden className="relative select-none overflow-hidden pt-2">
        <motion.div
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '18%', opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundImage: spotlight }}
          className="bg-clip-text text-center text-[clamp(72px,19vw,300px)] font-black leading-[.85] tracking-[-.06em] text-transparent [-webkit-background-clip:text]"
        >
          NestHub
        </motion.div>
      </div>
    </footer>
  )
}
