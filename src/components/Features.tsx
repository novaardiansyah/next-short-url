import { Card, CardContent } from "@/components/ui/card";
import { BarChart3Icon, LinkIcon, QrCodeIcon } from "lucide-react";

const features = [
  {
    icon: <LinkIcon size={40} className="text-blue-500" />,
    title: "Short Links",
    description: "Effortlessly shorten URLs to enhance sharing, and streamline your digital experience.",
  },
  {
    icon: <QrCodeIcon size={40} className="text-green-500" />,
    title: "QR Codes",
    description: "Quickly generate custom QR codes for effortless access to your links anytime, anywhere.",
  },
  {
    icon: <BarChart3Icon size={40} className="text-purple-500" />,
    title: "Analytics",
    description: "Gain valuable insights by tracking your link performance with comprehensive analytics.",
  },
];

export default function Features() {
  return (
    <section className="py-16 text-center px-6">
      <h2 className="sm:text-[48px] text-[30px] font-bold text-gray-800 dark:text-white mb-3 leading-tight">
        Advanced and Powerful Features
      </h2>
      <p className="sm:text-[20px] text-[16px] leading-tight text-gray-500 px-6 sm:px-0">Unlock a suite of robust tools designed to enhance link management, <br className="hidden sm:block" />improve tracking, and simplify sharing.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 sm:mt-18">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 flex flex-col items-center text-center shadow-md">
            {feature.icon}
            <CardContent>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-400 mt-2">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
