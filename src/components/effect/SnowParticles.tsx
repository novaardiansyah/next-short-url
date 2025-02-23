'use client'

import React from 'react'
import { useState, useEffect } from "react";
import { Snowflake } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';
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

type Props = {
  amount: number;
  customClass?: string;
}

function SnowParticles({ amount, customClass }: Props) {
  const [snowflakes, setSnowflakes] = useState<Flake[]>([]);

  useEffect(() => {
    const flakes: Flake[] = Array.from({ length: amount }, (_, i) => ({
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
    <div className="absolute inset-0 pointer-events-none">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className={cn("absolute dark:text-blue-400 text-blue-300", customClass)}
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
  )
}

export default SnowParticles
