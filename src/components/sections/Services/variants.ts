import type { Variants } from 'framer-motion'

/** Every card in the grid shares this footprint — uniform 3-col x 2-row layout. */
export const cardMinHeight = 'min-h-[360px]'

export const badgeVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 22 },
  },
}
