"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "Contact",
    title: "Let's discuss your project",
    description: "Ready to create something exceptional? Tell me about your project and goals. No need for a detailed brief — we'll figure out the specifics together.",
  },
  uk: {
    label: "Контакт",
    title: "Обговоримо ваш проект",
    description: "Готові створити щось виняткове? Розкажіть про ваш проект та цілі. Детальний бриф не потрібен — розберемося разом.",
  },
  ru: {
    label: "Контакт",
    title: "Обсудим ваш проект",
    description: "Готовы создать что-то исключительное? Расскажите о вашем проекте и целях. Детальный бриф не нужен — разберёмся вместе.",
  },
};

export function ContactHero() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="relative pt-32 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--accent)/0.08,transparent_60%)]" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-accent tracking-wide uppercase mb-4"
          >
            {t.label}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
          >
            {t.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed"
          >
            {t.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
