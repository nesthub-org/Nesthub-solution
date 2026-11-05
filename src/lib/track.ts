import { environment } from '../config/environment'
import { isPrerendering } from '../hooks/usePrerendering'

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown }
    _fbq?: unknown
    /** Microsoft Clarity, loaded from index.html */
    clarity?: (...args: unknown[]) => void
  }
}

export type TrackEvent =
  | 'preview_start'
  | 'preview_ready'
  | 'preview_share'
  | 'whatsapp_click'
  | 'call_click'
  | 'calendly_click'
  | 'form_submit'
  | 'client_site_open'

// The events worth optimising ads for use Meta's standard names, so they can be
// picked as a campaign's conversion goal in Ads Manager.
const metaStandardEvents: Partial<Record<TrackEvent, string>> = {
  preview_ready: 'ViewContent',
  whatsapp_click: 'Contact',
  call_click: 'Contact',
  calendly_click: 'Schedule',
  form_submit: 'Lead',
}

/** Sends a funnel step to Clarity (filter recordings by it) and to the Meta Pixel when it's on. */
export function track(event: TrackEvent, params?: Record<string, string>) {
  if (typeof window === 'undefined') return
  window.clarity?.('event', event)
  const standard = metaStandardEvents[event]
  if (standard) window.fbq?.('track', standard, params)
  else window.fbq?.('trackCustom', event, params)
}

/** Tags the Clarity session, so recordings can be filtered by the ad that brought the visitor. */
export function tagSession(key: string, value: string) {
  window.clarity?.('set', key, value)
}

// Meta's standard base code, started once the first screen has settled so it
// can't hold up the hero on a slow phone.
function startMetaPixel(pixelId: string) {
  if (window.fbq) return
  const fbq: NonNullable<Window['fbq']> = (...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue?.push(args)
  }
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  fbq('init', pixelId)
  fbq('track', 'PageView')
}

export function initMetaPixel() {
  const { metaPixelId, isProduction } = environment
  if (!metaPixelId || !isProduction || isPrerendering()) return
  const start = () => startMetaPixel(metaPixelId)
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1500 })
  else setTimeout(start, 1000)
}
