import About from "@/components/About"
import Footer from "@/components/Footer"
import FooterHero from "@/components/FooterHero"
import Hero from "@/components/Hero"
import Models from "@/components/Models"
import Navigation from "@/components/Navigation"
import Whyus from "@/components/Whyus"

export default function Home() {
  return (
    <>
      <div className="root">
        <Navigation />
        <Hero />
        <About />
        <Models />
        <Whyus />
        <FooterHero />
        <Footer /> 
      </div>
    </>
  );
}
