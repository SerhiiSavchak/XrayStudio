"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "landing-pages",
    title: "Landing Pages",
    subtitle: "Convert visitors into customers",
    description: "High-converting single pages designed to drive specific actions. Perfect for product launches, service offers, lead generation, and marketing campaigns.",
    forWho: ["Consultants launching new offers", "Businesses running ad campaigns", "SaaS companies promoting features", "Professionals capturing leads"],
    includes: ["Compelling visual design", "Clear value proposition", "Optimized user flow", "Mobile-first approach", "Performance optimization", "Basic SEO setup"],
    timeline: "2-3 weeks",
  },
  {
    id: "business-websites",
    title: "Business Websites",
    subtitle: "Establish credibility and authority",
    description: "Multi-page marketing websites that showcase your business, explain your value, and guide visitors toward taking action. Built for trust and conversion.",
    forWho: ["Service businesses", "Professional firms", "B2B companies", "Local premium businesses"],
    includes: ["5-10+ pages", "Strategic site architecture", "Service/offer presentation", "Trust-building elements", "Contact/inquiry system", "Content structure"],
    timeline: "4-8 weeks",
  },
  {
    id: "portfolio-sites",
    title: "Portfolio & Personal Brand",
    subtitle: "Showcase your expertise",
    description: "Personal websites that position you as an expert in your field. Designed to attract the right opportunities and establish your professional presence.",
    forWho: ["Consultants", "Designers & creatives", "Developers", "Content creators"],
    includes: ["About/story section", "Work showcase", "Services overview", "Blog/content area (optional)", "Contact integration", "Professional positioning"],
    timeline: "3-5 weeks",
  },
  {
    id: "redesign",
    title: "Website Redesign",
    subtitle: "Transform your digital presence",
    description: "Modernize outdated websites to reflect your current level. Improve visual appeal, user experience, performance, and conversion effectiveness.",
    forWho: ["Businesses with outdated sites", "Brands that have evolved", "Companies losing leads", "Anyone needing a refresh"],
    includes: ["Current site audit", "New visual direction", "Improved UX/flow", "Content restructuring", "Performance upgrade", "Modern tech implementation"],
    timeline: "4-6 weeks",
  },
];

export function ServiceDetails() {
  return (
    <Section>
      <div className="space-y-20 lg:space-y-32">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-32"
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-3">
                  {service.subtitle}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-foreground uppercase tracking-wide mb-3">
                      Ideal For
                    </h4>
                    <ul className="space-y-2">
                      {service.forWho.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-highlight" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4">
                    <div className="px-4 py-2 rounded-lg bg-surface-2 border border-border">
                      <span className="text-xs text-muted-foreground block">Timeline</span>
                      <span className="text-sm font-medium text-foreground">{service.timeline}</span>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 mt-8 text-foreground font-medium hover:text-muted-foreground transition-colors"
                >
                  Discuss This Service
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* What's included card */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="p-8 lg:p-10 rounded-2xl bg-surface-2/50 border border-border h-full">
                  <h4 className="text-lg font-semibold text-foreground mb-6">
                    What&apos;s Included
                  </h4>
                  <ul className="space-y-4">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 rounded-full bg-surface-3 border border-border flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-foreground" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
