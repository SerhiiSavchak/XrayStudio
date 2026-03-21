"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Play, Code2, Layers, Sparkles } from "lucide-react";

// Matrix-style falling code streams
function MatrixRain() {
  const columns = 15;
  const codeChars = "01</>{}[]();:=+-*&|~^const function return await async import export";
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      {[...Array(columns)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-[10px] text-[rgb(var(--glow-intense))] whitespace-nowrap leading-tight"
          style={{ left: `${5 + (i / columns) * 90}%` }}
          initial={{ y: "-100%" }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          {[...Array(40)].map((_, j) => (
            <motion.div 
              key={j} 
              className="my-0.5"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: j * 0.1 }}
            >
              {codeChars[Math.floor(Math.random() * codeChars.length)]}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// 3D Floating Code Block with perspective
function FloatingCodeBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -30, x: 100 }}
      animate={{ opacity: 1, rotateY: -15, x: 0 }}
      transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-[15%] right-[5%] lg:right-[8%] hidden lg:block perspective-2000"
    >
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotateX: [0, 2, 0],
          rotateY: [-15, -12, -15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[340px] preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Main code editor window */}
        <div className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/30">
          {/* Editor header */}
          <div className="h-10 bg-[rgb(var(--surface-3))]/80 border-b border-[rgb(var(--border-subtle))] flex items-center px-4 gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-4 text-xs font-mono text-[rgb(var(--muted-foreground))]">page.tsx</span>
          </div>
          
          {/* Code content */}
          <div className="p-5 font-mono text-xs leading-relaxed">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, staggerChildren: 0.1 }}
            >
              <div className="text-[rgb(var(--muted-foreground))]/60">{"// Premium web experiences"}</div>
              <div className="mt-2">
                <span className="text-purple-400">const</span>
                <span className="text-[rgb(var(--foreground))]"> website</span>
                <span className="text-[rgb(var(--muted-foreground))]"> = </span>
                <span className="text-yellow-400">{"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-cyan-400">design</span>
                <span className="text-[rgb(var(--muted-foreground))]">: </span>
                <span className="text-emerald-400">{'"premium"'}</span>
                <span className="text-[rgb(var(--muted-foreground))]">,</span>
              </div>
              <div className="pl-4">
                <span className="text-cyan-400">performance</span>
                <span className="text-[rgb(var(--muted-foreground))]">: </span>
                <span className="text-emerald-400">{'"optimized"'}</span>
                <span className="text-[rgb(var(--muted-foreground))]">,</span>
              </div>
              <div className="pl-4">
                <span className="text-cyan-400">conversion</span>
                <span className="text-[rgb(var(--muted-foreground))]">: </span>
                <span className="text-orange-400">true</span>
              </div>
              <div>
                <span className="text-yellow-400">{"}"}</span>
                <span className="text-[rgb(var(--muted-foreground))]">;</span>
              </div>
            </motion.div>
          </div>
          
          {/* Glowing edge */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--glow-intense))]/30 to-transparent" />
        </div>
        
        {/* Floating shadow plane */}
        <div 
          className="absolute -bottom-4 left-4 right-4 h-8 bg-[rgb(var(--glow))]/10 blur-xl rounded-full"
          style={{ transform: "translateZ(-50px)" }}
        />
      </motion.div>
    </motion.div>
  );
}

// 3D Orbiting Data Sphere
function DataSphere() {
  const particles = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      angle: (i / 20) * 360,
      radius: 80 + Math.random() * 40,
      speed: 15 + Math.random() * 10,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    })), []
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-[15%] left-[5%] lg:left-[10%] w-48 h-48 hidden lg:block"
    >
      <div className="relative w-full h-full">
        {/* Central core */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, rgb(var(--glow-intense))/0.3, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Orbit rings */}
        <motion.div
          className="absolute inset-4 rounded-full border border-[rgb(var(--border))]/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-dashed border-[rgb(var(--glow))]/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Orbiting particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            animate={{ rotate: [p.angle, p.angle + 360] }}
            transition={{
              duration: p.speed,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            style={{ transformOrigin: "0 0" }}
          >
            <motion.div
              className="rounded-full bg-[rgb(var(--glow-intense))]"
              style={{
                width: p.size,
                height: p.size,
                transform: `translateX(${p.radius}px) translateY(-50%)`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          </motion.div>
        ))}
        
        {/* Data labels */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="px-2 py-1 rounded-md bg-[rgb(var(--surface-3))]/80 border border-[rgb(var(--border))]/50 backdrop-blur-sm">
            <span className="text-[8px] font-mono text-[rgb(var(--glow-intense))]">SYSTEMS</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Cinematic video-like background layer
function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-[30%] -right-[20%] w-[80vw] h-[80vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.12, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-[40%] -left-[30%] w-[70vw] h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.08, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      {/* Pulsing center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh]"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.05, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Scan lines effect */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgb(var(--foreground)) 2px, rgb(var(--foreground)) 3px)",
        }}
      />
    </div>
  );
}

// Floating UI fragments for depth
function FloatingFragments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {/* Browser window fragment */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 5 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute top-[55%] right-[15%]"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="w-[180px] rounded-xl border border-[rgb(var(--border))]/40 bg-[rgb(var(--surface-2))]/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="h-6 bg-[rgb(var(--surface-3))]/50 flex items-center gap-1 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--foreground))]/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--foreground))]/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--foreground))]/20" />
          </div>
          <div className="p-3 space-y-2">
            <div className="h-1.5 w-3/4 rounded bg-[rgb(var(--foreground))]/[0.06]" />
            <div className="h-1.5 w-1/2 rounded bg-[rgb(var(--foreground))]/[0.04]" />
            <div className="h-6 w-full rounded bg-[rgb(var(--foreground))]/[0.03] mt-2" />
          </div>
        </motion.div>
      </motion.div>

      {/* Analytics card */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-[30%] left-[3%]"
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 1, -2] }}
          transition={{ duration: 9, repeat: Infinity, delay: 1 }}
          className="w-[160px] rounded-xl border border-[rgb(var(--border))]/30 bg-[rgb(var(--surface-2))]/20 backdrop-blur-sm p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400/40 to-teal-500/40 flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-emerald-300" />
            </div>
            <span className="text-[9px] font-medium text-[rgb(var(--muted-foreground))]">Conversions</span>
          </div>
          <div className="flex items-end gap-0.5 h-10">
            {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/30 to-emerald-400/50"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1.8 + i * 0.08, duration: 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Tech stack icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute top-[35%] right-[25%]"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="flex items-center gap-2"
        >
          {[Code2, Layers, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              className="w-10 h-10 rounded-lg bg-[rgb(var(--surface-3))]/30 border border-[rgb(var(--border))]/30 flex items-center justify-center backdrop-blur-sm"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, delay: i * 0.5 }}
            >
              <Icon className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
            </motion.div>
          ))}
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

  // Enhanced parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "15%"]);

  // Mouse parallax for depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth * 30);
      mouseY.set((clientY - innerHeight / 2) / innerHeight * 30);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] lg:min-h-[120vh] overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* LAYER 0 - Cinematic background */}
      <motion.div style={{ scale }}>
        <CinematicBackground />
      </motion.div>

      {/* LAYER 1 - Matrix rain effect */}
      <motion.div style={{ y: y2 }}>
        <MatrixRain />
      </motion.div>

      {/* LAYER 2 - 3D floating elements with mouse parallax */}
      <motion.div style={{ x: smoothMouseX, y: smoothMouseY }}>
        <motion.div style={{ y: y1 }}>
          <FloatingCodeBlock />
        </motion.div>
        <motion.div style={{ y: y3 }}>
          <DataSphere />
        </motion.div>
        <FloatingFragments />
      </motion.div>

      {/* LAYER 3 - Main content foreground */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 min-h-[100svh] flex flex-col justify-center px-6 lg:px-16"
      >
        <div className="max-w-[1400px] mx-auto w-full pt-32 pb-20 lg:pt-44 lg:pb-36">
          <div className="max-w-3xl">
            {/* Status badge with enhanced glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgb(var(--surface-2))]/60 border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--muted-foreground))] backdrop-blur-md shadow-lg shadow-black/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                Available for Q2 2024 projects
              </span>
            </motion.div>

            {/* DISPLAY HEADLINE - Premium cinematic typography */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(3.5rem,12vw,10rem)] font-bold tracking-[-0.04em] leading-[0.85]"
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

            {/* CTAs with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-9 py-4.5 text-base font-semibold bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(var(--foreground),0.3)]"
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

            {/* Credibility stats with enhanced styling */}
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
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(var(--background))/0.4_100%)]" />
    </section>
  );
}
