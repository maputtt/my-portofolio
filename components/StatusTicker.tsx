'use client';

export default function StatusTicker() {
  return (
    <div className="flex items-center gap-2.5 mb-4 select-none">
      {/* Efek Lingkaran Ijo Berkedip (Ping Animation) */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
      </span>
      
      {/* Teks Status */}
      <span className="text-teal-400 font-mono text-xs md:text-sm tracking-wider font-semibold uppercase">
        AVAILABLE FOR PROFESSIONAL PROJECTS
      </span>
    </div>
  );
}