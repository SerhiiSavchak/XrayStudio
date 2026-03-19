import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Nexus Agency",
    category: "Website Redesign",
    description: "Complete brand transformation for a creative agency. Modern visual identity with conversion-focused structure.",
    image: "/work/project-1.jpg",
    tags: ["Design", "Development", "CMS"],
  },
  {
    title: "Vertex Finance",
    category: "Website Development",
    description: "Premium website for a fintech startup. Clean, trustworthy aesthetic that builds credibility instantly.",
    image: "/work/project-2.jpg",
    tags: ["Strategy", "Design", "Development"],
  },
  {
    title: "Luna Studio",
    category: "Landing Page",
    description: "High-converting campaign page for a design studio launch. Bold visuals, clear messaging, strong results.",
    image: "/work/project-3.jpg",
    tags: ["Design", "Development", "Analytics"],
  },
]

export function Work() {
  return (
    <section id="work" className="relative border-t border-border/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Selected Work
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Projects that prove the approach
            </h2>
          </div>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Projects grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href="#"
              className="group block overflow-hidden rounded-2xl border border-border/50 bg-card/30 transition-all hover:border-border hover:bg-card/50"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-muted-foreground/30">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    View Project
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {project.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
