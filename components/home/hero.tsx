"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ===========================================
// CINEMATIC EDITORIAL STAGE HERO
// Full-screen cover that recedes on scroll
// ===========================================

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale down from 1 to 0.88 as user scrolls
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  // Border radius from 0 to 28px
  const heroBorderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 28]);
  // Slight upward shift
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-3%"]);
  // Content fade for depth
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.6]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050506]"
      style={{ height: "200vh" }}
    >
      {/* Sticky container - holds hero at top while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* The hero frame that scales and gains border radius */}
        <motion.div
          style={{
            scale: heroScale,
            y: heroY,
            borderRadius: heroBorderRadius,
          }}
          className="relative h-full w-full overflow-hidden origin-center"
        >
          {/* ===== FULL-SCREEN VISUAL SURFACE ===== */}
          
          {/* Base dark layer */}
          <div className="absolute inset-0 bg-[#0a0b10]" />

          {/* Atmospheric gradient backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 120% 100% at 50% 0%, rgba(20,25,45,0.5), transparent 60%),
                radial-gradient(ellipse 80% 60% at 80% 80%, rgba(15,20,40,0.4), transparent 50%),
                radial-gradient(ellipse 60% 50% at 10% 60%, rgba(20,15,35,0.3), transparent 50%)
              `,
            }}
          />

          {/* Abstract editorial visual - designed premium backdrop */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary glow mass - top center */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.45, 0.3],
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[30%] w-[60%] h-[80%]"
              style={{
                background: "radial-gradient(ellipse at center, rgba(50,70,130,0.25), transparent 55%)",
                filter: "blur(80px)",
              }}
            />

            {/* Secondary glow - lower right */}
            <motion.div
              animate={{ 
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute bottom-[-10%] right-[10%] w-[50%] h-[60%]"
              style={{
                background: "radial-gradient(ellipse at center, rgba(70,50,120,0.2), transparent 55%)",
                filter: "blur(100px)",
              }}
            />

            {/* Tertiary subtle accent - left */}
            <motion.div
              animate={{ 
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
              className="absolute top-[30%] left-[-10%] w-[40%] h-[50%]"
              style={{
                background: "radial-gradient(ellipse at center, rgba(40,60,100,0.18), transparent 55%)",
                filter: "blur(70px)",
              }}
            />

            {/* Horizontal light streaks - editorial texture */}
            <div className="absolute inset-0 opacity-[0.015]">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 20 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 4,
                  }}
                  className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{
                    top: `${15 + i * 18}%`,
                    width: "100%",
                    opacity: 0.5 - i * 0.08,
                  }}
                />
              ))}
            </div>

            {/* Subtle noise texture */}
            <motion.div
              animate={{ opacity: [0.02, 0.035, 0.02] }}
              transition={{ duration: 0.15, repeat: Infinity }}
              className="absolute inset-0 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Vignette - cinematic framing */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 75% 65% at 50% 50%, transparent 20%, rgba(5,5,6,0.5) 100%)
                `,
              }}
            />

            {/* Top edge gradient fade */}
            <div
              className="absolute top-0 left-0 right-0 h-40"
              style={{
                background: "linear-gradient(to bottom, rgba(5,5,6,0.4), transparent)",
              }}
            />

            {/* Bottom edge gradient fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48"
              style={{
                background: "linear-gradient(to top, rgba(5,5,6,0.6), transparent)",
              }}
            />
          </div>

          {/* ===== TEXT OVERLAY - Embedded in visual ===== */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 flex items-end pb-20 lg:pb-28 xl:pb-32"
          >
            <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
              <div className="max-w-4xl">
                {/* Headline - oversized editorial scale */}
                <div className="overflow-hidden mb-6 lg:mb-8">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(3rem,8vw,7rem)] font-light tracking-tight leading-[0.95] text-white"
                  >
                    We craft digital
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-8 lg:mb-10">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(3rem,8vw,7rem)] font-light tracking-tight leading-[0.95] text-white"
                  >
                    <span className="text-white/40">experiences that</span>{" "}
                    <span className="italic font-normal">perform</span>
                  </motion.h1>
                </div>

                {/* Supporting text */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-lg lg:text-xl text-white/50 max-w-xl mb-10 lg:mb-12 leading-relaxed"
                >
                  Strategic design & development studio creating premium digital products for ambitious brands.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap items-center gap-5"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0b10] rounded-full text-sm font-medium tracking-wide hover:bg-white/90 transition-colors duration-300"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-3 px-8 py-4 text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300"
                  >
                    <span>View Our Work</span>
                  </Link>
                </motion.div>

                {/* Trust/proof row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1.1 }}
                  className="flex items-center gap-8 mt-14 lg:mt-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0a0b10]"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/40 tracking-wide">50+ Clients</span>
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <span className="text-xs text-white/40 tracking-wide">Est. 2019</span>
                  <div className="h-4 w-px bg-white/10" />
                  <span className="text-xs text-white/40 tracking-wide">Based in Ukraine</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ===== SUBTLE FRAME ACCENTS ===== */}
          
          {/* Corner marks - editorial framing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="absolute top-8 left-8 w-16 h-16 pointer-events-none"
          >
            <div className="absolute top-0 left-0 w-8 h-px bg-white/20" />
            <div className="absolute top-0 left-0 w-px h-8 bg-white/20" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.4 }}
            className="absolute top-8 right-8 w-16 h-16 pointer-events-none"
          >
            <div className="absolute top-0 right-0 w-8 h-px bg-white/20" />
            <div className="absolute top-0 right-0 w-px h-8 bg-white/20" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="absolute bottom-8 left-8 w-16 h-16 pointer-events-none"
          >
            <div className="absolute bottom-0 left-0 w-8 h-px bg-white/20" />
            <div className="absolute bottom-0 left-0 w-px h-8 bg-white/20" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.6 }}
            className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none"
          >
            <div className="absolute bottom-0 right-0 w-8 h-px bg-white/20" />
            <div className="absolute bottom-0 right-0 w-px h-8 bg-white/20" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
