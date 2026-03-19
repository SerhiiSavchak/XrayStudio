"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Meridian Consulting",
    category: "Business Website",
    year: "2024",
    description: "Premium multi-page website for a management consulting firm. The project focused on establishing trust, showcasing expertise, and generating qualified leads through strategic content hierarchy and compelling visual presentation.",
    challenge: "Position a new consulting firm as premium and trustworthy in a competitive market.",
    solution: "Clean, sophisticated design with strong case study presentations and clear service offerings.",
    results: ["47% increase in lead quality", "2.3x longer session duration", "Premium brand positioning"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop",
    tags: ["Strategy", "Multi-page", "Lead Generation", "CMS"],
    featured: true,
  },
  {
    id: 2,
    title: "Sarah Mitchell",
    category: "Personal Brand",
    year: "2024",
    description: "High-converting landing page for a marketing consultant specializing in B2B SaaS. Bold visual approach with clear value proposition and optimized conversion flow.",
    challenge: "Differentiate from generic consultant sites and communicate premium positioning.",
    solution: "Distinctive visual identity with strong testimonials and clear path to booking calls.",
    results: ["35% conversion rate on booking", "Distinctive brand presence", "3x more qualified inquiries"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&h=900&fit=crop",
    tags: ["Personal Brand", "Landing Page", "Conversion"],
    featured: true,
  },
  {
    id: 3,
    title: "Nexus Digital Studio",
    category: "Agency Website",
    year: "2023",
    description: "Modern portfolio website for a creative agency specializing in brand identity and digital experiences. Focus on immersive project showcases and visual storytelling.",
    challenge: "Let the work speak for itself while maintaining clear agency positioning.",
    solution: "Large-format case study presentations with smooth transitions and editorial layout.",
    results: ["Enhanced creative credibility", "Improved client quality", "Award-winning design"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&h=900&fit=crop",
    tags: ["Portfolio", "Animation", "Creative", "Case Studies"],
    featured: true,
  },
  {
    id: 4,
    title: "Atlas Financial",
    category: "Business Website",
    year: "2023",
    description: "Corporate website redesign for a financial advisory firm. Modernized their digital presence while maintaining professional credibility and regulatory compliance.",
    challenge: "Update an outdated site without losing established trust signals.",
    solution: "Fresh modern design preserving familiar navigation, with enhanced content structure.",
    results: ["Modern professional image", "Improved accessibility", "Faster page loads"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&h=900&fit=crop",
    tags: ["Redesign", "Corporate", "Finance"],
    featured: false,
  },
  {
    id: 5,
    title: "Peak Performance",
    category: "Landing Page",
    year: "2023",
    description: "High-impact landing page for an executive coaching program launch. Designed for maximum conversion with compelling storytelling and social proof.",
    challenge: "Launch a premium coaching offer with strong conversion from paid traffic.",
    solution: "Long-form landing page with strategic content blocks and multiple CTAs.",
    results: ["8.5% conversion rate", "Successful program launch", "Strong waitlist signups"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=900&fit=crop",
    tags: ["Landing Page", "Coaching", "Launch"],
    featured: false,
  },
];

export function FeaturedProjects() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <Section className="pt-0">
      {/* Featured Projects */}
      <div className="space-y-8">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-surface-2 border border-border">
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-surface-2/50 to-transparent" />
                
                {/* Year badge */}
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium text-foreground">
                  {project.year}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative p-8 lg:p-12 -mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                    {project.category}
                  </span>
                </div>
                
                <h2 className="text-2xl lg:text-4xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  {project.title}
                  <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                  {project.description}
                </p>
                
                {/* Project details grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Challenge</h4>
                    <p className="text-sm text-muted-foreground">{project.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground">{project.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Results</h4>
                    <ul className="space-y-1">
                      {project.results.map((result, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-highlight" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
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
          </motion.article>
        ))}
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="mt-20">
          <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-8">
            More Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden bg-surface-2 border border-border hover:border-highlight/50 transition-all duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-2 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{project.category}</span>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
