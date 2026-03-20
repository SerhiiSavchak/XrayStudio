"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    success: { title: "Message sent successfully", description: "Thank you for reaching out. I typically respond within 24 hours." },
    labels: { name: "Your Name", contact: "Contact (Email or Telegram)", projectType: "Type of Project", message: "Tell me about your project", budget: "Budget Range", budgetOptional: "(optional)" },
    placeholders: { name: "John Smith", contact: "you@example.com", projectType: "Select project type", message: "What are you looking to build? Goals, timeline...", budget: "e.g., $5,000-10,000 or 'flexible'" },
    projectTypes: ["Landing Page", "Business Website", "Portfolio / Personal Brand", "Website Redesign", "Other"],
    submit: "Send Message",
    submitting: "Sending...",
    note: "You can write even without a detailed brief. We'll figure it out together.",
  },
  uk: {
    success: { title: "Повідомлення надіслано", description: "Дякую за звернення. Зазвичай відповідаю протягом 24 годин." },
    labels: { name: "Ваше ім'я", contact: "Контакт (Email або Telegram)", projectType: "Тип проекту", message: "Розкажіть про ваш проект", budget: "Бюджет", budgetOptional: "(необов'язково)" },
    placeholders: { name: "Іван Петренко", contact: "you@example.com", projectType: "Виберіть тип проекту", message: "Що ви хочете створити? Цілі, терміни...", budget: "напр., $5,000-10,000 або 'гнучкий'" },
    projectTypes: ["Лендінг", "Бізнес-сайт", "Портфоліо / Особистий бренд", "Редизайн сайту", "Інше"],
    submit: "Надіслати",
    submitting: "Надсилаю...",
    note: "Можете писати без детального брифу. Розберемося разом.",
  },
  ru: {
    success: { title: "Сообщение отправлено", description: "Спасибо за обращение. Обычно отвечаю в течение 24 часов." },
    labels: { name: "Ваше имя", contact: "Контакт (Email или Telegram)", projectType: "Тип проекта", message: "Расскажите о вашем проекте", budget: "Бюджет", budgetOptional: "(необязательно)" },
    placeholders: { name: "Иван Петров", contact: "you@example.com", projectType: "Выберите тип проекта", message: "Что вы хотите создать? Цели, сроки...", budget: "напр., $5,000-10,000 или 'гибкий'" },
    projectTypes: ["Лендинг", "Бизнес-сайт", "Портфолио / Личный бренд", "Редизайн сайта", "Другое"],
    submit: "Отправить",
    submitting: "Отправляю...",
    note: "Можете писать без детального брифа. Разберёмся вместе.",
  },
};

export function ContactForm() {
  const { locale } = useLocale();
  const t = content[locale];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <Send className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{t.success.title}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.success.description}</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{t.labels.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder={t.placeholders.name}
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">{t.labels.contact}</label>
          <input
            type="text"
            id="contact"
            name="contact"
            required
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder={t.placeholders.contact}
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">{t.labels.projectType}</label>
        <select
          id="projectType"
          name="projectType"
          required
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>{t.placeholders.projectType}</option>
          {t.projectTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">{t.labels.message}</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
          placeholder={t.placeholders.message}
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
          {t.labels.budget} <span className="text-muted-foreground font-normal">{t.labels.budgetOptional}</span>
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder={t.placeholders.budget}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            {t.submit}
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-sm text-muted-foreground text-center">{t.note}</p>
    </motion.form>
  );
}
