"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How much does a project typically cost?",
    answer: "Pricing depends on scope, complexity, and timeline. Landing pages typically start from $3,000-5,000. Multi-page business websites range from $8,000-20,000+. I provide detailed quotes after understanding your specific requirements during our initial conversation.",
  },
  {
    question: "How long does a project usually take?",
    answer: "Timeline varies by project type. Landing pages: 2-3 weeks. Business websites: 4-8 weeks. Redesigns: 4-6 weeks. These are typical ranges — actual timeline depends on project complexity, feedback cycles, and content readiness.",
  },
  {
    question: "Do I need to have all my content ready before we start?",
    answer: "Having content helps, but it's not required to begin. We can work on structure, wireframes, and visual direction while you prepare content. I can also help with content strategy and structure to guide your writing.",
  },
  {
    question: "What do you need from me to get started?",
    answer: "To provide an accurate quote, I need to understand: your business and goals, target audience, desired pages/features, examples of sites you like, and any brand assets you have. We can discuss all this in our initial call.",
  },
  {
    question: "Can you help with copywriting?",
    answer: "While I don't write full copy, I can help with content structure, messaging hierarchy, and UX writing. For professional copywriting, I can recommend trusted partners who specialize in conversion-focused web content.",
  },
  {
    question: "How many revisions are included?",
    answer: "Each project phase includes 2-3 rounds of revisions. I prefer iterative feedback throughout the process rather than big changes at the end. This approach leads to better results and fewer surprises.",
  },
  {
    question: "Will I be able to edit the content myself after launch?",
    answer: "Yes, for projects where this makes sense, I set up a content management system that allows you to update text, images, and basic content without touching code. I also provide documentation and a quick walkthrough.",
  },
  {
    question: "What happens after launch?",
    answer: "The first 30 days include bug fixes and minor adjustments. For ongoing needs, I offer maintenance packages or can work on an as-needed basis. The codebase is clean and documented for easy future updates.",
  },
];

export function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <SectionHeader
        label="FAQ"
        title="Common questions about working together"
        description="Everything you need to know about the process, pricing, and what to expect."
        align="center"
        className="mb-16"
      />

      <div className="max-w-3xl mx-auto">
        <div className="divide-y divide-border">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-start justify-between gap-4 text-left"
              >
                <span className="text-base font-medium text-foreground pr-4">
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
