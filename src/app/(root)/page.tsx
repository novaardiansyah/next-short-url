import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PricingPlan from "@/components/PricingPlan";
import ShortenAndQRCodeTabs from "@/components/ShortenAndQRCodeTabs";
import Stat from "@/components/Stat";
import Testimonials from "@/components/Testimonials";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero  />
      <ShortenAndQRCodeTabs />
      <Stat />
      <Features />
      <PricingPlan />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
