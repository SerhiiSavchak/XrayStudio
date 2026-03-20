"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/lib/theme/context";
import { LocaleProvider } from "@/lib/i18n/context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
