'use client';

import { projectsData } from "@/data/projects";
import { 
  SiPhp, 
  SiCodeigniter, 
  SiLaravel, 
  SiMysql, 
  SiWordpress, 
  SiTailwindcss, 
  SiJavascript, 
  SiBootstrap,
  SiCpanel,
  SiCloudflare,
  SiLinux,
  SiElementor
} from 'react-icons/si';
import { MdOutlineSecurity, MdSpeed } from 'react-icons/md'; // Untuk ikon tambahan server bray

// FUNGSI HELPER MAPPING STRING TECH KE ICON + WARNA ASLINYA BRAY
const getTechIcon = (techName: string) => {
  switch (techName.toLowerCase()) {
    case 'php':
      return <SiPhp className="text-[#777BB4]" />;
    case 'codeigniter':
      return <SiCodeigniter className="text-[#EE4323]" />;
    case 'laravel':
      return <SiLaravel className="text-[#FF2D20]" />;
    case 'mysql':
      return <SiMysql className="text-[#4479A1]" />;
    case 'wordpress':
      return <SiWordpress className="text-[#21759B]" />;
    case 'tailwind css':
      return <SiTailwindcss className="text-[#06B6D4]" />;
    case 'javascript':
      return <SiJavascript className="text-[#F7DF1E]" />;
    case 'bootstrap':
      return <SiBootstrap className="text-[#7952B3]" />;
    case 'cyberpanel':
      return <SiCpanel className="text-[#4C6EF5]" />;
    case 'cloudflare':
      return <SiCloudflare className="text-[#F38020]" />;
    case 'vps linux':
      return <SiLinux className="text-[#FCC624]" />;
    case 'elementor':
      return <SiElementor className="text-[#92003B]" />;
    case 'security redesign':
      return <MdOutlineSecurity className="text-[#2DD4BF]" />;
    case 'speed optimization':
      return <MdSpeed className="text-[#F59E0B]" />;
    default:
      return null;
  }
};

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-24 relative z-10">
      <p className="text-teal-400 font-mono text-sm mb-2">// MY WORK</p>
      <h2 className="text-3xl font-bold text-white mb-12">Featured Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <div key={project.id} className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-xl backdrop-blur-sm flex flex-col justify-between hover:border-teal-500/20 transition-all duration-300">
            <div>
              {/* Badge Kategori di Pojok Atas */}
              <span className="inline-block text-[10px] font-mono tracking-wider text-teal-400 uppercase bg-teal-500/10 px-2 py-0.5 rounded-md mb-3">
                {project.category}
              </span>
              
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{project.description}</p>
            </div>

            {/* MAPPING DARI ARRAY project.tech LU BRAY! */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((tName, tIdx) => (
                <span 
                  key={tIdx} 
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 text-slate-300 rounded-md text-xs border border-slate-800 hover:border-slate-700 transition-colors duration-200"
                >
                  <span className="text-sm flex-shrink-0">{getTechIcon(tName)}</span>
                  {tName}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}