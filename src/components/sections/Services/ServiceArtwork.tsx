import { motion, useReducedMotion } from 'framer-motion'
import type { TonePalette } from './tones'

interface ArtProps {
  t: TonePalette
  reduceMotion: boolean
}

// Every illustration shares a 0..200 viewBox so they scale predictably
// regardless of the pixel size the card requests.

function AiArt({ t, reduceMotion }: ArtProps) {
  const nodes = [
    { x: 100, y: 102, r: 10, fill: t[600] },
    { x: 50, y: 60, r: 5.5, fill: t[400] },
    { x: 152, y: 54, r: 5.5, fill: t[400] },
    { x: 40, y: 146, r: 5, fill: t[300] },
    { x: 162, y: 148, r: 5, fill: t[300] },
    { x: 104, y: 26, r: 4.5, fill: t[300] },
  ]
  const links: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 5],
    [2, 5],
  ]

  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
      <g stroke={t[200]} strokeWidth="1.6">
        {links.map(([a, b], i) => {
          const A = nodes[a]
          const B = nodes[b]
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              animate={reduceMotion ? undefined : { opacity: [0.25, 0.9, 0.25] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            />
          )
        })}
      </g>
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.fill}
          animate={reduceMotion ? undefined : { y: [0, i % 2 === 0 ? -5 : 5, 0] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        />
      ))}
      <motion.path
        d="M166 36 L168.4 43 L175 45.4 L168.4 47.8 L166 55 L163.6 47.8 L157 45.4 L163.6 43 Z"
        fill={t[500]}
        animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.12, 0.9] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '166px 45px' }}
      />
      <motion.path
        d="M30 170 L31.6 174.6 L36 176 L31.6 177.4 L30 182 L28.4 177.4 L24 176 L28.4 174.6 Z"
        fill={t[400]}
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.9, 0.3], scale: [0.85, 1.1, 0.85] }}
        transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        style={{ transformOrigin: '30px 176px' }}
      />
    </svg>
  )
}

function DevArt({ t, reduceMotion }: ArtProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <motion.g
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="16" y="14" width="168" height="120" rx="14" fill="#fff" stroke={t[200]} strokeWidth="2" />
        <rect x="16" y="14" width="168" height="28" rx="14" fill={t[50]} />
        <rect x="16" y="28" width="168" height="14" fill={t[50]} />
        <circle cx="34" cy="28" r="4" fill={t[400]} />
        <circle cx="48" cy="28" r="4" fill={t[300]} />
        <circle cx="62" cy="28" r="4" fill={t[100]} />
        <rect x="86" y="24" width="80" height="8" rx="4" fill="#fff" />

        <rect x="32" y="58" width="56" height="8" rx="4" fill={t[300]} />
        <rect x="32" y="72" width="40" height="8" rx="4" fill={t[200]} />
        <rect x="32" y="86" width="48" height="8" rx="4" fill={t[200]} />
        <rect x="32" y="106" width="28" height="10" rx="5" fill={t[500]} />

        <rect x="112" y="56" width="60" height="60" rx="10" fill={t[50]} />
        <path d="M120 100 L136 78 L148 90 L162 68 L184 100 Z" fill={t[400]} opacity="0.55" />
        <circle cx="156" cy="70" r="6" fill={t[300]} />
      </motion.g>
    </svg>
  )
}

function DesignArt({ t, reduceMotion }: ArtProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <rect x="20" y="18" width="120" height="88" rx="12" fill="#fff" stroke={t[200]} strokeWidth="2" />
      <rect x="20" y="18" width="120" height="20" rx="12" fill={t[50]} />
      <rect x="20" y="28" width="120" height="10" fill={t[50]} />
      <rect x="32" y="50" width="48" height="8" rx="4" fill={t[300]} />
      <rect x="32" y="64" width="80" height="8" rx="4" fill={t[100]} />
      <rect x="32" y="78" width="60" height="8" rx="4" fill={t[100]} />
      <rect x="32" y="92" width="34" height="8" rx="4" fill={t[200]} />

      <motion.g
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="152" cy="46" r="16" fill={t[100]} stroke={t[300]} strokeWidth="2" />
        <path d="M146 46 L152 40 L158 46 L152 52 Z" fill={t[500]} />
      </motion.g>

      <motion.g
        animate={reduceMotion ? undefined : { x: [0, 6, 0], y: [0, 4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <rect x="128" y="82" width="52" height="40" rx="8" fill="#fff" stroke={t[200]} strokeWidth="2" />
        <path
          d="M138 112 L143 100 L149 108 L157 92 L172 112 Z"
          fill={t[400]}
          opacity="0.6"
        />
        {/* cursor */}
        <path d="M108 118 L108 138 L113 133 L117 141 L121 139 L117 131 L124 131 Z" fill={t[600]} stroke="#fff" strokeWidth="1.5" />
      </motion.g>
    </svg>
  )
}

function MobileArt({ t, reduceMotion }: ArtProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
      <g transform="rotate(6 100 104)">
        <rect x="68" y="26" width="72" height="144" rx="20" fill="#fff" stroke={t[300]} strokeWidth="2.5" />
        <rect x="92" y="34" width="24" height="4" rx="2" fill={t[300]} />
        <rect x="76" y="46" width="56" height="112" rx="12" fill={t[50]} />
        <circle cx="104" cy="66" r="10" fill={t[500]} />
        <rect x="86" y="86" width="36" height="6" rx="3" fill={t[300]} />
        <rect x="86" y="98" width="36" height="6" rx="3" fill={t[300]} />
        <rect x="86" y="110" width="24" height="6" rx="3" fill={t[200]} />
        <rect x="86" y="132" width="36" height="16" rx="8" fill={t[500]} />
      </g>

      <motion.g
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="18" y="52" width="58" height="34" rx="10" fill="#fff" stroke={t[200]} strokeWidth="2" />
        <circle cx="34" cy="69" r="7" fill={t[400]} />
        <rect x="46" y="63" width="22" height="5" rx="2.5" fill={t[300]} />
        <rect x="46" y="73" width="16" height="5" rx="2.5" fill={t[200]} />
      </motion.g>

      <motion.g
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <rect x="126" y="150" width="58" height="30" rx="10" fill="#fff" stroke={t[200]} strokeWidth="2" />
        <path d="M138 168 L144 160 L150 166 L158 154 L172 168 Z" fill={t[400]} opacity="0.6" />
      </motion.g>
    </svg>
  )
}

function SpeedArt({ t, reduceMotion }: ArtProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <path d="M30 132 A70 70 0 0 1 170 132" stroke={t[100]} strokeWidth="16" strokeLinecap="round" fill="none" />
      <motion.path
        d="M30 132 A70 70 0 0 1 138 66"
        stroke={t[500]}
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
      />
      <g stroke={t[300]} strokeWidth="2.5" strokeLinecap="round">
        <line x1="30" y1="132" x2="40" y2="132" />
        <line x1="100" y1="60" x2="100" y2="70" />
        <line x1="170" y1="132" x2="160" y2="132" />
      </g>
      <motion.g
        style={{ transformOrigin: '100px 132px' }}
        animate={reduceMotion ? undefined : { rotate: [-8, 6, -8] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="100" y1="132" x2="136" y2="86" stroke={t[600]} strokeWidth="4" strokeLinecap="round" />
      </motion.g>
      <circle cx="100" cy="132" r="9" fill={t[600]} />

      <g>
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={150 + i * 14}
            width="8"
            rx="4"
            fill={t[300]}
            initial={{ height: 0, y: 150 }}
            whileInView={{ height: 12 + i * 10, y: 150 - (12 + i * 10) }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 + i * 0.15 }}
          />
        ))}
      </g>
    </svg>
  )
}

function SeoArt({ t, reduceMotion }: ArtProps) {
  const points: [number, number][] = [
    [26, 108],
    [50, 86],
    [70, 96],
    [96, 62],
    [120, 72],
    [148, 40],
  ]
  const polyline = points.map(([x, y]) => `${x},${y}`).join(' ')

  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <rect x="18" y="20" width="156" height="108" rx="14" fill="#fff" stroke={t[200]} strokeWidth="2" />
      <line x1="34" y1="116" x2="158" y2="116" stroke={t[100]} strokeWidth="2" />
      <motion.polyline
        points={polyline}
        fill="none"
        stroke={t[500]}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: 'easeOut', delay: 0.15 }}
      />
      {points.map(([x, y], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={t[600]} opacity={0.9 - i * 0.03} />
      ))}

      <motion.g
        animate={reduceMotion ? undefined : { y: [0, -4, 0], x: [0, 3, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="148" cy="112" r="14" fill="#fff" stroke={t[600]} strokeWidth="4" />
        <line x1="158" y1="122" x2="172" y2="136" stroke={t[600]} strokeWidth="5" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

const artByIcon: Record<string, (props: ArtProps) => ReturnType<typeof AiArt>> = {
  ai: AiArt,
  dev: DevArt,
  design: DesignArt,
  mobile: MobileArt,
  speed: SpeedArt,
  seo: SeoArt,
}

interface ServiceArtworkProps {
  icon: string
  t: TonePalette
  className?: string
}

/** Renders the bespoke SVG illustration for a given service icon key. */
export function ServiceArtwork({ icon, t, className }: ServiceArtworkProps) {
  const reduceMotion = Boolean(useReducedMotion())
  const Art = artByIcon[icon]
  if (!Art) return null

  return (
    <div aria-hidden className={className}>
      <Art t={t} reduceMotion={reduceMotion} />
    </div>
  )
}
