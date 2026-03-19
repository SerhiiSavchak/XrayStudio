"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, MapPin } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@xraystudio.dev",
    description: "Best for detailed project inquiries",
  },
  {
    icon: MessageCircle,
    label: "Telegram",
    value: "@xraystudio",
    description: "Quick questions and updates",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    description: "Monday to Friday",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote Worldwide",
    description: "Available across time zones",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Let&apos;s Connect
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          I&apos;m always interested in hearing about new projects and
          opportunities. Whether you have a specific project in mind or just
          want to explore possibilities, I&apos;d love to hear from you.
        </p>
      </div>

      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <method.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{method.label}</p>
              <p className="text-foreground font-medium">{method.value}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {method.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-8 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          What Happens Next?
        </h3>
        <ol className="space-y-4">
          {[
            "I'll review your inquiry within 24 hours",
            "We'll schedule a discovery call to discuss your project",
            "I'll prepare a tailored proposal with timeline and investment",
            "Once approved, we kick off your project",
          ].map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-muted-foreground">{step}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
