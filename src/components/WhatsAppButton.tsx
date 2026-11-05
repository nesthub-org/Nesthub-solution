import { useEffect, useState, type ReactNode } from 'react'
import { leadMessage, plainWhatsappHref, telHref, useLead, whatsappHref } from '../lib/lead'
import { track } from '../lib/track'

export function WhatsAppGlyph({ size = 26, color = '#ffffff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 448 512" fill={color} aria-hidden>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.7z" />
    </svg>
  )
}

interface WhatsAppLinkProps {
  message: string
  /** Where on the page this link sits, for reading the funnel later. */
  placement: string
  className?: string
  children: ReactNode
}

/** Opens a chat with us. The ad source joins the message at click time, since the prerendered HTML can't know it. */
export function WhatsAppLink({ message, placement, className, children }: WhatsAppLinkProps) {
  return (
    <a
      href={plainWhatsappHref(message)}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={(e) => {
        e.currentTarget.href = whatsappHref(message)
        track('whatsapp_click', { content_category: placement })
      }}
    >
      {children}
    </a>
  )
}

/** Desktop and tablet: a labelled pill, carrying the visitor's preview with it once they've made one. */
export function WhatsAppButton() {
  const lead = useLead()
  // Waits below the first screen, where it would otherwise sit on top of the page's own content.
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!scrolled) return null

  return (
    <div className="note-in fixed bottom-6 left-6 z-[70] hidden transition-transform hover:-translate-y-0.5 sm:block">
      <WhatsAppLink
        message={leadMessage(lead)}
        placement="floating"
        className="flex h-[52px] items-center gap-2.5 rounded-full bg-[#25D366] px-5 text-[15px] font-bold text-[#06281A] shadow-[0_10px_30px_rgba(37,211,102,.4)]"
      >
        <WhatsAppGlyph size={21} color="#06281A" />
        Chat on WhatsApp
      </WhatsAppLink>
    </div>
  )
}

/** Phones: one-tap WhatsApp and call, always in reach. Slides away while the keyboard is up. */
export function MobileActionBar() {
  const lead = useLead()

  return (
    <>
      <div aria-hidden className="h-[68px] bg-navy sm:hidden" />
      <div
        className={`fixed inset-x-0 bottom-0 z-[70] border-t border-black/10 bg-white px-2.5 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] transition-transform duration-200 sm:hidden ${lead.typing ? 'translate-y-full' : ''}`}
      >
        <div className="flex gap-2">
          <WhatsAppLink
            message={leadMessage(lead)}
            placement="bar"
            className="flex h-[50px] flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#25D366] text-[15.5px] font-bold text-[#06281A]"
          >
            <WhatsAppGlyph size={20} color="#06281A" />
            {lead.businessName ? 'Build this on WhatsApp' : 'WhatsApp us'}
          </WhatsAppLink>
          <a
            href={telHref}
            onClick={() => track('call_click', { content_category: 'bar' })}
            className="flex h-[50px] w-[82px] items-center justify-center gap-1.5 rounded-[14px] border border-ink/15 text-[15px] font-semibold text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
            </svg>
            Call
          </a>
        </div>
      </div>
    </>
  )
}
