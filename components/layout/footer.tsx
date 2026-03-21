"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { useRef } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const footerLinks = [
    { href: "/services", label: t.nav.services },
    { href: "/work", label: t.nav.work },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer ref={ref} className="relative border-t border-[rgb(var(--border))]/50 bg-[rgb(var(--background))]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--surface-1))]/50 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <Link href="/" className="inline-block group">
              <span className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
                <span className="text-[rgb(var(--foreground))]">xray</span>
                <span className="text-[rgb(var(--muted-foreground))]">.studio</span>
              </span>
            </Link>
            <p className="mt-6 text-[rgb(var(--muted-foreground))] text-base lg:text-lg leading-relaxed max-w-md">
              Premium web development for experts, brands, and businesses 
              that need a strong digital presence.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 lg:col-start-7"
          >
            <h3 className="text-sm font-medium text-[rgb(var(--foreground))] mb-5 uppercase tracking-[0.15em]">
              Navigation
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="text-sm font-medium text-[rgb(var(--foreground))] mb-5 uppercase tracking-[0.15em]">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@xray.studio"
                  className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors text-base"
                >
                  hello@xray.studio
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/xraystudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors text-base group"
                >
                  Telegram
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 lg:mt-20 pt-8 border-t border-[rgb(var(--border))]/30"
        >
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
        </motion.div>
      </div>
    </footer>
  );
}
