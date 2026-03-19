import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function CTA() {
  return (
    <section
      id="contact"
      className="relative border-t border-border/50 py-24 lg:py-32"
    >
      {/* Subtle gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,hsl(var(--muted)/0.2),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Ready to Start?
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Let's discuss your project and see if we're a good fit
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          You don't need a detailed brief. Start with what you have — a rough
          idea, a challenge you're facing, or a goal you want to reach. We'll
          figure out the right approach together.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="mailto:hello@xray.studio"
            className={cn(
              "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground",
              "transition-all hover:bg-primary/90 hover:gap-3"
            )}
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="text-sm text-muted-foreground">
            or email{" "}
            <a
              href="mailto:hello@xray.studio"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              hello@xray.studio
            </a>
          </span>
        </div>

        {/* Trust elements */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Currently accepting projects</span>
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <span className="hidden sm:block">Response within 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  )
}
