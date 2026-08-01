import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { HERO_SLIDES } from '../data/novarexData';
import { ChevronDown, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface HeroProps {
  onOpenReserve: () => void;
}

// Generate deterministic floating particles for ambient luxury atmosphere
const DUST_PARTICLES = Array.from({ length: 22 }).map((_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 95}%`,
  top: `${(i * 23 + 11) % 90}%`,
  size: (i % 3) + 1.5,
  duration: 10 + (i % 8) * 2,
  delay: (i % 5) * 1.2,
}));

export const Hero: React.FC<HeroProps> = ({ onOpenReserve }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse depth & spotlight tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const { scrollY } = useScroll();
  // Background images move slightly slower than content to create depth
  const bgY = useTransform(scrollY, [0, 800], [0, 180]);
  const contentY = useTransform(scrollY, [0, 800], [0, -40]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000); // 7 seconds slideshow interval

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    // Normalized from -1 to 1 for subtle parallax
    setMousePos({
      x: (xRatio - 0.5) * 2,
      y: (yRatio - 0.5) * 2,
    });

    // Spotlight percentage coordinates
    setSpotlightPos({
      x: xRatio * 100,
      y: yRatio * 100,
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  const scrollToPerformance = () => {
    const el = document.getElementById('performance');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToShowroom = () => {
    const el = document.getElementById('showroom');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden bg-[#0A0A0A] flex flex-col justify-between"
    >
      {/* Soft Ambient Spotlight following cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(750px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 255, 255, 0.07), transparent 75%)`,
        }}
      />

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {DUST_PARTICLES.map((pt) => (
          <motion.div
            key={pt.id}
            initial={{ opacity: 0.1, y: 0, x: 0 }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              y: [-20, -100, -20],
              x: [-15, 15, -15],
            }}
            transition={{
              duration: pt.duration,
              delay: pt.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: pt.left,
              top: pt.top,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
            }}
            className="absolute rounded-full bg-white/40 blur-[0.5px]"
          />
        ))}
      </div>

      {/* Camera UI Style HUD Decorators */}
      <div className="absolute top-28 left-6 md:left-12 text-[9px] font-mono tracking-widest text-white/50 z-30 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
        <span>REC [•] 4K RAW TELEMETRY</span>
      </div>
      <div className="absolute top-28 right-6 md:right-12 text-[9px] font-mono tracking-widest text-white/50 uppercase z-30 pointer-events-none hidden sm:block">
        NOVAREX DIGITAL ASSET MGMT // S-01
      </div>
      <div className="absolute bottom-6 left-6 md:left-12 text-[9px] font-mono tracking-widest text-white/40 z-30 pointer-events-none hidden md:block">
        TC: 00:04:12:09 // MONACO SHIFT
      </div>

      {/* Vertical Side Identifier */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 z-30 pointer-events-none">
        <div className="h-24 w-[1px] bg-white/20" />
        <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.5em] text-[#BDBDBD] uppercase font-light font-mono">
          S-CLASS HYPERCAR / 2027 SPEC
        </span>
        <div className="h-24 w-[1px] bg-white/20" />
      </div>

      {/* Floating Right Engineering Overlay */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:block w-[220px] p-6 bg-white/[0.03] border border-white/10 backdrop-blur-md z-30 shadow-2xl">
        <div className="flex flex-col gap-5">
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#C0C0C0] uppercase font-bold border-b border-white/10 pb-2">
            TELEMETRY MATRIX
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[#BDBDBD] mb-1">CHASSIS</div>
            <div className="text-[11px] font-medium text-[#FAFAFA]">Ultra-Light Carbon Monocoque</div>
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[#BDBDBD] mb-1">AERO</div>
            <div className="text-[11px] font-medium text-[#FAFAFA]">Adaptive Titanium Diffuser</div>
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[#BDBDBD] mb-1">DRIVE</div>
            <div className="text-[11px] font-medium text-[#FAFAFA]">Intelligent AWD Hybrid V12</div>
          </div>
          <button
            onClick={scrollToPerformance}
            className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-[#FAFAFA] hover:text-[#C0C0C0] transition-colors"
          >
            <span className="tracking-widest font-bold">CHAPTER 02: TELEMETRY</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Background Slideshow with Smooth Crossfade, Mouse Depth Parallax & Ken Burns Zoom */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{
              opacity: 1,
              scale: 1.02,
              x: mousePos.x * -16,
              y: mousePos.y * -16,
            }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              opacity: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 7.5, ease: 'linear' },
              x: { duration: 0.8, ease: 'easeOut' },
              y: { duration: 0.8, ease: 'easeOut' },
            }}
            className="absolute inset-0"
          >
            <img
              src={currentSlide.url}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center filter brightness-90 contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic dark luxury gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/60" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0A]/30 to-[#0A0A0A]/80" />
            <div className="absolute inset-0 bg-carbon opacity-20 pointer-events-none mix-blend-overlay" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Top Spacer for Navbar */}
      <div className="pt-28 z-10" />

      {/* Center Hero Content */}
      <motion.div style={{ y: contentY }} className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center my-auto py-12">
        {/* Slide Tag / Badge */}
        <motion.div
          key={`tag-${currentIndex}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C0C0C0] animate-ping" />
          <span className="text-[11px] sm:text-[13px] font-mono tracking-[0.35em] text-[#BDBDBD] uppercase">
            {currentSlide.tag}
          </span>
        </motion.div>

        {/* Hero Headline - Balanced 80px on desktop with 0.98 line-height */}
        <div className="overflow-hidden mb-6 relative inline-block py-1">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-7xl lg:text-[80px] font-bold tracking-[0.12em] leading-[0.98] uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-[#FAFAFA] via-[#E0E0E0] to-[#505050] drop-shadow-2xl"
          >
            NOVAREX
          </motion.h1>

          {/* Subtle Shimmer light sweep passing over logo once after loading */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none mix-blend-overlay"
          />
        </div>

        {/* Tagline Line-by-Line Reveal */}
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-8 md:w-16 bg-white/25" />
            <p className="font-body text-base sm:text-xl lg:text-[22px] text-[#FAFAFA] font-light tracking-[0.22em] uppercase leading-snug">
              Born From Speed. <span className="text-[#C0C0C0] font-normal">Perfected By Precision.</span>
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-white/25" />
          </motion.div>
        </div>

        {/* Supporting Paragraph - 18-20px Body size with generous breathing room */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-base sm:text-lg lg:text-[19px] text-[#BDBDBD] font-light leading-relaxed tracking-wide mb-12 text-balance"
        >
          Crafted for those who demand perfection. Every curve is engineered with purpose.
          Every detail reflects uncompromising precision.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenReserve}
            className="w-full sm:w-auto px-9 py-3.5 text-[13px] font-medium tracking-[0.25em] uppercase bg-[#FAFAFA] text-[#0A0A0A] border border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.18)]"
          >
            Reserve Yours
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToShowroom}
            className="w-full sm:w-auto px-9 py-3.5 text-[13px] font-medium tracking-[0.25em] uppercase border border-white/20 bg-white/5 backdrop-blur-md text-[#FAFAFA] hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Explore Showroom
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom Controls & Scroll Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-8 w-full flex items-end justify-between">
        {/* Slide Indicators */}
        <div className="flex items-center gap-3">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className="group py-2 focus:outline-none"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`h-[2px] transition-all duration-500 ${
                  currentIndex === idx
                    ? 'w-10 bg-[#FAFAFA]'
                    : 'w-4 bg-white/20 group-hover:bg-white/50'
                }`}
              />
            </button>
          ))}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-2 p-1 text-[#BDBDBD] hover:text-[#FAFAFA] transition-colors"
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToPerformance}
          className="hidden md:flex flex-col items-center gap-2 group text-[#BDBDBD] hover:text-[#FAFAFA] transition-colors"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#C0C0C0]" />
          </motion.div>
        </button>

        {/* Slide Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 border border-white/20 bg-black/40 hover:bg-white/10 text-[#FAFAFA] transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 border border-white/20 bg-black/40 hover:bg-white/10 text-[#FAFAFA] transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
