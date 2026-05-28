import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface WordProps {
  word: string;
  index: number;
  center: number;
  scrollYProgress: MotionValue<number>;
}

const Word = ({ word, index, center, scrollYProgress }: WordProps) => {
  const dist = Math.abs(index - center);
  const dir  = index <= center ? -1 : 1;

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [dir * dist * 55, 0, dir * dist * -18]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.75, 1],
    [0, 1, 1, 0.2]
  );

  return (
    <motion.span
      style={{ rotateY, opacity, transformPerspective: 700, display: "inline-block" }}
      className="font-display font-bold uppercase tracking-tight leading-none select-none px-[1vw]"
    >
      <span style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}>{word}</span>
    </motion.span>
  );
};

interface Props {
  text: string;
}

const ScrollTextReveal = ({ text }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const words  = text.split(" ");
  const center = (words.length - 1) / 2;

  return (
    <div ref={targetRef} style={{ height: "160vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-wrap justify-center items-center">
          {words.map((word, i) => (
            <Word
              key={i}
              word={word}
              index={i}
              center={center}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollTextReveal;
