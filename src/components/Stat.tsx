import { Card } from "@/components/ui/card";
import { BarChart, Link, QrCode, User2Icon } from "lucide-react";

const stats = [
  { icon: User2Icon, value: "10K+", label: "Trusted by many users worldwide" },
  { icon: Link, value: "12K+", label: "Shortened URLs Generated Monthly" },
  { icon: QrCode, value: "8K+", label: "QR Codes Generated Monthly" },
  { icon: BarChart, value: "50K+", label: "Total Interactions (clicks/scans) Monthly" },
];

export default function Stat() {
  return (
    <section className="py-16 sm:pb-20 px-6 text-center bg-gray-100 dark:bg-gray-900 mt-16">
      <h2 className="sm:text-[48px] text-[30px] font-bold mb-10 sm:mb-20 leading-tight">Relied on and celebrated by countless <br className="hidden sm:block" />users around the world</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 flex flex-col items-center shadow-md">
            <stat.icon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-4xl font-bold">{stat.value}</h3>
            <p className="text-lg text-gray-500 leading-tight mt-3">{stat.label}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
