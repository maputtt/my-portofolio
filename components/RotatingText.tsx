"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  duration?: number;
}

export default function RotatingText({ texts, duration = 2500 }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, duration);
    return () => clearInterval(timer);
  }, [texts, duration]);

  return (
    // Gunakan inline-flex dengan layout grid agar lebar span luar 
    // otomatis melebar/mengecil mengikuti teks di dalamnya secara dinamis bray!
    <span className="inline-grid grid-cols-1 grid-rows-1 overflow-hidden h-[32px] md:h-[40px] vertical-align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="col-start-1 row-start-1 text-teal-400 font-bold font-mono whitespace-nowrap"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}