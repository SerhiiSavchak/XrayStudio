"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What does 'website under key' actually include?",
    answer:
      "A complete solution: strategy and structure planning, custom design, responsive development, CMS setup if needed, performance optimization, and launch. You get a finished, working website ready to achieve your goals.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects take 4-8 weeks depending on scope and complexity. Landing pages can be faster, larger websites may need more time. We'll define realistic timelines during our initial conversation.",
  },
  {
    question: "Do you work with clients who already have a design?",
    answer:
      "Yes. If you have a strong design concept, I can focus on development and technical implementation. I also offer design audits and UX improvements for existing designs that need refinement.",
  },
  {
    question: "What's your approach to revisions?",
    answer:
      "I work in iterations with clear feedback cycles. You'll see progress throughout the project and have dedicated review points. This ensures the final result matches your vision without endless back-and-forth.",
  },
  {
    question: "Can you help with content and copy?",
    answer:
      "While I focus on design and development, I can guide content structure and help you understand what content works best in each section. For professional copywriting, I can recommend specialists I work with.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You receive full ownership and documentation. I provide a support period for any questions and offer ongoing maintenance packages for clients who need continued technical assistance.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative border-t border-border/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Common questions
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Answers to things you might be wondering about. If something isn't
              covered here, just ask during our conversation.
            </p>
          </div>

          {/* Right column - FAQ items */}
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-t border-border/50 first:border-t-0"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-start justify-between gap-4 py-6 text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all",
                    openIndex === index
                      ? "grid-rows-[1fr] pb-6"
                      : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
