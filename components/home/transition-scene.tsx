"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Cpu, Zap } from "lucide-react";

// Floating tech icons
function FloatingIcons() {
  const icons = [
    { Icon: Code2, x: "15%", y: "25%", delay: 0 },
    { Icon: Cpu, x: "80%", y: "30%", delay: 0.3 },
    { Icon: Zap, x: "85%", y: "65%", delay: 0.6 },
  ];

  return (
    <>
      {icons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ 
              duration: 6 + i, 
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="w-14 h-14 rounded-2xl bg-[rgb(var(--surface-2))]/40 border border-[rgb(var(--border))]/30 backdrop-blur-sm flex items-center justify-center"
          >
            <Icon className="w-6 h-6 text-[rgb(var(--muted-foreground))]" />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

// Cinematic code reveal
function CodeReveal() {
  const codeLines = [
    "const transform = async (vision) => {",
    "  const design = await craft(vision);",
    "  const code = implement(design);",
    "  return deploy(code);",
    "};",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="absolute bottom-20 left-8 lg:left-20 hidden lg:block"
    >
      <div className="rounded-xl border border-[rgb(var(--border))]/30 bg-[rgb(var(--surface-2))]/20 backdrop-blur-sm p-4 font-mono text-xs">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
            className="text-[rgb(var(--muted-foreground))]/40"
          >
            {line}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function TransitionScene() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  const line1X = useTransform(scrollYProgress, [0, 1], ["-100%", "10%"]);
  const line2X = useTransform(scrollYProgress, [0, 1], ["100%", "-10%"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], ["80px", "0px", "0px", "-80px"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Cinematic background */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))]/50 via-[rgb(var(--background))] to-[rgb(var(--surface-1))]/50" />
        
        {/* Animated glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.06, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Animated lines with enhanced parallax */}
      <motion.div
        style={{ x: line1X, opacity }}
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--glow-intense))]/30 to-transparent"
      />
      <motion.div
        style={{ x: line2X, opacity }}
        className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--glow))]/20 to-transparent"
      />
      
      {/* Vertical accent lines */}
      <motion.div
        style={{ opacity }}
        className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgb(var(--border))]/20 to-transparent"
      />
      <motion.div
        style={{ opacity }}
        className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgb(var(--border))]/20 to-transparent"
      />

      {/* Floating icons */}
      <FloatingIcons />
      
      {/* Code reveal */}
      <CodeReveal />

      {/* Centered reveal text */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6"
      >
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <p className="text-xs uppercase tracking-[0.35em] text-[rgb(var(--muted-foreground))] mb-8 font-medium">
            The Process
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--foreground))] tracking-[-0.03em] leading-[0.85]">
            From vision
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))]/50 via-[rgb(var(--glow-intense))] to-[rgb(var(--foreground))]/50">
              to reality
            </span>
          </h2>
        </motion.div>
      </motion.div>

      {/* Enhanced corner accents */}
      <motion.div
        style={{ opacity }}
        className="absolute top-12 left-12 w-24 h-24 hidden lg:block"
      >
        <div className="w-full h-px bg-gradient-to-r from-[rgb(var(--glow-intense))]/50 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-[rgb(var(--glow-intense))]/50 to-transparent" />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 right-12 w-24 h-24 hidden lg:block"
      >
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-l from-[rgb(var(--glow-intense))]/50 to-transparent" />
        <div className="absolute right-0 w-px h-full bg-gradient-to-t from-[rgb(var(--glow-intense))]/50 to-transparent" />
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise opacity-[0.015]" />
    </section>
  );
}
