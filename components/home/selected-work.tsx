"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const projects = [
  {
    id: "meridian-consulting",
    title: "Meridian",
    category: "Consulting",
    year: "2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=1000&fit=crop",
  },
  {
    id: "sarah-mitchell",
    title: "Sarah Mitchell",
    category: "Personal Brand",
    year: "2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop",
  },
  {
    id: "nexus-digital",
    title: "Nexus Digital",
    category: "Agency",
    year: "2023",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop",
  },
  {
    id: "vertex-finance",
    title: "Vertex Finance",
    category: "SaaS",
    year: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
  },
];

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10%" });
  const mosaicRef = useRef<HTMLDivElement>(null);
  const isMosaicInView = useInView(mosaicRef, { once: true, margin: "-5%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 lg:py-48 overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Background atmosphere */}
      <motion.div 
        style={{ y: bgY }} 
        className="absolute inset-0 pointer-events-none"
      >
        <div 
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.04, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div 
          className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.03, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
      </motion.div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Section Header - oversized typography statement */}
        <div ref={headerRef} className="mb-20 lg:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Title */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-block text-xs lg:text-sm font-medium uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))] mb-6"
              >
                Selected Work
              </motion.span>
              
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] font-bold tracking-[-0.03em] leading-[0.85]">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-[rgb(var(--foreground))]"
                    initial={{ y: "100%" }}
                    animate={isHeaderInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Recent
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-[rgb(var(--muted-foreground))]/50"
                    initial={{ y: "100%" }}
                    animate={isHeaderInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Projects
                  </motion.span>
                </span>
              </h2>
            </div>

            {/* View all link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:pb-4"
            >
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 text-base lg:text-lg font-medium text-[rgb(var(--foreground))] hover:text-[rgb(var(--muted-foreground))] transition-colors"
              >
                View all work
                <span className="w-10 h-10 rounded-full border border-[rgb(var(--border))] flex items-center justify-center group-hover:bg-[rgb(var(--foreground))] group-hover:text-[rgb(var(--background))] group-hover:border-transparent transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mosaic / Collage Layout */}
        <div ref={mosaicRef} className="relative">
          {/* Large background typography */}
          <motion.div 
            style={{ y: titleY }}
            className="absolute -top-20 lg:-top-32 left-0 right-0 pointer-events-none select-none overflow-hidden"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isMosaicInView ? { opacity: 0.02 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-[20vw] lg:text-[18vw] font-bold tracking-[-0.04em] text-[rgb(var(--foreground))] whitespace-nowrap"
            >
              WORK
            </motion.span>
          </motion.div>

          {/* Asymmetric grid layout */}
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {/* Large featured item - spans 7 columns */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={isMosaicInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-12 lg:col-span-7 row-span-2"
            >
              <Link href={`/work/${projects[0].id}`} className="group block relative">
                <div className="relative aspect-[4/3] lg:aspect-[16/12] rounded-2xl lg:rounded-3xl overflow-hidden">
                  {/* Image with mask reveal */}
                  <motion.div 
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={isMosaicInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={projects[0].image}
                      alt={projects[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </motion.div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-xs lg:text-sm font-medium text-white/60 tracking-wider uppercase">
                          {projects[0].category} / {projects[0].year}
                        </span>
                        <h3 className="mt-2 font-display text-3xl lg:text-5xl font-bold text-white tracking-tight">
                          {projects[0].title}
                        </h3>
                      </div>
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        animate={isMosaicInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ArrowUpRight className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Top right - smaller item */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isMosaicInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-12 lg:col-span-5"
            >
              <Link href={`/work/${projects[1].id}`} className="group block relative">
                <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden">
                  <motion.div 
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={isMosaicInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
                    transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={projects[1].image}
                      alt={projects[1].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </motion.div>

                  <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-8">
                    <span className="text-xs font-medium text-white/60 tracking-wider uppercase">
                      {projects[1].category}
                    </span>
                    <h3 className="mt-1 font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      {projects[1].title}
                    </h3>
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Bottom right - smaller item */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isMosaicInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-12 lg:col-span-5"
            >
              <Link href={`/work/${projects[2].id}`} className="group block relative">
                <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden">
                  <motion.div 
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={isMosaicInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={projects[2].image}
                      alt={projects[2].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </motion.div>

                  <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-8">
                    <span className="text-xs font-medium text-white/60 tracking-wider uppercase">
                      {projects[2].category}
                    </span>
                    <h3 className="mt-1 font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      {projects[2].title}
                    </h3>
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Full width bottom item */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={isMosaicInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-12"
            >
              <Link href={`/work/${projects[3].id}`} className="group block relative">
                <div className="relative aspect-[21/9] lg:aspect-[3/1] rounded-2xl lg:rounded-3xl overflow-hidden">
                  <motion.div 
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={isMosaicInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
                    transition={{ duration: 1.4, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={projects[3].image}
                      alt={projects[3].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                  </motion.div>

                  <div className="absolute inset-0 flex items-center p-6 lg:p-12">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="text-xs lg:text-sm font-medium text-white/60 tracking-wider uppercase">
                          {projects[3].category} / {projects[3].year}
                        </span>
                        <h3 className="mt-2 font-display text-3xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
                          {projects[3].title}
                        </h3>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ArrowUpRight className="w-7 h-7" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
