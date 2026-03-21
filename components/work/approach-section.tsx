"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, Palette, Code } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "My Approach",
    title: "It's not just about the visuals",
    description: "Every project represents more than design execution. Behind each one is clear business understanding, thoughtful UX decisions, and careful technical implementation.",
    approaches: [
      { icon: Target, title: "Strategy First", description: "Every project starts with understanding your goals and audience." },
      { icon: Lightbulb, title: "Problem Solving", description: "Focus on solving real problems, not just making things pretty." },
      { icon: Palette, title: "Visual Excellence", description: "Premium execution from typography to micro-interactions." },
      { icon: Code, title: "Quality Code", description: "Clean, performant implementation built for maintainability." },
    ],
  },
  uk: {
    label: "Мій Підхід",
    title: "Це не лише про візуал",
    description: "Кожен проект - це більше ніж дизайн. За кожним стоїть розуміння бізнесу, продумані UX рішення та ретельна технічна реалізація.",
    approaches: [
      { icon: Target, title: "Стратегія Перш За Все", description: "Кожен проект починається з розуміння ваших цілей та аудиторії." },
      { icon: Lightbulb, title: "Вирішення Проблем", description: "Фокус на вирішенні реальних проблем, не лише на красі." },
      { icon: Palette, title: "Візуальна Досконалість", description: "Преміум виконання від типографіки до мікро-інтеракцій." },
      { icon: Code, title: "Якісний Код", description: "Чиста, продуктивна реалізація для легкої підтримки." },
    ],
  },
  ru: {
    label: "Мой Подход",
    title: "Это не только о визуале",
    description: "Каждый проект - это больше чем дизайн. За каждым стоит понимание бизнеса, продуманные UX решения и тщательная техническая реализация.",
    approaches: [
      { icon: Target, title: "Стратегия Прежде Всего", description: "Каждый проект начинается с понимания ваших целей и аудитории." },
      { icon: Lightbulb, title: "Решение Проблем", description: "Фокус на решении реальных проблем, не только на красоте." },
      { icon: Palette, title: "Визуальное Совершенство", description: "Премиум исполнение от типографики до микро-интеракций." },
      { icon: Code, title: "Качественный Код", description: "Чистая, производительная реализация для лёгкой поддержки." },
    ],
  },
};

export function ApproachSection() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="py-24 lg:py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
              {t.label}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-balance">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.approaches.map((approach, index) => (
              <motion.div
                key={approach.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-surface border border-border/50 hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <approach.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {approach.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {approach.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
