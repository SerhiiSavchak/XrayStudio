"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your business, goals, and target audience to define a clear strategic direction.",
    label: "Strategy & Research",
    // Colorful accent for hover state
    accentColor: "from-blue-500/20 via-cyan-500/15 to-blue-500/5",
    glowColor: "rgb(59, 130, 246)",
  },
  {
    number: "02",
    title: "Design",
    description: "Crafting premium visual experiences that captivate visitors and communicate your brand story.",
    label: "Visual Direction",
    accentColor: "from-violet-500/20 via-purple-500/15 to-violet-500/5",
    glowColor: "rgb(139, 92, 246)",
  },
  {
    number: "03",
    title: "Development",
    description: "Building with modern technologies for speed, security, and seamless user experiences.",
    label: "Clean Code",
    accentColor: "from-emerald-500/20 via-teal-500/15 to-emerald-500/5",
    glowColor: "rgb(16, 185, 129)",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deploying with care and providing ongoing support to ensure long-term success.",
    label: "Go Live",
    accentColor: "from-amber-500/20 via-orange-500/15 to-amber-500/5",
    glowColor: "rgb(245, 158, 11)",
  },
];

function ProcessCard({ 
  step, 
  index, 
  scrollProgress 
}: { 
  step: typeof steps[0]; 
  index: number;
  scrollProgress: any;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });

  // Staggered card reveals
  const cardStart = index * 0.15;
  const cardY = useTransform(scrollProgress, [cardStart, cardStart + 0.2], [100, 0]);
  const cardOpacity = useTransform(scrollProgress, [cardStart, cardStart + 0.15], [0, 1]);
  const cardRotate = useTransform(scrollProgress, [cardStart, cardStart + 0.25], [5, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y: cardY, opacity: cardOpacity, rotateX: cardRotate }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-[85vw] lg:w-[55vw] xl:w-[48vw] h-[70vh] max-h-[650px] flex items-center perspective-1000"
    >
      <div 
        className="relative w-full h-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border transition-all duration-700"
        style={{
          borderColor: isHovered 
            ? `${step.glowColor}40`
            : "rgb(var(--border) / 0.5)",
          boxShadow: isHovered 
            ? `0 0 60px ${step.glowColor}20, 0 0 100px ${step.glowColor}10`
            : "none",
        }}
      >
        {/* Background with colorful gradient on hover */}
        <div className="absolute inset-0 bg-[rgb(var(--surface-2))]/80 backdrop-blur-sm" />
        
        {/* Colorful gradient overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${step.accentColor}`}
        />

        {/* Animated glow orb on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.5,
            x: isHovered ? [0, 20, -10, 0] : 0,
            y: isHovered ? [0, -15, 10, 0] : 0,
          }}
          transition={{ duration: isHovered ? 4 : 0.3, repeat: isHovered ? Infinity : 0 }}
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${step.glowColor}15, transparent 60%)`,
            filter: "blur(40px)",
          }}
        />
        
        {/* Large background number */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
          className="absolute -top-10 -right-8 lg:top-0 lg:right-0 font-display text-[12rem] lg:text-[18rem] font-bold leading-none select-none pointer-events-none transition-colors duration-500"
          style={{ 
            color: isHovered 
              ? `${step.glowColor}15`
              : "rgb(var(--foreground) / 0.015)" 
          }}
        >
          {step.number}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-14">
          <div>
            {/* Step number with accent line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="flex items-center gap-4 mb-12 lg:mb-16"
            >
              <motion.div 
                className="h-px transition-all duration-500"
                style={{
                  width: isHovered ? 48 : 32,
                  backgroundColor: isHovered ? step.glowColor : "rgb(var(--border))",
                }}
              />
              <span 
                className="text-sm font-medium uppercase tracking-[0.2em] transition-colors duration-500"
                style={{ color: isHovered ? step.glowColor : "rgb(var(--muted-foreground))" }}
              >
                Step {step.number}
              </span>
            </motion.div>

            {/* Title - Large display typography */}
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-8 lg:mb-10 transition-colors duration-500"
              style={{ color: isHovered ? step.glowColor : "rgb(var(--foreground))" }}
            >
              {step.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.7 }}
              className="text-lg lg:text-xl xl:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-lg font-light"
            >
              {step.description}
            </motion.p>
          </div>

          {/* Visual label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <motion.div 
              className="h-px transition-all duration-500"
              style={{
                width: isHovered ? 80 : 48,
                background: isHovered 
                  ? `linear-gradient(90deg, ${step.glowColor}, transparent)`
                  : "linear-gradient(90deg, rgb(var(--border)), transparent)",
              }}
            />
            <span className="text-xs lg:text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
              {step.label}
            </span>
          </motion.div>
        </div>

        {/* Top edge highlight */}
        <div 
          className="absolute top-0 inset-x-0 h-px transition-opacity duration-500"
          style={{
            background: isHovered 
              ? `linear-gradient(90deg, transparent, ${step.glowColor}50, transparent)`
              : "linear-gradient(90deg, transparent, rgb(var(--foreground) / 0.06), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function ScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-75%"]);
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
              background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.05, transparent 60%)",
              filter: "blur(80px)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-[10%] left-[40%] w-[700px] h-[700px] rounded-full"
            style={{ 
              background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.04, transparent 60%)",
              filter: "blur(100px)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 15, repeat: Infinity, delay: 3 }}
          />
        </motion.div>

        {/* Section header */}
        <div ref={headerRef} className="absolute top-10 left-6 lg:left-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))]">
              The Process
            </span>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-[rgb(var(--foreground))] tracking-tight">
              How I work
            </h2>
          </motion.div>
        </div>

        {/* Progress indicators */}
        <div className="absolute top-10 right-6 lg:right-16 z-10 flex items-center gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative w-10 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: `${step.glowColor}20` }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  backgroundColor: step.glowColor,
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
            {steps.map((step, index) => (
              <ProcessCard
                key={step.number}
                step={step}
                index={index}
                scrollProgress={scrollYProgress}
              />
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
