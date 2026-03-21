"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    sections: [
      {
        label: "Who I Am",
        title: "Product-minded web developer",
        paragraphs: [
          "I don't position myself as a \"developer who does everything.\" I focus on one thing and do it exceptionally well: creating premium websites that help businesses look better, build trust, and convert visitors into clients.",
          "My approach combines strong visual execution with product thinking. I care not just about how a site looks, but how it's structured, how fast it loads, and whether it achieves its business objectives.",
        ],
      },
      {
        label: "What I Create",
        title: "Premium digital products",
        paragraphs: [
          "Every website I build is treated as a digital product, not just a collection of pages. This means thoughtful structure, intentional design decisions, and implementation that's built to perform and last.",
          "The result is websites that look expensive, feel professional, load quickly, and help you stand out from competitors who settled for generic templates.",
        ],
      },
    ],
  },
  uk: {
    sections: [
      {
        label: "Хто Я",
        title: "Продуктовий веб-розробник",
        paragraphs: [
          "Я не позиціоную себе як \"розробник, який робить все\". Я фокусуюсь на одному і роблю це винятково добре: створюю преміум сайти, що допомагають бізнесам виглядати краще та конвертувати відвідувачів у клієнтів.",
          "Мій підхід поєднує сильне візуальне виконання з продуктовим мисленням. Мені важливо не лише як виглядає сайт, але й як він структурований, як швидко завантажується та чи досягає бізнес-цілей.",
        ],
      },
      {
        label: "Що Я Створюю",
        title: "Преміум цифрові продукти",
        paragraphs: [
          "Кожен сайт який я будую розглядається як цифровий продукт, а не просто набір сторінок. Це означає продуману структуру, цілеспрямовані дизайн-рішення та реалізацію, що працює і живе довго.",
          "Результат — сайти, що виглядають дорого, відчуваються професійно, швидко завантажуються та допомагають виділитися серед конкурентів з шаблонними рішеннями.",
        ],
      },
    ],
  },
  ru: {
    sections: [
      {
        label: "Кто Я",
        title: "Продуктовый веб-разработчик",
        paragraphs: [
          "Я не позиционирую себя как \"разработчик, который делает всё\". Я фокусируюсь на одном и делаю это исключительно хорошо: создаю премиум сайты, помогающие бизнесам выглядеть лучше и конвертировать посетителей в клиентов.",
          "Мой подход сочетает сильное визуальное исполнение с продуктовым мышлением. Мне важно не только как выглядит сайт, но и как он структурирован, как быстро загружается и достигает ли бизнес-целей.",
        ],
      },
      {
        label: "Что Я Создаю",
        title: "Премиум цифровые продукты",
        paragraphs: [
          "Каждый сайт который я создаю рассматривается как цифровой продукт, а не просто набор страниц. Это означает продуманную структуру, целенаправленные дизайн-решения и реализацию, которая работает и живёт долго.",
          "Результат — сайты, выглядящие дорого, ощущающиеся профессионально, быстро загружающиеся и помогающие выделиться среди конкурентов с шаблонными решениями.",
        ],
      },
    ],
  },
};

export function ProfessionalIdentity() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {t.sections.map((section, index) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
                {section.label}
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
                {section.title}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
