"use client";

import { useState, useEffect } from "react";
import { Snowflake } from "lucide-react";
import { motion } from "framer-motion";

interface Flake {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  size: number;
  xMovement: number;
  yMovement: number;
  rotationSpeed: number;
}

export default function Hero() {
  const [snowflakes, setSnowflakes] = useState<Flake[]>([]);

  useEffect(() => {
    const flakes: Flake[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Posisi horizontal acak
      top: Math.random() * 80, // Spawn di atas viewport agar tidak hilang di mobile
      duration: Math.random() * 10 + 6, // Durasi animasi antara 6-16 detik
      delay: Math.random() * 5, // Delay animasi acak
      size: Math.random() * 15 + 10, // Ukuran partikel (10px - 25px)
      xMovement: Math.random() * 250 - 125, // Gerakan horizontal lebih luas (-125px sampai 125px)
      yMovement: Math.random() * 250 - 100, // Gerakan vertikal lebih jauh (-100px hingga 250px)
      rotationSpeed: Math.random() * 360, // Kecepatan putar acak (0 - 360 derajat)
    }));

    setSnowflakes(flakes);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Efek Partikel */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            className="absolute text-blue-300"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ 
              x: [flake.left, flake.left + flake.xMovement, flake.left], 
              y: [flake.top, flake.top + flake.yMovement, flake.top], 
              rotate: [0, flake.rotationSpeed, 0], 
              opacity: [0, 1, 1, 0] // Fade in, bertahan, lalu fade out
            }}
            transition={{
              duration: flake.duration,
              repeat: Infinity,
              delay: flake.delay,
              ease: "linear",
            }}
            style={{
              left: `${flake.left}%`,
              top: `${flake.top}%`,
              fontSize: `${flake.size}px`,
            }}
          >
            <Snowflake />
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="h-[80vh] flex items-center justify-center text-center flex-col px-4 sm:px-36 relative z-10">
        <h1 className="sm:text-[48px] text-[30px] font-bold mb-5">Turn clicks into connections</h1>
        <p className="sm:text-[22px] text-[18px]">
          With our advanced URL shortener and QR codes, you can create smarter pathways to your content. <br />
          Track, optimize, and engage—effortlessly.
        </p>
      </div>
    </section>
  );
}
