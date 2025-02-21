import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ShortenAndQRCodeTabs from "@/components/ShortenAndQRCodeTabs";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero  />
      <ShortenAndQRCodeTabs />
    </>
  );
}
