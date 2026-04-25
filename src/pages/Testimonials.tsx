import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Owner, Golden Harvest Honey",
    project: "E-Commerce Platform",
    content:
      "Our honey brand needed an online presence that matched the quality of our product. Nextgen delivered beyond expectations — the site is gorgeous, the checkout is seamless, and our online sales have tripled. Truly exceptional work.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Rohan Kapoor",
    role: "CEO, TradeView Academy",
    project: "Trading Platform",
    content:
      "Building a trading education platform is complex, but the Nextgen team handled it with precision. Real-time charts, course modules, community features — everything works flawlessly. They're not just developers, they're strategic partners.",
    rating: 5,
    initials: "RK",
  },
];

const highlights = [
  { value: "100%", label: "5-Star Reviews" },
  { value: "3/3", label: "Repeat Clients" },
  { value: "40%", label: "Avg. Growth for Clients" },
];

const Testimonials = () => {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Testimonials
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-3 mb-5">
              What Our Clients{" "}
              <span className="text-gradient">Say</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Don't just take our word for it. Here's what the people we've
              worked with have to say about the Nextgen experience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-10 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.12}>
                <motion.div
                  className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Quote icon */}
                  <Quote
                    size={80}
                    className="absolute -top-2 -right-2 text-primary/5 group-hover:text-primary/10 transition-colors"
                  />

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={18}
                        className="fill-primary text-primary"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground/90 text-lg leading-relaxed mb-8 relative z-10">
                    "{t.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-display font-bold text-sm">
                        {t.initials}
                      </span>
                    </div>
                    <div>
                      <div className="font-display font-semibold text-foreground">
                        {t.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t.role} · {t.project}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-border/50">
            {highlights.map((stat) => (
              <AnimatedSection key={stat.label} className="py-12 text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="glass-card rounded-2xl p-12 md:p-20 text-center max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Ready to Join Our{" "}
              <span className="text-gradient">Happy Clients</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Let's create something amazing together and add your success story
              to our wall.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default Testimonials;
