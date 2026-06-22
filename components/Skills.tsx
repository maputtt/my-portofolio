"use client";

import { 
  SiPhp, SiCodeigniter, SiLaravel, SiMysql, SiFlutter, 
  SiDart, SiWordpress, SiTailwindcss, SiJavascript, 
  SiTypescript, SiNextdotjs, SiVultr, SiCloudflare, SiLinux 
} from "react-icons/si";

export default function Skills() {
  // Data tech stack dari screenshot lu bray!
  const row1 = [
    { name: "PHP", icon: <SiPhp className="text-[#777BB4]" /> },
    { name: "CodeIgniter 3", icon: <SiCodeigniter className="text-[#EE4326]" /> },
    { name: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" /> },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
    { name: "WordPress", icon: <SiWordpress className="text-[#21759B]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
  ];

  const row2 = [
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E] text-slate-950" /> },
    { name: "Flutter", icon: <SiFlutter className="text-[#02569B]" /> },
    { name: "Dart", icon: <SiDart className="text-[#0175C2]" /> },
    { name: "VPS Linux", icon: <SiLinux className="text-[#FCC624]" /> },
    { name: "Vultr", icon: <SiVultr className="text-[#007BFF]" /> },
    { name: "Cloudflare", icon: <SiCloudflare className="text-[#F38020]" /> },
  ];

  // Kita gandakan array-nya biar jalannya nyambung terus tanpa putus
  const marqueeItems1 = [...row1, ...row1, ...row1];
  const marqueeItems2 = [...row2, ...row2, ...row2];

  return (
    // 1. FIX BACKGROUND SECTION: Diubah jadi transparan murni tanpa warna abu-abu penghalang grid
    <section id="skills" className="py-24 relative overflow-hidden w-full z-10">
      
      <div className="max-w-6xl mx-auto px-4 mb-12">
        {/* Teks Subtitle dipertajam ke teal-700 */}
        <span className="text-teal-700 font-mono text-sm font-bold tracking-widest block mb-2">// EXPERTISE</span>
        {/* Judul Utama disamakan jadi slate-900 hitam pekat */}
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
          Tech Stack &amp; Skillset
        </h2>
      </div>

      {/* AREA UTAMA LOOPING MARQUEE */}
      <div className="relative flex flex-col gap-6 w-full">
        
        {/* Masking Blur Kanan Kiri disesuaikan pudar ke warna mint background (#E6F4F1) */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#E6F4F1] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#E6F4F1] to-transparent z-10 pointer-events-none" />

        {/* BARIS 1: JALAN KE KIRI (Putih Kaca Bersih) */}
        <div className="flex overflow-hidden select-none w-full group">
          <div className="flex gap-4 pr-4 min-w-full shrink-0 animate-marquee-custom hover:[animation-play-state:paused]">
            {marqueeItems1.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 bg-white/75 border border-teal-200/50 px-6 py-3.5 rounded-xl text-slate-800 font-mono text-sm font-semibold shadow-sm hover:border-teal-400 hover:bg-white transition-all duration-300 backdrop-blur-md"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BARIS 2: JALAN REVERSE KE KANAN (Putih Kaca Bersih) */}
        <div className="flex overflow-hidden select-none w-full">
          <div className="flex gap-4 pr-4 min-w-full shrink-0 animate-marquee-reverse-custom hover:[animation-play-state:paused]">
            {marqueeItems2.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 bg-white/75 border border-teal-200/50 px-6 py-3.5 rounded-xl text-slate-800 font-mono text-sm font-semibold shadow-sm hover:border-teal-400 hover:bg-white transition-all duration-300 backdrop-blur-md"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}