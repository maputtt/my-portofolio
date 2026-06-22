'use client';

import { useState } from "react";
import { projectsData } from "@/data/projects";
// 1. IMPORT TILT NYA DI SINI BRAY
import Tilt from "react-parallax-tilt"; 
import { 
  SiPhp, SiCodeigniter, SiLaravel, SiMysql, SiWordpress, 
  SiTailwindcss, SiJavascript, SiBootstrap, SiCpanel, 
  SiCloudflare, SiLinux, SiElementor
} from 'react-icons/si';
import { MdOutlineSecurity, MdSpeed } from 'react-icons/md';

const getTechIcon = (techName: string) => {
  switch (techName.toLowerCase()) {
    case 'php': return <SiPhp className="text-[#777BB4]" />;
    case 'codeigniter': return <SiCodeigniter className="text-[#EE4323]" />;
    case 'laravel': return <SiLaravel className="text-[#FF2D20]" />;
    case 'mysql': return <SiMysql className="text-[#4479A1]" />;
    case 'wordpress': return <SiWordpress className="text-[#21759B]" />;
    case 'tailwind css': return <SiTailwindcss className="text-[#06B6D4]" />;
    case 'javascript': return <SiJavascript className="text-[#F7DF1E]" />;
    case 'bootstrap': return <SiBootstrap className="text-[#7952B3]" />;
    case 'cpanel': return <SiCpanel className="text-[#4C6EF5]" />;
    case 'cloudflare': return <SiCloudflare className="text-[#F38020]" />;
    case 'vps linux': return <SiLinux className="text-[#FCC624]" />;
    case 'elementor': return <SiElementor className="text-[#92003B]" />;
    case 'security redesign': return <MdOutlineSecurity className="text-[#2DD4BF]" />;
    case 'speed optimization': return <MdSpeed className="text-[#F59E0B]" />;
    default: return null;
  }
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Web App', 'Security & Server', 'WordPress'];

  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-24 relative z-10">
      {/* Label Kategori Kerja: Dipertegas ke teal-700 biar terbaca jelas */}
      <p className="text-teal-700 font-mono text-sm font-bold mb-2">// MY WORK</p>
      
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
        {/* Judul Utama: Diubah jadi slate-900 biar hitam pekat premium */}
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Featured Projects</h2>
        
        {/* CONTAINER TOMBOL FILTER KATEGORI (Ubah jadi Putih-Mint Glass) */}
        <div className="flex flex-wrap gap-2 bg-white/60 p-1.5 border border-teal-200/60 rounded-xl backdrop-blur-md self-start md:self-auto shadow-sm">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* GRID CONTAINER NYA BRAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px] items-start">
        {filteredProjects.map((project) => (
          <Tilt 
            key={project.id}
            tiltMaxAngleX={8}       // Dikurangin dikit biar efek miring 3D-nya gak terlalu liar
            tiltMaxAngleY={8}       
            perspective={1200}      
            scale={1.02}            
            transitionSpeed={600}   
            className="h-full"      
          >
            {/* CARD PROYEK: Rombak total jadi Putih Kaca Transparan (Glassmorphism) */}
            <div className="p-7 bg-white/75 border border-teal-200/50 rounded-2xl backdrop-blur-md flex flex-col justify-between hover:border-teal-400 hover:bg-white/90 shadow-md hover:shadow-xl transition-all duration-300 h-full cursor-pointer select-none">
              
              <div>
                {/* Badge Kategori Project */}
                <span className="inline-block text-[10px] font-mono font-bold tracking-wider text-teal-700 uppercase bg-teal-600/10 border border-teal-200/40 px-2.5 py-1 rounded-md mb-4">
                  {project.category}
                </span>
                
                {/* Judul Proyek: Slate-900 biar tajam */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                  {project.title}
                </h3>
                
                {/* Deskripsi Proyek: Teks Slate-600 adem tapi super jelas dibaca */}
                <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              {/* BADGES TECH STACK DI BAGIAN BAWAH CARD */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tName, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="flex items-center gap-1.5 px-3 py-1 bg-white text-slate-800 rounded-lg text-xs font-semibold border border-teal-200/60 shadow-sm hover:border-teal-400 transition-all duration-200"
                  >
                    <span className="text-sm flex-shrink-0">{getTechIcon(tName)}</span>
                    {tName}
                  </span>
                ))}
              </div>

            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}