import { Instagram, Facebook, Linkedin } from "lucide-react";

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/nesthubsolution",
  },
  // {
  //   icon: Facebook,
  //   label: "Facebook",
  //   href: "https://www.facebook.com/nesthubsolution",
  // },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nesthub-solution",
  },
];

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/50">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="font-display text-xl font-bold mb-3">
            <span className="text-gradient">NestHub</span> Solution
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            We craft digital experiences that drive growth. From concept to launch, we build websites that make an impact.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm text-foreground">Links</h4>
          <div className="flex flex-col gap-2">
            <a href="/#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a>
            <a href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</a>
            <a href="/#portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</a>
            <a href="/#testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Testimonials</a>
            <a href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
            <a href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm text-foreground">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>contact@nesthubsolution.in</span>
            <span>+91 8188941304</span>
            <span>Jaipur, Rajasthan, India</span>
          </div>
        </div>
      </div>
      <div className="glow-line mt-10 mb-6" />
      <p className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NestHub Solution. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
