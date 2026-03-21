"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "-20%"]);

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Dark cinematic background - NO pink/purple */}
      <motion.div 
        style={{ y: bgY }} 
        className="absolute inset-0"
      >
        {/* Dark atmospheric video/image background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2400&h=1600&fit=crop&q=90"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source 
            src="https://cdn.coverr.co/videos/coverr-night-traffic-in-the-city-510/1080p.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Fallback dark image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2400&h=1600&fit=crop&q=90')",
          }}
        />
        
        {/* Heavy dark overlay - maintains dark theme */}
        <div className="absolute inset-0 bg-[rgb(var(--background))]/85" />
        
        {/* Gradient for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, 
                rgba(var(--background), 0.9) 0%, 
                rgba(var(--background), 0.7) 50%,
                rgba(var(--background), 0.95) 100%
              )
            `,
          }}
        />
      </motion.div>

      {/* Large oversized background typography */}
      <motion.div 
        style={{ y: textY }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap"
        >
          <span className="font-display text-[28vw] font-bold tracking-[-0.04em] text-white/[0.025] leading-none">
            {"LET'S TALK"}
          </span>
        </motion.div>
      </motion.div>

      {/* Subtle ambient glow - cool tones only, no pink */}
      <motion.div
        animate={{ 
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(var(--glow-intense), 0.06), transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Main content */}
      <div 
        ref={contentRef}
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16"
      >
        <div className="max-w-[1400px] mx-auto w-full py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Main CTA content */}
            <div>
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8"
              >
                <span className="text-xs lg:text-sm font-medium uppercase tracking-[0.25em] text-white/40">
                  Get in touch
                </span>
              </motion.div>

              {/* Display headline - cinematic staggered reveal */}
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9]">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-white"
                    initial={{ y: "110%" }}
                    animate={isInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {"Let's create"}
                  </motion.span>
                </span>
                <span className="block overflow-hidden mt-1">
                  <motion.span
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]"
                    initial={{ y: "110%" }}
                    animate={isInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    something
                  </motion.span>
                </span>
                <span className="block overflow-hidden mt-1">
                  <motion.span
                    className="block text-white"
                    initial={{ y: "110%" }}
                    animate={isInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    remarkable
                  </motion.span>
                </span>
              </h2>

              {/* Supporting copy */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.45 }}
                className="mt-8 lg:mt-10 text-lg lg:text-xl text-white/50 max-w-lg leading-relaxed font-light"
              >
                Have a project in mind? Let's discuss how we can bring 
                your vision to life with a website that truly performs.
              </motion.p>

              {/* Primary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 lg:mt-12"
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-[rgb(var(--background))] font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(var(--glow-intense),0.2)]"
                >
                  <span className="relative z-10">Start a conversation</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  {/* Hover sweep */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </motion.div>
            </div>

            {/* Right - Contact info card */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative p-8 lg:p-12 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
                {/* Contact details */}
                <div className="space-y-8">
                  {/* Email */}
                  <div>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                      Email
                    </span>
                    <a 
                      href="mailto:hello@xray.studio"
                      className="mt-2 block text-xl lg:text-2xl font-medium text-white hover:text-[rgb(var(--glow-intense))] transition-colors"
                    >
                      hello@xray.studio
                    </a>
                  </div>

                  {/* Telegram */}
                  <div>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                      Telegram
                    </span>
                    <a 
                      href="https://t.me/xraystudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-2 text-xl lg:text-2xl font-medium text-white hover:text-[rgb(var(--glow-intense))] transition-colors group"
                    >
                      @xraystudio
                      <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>

                  {/* Availability */}
                  <div className="pt-6 border-t border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <span className="text-sm text-white/50">
                        Available for new projects
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-white/40">
                      Response within 24 hours
                    </p>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[rgb(var(--glow-intense))]/20 to-transparent" />
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[rgb(var(--glow-intense))]/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[rgb(var(--glow-intense))]/20 to-transparent" />
                  <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-[rgb(var(--glow-intense))]/20 to-transparent" />
                </div>
              </div>

              {/* Subtle glow behind card */}
              <div className="absolute -inset-4 bg-[rgb(var(--glow-intense))]/[0.03] rounded-[2rem] blur-3xl -z-10" />
            </motion.div>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-20 lg:mt-28 pt-10 border-t border-white/[0.06]"
          >
            <div className="flex flex-wrap items-center gap-x-10 lg:gap-x-16 gap-y-4 text-sm text-white/40">
              <span>Modern tech stack</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Performance focused</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Conversion optimized</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Free consultation</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to footer */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[rgb(var(--background))] to-transparent pointer-events-none" />
    </section>
  );
}
