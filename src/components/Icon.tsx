import { icons, type IconDef } from '../data/content'

interface IconProps {
  name: keyof typeof icons
  size?: number
  color?: string
}

export function Icon({ name, size = 24, color = '#111111' }: IconProps) {
  const paths: IconDef = icons[name] ?? []
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
