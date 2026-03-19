"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Meridian Consulting",
    category: "Business Website",
    description: "Premium multi-page website for a management consulting firm. Focus on trust, credibility, and lead generation.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    tags: ["Strategy", "Multi-page", "Lead Gen"],
  },
  {
    id: 2,
    title: "Sarah Mitchell",
    category: "Personal Brand",
    description: "High-converting landing page for a marketing consultant. Bold visuals with clear value proposition.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
    tags: ["Personal Brand", "Landing Page"],
  },
  {
    id: 3,
    title: "Nexus Digital Studio",
    category: "Agency Website",
    description: "Modern portfolio website for a creative agency. Showcasing work with immersive visual storytelling.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop",
    tags: ["Portfolio", "Animation", "Creative"],
  },
];

export function SelectedWork() {
  return (
    <Section>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
        <SectionHeader
          label="Selected Work"
          title="Projects that made an impact"
          description="A curated selection of recent work. Each project built with attention to detail, performance, and business goals."
        />
        
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors shrink-0"
        >
          View All Projects
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group"
          >
            <Link href="/work" className="block">
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-surface-2 border border-border">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-surface-2" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4 flex items-center gap-3">
                      {project.title}
                      <ArrowUpRight className="w-6 h-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-surface-3 border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
