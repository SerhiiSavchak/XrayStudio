"use client";

import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative pt-32 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-1 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(39,39,42,0.3),transparent_60%)]" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4"
          >
            Contact
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
          >
            Let&apos;s discuss your project
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed"
          >
            Ready to create something exceptional? Tell me about your project 
            and goals. No need for a detailed brief — we&apos;ll figure out the 
            specifics together.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
