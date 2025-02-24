"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ModeToggle } from "../ModeToggle";
import ListMenu from "./ListMenu";
import AuthButtons from "./AuthButtons";

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

  const hideOnMobileClick = () => {
    setIsOpen(false);
  };

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
        <ListMenu />
      </div>

      {/* Kanan - Tombol Mode Toggle & Masuk (Desktop) */}
      <div className="hidden md:flex gap-4 items-center">
        <ModeToggle />
        <AuthButtons />
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
          "fixed top-16 left-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-lg transition-all duration-300 flex flex-col gap-6 p-6",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <ListMenu hideOnMobileClick={hideOnMobileClick} />
        <AuthButtons customClass="mt-1" />
      </div>
    </nav>
  );
}
