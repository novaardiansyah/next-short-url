import Contact from "@/components/Contact";
import SnowParticles from "@/components/effect/SnowParticles";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar/Navbar";
import PricingPlan from "@/components/PricingPlan";
import ShortenAndQRCodeTabs from "@/components/ShortenUrl/ShortenUrl";
import Stat from "@/components/Stat";
import Testimonials from "@/components/Testimonials";
export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <SnowParticles amount={30} />
      <Navbar />
      <Hero  />
      <ShortenAndQRCodeTabs />
      <Stat />
      <Features />
      <PricingPlan />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
