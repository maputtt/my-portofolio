'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { MdOutlineMail, MdFolderSpecial, MdPsychology } from 'react-icons/md';

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // 1. LISTEN SHORTCUT KEYBOARD BRAY
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 2. DAFTAR NAVIGASI & AKSES CEPAT
  const menuItems = [
    {
      label: "Go to Featured Projects",
      icon: <MdFolderSpecial className="text-teal-400" />,
      action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }
    },
    {
      label: "Go to Tech Stack & Skills",
      icon: <MdPsychology className="text-teal-400" />,
      action: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }
    },
    {
      label: "Connect on LinkedIn",
      icon: <FaLinkedin className="text-[#0A66C2]" />,
      action: () => window.open('https://www.linkedin.com/in/mahfudzabdulloh/', '_blank')
    },
    {
      label: "Check GitHub Profile",
      icon: <SiGithub className="text-white" />,
      action: () => window.open('https://github.com/maputtt', '_blank')
    },
    {
      label: "Send an Email Directly",
      icon: <MdOutlineMail className="text-amber-400" />,
      action: () => window.open('mailto:mahfudzabdulloh21@gmil.com', '_blank')
    },
  ];

  return (
    <>
      {/* BADGE PETUNJUK KECIL DI POJOK ATAS BRAY */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg backdrop-blur-sm text-xs font-mono text-slate-400 select-none pointer-events-none">
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 bg-slate-950 border border-slate-700 rounded text-[10px] text-white">Ctrl</kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 bg-slate-950 border border-slate-700 rounded text-[10px] text-white">K</kbd>
      </div>

      {/* OVERLAY & MODAL POP-UP */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Kotak Menu Utama */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Fake Input Search Bar */}
              <div className="p-4 border-b border-slate-800 bg-slate-950/40">
                <input
                  type="text"
                  placeholder="Type a command or navigate..."
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none font-mono"
                  autoFocus
                />
              </div>

              {/* List Menu-nya bray */}
              <div className="p-2 max-h-72 overflow-y-auto font-sans">
                <p className="px-3 py-1.5 text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase">
                  Navigation & Links
                </p>
                
                <div className="space-y-0.5">
                  {menuItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all text-sm font-medium text-left group"
                    >
                      <span className="text-lg flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      <span className="text-[10px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
                        ↵ Jump
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Modal */}
              <div className="p-3 border-t border-slate-800 bg-slate-950/20 flex justify-between items-center text-[10px] font-mono text-slate-500 px-4">
                <span>Use mouse or shortcuts</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}