"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLocale();

  const footerLinks = [
    { href: "/services", label: t.nav.services },
    { href: "/work", label: t.nav.work },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative border-t border-[rgb(var(--border))] bg-[rgb(var(--background))]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--surface-1))] to-transparent opacity-50 pointer-events-none" />

      <div className="relative container-wide section-padding">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block group">
              <span className="font-display text-2xl font-bold tracking-tight">
                <span className="text-[rgb(var(--foreground))]">xray</span>
                <span className="text-[rgb(var(--muted-foreground))]">.studio</span>
              </span>
            </Link>
            <p className="mt-6 text-[rgb(var(--muted-foreground))] text-base leading-relaxed max-w-md">
              Premium web development for experts, brands, and businesses that need a strong digital presence.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-3">
              <a
                href="mailto:hello@xray.studio"
                className="block text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
              >
                hello@xray.studio
              </a>
              <a
                href="https://t.me/xraystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
              >
                Telegram
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-sm font-medium text-[rgb(var(--foreground))] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-medium text-[rgb(var(--foreground))] mb-5">
              {t.contact.subtitle}
            </h3>
            <p className="text-sm text-[rgb(var(--muted-foreground))] mb-6 leading-relaxed">
              {t.contact.description}
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 transition-opacity"
              >
                {t.cta.contact}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[rgb(var(--border-subtle))]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              {currentYear} xray.studio. {t.footer.rights}.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
              >
                {t.footer.privacy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
