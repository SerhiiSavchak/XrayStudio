import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const principles = [
  {
    title: "Product Thinking",
    description:
      "I approach every website as a product. Not just a collection of pages, but a tool designed to achieve specific business goals.",
  },
  {
    title: "Visual Excellence",
    description:
      "Premium visual quality is non-negotiable. Strong design builds trust and positions your brand where it deserves to be.",
  },
  {
    title: "Technical Craft",
    description:
      "Clean code, fast performance, and scalable architecture. Because how it's built matters as much as how it looks.",
  },
]

export function About() {
  return (
    <section id="about" className="relative border-t border-border/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column - About text */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              About
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Product-minded developer with a design eye
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                I create premium websites for experts, service businesses, and
                brands who understand that their online presence is a direct
                reflection of their value.
              </p>
              <p className="leading-relaxed">
                Working at the intersection of design, UX, and development
                means I see the full picture. Not just what the website looks
                like, but how it feels, how it performs, and how it serves your
                business goals.
              </p>
              <p className="leading-relaxed">
                Every project is an opportunity to create something that stands
                out — a digital product that builds trust, communicates value,
                and converts visitors into clients.
              </p>
            </div>
            <Link
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-muted-foreground"
            >
              Let's work together
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Right column - Principles */}
          <div className="space-y-8 lg:pt-12">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className="border-t border-border/50 pt-8 first:border-t-0 first:pt-0"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm text-muted-foreground">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{principle.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {principle.description}
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
