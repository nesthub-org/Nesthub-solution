import { motion } from 'framer-motion'

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(17,17,17,.09) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 72% 58% at 50% 0%, black 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 72% 58% at 50% 0%, black 35%, transparent 85%)',
        }}
      />
      <motion.div
        className="absolute -top-52 left-[4%] h-[560px] w-[560px] rounded-full bg-brand-500/25 blur-[120px]"
        animate={{ x: [0, 70, -30, 0], y: [0, 50, -40, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -top-32 right-[0%] h-[460px] w-[460px] rounded-full bg-cyan-400/20 blur-[110px]"
        animate={{ x: [0, -60, 40, 0], y: [0, 60, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[240px] left-[34%] h-[380px] w-[380px] rounded-full bg-indigo-400/15 blur-[100px]"
        animate={{ x: [0, 50, -50, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
    </div>
  )
}
