import { useState, useEffect } from "react";
import { Briefcase, Code2, TrendingUp, MapPin, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";

const JOB_POSTING_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JobPosting",
      "@id": "https://nesthubsolution.in/careers#bde",
      "title": "Business Development Executive",
      "description": "Drive NestHub Solution's growth by identifying new business opportunities, nurturing client relationships, and closing deals. You'll work directly with our founders to expand our client base across India.",
      "identifier": {
        "@type": "PropertyValue",
        "name": "NestHub Solution",
        "value": "NHS-BDE-2025"
      },
      "datePosted": "2026-06-23",
      "validThrough": "2026-12-31",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "NestHub Solution",
        "sameAs": "https://nesthubsolution.in",
        "logo": "https://nesthubsolution.in/logo.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "postalCode": "302001",
          "addressCountry": "IN"
        }
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "India"
      },
      "jobLocationType": "TELECOMMUTE",
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": 200000,
          "maxValue": 500000,
          "unitText": "YEAR"
        }
      },
      "skills": "Business Development, Sales, Client Management, Digital Services, CRM, Communication",
      "qualifications": "Bachelor's degree in any discipline, 0–2 years of experience in business development or sales",
      "experienceRequirements": "0–2 years",
      "educationRequirements": "Bachelor's degree in any discipline",
      "responsibilities": "Identify new business opportunities, conduct discovery calls, prepare proposals, close client contracts, manage client relationships, track pipeline in CRM",
      "url": "https://nesthubsolution.in/careers"
    },
    {
      "@type": "JobPosting",
      "@id": "https://nesthubsolution.in/careers#sde-intern",
      "title": "Software Development Engineer Intern",
      "description": "Join NestHub Solution's engineering team and build real-world web products using React, TypeScript, and modern tooling under the mentorship of senior developers.",
      "identifier": {
        "@type": "PropertyValue",
        "name": "NestHub Solution",
        "value": "NHS-SDE-INTERN-2025"
      },
      "datePosted": "2026-06-23",
      "validThrough": "2026-12-31",
      "employmentType": "INTERN",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "NestHub Solution",
        "sameAs": "https://nesthubsolution.in",
        "logo": "https://nesthubsolution.in/logo.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "postalCode": "302001",
          "addressCountry": "IN"
        }
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "India"
      },
      "jobLocationType": "TELECOMMUTE",
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": 5000,
          "maxValue": 15000,
          "unitText": "MONTH"
        }
      },
      "skills": "React, TypeScript, HTML, CSS, JavaScript, Git, REST APIs",
      "qualifications": "Pursuing or recently completed B.Tech/BCA/BSc in Computer Science or related field",
      "experienceRequirements": "Fresher / Entry level",
      "educationRequirements": "B.Tech, BCA, or BSc in Computer Science (pursuing or completed)",
      "responsibilities": "Develop UI components with React and TypeScript, integrate REST APIs, participate in code reviews and standups, help debug production issues",
      "url": "https://nesthubsolution.in/careers"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nesthubsolution.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Careers",
          "item": "https://nesthubsolution.in/careers"
        }
      ]
    }
  ]
};

const STATICFORM_API_KEY = "sf_96hcfm4egdje3k77kii2j9ma";

const roles = [
  {
    id: "bde",
    title: "Business Development Executive",
    shortTitle: "BDE",
    icon: TrendingUp,
    type: "Full-time",
    location: "Jaipur, Rajasthan (On-site / Hybrid)",
    description:
      "Drive NestHub Solution's growth by identifying new business opportunities, nurturing client relationships, and closing deals. You'll work directly with our founders to expand our client base.",
    responsibilities: [
      "Identify and pursue new business opportunities via LinkedIn, email outreach, and referrals",
      "Conduct discovery calls, prepare proposals, and close new client contracts",
      "Maintain strong relationships with existing clients to ensure retention and upsells",
      "Collaborate with the tech team to understand service offerings and communicate value clearly",
      "Track pipeline in CRM and report weekly metrics to leadership",
    ],
    requirements: [
      "0–2 years of experience in business development, sales, or client management",
      "Strong verbal and written communication in English and Hindi",
      "Familiarity with digital services (web development, SEO, social media)",
      "Self-motivated, target-driven mindset",
      "Bachelor's degree in any discipline",
    ],
  },
  {
    id: "sde-intern",
    title: "Software Development Engineer Intern",
    shortTitle: "SDE Intern",
    icon: Code2,
    type: "Internship (3–6 months)",
    location: "Remote / Jaipur",
    description:
      "Join our engineering team and build real-world web products. You'll contribute to client projects using React, TypeScript, and modern tooling under the mentorship of our senior developers.",
    responsibilities: [
      "Develop and maintain responsive UI components using React and TypeScript",
      "Integrate REST APIs and third-party services into web applications",
      "Write clean, reusable code following project conventions",
      "Participate in code reviews and daily standups",
      "Help debug and resolve issues in production applications",
    ],
    requirements: [
      "Pursuing or recently completed B.Tech/BCA/BSc in Computer Science or related field",
      "Solid understanding of HTML, CSS, JavaScript fundamentals",
      "Basic knowledge of React (hooks, components, state management)",
      "Familiarity with Git version control",
      "Curiosity to learn and ability to work independently",
    ],
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  position: "",
  portfolioLink: "",
  coverLetter: "",
};

const Careers = () => {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "careers-jsonld";
    script.textContent = JSON.stringify(JOB_POSTING_SCHEMA);
    document.head.appendChild(script);
    return () => {
      document.getElementById("careers-jsonld")?.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.position) {
      toast.error("Please select the role you're applying for.");
      return;
    }
    setSending(true);

    const role = roles.find((r) => r.id === form.position);

    try {
      const payload = {
        apiKey: STATICFORM_API_KEY,
        subject: `Career Application — ${role?.title ?? form.position}`,
        name: form.name,
        email: form.email,
        replyTo: form.email,
        message: `
Role Applied: ${role?.title ?? form.position}
Phone: ${form.phone}
Portfolio / LinkedIn: ${form.portfolioLink || "Not provided"}

Cover Letter:
${form.coverLetter}
        `.trim(),
      } as Record<string, string>;

      const res = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm(initialForm);
        toast.success("Application submitted! We'll be in touch soon.");
      } else {
        toast.error(data.message || "Submission failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please email us at contact@nesthubsolution.in");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              <Briefcase size={16} />
              We're Hiring
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Build the Future With{" "}
              <span className="text-gradient">NestHub Solution</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're a small, ambitious team building digital products that matter. If you're hungry to learn and grow, we'd love to have you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Open Roles */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Open Positions</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">
              Current <span className="text-gradient">Openings</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-8">
            {roles.map((role, i) => (
              <AnimatedSection key={role.id} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <role.icon size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold mb-1">{role.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-primary" />
                          {role.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-primary" />
                          {role.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{role.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Responsibilities</h4>
                      <ul className="space-y-2">
                        {role.responsibilities.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {role.requirements.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href="#apply"
                      onClick={(e) => {
                        e.preventDefault();
                        setForm((f) => ({ ...f, position: role.id }));
                        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Apply for this role
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="pb-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Apply Now</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">
              Submit Your <span className="text-gradient">Application</span>
            </h2>
            <p className="text-muted-foreground mt-4">
              Fill out the form below and we'll get back to you within 3–5 business days.
            </p>
          </AnimatedSection>

          <AnimatedSection className="max-w-2xl mx-auto" delay={0.1}>
            {submitted ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={32} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Application Received!</h3>
                <p className="text-muted-foreground mb-6">
                  Thanks for applying. We'll review your application and reach out to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                {/* Role selector */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Role Applying For *</label>
                  <select
                    required
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="" disabled>Select a role...</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>{r.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Portfolio / LinkedIn / GitHub</label>
                    <input
                      type="url"
                      value={form.portfolioLink}
                      onChange={(e) => setForm({ ...form, portfolioLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Cover Letter / Why do you want to join? *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Tell us about yourself, your skills, and why you'd be a great fit..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {sending ? (
                    <>Submitting... <Loader2 size={18} className="animate-spin" /></>
                  ) : (
                    <>Submit Application <Send size={18} /></>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Your application will be sent to contact@nesthubsolution.in
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default Careers;
