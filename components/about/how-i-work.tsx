"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "Collaboration",
    title: "How I work with clients",
    description: "I believe the best results come from partnership. Here's what you can expect — clear communication, structured process, and consistent quality.",
    categories: [
      { title: "Communication", points: ["Regular updates without overwhelming you", "Clear explanations without jargon", "Responsive to questions and feedback", "Honest about timelines and challenges"] },
      { title: "Process", points: ["Structured phases with clear milestones", "Work-in-progress access for transparency", "Iterative feedback loops", "No surprises at the end"] },
      { title: "Quality", points: ["Attention to details at every level", "Cross-browser and device testing", "Performance optimization built in", "Clean, documented code"] },
    ],
  },
  uk: {
    label: "Співпраця",
    title: "Як я працюю з клієнтами",
    description: "Найкращі результати приходять від партнерства. Ось що ви можете очікувати — чітка комунікація, структурований процес та стабільна якість.",
    categories: [
      { title: "Комунікація", points: ["Регулярні оновлення без перевантаження", "Чіткі пояснення без жаргону", "Відповіді на запитання та зворотний зв'язок", "Чесність щодо термінів та викликів"] },
      { title: "Процес", points: ["Структуровані фази з чіткими етапами", "Доступ до роботи для прозорості", "Ітеративні цикли зворотного зв'язку", "Без сюрпризів наприкінці"] },
      { title: "Якість", points: ["Увага до деталей на кожному рівні", "Крос-браузерне та девайс тестування", "Вбудована оптимізація продуктивності", "Чистий, задокументований код"] },
    ],
  },
  ru: {
    label: "Сотрудничество",
    title: "Как я работаю с клиентами",
    description: "Лучшие результаты приходят от партнёрства. Вот что вы можете ожидать — чёткая коммуникация, структурированный процесс и стабильное качество.",
    categories: [
      { title: "Коммуникация", points: ["Регулярные обновления без перегрузки", "Чёткие объяснения без жаргона", "Ответы на вопросы и обратная связь", "Честность о сроках и вызовах"] },
      { title: "Процесс", points: ["Структурированные фазы с чёткими этапами", "Доступ к работе для прозрачности", "Итеративные циклы обратной связи", "Без сюрпризов в конце"] },
      { title: "Качество", points: ["Внимание к деталям на каждом уровне", "Кросс-браузерное и девайс тестирование", "Встроенная оптимизация производительности", "Чистый, задокументированный код"] },
    ],
  },
};

export function HowIWork() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">{t.label}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">{t.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
          </motion.div>

          <div className="space-y-6">
            {t.categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-surface border border-border/50"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
