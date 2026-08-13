import { useId } from 'react'

interface DecorativePatternProps {
  className?: string
  color?: string
  dotSize?: number
  gap?: number
  /** Opacity of the pattern at its center, before the radial fade takes over. */
  opacity?: number
}

/** A tiny dot grid, faded toward the edges via a radial mask so it reads as texture, not noise. */
export function DecorativePattern({ className, color = '#9aa1af', dotSize = 1.3, gap = 24, opacity = 0.45 }: DecorativePatternProps) {
  const uid = useId().replace(/:/g, '')
  const patternId = `svc-dots-${uid}`
  const fadeId = `svc-fade-${uid}`
  const maskId = `svc-mask-${uid}`

  return (
    <svg aria-hidden className={className} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <pattern id={patternId} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={dotSize} cy={dotSize} r={dotSize} fill={color} />
        </pattern>
        <radialGradient id={fadeId} cx="50%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill={`url(#${fadeId})`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} mask={`url(#${maskId})`} opacity={opacity} />
    </svg>
  )
}
