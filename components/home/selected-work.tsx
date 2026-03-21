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
    subtitle: "Strategic consulting redefined",
    category: "Consulting",
    services: ["Design", "Development", "Strategy"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=1000&fit=crop",
  },
  {
    id: "sarah-mitchell",
    title: "Sarah Mitchell",
    subtitle: "Personal brand that connects",
    category: "Personal Brand",
    services: ["Branding", "Web Design", "Content"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=1000&fit=crop",
  },
  {
    id: "nexus-digital",
    title: "Nexus Digital",
    subtitle: "Agency of the future",
    category: "Agency",
    services: ["Design System", "Development"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&h=1000&fit=crop",
  },
  {
    id: "vertex-finance",
    title: "Vertex Finance",
    subtitle: "Fintech made human",
    category: "SaaS Platform",
    services: ["UX/UI", "Development", "Analytics"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1000&fit=crop",
  },
];

// Individual project card
function ProjectCard({ 
  project, 
  index, 
  progress 
}: { 
  project: typeof projects[0]; 
  index: number;
  progress: any;
}) {
  const cardStart = index / projects.length;
  const cardEnd = (index + 1) / projects.length;
  const cardCenter = (cardStart + cardEnd) / 2;
  
  // Scale up when card is in center view
  const scale = useTransform(
    progress,
    [cardStart, cardCenter, cardEnd],
    [0.85, 1, 0.85]
  );
  
  const opacity = useTransform(
    progress,
    [cardStart - 0.1, cardStart, cardCenter, cardEnd, cardEnd + 0.1],
    [0.4, 0.7, 1, 0.7, 0.4]
  );

  return (
    <motion.div 
      style={{ scale, opacity }}
      className="flex-shrink-0 w-[85vw] md:w-[75vw] lg:w-[65vw] max-w-[1100px] h-[70vh] md:h-[75vh] relative group"
    >
      <Link href={`/work/${project.id}`} className="block h-full">
        <div className="relative h-full rounded-2xl lg:rounded-3xl overflow-hidden bg-[rgb(var(--surface-1))] border border-white/[0.06]">
          {/* Project image */}
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          </div>

          {/* Content overlay */}
          <div className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-12">
            {/* Top row - category & year */}
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white/80 uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-sm text-white/40 font-mono">
                {project.year}
              </span>
            </div>

            {/* Bottom content */}
            <div>
              {/* Services tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.services.map((service) => (
                  <span 
                    key={service}
                    className="text-xs text-white/50 font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Title & subtitle */}
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="mt-2 text-base md:text-lg text-white/60 max-w-md">
                {project.subtitle}
              </p>

              {/* CTA */}
              <div className="mt-6 flex items-center gap-3 text-sm font-medium text-white group/cta">
                <span className="opacity-60 group-hover/cta:opacity-100 transition-opacity">
                  View project
                </span>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:text-black transition-colors" />
                </span>
              </div>
            </div>
          </div>

          {/* Project number */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 lg:top-12 lg:right-12">
            <span className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white/[0.06]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10%" });

  // Scroll progress for horizontal movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll transform
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["5%", `-${(projects.length - 1) * 70}%`]
  );

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[rgb(var(--background))]"
      // Height = viewport + scroll distance for horizontal movement
      style={{ height: `${100 + projects.length * 80}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section header */}
        <div 
          ref={headerRef} 
          className="absolute top-0 left-0 right-0 z-20 px-6 lg:px-16 pt-20 lg:pt-28"
        >
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-white/40 mb-4"
              >
                Selected Work
              </motion.span>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="overflow-hidden block">
                  <motion.span
                    className="block text-white"
                    initial={{ y: "100%" }}
                    animate={isHeaderInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Recent Projects
                  </motion.span>
                </span>
              </h2>
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
                <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="absolute inset-0 flex items-center pt-20">
          <motion.div 
            style={{ x }}
            className="flex items-center gap-6 md:gap-8 lg:gap-12 pl-6 lg:pl-16"
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project} 
                index={index}
                progress={scrollYProgress}
              />
            ))}
            
            {/* End card - View all */}
            <motion.div 
              className="flex-shrink-0 w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-[600px] h-[70vh] md:h-[75vh] flex items-center justify-center"
            >
              <Link 
                href="/work"
                className="group flex flex-col items-center text-center p-12"
              >
                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:bg-white group-hover:border-transparent transition-all duration-500">
                  <ArrowRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                </div>
                <span className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  View all work
                </span>
                <span className="text-white/40 text-sm">
                  Explore the full portfolio
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-6 lg:left-16 z-20">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-white/40">
              <motion.span className="text-white">
                {/* Dynamic number based on scroll */}
              </motion.span>
              / {String(projects.length).padStart(2, "0")}
            </span>
            <div className="w-24 h-px bg-white/10 overflow-hidden">
              <motion.div 
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                className="h-full bg-white/50"
              />
            </div>
          </div>
        </div>

        {/* Gradient overlays for depth */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[rgb(var(--background))] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[rgb(var(--background))] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
