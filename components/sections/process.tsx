const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, audience, and goals. What problem are we solving? What does success look like? This shapes everything that follows.",
  },
  {
    number: "02",
    title: "Strategy & Structure",
    description:
      "Before any design work, we map out the user journey and content structure. Clear hierarchy, logical flow, conversion paths that make sense.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Visual design that matches your positioning. Premium aesthetics, strong typography, and intentional spacing. Every element serves a purpose.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Clean, performant code built for the long term. Responsive on every device, fast loading, and easy to maintain or scale as needed.",
  },
  {
    number: "05",
    title: "Launch & Beyond",
    description:
      "Thorough testing, smooth deployment, and knowledge transfer. Your website goes live with confidence, and you know how to make it work for you.",
  },
]

export function Process() {
  return (
    <section id="process" className="relative border-t border-border/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Process
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            How we get there
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A systematic approach that balances creative exploration with
            practical execution. First the strategy, then the presentation, then
            the implementation.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-0 top-8 hidden h-px w-full bg-gradient-to-r from-border to-transparent lg:block" />
              )}

              <div className="relative">
                <span className="font-mono text-sm text-muted-foreground">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
