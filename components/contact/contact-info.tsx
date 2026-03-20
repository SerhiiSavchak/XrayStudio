"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    title: "Let's Connect",
    description: "I'm always interested in hearing about new projects. Whether you have a specific project in mind or just want to explore, I'd love to hear from you.",
    methods: [
      { icon: Mail, label: "Email", value: "hello@xraystudio.dev", description: "Best for detailed inquiries" },
      { icon: MessageCircle, label: "Telegram", value: "@xraystudio", description: "Quick questions and updates" },
      { icon: Clock, label: "Response Time", value: "Within 24 hours", description: "Monday to Friday" },
      { icon: MapPin, label: "Location", value: "Remote Worldwide", description: "Available across time zones" },
    ],
    nextTitle: "What Happens Next?",
    steps: [
      "I'll review your inquiry within 24 hours",
      "We'll schedule a discovery call",
      "I'll prepare a tailored proposal",
      "Once approved, we kick off your project",
    ],
  },
  uk: {
    title: "Зв'яжемось",
    description: "Мені завжди цікаво дізнатися про нові проекти. Чи є у вас конкретний проект чи просто хочете обговорити можливості — буду радий почути від вас.",
    methods: [
      { icon: Mail, label: "Email", value: "hello@xraystudio.dev", description: "Для детальних запитів" },
      { icon: MessageCircle, label: "Telegram", value: "@xraystudio", description: "Швидкі питання та оновлення" },
      { icon: Clock, label: "Час відповіді", value: "Протягом 24 годин", description: "Понеділок - П'ятниця" },
      { icon: MapPin, label: "Локація", value: "Віддалено по всьому світу", description: "Доступний в різних часових зонах" },
    ],
    nextTitle: "Що далі?",
    steps: [
      "Розгляну ваш запит протягом 24 годин",
      "Призначимо дзвінок-знайомство",
      "Підготую персоналізовану пропозицію",
      "Після підтвердження, стартуємо ваш проект",
    ],
  },
  ru: {
    title: "Свяжемся",
    description: "Мне всегда интересно узнать о новых проектах. Есть ли у вас конкретный проект или просто хотите обсудить возможности — буду рад услышать от вас.",
    methods: [
      { icon: Mail, label: "Email", value: "hello@xraystudio.dev", description: "Для детальных запросов" },
      { icon: MessageCircle, label: "Telegram", value: "@xraystudio", description: "Быстрые вопросы и обновления" },
      { icon: Clock, label: "Время ответа", value: "В течение 24 часов", description: "Понедельник - Пятница" },
      { icon: MapPin, label: "Локация", value: "Удалённо по всему миру", description: "Доступен в разных часовых зонах" },
    ],
    nextTitle: "Что дальше?",
    steps: [
      "Рассмотрю ваш запрос в течение 24 часов",
      "Назначим звонок-знакомство",
      "Подготовлю персонализированное предложение",
      "После подтверждения, стартуем ваш проект",
    ],
  },
};

export function ContactInfo() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.title}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.description}</p>
      </div>

      <div className="space-y-6">
        {t.methods.map((method, index) => (
          <motion.div
            key={method.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
              <method.icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{method.label}</p>
              <p className="text-foreground font-medium">{method.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-8 border-t border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t.nextTitle}</h3>
        <ol className="space-y-4">
          {t.steps.map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-muted-foreground">{step}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
