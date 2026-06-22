"use client";

import dynamic from "next/dynamic";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import Projects from "@/components/Projects";
import Lanyard from "@/components/Lanyard";
import Particles from "@/components/Particles";
import CommandMenu from "@/components/CommandMenu";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatusTicker from "@/components/StatusTicker";
import RotatingText from "@/components/RotatingText";
import FloatingDock from "@/components/FloatingDock";


// Cukup panggil satu lanyard aja dengan koordinat yang pas!
function LanyardScene() {
  return (
    <Lanyard 
      position={[0, 0, 9.0]} // Majuin kamera biar objeknya keliatan pas bray!
      gravity={[0, -45, 0]} 
      fov={30}               // Fov tetep 30 biar perspektif 3D-nya cakep
      lanyardWidth={1}       // Ketebalan tali
    />
  );
}

export default function Home() {
  
  const roles = ["Full-Stack", "Software", "System"];
  
  const paragraphs = [
    "Strategic Full-stack Developer & Software Engineer with nearly 2 years of experience in building scalable web applications and managing secure cloud infrastructures.",
    "Specialized in Security Hardening and Disaster Recovery, with a proven track record of restoring enterprise systems from critical malware attacks.",
    "Expert in optimizing server environments using VPS Isolation (Vultr & Rumahweb), Cloudflare performance, and streamlining operations with CyberPanel/WHM."
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % paragraphs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paragraphs.length]);

  return (
  <main className="min-h-screen bg-[#E6F4F1] text-slate-900 font-sans relative overflow-x-hidden">
    
    {/* ─── 1. FIX GRID NYALA & PARTIKEL RAMAI ─── */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      
      {/* Grid dibikin warna teal agak tebel (#99f6e4) dan opacity dinaikin ke 90% biar keliatan tegas bray! */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#b2f5ea_1.5px,transparent_1px),linear-gradient(to_bottom,#b2f5ea_1.5px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_70%,transparent_100%)] opacity-90" />
      
      {/* Lampu glow background tipis di belakang biar ada dimensinya */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-300/30 rounded-full blur-[130px]" />
      
      {/* Jumlah partikel kita bom jadi 180 (dari 80) biar ramai, warnanya pake Teal Tua (#0f766e) biar kontras */}
      <Particles
        particleCount={500} 
        particleColor="#0f766e" 
        particleSize={2} 
        speed={1} 
      />
    </div>
    
    {/* HERO SECTION */}
    <section className="relative max-w-6xl mx-auto min-h-screen px-4 flex items-center z-10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full py-12">
        
        {/* SISI KIRI: TEXT DESKRIPSI */}
        <div className="md:col-span-7 z-30">
          <StatusTicker />
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-2 tracking-tight">
            Mahfudz Abdulloh
          </h1>

          {/* ─── 2. FIX TEKS YANG KETIMPA / PUDAR ─── */}
          {/* Warna teks statis belakang kita ganti ke text-slate-900 biar item pekat kontras, gak ketimpa warna putih mint */}
          <div className="text-xl md:text-2xl font-bold mb-4 md:mb-6 font-mono flex items-baseline gap-x-2">
            <span className="text-teal-600">
              <RotatingText texts={roles} duration={3000} />
            </span>
            <span className="text-slate-900"> 
              &amp; Engineer
            </span>
          </div>

          {/* Kotak Deskripsi Paragraf (Kita tebelin juga ke text-slate-700 biar enak dibaca) */}
          <div className="min-h-[140px] md:min-h-[110px] block relative w-full mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-slate-700 text-sm md:text-base font-medium leading-relaxed"
              >
                {paragraphs[currentText]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Tombol CTA */}
          <div className="flex gap-4">
            <button 
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-teal-600 text-white font-bold font-mono text-xs px-6 py-3 rounded-lg hover:bg-teal-500 transition-all shadow-lg shadow-teal-600/20"
            >
              LET'S TALK 🚀
            </button>
          </div>
        </div>

          {/* SISI KANAN: LANYARD 3D CANVAS (Makan 5 Kolom dari 12) */}
          <div className="md:col-span-5 w-full h-[500px] md:h-[650px] flex items-center justify-center relative overflow-visible z-20">
            {/* Glow effect di belakang Lanyard */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-teal-500/5 rounded-full blur-[70px] pointer-events-none" />
            
            {/* Box Canvas Box dengan margin negatif aman */}
            <div className="absolute -top-22 bottom-0 left-0 right-0 w-full block overflow-visible">
              <LanyardScene />
            </div>
          </div>

        </div>
      </section>

      {/* 2. SKILLS SECTION */}
      <Reveal>
        <Skills />
      </Reveal>

      {/* 3. PROJECTS SECTION */}
      <Projects />

      {/* 4. CONTACT SECTION */}
      <Reveal>
        <Contact />
      </Reveal>
      
      {/* GLOBAL COMMAND MENU */}
      <CommandMenu />
      {/* ─── 5. DISUNTIK DI SINI BRAY MINTA DI PANGGILNYA MALEK ─── */}
      <FloatingDock />

    </main>
  );
}