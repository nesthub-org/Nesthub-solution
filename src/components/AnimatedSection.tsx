import { motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "up" | "down" | "left" | "right" | "scale" | "fade";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}

const variants: Record<Variant, { initial: object; whileInView: object }> = {
  up:    { initial: { opacity: 0, y: 28 },       whileInView: { opacity: 1, y: 0 } },
  down:  { initial: { opacity: 0, y: -28 },      whileInView: { opacity: 1, y: 0 } },
  left:  { initial: { opacity: 0, x: -36 },      whileInView: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 36 },       whileInView: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.94 }, whileInView: { opacity: 1, scale: 1 } },
  fade:  { initial: { opacity: 0 },              whileInView: { opacity: 1 } },
};

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: Props) => {
  const { initial, whileInView } = variants[variant];
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
