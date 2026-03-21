"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// ===========================================
// GET IN TOUCH - CLEAN TYPOGRAPHY-FOCUSED
// No decorative background images, elegant minimal design
// ===========================================

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* ===== SUBTLE AMBIENT BACKGROUND - No images ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle animated gradient */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(var(--glow-intense), 0.025), transparent 50%)",
              "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(var(--glow-intense), 0.025), transparent 50%)",
              "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(var(--glow-intense), 0.025), transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />

        {/* Very subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Soft ambient glow - very subtle */}
        <motion.div
          animate={{
            opacity: [0.015, 0.03, 0.015],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(var(--glow-intense), 1), transparent 50%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
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
            className="mb-16 lg:mb-20"
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
              Get in touch
            </span>
          </motion.div>

          {/* Main content - Two column layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left column - Large display headline */}
            <div>
              <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.9]">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-[clamp(3rem,10vw,7rem)] text-white"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: "0%" } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {"Let's build"}
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-[clamp(3rem,10vw,7rem)] text-white"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: "0%" } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    something
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-[clamp(3rem,10vw,7rem)] text-white/40"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: "0%" } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    great.
                  </motion.span>
                </span>
              </h2>

              {/* Supporting text */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 lg:mt-10 text-base lg:text-lg text-white/45 max-w-md leading-relaxed"
              >
                Have a project in mind? I would love to hear about it. 
                Let us discuss how we can bring your vision to life.
              </motion.p>

              {/* Primary CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 lg:mt-12"
              >
                <Link href="/contact" className="group inline-flex items-center gap-4">
                  <span className="relative px-8 py-4 bg-white text-[rgb(var(--background))] font-semibold text-base rounded-full overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]">
                    Start a conversation
                  </span>
                  <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Right column - Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="lg:pt-12"
            >
              <div className="space-y-12">
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
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-60 transition-opacity" />
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
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-60 transition-opacity" />
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

          {/* Bottom tech stack - subtle footer-like element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-32 lg:mt-40 pt-8 border-t border-white/[0.06]"
          >
            <div className="flex flex-wrap items-center gap-x-8 lg:gap-x-12 gap-y-3 text-sm text-white/25">
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

      {/* ===== DECORATIVE CORNER FRAME ===== */}
      <div className="absolute inset-12 lg:inset-20 pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-0 right-0 w-24 h-24 lg:w-32 lg:h-32"
        >
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-white/15 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-white/15 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
