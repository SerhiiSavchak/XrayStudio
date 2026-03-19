"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";

export function ProfessionalIdentity() {
  return (
    <Section className="pt-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            label="Who I Am"
            title="Product-minded web developer"
          />
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I don&apos;t position myself as a &quot;developer who does everything.&quot; 
              I focus on one thing and do it exceptionally well: creating premium 
              websites that help businesses look better, build trust, and convert 
              visitors into clients.
            </p>
            <p>
              My approach combines strong visual execution with product thinking. 
              I care not just about how a site looks, but how it&apos;s structured, 
              how fast it loads, how it guides users, and whether it achieves 
              its business objectives.
            </p>
            <p>
              This means I bring more to the table than just code execution. 
              I think about the whole picture — from positioning and messaging 
              to user experience and technical performance.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <SectionHeader
            label="What I Create"
            title="Premium digital products"
          />
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Every website I build is treated as a digital product, not just 
              a collection of pages. This means thoughtful structure, intentional 
              design decisions, and implementation that&apos;s built to perform 
              and last.
            </p>
            <p>
              I work with experts, consultants, service businesses, and brands 
              who need their website to do more than just exist — they need it 
              to actively work for their business.
            </p>
            <p>
              The result is websites that look expensive, feel professional, 
              load quickly, and help you stand out from competitors who settled 
              for generic templates.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
