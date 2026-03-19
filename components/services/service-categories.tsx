"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Layout, Globe, User, RefreshCw, Settings, Sparkles } from "lucide-react";

const categories = [
  {
    icon: Layout,
    title: "Landing Pages",
    description: "High-converting single pages for offers, launches, and campaigns",
    href: "#landing-pages",
  },
  {
    icon: Globe,
    title: "Business Websites",
    description: "Multi-page marketing websites that establish credibility",
    href: "#business-websites",
  },
  {
    icon: User,
    title: "Portfolio Sites",
    description: "Personal brand websites that showcase expertise",
    href: "#portfolio-sites",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    description: "Transform outdated sites into modern digital assets",
    href: "#redesign",
  },
  {
    icon: Settings,
    title: "CMS Setup",
    description: "Content management systems for easy updates",
    href: "#cms",
  },
  {
    icon: Sparkles,
    title: "Polish & Refinement",
    description: "Performance optimization and visual improvements",
    href: "#polish",
  },
];

export function ServiceCategories() {
  return (
    <Section className="bg-surface-1/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
          Service Categories
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          What I can build for you
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.a
            key={category.title}
            href={category.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group p-6 rounded-2xl bg-surface-2/50 border border-border hover:border-highlight/50 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-3 border border-border flex items-center justify-center mb-4 group-hover:border-highlight/30 transition-colors">
              <category.icon className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {category.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
