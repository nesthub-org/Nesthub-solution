import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

const container = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.09, delayChildren: delay },
  }),
};

const word = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const WordReveal = ({ text, className = "", wordClassName = "", delay = 0 }: Props) => (
  <motion.span
    className={className}
    variants={container}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    style={{ display: "inline" }}
  >
    {text.split(" ").map((w, i) => (
      <motion.span
        key={i}
        variants={word}
        className={wordClassName}
        style={{ display: "inline-block", marginRight: "0.28em" }}
      >
        {w}
      </motion.span>
    ))}
  </motion.span>
);

export default WordReveal;
