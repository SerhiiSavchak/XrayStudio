"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
    home: "Back to Home",
    contact: "Get in Touch",
    looking: "Looking for something specific?",
  },
  uk: {
    title: "Сторінку не знайдено",
    description: "Сторінка, яку ви шукаєте, не існує або була переміщена. Повернемось на правильний шлях.",
    home: "На головну",
    contact: "Зв'язатися",
    looking: "Шукаєте щось конкретне?",
  },
  ru: {
    title: "Страница не найдена",
    description: "Страница, которую вы ищете, не существует или была перемещена. Вернёмся на правильный путь.",
    home: "На главную",
    contact: "Связаться",
    looking: "Ищете что-то конкретное?",
  },
};

export default function NotFound() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-b from-foreground to-muted-foreground/20 bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg mb-8 leading-relaxed"
        >
          {t.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            {t.home}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-full border border-border bg-transparent text-foreground hover:bg-surface hover:border-accent/30 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.contact}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border/50"
        >
          <p className="text-muted-foreground text-sm mb-4">{t.looking}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { href: "/services", label: locale === "uk" ? "Послуги" : locale === "ru" ? "Услуги" : "Services" },
              { href: "/work", label: locale === "uk" ? "Роботи" : locale === "ru" ? "Работы" : "Work" },
              { href: "/about", label: locale === "uk" ? "Про мене" : locale === "ru" ? "Обо мне" : "About" },
              { href: "/contact", label: locale === "uk" ? "Контакт" : locale === "ru" ? "Контакт" : "Contact" },
            ].map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                {i > 0 && <span className="text-border">|</span>}
                <Link href={link.href} className="text-sm text-foreground hover:text-accent transition-colors duration-300">
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
