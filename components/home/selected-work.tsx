"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

// ===========================================
// SELECTED WORK - CINEMATIC MEDIA MOSAIC
// Editorial film wall / premium collage - NO horizontal scroll
// ===========================================

const projects = [
  {
    id: "meridian-consulting",
    title: "Meridian",
    subtitle: "Strategic consulting redefined",
    category: "Consulting",
    services: ["Design", "Development"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=90",
    size: "large", // Spans 2 columns, 2 rows
  },
  {
    id: "sarah-mitchell",
    title: "Sarah Mitchell",
    subtitle: "Personal brand that connects",
    category: "Personal Brand",
    services: ["Branding", "Web"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=90",
    size: "medium", // Standard size
  },
  {
    id: "nexus-digital",
    title: "Nexus Digital",
    subtitle: "Agency of the future",
    category: "Agency",
    services: ["Design System", "Dev"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=1000&fit=crop&q=90",
    size: "tall", // Tall vertical
  },
  {
    id: "vertex-finance",
    title: "Vertex Finance",
    subtitle: "Fintech made human",
    category: "SaaS",
    services: ["UX/UI", "Development"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=90",
    size: "medium",
  },
  {
    id: "aurora-wellness",
    title: "Aurora",
    subtitle: "Wellness reimagined",
    category: "Wellness",
    services: ["Branding", "E-commerce"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop&q=90",
    size: "wide", // Wide horizontal
  },
];

// Individual project tile with cinematic reveal
function ProjectTile({
  project,
  index,
  className,
}: {
  project: (typeof projects)[0];
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  // Staggered parallax speeds for depth
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [30 + index * 5, -30 - index * 5]
  );

  return (
    <motion.div
      ref={ref}
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/work/${project.id}`} className="block h-full">
        <motion.div
          style={{ y: parallaxY }}
          className="relative h-full rounded-2xl lg:rounded-3xl overflow-hidden bg-[rgb(var(--surface-1))] border border-white/[0.06]"
        >
          {/* Project image with cinematic treatment */}
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />

            {/* Cinematic overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Hover reveal overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content overlay */}
          <div className="relative h-full flex flex-col justify-between p-5 lg:p-7">
            {/* Top - Category badge */}
            <div className="flex items-start justify-between">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[10px] font-medium text-white/80 uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs text-white/40 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.year}
              </span>
            </div>

            {/* Bottom - Title & details */}
            <div>
              {/* Services - hidden by default, reveal on hover */}
              <div className="flex flex-wrap gap-2 mb-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="text-[10px] text-white/50 font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight">
                {project.title}
              </h3>

              {/* Subtitle - reveal on hover */}
              <p className="mt-1 text-sm text-white/50 max-w-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                {project.subtitle}
              </p>

              {/* View project indicator */}
              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                <span className="text-xs font-medium text-white/60">
                  View project
                </span>
                <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                  <ArrowUpRight className="w-3 h-3 text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Corner accent lines */}
          <div className="absolute top-4 right-4 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-0 right-0 w-full h-px bg-white/30" />
            <div className="absolute top-0 right-0 h-full w-px bg-white/30" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10%" });

  // Background title parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgTextY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-[rgb(var(--background))] overflow-hidden"
    >
      {/* ===== OVERSIZED BACKGROUND TITLE ===== */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute top-1/4 left-0 right-0 pointer-events-none select-none overflow-hidden"
      >
        <span className="block font-display text-[20vw] lg:text-[18vw] font-bold text-white/[0.015] tracking-[-0.04em] whitespace-nowrap">
          SELECTED WORK
        </span>
      </motion.div>

      {/* ===== SECTION HEADER ===== */}
      <div
        ref={headerRef}
        className="relative z-10 px-6 lg:px-16 mb-16 lg:mb-24"
      >
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-white/40 mb-4"
            >
              Selected Work
            </motion.span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.03em]">
              <span className="overflow-hidden block">
                <motion.span
                  className="block text-white"
                  initial={{ y: "100%" }}
                  animate={isHeaderInView ? { y: "0%" } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Recent Projects
                </motion.span>
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base lg:text-lg text-white/40 max-w-md"
            >
              A curated selection of work for clients who value
              premium design and technical excellence.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 text-sm font-medium text-white hover:text-white/70 transition-colors"
            >
              View all work
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ===== MEDIA MOSAIC GRID ===== */}
      <div className="relative z-10 px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          {/* Asymmetric grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Large tile - spans 7 columns, 2 rows */}
            <ProjectTile
              project={projects[0]}
              index={0}
              className="lg:col-span-7 lg:row-span-2 h-[400px] md:h-[500px] lg:h-auto lg:min-h-[700px]"
            />

            {/* Medium tile - right side top */}
            <ProjectTile
              project={projects[1]}
              index={1}
              className="lg:col-span-5 h-[300px] lg:h-[340px]"
            />

            {/* Medium tile - right side bottom */}
            <ProjectTile
              project={projects[3]}
              index={2}
              className="lg:col-span-5 h-[300px] lg:h-[340px]"
            />

            {/* Tall tile - left */}
            <ProjectTile
              project={projects[2]}
              index={3}
              className="lg:col-span-4 h-[400px] lg:h-[500px]"
            />

            {/* Wide tile - spans right */}
            <ProjectTile
              project={projects[4]}
              index={4}
              className="lg:col-span-8 h-[300px] lg:h-[400px]"
            />
          </div>
        </div>
      </div>

      {/* ===== VIEW ALL CTA ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mt-16 lg:mt-24 flex justify-center"
      >
        <Link
          href="/work"
          className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300"
        >
          <span className="font-medium text-white">Explore all projects</span>
          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </motion.div>

      {/* ===== AMBIENT GLOW ===== */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] pointer-events-none">
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(var(--glow-intense), 0.03), transparent 60%)",
            filter: "blur(100px)",
          }}
        />
      </div>
    </section>
  );
}
