"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "Selected Work",
    title: "Projects that",
    titleAccent: "made an impact",
    description: "A curated selection of recent work. Each project crafted with attention to design, performance, and business objectives.",
  },
  uk: {
    label: "Вибрані Роботи",
    title: "Проекти, що",
    titleAccent: "мали вплив",
    description: "Кураторська добірка останніх робіт. Кожен проект створений з увагою до дизайну, продуктивності та бізнес-цілей.",
  },
  ru: {
    label: "Избранные Работы",
    title: "Проекты, которые",
    titleAccent: "имели влияние",
    description: "Кураторская подборка последних работ. Каждый проект создан с вниманием к дизайну, производительности и бизнес-целям.",
  },
};

export function WorkHero() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--accent)/0.08,transparent_60%)]" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl">
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
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.1]"
          >
            <span className="block">{t.title}</span>
            <span className="block text-muted-foreground">{t.titleAccent}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            {t.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
