import { motion } from 'framer-motion'

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#05060A]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.22) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 30%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 30%, black 30%, transparent 85%)',
        }}
      />
      <motion.div
        className="absolute -top-32 left-[6%] h-[560px] w-[560px] rounded-full bg-brand-500/55 blur-[100px]"
        animate={{ x: [0, 70, -30, 0], y: [0, 50, -40, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -top-16 right-[2%] h-[480px] w-[480px] rounded-full bg-cyan-400/45 blur-[95px]"
        animate={{ x: [0, -60, 40, 0], y: [0, 60, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[-120px] left-[30%] h-[420px] w-[420px] rounded-full bg-indigo-500/35 blur-[90px]"
        animate={{ x: [0, 50, -50, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
    </div>
  )
}
