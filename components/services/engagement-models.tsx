"use client";

import { motion } from "framer-motion";
import { Rocket, Layers, RefreshCw, Wrench } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "Engagement Models",
    title: "Flexible ways to work together",
    description: "Choose the approach that fits your situation.",
    models: [
      { icon: Rocket, title: "Project from Scratch", description: "Full project development from concept to launch.", bestFor: "New websites, major redesigns" },
      { icon: Layers, title: "MVP First", description: "Start with essentials, then expand based on feedback.", bestFor: "New ventures, testing markets" },
      { icon: RefreshCw, title: "Redesign Existing Site", description: "Transform your current website with new design and UX.", bestFor: "Outdated sites, rebranding" },
      { icon: Wrench, title: "Ongoing Support", description: "Continuous improvements, updates, and maintenance.", bestFor: "Active businesses, growing brands" },
    ],
  },
  uk: {
    label: "Моделі Співпраці",
    title: "Гнучкі способи роботи разом",
    description: "Оберіть підхід, що підходить вашій ситуації.",
    models: [
      { icon: Rocket, title: "Проект з Нуля", description: "Повна розробка від концепції до запуску.", bestFor: "Нові сайти, великі редизайни" },
      { icon: Layers, title: "Спочатку MVP", description: "Почніть з необхідного, потім розширюйте.", bestFor: "Нові проекти, тестування ринку" },
      { icon: RefreshCw, title: "Редизайн Існуючого", description: "Трансформуйте поточний сайт з новим дизайном.", bestFor: "Застарілі сайти, ребрендинг" },
      { icon: Wrench, title: "Постійна Підтримка", description: "Безперервні покращення та обслуговування.", bestFor: "Активні бізнеси, зростаючі бренди" },
    ],
  },
  ru: {
    label: "Модели Сотрудничества",
    title: "Гибкие способы работы вместе",
    description: "Выберите подход, подходящий вашей ситуации.",
    models: [
      { icon: Rocket, title: "Проект с Нуля", description: "Полная разработка от концепции до запуска.", bestFor: "Новые сайты, большие редизайны" },
      { icon: Layers, title: "Сначала MVP", description: "Начните с необходимого, затем расширяйте.", bestFor: "Новые проекты, тестирование рынка" },
      { icon: RefreshCw, title: "Редизайн Существующего", description: "Трансформируйте текущий сайт с новым дизайном.", bestFor: "Устаревшие сайты, ребрендинг" },
      { icon: Wrench, title: "Постоянная Поддержка", description: "Непрерывные улучшения и обслуживание.", bestFor: "Активные бизнесы, растущие бренды" },
    ],
  },
};

export function EngagementModels() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="py-24 lg:py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">{t.label}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.models.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-surface border border-border/50 hover:border-accent/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <model.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{model.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{model.description}</p>
              <div className="text-sm">
                <span className="text-muted-foreground">Best for: </span>
                <span className="text-foreground">{model.bestFor}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
