import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export const LuxuryStudioBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating Showroom Dust Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize subtle showroom dust motes
    const particleCount = Math.min(45, Math.floor(width / 35));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.8, // 0.8px - 2.3px
        baseAlpha: Math.random() * 0.18 + 0.05, // 0.05 - 0.23 (barely visible)
        alpha: 0.1,
        vx: (Math.random() - 0.5) * 0.15, // Extremely slow drift
        vy: -Math.random() * 0.2 - 0.05, // Slow upward movement
        pulseSpeed: Math.random() * 0.008 + 0.002,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx + Math.sin(time * 0.005 + p.pulseOffset) * 0.08;
        p.y += p.vy;

        // Wrap boundaries smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Subtle alpha breathing
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.05;

        // Draw soft particle with radial gradient falloff
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        grad.addColorStop(0, `rgba(245, 245, 250, ${Math.max(0, p.alpha)})`);
        grad.addColorStop(1, 'rgba(245, 245, 250, 0)');

        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Base Layer: Carbon Fiber Texture (< 5% Opacity, notice upon close inspection) */}
      <div 
        className="absolute inset-0 bg-carbon opacity-[0.035] mix-blend-screen" 
        style={{ willChange: 'transform' }}
      />

      {/* 2. Premium Ambient Light Layer: Diffused Studio Lights */}
      {/* Primary Top Overhead Softbox Studio Light */}
      <motion.div
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-3%', '4%', '-3%'],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-[20%] left-[15%] w-[70vw] h-[60vh] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(250,250,255,0.12)_0%,rgba(210,215,225,0.03)_50%,transparent_75%)] blur-[90px]"
      />

      {/* Secondary Floor Ambient Highlight */}
      <motion.div
        animate={{
          x: ['4%', '-4%', '4%'],
          y: ['3%', '-2%', '3%'],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -bottom-[20%] right-[10%] w-[65vw] h-[55vh] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(240,240,245,0.09)_0%,rgba(190,195,205,0.02)_55%,transparent_80%)] blur-[100px]"
      />

      {/* 3. Metallic Reflections: Soft Titanium / Aluminum Sheen Sweeps */}
      <motion.div
        animate={{
          x: ['-100%', '200%']
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatDelay: 12,
          ease: 'linear'
        }}
        className="absolute -inset-y-1/2 w-[35vw] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transform rotate-[28deg] mix-blend-overlay blur-[20px]"
      />

      {/* 4. Floating Dust Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* 5. Soft Volumetric Fog / Haze around Viewport Edges */}
      <motion.div
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.6, 0.85, 0.6]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_50%,rgba(5,5,5,0.4)_85%,rgba(0,0,0,0.85)_100%)]"
      />

      {/* 6. Premium Film Grain Noise Texture (< 3% Opacity) */}
      <div className="absolute inset-0 opacity-[0.022] mix-blend-overlay pointer-events-none">
        <svg className="w-full h-full">
          <filter id="studioGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#studioGrain)" />
        </svg>
      </div>

    </div>
  );
};
