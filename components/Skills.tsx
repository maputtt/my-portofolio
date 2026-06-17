'use client';

// 1. IMPORT ICON DARI REACT-ICONS BRAY
import { 
  SiPhp, 
  SiCodeigniter, 
  SiLaravel, 
  SiMysql,
  SiFlutter,
  SiDart, 
  SiLinux, 
  SiCpanel,
  SiVultr, 
  SiCloudflare, 
  SiWordpress, 
  SiTailwindcss, 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs,
  SiGooglecloud 
} from 'react-icons/si';

export default function Skills() {
  // 2. KITA TAMBAHIN MAPPING ICON & WARNA NYA DI SINI BRAY
  const skillCategories = [
    {
      title: "Backend Development",
      skills: [
        { name: "PHP", icon: <SiPhp className="text-[#777BB4]" /> },
        { name: "CodeIgniter 3", icon: <SiCodeigniter className="text-[#EE4323]" /> },
        { name: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" /> },
        { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
        { name: "Flutter", icon: <SiFlutter className="text-[#4479A1]" /> },
        { name: "Dart", icon: <SiDart className="text-[#4479A1]" /> }
      ]
    },
    {
      title: "Server & Security",
      skills: [
        { name: "VPS Linux", icon: <SiLinux className="text-[#FCC624]" /> },
        { name: "Cpanel", icon: <SiCpanel className="text-[#4C6EF5]" /> },
        { name: "Vultr", icon: <SiVultr className="text-[#4479A1]" /> }, // <--- Panggil SiCpanel
        { name: "Cloudflare", icon: <SiCloudflare className="text-[#F38020]" /> },
        { name: "Server Hardening", icon: <SiGooglecloud className="text-[#2DD4BF]" /> } // <--- Panggil SiGooglecloud
      ]
    },
    {
      title: "Frontend & CMS",
      skills: [
        { name: "WordPress", icon: <SiWordpress className="text-[#21759B]" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-white" /> }
      ]
    }
  ];

  return (
    <section id="skills" className="max-w-6xl mx-auto px-4 py-24 relative z-10">
      <p className="text-teal-400 font-mono text-sm mb-2">// EXPERTISE</p>
      <h2 className="text-3xl font-bold text-white mb-12">Tech Stack & Skillset</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-xl backdrop-blur-sm hover:border-teal-500/30 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-teal-400 mb-5">{category.title}</h3>
            
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 text-slate-300 rounded-md text-sm border border-slate-800 hover:border-slate-700 transition-all duration-200"
                >
                  {/* PANGGIL ICON NYA DI SINI BRAY */}
                  <span className="text-base flex-shrink-0">{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}