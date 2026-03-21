"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";
import { Mail, MessageCircle, Send } from "lucide-react";

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

// Floating contact icons
function FloatingIcons() {
  const icons = [
    { Icon: Mail, x: "80%", y: "25%" },
    { Icon: MessageCircle, x: "85%", y: "50%" },
    { Icon: Send, x: "75%", y: "70%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {icons.map(({ Icon, x, y }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
          className="absolute"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            className="w-12 h-12 rounded-xl bg-[rgb(var(--surface-2))]/50 border border-[rgb(var(--border))]/40 backdrop-blur-sm flex items-center justify-center"
          >
            <Icon className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

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
        
        {/* Glow orbs */}
        <motion.div
          className="absolute -top-[15%] -right-[10%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.08, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-0 -left-[20%] w-[40vw] h-[40vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.05, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>
      
      {/* Floating icons */}
      <FloatingIcons />
      
      <motion.div style={{ opacity }} className="relative z-10 container-wide">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))] mb-8"
          >
            {t.label}
          </motion.p>
          
          {/* Display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.9]"
          >
            <span className="block text-[rgb(var(--foreground))]">{t.title}</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--muted-foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--muted-foreground))]">
              {t.titleAccent}
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-10 text-lg lg:text-xl text-[rgb(var(--muted-foreground))] leading-relaxed font-light"
          >
            {t.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise opacity-[0.02]" />
    </section>
  );
}
