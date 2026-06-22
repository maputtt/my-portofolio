'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase, FolderGit2, Home, Mail, FileDown} from 'lucide-react';
import { useRef } from 'react';

// Data menu navigasi lu bray, sekalian CV diselipin di sini
const links = [
  { title: 'Home', icon: <Home className="h-full w-full" />, href: '#' },
  { title: 'Skills', icon: <Briefcase className="h-full w-full" />, href: '#skills' },
  { title: 'Projects', icon: <FolderGit2 className="h-full w-full" />, href: '#projects' },
  
  // ─── ICON GITHUB (SVG MURNI ANTI ERROR) ───
  { 
    title: 'GitHub', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ), 
    href: 'https://github.com/maputtt', // Link github lu udah bener bray!
    target: '_blank' 
  },
  
  // ─── ICON LINKEDIN (SVG MURNI ANTI ERROR) ───
  { 
    title: 'LinkedIn', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ), 
    href: 'https://www.linkedin.com/in/mahfudzabdulloh', // Link linkedin lu udah mantap!
    target: '_blank'
  },
  
  { title: 'Contact', icon: <Mail className="h-full w-full" />, href: '#contact' },
  { 
    title: 'Download CV', 
    icon: <FileDown className="h-full w-full text-teal-600" />, 
    href: '/CV_Mahfudz Abdulloh.pdf',
    download: 'CV_Mahfudz Abdulloh.pdf' 
  },
];

export default function FloatingDock() {
  let mouseX = useMotionValue(Infinity);

  return (
    // Posisikan melayang kaku (fixed) di bawah tengah layar bray
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-4 bg-white/70 border border-teal-200/50 px-4 pb-3 rounded-2xl backdrop-blur-md shadow-lg shadow-teal-600/5"
      >
        {links.map((link) => (
          <IconContainer mouseX={mouseX} key={link.title} {...link} />
        ))}
      </motion.div>
    </div>
  );
}

function IconContainer({ mouseX, title, icon, href, download }: any) {
  let ref = useRef<HTMLDivElement>(null);

  // Perhitungan rumus fisika pegas biar pas di-hover ikon terdekat ikut membesar smooth
  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <a href={href} download={download} className="relative group">
      {/* Tooltip teks kecil di atas ikon pas di-hover */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-slate-900 text-white text-[10px] font-bold font-mono px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-md pointer-events-none">
        {title}
      </div>

      <motion.div
        ref={ref}
        style={{ width, height }}
        className="flex items-center justify-center rounded-xl bg-white/90 border border-teal-100 text-slate-700 hover:text-teal-600 hover:border-teal-400 shadow-sm transition-colors"
      >
        <div className="h-5 w-5 flex items-center justify-center shrink-0">
          {icon}
        </div>
      </motion.div>
    </a>
  );
}