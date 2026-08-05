interface LogoProps {
  size?: number
  className?: string
}

// Points at public/logo.png so the real brand mark can be dropped in without
// any code changes — falls back to the mark below if the file is missing.
export function Logo({ size = 50, className }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="NestHub Solution"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
        padding: size * 0.04,
        borderRadius: size * 0.3,
        background: 'linear-gradient(135deg, #111111 0%, #1f2937 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.16), 0 8px 20px rgba(17, 17, 17, 0.12)',
        transform: 'scale(1.12)',
        transformOrigin: 'center',
      }}
      onError={(e) => {
        e.currentTarget.onerror = null
        e.currentTarget.style.display = 'none'
        e.currentTarget.nextElementSibling?.classList.remove('hidden')
      }}
    />
  )
}

export function LogoFallback({ size = 50 }: { size?: number }) {
  return (
    <span
      className="relative hidden shrink-0 overflow-hidden rounded-[10px] border border-white/10 bg-ink"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.85) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.85) 1px, transparent 1px)',
          backgroundSize: `${size * 0.25}px ${size * 0.25}px`,
        }}
      />
      <span
        className="absolute rounded-[4px] bg-brand-500"
        style={{ width: size * 0.3, height: size * 0.3, right: size * 0.23, top: size * 0.23 }}
      />
    </span>
  )
}
