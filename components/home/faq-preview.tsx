"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Timeline depends on project scope and complexity. A landing page typically takes 2-3 weeks. A multi-page business website takes 4-8 weeks. I'll provide a detailed timeline after understanding your specific requirements.",
  },
  {
    question: "Do I need to have all content ready before we start?",
    answer: "Not necessarily. We can start with the structure and visual direction while you prepare content. However, having clear messaging about your offer and target audience will help create a more effective site from day one.",
  },
  {
    question: "Can you help with content and copywriting?",
    answer: "I can provide guidance on structure, messaging framework, and content strategy. For professional copywriting, I can recommend trusted partners or work with your existing copywriter to ensure the content works well with the design.",
  },
  {
    question: "What if I need changes after launch?",
    answer: "Minor adjustments within the first month are included. For ongoing support and maintenance, we can discuss a retainer arrangement. The codebase is clean and well-documented, making future updates straightforward.",
  },
  {
    question: "How do we communicate during the project?",
    answer: "I believe in clear, direct communication. We'll have regular check-ins, you'll have access to work-in-progress, and I respond to messages within 24 hours. No middlemen, no communication gaps.",
  },
];

export function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section>
      <SectionHeader
        label="FAQ"
        title="Questions you might have"
        description="Common questions about working together. If you don't find your answer here, feel free to reach out directly."
        align="center"
        className="mb-16 lg:mb-20"
      />

      <div className="max-w-3xl mx-auto">
        <div className="divide-y divide-border">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-start justify-between gap-4 text-left"
              >
                <span className="text-lg font-medium text-foreground pr-4">
                  {faq.question}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-foreground" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted-foreground leading-relaxed pr-12">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
