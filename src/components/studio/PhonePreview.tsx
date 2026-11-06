import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { WhatsAppGlyph } from '../WhatsAppButton'
import { businessTypes, previewDomain, type BusinessTypeId } from './businessTypes'
import { MiniSite } from './MiniSite'

const ENQUIRY_DELAY_MS = 1900

/** What shows under the sample site while it's being "drawn": the page as a blueprint. */
function Wireframe() {
  return (
    <svg viewBox="0 0 320 640" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 h-full w-full text-white/75" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <rect x="16" y="14" width="26" height="26" rx="7" />
      <path d="M52 27h92M276 22h28M286 33h18" />
      <rect x="12" y="54" width="296" height="232" rx="20" strokeDasharray="5 5" />
      <path d="M34 110h176M34 142h132M34 180h110" />
      <rect x="34" y="214" width="132" height="42" rx="12" />
      <path d="M12 316h110" />
      <rect x="12" y="334" width="92" height="40" rx="10" />
      <rect x="114" y="334" width="92" height="40" rx="10" />
      <rect x="216" y="334" width="92" height="40" rx="10" />
      <rect x="12" y="392" width="296" height="60" rx="14" />
      <rect x="12" y="462" width="296" height="60" rx="14" />
      <rect x="12" y="532" width="296" height="60" rx="14" />
    </svg>
  )
}

interface PhonePreviewProps {
  typeId: BusinessTypeId
  name: string
  /** Bumped to replay the build. 0 means nothing has happened yet: render it finished, with no animation. */
  buildKey: number
  /** Let the sample site glide through its sections. Off while the visitor types, so their name stays in view. */
  drift: boolean
  /** The visitor tapped the sample site. */
  onTap: () => void
}

export function PhonePreview({ typeId, name, buildKey, drift, onTap }: PhonePreviewProps) {
  const built = buildKey > 0
  const enquiryText = businessTypes[typeId].enquiry
  const [enquiry, setEnquiry] = useState<{ id: number; text: string } | null>(null)
  const [ripple, setRipple] = useState<{ id: number; x: number; y: number } | null>(null)
  const nextId = useRef(1)

  // Every finished build ends with what a website is actually for: a customer getting in touch.
  useEffect(() => {
    if (!buildKey) return
    const t = window.setTimeout(() => setEnquiry({ id: nextId.current++, text: enquiryText }), ENQUIRY_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [buildKey, enquiryText])

  const onScreenTap = (e: MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    setRipple({ id: nextId.current++, x: e.clientX - box.left, y: e.clientY - box.top })
    setEnquiry({ id: nextId.current++, text: enquiryText })
    onTap()
  }

  return (
    <div className="studio-phone relative mx-auto w-fit" role="img" aria-label={`Sample website preview for ${name}`}>
      {/* the drawing the phone is "built from" */}
      <div aria-hidden className="absolute inset-0 hidden -translate-x-7 translate-y-5 -rotate-[5deg] rounded-[44px] border border-white/35 lg:block">
        <span className="absolute inset-3 rounded-[34px] border border-dashed border-white/25" />
      </div>

      <div className="relative rounded-[30px] bg-[#0B1026] p-[6px] shadow-[0_26px_60px_rgba(4,10,52,.5),inset_0_0_0_1px_rgba(255,255,255,.14)] sm:rounded-[36px] lg:rounded-[44px] lg:p-2">
        <span aria-hidden className="absolute -left-[2px] top-[18%] hidden h-[8%] w-[3px] rounded-l-sm bg-[#0B1026] lg:block" />
        <span aria-hidden className="absolute -left-[2px] top-[29%] hidden h-[11%] w-[3px] rounded-l-sm bg-[#0B1026] lg:block" />
        <span aria-hidden className="absolute -right-[2px] top-[24%] hidden h-[15%] w-[3px] rounded-r-sm bg-[#0B1026] lg:block" />
        <div className="relative flex flex-col overflow-hidden rounded-[24px] bg-white [contain:strict] sm:rounded-[30px] lg:rounded-[36px]" style={{ width: 'var(--screen-w)', height: 'var(--screen-h)' }}>
          <div className="relative z-[3] shrink-0 bg-white" aria-hidden>
            <div className="relative flex h-[17px] items-center justify-between px-4 text-[9px] font-semibold text-[#0B1026] lg:h-[28px] lg:px-6 lg:text-[11.5px]">
              <span>9:41</span>
              <span className="absolute left-1/2 top-[3px] h-[11px] w-[40px] -translate-x-1/2 rounded-full bg-[#0B1026] lg:top-[6px] lg:h-[18px] lg:w-[68px]" />
              <span className="flex items-center gap-1">
                <svg width="13" height="9" viewBox="0 0 18 12" fill="currentColor">
                  <rect y="8" width="3" height="4" rx="1" />
                  <rect x="5" y="5" width="3" height="7" rx="1" />
                  <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                  <rect x="15" width="3" height="12" rx="1" />
                </svg>
                <span className="relative block h-[8px] w-[15px] rounded-[2.5px] border border-current p-[1px] lg:h-[9px] lg:w-[18px]">
                  <span className="block h-full w-3/4 rounded-[1px] bg-current" />
                </span>
              </span>
            </div>
            <div className="px-2.5 pb-1 lg:px-3 lg:pb-2">
              <span className="flex h-[20px] min-w-0 items-center justify-center gap-1.5 rounded-full bg-[#EEF0F5] px-3 text-[10px] font-medium text-[#0B1026]/75 lg:h-[28px] lg:text-[12px]">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="shrink-0">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span className="truncate">{previewDomain(name)}</span>
              </span>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 cursor-pointer overflow-hidden bg-blueprint" aria-hidden onClick={onScreenTap}>
            <Wireframe />
            <div key={buildKey} className={`absolute inset-0 overflow-hidden ${built ? 'ms-wipe' : ''}`}>
              <div className={drift ? 'ms-drift' : undefined}>
                <div className="ms-scale">
                  <MiniSite typeId={typeId} name={name} />
                </div>
              </div>
            </div>
            {built && <div key={`scan-${buildKey}`} className="ms-scan" />}

            {ripple && <span key={ripple.id} className="ms-ripple" style={{ left: ripple.x, top: ripple.y }} />}

            {enquiry && (
              <div key={enquiry.id} className="ms-toast">
                <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#25D366]">
                  <WhatsAppGlyph size={18} />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center justify-between text-[10.5px] font-semibold text-[#0B1026]/55">
                    WhatsApp
                    <span>example</span>
                  </span>
                  <span className="mt-px block text-[12.5px] font-bold leading-[1.2] text-[#0B1026]">New enquiry from your website</span>
                  <span className="mt-px block text-[12px] leading-[1.25] text-[#0B1026]/80">“{enquiry.text}”</span>
                </span>
              </div>
            )}

            <span className="ms-fab absolute bottom-6 right-2.5 z-[1] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_6px_16px_rgba(0,0,0,.28)] sm:bottom-3">
              <span className="ms-fab-ring" />
              <WhatsAppGlyph size={22} />
            </span>
            <span aria-hidden className="pointer-events-none absolute bottom-1.5 left-1/2 z-[3] hidden h-[4px] w-[34%] -translate-x-1/2 rounded-full bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,.35)] sm:block" />
          </div>
        </div>
      </div>

      {businessTypes[typeId].notes.map((note, i) => (
        <span
          key={`${typeId}-${buildKey}-${i}`}
          aria-hidden
          className={`studio-note studio-note-${i} ${built ? 'note-in' : ''}`}
          style={{ '--d': `${0.75 + i * 0.2}s` } as React.CSSProperties}
        >
          {note}
        </span>
      ))}
    </div>
  )
}
