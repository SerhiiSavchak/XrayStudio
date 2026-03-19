import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Xray Studio — Premium Web Development",
  description:
    "I create modern websites with strong visual presentation, thoughtful structure, and production-ready implementation. For experts, service businesses, and brands who need more than just a template.",
  keywords: [
    "web developer",
    "premium websites",
    "modern web development",
    "landing pages",
    "web design",
    "frontend development",
  ],
  authors: [{ name: "Xray Studio" }],
  openGraph: {
    title: "Xray Studio — Premium Web Development",
    description:
      "Modern websites with strong visual presentation, thoughtful structure, and production-ready implementation.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
