import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from '../Reveal'
import { Icon } from '../Icon'
import { brand } from '../../data/content'
import { useMountAfterHydration } from '../../hooks/usePrerendering'
import { SplitText } from '../SplitText'

// Calendly's inline scheduler as a plain iframe — no widget script needed.
const calendlyEmbed = `${brand.calendly}?embed_type=Inline&embed_domain=nesthubsolution.in&hide_gdpr_banner=1&hide_event_type_details=1&primary_color=2563eb`

const agenda = ['Your goals, audience and timeline', 'What to build first — and what to skip', 'A ballpark budget and next steps']

export function BookCall() {
  const frameRef = useRef<HTMLDivElement>(null)
  // Fetch Calendly only once the visitor scrolls near it, and never during the
  // prerender capture (mounted stays false there) so the snapshot stays static.
  const near = useInView(frameRef, { once: true, margin: '400px 0px' })
  const mounted = useMountAfterHydration()

  return (
    <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal tilt={false}>
        <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-line bg-surface lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative p-8 sm:p-12 lg:px-10 lg:py-9 xl:px-12">
            <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-100/70 blur-3xl" />
            <span className="relative text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Schedule a call</span>
            <SplitText className="relative mt-4 text-[28px] sm:text-[34px] font-bold leading-[1.15] tracking-[-.03em]">
              Book a Free 1-on-1 Discovery Call
            </SplitText>
            <p className="relative mt-4 max-w-[420px] text-[16px] sm:text-[17px] leading-[1.6] text-muted">
              Pick a slot that suits you, right here — we'll walk through your goals and how to bring them to life.
            </p>
            <div className="relative mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-semibold text-muted">
              <span className="flex items-center gap-2">
                <Icon name="clock" size={18} color="#6B7280" />
                30 min session
              </span>
              <span className="flex items-center gap-2">
                <Icon name="video" size={18} color="#6B7280" />
                Video or Phone
              </span>
              <a href={brand.calendly} target="_blank" rel="noreferrer" className="text-brand-500 hover:text-brand-600">
                Open in new tab ↗
              </a>
            </div>

            <div className="relative mt-6 rounded-2xl border border-line bg-white p-5 lg:p-4">
              <div className="text-[12px] font-semibold uppercase tracking-[.1em] text-muted">On the call</div>
              <ul className="mt-3 grid gap-2.5">
                {agenda.map((a, i) => (
                  <li key={a} className="flex items-center gap-3 text-[15px]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[12px] font-bold text-white">{i + 1}</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={frameRef} className="relative h-[620px] border-t border-line bg-white lg:h-auto lg:min-h-[min(600px,calc(100dvh-140px))] lg:border-l lg:border-t-0">
            {mounted && near ? (
              <iframe
                src={calendlyEmbed}
                title="Book a free 30-minute discovery call with NestHub Solution"
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-brand-50">
                  <Icon name="clock" size={26} color="#2563EB" />
                </span>
                <p className="text-[15px] text-muted">Loading available time slots…</p>
                <a href={brand.calendly} target="_blank" rel="noreferrer" className="text-[14px] font-semibold">
                  Book on Calendly →
                </a>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
