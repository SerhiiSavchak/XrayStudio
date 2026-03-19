import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-24 lg:py-32", className)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ 
  label, 
  title, 
  description, 
  className,
  align = "left" 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "max-w-3xl",
      align === "center" && "mx-auto text-center",
      className
    )}>
      {label && (
        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
