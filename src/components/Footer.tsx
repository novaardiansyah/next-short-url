import { Card, CardContent } from "@/components/ui/card";
import { Github, XIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import ListMenu from "./Navbar/ListMenu";

export default function Footer() {
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
            <a href="#" className="hover:text-blue-500"><FacebookIcon size={20} /></a>
            <a href="#" className="hover:text-blue-500"><XIcon size={20} /></a>
            <a href="#" className="hover:text-blue-500"><InstagramIcon size={20} /></a>
            <a href="#" className="hover:text-blue-500"><LinkedinIcon size={20} /></a>
            <a href="#" className="hover:text-blue-500"><Github size={20} /></a>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Nova Short URL. All rights reserved.</p>
        </CardContent>
      </Card>
    </footer>
  );
}
