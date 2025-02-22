import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
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
      <Testimonials />
    </>
  );
}
