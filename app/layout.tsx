import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Serhii Savchak — Premium Web Development",
    template: "%s | Serhii Savchak",
  },
  description:
    "Product-minded web developer creating premium websites for experts, personal brands, and service businesses. Strong visual presentation, thoughtful structure, and production-ready implementation.",
  keywords: [
    "web developer",
    "premium websites",
    "frontend development",
    "landing pages",
    "business websites",
    "portfolio websites",
    "Ukraine",
  ],
  authors: [{ name: "Serhii Savchak" }],
  creator: "Serhii Savchak",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    alternateLocale: ["ru_RU", "en_US"],
    siteName: "Serhii Savchak",
    title: "Serhii Savchak — Premium Web Development",
    description:
      "Product-minded web developer creating premium websites for experts, personal brands, and service businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serhii Savchak — Premium Web Development",
    description:
      "Product-minded web developer creating premium websites for experts, personal brands, and service businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#060608" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var resolved = theme === 'light' ? 'light' : (theme === 'dark' ? 'dark' : (systemDark ? 'dark' : 'light'));
                  document.documentElement.classList.add(resolved);
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] font-sans antialiased overflow-x-hidden">
        <Providers>
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
