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

// Floating project preview fragments
function ProjectFragments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {/* Fragment 1 */}
      <motion.div
        initial={{ opacity: 0, x: 50, rotateY: -15 }}
        animate={{ opacity: 1, x: 0, rotateY: -10 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute top-[20%] right-[8%] w-[280px]"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="rounded-2xl border border-[rgb(var(--border))]/50 bg-[rgb(var(--surface-2))]/40 backdrop-blur-sm overflow-hidden"
        >
          <div className="aspect-[16/10] bg-gradient-to-br from-[rgb(var(--surface-3))] to-[rgb(var(--surface-2))]">
            <div className="p-4 space-y-2">
              <div className="h-2 w-3/4 rounded bg-[rgb(var(--foreground))]/[0.08]" />
              <div className="h-2 w-1/2 rounded bg-[rgb(var(--foreground))]/[0.05]" />
              <div className="h-12 w-full rounded-lg bg-[rgb(var(--foreground))]/[0.03] mt-4" />
              <div className="flex gap-2 mt-2">
                <div className="h-6 w-16 rounded bg-[rgb(var(--glow-intense))]/10" />
                <div className="h-6 w-20 rounded bg-[rgb(var(--glow))]/10" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Fragment 2 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-[15%] left-[3%] w-[200px]"
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 9, repeat: Infinity, delay: 1 }}
          className="rounded-xl border border-[rgb(var(--border))]/40 bg-[rgb(var(--surface-2))]/30 backdrop-blur-sm p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400/30 to-violet-500/30" />
            <div className="flex-1">
              <div className="h-2 w-full rounded bg-[rgb(var(--foreground))]/[0.08]" />
              <div className="h-1.5 w-2/3 rounded bg-[rgb(var(--foreground))]/[0.04] mt-1" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded bg-[rgb(var(--foreground))]/[0.05]" />
            <div className="h-1.5 w-4/5 rounded bg-[rgb(var(--foreground))]/[0.04]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Fragment 3 - smaller accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute top-[55%] right-[20%]"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgb(var(--glow))]/20 to-[rgb(var(--glow-intense))]/20 border border-[rgb(var(--border))]/30 backdrop-blur-sm"
        />
      </motion.div>
    </div>
  );
}

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

  return (
    <section ref={ref} className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden min-h-[60vh] flex items-center">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
        
        {/* Glow orbs */}
        <motion.div
          className="absolute -top-[20%] -right-[15%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.08, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>
      
      {/* Floating fragments */}
      <motion.div style={{ y }}>
        <ProjectFragments />
      </motion.div>
      
      <motion.div style={{ opacity }} className="relative z-10 container-wide">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))] mb-8"
          >
            {t.label}
          </motion.p>
          
          {/* Display headline - Premium typography */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9]"
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
            className="mt-10 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl font-light"
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
