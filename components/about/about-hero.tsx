"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    label: "About",
    title: "Building premium",
    titleAccent: "digital experiences",
    description: [
      "Hi, I'm Serhii Savchak — a product-minded web developer who believes that exceptional websites are built at the intersection of design, user experience, and engineering.",
      "I create premium websites for experts, personal brands, and service businesses who understand that their digital presence is a key part of how they're perceived.",
    ],
  },
  uk: {
    label: "Про мене",
    title: "Створюю преміум",
    titleAccent: "цифровий досвід",
    description: [
      "Привіт, я Сергій Савчак — продуктовий веб-розробник, який вірить, що виняткові сайти створюються на перетині дизайну, користувацького досвіду та інженерії.",
      "Я створюю преміум сайти для експертів, особистих брендів та сервісних бізнесів, які розуміють, що їхня цифрова присутність є ключовою частиною сприйняття.",
    ],
  },
  ru: {
    label: "Обо мне",
    title: "Создаю премиум",
    titleAccent: "цифровой опыт",
    description: [
      "Привет, я Сергей Савчак — продуктовый веб-разработчик, который верит, что исключительные сайты создаются на пересечении дизайна, пользовательского опыта и инженерии.",
      "Я создаю премиум сайты для экспертов, личных брендов и сервисных бизнесов, которые понимают, что их цифровое присутствие — ключевая часть восприятия.",
    ],
  },
};

// Abstract geometric identity visual
function IdentityVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="relative aspect-[4/5] w-full"
    >
      {/* Main container */}
      <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[rgb(var(--surface-2))] via-[rgb(var(--surface-1))] to-[rgb(var(--background))] border border-[rgb(var(--border))]/50 overflow-hidden">
        {/* Atmospheric glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at bottom right, rgb(var(--glow-intense))/0.1, transparent 70%)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-8 right-8 w-24 h-24 rounded-full border border-[rgb(var(--glow))]/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute top-16 right-16 w-16 h-16 rounded-full bg-gradient-to-br from-[rgb(var(--glow-intense))]/20 to-transparent"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Code-like lines */}
        <div className="absolute bottom-20 left-8 space-y-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-2 rounded-full bg-[rgb(var(--foreground))]/20"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="h-4 rounded-full bg-[rgb(var(--foreground))]/30"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 112 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="h-2 rounded-full bg-[rgb(var(--foreground))]/10"
          />
        </div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[rgb(var(--glow-intense))]/40"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(var(--background))/0.5_100%)]" />
      </div>
    </motion.div>
  );
}

export function AboutHero() {
  const { locale } = useLocale();
  const t = content[locale];
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
        
        {/* Glow orbs */}
        <motion.div
          className="absolute -top-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.08, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>
      
      <motion.div style={{ opacity }} className="relative z-10 container-wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="lg:col-span-7">
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-10 space-y-5 text-lg lg:text-xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl font-light"
            >
              {t.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <IdentityVisual />
          </div>
        </div>
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise opacity-[0.02]" />
    </section>
  );
}
