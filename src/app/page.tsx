import { fetchPackages } from "./queries"
import { Navbar } from "./components/navbar"
import { Hero } from "./components/hero"
import { Portfolio } from "./components/portfolio"
import { About } from "./components/about"
import { Services } from "./components/services"
import { WhyUs } from "./components/why-us"
import { Faq } from "./components/faq"
import { CtaBanner } from "./components/cta-banner"
import { Footer } from "./components/footer"

export default async function HomePage() {
  const packages = await fetchPackages()

  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Portfolio />
      <About />
      <Services packages={packages} />
      <WhyUs />
      <Faq />
      <CtaBanner />
      <Footer />
    </main>
  )
}
