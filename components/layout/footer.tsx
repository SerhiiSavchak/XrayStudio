import Link from "next/link";

const footerLinks = {
  main: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-1/50 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Link 
              href="/" 
              className="text-xl font-medium tracking-tight text-foreground"
            >
              Serhii Savchak
            </Link>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed max-w-md">
              Product-minded web developer creating premium websites that look expensive, 
              build trust, and help convert visitors into clients.
            </p>
            
            {/* Contact Info */}
            <div className="mt-8 space-y-2">
              <a 
                href="mailto:hello@serhiisavchak.com"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                hello@serhiisavchak.com
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 lg:col-start-8">
            <h3 className="text-sm font-medium text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Section */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-medium text-foreground mb-4">Start a Project</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Ready to create something exceptional? Let&apos;s discuss your project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Get in Touch
              <svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {currentYear} Serhii Savchak. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
