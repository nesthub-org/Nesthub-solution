import { motion } from 'framer-motion'
import type { ReactElement } from 'react'

// Small hand-drawn "sticker" illustrations that sit in the top-right corner
// of each service card — a lightweight stand-in for bespoke artwork, built
// from plain SVG primitives so there's no extra asset weight.

export interface Tone {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
}

export const tones: Record<'violet' | 'sky' | 'orange' | 'emerald' | 'amber' | 'teal', Tone> = {
  violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' },
  sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
  orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
  emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669' },
  amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' },
  teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488' },
}

type Accent = keyof typeof tones

function AiArt({ t }: { t: Tone }) {
  return (
    <svg width="76" height="76" viewBox="0 0 120 120" fill="none">
      {/* dot grid */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle key={`${row}-${col}`} cx={16 + col * 9} cy={16 + row * 9} r="2" fill={t[200]} />
        )),
      )}
      {/* iso cube */}
      <g stroke="#fff" strokeWidth="2" strokeLinejoin="round">
        <path d="M70 25 L100 42 L70 59 L40 42 Z" fill={t[200]} />
        <path d="M40 42 L70 59 L70 94 L40 77 Z" fill={t[400]} />
        <path d="M70 59 L100 42 L100 77 L70 94 Z" fill={t[600]} />
      </g>
      {/* sparkle */}
      <path d="M98 18 L100 24 L106 26 L100 28 L98 34 L96 28 L90 26 L96 24 Z" fill={t[500]} />
    </svg>
  )
}

function DevArt({ t }: { t: Tone }) {
  return (
    <svg width="80" height="73" viewBox="0 0 120 108" fill="none">
      <rect x="14" y="10" width="96" height="74" rx="10" fill="#fff" stroke={t[200]} strokeWidth="2" />
      <circle cx="24" cy="19" r="2.3" fill={t[500]} />
      <circle cx="31.5" cy="19" r="2.3" fill={t[300]} />
      <circle cx="39" cy="19" r="2.3" fill={t[100]} />
      <rect x="24" y="28" width="76" height="42" rx="6" fill={t[50]} />
      <circle cx="82" cy="40" r="5" fill={t[300]} />
      <path d="M30 62 L47 44 L58 53 L72 38 L94 62 Z" fill={t[400]} opacity="0.55" />
    </svg>
  )
}

function DesignArt({ t }: { t: Tone }) {
  return (
    <svg width="76" height="76" viewBox="0 0 112 112" fill="none">
      <rect x="18" y="12" width="60" height="46" rx="8" fill={t[100]} stroke={t[200]} strokeWidth="2" transform="rotate(8 48 35)" />
      <g transform="rotate(-6 66 54)">
        <rect x="32" y="28" width="64" height="48" rx="8" fill="#fff" stroke={t[200]} strokeWidth="2" />
        <text x="46" y="60" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="24" fill={t[600]}>
          Aa
        </text>
        <circle cx="46" cy="70" r="3.5" fill={t[500]} />
        <circle cx="56" cy="70" r="3.5" fill={t[300]} />
        <circle cx="66" cy="70" r="3.5" fill={t[100]} />
      </g>
    </svg>
  )
}

function MobileArt({ t }: { t: Tone }) {
  return (
    <svg width="60" height="72" viewBox="0 0 104 124" fill="none">
      <g transform="rotate(8 62 62)">
        <rect x="40" y="8" width="44" height="88" rx="14" fill="#fff" stroke={t[300]} strokeWidth="2.5" />
        <rect x="54" y="13" width="16" height="3" rx="1.5" fill={t[300]} />
        <rect x="46" y="18" width="32" height="68" rx="8" fill={t[50]} />
        <circle cx="62" cy="31" r="6" fill={t[500]} />
        <rect x="51" y="45" width="22" height="4" rx="2" fill={t[300]} />
        <rect x="51" y="55" width="22" height="4" rx="2" fill={t[300]} />
        <rect x="51" y="65" width="14" height="4" rx="2" fill={t[200]} />
      </g>
    </svg>
  )
}

function SpeedArt({ t }: { t: Tone }) {
  return (
    <svg width="80" height="67" viewBox="0 0 120 100" fill="none">
      <path d="M20 80 A40 40 0 0 1 100 80" stroke={t[100]} strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M20 80 A40 40 0 0 1 82 42" stroke={t[500]} strokeWidth="10" strokeLinecap="round" fill="none" />
      <g stroke={t[300]} strokeWidth="2" strokeLinecap="round">
        <line x1="20" y1="80" x2="26" y2="80" />
        <line x1="60" y1="40" x2="60" y2="46" />
        <line x1="100" y1="80" x2="94" y2="80" />
      </g>
      <motion.g
        style={{ transformOrigin: '60px 80px' }}
        animate={{ rotate: [-6, 4, -6] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="60" y1="80" x2="84" y2="52" stroke={t[600]} strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      <circle cx="60" cy="80" r="6" fill={t[600]} />
    </svg>
  )
}

function SeoArt({ t }: { t: Tone }) {
  return (
    <svg width="82" height="72" viewBox="0 0 128 112" fill="none">
      <rect x="14" y="14" width="92" height="64" rx="10" fill="#fff" stroke={t[200]} strokeWidth="2" transform="rotate(-4 60 46)" />
      <g transform="rotate(-4 60 46)">
        <line x1="24" y1="68" x2="96" y2="68" stroke={t[100]} strokeWidth="2" />
        <polyline points="24,64 40,54 52,58 66,40 80,44 94,26" fill="none" stroke={t[500]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {[
          [24, 64],
          [40, 54],
          [52, 58],
          [66, 40],
          [80, 44],
          [94, 26],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill={t[600]} />
        ))}
      </g>
      <circle cx="94" cy="86" r="10" fill="#fff" stroke={t[600]} strokeWidth="3" />
      <line x1="101" y1="93" x2="110" y2="102" stroke={t[600]} strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

const artByIcon: Record<string, (props: { t: Tone }) => ReactElement> = {
  ai: AiArt,
  dev: DevArt,
  design: DesignArt,
  mobile: MobileArt,
  speed: SpeedArt,
  seo: SeoArt,
}

interface ServiceGraphicProps {
  icon: string
  accent: Accent
  rotate?: number
  delay?: number
}

export function ServiceGraphic({ icon, accent, rotate = -6, delay = 0 }: ServiceGraphicProps) {
  const Art = artByIcon[icon]
  if (!Art) return null
  const t = tones[accent]

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute right-3 top-3 sm:right-4 sm:top-4"
      initial={{ rotate, y: 0 }}
      animate={{ y: [0, -3, 0], rotate: [rotate, rotate + 2, rotate] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
      whileHover={{ scale: 1.08, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 16 } }}
    >
      <Art t={t} />
    </motion.div>
  )
}
