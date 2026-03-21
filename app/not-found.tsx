"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    home: "Back to home",
    contact: "Get in touch",
    links: "Quick links",
  },
  uk: {
    title: "Сторінку не знайдено",
    description: "Сторінка, яку ви шукаєте, не існує або була переміщена.",
    home: "На головну",
    contact: "Зв'язатися",
    links: "Швидкі посилання",
  },
  ru: {
    title: "Страница не найдена",
    description: "Страница, которую вы ищете, не существует или была перемещена.",
    home: "На главную",
    contact: "Связаться",
    links: "Быстрые ссылки",
  },
};

export default function NotFound() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
        
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.05, transparent 50%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-xl">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="font-display text-[140px] md:text-[180px] lg:text-[220px] font-bold leading-none text-[rgb(var(--foreground))]/[0.04]">
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--foreground))] tracking-tight mb-6"
        >
          {t.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-[rgb(var(--muted-foreground))] text-lg lg:text-xl mb-10 leading-relaxed font-light"
        >
          {t.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-[rgb(var(--foreground))] text-[rgb(var(--background))] transition-all duration-300"
          >
            {t.home}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-full border border-[rgb(var(--border))]/50 text-[rgb(var(--foreground))] hover:bg-[rgb(var(--surface-2))]/30 hover:border-[rgb(var(--border))] transition-all duration-300"
          >
            {t.contact}
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 pt-10 border-t border-[rgb(var(--border))]/30"
        >
          <p className="text-[rgb(var(--muted-foreground))] text-sm mb-5">{t.links}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              { href: "/services", label: locale === "uk" ? "Послуги" : locale === "ru" ? "Услуги" : "Services" },
              { href: "/work", label: locale === "uk" ? "Роботи" : locale === "ru" ? "Работы" : "Work" },
              { href: "/about", label: locale === "uk" ? "Про мене" : locale === "ru" ? "Обо мне" : "About" },
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--glow-intense))] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
