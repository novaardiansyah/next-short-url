"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { CreditCardIcon, HouseIcon, LayoutDashboardIcon, PhoneCallIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full flex justify-between items-center transition-all duration-300 z-50 py-4 px-10",
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-black"
      )}
    >
      {/* Kiri - Logo */}
      <div className="flex">
        <h1 className="text-2xl font-bold">Nova Short URL</h1>
      </div>

      {/* Tengah - Navigasi */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10">
        <Link href="/" className="text-gray-200 flex items-center gap-2"> 
          <HouseIcon /> Home
        </Link>

        <Link href="/features" className="text-gray-400 flex items-center gap-2">
          <LayoutDashboardIcon /> Features
        </Link>

        <Link href="/pricing" className="text-gray-400 flex items-center gap-2">
          <CreditCardIcon /> Pricing
        </Link>

        <Link href="/contact" className="text-gray-400 flex items-center gap-2">
          <PhoneCallIcon /> Contact
        </Link>
      </div>

      {/* Kanan - Mode Toggle & Tombol Masuk */}
      <div className="flex gap-4 items-center">
        <Button>Masuk</Button>
        <Button variant="secondary">Daftar</Button>
      </div>
    </div>
  );
}
