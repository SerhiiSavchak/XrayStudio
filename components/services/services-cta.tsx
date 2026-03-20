"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    title: "Ready to discuss your project?",
    description: "Let's talk about your goals. No commitment required.",
    cta: "Start a Conversation",
  },
  uk: {
    title: "Готові обговорити ваш проект?",
    description: "Поговоримо про ваші цілі. Без зобов'язань.",
    cta: "Почати розмову",
  },
  ru: {
    title: "Готовы обсудить ваш проект?",
    description: "Поговорим о ваших целях. Без обязательств.",
    cta: "Начать разговор",
  },
};

export function ServicesCTA() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-surface/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/0.05,transparent_60%)]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight"
          >
            {t.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed"
          >
            {t.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 h-14 px-8 text-base font-medium rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300"
            >
              {t.cta}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
