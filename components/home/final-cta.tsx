"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-10%" });

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Subtle animated background elements - no images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle moving gradient */}
        <motion.div
          animate={{ 
            background: [
              "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(var(--glow-intense), 0.03), transparent 60%)",
              "radial-gradient(ellipse 80% 60% at 70% 60%, rgba(var(--glow-intense), 0.03), transparent 60%)",
              "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(var(--glow-intense), 0.03), transparent 60%)",
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Soft ambient glow */}
        <motion.div
          animate={{ 
            opacity: [0.02, 0.04, 0.02],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(var(--glow-intense), 1), transparent 60%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Main content */}
      <div 
        ref={contentRef}
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16"
      >
        <div className="max-w-[1600px] mx-auto w-full py-24 lg:py-32">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-16"
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
              Get in touch
            </span>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Large typography CTA */}
            <div>
              {/* Display headline */}
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.95]">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-white"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {"Let's work"}
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-white/40"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    together
                  </motion.span>
                </span>
              </h2>

              {/* Supporting text */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-8 lg:mt-10 text-base lg:text-lg text-white/50 max-w-md leading-relaxed"
              >
                Have a project in mind? I'd love to hear about it. 
                Let's discuss how we can bring your vision to life.
              </motion.p>

              {/* Primary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10 lg:mt-12"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4"
                >
                  <span className="relative px-8 py-4 bg-white text-[rgb(var(--background))] font-semibold text-base rounded-full overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                    Start a conversation
                  </span>
                  <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Right - Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="lg:pt-8"
            >
              <div className="space-y-10">
                {/* Email */}
                <div className="group">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                    Email
                  </span>
                  <a 
                    href="mailto:hello@xray.studio"
                    className="mt-3 flex items-center gap-3 text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-white/70 transition-colors"
                  >
                    hello@xray.studio
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </a>
                </div>

                {/* Telegram */}
                <div className="group">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                    Telegram
                  </span>
                  <a 
                    href="https://t.me/xraystudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-3 text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-white/70 transition-colors"
                  >
                    @xraystudio
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </a>
                </div>

                {/* Availability status */}
                <div className="pt-8 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-sm text-white/60">
                      Available for new projects
                    </span>
                  </div>
                  <p className="text-sm text-white/30">
                    Typical response within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-24 lg:mt-32 pt-8 border-t border-white/[0.06]"
          >
            <div className="flex flex-wrap items-center gap-x-8 lg:gap-x-12 gap-y-3 text-sm text-white/30">
              <span>Next.js & React</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>Tailwind CSS</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>TypeScript</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>Framer Motion</span>
              <span className="w-1 h-1 rounded-full bg-white/15 hidden sm:block" />
              <span className="hidden sm:block">Performance Optimized</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
