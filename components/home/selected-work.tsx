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
    size: "large",
  },
  {
    id: "sarah-mitchell",
    title: "Sarah Mitchell",
    category: "Personal Brand",
    year: "2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop",
    size: "medium",
  },
  {
    id: "nexus-digital",
    title: "Nexus Digital",
    category: "Agency",
    year: "2023",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop",
    size: "medium",
  },
  {
    id: "vertex-finance",
    title: "Vertex Finance",
    category: "SaaS",
    year: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    size: "wide",
  },
  {
    id: "aurora-wellness",
    title: "Aurora Wellness",
    category: "Health",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop",
    size: "tall",
  },
];

// Individual project panel with cinematic reveal
function ProjectPanel({ 
  project, 
  index, 
  isInView,
  parallaxY,
}: { 
  project: typeof projects[0]; 
  index: number;
  isInView: boolean;
  parallaxY: any;
}) {
  const delays = [0.1, 0.2, 0.3, 0.15, 0.25];
  const delay = delays[index] || 0.1;

  return (
    <motion.div
      style={{ y: parallaxY }}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 1.2, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="relative group"
    >
      <Link href={`/work/${project.id}`} className="block">
        {/* Image container with mask reveal */}
        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl">
          <motion.div 
            className="relative aspect-[4/3]"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ 
              duration: 1.4, 
              delay: delay + 0.1, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: delay + 0.4 }}
            >
              <span className="text-xs lg:text-sm font-medium text-white/50 tracking-wider uppercase">
                {project.category}
              </span>
              <h3 className="mt-1.5 font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
            </motion.div>
          </div>

          {/* Hover arrow */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/0 backdrop-blur-sm border border-white/0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-15%" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-5%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for layered depth
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const panel1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const panel2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const panel3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const panel4Y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const panel5Y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const parallaxValues = [panel1Y, panel2Y, panel3Y, panel4Y, panel5Y];

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 lg:py-48 overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Atmospheric background glow */}
      <div 
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(var(--glow-intense), 0.04), transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Large background typography - moves slower */}
      <motion.div 
        style={{ y: bgTextY }}
        className="absolute top-[10%] left-0 right-0 pointer-events-none select-none overflow-hidden"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isGridInView ? { opacity: 0.025 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display text-[22vw] font-bold tracking-[-0.04em] text-white whitespace-nowrap"
        >
          WORK
        </motion.span>
      </motion.div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 lg:mb-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-block text-xs lg:text-sm font-medium uppercase tracking-[0.25em] text-white/40 mb-6"
              >
                Selected Work
              </motion.span>
              
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9]">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-white"
                    initial={{ y: "100%" }}
                    animate={isHeaderInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Recent
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-white/40"
                    initial={{ y: "100%" }}
                    animate={isHeaderInView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Projects
                  </motion.span>
                </span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:pb-4"
            >
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 text-base font-medium text-white hover:text-white/70 transition-colors"
              >
                View all work
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Cinematic Montage Grid - asymmetric with parallax */}
        <div ref={gridRef} className="relative">
          {/* Desktop: Asymmetric montage layout */}
          <div className="hidden lg:grid grid-cols-12 gap-6 auto-rows-[280px]">
            {/* Large panel - left side, spans 2 rows */}
            <div className="col-span-7 row-span-2">
              <ProjectPanel 
                project={projects[0]} 
                index={0} 
                isInView={isGridInView}
                parallaxY={panel1Y}
              />
            </div>
            
            {/* Medium panel - top right */}
            <div className="col-span-5">
              <ProjectPanel 
                project={projects[1]} 
                index={1} 
                isInView={isGridInView}
                parallaxY={panel2Y}
              />
            </div>
            
            {/* Medium panel - middle right */}
            <div className="col-span-5">
              <ProjectPanel 
                project={projects[2]} 
                index={2} 
                isInView={isGridInView}
                parallaxY={panel3Y}
              />
            </div>
            
            {/* Wide panel - bottom, spans full width */}
            <div className="col-span-8">
              <ProjectPanel 
                project={projects[3]} 
                index={3} 
                isInView={isGridInView}
                parallaxY={panel4Y}
              />
            </div>
            
            {/* Tall panel - bottom right */}
            <div className="col-span-4">
              <ProjectPanel 
                project={projects[4]} 
                index={4} 
                isInView={isGridInView}
                parallaxY={panel5Y}
              />
            </div>
          </div>

          {/* Mobile: Stack layout */}
          <div className="lg:hidden space-y-6">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectPanel 
                key={project.id}
                project={project} 
                index={index} 
                isInView={isGridInView}
                parallaxY={parallaxValues[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
