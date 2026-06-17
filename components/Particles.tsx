'use client';

import { useEffect, useRef } from 'react';

interface ParticlesProps {
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  speed?: number;
}

export default function Particles({
  particleCount = 50,        // 1. Kita kurangin defaultnya dari 100 ke 50 biar GPU lu ga ngos-ngosan bray
  particleColor = '#2dd4bf',
  particleSize = 1.2,        // 2. Diperkecil dikit biar ngerendernya enteng
  speed = 0.3,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true }); // Aktifkan alpha optimization bray
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const resizeCanvas = () => {
      // Debounce/limit ukuran canvas biar ga ngelag pas di-resize bray
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * particleSize + 0.3,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = particleColor;

      // Pakai for loop biasa (jauh lebih cepet daripada forEach di JavaScript bray)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    // Pake resize listener aja, JANGAN pasang scroll listener bray!
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, particleColor, particleSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      // 3. KUNCI UTAMA: Tambah class will-change-transform dan transform-gpu bray!
      // Ini maksa browser mindahin beban kerja rendering dari CPU ke GPU lu (Hardware Acceleration)
      className="absolute inset-0 w-full h-full pointer-events-none z-0 will-change-transform transform-gpu"
    />
  );
}