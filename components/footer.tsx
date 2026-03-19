import Link from "next/link"

const navigation = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

const social = [
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Dribbble", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-70"
            >
              xray.studio
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium web development for experts and brands who value quality.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Navigation
              </p>
              <ul className="mt-4 space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Connect
              </p>
              <ul className="mt-4 space-y-3">
                {social.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} xray.studio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with precision in mind.
          </p>
        </div>
      </div>
    </footer>
  )
}
