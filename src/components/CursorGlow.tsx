import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { damping: 25, stiffness: 180, mass: 0.5 });
  const y = useSpring(mouseY, { damping: 25, stiffness: 180, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 rounded-full hidden md:block"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: 600,
        height: 600,
        background:
          "radial-gradient(circle, hsl(175 80% 50% / 0.07) 0%, transparent 65%)",
      }}
    />
  );
};

export default CursorGlow;
