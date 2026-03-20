"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    title: "Common Questions",
    description: "Quick answers to help you get started",
    faqs: [
      { question: "What information should I include?", answer: "Share your project goals, target audience, desired timeline, and budget range. The more context, the better I can prepare." },
      { question: "Do you work with different time zones?", answer: "Absolutely. I've collaborated with clients across Europe, North America, and Asia. I'm flexible with scheduling and async communication." },
      { question: "What's your typical response time?", answer: "I respond within 24 hours on business days. For ongoing projects, clients have direct access via Telegram." },
      { question: "Do you sign NDAs?", answer: "Yes, I'm happy to sign NDAs before discussing sensitive project details. Confidentiality is a priority." },
      { question: "Can we have a call before committing?", answer: "Of course. I offer a complimentary discovery call to discuss your project and determine if we're a good fit." },
    ],
  },
  uk: {
    title: "Часті Питання",
    description: "Швидкі відповіді для початку",
    faqs: [
      { question: "Яку інформацію надати?", answer: "Поділіться цілями проекту, цільовою аудиторією, термінами та бюджетом. Чим більше контексту, тим краще я зможу підготуватися." },
      { question: "Чи працюєте з різними часовими зонами?", answer: "Звичайно. Я співпрацював з клієнтами з Європи, Північної Америки та Азії. Гнучкий з плануванням та асинхронною комунікацією." },
      { question: "Який час відповіді?", answer: "Відповідаю протягом 24 годин у робочі дні. Для поточних проектів клієнти мають прямий доступ через Telegram." },
      { question: "Чи підписуєте NDA?", answer: "Так, я готовий підписати NDA перед обговоренням конфіденційних деталей проекту. Конфіденційність — пріоритет." },
      { question: "Чи можемо поговорити до підтвердження?", answer: "Звичайно. Я пропоную безкоштовний дзвінок-знайомство для обговорення проекту та визначення чи ми підходимо один одному." },
    ],
  },
  ru: {
    title: "Частые Вопросы",
    description: "Быстрые ответы для начала",
    faqs: [
      { question: "Какую информацию предоставить?", answer: "Поделитесь целями проекта, целевой аудиторией, сроками и бюджетом. Чем больше контекста, тем лучше я смогу подготовиться." },
      { question: "Работаете с разными часовыми зонами?", answer: "Конечно. Я сотрудничал с клиентами из Европы, Северной Америки и Азии. Гибок с планированием и асинхронной коммуникацией." },
      { question: "Какое время ответа?", answer: "Отвечаю в течение 24 часов в рабочие дни. Для текущих проектов клиенты имеют прямой доступ через Telegram." },
      { question: "Подписываете NDA?", answer: "Да, я готов подписать NDA перед обсуждением конфиденциальных деталей проекта. Конфиденциальность — приоритет." },
      { question: "Можем поговорить до подтверждения?", answer: "Конечно. Я предлагаю бесплатный звонок-знакомство для обсуждения проекта и определения подходим ли мы друг другу." },
    ],
  },
};

export function ContactFAQ() {
  const { locale } = useLocale();
  const t = content[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-surface/30">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg">{t.description}</p>
        </div>

        <div className="space-y-4">
          {t.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-border/50 rounded-2xl overflow-hidden bg-surface"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-surface/80 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-muted-foreground">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
