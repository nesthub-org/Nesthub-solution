import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

const SplineHero = () => {
  const { t } = useTranslation();
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
      glow.style.background = `radial-gradient(ellipse 55% 45% at ${x}% ${y}%, hsl(var(--primary) / 0.1) 0%, transparent 65%)`;
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

  const heroStats = [
    { value: "3+",   label: t('stats.projects') },
    { value: "100%", label: t('stats.satisfaction') },
    { value: "2+",   label: t('stats.experience') },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-4"
      style={{ background: "#0A0A0A" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top-right ambient glow */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.07)", filter: "blur(120px)" }}
      />

      {/* Mouse-tracking glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ opacity: 0, transition: "opacity 0.4s ease" }}
      />

      {/* ══ 2-COLUMN LAYOUT ══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-7 space-y-5">

          {/* Status badge */}
          <div
            className="opacity-0 animate-fade-up inline-flex items-center gap-3 px-4 py-2 rounded-full"
            style={{
              border: "1px solid hsl(var(--primary) / 0.3)",
              background: "hsl(var(--primary) / 0.05)",
              animationDelay: "0.05s",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span className="font-jetbrains text-[10px] text-primary uppercase tracking-[0.12em] font-bold">
              {t('hero.badge')}
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="opacity-0 animate-fade-up font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3.4rem)", animationDelay: "0.15s" }}
          >
            NESTHUB{" "}
            <span className="text-primary">SOLUTION</span>
            <br />
            <span className="text-foreground/35">That Drive Results</span>
          </h1>

          {/* Description */}
          <p
            className="opacity-0 animate-fade-up text-foreground/65 font-light leading-relaxed font-sora"
            style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)", maxWidth: "34rem", animationDelay: "0.28s" }}
          >
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div
            className="opacity-0 animate-fade-up flex flex-wrap gap-4 pointer-events-auto"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-jetbrains text-[11px] font-bold uppercase tracking-[0.08em] hover:brightness-110 active:scale-[0.97] transition-all"
            >
              {t('hero.cta_primary')} <ArrowRight size={15} />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-jetbrains text-[11px] font-bold uppercase tracking-[0.08em] text-primary hover:bg-primary/10 active:scale-[0.97] transition-all"
              style={{ border: "1px solid hsl(var(--primary) / 0.3)" }}
            >
              {t('hero.cta_secondary')}
            </a>
          </div>

          {/* Stats row */}
          <div
            className="opacity-0 animate-fade-up grid grid-cols-3 gap-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)", animationDelay: "0.54s", paddingTop: "1.25rem" }}
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="font-jetbrains text-[9px] text-muted-foreground uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN — desktop only ── */}
        <div className="lg:col-span-5 relative hidden lg:block">

          {/* Glass panel */}
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              aspectRatio: "4 / 4.2",
              background: "rgba(14,14,14,0.92)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Strong central glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 85% 70% at 50% 44%, hsl(var(--primary) / 0.22) 0%, transparent 70%)",
              }}
            />

            {/* Pulse rings — centered at 44% from top */}
            <div
              className="absolute pointer-events-none"
              style={{ top: "44%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${180 + i * 90}px`,
                    height: `${180 + i * 90}px`,
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid hsl(var(--primary) / 0.2)",
                    animation: `pulse-ring 4s ease-out ${i * 1.3}s infinite`,
                    opacity: 0,
                  }}
                />
              ))}
              {/* Center orb with glow */}
              <div
                style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 14, height: 14,
                  borderRadius: "50%",
                  background: "hsl(var(--primary))",
                  boxShadow: "0 0 20px hsl(var(--primary) / 0.7), 0 0 50px hsl(var(--primary) / 0.35)",
                }}
              />
            </div>

            {/* ── Floating card: AI ENABLED tag (top-left) ── */}
            <div
              className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(10,10,10,0.85)",
                border: "1px solid hsl(var(--primary) / 0.25)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-jetbrains text-[9px] text-primary uppercase tracking-[0.1em] font-bold">
                AI ENABLED
              </span>
            </div>

            {/* ── Floating card: Lighthouse score (top-right) ── */}
            <div
              className="absolute rounded-xl p-4"
              style={{
                top: "14%", right: "8%",
                background: "rgba(10,10,10,0.88)",
                border: "1px solid rgba(255,255,255,0.07)",
                minWidth: 148,
              }}
            >
              <div className="font-jetbrains text-[8px] text-muted-foreground uppercase tracking-widest mb-2">
                Lighthouse Score
              </div>
              <div className="font-display text-2xl font-bold text-primary leading-none mb-2.5">
                98 <span className="text-sm text-muted-foreground font-normal">/ 100</span>
              </div>
              <div
                className="h-0.5 w-full rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: "98%" }}
                />
              </div>
            </div>

            {/* ── Floating card: Tech stack (mid-left) ── */}
            <div
              className="absolute rounded-xl p-4"
              style={{
                bottom: "30%", left: "7%",
                background: "rgba(10,10,10,0.88)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="font-jetbrains text-[8px] text-muted-foreground uppercase tracking-widest mb-2.5">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Node.js", "AI", "TypeScript"].map((tag) => (
                  <span
                    key={tag}
                    className="font-jetbrains text-[8px] font-bold uppercase px-2 py-0.5 rounded"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Bottom status card ── */}
            <div
              className="absolute bottom-5 left-5 right-5 p-4 rounded-xl"
              style={{
                background: "rgba(10,10,10,0.92)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-jetbrains text-[10px] text-primary font-bold uppercase tracking-[0.1em]">
                  SYSTEM:ONLINE
                </span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <div
                className="h-px w-full rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div className="h-full rounded-full bg-primary" style={{ width: "78%" }} />
              </div>
              <div className="mt-2.5 flex justify-between font-jetbrains text-[9px] text-muted-foreground uppercase tracking-[0.05em]">
                <span>PERFORMANCE INDEX</span>
                <span>78%</span>
              </div>
            </div>
          </div>

          {/* Corner bracket decorations */}
          <div
            className="absolute -bottom-4 -left-4 w-14 h-14 pointer-events-none"
            style={{
              borderLeft: "2px solid hsl(var(--primary) / 0.4)",
              borderBottom: "2px solid hsl(var(--primary) / 0.4)",
            }}
          />
          <div
            className="absolute -top-4 -right-4 w-14 h-14 pointer-events-none"
            style={{
              borderRight: "2px solid hsl(var(--primary) / 0.4)",
              borderTop: "2px solid hsl(var(--primary) / 0.4)",
            }}
          />
        </div>

      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: translate(-50%, -50%) scale(0.6); opacity: 0.6; }
          80%  { opacity: 0.12; }
          100% { transform: translate(-50%, -50%) scale(1.35); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default SplineHero;
