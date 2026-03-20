"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

// Ambient code lines that float in background
function CodeLines() {
  const lines = [
    { text: "const createValue = () => {", x: "15%", y: "20%", delay: 0 },
    { text: "  return impact * quality;", x: "12%", y: "28%", delay: 0.1 },
    { text: "};", x: "15%", y: "36%", delay: 0.2 },
    { text: "<Design premium={true}", x: "75%", y: "25%", delay: 0.3 },
    { text: "  conversion={optimized}", x: "78%", y: "33%", delay: 0.4 },
    { text: "/>", x: "75%", y: "41%", delay: 0.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 + line.delay, duration: 0.8 }}
          className="absolute font-mono text-[10px] text-[rgb(var(--foreground))]/[0.06] whitespace-nowrap"
          style={{ left: line.x, top: line.y }}
        >
          <motion.span
            animate={{ opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
          >
            {line.text}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

// Floating grid energy particles
function GridEnergy() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Energy nodes at intersections */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[rgb(var(--glow-intense))]"
          style={{
            left: `${20 + (i % 3) * 30}%`,
            top: `${25 + Math.floor(i / 3) * 35}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}

// Breathing atmospheric glow
function AtmosphericGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary breathing glow - top right */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow-intense)) 0%, transparent 70%)",
          opacity: 0.08,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary glow - bottom left */}
      <motion.div
        className="absolute -bottom-[30%] -left-[20%] w-[60vw] h-[60vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow)) 0%, transparent 70%)",
          opacity: 0.06,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Accent pulse - center */}
      <motion.div
        className="absolute top-[40%] left-[50%] w-[40vw] h-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow-intense)) 0%, transparent 60%)",
          opacity: 0.03,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

// Floating interface fragments
function InterfaceFragments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {/* Fragment 1 - Browser mockup hint */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[18%] right-[8%] w-[280px]"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-lg border border-[rgb(var(--border))]/50 bg-[rgb(var(--surface-2))]/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="h-6 bg-[rgb(var(--surface-3))]/50 flex items-center gap-1.5 px-3">
            <div className="w-2 h-2 rounded-full bg-[rgb(var(--foreground))]/10" />
            <div className="w-2 h-2 rounded-full bg-[rgb(var(--foreground))]/10" />
            <div className="w-2 h-2 rounded-full bg-[rgb(var(--foreground))]/10" />
          </div>
          <div className="p-4 space-y-2">
            <div className="h-2 w-3/4 rounded bg-[rgb(var(--foreground))]/[0.06]" />
            <div className="h-2 w-1/2 rounded bg-[rgb(var(--foreground))]/[0.04]" />
            <div className="h-8 w-full rounded bg-[rgb(var(--foreground))]/[0.03] mt-3" />
          </div>
        </motion.div>
      </motion.div>

      {/* Fragment 2 - Dashboard widget */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[25%] left-[5%] w-[200px]"
      >
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="rounded-xl border border-[rgb(var(--border))]/40 bg-[rgb(var(--surface-2))]/20 backdrop-blur-sm p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400/40 to-teal-500/40" />
            <div className="h-2 w-16 rounded bg-[rgb(var(--foreground))]/[0.08]" />
          </div>
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 45, 80, 60, 75, 55].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-[rgb(var(--glow-intense))]/20"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 2 + i * 0.1, duration: 0.6 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Fragment 3 - Floating card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute top-[55%] right-[18%] w-[140px]"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="rounded-lg border border-[rgb(var(--border))]/30 bg-[rgb(var(--surface-3))]/20 backdrop-blur-sm p-3"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[rgb(var(--glow))]/20 to-[rgb(var(--glow-intense))]/20 mb-2" />
          <div className="h-1.5 w-full rounded bg-[rgb(var(--foreground))]/[0.06]" />
          <div className="h-1.5 w-2/3 rounded bg-[rgb(var(--foreground))]/[0.04] mt-1" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

  // Mouse parallax for depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth * 20);
      mouseY.set((clientY - innerHeight / 2) / innerHeight * 20);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] lg:min-h-[115vh] overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* LAYER 0 - Deep background gradient */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
      </motion.div>

      {/* LAYER 1 - Atmospheric breathing glows */}
      <AtmosphericGlow />

      {/* LAYER 2 - Grid energy system */}
      <GridEnergy />

      {/* LAYER 3 - Floating code traces */}
      <CodeLines />

      {/* LAYER 4 - Interface fragments with depth */}
      <motion.div style={{ x: smoothMouseX, y: smoothMouseY }}>
        <InterfaceFragments />
      </motion.div>

      {/* LAYER 5 - Main project preview plane */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, x: 120, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: -12 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[12%] right-[-2%] lg:right-[4%] w-[520px] lg:w-[620px] h-[360px] lg:h-[440px] hidden md:block"
          style={{ perspective: "1200px" }}
        >
          <motion.div 
            className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden border border-[rgb(var(--border))] shadow-2xl shadow-black/30"
            style={{ x: smoothMouseX, y: smoothMouseY }}
          >
            {/* Browser chrome */}
            <div className="absolute top-0 inset-x-0 h-11 bg-[rgb(var(--surface-2))] border-b border-[rgb(var(--border-subtle))] flex items-center px-4 gap-2 z-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-4 flex-1 h-6 rounded-md bg-[rgb(var(--surface-3))] max-w-[240px] flex items-center px-3">
                <div className="w-3 h-3 rounded-full bg-[rgb(var(--foreground))]/10 mr-2" />
                <div className="h-2 flex-1 rounded bg-[rgb(var(--foreground))]/[0.06]" />
              </div>
            </div>
            {/* Content */}
            <div className="absolute top-11 inset-x-0 bottom-0 bg-gradient-to-br from-amber-900/20 via-orange-950/30 to-rose-950/20">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop"
                alt="Project preview"
                fill
                className="object-cover opacity-60 mix-blend-luminosity"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--background))] via-transparent to-transparent" />
            </div>
            {/* Reflection line */}
            <div className="absolute top-11 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* LAYER 6 - Main content foreground */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 min-h-[100svh] flex flex-col justify-center px-6 lg:px-16"
      >
        <div className="max-w-[1400px] mx-auto w-full pt-32 pb-20 lg:pt-44 lg:pb-36">
          <div className="max-w-3xl">
            {/* Status badge with glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgb(var(--surface-2))]/60 border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--muted-foreground))] backdrop-blur-md shadow-lg shadow-black/5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                Available for Q2 2024 projects
              </span>
            </motion.div>

            {/* DISPLAY HEADLINE - Premium typography */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(3.2rem,11vw,9rem)] font-bold tracking-[-0.035em] leading-[0.85]"
            >
              <motion.span 
                className="block text-[rgb(var(--foreground))]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Websites that
              </motion.span>
              <motion.span 
                className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
              >
                drive growth
              </motion.span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] max-w-xl leading-[1.6] font-light"
            >
              Premium websites for businesses that want to 
              stand out, convert visitors, and scale with confidence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-9 py-4.5 text-base font-semibold bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(var(--foreground),0.25)]"
              >
                <span className="relative z-10">Start a project</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 px-8 py-4 text-base font-medium text-[rgb(var(--foreground))] rounded-full border border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/40 hover:bg-[rgb(var(--surface-2))]/50 backdrop-blur-sm transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                <span>View my work</span>
              </Link>
            </motion.div>

            {/* Credibility stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-20 pt-10 border-t border-[rgb(var(--border-subtle))]"
            >
              <div className="flex flex-wrap items-center gap-10 lg:gap-16">
                {[
                  { value: "50+", label: "Projects delivered" },
                  { value: "8+", label: "Years experience" },
                  { value: "100%", label: "Client satisfaction" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-3xl lg:text-4xl font-display font-bold text-[rgb(var(--foreground))]">
                      {stat.value}
                    </span>
                    <span className="text-sm text-[rgb(var(--muted-foreground))]">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">Scroll</span>
          <div className="w-5 h-9 rounded-full border-2 border-[rgb(var(--border))] flex justify-center pt-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-[rgb(var(--foreground))]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise opacity-[0.02]" />
    </section>
  );
}
