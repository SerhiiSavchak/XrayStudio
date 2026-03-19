"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { ArrowRight, Layout, Palette, Code, RefreshCw } from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Landing Pages",
    description: "High-converting single pages for specific offers, launches, or campaigns. Clear messaging, compelling design.",
    href: "/services#landing-pages",
  },
  {
    icon: Palette,
    title: "Business Websites",
    description: "Multi-page marketing websites that establish credibility, explain your value, and generate leads.",
    href: "/services#business-websites",
  },
  {
    icon: Code,
    title: "Portfolio Sites",
    description: "Personal brand and portfolio websites that showcase expertise and attract the right opportunities.",
    href: "/services#portfolio-sites",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    description: "Transform outdated websites into modern, high-performing digital assets that reflect your current level.",
    href: "/services#redesign",
  },
];

export function ServicesPreview() {
  return (
    <Section className="bg-surface-1/30">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
        <SectionHeader
          label="Services"
          title="What I can build for you"
          description="From single landing pages to comprehensive multi-page websites. Each project tailored to your specific business goals."
        />
        
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors shrink-0"
        >
          All Services
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={service.href}
              className="group block h-full p-8 lg:p-10 rounded-2xl bg-surface-2/50 border border-border hover:border-highlight/50 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-surface-3 border border-border flex items-center justify-center group-hover:border-highlight/30 transition-colors duration-500">
                  <service.icon className="w-6 h-6 text-foreground" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
