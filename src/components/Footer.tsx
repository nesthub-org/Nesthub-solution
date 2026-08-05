import { motion } from 'framer-motion'
import { brand, footerLinks } from '../data/content'
import { Logo, LogoFallback } from './Logo'
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from './SocialIcons'

const socials = [
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/company/nesthub-solution' },
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/nesthubsolution' },
  { label: 'Facebook', Icon: FacebookIcon, href: 'https://www.facebook.com/nesthubsolution' },
  { label: 'WhatsApp', Icon: WhatsAppIcon, href: `https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}` },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1320px] grid grid-cols-1 gap-12 px-6 py-18 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={50} />
            <LogoFallback size={50} />
            <span className="text-[16.5px] font-bold tracking-[-.02em]">{brand.name}</span>
          </div>
          <p className="mt-4 max-w-[300px] text-[16px] leading-relaxed text-muted">
            We craft digital experiences that drive growth. From concept to launch, we build websites that make an
            impact.
          </p>
          <div className="mt-5 flex gap-2.5">
            {socials.map(({ label, Icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                whileHover={{ y: -3, borderColor: '#111111', color: '#2563EB' }}
                whileTap={{ scale: 0.92 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink"
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[14px] font-semibold tracking-[.05em] text-ink">Links</div>
          <div className="mt-4 grid gap-[11px]">
            {footerLinks.quick.map((l) => (
              <a key={l.label} href={l.href} className="text-[16px] text-muted hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[14px] font-semibold tracking-[.05em] text-ink">Services</div>
          <div className="mt-4 grid gap-[11px]">
            {footerLinks.services.map((l, i) => (
              <a key={i} href={l.href} className="text-[16px] text-muted hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[14px] font-semibold tracking-[.05em] text-ink">Contact</div>
          <div className="mt-4 grid gap-[11px] text-[16px] text-muted">
            <a href={`mailto:${brand.email}`} className="hover:text-ink transition-colors">
              {brand.email}
            </a>
            <a href={`tel:${brand.phone.replace(/\s+/g, '')}`} className="hover:text-ink transition-colors">
              {brand.phone}
            </a>
            <span>{brand.location}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-6">
        <span className="text-[14.5px] text-muted">© 2026 {brand.name}. All rights reserved.</span>
        <span className="flex gap-6">
          <a href="/#top" className="text-[14.5px] text-muted hover:text-ink transition-colors">
            Privacy
          </a>
          <a href="/#top" className="text-[14.5px] text-muted hover:text-ink transition-colors">
            Terms
          </a>
        </span>
      </div>
    </footer>
  )
}
