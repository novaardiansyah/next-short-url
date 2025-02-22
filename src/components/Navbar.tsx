"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, House, LayoutDashboard, CreditCard, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300 z-50 text-black dark:text-white",
        isScrolled ? "dark:bg-black/90 backdrop-blur-md shadow-md" : "dark:bg-black"
      )}
    >
      {/* Kiri - Logo */}
      <div className="flex items-center">
        <h1 className="text-[18px] sm:text-2xl font-bold">Nova Short URL</h1>
      </div>

      {/* Tengah - Navigasi (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-10">
        <Link href="/" className="dark:text-gray-200 flex items-center gap-2">
          <House size={18} /> Home
        </Link>
        <Link href="/features" className="dark:text-gray-400 text-gray-500 flex items-center gap-2">
          <LayoutDashboard size={18} /> Features
        </Link>
        <Link href="/pricing" className="dark:text-gray-400 text-gray-500 flex items-center gap-2">
          <CreditCard size={18} /> Pricing
        </Link>
        <Link href="/contact" className="dark:text-gray-400 text-gray-500 flex items-center gap-2">
          <PhoneCall size={18} /> Contact
        </Link>
      </div>

      {/* Kanan - Tombol Mode Toggle & Masuk (Desktop) */}
      <div className="hidden md:flex gap-4 items-center">
        <ModeToggle />
        <Button variant="outline">Log in</Button>
        <Button>Sign Up for free</Button>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden flex items-center justify-end gap-2">
        <ModeToggle  />

        <button
          className="text-black dark:text-white "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      <div
        className={clsx(
          "fixed top-16 left-0 w-full bg-black/90 backdrop-blur-lg transition-all duration-300 flex flex-col gap-6 p-6",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <Link href="/" className="text-gray-200 flex items-center gap-2">
          <House size={18} /> Home
        </Link>
        <Link href="/features" className="text-gray-400 flex items-center gap-2">
          <LayoutDashboard size={18} /> Features
        </Link>
        <Link href="/pricing" className="text-gray-400 flex items-center gap-2">
          <CreditCard size={18} /> Pricing
        </Link>
        <Link href="/contact" className="text-gray-400 flex items-center gap-2">
          <PhoneCall size={18} /> Contact
        </Link>
        <Button className="mt-4">Masuk</Button>
        <Button variant="secondary">Daftar</Button>
      </div>
    </nav>
  );
}
