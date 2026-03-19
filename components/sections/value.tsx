import { Layers, Zap, Shield, Sparkles } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Premium Visual Quality",
    description:
      "Your website should feel expensive and modern. Strong typography, elegant spacing, and controlled composition that builds instant trust.",
  },
  {
    icon: Layers,
    title: "Thoughtful Structure",
    description:
      "Not just beautiful, but clear. Every section guides users through your value proposition toward the action you want them to take.",
  },
  {
    icon: Zap,
    title: "Performance-First",
    description:
      "Fast loading, smooth interactions, and optimized for every device. Because premium feeling means premium performance.",
  },
  {
    icon: Shield,
    title: "Production-Ready",
    description:
      "Clean code, scalable architecture, and built for the long term. Your website as a reliable business asset, not a fragile experiment.",
  },
]

export function Value() {
  return (
    <section className="relative border-t border-border/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            What You Get
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Not just a website.
            <br />
            <span className="text-muted-foreground">A digital product.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            I approach every project as a complete product — combining visual
            quality, user experience, and technical excellence into something
            that actually works for your business.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/50 bg-card/30 p-8 transition-colors hover:border-border hover:bg-card/50"
            >
              <div className="mb-4 inline-flex rounded-xl border border-border/50 bg-secondary/50 p-3">
                <feature.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
