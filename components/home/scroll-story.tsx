"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your business, goals, and target audience to define a clear strategic direction.",
    label: "Strategy & Research",
    accent: "from-white/[0.03] to-transparent",
  },
  {
    number: "02",
    title: "Design",
    description: "Crafting premium visual experiences that captivate visitors and communicate your brand story.",
    label: "Visual Direction",
    accent: "from-white/[0.02] to-transparent",
  },
  {
    number: "03",
    title: "Development",
    description: "Building with modern technologies for speed, security, and seamless user experiences.",
    label: "Clean Code",
    accent: "from-white/[0.03] to-transparent",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deploying with care and providing ongoing support to ensure long-term success.",
    label: "Go Live",
    accent: "from-white/[0.02] to-transparent",
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
        {/* Layered atmospheric background */}
        <motion.div style={{ x: bgX }} className="absolute inset-0 w-[150%]">
          <motion.div 
            className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full"
            style={{ 
              background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.06, transparent 60%)",
              filter: "blur(80px)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-[10%] left-[40%] w-[700px] h-[700px] rounded-full"
            style={{ 
              background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.04, transparent 60%)",
              filter: "blur(100px)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, delay: 3 }}
          />
        </motion.div>

        {/* Section header */}
        <div className="absolute top-10 left-6 lg:left-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))]">
              The Process
            </span>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-[rgb(var(--foreground))] tracking-tight">
              From vision to reality
            </h2>
          </motion.div>
        </div>

        {/* Progress indicators */}
        <div className="absolute top-10 right-6 lg:right-16 z-10 flex items-center gap-3">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="relative w-10 h-1 rounded-full bg-[rgb(var(--surface-3))] overflow-hidden"
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

        {/* Horizontal scroll content */}
        <div className="h-full flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-8 lg:gap-12 pl-6 lg:pl-16 pr-[60vw]"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                className="flex-shrink-0 w-[85vw] lg:w-[55vw] xl:w-[48vw] h-[70vh] max-h-[650px] flex items-center"
              >
                <div className="relative w-full h-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-[rgb(var(--border))]/50 bg-[rgb(var(--surface-2))]/80 backdrop-blur-sm group">
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  {/* Large background number */}
                  <div className="absolute -top-10 -right-8 lg:top-0 lg:right-0 font-display text-[12rem] lg:text-[18rem] font-bold text-[rgb(var(--foreground))]/[0.015] leading-none select-none pointer-events-none">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-14">
                    <div>
                      {/* Step number */}
                      <div className="flex items-center justify-between mb-12 lg:mb-16">
                        <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
                          Step {step.number}
                        </span>
                      </div>

                      {/* Title - Large display typography */}
                      <h3 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-[rgb(var(--foreground))] tracking-tight mb-8 lg:mb-10">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg lg:text-xl xl:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-lg font-light">
                        {step.description}
                      </p>
                    </div>

                    {/* Visual label */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 lg:w-20 h-px bg-gradient-to-r from-[rgb(var(--border))] to-transparent" />
                      <span className="text-xs lg:text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
                        {step.label}
                      </span>
                    </div>
                  </div>

                  {/* Corner glow */}
                  <div className="absolute bottom-0 right-0 w-40 h-40 lg:w-56 lg:h-56 bg-gradient-to-tl from-[rgb(var(--glow))]/5 to-transparent pointer-events-none" />
                  
                  {/* Top edge highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient fades */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[rgb(var(--surface-1))] to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[rgb(var(--surface-1))] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
