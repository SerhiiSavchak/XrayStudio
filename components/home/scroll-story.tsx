"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Zap, Target, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your business, goals, and target audience to define a clear strategic direction.",
    icon: Target,
    visual: "Strategy & Research",
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    number: "02",
    title: "Design",
    description: "Crafting premium visual experiences that captivate visitors and communicate your brand story.",
    icon: Sparkles,
    visual: "Visual Direction",
    accent: "from-violet-500/20 to-purple-500/20",
  },
  {
    number: "03",
    title: "Development",
    description: "Building with modern technologies for speed, security, and seamless user experiences.",
    icon: Zap,
    visual: "Clean Code",
    accent: "from-amber-500/20 to-orange-500/20",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deploying with care and providing ongoing support to ensure long-term success.",
    icon: Rocket,
    visual: "Go Live",
    accent: "from-emerald-500/20 to-teal-500/20",
  },
];

export function ScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[rgb(var(--surface-1))]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layered background */}
        <motion.div style={{ x: bgX }} className="absolute inset-0 w-[130%]">
          {/* Gradient orbs */}
          <motion.div 
            className="absolute top-[15%] left-[8%] w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.08, transparent)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-[15%] left-[35%] w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{ background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.06, transparent)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
          <motion.div 
            className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{ background: "radial-gradient(ellipse at center, rgb(var(--surface-3)), transparent)" }}
          />
        </motion.div>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.012)_1px,transparent_1px)] bg-[size:100px_100px]" />

        {/* Section header - Fixed position */}
        <div className="absolute top-10 left-6 lg:left-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))]">
              The Process
            </span>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-[rgb(var(--foreground))] tracking-tight">
              How we work together
            </h2>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="absolute top-10 right-6 lg:right-16 z-10 flex flex-col items-end gap-4">
          <div className="flex items-center gap-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative w-10 h-1.5 rounded-full bg-[rgb(var(--surface-3))] overflow-hidden"
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[rgb(var(--foreground))]"
                  style={{
                    width: useTransform(
                      scrollYProgress,
                      [i * 0.25, (i + 1) * 0.25],
                      ["0%", "100%"]
                    ),
                  }}
                />
              </motion.div>
            ))}
          </div>
          <span className="text-xs text-[rgb(var(--muted-foreground))]">
            <motion.span className="font-semibold text-[rgb(var(--foreground))]">
              {/* Dynamic step number would go here */}
            </motion.span>
          </span>
        </div>

        {/* Horizontal scroll content */}
        <div className="h-full flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-10 lg:gap-20 pl-6 lg:pl-16 pr-[60vw]"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="flex-shrink-0 w-[88vw] lg:w-[50vw] xl:w-[45vw] h-[75vh] max-h-[700px] flex items-center"
                >
                  <div className="relative w-full h-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] group">
                    {/* Card inner glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    {/* Card gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--surface-3))]/50 via-transparent to-transparent" />
                    
                    {/* Massive watermark number */}
                    <div className="absolute -top-8 -right-6 lg:top-0 lg:right-0 font-display text-[10rem] lg:text-[16rem] font-bold text-[rgb(var(--foreground))]/[0.02] leading-none select-none pointer-events-none">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-14">
                      <div>
                        {/* Icon + step indicator */}
                        <div className="flex items-start justify-between mb-10 lg:mb-14">
                          <motion.div 
                            className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl bg-[rgb(var(--surface-3))] border border-[rgb(var(--border))] flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Icon className="w-7 h-7 lg:w-9 lg:h-9 text-[rgb(var(--foreground))]" />
                          </motion.div>
                          <div className="text-right">
                            <span className="text-xs font-medium uppercase tracking-wider text-[rgb(var(--muted-foreground))]">Step</span>
                            <span className="block text-2xl lg:text-3xl font-display font-bold text-[rgb(var(--foreground))]">{step.number}</span>
                          </div>
                        </div>

                        {/* Title - Premium display typography */}
                        <h3 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-[rgb(var(--foreground))] tracking-tight mb-8">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-lg lg:text-xl xl:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-lg font-light">
                          {step.description}
                        </p>
                      </div>

                      {/* Visual label with line */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 lg:w-24 h-px bg-gradient-to-r from-[rgb(var(--border))] to-transparent" />
                        <span className="text-xs lg:text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
                          {step.visual}
                        </span>
                      </div>
                    </div>

                    {/* Corner accent glow */}
                    <div className="absolute bottom-0 right-0 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-tl from-[rgb(var(--glow))]/10 to-transparent pointer-events-none" />
                    
                    {/* Top edge highlight */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[rgb(var(--surface-1))] to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[rgb(var(--surface-1))] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
