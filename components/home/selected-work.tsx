"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const projects = [
  {
    id: "meridian-consulting",
    title: "Meridian Consulting",
    category: "Business Website",
    description: "Premium multi-page website for a management consulting firm with focus on trust and lead generation.",
    gradient: "from-amber-500/20 via-orange-500/10",
  },
  {
    id: "sarah-mitchell",
    title: "Sarah Mitchell",
    category: "Personal Brand",
    description: "High-converting landing page for a marketing consultant with bold visuals.",
    gradient: "from-blue-500/20 via-cyan-500/10",
  },
  {
    id: "nexus-digital",
    title: "Nexus Digital Studio",
    category: "Agency Website",
    description: "Modern portfolio with immersive visual storytelling for a creative agency.",
    gradient: "from-rose-500/20 via-pink-500/10",
  },
];

export function SelectedWork() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 surface-1" />
      
      {/* Floating background element */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[rgb(var(--surface-3))] to-transparent opacity-30 translate-x-1/2 -translate-y-1/4"
      />

      <div className="relative container-wide">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
              {t.work.title}
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--foreground))]">
              {t.work.subtitle}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-base font-medium text-[rgb(var(--foreground))] hover:text-[rgb(var(--muted-foreground))] transition-colors group"
            >
              {t.work.viewAll}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Projects - Cinematic staggered grid */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`group relative ${
                i === 0 
                  ? "lg:col-span-7 lg:row-span-2" 
                  : i === 1 
                    ? "lg:col-span-5 lg:col-start-8" 
                    : "lg:col-span-5 lg:col-start-8"
              }`}
            >
              <Link href={`/work/${project.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl surface-2 border border-[rgb(var(--border))] transition-all duration-700 hover:border-[rgb(var(--muted-foreground))]/30 hover:shadow-2xl hover:shadow-[rgb(var(--glow))]/10">
                  {/* Image container */}
                  <div className={`relative ${i === 0 ? "aspect-[4/3] lg:aspect-[16/12]" : "aspect-[16/10]"} overflow-hidden`}>
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} to-[rgb(var(--surface-3))]`} />
                    
                    {/* Mock interface elements */}
                    <div className="absolute inset-6 lg:inset-10 rounded-xl surface-3 border border-[rgb(var(--border-subtle))] overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[rgb(var(--border-subtle))]">
                        <div className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--foreground))]/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--foreground))]/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--foreground))]/20" />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="w-24 h-2 rounded bg-[rgb(var(--foreground))]/10" />
                        <div className="w-full h-4 rounded bg-[rgb(var(--foreground))]/5" />
                        <div className="w-3/4 h-4 rounded bg-[rgb(var(--foreground))]/5" />
                        <div className="w-1/2 h-3 rounded bg-[rgb(var(--foreground))]/8 mt-4" />
                      </div>
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--surface-2))] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                    {/* Category tag */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[rgb(var(--foreground))] bg-[rgb(var(--background))]/70 backdrop-blur-sm rounded-full border border-[rgb(var(--border-subtle))]">
                        {project.category}
                      </span>
                    </div>

                    {/* Title and description */}
                    <h3 className="font-display text-2xl lg:text-3xl font-semibold text-[rgb(var(--foreground))] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[rgb(var(--muted-foreground))] text-sm lg:text-base max-w-md leading-relaxed">
                      {project.description}
                    </p>

                    {/* View link */}
                    <div className="mt-6 flex items-center gap-2 text-[rgb(var(--foreground))]">
                      <span className="text-sm font-medium">{t.work.viewCase}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
