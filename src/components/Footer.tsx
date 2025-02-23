import { Card, CardContent } from "@/components/ui/card";
import { Github, XIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import ListMenu from "./Navbar/ListMenu";
import Link from "next/link";

export default function Footer() {
  const hoverText = 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'

  return (
    <footer className="py-10 flex justify-center px-3 pb-6">
      <Card className="w-full max-w-6xl shadow-md">
        <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Navigation */}
          <nav className="flex gap-6 text-sm font-medium">
            <ListMenu withIcon={false} />
          </nav>
          
          {/* Social Media */}
          <div className="flex gap-4">
            <Link href="https://web.facebook.com/Nova981/" target="_blank" className={hoverText}><FacebookIcon size={20} /></Link>
            <Link href="https://www.instagram.com/novaardiansyah._/" target="_blank" className={hoverText}><InstagramIcon size={20} /></Link>
            <Link href="https://www.linkedin.com/in/novaardiansyah/" target="_blank" className={hoverText}><LinkedinIcon size={20} /></Link>
            <Link href="https://github.com/novaardiansyah" target="_blank" className={hoverText}><Github size={20} /></Link>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} <Link href="#home" className={hoverText}>Nova Short URL</Link>. All rights reserved.</p>
        </CardContent>
      </Card>
    </footer>
  );
}
