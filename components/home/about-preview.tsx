"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const skills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"];

export function AboutPreview() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 surface-1" />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Profile visual */}
              <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-[rgb(var(--surface-2))] to-[rgb(var(--surface-3))] border border-[rgb(var(--border))] overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-gradient-radial from-[rgb(var(--glow))]/20 via-transparent to-transparent opacity-50" />
                
                {/* Abstract elements */}
                <div className="absolute top-8 right-8 w-24 h-24 rounded-full border border-[rgb(var(--border-subtle))]" />
                <div className="absolute top-16 right-16 w-14 h-14 rounded-full surface-3 opacity-50" />
                
                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[rgb(var(--surface-2))] to-transparent">
                  <div className="space-y-3">
                    <div className="w-24 h-3 rounded bg-[rgb(var(--foreground))]/20" />
                    <div className="w-40 h-5 rounded bg-[rgb(var(--foreground))]/30" />
                    <div className="w-32 h-3 rounded bg-[rgb(var(--foreground))]/10" />
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 p-5 rounded-2xl surface-2 border border-[rgb(var(--border))] shadow-2xl shadow-[rgb(var(--glow))]/10"
              >
                <div className="font-display text-3xl font-bold text-[rgb(var(--foreground))]">5+</div>
                <div className="text-sm text-[rgb(var(--muted-foreground))]">{t.credibility.experience}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
              {t.about.title}
            </span>
            
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--foreground))]">
              {t.about.greeting}
            </h2>
            
            <div className="mt-8 space-y-5 text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
            </div>
            
            {/* Skills */}
            <div className="mt-10 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm font-medium rounded-full surface-2 border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 mt-10 text-[rgb(var(--foreground))] font-medium hover:text-[rgb(var(--muted-foreground))] transition-colors"
            >
              {t.about.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
