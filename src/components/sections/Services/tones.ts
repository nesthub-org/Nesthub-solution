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

/** Raw hex ramps per accent — used for SVG fills/strokes and inline gradients. */
export const tones: Record<ServiceAccent, TonePalette> = {
  violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9' },
  sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1' },
  orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c' },
  emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857' },
  amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
  teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e' },
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

// Tailwind's scanner needs complete literal class strings, so every accent's
// utility list is spelled out in full rather than built from the color name.
export const accentStyles: Record<ServiceAccent, AccentStyle> = {
  violet: {
    badgeBg: 'bg-violet-50/80',
    badgeText: 'text-violet-700',
    badgeBorder: 'border-violet-100',
    badgeDot: 'bg-violet-500',
    border: 'hover:border-violet-200/80',
    shadowHover: 'hover:shadow-[0_32px_64px_-24px_rgba(124,58,237,.32)]',
    underline: 'bg-violet-500',
    tagHover: 'group-hover:border-violet-200 group-hover:bg-violet-50 group-hover:text-violet-700',
    ctaText: 'text-violet-600',
    glowFrom: 'from-violet-200/60',
    ringHover: 'group-hover:ring-violet-200',
    iconGlow: 'shadow-[0_0_0_1px_rgba(124,58,237,.08),0_8px_20px_-6px_rgba(124,58,237,.35)]',
  },
  sky: {
    badgeBg: 'bg-sky-50/80',
    badgeText: 'text-sky-700',
    badgeBorder: 'border-sky-100',
    badgeDot: 'bg-sky-500',
    border: 'hover:border-sky-200/80',
    shadowHover: 'hover:shadow-[0_32px_64px_-24px_rgba(2,132,199,.32)]',
    underline: 'bg-sky-500',
    tagHover: 'group-hover:border-sky-200 group-hover:bg-sky-50 group-hover:text-sky-700',
    ctaText: 'text-sky-600',
    glowFrom: 'from-sky-200/60',
    ringHover: 'group-hover:ring-sky-200',
    iconGlow: 'shadow-[0_0_0_1px_rgba(2,132,199,.08),0_8px_20px_-6px_rgba(2,132,199,.35)]',
  },
  orange: {
    badgeBg: 'bg-orange-50/80',
    badgeText: 'text-orange-700',
    badgeBorder: 'border-orange-100',
    badgeDot: 'bg-orange-500',
    border: 'hover:border-orange-200/80',
    shadowHover: 'hover:shadow-[0_32px_64px_-24px_rgba(234,88,12,.32)]',
    underline: 'bg-orange-500',
    tagHover: 'group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-700',
    ctaText: 'text-orange-600',
    glowFrom: 'from-orange-200/60',
    ringHover: 'group-hover:ring-orange-200',
    iconGlow: 'shadow-[0_0_0_1px_rgba(234,88,12,.08),0_8px_20px_-6px_rgba(234,88,12,.35)]',
  },
  emerald: {
    badgeBg: 'bg-emerald-50/80',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-100',
    badgeDot: 'bg-emerald-500',
    border: 'hover:border-emerald-200/80',
    shadowHover: 'hover:shadow-[0_32px_64px_-24px_rgba(5,150,105,.32)]',
    underline: 'bg-emerald-500',
    tagHover: 'group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700',
    ctaText: 'text-emerald-600',
    glowFrom: 'from-emerald-200/60',
    ringHover: 'group-hover:ring-emerald-200',
    iconGlow: 'shadow-[0_0_0_1px_rgba(5,150,105,.08),0_8px_20px_-6px_rgba(5,150,105,.35)]',
  },
  amber: {
    badgeBg: 'bg-amber-50/80',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-100',
    badgeDot: 'bg-amber-500',
    border: 'hover:border-amber-200/80',
    shadowHover: 'hover:shadow-[0_32px_64px_-24px_rgba(217,119,6,.32)]',
    underline: 'bg-amber-500',
    tagHover: 'group-hover:border-amber-200 group-hover:bg-amber-50 group-hover:text-amber-700',
    ctaText: 'text-amber-600',
    glowFrom: 'from-amber-200/60',
    ringHover: 'group-hover:ring-amber-200',
    iconGlow: 'shadow-[0_0_0_1px_rgba(217,119,6,.08),0_8px_20px_-6px_rgba(217,119,6,.35)]',
  },
  teal: {
    badgeBg: 'bg-teal-50/80',
    badgeText: 'text-teal-700',
    badgeBorder: 'border-teal-100',
    badgeDot: 'bg-teal-500',
    border: 'hover:border-teal-200/80',
    shadowHover: 'hover:shadow-[0_32px_64px_-24px_rgba(13,148,136,.32)]',
    underline: 'bg-teal-500',
    tagHover: 'group-hover:border-teal-200 group-hover:bg-teal-50 group-hover:text-teal-700',
    ctaText: 'text-teal-600',
    glowFrom: 'from-teal-200/60',
    ringHover: 'group-hover:ring-teal-200',
    iconGlow: 'shadow-[0_0_0_1px_rgba(13,148,136,.08),0_8px_20px_-6px_rgba(13,148,136,.35)]',
  },
}
