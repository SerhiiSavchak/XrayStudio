"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layout, Globe, User, RefreshCw, Settings, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const categories = [
  { key: "design" as const, icon: Layout, href: "#design" },
  { key: "development" as const, icon: Globe, href: "#development" },
  { key: "support" as const, icon: Settings, href: "#support" },
];

export function ServiceCategories() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 surface-1" />

      <div className="relative container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
            {t.servicesPage.categoriesLabel}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-[rgb(var(--foreground))]">
            {t.servicesPage.categoriesTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => {
            const Icon = category.icon;
            const categoryData = t.servicesPage.categories[category.key];
            
            return (
              <motion.a
                key={category.key}
                href={category.href}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-8 rounded-3xl surface-2 border border-[rgb(var(--border))] hover:border-[rgb(var(--muted-foreground))]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[rgb(var(--glow))]/5"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[rgb(var(--glow))]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl surface-3 border border-[rgb(var(--border))] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[rgb(var(--muted-foreground))]/30 transition-all duration-500">
                    <Icon className="w-5 h-5 text-[rgb(var(--foreground))]" />
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-[rgb(var(--foreground))] mb-2">
                    {categoryData.title}
                  </h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">
                    {categoryData.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
