"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "Contact",
    title: "Let's discuss",
    titleAccent: "your project",
    description: "Ready to create something exceptional? Tell me about your project and goals. No need for a detailed brief — we'll figure out the specifics together.",
  },
  uk: {
    label: "Контакт",
    title: "Обговоримо",
    titleAccent: "ваш проект",
    description: "Готові створити щось виняткове? Розкажіть про ваш проект та цілі. Детальний бриф не потрібен — розберемося разом.",
  },
  ru: {
    label: "Контакт",
    title: "Обсудим",
    titleAccent: "ваш проект",
    description: "Готовы создать что-то исключительное? Расскажите о вашем проекте и целях. Детальный бриф не нужен — разберёмся вместе.",
  },
};

export function ContactHero() {
  const { locale } = useLocale();
  const t = content[locale];
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative pt-36 pb-12 lg:pt-48 lg:pb-16 overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
        
        {/* Atmospheric glow */}
        <motion.div
          className="absolute -top-[20%] -right-[15%] w-[55vw] h-[55vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.06, transparent 55%)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-0 -left-[25%] w-[45vw] h-[45vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.04, transparent 55%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>
      
      <motion.div style={{ opacity }} className="relative z-10 container-wide">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))] mb-10"
          >
            {t.label}
          </motion.p>
          
          {/* Display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.9]"
          >
            <span className="block text-[rgb(var(--foreground))]">{t.title}</span>
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]">
              {t.titleAccent}
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-10 text-lg lg:text-xl text-[rgb(var(--muted-foreground))] leading-relaxed font-light"
          >
            {t.description}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
