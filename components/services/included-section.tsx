"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "Scope",
    title: "What's included & what's not",
    description: "Clear expectations from the start.",
    included: ["Custom design tailored to your brand", "Responsive, mobile-first implementation", "Performance optimization", "Basic SEO setup", "Contact forms and integrations", "CMS for content editing", "Cross-browser testing", "Launch support", "30 days of post-launch fixes"],
    notIncluded: ["Copywriting", "Professional photography", "Stock images", "Ongoing hosting costs", "Domain registration", "Third-party subscriptions"],
    note: "These can be discussed and added to the project scope if needed.",
    includedLabel: "Included",
    notIncludedLabel: "Not Included",
  },
  uk: {
    label: "Обсяг",
    title: "Що включено та що ні",
    description: "Чіткі очікування з самого початку.",
    included: ["Індивідуальний дизайн для вашого бренду", "Адаптивна, mobile-first реалізація", "Оптимізація продуктивності", "Базове SEO налаштування", "Контактні форми та інтеграції", "CMS для редагування контенту", "Крос-браузерне тестування", "Підтримка запуску", "30 днів виправлень після запуску"],
    notIncluded: ["Копірайтинг", "Професійна фотографія", "Стокові зображення", "Витрати на хостинг", "Реєстрація домену", "Сторонні підписки"],
    note: "Це можна обговорити та додати до обсягу проекту за потреби.",
    includedLabel: "Включено",
    notIncludedLabel: "Не включено",
  },
  ru: {
    label: "Объём",
    title: "Что включено и что нет",
    description: "Чёткие ожидания с самого начала.",
    included: ["Индивидуальный дизайн для вашего бренда", "Адаптивная, mobile-first реализация", "Оптимизация производительности", "Базовая SEO настройка", "Контактные формы и интеграции", "CMS для редактирования контента", "Кросс-браузерное тестирование", "Поддержка запуска", "30 дней исправлений после запуска"],
    notIncluded: ["Копирайтинг", "Профессиональная фотография", "Стоковые изображения", "Расходы на хостинг", "Регистрация домена", "Сторонние подписки"],
    note: "Это можно обсудить и добавить в объём проекта при необходимости.",
    includedLabel: "Включено",
    notIncludedLabel: "Не включено",
  },
};

export function IncludedSection() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="py-24 lg:py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">{t.label}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">{t.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-surface border border-border/50"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-500" />
              </div>
              {t.includedLabel}
            </h3>
            <ul className="space-y-4">
              {t.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/80">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-surface border border-border/50"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </div>
              {t.notIncludedLabel}
            </h3>
            <ul className="space-y-4">
              {t.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <X className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground border-t border-border/50 pt-4">{t.note}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
