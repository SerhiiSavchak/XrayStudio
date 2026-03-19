"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface-1" />
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(39,39,42,0.4),transparent_70%)]" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(250,250,250,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(250,250,250,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Subtle glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-highlight/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2 border border-border text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for new projects
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.95] text-balance"
          >
            <span className="block">Premium websites</span>
            <span className="block text-muted-foreground">
              that build trust
            </span>
            <span className="block">and convert</span>
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Product-minded web developer creating exceptional digital experiences 
            for experts, personal brands, and service businesses. Strong visual presentation, 
            thoughtful structure, and production-ready implementation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg border border-border bg-transparent text-foreground hover:bg-accent transition-all duration-300"
            >
              View Selected Work
            </Link>
          </motion.div>
        </div>

        {/* Floating UI preview cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 lg:mt-24 relative"
        >
          <div className="relative aspect-[16/9] max-w-5xl mx-auto">
            {/* Main preview card */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-surface-2 to-surface-3 border border-border overflow-hidden glow">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-surface-1/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-surface-3 text-xs text-muted-foreground">
                    premium-website.com
                  </div>
                </div>
              </div>
              
              {/* Content preview */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Hero section mockup */}
                <div className="space-y-4">
                  <div className="w-24 h-3 rounded bg-highlight/30" />
                  <div className="w-full max-w-lg h-8 rounded bg-foreground/10" />
                  <div className="w-full max-w-md h-8 rounded bg-foreground/5" />
                  <div className="w-64 h-4 rounded bg-highlight/20 mt-6" />
                </div>
                
                {/* Cards mockup */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video rounded-lg bg-surface-3 border border-border/50" />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating accent card - left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden lg:block absolute -left-12 top-1/4 w-48 p-4 rounded-xl bg-surface-2 border border-border glow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-highlight/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Performance</div>
                  <div className="text-xs text-muted-foreground">98/100</div>
                </div>
              </div>
              <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                <div className="h-full w-[98%] rounded-full bg-green-500/60" />
              </div>
            </motion.div>

            {/* Floating accent card - right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="hidden lg:block absolute -right-8 bottom-1/4 w-52 p-4 rounded-xl bg-surface-2 border border-border glow-sm"
            >
              <div className="text-xs text-muted-foreground mb-2">Conversion Rate</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold text-foreground">+47%</span>
                <span className="text-xs text-green-500 mb-1">increase</span>
              </div>
              <div className="flex gap-1 mt-3">
                {[40, 55, 45, 70, 65, 80, 75].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-highlight/30 rounded-sm"
                    style={{ height: `${h}%`, maxHeight: '32px' }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-wide uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-border flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-muted-foreground" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
