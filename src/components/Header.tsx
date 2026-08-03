import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '../data/content'
import { Logo, LogoFallback } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-2.5 z-[60] mt-2.5 px-4 sm:top-[18px] sm:mt-[18px] sm:px-6">
      <nav className="mx-auto max-w-[1320px] h-[68px] flex items-center justify-between pl-[22px] pr-3 bg-white/78 backdrop-blur-xl border border-line rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,.05)]">
        <motion.a href="/#top" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2.5 text-ink">
          <motion.span whileHover={{ rotate: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }}>
            <Logo size={26} />
            <LogoFallback size={26} />
          </motion.span>
          <span className="text-[16.5px] font-bold tracking-[-.02em]">
            NestHub<span className="text-muted font-medium"> Solution</span>
          </span>
        </motion.a>

        <div className="hidden lg:flex items-center gap-[30px]">
          {navLinks.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative text-[15px] font-medium text-muted hover:text-ink transition-colors"
            >
              {l.label}
              <motion.span
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-brand-500"
              />
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a href="/#contact" className="h-11 px-3.5 flex items-center text-[15px] font-medium text-ink">
            Contact
          </a>
          <motion.a
            href="/#contact"
            whileHover={{ y: -1, backgroundColor: '#1D4ED8' }}
            className="h-11 px-5 flex items-center rounded-[14px] bg-brand-500 text-white text-[16px] font-semibold shadow-[0_6px_18px_rgba(37,99,235,.22)]"
          >
            Start a project
          </motion.a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden flex h-11 w-11 items-center justify-center shrink-0"
        >
          <span className="relative block w-5 h-3">
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className="absolute left-0 top-0 block h-[1.6px] w-5 bg-ink"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 block h-[1.6px] w-5 bg-ink"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className="absolute left-0 bottom-0 block h-[1.6px] w-5 bg-ink"
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mx-auto mt-2 max-w-[1320px] rounded-[20px] border border-line bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,.08)]"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[15px] font-medium text-ink hover:bg-surface"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex h-12 items-center justify-center rounded-[14px] bg-brand-500 text-[16px] font-semibold text-white"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
