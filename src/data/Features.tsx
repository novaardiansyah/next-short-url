import { BarChart3Icon, LinkIcon, QrCodeIcon } from "lucide-react";

const features = [
  {
    icon: <LinkIcon size={40} className="text-cyan-500" />,
    title: "Short Links",
    description: "Effortlessly shorten URLs to enhance sharing, and streamline your digital experience.",
  },
  {
    icon: <QrCodeIcon size={40} className="text-red-500" />,
    title: "QR Codes",
    description: "Quickly generate custom QR codes for effortless access to your links anytime, anywhere.",
  },
  {
    icon: <BarChart3Icon size={40} className="text-blue-500" />,
    title: "Analytics",
    description: "Gain valuable insights by tracking your link performance with comprehensive analytics.",
  },
];

export { features}