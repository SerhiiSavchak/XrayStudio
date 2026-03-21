"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/lib/theme/context";
import { LocaleProvider } from "@/lib/i18n/context";
import { PageTransition } from "@/components/layout/page-transition";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <PageTransition>{children}</PageTransition>
      </LocaleProvider>
    </ThemeProvider>
  );
}
