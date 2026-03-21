"use client";

import { motion } from "framer-motion";
import { FileText, Layers, Eye, Zap, Settings, Users } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const icons = [FileText, Layers, Eye, Zap, Settings, Users];

const content = {
  en: {
    label: "Principles",
    title: "How I approach every project",
    description: "These aren't just values — they're practices I follow on every project.",
    principles: [
      { title: "Documentation-First", description: "Every project starts with clear documentation. Goals and decisions captured before code." },
      { title: "System-First Thinking", description: "I build design systems, not just pages. Scalable architecture for future updates." },
      { title: "UX-Aware Development", description: "Technical decisions made with user experience in mind. Accessible and intuitive." },
      { title: "Performance-First", description: "Speed isn't an afterthought. Every choice considers how it affects load time." },
      { title: "Production-Ready", description: "Everything built is ready for the real world. Proper testing and clean code." },
      { title: "Direct Collaboration", description: "No middle layers. You work directly with me throughout the project." },
    ],
  },
  uk: {
    label: "Принципи",
    title: "Як я підходжу до кожного проекту",
    description: "Це не просто цінності — це практики, яких я дотримуюсь у кожному проекті.",
    principles: [
      { title: "Документація Перш За Все", description: "Кожен проект починається з чіткої документації. Цілі та рішення фіксуються до коду." },
      { title: "Системне Мислення", description: "Я будую дизайн-системи, а не просто сторінки. Масштабована архітектура." },
      { title: "UX-Орієнтована Розробка", description: "Технічні рішення приймаються з урахуванням користувацького досвіду." },
      { title: "Продуктивність Перш За Все", description: "Швидкість не на останньому місці. Кожен вибір враховує час завантаження." },
      { title: "Готовий до Продакшену", description: "Все побудоване готове до реального світу. Належне тестування і чистий код." },
      { title: "Пряма Співпраця", description: "Без посередників. Ви працюєте напряму зі мною протягом усього проекту." },
    ],
  },
  ru: {
    label: "Принципы",
    title: "Как я подхожу к каждому проекту",
    description: "Это не просто ценности — это практики, которых я придерживаюсь в каждом проекте.",
    principles: [
      { title: "Документация Прежде Всего", description: "Каждый проект начинается с чёткой документации. Цели и решения фиксируются до кода." },
      { title: "Системное Мышление", description: "Я строю дизайн-системы, а не просто страницы. Масштабируемая архитектура." },
      { title: "UX-Ориентированная Разработка", description: "Технические решения принимаются с учётом пользовательского опыта." },
      { title: "Производительность Прежде Всего", description: "Скорость не на последнем месте. Каждый выбор учитывает время загрузки." },
      { title: "Готов к Продакшену", description: "Всё построенное готово к реальному миру. Надлежащее тестирование и чистый код." },
      { title: "Прямое Сотрудничество", description: "Без посредников. Вы работаете напрямую со мной на протяжении всего проекта." },
    ],
  },
};

export function PrinciplesSection() {
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.principles.map((principle, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group p-6 rounded-2xl bg-surface border border-border/50 hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
