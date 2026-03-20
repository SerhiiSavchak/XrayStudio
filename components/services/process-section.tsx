"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "Process",
    title: "How projects unfold",
    description: "A structured approach that ensures clarity, quality, and results.",
    steps: [
      { number: "01", title: "Discovery", description: "Discuss your goals, audience, and define what success looks like." },
      { number: "02", title: "Structure", description: "Define sitemap, page structure, and map out user journeys." },
      { number: "03", title: "Visual Direction", description: "Develop the visual language aligned with your brand." },
      { number: "04", title: "Design & Build", description: "Create detailed designs and implement with clean code." },
      { number: "05", title: "QA & Polish", description: "Thorough testing and performance optimization." },
      { number: "06", title: "Launch", description: "Deploy to production and provide post-launch support." },
    ],
  },
  uk: {
    label: "Процес",
    title: "Як проходять проекти",
    description: "Структурований підхід, що забезпечує ясність, якість та результати.",
    steps: [
      { number: "01", title: "Дослідження", description: "Обговорюємо цілі, аудиторію та визначаємо критерії успіху." },
      { number: "02", title: "Структура", description: "Визначаємо карту сайту та шляхи користувача." },
      { number: "03", title: "Візуальний Напрямок", description: "Розробляємо візуальну мову відповідно до бренду." },
      { number: "04", title: "Дизайн та Розробка", description: "Створюємо детальні дизайни та реалізуємо чистим кодом." },
      { number: "05", title: "QA та Полірування", description: "Ретельне тестування та оптимізація продуктивності." },
      { number: "06", title: "Запуск", description: "Розгортання та підтримка після запуску." },
    ],
  },
  ru: {
    label: "Процесс",
    title: "Как проходят проекты",
    description: "Структурированный подход, обеспечивающий ясность, качество и результаты.",
    steps: [
      { number: "01", title: "Исследование", description: "Обсуждаем цели, аудиторию и определяем критерии успеха." },
      { number: "02", title: "Структура", description: "Определяем карту сайта и пути пользователя." },
      { number: "03", title: "Визуальное Направление", description: "Разрабатываем визуальный язык в соответствии с брендом." },
      { number: "04", title: "Дизайн и Разработка", description: "Создаем детальные дизайны и реализуем чистым кодом." },
      { number: "05", title: "QA и Полировка", description: "Тщательное тестирование и оптимизация производительности." },
      { number: "06", title: "Запуск", description: "Развертывание и поддержка после запуска." },
    ],
  },
};

export function ProcessSection() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="py-24 lg:py-32">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative p-8 rounded-2xl bg-surface border border-border/50 group hover:border-accent/30 transition-all duration-500"
            >
              <span className="absolute top-6 right-6 text-5xl font-bold text-border/50 font-mono group-hover:text-accent/20 transition-colors duration-500">
                {step.number}
              </span>
              <div className="relative">
                <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
