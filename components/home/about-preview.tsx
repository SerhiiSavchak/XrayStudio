"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <Section className="bg-surface-1/30">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Image/Visual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div className="relative">
            {/* Profile area with abstract representation */}
            <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-surface-2 to-surface-3 border border-border overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(63,63,70,0.4),transparent_70%)]" />
              
              {/* Content representation */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="space-y-3">
                  <div className="w-24 h-3 rounded bg-foreground/20" />
                  <div className="w-40 h-5 rounded bg-foreground/30" />
                  <div className="w-32 h-3 rounded bg-foreground/10" />
                </div>
              </div>
              
              {/* Accent shapes */}
              <div className="absolute top-8 right-8 w-20 h-20 rounded-full border border-border/50" />
              <div className="absolute top-16 right-16 w-12 h-12 rounded-full bg-surface-3/50" />
            </div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 p-4 rounded-2xl bg-surface-2 border border-border glow-sm"
            >
              <div className="text-2xl font-semibold text-foreground">5+</div>
              <div className="text-sm text-muted-foreground">Years Building</div>
              <div className="text-sm text-muted-foreground">Premium Sites</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
            About
          </p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            Hi, I&apos;m Serhii
          </h2>
          
          <div className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a product-minded web developer who believes that a great website 
              is more than just good design — it&apos;s a strategic tool that helps 
              businesses look premium, build trust, and convert visitors into clients.
            </p>
            <p>
              I work at the intersection of design, UX, and development. For me, 
              it matters not only how a site looks, but how it&apos;s perceived, how 
              fast it loads, and how it guides users toward taking action.
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-3">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-surface-2 border border-border text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 mt-10 text-foreground font-medium hover:text-muted-foreground transition-colors"
          >
            Learn More About My Approach
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
