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
    const flakes: Flake[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Posisi awal horizontal (0 - 100%)
      top: Math.random() * 100, // Posisi awal vertikal (0 - 100%)
      duration: Math.random() * 12 + 6, // Durasi animasi antara 6-18 detik
      delay: Math.random() * 5, // Delay animasi acak
      size: Math.random() * 15 + 10, // Ukuran antara 10px - 25px
      xMovement: Math.random() * 200 - 100, // Gerakan horizontal lebih jauh (-100px hingga 100px)
      yMovement: Math.random() * 200 - 100, // Gerakan vertikal lebih jauh (-100px hingga 100px)
      rotationSpeed: Math.random() * 360, // Kecepatan putar (0 - 360 derajat)
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              x: [flake.left, flake.left + flake.xMovement, flake.left], 
              y: [flake.top, flake.top + flake.yMovement, flake.top], 
              rotate: [0, flake.rotationSpeed, 0], 
              opacity: [0, 1, 1, 0] // Muncul, tetap terang, lalu perlahan hilang
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
      <div className="h-screen flex items-center justify-center text-center flex-col px-36 relative z-10">
        <h1 className="text-[48px] font-bold mb-5">Turn clicks into connections</h1>
        <p className="text-[22px]">
          With our advanced URL shortener and QR codes, you can create smarter pathways to your content. <br />
          Track, optimize, and engage—effortlessly.
        </p>
      </div>
    </section>
  );
}
