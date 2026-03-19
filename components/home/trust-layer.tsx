"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Check } from "lucide-react";

const trustPoints = [
  "Product-minded approach, not just code execution",
  "Focus on business goals, not just aesthetics",
  "Modern tech stack with performance-first thinking",
  "Direct communication, no middle layers",
  "Attention to detail at every level",
  "Production-ready, scalable implementation",
];

export function TrustLayer() {
  return (
    <Section className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-1/30 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-highlight/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4"
            >
              Why Work With Me
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance"
            >
              More than just a developer
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              I bring a product mindset to every project. Your website isn&apos;t just 
              code and pixels — it&apos;s a business tool that needs to perform, convert, 
              and represent your brand at the highest level.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 space-y-4"
            >
              {trustPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-surface-3 border border-border flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-foreground" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Layered cards creating depth */}
              <div className="absolute inset-0 rounded-3xl bg-surface-3 border border-border transform rotate-6 translate-x-4 translate-y-4" />
              <div className="absolute inset-0 rounded-3xl bg-surface-2 border border-border transform rotate-3 translate-x-2 translate-y-2" />
              <div className="relative h-full rounded-3xl bg-surface-1 border border-border p-8 lg:p-10 overflow-hidden">
                {/* Content mockup */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-surface-3 border border-border" />
                    <div className="space-y-2">
                      <div className="w-32 h-4 rounded bg-surface-3" />
                      <div className="w-24 h-3 rounded bg-surface-3/60" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-full h-3 rounded bg-surface-3" />
                    <div className="w-5/6 h-3 rounded bg-surface-3/80" />
                    <div className="w-4/6 h-3 rounded bg-surface-3/60" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="aspect-video rounded-xl bg-surface-3 border border-border" />
                    <div className="aspect-video rounded-xl bg-surface-3 border border-border" />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <div className="flex-1 h-12 rounded-xl bg-foreground/10" />
                    <div className="w-12 h-12 rounded-xl bg-surface-3 border border-border" />
                  </div>
                </div>
                
                {/* Decorative gradient */}
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-highlight/10 rounded-full blur-3xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
