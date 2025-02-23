import { House, LayoutDashboard, CreditCard, PhoneCall } from "lucide-react";

const menus = [
  { title: 'Home', link: '#home', icon: <House size={18} /> },
  { title: 'Features', link: '#features', icon: <LayoutDashboard size={18} /> },
  { title: 'Pricing', link: '#pricing', icon: <CreditCard size={18} /> },
  { title: 'Contact', link: '#contact', icon: <PhoneCall size={18} /> },
]

export { menus }