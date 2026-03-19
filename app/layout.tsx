import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
  ],
  authors: [{ name: "Serhii Savchak" }],
  creator: "Serhii Savchak",
  openGraph: {
    type: "website",
    locale: "en_US",
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
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
