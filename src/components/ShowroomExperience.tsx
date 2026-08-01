import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, Shield, Wind, Cpu, Zap, Activity } from 'lucide-react';
import heroImg from '../assets/images/hero_hypercar_1785576913617.jpg';
import sideImg from '../assets/images/side_profile_1785576927726.jpg';
import rearImg from '../assets/images/rear_view_1785576940530.jpg';
import interiorImg from '../assets/images/interior_cockpit_1785576953821.jpg';
import detailImg from '../assets/images/detail_shot_1785576969140.jpg';
import windTunnelImg from '../assets/images/wind_tunnel_aero_1785583025972.jpg';
import cfdAirflowImg from '../assets/images/cfd_airflow_1785583041653.jpg';

export interface ShowroomCategory {
  id: string;
  name: string;
  tagline: string;
  headline: string;
  description: string;
  imageUrl: string;
  secondaryImage?: string;
  colorGlow: string; // Tailored ambient light color
  specs?: { label: string; value: string; unit?: string; numVal?: number }[];
  highlights: string[];
}

const CATEGORIES: ShowroomCategory[] = [
  {
    id: 'handcrafted',
    name: 'HANDCRAFTED',
    tagline: 'CHAPTER 01 // BESPOKE EUROPEAN ARTISTRY',
    headline: 'Handcrafted Without Compromise.',
    description: `Every stitch.
Every curve.
Every surface.

Crafted with uncompromising precision to create an interior that feels timeless.`,
    imageUrl: interiorImg,
    secondaryImage: detailImg,
    colorGlow: 'rgba(212, 175, 55, 0.12)', // Warm Gold Titanium
    highlights: [
      'Bespoke Italian Aniline Leather & Alcantara',
      'Hand-Milled Solid Billet Titanium Controls',
      'Aerospace T1100 Monocoque Architecture',
      'Micro-Precision Laser Tolerances (0.002mm)'
    ]
  },
  {
    id: 'aerodynamics',
    name: 'AERODYNAMICS',
    tagline: 'CHAPTER 02 // SCULPTED BY VELOCITY',
    headline: 'Engineered To Defy Resistance.',
    description: 'Every contour is sculpted to transform airflow into performance while maintaining absolute elegance.',
    imageUrl: windTunnelImg,
    secondaryImage: cfdAirflowImg,
    colorGlow: 'rgba(56, 189, 248, 0.12)', // Aero Cyan
    specs: [
      { label: 'DOWNFORCE', value: '1,200', unit: 'KG' },
      { label: 'DRAG COEFF', value: '0.28', unit: 'CD' },
      { label: 'ACTUATION', value: '12', unit: 'MS' },
      { label: 'AERO CHANNELS', value: 'VENTURI', unit: '' }
    ],
    highlights: [
      'Dual-Stage Active Rear Wing & Air Brake Matrix',
      'Underbody Venturi Downforce Diffusion',
      'Laser Smoke Streamline Airflow Dynamics',
      'Continuous Aerodynamic Surface Actuation'
    ]
  },
  {
    id: 'performance',
    name: 'PERFORMANCE',
    tagline: 'CHAPTER 03 // HYBRID V12 POWERTRAIN',
    headline: 'Power Beyond Imagination.',
    description: 'Engineered for those who believe speed is only the beginning.',
    imageUrl: sideImg,
    secondaryImage: heroImg,
    colorGlow: 'rgba(239, 68, 68, 0.12)', // Fiery Titanium Crimson
    specs: [
      { label: 'TOP SPEED', value: '420', unit: 'KM/H', numVal: 420 },
      { label: '0–100 KM/H', value: '2.1', unit: 'SEC', numVal: 2.1 },
      { label: 'PEAK POWER', value: '1600', unit: 'HP', numVal: 1600 },
      { label: 'MAX TORQUE', value: '1700', unit: 'NM', numVal: 1700 }
    ],
    highlights: [
      'Quad-Turbocharged 6.5L Hybrid V12 Architecture',
      'Dual-Motor Axial Flux Instantaneous Torque Vectoring',
      'Titanium Exhaust Manifold & Active Valve Controls',
      '0-200 km/h in 5.4 Seconds Closed-Circuit Telemetry'
    ]
  },
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    tagline: 'CHAPTER 04 // NEURAL TELEMETRY & AI',
    headline: 'Intelligence In Every Millisecond.',
    description: 'Advanced engineering seamlessly integrated into every driving experience.',
    imageUrl: cfdAirflowImg,
    secondaryImage: detailImg,
    colorGlow: 'rgba(99, 102, 241, 0.12)', // Electric Cyber Indigo
    specs: [
      { label: 'CALCULATIONS', value: '10,000', unit: '/SEC' },
      { label: 'SAMPLING', value: '1,000', unit: 'HZ' },
      { label: 'DRIVE MODES', value: '4', unit: 'ARCH' },
      { label: 'PREDICTION', value: '200', unit: 'MS' }
    ],
    highlights: [
      'On-Board Neural AI Predictive Grip Telemetry',
      'Magnetorheological Suspension Pitch Compensation',
      'Solid-State Glass Interface Cockpit Controller',
      'Real-Time Quad-Wheel Torque Vectoring'
    ]
  },
  {
    id: 'interior',
    name: 'INTERIOR',
    tagline: 'CHAPTER 05 // BESPOKE DRIVER CABIN',
    headline: 'Luxury That Moves With You.',
    description: 'Designed around the driver with handcrafted materials, timeless elegance, and uncompromising comfort.',
    imageUrl: interiorImg,
    secondaryImage: rearImg,
    colorGlow: 'rgba(245, 158, 11, 0.12)', // Twilight Titanium Gold
    highlights: [
      'Custom Driver-Centric Monocoque Cockpit Layout',
      'Zero-Touch Screen Tactile Titanium Switchgear',
      'Acoustically Isolated Double-Walled Carbon Shell',
      'Bespoke Ergonomic Seating Posture Calibration'
    ]
  }
];

// Helper component for smoothly counting numbers
const SmoothCounter: React.FC<{ targetVal: number; formatDecimals?: boolean }> = ({ targetVal, formatDecimals = false }) => {
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    let startTime: number | null = null;
    let animId: number;

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // EaseOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = start + (targetVal - start) * ease;
      setCurrentVal(val);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [targetVal]);

  return (
    <span>
      {formatDecimals ? currentVal.toFixed(1) : Math.round(currentVal).toLocaleString()}
    </span>
  );
};

export const ShowroomExperience: React.FC<{ onOpenReserve?: () => void }> = ({ onOpenReserve }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  const currentCategory = CATEGORIES[activeIndex];

  // Synthesize soft luxury watch crown mechanical click sound
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Audio context restricted
    }
  }, [soundEnabled]);

  const goToCategory = useCallback((index: number) => {
    if (index === activeIndex || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    playClickSound();

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 850);
  }, [activeIndex, playClickSound]);

  const handleNext = useCallback(() => {
    if (activeIndex < CATEGORIES.length - 1) {
      goToCategory(activeIndex + 1);
    } else {
      // Wrap around
      goToCategory(0);
    }
  }, [activeIndex, goToCategory]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      goToCategory(activeIndex - 1);
    } else {
      // Wrap around
      goToCategory(CATEGORIES.length - 1);
    }
  }, [activeIndex, goToCategory]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  // Mouse Move Parallax Depth
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    setMousePos({
      x: (xRatio - 0.5) * 2,
      y: (yRatio - 0.5) * 2,
    });
  };

  // Remove wheel listener so scene changing ONLY happens on clicking arrows / navigation controls
  // Scroll moves down the page naturally without hijacking or changing category.

  return (
    <section
      ref={sectionRef}
      id="showroom"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full lg:h-screen lg:max-h-[920px] min-h-[640px] bg-[#070707] text-[#FAFAFA] flex flex-col justify-between overflow-hidden border-t border-b border-white/10 select-none py-4 sm:py-6"
    >
      {/* Carbon fiber inspired background texture */}
      <div className="absolute inset-0 bg-carbon opacity-35 pointer-events-none z-0" />

      {/* Dynamic Showroom Ambient Light Glow moving gently according to active category */}
      <motion.div
        animate={{
          background: `radial-gradient(700px circle at ${50 + mousePos.x * 10}% ${40 + mousePos.y * 10}%, ${currentCategory.colorGlow}, transparent 70%)`
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Subtle Volumetric Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, -40, -10],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8 + (i % 4) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }}
            style={{
              left: `${(i * 21 + 6) % 90}%`,
              top: `${(i * 31 + 12) % 80}%`,
            }}
            className="absolute w-1 h-1 rounded-full bg-white/30 blur-[0.5px]"
          />
        ))}
      </div>

      {/* Showroom Header HUD Controls */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C0C0C0] animate-pulse" />
          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold border border-white/20 text-[8px] font-mono tracking-widest mr-1">
            CHAPTER 03
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em] text-[#BDBDBD] uppercase font-bold">
            NOVAREX SHOWROOM UNVEILING // {currentCategory.tagline.split('//')[0]}
          </span>
        </div>

        {/* Audio Toggle Button */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[9px] font-mono tracking-widest text-[#BDBDBD] hover:text-white hover:border-white/30 transition-all"
          title="Toggle Showroom Mechanical Click Sound"
        >
          {soundEnabled ? <Volume2 className="w-3 h-3 text-[#FAFAFA]" /> : <VolumeX className="w-3 h-3 text-white/40" />}
          <span className="hidden sm:inline">{soundEnabled ? 'SOUND ON' : 'MUTED'}</span>
        </button>
      </div>

      {/* Center Navigation Selector - Compact Luxury Crown Mechanism */}
      <div className="relative z-30 max-w-lg mx-auto px-4 w-full flex flex-col items-center mb-3">
        <div className="glass-panel px-4 sm:px-8 py-2 rounded-full border border-white/15 shadow-[0_8px_25px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-4 sm:gap-8 w-full max-w-md relative group">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full border border-white/15 hover:border-white/50 bg-white/5 hover:bg-white/15 text-[#FAFAFA] hover:text-white transition-all active:scale-90 shadow-md group-hover:border-white/30"
            aria-label="Previous Category (Click to change)"
            title="Click to view previous category"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Active Category Title Morph / Slide */}
          <div className="overflow-hidden h-6 sm:h-7 flex items-center justify-center relative w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.span
                key={currentCategory.id}
                custom={direction}
                initial={{ x: direction * 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -40, opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FAFAFA] via-[#E0E0E0] to-[#C0C0C0] whitespace-nowrap text-center block"
              >
                {currentCategory.name}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full border border-white/15 hover:border-white/50 bg-white/5 hover:bg-white/15 text-[#FAFAFA] hover:text-white transition-all active:scale-90 shadow-md group-hover:border-white/30"
            aria-label="Next Category (Click to change)"
            title="Click to view next category"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Gliding Underline Accent */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[1px] w-20 bg-gradient-to-r from-transparent via-[#FAFAFA] to-transparent opacity-60" />
        </div>

        {/* 5 Navigation Indicator Dots / Pills */}
        <div className="flex items-center justify-center gap-2.5 mt-2.5">
          {CATEGORIES.map((cat, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={cat.id}
                onClick={() => goToCategory(idx)}
                className="group relative py-1 focus:outline-none"
                aria-label={`Jump to ${cat.name}`}
              >
                <motion.div
                  animate={{
                    width: isActive ? 24 : 6,
                    backgroundColor: isActive ? '#FAFAFA' : 'rgba(255, 255, 255, 0.25)',
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-1.5 rounded-full transition-all group-hover:bg-white/60"
                />
                {/* Tooltip on hover */}
                <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[8px] font-mono tracking-widest text-[#C0C0C0] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Feature Display Stage - Compact Fitted Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 w-full my-auto py-1">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentCategory.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Left Column: Editorial Headline & Text Reveal */}
            <div className="lg:col-span-5 space-y-3.5 order-2 lg:order-1 z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] font-mono tracking-[0.25em] text-[#C0C0C0] uppercase flex items-center gap-2"
              >
                <span className="h-[1px] w-5 bg-[#C0C0C0]" />
                {currentCategory.tagline}
              </motion.div>

              {/* Text Mask Headline Reveal - Compact for Laptop Heights */}
              <div className="overflow-hidden py-0.5">
                <motion.h2
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase leading-[1.1] text-titanium italic"
                >
                  {currentCategory.headline}
                </motion.h2>
              </div>

              {/* Description Fades Upward */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm text-[#BDBDBD] font-light leading-relaxed whitespace-pre-line max-w-xl"
              >
                {currentCategory.description}
              </motion.p>

              {/* Animated Specifications Grid (if available for performance/aero/tech) */}
              {currentCategory.specs && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-2 gap-2.5 pt-1.5 border-t border-white/10"
                >
                  {currentCategory.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="glass-card p-2 sm:p-2.5 border border-white/10">
                      <div className="text-[9px] font-mono tracking-widest text-[#C0C0C0] uppercase mb-0.5">
                        {spec.label}
                      </div>
                      <div className="font-num text-lg sm:text-2xl font-bold text-titanium flex items-baseline gap-1">
                        {spec.numVal !== undefined ? (
                          <SmoothCounter targetVal={spec.numVal} formatDecimals={spec.numVal % 1 !== 0} />
                        ) : (
                          spec.value
                        )}
                        {spec.unit && <span className="text-[10px] font-light text-[#C0C0C0]">{spec.unit}</span>}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Highlights Bullet List */}
              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5 pt-1"
              >
                {currentCategory.highlights.map((item, hIdx) => (
                  <li key={hIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-[#E0E0E0] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C0C0C0] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>

              {/* CTA Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenReserve}
                  className="px-6 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase bg-[#FAFAFA] text-[#0A0A0A] border border-white hover:bg-[#C0C0C0] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.12)] flex items-center gap-2.5 group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  <span>Explore {currentCategory.name} Specs</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Right Column: Compact Frame Showcase Image with Parallax & Ken Burns Zoom */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative group overflow-hidden border border-white/15 bg-[#121212] shadow-[0_15px_40px_rgba(0,0,0,0.85)] rounded-sm">
              {/* Image Frame - Scaled down height so scene fits inside 100vh */}
              <div className="aspect-[16/10] max-h-[320px] sm:max-h-[380px] lg:max-h-[420px] overflow-hidden relative w-full">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{
                    scale: 1.02,
                    x: mousePos.x * -10,
                    y: mousePos.y * -10,
                  }}
                  transition={{
                    scale: { duration: 7, ease: 'linear' },
                    x: { duration: 0.8, ease: 'easeOut' },
                    y: { duration: 0.8, ease: 'easeOut' }
                  }}
                  src={currentCategory.imageUrl}
                  alt={currentCategory.name}
                  className="w-full h-full object-cover filter contrast-[1.08] brightness-95"
                  referrerPolicy="no-referrer"
                />

                {/* Soft reflection light sweep passing across vehicle */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none mix-blend-overlay"
                />

                {/* Secondary Inset Detail Badge if available */}
                {currentCategory.secondaryImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="absolute bottom-3 right-3 w-24 sm:w-28 aspect-[4/3] border border-white/20 overflow-hidden shadow-2xl hidden sm:block bg-black/80"
                  >
                    <img
                      src={currentCategory.secondaryImage}
                      alt="Detail shot"
                      className="w-full h-full object-cover opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 left-1 text-[7px] font-mono tracking-widest text-[#FAFAFA] bg-black/70 px-1 py-0.5 border border-white/10">
                      DETAIL
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Showroom Lighting Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* HUD Frame Stamp */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
                <span className="text-[8px] font-mono tracking-widest text-[#FAFAFA] bg-black/80 border border-white/20 px-2 py-0.5 backdrop-blur-md">
                  NOVAREX FIG. 0{activeIndex + 1} // {currentCategory.name}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Showroom Footer Indicators & Help Hint */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-[#BDBDBD] pt-2 border-t border-white/10 mt-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-[#C0C0C0]" /> 100% CONFIDENTIAL SPECIFICATION
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-white/70">CLICK ARROWS ◀ ▶ TO CHANGE SCENE</span>
        </div>

        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <span>CATEGORY {activeIndex + 1} OF {CATEGORIES.length}</span>
          <span className="w-10 h-[1px] bg-white/20 relative overflow-hidden inline-block">
            <motion.span
              animate={{ x: [`${(activeIndex / CATEGORIES.length) * 100}%`] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white"
            />
          </span>
        </div>
      </div>
    </section>
  );
};
