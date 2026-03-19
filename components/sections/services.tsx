import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    number: "01",
    title: "Website Development",
    description:
      "Complete website build from concept to launch. Modern design, clear structure, and production-ready code that positions your brand at its best.",
    includes: ["Custom design", "Responsive development", "CMS integration", "Performance optimization"],
  },
  {
    number: "02",
    title: "Landing Pages",
    description:
      "Conversion-focused landing pages for campaigns, product launches, or specific offers. High impact, fast turnaround, measured results.",
    includes: ["Campaign strategy", "Conversion optimization", "A/B test ready", "Analytics setup"],
  },
  {
    number: "03",
    title: "Website Redesign",
    description:
      "Transform your existing website into something that matches your current level. Fresh visual identity, improved UX, modern technology.",
    includes: ["Design audit", "UX improvements", "Visual refresh", "Content migration"],
  },
]

export function Services() {
  return (
    <section id="services" className="relative border-t border-border/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Services
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              What I can build for you
            </h2>
          </div>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Discuss your project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Services list */}
        <div className="mt-16 space-y-1">
          {services.map((service) => (
            <div
              key={service.number}
              className="group border-t border-border/50 py-10 transition-colors first:border-t-0 hover:bg-card/30 lg:py-12"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
                {/* Number */}
                <span className="shrink-0 font-mono text-sm text-muted-foreground">
                  {service.number}
                </span>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                    {service.title}
                  </h3>
                  <p className="max-w-2xl leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* Includes */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.includes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/80 bg-secondary/30 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
