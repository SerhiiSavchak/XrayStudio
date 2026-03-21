"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "FAQ",
    title: "Common questions",
    description: "Everything you need to know about working together.",
    faqs: [
      { question: "How much does a project typically cost?", answer: "Landing pages start from $3,000-5,000. Multi-page business websites range from $8,000-20,000+. I provide detailed quotes after understanding your specific requirements." },
      { question: "How long does a project usually take?", answer: "Landing pages: 2-3 weeks. Business websites: 4-8 weeks. Redesigns: 4-6 weeks. Actual timeline depends on project complexity and content readiness." },
      { question: "Do I need all content ready before starting?", answer: "Having content helps, but it's not required to begin. We can work on structure and design while you prepare content." },
      { question: "Can you help with copywriting?", answer: "I can help with content structure and UX writing. For professional copywriting, I can recommend trusted partners." },
      { question: "How many revisions are included?", answer: "Each project phase includes 2-3 rounds of revisions. I prefer iterative feedback throughout the process." },
      { question: "Will I be able to edit content myself?", answer: "Yes, I set up a CMS that allows you to update text, images, and basic content without touching code." },
    ],
  },
  uk: {
    label: "FAQ",
    title: "Поширені запитання",
    description: "Все що потрібно знати про співпрацю.",
    faqs: [
      { question: "Скільки зазвичай коштує проект?", answer: "Лендінги від $3,000-5,000. Багатосторінкові сайти від $8,000-20,000+. Детальні кошториси після розуміння ваших вимог." },
      { question: "Скільки часу займає проект?", answer: "Лендінги: 2-3 тижні. Бізнес-сайти: 4-8 тижнів. Редизайн: 4-6 тижнів. Залежить від складності та готовності контенту." },
      { question: "Чи потрібен готовий контент для старту?", answer: "Контент допомагає, але не обов'язковий для початку. Можемо працювати над структурою поки ви готуєте контент." },
      { question: "Чи допомагаєте з копірайтингом?", answer: "Можу допомогти зі структурою контенту та UX-текстами. Для професійного копірайтингу рекомендую партнерів." },
      { question: "Скільки ревізій включено?", answer: "Кожна фаза проекту включає 2-3 раунди ревізій. Надаю перевагу ітеративному зворотному зв'язку." },
      { question: "Чи зможу я редагувати контент самостійно?", answer: "Так, налаштовую CMS для оновлення текстів та зображень без роботи з кодом." },
    ],
  },
  ru: {
    label: "FAQ",
    title: "Частые вопросы",
    description: "Всё что нужно знать о сотрудничестве.",
    faqs: [
      { question: "Сколько обычно стоит проект?", answer: "Лендинги от $3,000-5,000. Многостраничные сайты от $8,000-20,000+. Детальные сметы после понимания ваших требований." },
      { question: "Сколько времени занимает проект?", answer: "Лендинги: 2-3 недели. Бизнес-сайты: 4-8 недель. Редизайн: 4-6 недель. Зависит от сложности и готовности контента." },
      { question: "Нужен ли готовый контент для старта?", answer: "Контент помогает, но не обязателен для начала. Можем работать над структурой пока вы готовите контент." },
      { question: "Помогаете ли с копирайтингом?", answer: "Могу помочь со структурой контента и UX-текстами. Для профессионального копирайтинга рекомендую партнёров." },
      { question: "Сколько ревизий включено?", answer: "Каждая фаза проекта включает 2-3 раунда ревизий. Предпочитаю итеративную обратную связь." },
      { question: "Смогу ли я редактировать контент сам?", answer: "Да, настраиваю CMS для обновления текстов и изображений без работы с кодом." },
    ],
  },
};

export function ServicesFAQ() {
  const { locale } = useLocale();
  const t = content[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

        <div className="max-w-3xl mx-auto">
          <div className="divide-y divide-border/50">
            {t.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-6 flex items-start justify-between gap-4 text-left group"
                >
                  <span className="text-base font-medium text-foreground pr-4 group-hover:text-accent transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-surface border border-border/50 flex items-center justify-center group-hover:border-accent/30 transition-colors duration-300">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-accent" />
                    ) : (
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </span>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-muted-foreground leading-relaxed pr-12">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
