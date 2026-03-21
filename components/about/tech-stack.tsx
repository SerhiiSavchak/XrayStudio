"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const technologies = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Vercel", category: "Hosting" },
  { name: "Figma", category: "Design" },
  { name: "Sanity / Contentful", category: "CMS" },
];

const content = {
  en: {
    label: "Technology",
    title: "Modern stack for modern results",
    description: "I use battle-tested, modern technologies that deliver excellent performance, developer experience, and long-term maintainability.",
  },
  uk: {
    label: "Технології",
    title: "Сучасний стек для сучасних результатів",
    description: "Я використовую перевірені, сучасні технології, що забезпечують відмінну продуктивність, досвід розробника та довгострокову підтримуваність.",
  },
  ru: {
    label: "Технологии",
    title: "Современный стек для современных результатов",
    description: "Я использую проверенные, современные технологии, обеспечивающие отличную производительность, опыт разработчика и долгосрочную поддерживаемость.",
  },
};

export function TechStack() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">{t.label}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">{t.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="group p-4 rounded-xl bg-surface border border-border/50 hover:border-accent/30 transition-all duration-300"
                >
                  <span className="text-xs text-muted-foreground block mb-1">{tech.category}</span>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors duration-300">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
