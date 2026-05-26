import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Palette, Zap, Globe, Smartphone, Cloud, ExternalLink, Star, Quote, Target, Eye, Heart, Share2, Mail, MapPin, Phone, Send, Calendar, Clock, Video, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import WordReveal from "@/components/WordReveal";
import projectNgo from "@/assets/project-ngo.jpg";
import projectHoney from "@/assets/project-honey.png";
import projectTrading from "@/assets/project-trading.png";
import projectHealth from "@/assets/project-health.png";
import calendlyImage from "@/assets/calendly-cta.jpg";

const testimonials = [
  // {
  //   name: "Aarav Mehta",
  //   role: "Founder, Hope Foundation",
  //   project: "NGO Website",
  //   content: "NestHub Solution transformed our vision into a beautiful, functional website. Donations increased by 40% within the first month. Their understanding of our mission was remarkable.",
  //   rating: 5,
  //   initials: "AM",
  // },
  {
    name: "Mr. Yogendra Maurya",
    role: "Founder, Vedyara Organic",
    project: "E-Commerce Platform",
    content: "Our honey brand needed an online presence that matched the quality of our product. NestHub delivered beyond expectations — the site is gorgeous and our online sales have tripled.",
    rating: 5,
    initials: "YK",
  },
  {
    name: "Mr. Amit Mishra",
    role: "CEO, MoneyView.in",
    project: "Trading Platform",
    content: "Building a trading education platform is complex, but the NestHub team handled it with precision. Real-time charts, course modules, community features — everything works flawlessly.",
    rating: 5,
    initials: "AM",
  },
  {
    name: "Mr. Mahtab Alam",
    role: "Health & Wellness",
    project: "Fitlifesutra",
    content: "NestHub helped us create a stronger online presence with a clean, user-friendly design. The website made it easier for us to connect with our community and showcase our Herbalife nutrition programs in a simple, professional, and engaging manner.",
    rating: 5,
    initials: "MA"
  },
];

const values = [
  { icon: Target, title: "Innovation First", desc: "We stay ahead of the curve, leveraging the latest technologies." },
  { icon: Eye, title: "Transparency", desc: "Open communication and honest timelines. You're always in the loop." },
  { icon: Heart, title: "Client-Centric", desc: "Your success is our success. Every decision aligns with your goals." },
];

const CALENDLY_URL = "https://calendly.com/workquerysol/30min";
// Static Forms API key
const STATICFORM_API_KEY = "sf_96hcfm4egdje3k77kii2j9ma";

const Index = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -90]);
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  const stats = [
    { to: 3, suffix: "+", label: t('stats.projects') },
    { to: 100, suffix: "%", label: t('stats.satisfaction') },
    { to: 2, suffix: "+", label: t('stats.experience') },
  ];

  const services = [
    { icon: Code2, title: t('services.items.web_development.title'), desc: t('services.items.web_development.desc'), features: t('services.items.web_development.features', { returnObjects: true }) },
    { icon: Palette, title: t('services.items.ui_design.title'), desc: t('services.items.ui_design.desc'), features: t('services.items.ui_design.features', { returnObjects: true }) },
    { icon: Smartphone, title: t('services.items.responsive.title'), desc: t('services.items.responsive.desc'), features: t('services.items.responsive.features', { returnObjects: true }) },
    { icon: Zap, title: t('services.items.performance.title'), desc: t('services.items.performance.desc'), features: t('services.items.performance.features', { returnObjects: true }) },
    { icon: Globe, title: t('services.items.seo.title'), desc: t('services.items.seo.desc'), features: t('services.items.seo.features', { returnObjects: true }) },
    { icon: Cloud, title: t('services.items.cloud.title'), desc: t('services.items.cloud.desc'), features: t('services.items.cloud.features', { returnObjects: true }) },
    // { icon: Shield, title: t('services.items.security.title'), desc: t('services.items.security.desc'), features: t('services.items.security.features', { returnObjects: true }) },
    // { icon: BarChart3, title: t('services.items.analytics.title'), desc: t('services.items.analytics.desc'), features: t('services.items.analytics.features', { returnObjects: true }) },
    // { icon: Headphones, title: t('services.items.support.title'), desc: t('services.items.support.desc'), features: t('services.items.support.features', { returnObjects: true }) },
    { icon: Share2, title: t('services.items.social.title'), desc: t('services.items.social.desc'), features: t('services.items.social.features', { returnObjects: true }) },
  ];

  const projects = [
    {
      title: "Fitlife Sutra",
      category: "Health & Wellness",
      description: "A comprehensive digital platform for Vitality Management, showcasing their Herbalife nutrition programs and facilitating community engagement through an intuitive, modern interface.",
      tags: ["Health", "Wellness", "Responsive", "UI/UX"],
      image: projectHealth,
      color: "from-green-500/20 to-emerald-500/20",
      link: "https://fitlifesutra.netlify.app/"
    },
    {
      title: t('portfolio.projects.ecommerce.title'),
      category: t('portfolio.projects.ecommerce.category'),
      description: t('portfolio.projects.ecommerce.description'),
      tags: ["E-Commerce", "Stripe", "Product Catalog", "Blog"],
      image: projectHoney,
      color: "from-amber-500/20 to-yellow-500/20",
      link:'https://www.vedyara.in'
    },
    {
      title: t('portfolio.projects.trading.title'),
      category: t('portfolio.projects.trading.category'),
      description: t('portfolio.projects.trading.description'),
      tags: ["Real-time Data", "Charts", "LMS", "WebSockets"],
      image: projectTrading,
      color: "from-emerald-500/20 to-cyan-500/20",
      link:'https://moneyview-app-v1.vercel.app/'
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: STATICFORM_API_KEY,
          subject: `User ${form.name} nquery`,
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          replyTo: form.email,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "", phone: "" });
      } else {
        toast.error(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-glow top-1/4 left-1/2 -translate-x-1/2" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-6 pt-20 pb-16 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
            >
              {t('hero.title')}{" "}
              <span className="text-gradient">{t('hero.titleHighlight')}</span>{" "}
              {t('hero.results')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                {t('hero.cta_primary')} <ArrowRight size={18} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                {t('hero.cta_secondary')}
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[1/4, 1/2, 3/4].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute top-0 w-px bg-border/30"
              style={{ left: `${pos * 100}%` }}
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.4, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border border-border/60 flex items-start justify-center pt-1.5"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 py-10 md:py-14">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="inline-flex flex-col items-center px-6 py-4 rounded-full bg-primary/10 border border-primary/20 shadow-sm min-w-[140px]">
                  <span className="font-display text-2xl md:text-3xl font-bold text-primary mb-1">
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <AnimatedSection variant="fade">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t('services.section_label')}</span>
            </AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
              <WordReveal text={t('services.section_title')} delay={0.05} />
              {" "}
              <WordReveal text={t('services.section_highlight')} wordClassName="text-gradient" delay={0.2} />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.06}>
                <div className="glass-card rounded-xl p-8 hover-lift group h-full flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <service.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((f) => (
                      <span key={f} className="text-xs px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary/80">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <AnimatedSection variant="fade">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t('portfolio.section_label')}</span>
            </AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
              <WordReveal text={t('portfolio.section_title')} delay={0.05} />
              {" "}
              <WordReveal text={t('portfolio.section_highlight')} wordClassName="text-gradient" delay={0.2} />
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {/* Featured card — full width, image left + content right */}
            <AnimatedSection delay={0} variant="scale">
              <div className="glass-card rounded-2xl overflow-hidden group hover-lift">
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[340px]">
                  <div className="relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${projects[0].color} opacity-50 z-10 pointer-events-none`} />
                    <img
                      src={projects[0].image}
                      alt={projects[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 min-h-[240px] md:min-h-0"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-primary text-xs font-semibold uppercase tracking-widest">{projects[0].category}</span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-3">{projects[0].title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{projects[0].description}</p>
                    <div className="flex flex-wrap gap-2 mb-7">
                      {projects[0].tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full border border-border bg-secondary/50 text-secondary-foreground text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={projects[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm w-fit"
                    >
                      {t('portfolio.view_details')} <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Two smaller cards side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.slice(1).map((project, i) => (
                <AnimatedSection key={project.title} delay={(i + 1) * 0.12} variant={i === 0 ? "left" : "right"}>
                  <div className="glass-card rounded-2xl overflow-hidden group hover-lift h-full flex flex-col">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 z-10 pointer-events-none`} />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm"
                        >
                          {t('portfolio.view_details')} <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-primary text-xs font-semibold uppercase tracking-widest">{project.category}</span>
                      <h3 className="font-display text-xl font-bold mt-1.5 mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-full border border-border bg-secondary/50 text-secondary-foreground text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <AnimatedSection variant="fade">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t('testimonials.section_label')}</span>
            </AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
              <WordReveal text={t('testimonials.section_title')} delay={0.05} />
              {" "}
              <WordReveal text={t('testimonials.section_highlight')} wordClassName="text-gradient" delay={0.2} />
            </h2>
          </div>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative overflow-hidden mb-5 marquee-fade group/row1">
          <div className="flex w-max animate-marquee-left group-hover/row1:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((item, i) => (
              <div key={i} className="w-[380px] mx-3 shrink-0 glass-card rounded-2xl p-7 relative overflow-hidden">
                <Quote size={50} className="absolute -top-1 -right-1 text-primary/5" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/85 text-sm leading-relaxed mb-5 line-clamp-4">"{item.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary font-display font-bold text-xs">{item.initials}</span>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.role} · {item.project}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative overflow-hidden marquee-fade group/row2">
          <div className="flex w-max animate-marquee-right group-hover/row2:[animation-play-state:paused]">
            {[...[...testimonials].reverse(), ...[...testimonials].reverse()].map((item, i) => (
              <div key={i} className="w-[380px] mx-3 shrink-0 glass-card rounded-2xl p-7 relative overflow-hidden">
                <Quote size={50} className="absolute -top-1 -right-1 text-primary/5" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/85 text-sm leading-relaxed mb-5 line-clamp-4">"{item.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary font-display font-bold text-xs">{item.initials}</span>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.role} · {item.project}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden">
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedSection variant="fade">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t('about.section_label')}</span>
            </AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-5">
              <WordReveal text={t('about.section_title')} delay={0.05} />
              {" "}
              <WordReveal text={t('about.section_highlight')} wordClassName="text-gradient" delay={0.2} />
            </h2>
            <AnimatedSection variant="fade" delay={0.3}>
              <p className="text-lg text-muted-foreground">{t('about.description')}</p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-8 hover-lift text-center h-full">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <v.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
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
              {t('cta.title')} <span className="text-gradient">{t('cta.title_highlight')}</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {t('cta.description')}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              {t('cta.button')} <ArrowRight size={18} />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          {/* Calendly CTA */}
          <AnimatedSection className="max-w-5xl mx-auto mb-20">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto min-h-[320px]">
                  <img src={calendlyImage} alt="Schedule a consultation call" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-background/20 lg:to-background/80" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                    <Calendar size={16} /> {t('calendly.badge')}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    {t('calendly.title')} <span className="text-gradient">{t('calendly.title_highlight')}</span>
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t('calendly.description')}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    {[{ icon: Clock, text: t('calendly.duration') }, { icon: Video, text: t('calendly.type') }].map((item) => (
                      <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <item.icon size={16} className="text-primary" /> {item.text}
                      </div>
                    ))}
                  </div>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto">
                    {t('calendly.button')} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t('contact.section_label')}</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-5">
              {t('contact.section_title')} <span className="text-gradient">{t('contact.section_highlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground">{t('contact.section_description')}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <AnimatedSection className="lg:col-span-2 space-y-6" delay={0.1}>
              {[
                { icon: Mail, label: "Email", value: "workquerysol@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 8188941304" },
                { icon: MapPin, label: "Office", value: "Jaipur, Rajasthan, India" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-3" delay={0.2}>
              <form ref={formRef} onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-5">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.form_name')}</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.form_phone')}</label>
                  <input type="tel" pattern="(\+91)?[0-9]{10}" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Your phone number" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.form_email')}</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.form_message')}</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                  {sending ? (<>Sending... <Loader2 size={18} className="animate-spin" /></>) : (<>{t('contact.form_send')} <Send size={18} /></>)}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
