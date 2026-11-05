import type { ServiceAccent } from '../../../data/content'

export interface TonePalette {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
}

const cobalt: TonePalette = { 50: '#eef1fd', 100: '#dde4fb', 200: '#b5c3f5', 300: '#8ba0ee', 400: '#5a75e3', 500: '#1337cf', 600: '#0f2db0', 700: '#0c2596' }
const marker: TonePalette = { 50: '#fffbe6', 100: '#fff4bf', 200: '#ffe97a', 300: '#ffe14d', 400: '#f7cf1e', 500: '#1337cf', 600: '#1337cf', 700: '#0c2596' }

/**
 * Raw hex ramps per accent — used for SVG fills/strokes and inline gradients.
 * The whole site shares the homepage's cobalt and marker yellow, so the accents
 * alternate between those two rather than giving each item its own colour.
 */
export const tones: Record<ServiceAccent, TonePalette> = {
  violet: cobalt,
  sky: cobalt,
  orange: marker,
  emerald: cobalt,
  amber: marker,
  teal: cobalt,
}

export interface AccentStyle {
  badgeBg: string
  badgeText: string
  badgeBorder: string
  badgeDot: string
  border: string
  shadowHover: string
  underline: string
  tagHover: string
  ctaText: string
  glowFrom: string
  ringHover: string
  iconGlow: string
}

const cobaltStyle: AccentStyle = {
  badgeBg: 'bg-brand-50',
  badgeText: 'text-blueprint',
  badgeBorder: 'border-brand-100',
  badgeDot: 'bg-blueprint',
  border: 'hover:border-brand-200',
  shadowHover: 'hover:shadow-[0_32px_64px_-24px_rgba(19,55,207,.32)]',
  underline: 'bg-blueprint',
  tagHover: 'group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-blueprint',
  ctaText: 'text-blueprint',
  glowFrom: 'from-brand-100/60',
  ringHover: 'group-hover:ring-brand-200',
  iconGlow: 'shadow-[0_0_0_1px_rgba(19,55,207,.08),0_8px_20px_-6px_rgba(19,55,207,.35)]',
}

export const accentStyles: Record<ServiceAccent, AccentStyle> = {
  violet: cobaltStyle,
  sky: cobaltStyle,
  orange: cobaltStyle,
  emerald: cobaltStyle,
  amber: cobaltStyle,
  teal: cobaltStyle,
}
