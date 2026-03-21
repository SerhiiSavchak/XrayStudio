"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "Selected Work",
    title: "Projects that",
    titleAccent: "made an impact",
    description: "A curated selection of recent work. Each project crafted with attention to design, performance, and business objectives.",
  },
  uk: {
    label: "Вибрані Роботи",
    title: "Проекти, що",
    titleAccent: "мали вплив",
    description: "Кураторська добірка останніх робіт. Кожен проект створений з увагою до дизайну, продуктивності та бізнес-цілей.",
  },
  ru: {
    label: "Избранные Работы",
    title: "Проекты, которые",
    titleAccent: "имели влияние",
    description: "Кураторская подборка последних работ. Каждый проект создан с вниманием к дизайну, производительности и бизнес-целям.",
  },
};

export function WorkHero() {
  const { locale } = useLocale();
  const t = content[locale];
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden min-h-[60vh] flex items-center">
      {/* Cinematic background */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
        
        {/* Atmospheric glow */}
        <motion.div
          className="absolute -top-[25%] -right-[20%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.06, transparent 55%)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Floating depth planes */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-[18%] right-[5%] w-[280px] h-[180px] rounded-2xl bg-[rgb(var(--surface-2))]/20 border border-[rgb(var(--border))]/20 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="absolute bottom-[20%] left-[3%] w-[200px] h-[130px] rounded-xl bg-[rgb(var(--surface-3))]/15 border border-[rgb(var(--border))]/15"
        />
      </motion.div>
      
      <motion.div style={{ opacity }} className="relative z-10 container-wide">
        <div className="max-w-4xl">
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
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9]"
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
            className="mt-10 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl font-light"
          >
            {t.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[rgb(var(--background))] to-transparent pointer-events-none" />
    </section>
  );
}
