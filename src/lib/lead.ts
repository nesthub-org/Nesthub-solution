import { useSyncExternalStore } from 'react'
import { brand } from '../data/content'
import { tagSession } from './track'

const SITE_URL = 'https://nesthubsolution.in'
const LEAD_KEY = 'nh-lead'
const SOURCE_KEY = 'nh-source'

export interface Lead {
  /** What the visitor typed into the homepage preview. */
  businessName: string
  typeId: string | null
  /** The preview field has focus, so the on-screen keyboard is probably up. */
  typing: boolean
}

const EMPTY: Lead = { businessName: '', typeId: null, typing: false }

function readStored(): Lead {
  if (typeof window === 'undefined') return EMPTY
  try {
    const stored = JSON.parse(sessionStorage.getItem(LEAD_KEY) ?? 'null')
    return stored ? { ...EMPTY, ...stored, typing: false } : EMPTY
  } catch {
    return EMPTY
  }
}

// Header and footer links are plain <a> tags that reload the page, so what the
// visitor typed lives in sessionStorage to follow them from page to page.
let lead = readStored()
const listeners = new Set<() => void>()

export function getLead(): Lead {
  return lead
}

export function setLead(next: Partial<Lead>) {
  lead = { ...lead, ...next }
  listeners.forEach((listener) => listener())
  try {
    sessionStorage.setItem(LEAD_KEY, JSON.stringify({ businessName: lead.businessName, typeId: lead.typeId }))
  } catch {
    // Storage unavailable: the name just won't carry over to the next page.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** The server snapshot keeps hydration in step with the prerendered HTML, which never has a lead in it. */
export function useLead(): Lead {
  return useSyncExternalStore(subscribe, getLead, () => EMPTY)
}

/** Remembers which ad brought this visitor, so a WhatsApp chat or form can be traced back to it. */
export function captureSource() {
  const params = new URLSearchParams(window.location.search)
  const parts = [params.get('utm_source'), params.get('utm_campaign'), params.get('utm_content')].filter(Boolean)
  try {
    if (parts.length) sessionStorage.setItem(SOURCE_KEY, parts.join(' / '))
    else if (params.has('fbclid') && !sessionStorage.getItem(SOURCE_KEY)) sessionStorage.setItem(SOURCE_KEY, 'meta')
  } catch {
    // Storage unavailable: the lead just arrives without a source.
  }
  const source = getSource()
  if (source) tagSession('source', source)
}

export function getSource(): string {
  try {
    return sessionStorage.getItem(SOURCE_KEY) ?? ''
  } catch {
    return ''
  }
}

export function previewUrl(businessName: string, typeId: string | null): string {
  const params = new URLSearchParams({ b: businessName })
  if (typeId) params.set('t', typeId)
  return `${SITE_URL}/?${params}`
}

const whatsappNumber = brand.phone.replace(/[^0-9]/g, '')

function withSource(message: string): string {
  const source = getSource()
  return source ? `${message}\n\n(via ${source})` : message
}

/** A chat with us opening on `message`. For prerendered markup, which can't know the visitor's source. */
export function plainWhatsappHref(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** The same chat with the ad source added. Browser only, since the source lives in sessionStorage. */
export function whatsappHref(message: string): string {
  return plainWhatsappHref(withSource(message))
}

/** The opening message for this visitor: their preview if they built one, otherwise a general hello. */
export function leadMessage({ businessName, typeId }: Pick<Lead, 'businessName' | 'typeId'>): string {
  if (!businessName) return "Hi NestHub! I'd like to talk about a website for my business."
  return `Hi NestHub! I tried the website preview for "${businessName}" on your site and I'd like to talk about building the real one.\n\nMy preview: ${previewUrl(businessName, typeId)}`
}

/** Lets the visitor send their preview to whoever they decide with: the chat picker opens, not our number. */
export function shareHref(businessName: string, typeId: string | null): string {
  const message = `Have a look at this website preview for ${businessName}: ${previewUrl(businessName, typeId)}`
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export const telHref = `tel:${brand.phone.replace(/\s+/g, '')}`
