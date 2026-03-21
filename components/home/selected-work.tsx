"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const projects = [
  {
    id: "meridian-consulting",
    title: "Meridian Consulting",
    category: "Business Website",
    year: "2024",
    description: "Premium multi-page website for a management consulting firm with focus on trust and lead generation.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=1000&fit=crop",
    tags: ["Strategy", "Design", "Development"],
    featured: true,
  },
  {
    id: "sarah-mitchell",
    title: "Sarah Mitchell",
    category: "Personal Brand",
    year: "2024",
    description: "High-converting landing page for a marketing consultant.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop",
    tags: ["Landing Page", "Conversion"],
    featured: false,
  },
  {
    id: "nexus-digital",
    title: "Nexus Digital",
    category: "Agency Website",
    year: "2023",
    description: "Modern portfolio with immersive visual storytelling.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop",
    tags: ["Portfolio", "Animation"],
    featured: false,
  },
  {
    id: "fintech-startup",
    title: "Vertex Finance",
    category: "SaaS Platform",
    year: "2023",
    description: "Enterprise-grade financial dashboard with real-time data.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    tags: ["Dashboard", "SaaS"],
    featured: false,
  },
];

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden bg-[rgb(var(--background))]">
      {/* Background accent */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[rgb(var(--surface-2))] to-transparent opacity-50 -translate-x-1/2 -translate-y-1/4"
      />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
              Selected Work
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--foreground))]">
              Recent projects
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
              View all projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* FEATURED PROJECT - Large editorial treatment */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 lg:mb-24"
          >
            <Link href={`/work/${featuredProject.id}`} className="group block">
              <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-[16/12] overflow-hidden rounded-2xl lg:rounded-3xl">
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Featured label */}
                  <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:py-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
                      {featuredProject.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[rgb(var(--border))]" />
                    <span className="text-sm text-[rgb(var(--muted-foreground))]">
                      {featuredProject.year}
                    </span>
                  </div>

                  <h3 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-[rgb(var(--foreground))] mb-6 group-hover:text-[rgb(var(--muted-foreground))] transition-colors">
                    {featuredProject.title}
                  </h3>

                  <p className="text-lg lg:text-xl text-[rgb(var(--muted-foreground))] leading-relaxed mb-8 max-w-lg">
                    {featuredProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredProject.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] bg-[rgb(var(--surface-2))] rounded-full border border-[rgb(var(--border))]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View link */}
                  <div className="inline-flex items-center gap-2 text-base font-semibold text-[rgb(var(--foreground))] group-hover:gap-4 transition-all">
                    View case study
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* OTHER PROJECTS - Layered asymmetric grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              className={`group ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <Link href={`/work/${project.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] transition-all duration-500 hover:border-[rgb(var(--foreground))]/20 hover:shadow-2xl hover:shadow-black/10">
                  {/* Image */}
                  <div className={`relative ${i === 0 ? "aspect-[21/9]" : "aspect-[16/10]"} overflow-hidden`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--surface-2))] via-[rgb(var(--surface-2))]/20 to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="relative p-6 lg:p-8 -mt-20">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-[rgb(var(--muted-foreground))]">
                        {project.category}
                      </span>
                      <span className="text-xs text-[rgb(var(--muted-foreground))]">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-[rgb(var(--foreground))] mb-3 group-hover:text-[rgb(var(--muted-foreground))] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-[rgb(var(--muted-foreground))] text-sm lg:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs font-medium text-[rgb(var(--muted-foreground))] bg-[rgb(var(--surface-3))] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[rgb(var(--foreground))] text-[rgb(var(--background))] flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
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
