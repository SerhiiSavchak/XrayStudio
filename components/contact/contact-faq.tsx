"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";

const faqs = [
  {
    question: "What information should I include in my inquiry?",
    answer:
      "Share your project goals, target audience, desired timeline, and budget range. The more context you provide, the better I can assess fit and prepare for our conversation.",
  },
  {
    question: "Do you work with clients in different time zones?",
    answer:
      "Absolutely. I've successfully collaborated with clients across Europe, North America, and Asia. I'm flexible with scheduling calls and maintain clear async communication.",
  },
  {
    question: "What's your typical response time?",
    answer:
      "I respond to all inquiries within 24 hours on business days. For ongoing projects, clients have direct access via Telegram for quick questions.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, I'm happy to sign NDAs before discussing sensitive project details. Client confidentiality is a priority in all my engagements.",
  },
  {
    question: "Can we have a call before committing?",
    answer:
      "Of course. I offer a complimentary 30-minute discovery call to discuss your project, answer questions, and determine if we're a good fit for each other.",
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className="bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Quick answers to help you get started
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-border rounded-xl overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-muted-foreground">
                      {faq.answer}
                    </div>
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
