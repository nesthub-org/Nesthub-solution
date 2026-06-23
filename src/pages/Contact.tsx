import { useState, useRef } from "react";
import { Mail, MapPin, Phone, Send, Calendar, ArrowRight, Clock, Video, Loader2 } from "lucide-react";
import { toast } from "sonner";
// removed EmailJS; using Static Forms instead
import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";
import calendlyImage from "@/assets/calendly-cta.jpg";

const CALENDLY_URL = "https://calendly.com/workquerysol/30min";

// Static Forms API key
const STATICFORM_API_KEY = "sf_96hcfm4egdje3k77kii2j9ma";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Prepare form payload for Static Forms
      const payload = {
        apiKey: STATICFORM_API_KEY,
        name: form.name,
        email: form.email,
        message: form.message,
        // set a dynamic subject using the provided template
        subject: `User ${form.name} nquery`,
        // set replyTo so you can reply directly to the submitter
        replyTo: form.email,
      } as Record<string, string>;

      const res = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        // If you have Auto-Responder enabled in your Static Forms dashboard
        // the user will receive the configured confirmation email automatically.
        // We also show an immediate in-app confirmation for all users.
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
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
      {/* Calendly Hero Section */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-5xl mx-auto">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-64 lg:h-auto min-h-[320px]">
                  <img
                    src={calendlyImage}
                    alt="Schedule a 1-on-1 consultation call"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-background/20 lg:to-background/80" />
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                    <Calendar size={16} />
                    Schedule a Call
                  </span>
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Book a Free{" "}
                    <span className="text-gradient">1-on-1 Discovery Call</span>
                  </h1>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Let's discuss your project in detail. Pick a time that works for you and we'll walk through your vision, goals, and how we can bring it to life.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    {[
                      { icon: Clock, text: "30 min session" },
                      { icon: Video, text: "Video or Phone" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <item.icon size={16} className="text-primary" />
                        {item.text}
                      </div>
                    ))}
                  </div>

                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
                  >
                    Book Your Free Call <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Contact Us</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-5">
              Or Send Us a{" "}
              <span className="text-gradient">Message</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Have an idea? We'd love to hear about it. Reach out and let's discuss how we can help.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Info */}
            <AnimatedSection className="lg:col-span-2 space-y-6" delay={0.1}>
              {[
                { icon: Mail, label: "Email", value: "contact@nesthubsolution.in" },
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

            {/* Form */}
            <AnimatedSection className="lg:col-span-3" delay={0.2}>
              <form ref={formRef} onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-5">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Name</label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                  <input
                    type="email"
                    name="from_email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {sending ? (
                    <>Sending... <Loader2 size={18} className="animate-spin" /></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
