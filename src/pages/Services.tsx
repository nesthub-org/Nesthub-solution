import { Link } from "react-router-dom";
import { ArrowRight, Code2, Palette, Zap, Globe, BarChart3, Shield, Smartphone, Cloud, Headphones } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";

const services = [
  { icon: Code2, title: "Website Development", desc: "Tailored websites and web applications built with cutting-edge technologies. We use React, React.js, and modern frameworks to create scalable solutions.", features: ["React & Next.js", "API Integration", "CMS Development"] },
  { icon: Palette, title: "UI/UX Design", desc: "User-centered design that converts. We create intuitive interfaces backed by research and tested with real users.", features: ["Wireframing", "Prototyping", "User Testing"] },
  { icon: Smartphone, title: "Responsive Design", desc: "Pixel-perfect designs that look stunning on every device. Mobile-first approach for maximum reach.", features: ["Mobile-First", "Cross-Browser", "Adaptive Layouts"] },
  { icon: Zap, title: "Performance Optimization", desc: "Lightning-fast websites that rank higher and convert better. We optimize every millisecond.", features: ["Core Web Vitals", "Caching Strategy", "Code Splitting"] },
  { icon: Globe, title: "SEO & Digital Marketing", desc: "Data-driven strategies to improve your online visibility and drive qualified traffic to your website.", features: ["Technical SEO", "Content Strategy", "Analytics Setup"] },
  // { icon: Cloud, title: "Cloud Solutions", desc: "Scalable cloud infrastructure that grows with your business. AWS, Azure, and GCP expertise.", features: ["Cloud Migration", "Auto-Scaling", "DevOps"] },
  // { icon: Shield, title: "Security & Compliance", desc: "Enterprise-grade security measures to protect your data and ensure regulatory compliance.", features: ["SSL/TLS", "GDPR Compliance", "Security Audits"] },
  // { icon: BarChart3, title: "Analytics & Insights", desc: "Comprehensive analytics setup to track user behavior and measure business impact.", features: ["Dashboard Setup", "A/B Testing", "ROI Tracking"] },
  // { icon: Headphones, title: "Ongoing Support", desc: "Dedicated support and maintenance to keep your digital presence running smoothly 24/7.", features: ["24/7 Monitoring", "Regular Updates", "Priority Support"] },
];

const Services = () => (
  <PageTransition>
    <section className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Services</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-3 mb-5">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed Online</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            From design to deployment and beyond, we offer end-to-end web solutions tailored to your business goals.
          </p>
        </AnimatedSection>

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

        <AnimatedSection className="text-center mt-20">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Discuss Your Project <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </PageTransition>
);

export default Services;
