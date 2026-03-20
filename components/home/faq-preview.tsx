"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

export function FAQPreview() {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] to-[rgb(var(--background))]" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16 lg:mb-20"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
            {t.faq.title}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--foreground))]">
            {t.faq.subtitle}
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <div className="divide-y divide-[rgb(var(--border))]">
            {t.faq.questions.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                >
                  <span className="text-lg font-medium text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--muted-foreground))] transition-colors">
                    {faq.question}
                  </span>
                  <span className="shrink-0 w-10 h-10 rounded-xl surface-2 border border-[rgb(var(--border))] flex items-center justify-center group-hover:border-[rgb(var(--muted-foreground))]/30 transition-colors">
                    {openIndex === i ? (
                      <Minus className="w-4 h-4 text-[rgb(var(--foreground))]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                    )}
                  </span>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[rgb(var(--muted-foreground))] leading-relaxed pr-16">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
