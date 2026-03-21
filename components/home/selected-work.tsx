"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ===========================================
// SELECTED WORK - CINEMATIC EDITORIAL SHOWCASE
// Art-directed asymmetric composition with overlapping cards
// ===========================================

const projects = [
  {
    id: "meridian-consulting",
    title: "Meridian",
    descriptor: "A strategic consulting firm redefining digital presence",
    services: ["Brand Strategy", "Web Design", "Development"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop&q=90",
  },
  {
    id: "nexus-digital",
    title: "Nexus Digital",
    descriptor: "Full-service agency of the future",
    services: ["Design System", "Development"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1000&h=1400&fit=crop&q=90",
  },
  {
    id: "vertex-finance",
    title: "Vertex",
    descriptor: "Fintech made human",
    services: ["UX/UI", "Web App"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=700&fit=crop&q=90",
  },
  {
    id: "aurora-wellness",
    title: "Aurora",
    descriptor: "Wellness reimagined",
    services: ["Branding", "E-commerce"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&h=700&fit=crop&q=90",
  },
];

// Featured project card - oversized, dominant
function FeaturedProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/work/${project.id}`} className="group block">
        {/* Image container with mask reveal */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl lg:rounded-2xl">
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div style={{ y: imageY, scale: imageScale }} className="w-full h-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
            </motion.div>
            
            {/* Cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Premium vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.4)]" />
          </motion.div>
          
          {/* Corner frame accents on hover */}
          <div className="absolute inset-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-0 w-12 h-px bg-white/40" />
            <div className="absolute top-0 left-0 h-12 w-px bg-white/40" />
            <div className="absolute bottom-0 right-0 w-12 h-px bg-white/40" />
            <div className="absolute bottom-0 right-0 h-12 w-px bg-white/40" />
          </div>
        </div>
        
        {/* Project info - positioned below with strong hierarchy */}
        <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            {/* Services tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-3"
            >
              {project.services.map((service) => (
                <span key={service} className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
                  {service}
                </span>
              ))}
            </motion.div>
            
            {/* Title with mask reveal */}
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em]"
              >
                {project.title}
              </motion.h3>
            </div>
            
            {/* Descriptor */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-2 text-base lg:text-lg text-white/40 max-w-md"
            >
              {project.descriptor}
            </motion.p>
          </div>
          
          {/* View project CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-3 group/cta"
          >
            <span className="text-sm font-medium text-white/50 group-hover/cta:text-white transition-colors">
              View case study
            </span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-transparent transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

// Secondary project card - varied sizes, overlapping composition
function SecondaryProject({ 
  project, 
  index,
  size = "default",
}: { 
  project: typeof projects[0]; 
  index: number;
  size?: "default" | "tall" | "wide";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Varied parallax speeds based on position
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40 + index * 15, -40 - index * 15]);

  const aspectRatio = size === "tall" ? "aspect-[3/4]" : size === "wide" ? "aspect-[16/9]" : "aspect-[4/3]";

  return (
    <motion.div
      ref={ref}
      style={{ y: parallaxY }}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/work/${project.id}`} className="group block">
        {/* Image with mask reveal */}
        <div className={`relative ${aspectRatio} overflow-hidden rounded-lg lg:rounded-xl`}>
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1.2, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
          </motion.div>
          
          {/* Hover reveal content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
            {/* Year badge */}
            <span className="absolute top-4 right-4 text-[10px] font-mono text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.year}
            </span>
            
            {/* Title */}
            <h3 className="font-display text-xl lg:text-2xl xl:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            
            {/* Descriptor - reveal on hover */}
            <p className="mt-1 text-sm text-white/50 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
              {project.descriptor}
            </p>
            
            {/* Arrow indicator */}
            <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                <ArrowUpRight className="w-3 h-3 text-white group-hover:text-black transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-10%" });
  
  // Integrated title parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 bg-[rgb(var(--background))] overflow-hidden"
    >
      {/* ===== INTEGRATED SECTION TITLE ===== */}
      {/* Title that feels part of the composition, not just placed above */}
      <div ref={titleRef} className="relative z-10 px-6 lg:px-16 mb-20 lg:mb-32">
        <div className="max-w-[1800px] mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isTitleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-white/20" />
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              Selected Work
            </span>
          </motion.div>
          
          {/* Large editorial title - integrated into composition */}
          <motion.h2 style={{ x: titleX }} className="relative">
            <span className="overflow-hidden block">
              <motion.span
                initial={{ y: "100%" }}
                animate={isTitleInView ? { y: "0%" } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="block font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-[-0.04em]"
              >
                Recent
              </motion.span>
            </span>
            <span className="overflow-hidden block -mt-2 lg:-mt-4">
              <motion.span
                initial={{ y: "100%" }}
                animate={isTitleInView ? { y: "0%" } : {}}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.04em]"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}
              >
                Projects
              </motion.span>
            </span>
          </motion.h2>
        </div>
      </div>

      {/* ===== CINEMATIC EDITORIAL COMPOSITION ===== */}
      <div className="relative z-10 px-6 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          
          {/* ROW 1: Featured project - oversized, dominant */}
          <div className="mb-16 lg:mb-24">
            <FeaturedProject project={projects[0]} index={0} />
          </div>
          
          {/* ROW 2: Asymmetric composition with overlapping */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left column - tall card, pulled up for overlap effect */}
            <div className="lg:col-span-5 lg:-mt-32">
              <SecondaryProject project={projects[1]} index={1} size="tall" />
            </div>
            
            {/* Right column - stacked cards */}
            <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
              {/* Wide card */}
              <SecondaryProject project={projects[2]} index={2} size="wide" />
              
              {/* Default card with intentional offset */}
              <div className="lg:ml-auto lg:w-[85%]">
                <SecondaryProject project={projects[3]} index={3} size="default" />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* ===== VIEW ALL CTA ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mt-24 lg:mt-40 px-6 lg:px-16"
      >
        <div className="max-w-[1800px] mx-auto flex justify-center lg:justify-end">
          <Link
            href="/work"
            className="group inline-flex items-center gap-4"
          >
            <span className="text-lg font-medium text-white/60 group-hover:text-white transition-colors">
              View all work
            </span>
            <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:border-transparent transition-all duration-500">
              <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
            </div>
          </Link>
        </div>
      </motion.div>

      {/* ===== SUBTLE AMBIENT ELEMENTS ===== */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] pointer-events-none opacity-30">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(var(--glow-intense), 0.04), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
      </div>
    </section>
  );
}
