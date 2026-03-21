"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      ref={ref} 
      className="relative py-40 lg:py-56 overflow-hidden bg-[rgb(var(--foreground))]"
    >
      {/* Layered background effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--background),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--background),0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Breathing glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.15, transparent 60%)",
            y: bgY,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary accent */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.1, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[rgb(var(--background))]/40 text-xs font-semibold tracking-[0.3em] uppercase mb-8"
          >
            Ready to start?
          </motion.p>

          {/* Display headline - Premium typography */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--background))] tracking-tight leading-[0.9]"
          >
            <span className="block">Let's create</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--background))]/60 via-[rgb(var(--glow-intense))] to-[rgb(var(--background))]/60">
              something remarkable
            </span>
          </motion.h2>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 text-[rgb(var(--background))]/50 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light"
          >
            Have a project in mind? Let's discuss how we can bring 
            your vision to life with a website that truly performs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[rgb(var(--background))] text-[rgb(var(--foreground))] font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(var(--background),0.3)]"
            >
              <Mail className="relative z-10 w-5 h-5" />
              <span className="relative z-10">Start a conversation</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(var(--glow-intense))]/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center gap-3 px-8 py-4 text-[rgb(var(--background))]/60 font-medium hover:text-[rgb(var(--background))] transition-colors duration-300"
            >
              <span>View my work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 pt-12 border-t border-[rgb(var(--background))]/10"
          >
            <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16 text-sm text-[rgb(var(--background))]/30">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>Available for projects</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Response within 24h</span>
              </div>
              <div>Free consultation</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-16 left-16 w-24 h-24 border-l border-t border-[rgb(var(--background))]/10 hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-16 right-16 w-24 h-24 border-r border-b border-[rgb(var(--background))]/10 hidden lg:block"
      />

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise opacity-[0.015]" />
    </section>
  );
}
