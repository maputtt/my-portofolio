import dynamic from "next/dynamic";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import Projects from "@/components/Projects";
import Lanyard from "@/components/Lanyard";
import Particles from "@/components/Particles";

// KITA BERSIHIN DI SINI BRAY! Cukup panggil satu lanyard aja dengan koordinat yang pas!
function LanyardScene() {
  return (
    <Lanyard 
      position={[0, 0, 9.0]} // Majuin kamera dari 5.5 ke 4.0 biar objeknya keliatan lebih BESAR bray!
      gravity={[0, -45, 0]} 
      fov={30}               // Fov tetep 30 biar perspektif 3D-nya cakep
      lanyardWidth={1}    // Gedein dikit lebar talinya dari 0.06 ke 0.07 biar imbang sama ukuran kartunya
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* BACKGROUND GLOBAL: Bikin grid kotak-kotak ini mutlak membungkus seluruh main body dari atas sampai bawah bray */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none z-0" />

      {/* 2. PASANG PARTICLES DI SINI BRAY (Di bawah grid halus) */}
      <Particles particleCount={100} particleColor="#2dd4bf" speed={0.4} />

      {/* 1. HERO SECTION */}
      <section className="relative max-w-6xl mx-auto min-h-screen px-4 overflow-visible flex items-center z-10">
        {/* Glowing Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse duration-[6000ms]" />
        
        {/* Grid Container: Membagi Kiri (Teks) dan Kanan (Lanyard 3D) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center py-12">
          
          {/* SISI KIRI: Teks Perkenalan Lu */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <Reveal>
              <p className="text-teal-400 font-mono text-sm sm:text-base mb-4 tracking-widest uppercase">
                // Available for Professional Projects
              </p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                Mahfudz Abdulloh
              </h1>
            </Reveal>

            <Reveal delay={0.4}>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-400 mb-6 font-mono">
                Full-Stack & Software Engineer
              </h2>
            </Reveal>

            <Reveal delay={0.6}>
              <p className="max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed mb-10">
                Strategic Full-stack Developer & Software Engineer with nearly 2 years
                of experience in building scalable web applications and managing secure
                cloud infrastructures. Specialized in Security Hardening and Disaster
                Recovery, with a proven track record of restoring enterprise systems from
                critical malware attacks and re-architecting server environments using
                VPS Isolation (Vultr & Rumahweb). Expert in optimizing performance
                via Cloudflare and streamlining operations with CyberPanel/WHM. I
                bring a unique hybrid of coding proficiency in CI3/WordPress and a
                proactive monitoring mindset to ensure long-term system stability and
                seamless digital operations. 
              </p>
            </Reveal>
            
            <Reveal delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="#projects" className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-xl shadow-teal-500/20 transform hover:-translate-y-1 text-center">
                  View Project
                </a>
                <a href="#contact" className="px-8 py-3.5 border border-slate-800 hover:border-teal-500 text-slate-300 hover:text-teal-400 font-semibold rounded-xl transition-all duration-300 bg-slate-900/40 backdrop-blur-sm transform hover:-translate-y-1 text-center">
                  Contact Me
                </a>
              </div>
            </Reveal>
          </div>

          {/* SISI KANAN: Tempat Lanyard Canvas 3D */}
          <div className="md:col-span-5 w-full h-[550px] sm:h-[650px] flex items-center justify-center relative overflow-visible z-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[70px] pointer-events-none" />
            
            {/* Gunakan -top-16 atau -top-20 supaya kotak canvas-nya naik mentok sampai bawah navbar/top bar bray */}
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

    </main>
  );
}