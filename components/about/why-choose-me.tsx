"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "Why Work With Me",
    title: "What makes the difference",
    description: "There are many developers out there. Here's why clients choose to work with me — and come back.",
    reasons: [
      { title: "Not Just Execution", description: "I bring product thinking to every project, ensuring what we build achieves your goals." },
      { title: "Premium Visual Quality", description: "Your website won't look like a template. It will feel custom, modern, and expensive." },
      { title: "Beauty and Performance", description: "I don't sacrifice speed for aesthetics or vice versa. Both get attention." },
      { title: "Direct Communication", description: "No agency bureaucracy. You work with me directly throughout." },
      { title: "Long-term Thinking", description: "Clean code, scalable architecture, easy maintenance." },
      { title: "Results Focus", description: "A beautiful website that doesn't convert is just expensive decoration." },
    ],
  },
  uk: {
    label: "Чому Працювати Зі Мною",
    title: "Що робить різницю",
    description: "Є багато розробників. Ось чому клієнти обирають працювати зі мною — та повертаються.",
    reasons: [
      { title: "Не Просто Виконання", description: "Я приношу продуктове мислення в кожен проект, забезпечуючи досягнення цілей." },
      { title: "Преміум Візуальна Якість", description: "Ваш сайт не виглядатиме як шаблон. Він відчуватиметься індивідуальним та дорогим." },
      { title: "Краса і Продуктивність", description: "Я не жертвую швидкістю заради естетики чи навпаки. Обидва важливі." },
      { title: "Пряма Комунікація", description: "Без агенційної бюрократії. Ви працюєте напряму зі мною." },
      { title: "Довгострокове Мислення", description: "Чистий код, масштабована архітектура, легке обслуговування." },
      { title: "Фокус на Результатах", description: "Красивий сайт, що не конвертує — це просто дорога декорація." },
    ],
  },
  ru: {
    label: "Почему Работать Со Мной",
    title: "Что делает разницу",
    description: "Есть много разработчиков. Вот почему клиенты выбирают работать со мной — и возвращаются.",
    reasons: [
      { title: "Не Просто Исполнение", description: "Я приношу продуктовое мышление в каждый проект, обеспечивая достижение целей." },
      { title: "Премиум Визуальное Качество", description: "Ваш сайт не будет выглядеть как шаблон. Он будет ощущаться индивидуальным и дорогим." },
      { title: "Красота и Производительность", description: "Я не жертвую скоростью ради эстетики или наоборот. Оба важны." },
      { title: "Прямая Коммуникация", description: "Без агентской бюрократии. Вы работаете напрямую со мной." },
      { title: "Долгосрочное Мышление", description: "Чистый код, масштабируемая архитектура, лёгкое обслуживание." },
      { title: "Фокус на Результатах", description: "Красивый сайт, не конвертирующий — это просто дорогая декорация." },
    ],
  },
};

export function WhyChooseMe() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="py-24 lg:py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">{t.label}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">{t.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
          </motion.div>

          <div className="space-y-4">
            {t.reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 p-4 rounded-xl hover:bg-surface transition-colors duration-300"
              >
                <div className="shrink-0 w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
