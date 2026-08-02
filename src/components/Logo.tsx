interface LogoProps {
  size?: number
  className?: string
}

// Points at public/logo.png so the real brand mark can be dropped in without
// any code changes — falls back to the mark below if the file is missing.
export function Logo({ size = 26, className }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="NestHub Solution"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
      onError={(e) => {
        e.currentTarget.onerror = null
        e.currentTarget.style.display = 'none'
        e.currentTarget.nextElementSibling?.classList.remove('hidden')
      }}
    />
  )
}

export function LogoFallback({ size = 26 }: { size?: number }) {
  return (
    <span className="relative hidden shrink-0 rounded-lg bg-ink" style={{ width: size, height: size }}>
      <span
        className="absolute rounded-[3px] bg-brand-500"
        style={{ width: size * 0.3, height: size * 0.3, right: size * 0.23, top: size * 0.23 }}
      />
    </span>
  )
}
