"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-1 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(39,39,42,0.3),transparent_60%)]" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4"
            >
              About
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
            >
              <span className="block">Building premium</span>
              <span className="block text-muted-foreground">digital experiences</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              <p>
                Hi, I&apos;m Serhii Savchak — a product-minded web developer who believes 
                that exceptional websites are built at the intersection of design, 
                user experience, and engineering.
              </p>
              <p>
                I create premium websites for experts, personal brands, and service 
                businesses who understand that their digital presence is a key part 
                of how they&apos;re perceived and how they attract opportunities.
              </p>
            </motion.div>
          </div>

          {/* Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-surface-2 to-surface-3 border border-border overflow-hidden">
              {/* Abstract visual representation */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(63,63,70,0.4),transparent_70%)]" />
              
              {/* Decorative elements */}
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full border border-border/50 opacity-50" />
              <div className="absolute top-16 right-16 w-16 h-16 rounded-full bg-surface-3/50" />
              <div className="absolute bottom-16 left-8 w-32 h-2 rounded-full bg-highlight/20" />
              <div className="absolute bottom-12 left-8 w-20 h-2 rounded-full bg-highlight/10" />
              
              {/* Content representation at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="space-y-2">
                  <div className="w-20 h-2 rounded bg-foreground/20" />
                  <div className="w-32 h-4 rounded bg-foreground/30" />
                  <div className="w-28 h-2 rounded bg-foreground/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
