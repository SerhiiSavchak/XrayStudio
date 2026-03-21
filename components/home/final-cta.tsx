"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, Sparkles } from "lucide-react";

// Animated code particles in background
function CodeParticles() {
  const symbols = ["</>", "{}", "[]", "()", "=>", "&&", "||", "++"];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-sm text-[rgb(var(--glow-intense))]/10"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i * 8) % 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.15, 0.05],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Enhanced parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);

  return (
    <section 
      ref={ref} 
      className="relative py-40 lg:py-56 overflow-hidden bg-[rgb(var(--surface-1))]"
    >
      {/* Dark premium background - maintains dark mode consistency */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--background))] via-[rgb(var(--surface-1))] to-[rgb(var(--surface-2))]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Cinematic glows */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.08, transparent 50%)",
            y: bgY,
            scale: glowScale,
          }}
        />
        
        {/* Secondary accent glow */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.06, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Bottom accent glow */}
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full -translate-x-1/3 translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.05, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Code particles */}
      <CodeParticles />

      <motion.div 
        style={{ y: contentY }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Label with icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[rgb(var(--glow-intense))]" />
            <span className="text-[rgb(var(--muted-foreground))] text-xs font-semibold tracking-[0.3em] uppercase">
              Ready to start?
            </span>
          </motion.div>

          {/* Display headline - Premium dark theme typography */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
          >
            <span className="block text-[rgb(var(--foreground))]">{"Let's create"}</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--glow))] via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]">
              something remarkable
            </span>
          </motion.h2>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 text-[rgb(var(--muted-foreground))] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light"
          >
            Have a project in mind? Let's discuss how we can bring 
            your vision to life with a website that truly performs.
          </motion.p>

          {/* CTAs with premium dark styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(var(--glow-intense),0.3)]"
            >
              <Mail className="relative z-10 w-5 h-5" />
              <span className="relative z-10">Start a conversation</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(var(--glow-intense))]/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>

            <Link
              href="/work"
              className="group inline-flex items-center gap-3 px-8 py-4 text-[rgb(var(--muted-foreground))] font-medium hover:text-[rgb(var(--foreground))] border border-[rgb(var(--border))] rounded-full hover:border-[rgb(var(--glow))]/50 hover:bg-[rgb(var(--surface-2))]/50 backdrop-blur-sm transition-all duration-300"
            >
              <span>View my work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 pt-12 border-t border-[rgb(var(--border))]"
          >
            <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16 text-sm text-[rgb(var(--muted-foreground))]">
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
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Free consultation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-16 left-16 w-24 h-24 border-l border-t border-[rgb(var(--border))]/30 hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-16 right-16 w-24 h-24 border-r border-b border-[rgb(var(--border))]/30 hidden lg:block"
      />

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise opacity-[0.02]" />
    </section>
  );
}
