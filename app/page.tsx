import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { Value } from "@/components/sections/value"
import { Services } from "@/components/sections/services"
import { Work } from "@/components/sections/work"
import { Process } from "@/components/sections/process"
import { About } from "@/components/sections/about"
import { FAQ } from "@/components/sections/faq"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Value />
        <Services />
        <Work />
        <Process />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
