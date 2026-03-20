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
  },
  {
    number: "02",
    title: "Design",
    description: "Crafting premium visual experiences that captivate visitors and communicate your brand story.",
    icon: Sparkles,
    visual: "Visual Direction",
  },
  {
    number: "03",
    title: "Development",
    description: "Building with modern technologies for speed, security, and seamless user experiences.",
    icon: Zap,
    visual: "Clean Code",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deploying with care and providing ongoing support to ensure long-term success.",
    icon: Rocket,
    visual: "Go Live",
  },
];

export function ScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[rgb(var(--surface-1))]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background parallax layer */}
        <motion.div 
          style={{ x: bgX }}
          className="absolute inset-0 w-[120%]"
        >
          <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-gradient-radial from-[rgb(var(--glow))]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] left-[40%] w-[500px] h-[500px] bg-gradient-radial from-[rgb(var(--glow-intense))]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-gradient-radial from-[rgb(var(--surface-3))] to-transparent rounded-full blur-2xl" />
        </motion.div>

        {/* Section header - Fixed */}
        <div className="absolute top-12 left-6 lg:left-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
              The Process
            </span>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-bold text-[rgb(var(--foreground))]">
              How we work together
            </h2>
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="absolute top-12 right-6 lg:right-12 z-10">
          <div className="flex items-center gap-3">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-1 rounded-full bg-[rgb(var(--border))] overflow-hidden"
              >
                <motion.div
                  className="h-full bg-[rgb(var(--foreground))]"
                  style={{
                    scaleX: useTransform(
                      scrollYProgress,
                      [i * 0.25, (i + 1) * 0.25],
                      [0, 1]
                    ),
                    transformOrigin: "left",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Horizontal scroll content */}
        <div className="h-full flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-8 lg:gap-16 pl-6 lg:pl-12 pr-[50vw]"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex-shrink-0 w-[85vw] lg:w-[45vw] h-[70vh] flex items-center"
                >
                  <div className="relative w-full h-full max-h-[600px] rounded-3xl overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]">
                    {/* Card gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--surface-3))] via-transparent to-transparent opacity-50" />
                    
                    {/* Large number background */}
                    <div className="absolute top-6 right-6 lg:top-10 lg:right-10 font-display text-[8rem] lg:text-[12rem] font-bold text-[rgb(var(--foreground))]/[0.03] leading-none select-none">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-12">
                      <div>
                        {/* Step indicator */}
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-14 h-14 rounded-2xl bg-[rgb(var(--surface-3))] border border-[rgb(var(--border))] flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[rgb(var(--foreground))]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[rgb(var(--muted-foreground))]">Step</span>
                            <span className="text-sm font-bold text-[rgb(var(--foreground))]">{step.number}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-[rgb(var(--foreground))] mb-6">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-lg lg:text-xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-lg">
                          {step.description}
                        </p>
                      </div>

                      {/* Visual label */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-px bg-[rgb(var(--border))]" />
                        <span className="text-sm font-medium uppercase tracking-wider text-[rgb(var(--muted-foreground))]">
                          {step.visual}
                        </span>
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[rgb(var(--glow))]/20 to-transparent" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[rgb(var(--surface-1))] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
