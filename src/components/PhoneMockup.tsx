import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { TiltCard } from './TiltCard'

interface PhoneMockupProps {
  children: ReactNode
  className?: string
}

const easeOut = [0.16, 1, 0.3, 1] as const

export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div className={className} style={{ perspective: 1600 }}>
      <motion.div
        initial={{ rotateY: -115, opacity: 0 }}
        whileInView={{ rotateY: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
        transition={{ duration: 1.1, ease: easeOut }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <TiltCard max={12} lift={0} glare={false} className="w-[272px] sm:w-[292px]">
          <div className="animate-floaty-slow relative h-[600px] w-[272px] rounded-[54px] bg-ink p-2.5 shadow-[0_30px_90px_rgba(0,0,0,.18)] sm:h-[640px] sm:w-[292px]">
            {/* side controls */}
            <span className="absolute -left-[2.5px] top-[108px] h-7 w-[3px] rounded-l-sm bg-[#3a3a3a]" />
            <span className="absolute -left-[2.5px] top-[148px] h-12 w-[3px] rounded-l-sm bg-[#3a3a3a]" />
            <span className="absolute -right-[2.5px] top-[128px] h-16 w-[3px] rounded-r-sm bg-[#3a3a3a]" />

            <div className="relative h-full w-full overflow-hidden rounded-[44px] bg-white">
              <div className="absolute left-1/2 top-3 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-ink" />

              <div className="flex items-center justify-between px-7 pb-1 pt-4">
                <span className="text-[13px] font-semibold tracking-[-.01em]">9:41</span>
                <span className="flex h-2.5 w-4.5 items-center rounded-[3px] border border-ink/60 p-[1.5px]">
                  <span className="block h-full w-3/4 rounded-[1px] bg-ink/80" />
                </span>
              </div>

              {children}

              <div className="absolute bottom-2 left-1/2 z-20 h-1 w-28 -translate-x-1/2 rounded-full bg-ink/60" />
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  )
}
