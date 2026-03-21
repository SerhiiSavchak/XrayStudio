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
    subtitle: "Consulting",
    category: "Business Website",
    year: "2024",
    description: "Premium multi-page website for a management consulting firm with focus on trust and lead generation.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=1000&fit=crop",
    tags: ["Strategy", "Design", "Development"],
    color: "from-blue-500/10 to-purple-500/10",
  },
  {
    id: "sarah-mitchell",
    title: "Sarah",
    subtitle: "Mitchell",
    category: "Personal Brand",
    year: "2024",
    description: "High-converting landing page for a marketing consultant with premium visual storytelling.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop",
    tags: ["Landing Page", "Conversion"],
    color: "from-amber-500/10 to-rose-500/10",
  },
  {
    id: "nexus-digital",
    title: "Nexus",
    subtitle: "Digital",
    category: "Agency Website",
    year: "2023",
    description: "Modern portfolio with immersive visual storytelling and micro-interactions.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop",
    tags: ["Portfolio", "Animation"],
    color: "from-emerald-500/10 to-cyan-500/10",
  },
  {
    id: "vertex-finance",
    title: "Vertex",
    subtitle: "Finance",
    category: "SaaS Platform",
    year: "2023",
    description: "Enterprise-grade financial dashboard with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    tags: ["Dashboard", "SaaS"],
    color: "from-violet-500/10 to-indigo-500/10",
  },
];

function ProjectCard({ project, index, scrollProgress }: { project: typeof projects[0]; index: number; scrollProgress: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });

  // Staggered reveals based on scroll position
  const cardStart = index * 0.2;
  const cardEnd = cardStart + 0.4;
  
  const cardOpacity = useTransform(scrollProgress, [cardStart, cardStart + 0.1], [0, 1]);
  const cardY = useTransform(scrollProgress, [cardStart, cardStart + 0.15], [80, 0]);
  const imageScale = useTransform(scrollProgress, [cardStart, cardEnd], [1.15, 1]);
  const imageY = useTransform(scrollProgress, [cardStart, cardEnd], ["10%", "0%"]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity: cardOpacity, y: cardY }}
      className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw] xl:w-[50vw]"
    >
      <Link href={`/work/${project.id}`} className="group block">
        <div className="relative">
          {/* Large background number */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute -top-16 lg:-top-24 -left-4 lg:-left-8 font-display text-[8rem] lg:text-[12rem] font-bold text-[rgb(var(--foreground))]/[0.02] leading-none select-none pointer-events-none z-0"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>

          {/* Image container */}
          <div className="relative aspect-[16/10] rounded-2xl lg:rounded-3xl overflow-hidden border border-[rgb(var(--border))]/40 bg-[rgb(var(--surface-2))]">
            {/* Cinematic mask reveal */}
            <motion.div 
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div style={{ scale: imageScale, y: imageY }} className="w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hover arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[rgb(var(--foreground))] text-[rgb(var(--background))] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>

            {/* Year badge */}
            <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
              <span className="text-xs font-medium text-white/90">{project.year}</span>
            </div>
          </div>

          {/* Content below image */}
          <div className="mt-8 lg:mt-10">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-4"
            >
              <span className="text-xs lg:text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
                {project.category}
              </span>
            </motion.div>

            {/* Title - oversized split treatment */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[0.95] group-hover:text-[rgb(var(--muted-foreground))] transition-colors duration-300"
            >
              <span className="block text-[rgb(var(--foreground))]">{project.title}</span>
              <span className="block text-[rgb(var(--foreground))]/50">{project.subtitle}</span>
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-5 text-[rgb(var(--muted-foreground))] text-base lg:text-lg leading-relaxed max-w-lg"
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs font-medium text-[rgb(var(--foreground))]/70 bg-[rgb(var(--surface-2))] rounded-full border border-[rgb(var(--border))]/50"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll transform
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["5%", "-75%"]);
  
  // Background parallax
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-[rgb(var(--background))]">
      {/* Sticky container for horizontal scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background atmosphere */}
        <motion.div style={{ x: bgX }} className="absolute inset-0 w-[120%]">
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full"
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.06, transparent 60%)",
                filter: "blur(80px)",
              }}
            />
          </motion.div>
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full"
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.05, transparent 60%)",
                filter: "blur(100px)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Section header - fixed position */}
        <div ref={headerRef} className="absolute top-10 left-6 lg:left-16 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs lg:text-sm font-medium uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))]">
              Selected Work
            </span>
            <h2 className="mt-3 lg:mt-4 font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-[rgb(var(--foreground))] tracking-tight">
              Recent projects
            </h2>
          </motion.div>
        </div>

        {/* View all link - fixed position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-10 right-6 lg:right-16 z-20"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm lg:text-base font-medium text-[rgb(var(--foreground))] hover:text-[rgb(var(--muted-foreground))] transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-10 left-6 lg:left-16 z-20 flex items-center gap-4">
          <span className="text-xs font-medium text-[rgb(var(--muted-foreground))]">
            {String(1).padStart(2, "0")}
          </span>
          <div className="w-24 lg:w-32 h-px bg-[rgb(var(--border))] overflow-hidden">
            <motion.div
              className="h-full bg-[rgb(var(--foreground))]"
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <span className="text-xs font-medium text-[rgb(var(--muted-foreground))]">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal scrolling content */}
        <div className="h-full flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-10 lg:gap-16 pl-6 lg:pl-16 pr-[50vw] pt-24"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                scrollProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-r from-[rgb(var(--background))] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-l from-[rgb(var(--background))] to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[rgb(var(--background))] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
