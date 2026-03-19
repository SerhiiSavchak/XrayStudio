import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--muted)/0.3),transparent)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
        {/* Status badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for new projects
        </div>

        {/* Main headline */}
        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Modern websites that look{" "}
          <span className="text-muted-foreground">premium</span> and{" "}
          <span className="text-muted-foreground">perform</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          I create websites for experts, service businesses, and brands who need
          more than just a template. Strong visual presentation, thoughtful
          structure, and production-ready code.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="#work"
            className={cn(
              "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground",
              "transition-all hover:bg-primary/90 hover:gap-3"
            )}
          >
            View Selected Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#contact"
            className={cn(
              "inline-flex h-12 items-center justify-center rounded-full border border-border bg-transparent px-6 text-sm font-medium",
              "transition-colors hover:bg-secondary"
            )}
          >
            Start a Project
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 flex flex-col items-center gap-4 text-sm text-muted-foreground">
          <p>Trusted by forward-thinking brands</p>
          <div className="flex items-center gap-8 opacity-50">
            <span className="font-medium tracking-wide">BRAND</span>
            <span className="font-medium tracking-wide">STUDIO</span>
            <span className="font-medium tracking-wide">AGENCY</span>
            <span className="font-medium tracking-wide">COMPANY</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
