import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Design.", "Develop.", "NestHub."];

interface Props {
  onComplete: () => void;
}

const WordsPreloader = ({ onComplete }: Props) => {
  const [index, setIndex] = useState(0);
  const [done, setDone]   = useState(false);

  useEffect(() => {
    if (index < words.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), 520);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setDone(true), 520);
      return () => clearTimeout(t);
    }
  }, [index]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(onComplete, 800);
    return () => clearTimeout(t);
  }, [done, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{ background: "#050808" }}
      animate={done ? { clipPath: "inset(0 0 100% 0)" } : {}}
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Top-left brand */}
      <div className="absolute top-8 left-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-white/30 text-xs font-mono uppercase tracking-widest">NestHub Solution</span>
      </div>

      {/* Counter */}
      <div className="absolute top-8 right-10 font-mono text-xs text-white/25 tabular-nums">
        {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(words.length).padStart(2, "0")}
      </div>

      {/* Word slot — position:relative so absolute children are contained */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(4rem, 14vw, 12rem)",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.h1
            key={index}
            className="font-display font-black text-white leading-none tracking-tight"
            style={{
              fontSize: "clamp(3.5rem, 13vw, 11rem)",
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-105%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5">
        <motion.div
          className="h-full bg-primary"
          initial={{ scaleX: 0, transformOrigin: "left center" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: words.length * 0.52, ease: "linear" }}
        />
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-8 left-10 text-white/20 font-mono text-[10px] uppercase tracking-widest">
        Loading
      </div>
    </motion.div>
  );
};

export default WordsPreloader;
