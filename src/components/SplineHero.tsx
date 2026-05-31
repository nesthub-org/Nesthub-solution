import { useRef, useEffect } from "react";

const SplineHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow    = glowRef.current;
    if (!section || !glow) return;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      // Direct DOM update — zero React re-renders
      glow.style.background = `radial-gradient(ellipse 50% 40% at ${x}% ${y}%, hsl(var(--primary) / 0.25) 0%, transparent 65%)`;
      glow.style.opacity = "1";
    };
    const onLeave = () => { glow.style.opacity = "0"; };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full flex items-end overflow-hidden"
      style={{ background: "#050808" }}
    >
      {/* Dot grid — pure CSS, zero JS */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Static ambient teal glow — bottom left */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 20% 80%, hsl(var(--primary) / 0.18) 0%, transparent 70%)",
        }}
      />

      {/* Mouse-tracking glow — updated via DOM ref, no re-renders */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ opacity: 0, transition: "opacity 0.4s ease" }}
      />

      {/* Animated pulse rings — CSS only */}
      <div className="absolute top-1/4 right-[12%] z-[1] pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{
              width: `${220 + i * 130}px`,
              height: `${220 + i * 130}px`,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              animation: `pulse-ring 4s ease-out ${i * 1.3}s infinite`,
              opacity: 0,
            }}
          />
        ))}
        <div
          className="absolute rounded-full bg-primary/30"
          style={{ width: 8, height: 8, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Dark vignette */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-lg lg:max-w-2xl px-6 md:px-12 pb-16 md:pb-14 pt-32 font-sora">

        <div className="opacity-0 animate-fade-up flex items-center gap-2 mb-6" style={{ animationDelay: "0.05s" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="text-primary text-xs font-medium uppercase tracking-[0.18em]">
            Engineered for Precision
          </span>
        </div>

        <h1
          className="opacity-0 animate-fade-up text-foreground font-bold uppercase leading-[1.0] tracking-[-0.03em] mb-4"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", animationDelay: "0.2s" }}
        >
          NESTHUB <span className="text-primary">SOLUTION</span>
        </h1>

        <p
          className="opacity-0 animate-fade-up text-foreground/75 font-light mb-4 font-sora"
          style={{ fontSize: "clamp(1rem, 2.2vw, 1.55rem)", animationDelay: "0.38s" }}
        >
          We build digital excellence.
        </p>

        <p
          className="opacity-0 animate-fade-up text-muted-foreground font-light leading-relaxed mb-8 font-sora"
          style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)", animationDelay: "0.52s", maxWidth: "36rem" }}
        >
          High-performance websites, e-commerce platforms & web applications built for growing brands.
          Custom React development, UI/UX design, and SEO — delivered with precision from Jaipur, India.
        </p>

        <div className="opacity-0 animate-fade-up flex flex-wrap gap-3 pointer-events-auto" style={{ animationDelay: "0.66s" }}>
          <a href="#contact" className="bg-primary text-primary-foreground font-semibold px-7 py-3.5 text-sm rounded-sm hover:brightness-110 active:scale-[0.97] transition-all">
            Start a Project
          </a>
          <a href="#portfolio" className="bg-white text-black font-semibold px-7 py-3.5 text-sm rounded-sm hover:brightness-90 active:scale-[0.97] transition-all">
            View Our Work
          </a>
        </div>

        <p
          className="opacity-0 animate-fade-up text-muted-foreground/40 text-xs font-light mt-6"
          style={{ animationDelay: "0.8s" }}
        >
          Trusted web agency · Jaipur, India · 3+ projects delivered
        </p>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.5; }
          80%  { opacity: 0.08; }
          100% { transform: translate(-50%,-50%) scale(1.3); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default SplineHero;
