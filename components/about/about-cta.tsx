"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-surface-1/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(39,39,42,0.3),transparent_60%)]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight"
          >
            Let&apos;s build something great together
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed"
          >
            Ready to create a website that truly represents your business? 
            I&apos;d love to hear about your project and discuss how I can help.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg border border-border bg-transparent text-foreground hover:bg-accent transition-all"
            >
              View My Work
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
