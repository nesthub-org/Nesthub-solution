import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { navLinks } from '../data/content'
import { Logo, LogoFallback } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="fixed top-2.5 left-0 right-0 z-[60] px-4 sm:top-[18px] sm:px-6">
      <nav className="mx-auto max-w-[1320px] h-[60px] sm:h-[68px] flex items-center justify-between pl-4 sm:pl-[22px] pr-2 sm:pr-3 bg-white border border-line rounded-[18px] sm:rounded-[20px] shadow-[0_8px_30px_rgba(5,12,60,.14)]">
        <a href="/#top" className="group flex h-11 items-center gap-2.5 text-ink transition-transform hover:scale-[1.03] active:scale-[.97]">
          <span className="transition-transform duration-300 group-hover:-rotate-[8deg]">
            <Logo size={36} />
            <LogoFallback size={36} />
          </span>
          <span className="text-[16.5px] font-bold tracking-[-.02em]">
            NestHub<span className="font-bold" style={{ color: '#1337CF' }}> Solution</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-[30px]">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`group relative text-[15px] font-medium transition-colors hover:text-ink ${isActive(l.href) ? 'text-ink' : 'text-muted'}`}
            >
              {l.label}
              <span className={`absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-brand-500 transition-transform duration-300 group-hover:scale-x-100 ${isActive(l.href) ? 'scale-x-100' : 'scale-x-0'}`} />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="/contact"
            className="h-11 px-5 flex items-center rounded-[14px] bg-brand-500 text-white text-[16px] font-semibold shadow-[0_6px_18px_rgba(19,55,207,.22)] transition-all hover:-translate-y-px hover:bg-brand-600"
          >
            Start a project
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden flex h-11 w-11 items-center justify-center shrink-0"
        >
          <span className="relative block w-5 h-3">
            <span className={`absolute left-0 top-0 block h-[1.6px] w-5 bg-ink transition-transform duration-200 ${open ? 'translate-y-[5.2px] rotate-45' : ''}`} />
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 block h-[1.6px] w-5 bg-ink transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 bottom-0 block h-[1.6px] w-5 bg-ink transition-transform duration-200 ${open ? '-translate-y-[5.2px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      {open && (
        <div className="note-in lg:hidden mx-auto mt-2 max-w-[1320px] rounded-[20px] border border-line bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,.08)]">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-[15px] font-medium hover:bg-surface ${isActive(l.href) ? 'bg-surface text-brand-500' : 'text-ink'}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-12 items-center justify-center rounded-[14px] bg-brand-500 text-[16px] font-semibold text-white"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
