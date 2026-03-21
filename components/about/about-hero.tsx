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

export function AboutHero() {
  const { locale } = useLocale();
  const t = content[locale];
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden min-h-[60vh]">
      {/* Cinematic background */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
        
        {/* Atmospheric glows */}
        <motion.div
          className="absolute -top-[25%] left-[10%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.06, transparent 55%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute -bottom-[30%] -right-[20%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.04, transparent 55%)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
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
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.9]"
          >
            <span className="block text-[rgb(var(--foreground))]">{t.title}</span>
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]">
              {t.titleAccent}
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-10 space-y-6 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-3xl font-light"
          >
            {t.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[rgb(var(--background))] to-transparent pointer-events-none" />
    </section>
  );
}
