"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Send, Mail, MessageCircle } from "lucide-react";

const projectTypes = [
  "Landing Page",
  "Business Website",
  "Portfolio / Personal Brand",
  "Website Redesign",
  "Other",
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Section className="pt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center py-16"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Message sent successfully
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Thank you for reaching out. I typically respond within 24 hours. 
            Looking forward to learning more about your project.
          </p>
        </motion.div>
      </Section>
    );
  }

  return (
    <Section className="pt-8">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition-all"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">
                  Contact (Email or Telegram)
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
                Type of Project
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition-all appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Tell me about your project
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition-all resize-none"
                placeholder="What are you looking to build? What's the goal? Any relevant context or timeline..."
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                Budget Range <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition-all"
                placeholder="e.g., $5,000-10,000 or 'flexible'"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-sm text-muted-foreground text-center">
              You can write even without a detailed brief. We&apos;ll figure out the specifics together.
            </p>
          </form>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="space-y-6">
            {/* Alternative contact */}
            <div className="p-6 rounded-2xl bg-surface-2/50 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Prefer direct contact?
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:hello@serhiisavchak.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-3 border border-border flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Email</span>
                    <span className="text-sm text-foreground">hello@serhiisavchak.com</span>
                  </div>
                </a>
                <a
                  href="https://t.me/serhiisavchak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-3 border border-border flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Telegram</span>
                    <span className="text-sm text-foreground">@serhiisavchak</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Response time */}
            <div className="p-6 rounded-2xl bg-surface-2/50 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Response time
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I typically respond within 24 hours. If your project is urgent, 
                mention it in your message.
              </p>
            </div>

            {/* What to include */}
            <div className="p-6 rounded-2xl bg-surface-2/50 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Helpful to include
              </h3>
              <ul className="space-y-2">
                {[
                  "Your business and what you do",
                  "What you want the website to achieve",
                  "Examples of sites you like",
                  "Timeline if you have one",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
