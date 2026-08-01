import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ENGINEERING_INNOVATIONS } from '../data/novarexData';
import { Wind, Cpu, Layers, Activity, Zap, X, ArrowUpRight, ChevronLeft, ChevronRight, Shield, CheckCircle2 } from 'lucide-react';
import { EngineeringInnovation } from '../types';

// Animated Benchmark Counter Component
const BenchmarkCounter: React.FC<{ statText: string; isActive: boolean }> = ({ statText, isActive }) => {
  const match = statText.match(/^([\d,]+)\s*(.*)$/);
  
  const numericVal = match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
  const suffix = match ? match[2] : statText;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive || numericVal === null) {
      setCount(numericVal || 0);
      return;
    }

    const duration = 1200; // ms
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * numericVal);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const frameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, numericVal]);

  if (numericVal === null) {
    return (
      <div className="flex flex-col">
        <span className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight leading-none">
          {statText}
        </span>
      </div>
    );
  }

  const formattedNumber = count.toLocaleString();

  return (
    <div className="flex flex-col justify-end">
      <span className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]">
        {formattedNumber}
      </span>
      <span className="text-[10px] font-mono text-[#A0A0A0] uppercase tracking-[0.2em] mt-0.5 font-medium">
        {suffix}
      </span>
    </div>
  );
};

export const EngineeringSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalInnovation, setActiveModalInnovation] = useState<EngineeringInnovation | null>(null);

  const total = ENGINEERING_INNOVATIONS.length;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind':
        return <Wind className="w-5 h-5 text-white" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-white" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-white" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-white" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-white" />;
      default:
        return <Zap className="w-5 h-5 text-white" />;
    }
  };

  const getBullets = (id: string) => {
    switch (id) {
      case 'adaptive-aero':
        return [
          '12ms Surface Actuation Speed',
          'Dynamic Active Rear Flap Geometry'
        ];
      case 'ai-performance':
        return [
          '200ms Predictive Slip Algorithm',
          'Real-time Neural Telemetry Sync'
        ];
      case 'carbon-chassis':
        return [
          '3D-Printed Titanium Suspension Nodes',
          '55,000 Nm/Deg Torsional Stiffness'
        ];
      case 'active-suspension':
        return [
          'Magnetorheological Fluid Dampeners',
          '1,000 Hz Surface Sampling Rate'
        ];
      case 'intelligent-modes':
        return [
          'Instantaneous Hybrid Torque Mapping',
          '4 Distinct Drive Calibrations'
        ];
      default:
        return [
          'Precision Aerospace Material',
          'Formula 1 Derived Telemetry'
        ];
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  return (
    <section id="engineering" className="py-12 lg:py-16 bg-[#08080A] relative overflow-hidden border-t border-white/10 select-none">
      {/* 1. Low Opacity Technical Blueprint / Wireframe Background (< 5% Opacity) */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-screen flex items-center justify-center overflow-hidden">
        <svg className="w-[1200px] h-[750px] text-white stroke-current" fill="none" viewBox="0 0 1000 600" strokeWidth="0.8">
          <pattern id="blueprintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprintGrid)" />
          
          <circle cx="500" cy="300" r="280" stroke="currentColor" strokeWidth="1" />
          <circle cx="500" cy="300" r="190" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="500" cy="300" r="380" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="300" x2="1000" y2="300" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" />
          <line x1="500" y1="0" x2="500" y2="600" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" />
          
          <text x="520" y="50" fill="currentColor" fontSize="10" fontFamily="monospace" letterSpacing="4">
            SPEC CODE: NVR-ENG-001 // AEROSPACE CHASSIS TELEMETRY
          </text>
        </svg>
      </div>

      {/* 2. Soft Studio Ambient Lighting Gradient */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(250,250,255,0.06)_0%,rgba(180,180,200,0.02)_60%,transparent_80%)] blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER: PERFECTLY CENTERED EDITORIAL LAYOUT (COMPACT) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          
          {/* Small Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#E0E0E0] uppercase font-semibold">
              AEROSPACE ARCHITECTURE
            </span>
          </div>

          {/* Centered Heading */}
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-[54px] text-titanium font-bold tracking-[0.04em] leading-[1.0] uppercase mb-3">
            NEXT-GEN ENGINEERING
          </h2>

          {/* Centered Supporting Paragraph */}
          <p className="text-xs sm:text-sm text-[#BDBDBD] font-light leading-relaxed max-w-xl mx-auto">
            Formed at the exact intersection of Formula 1 telemetry, aerospace composite physics, and artificial intelligence.
          </p>
        </div>

        {/* CONTROLS & SECTION INDICATOR ROW */}
        <div className="flex items-center justify-between mb-4 max-w-5xl mx-auto px-2">
          {/* Small Section Indicator */}
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-[#999999] uppercase">
            <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <span>0{activeIndex + 1} / 0{total} INNOVATION SPECS</span>
          </div>

          {/* Circular Navigation Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center shadow-md group"
              aria-label="Previous Engineering Spec"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center shadow-md group"
              aria-label="Next Engineering Spec"
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3D CAROUSEL CONTAINER WITH COMPACT PROPORTIONS */}
        <div className="relative w-full min-h-[430px] flex items-center justify-center">
          
          <div className="relative w-full max-w-5xl h-[430px] flex items-center justify-center [perspective:1200px]">
            
            {ENGINEERING_INNOVATIONS.map((item, idx) => {
              const isCenter = idx === activeIndex;
              const isLeft = idx === prevIndex;
              const isRight = idx === nextIndex;

              if (!isCenter && !isLeft && !isRight) return null;

              const IconComponent = getIcon(item.iconName);
              const bullets = getBullets(item.id);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.58,
                    scale: isCenter ? 1.08 : 0.88,
                    x: isCenter ? '0%' : isLeft ? '-76%' : '76%',
                    y: isCenter ? -10 : 8,
                    zIndex: isCenter ? 30 : 10,
                    filter: isCenter ? 'brightness(100%)' : 'brightness(70%)'
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1] // easeInOutExpo
                  }}
                  whileHover={
                    isCenter
                      ? {
                          y: -16,
                          scale: 1.1,
                          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.95), 0 0 40px rgba(255,255,255,0.12)',
                          borderColor: 'rgba(255, 255, 255, 0.55)'
                        }
                      : { opacity: 0.78, scale: 0.9 }
                  }
                  onClick={() => {
                    if (isLeft) handlePrev();
                    else if (isRight) handleNext();
                    else setActiveModalInnovation(item);
                  }}
                  className={`absolute w-[290px] sm:w-[320px] h-[430px] p-[24px] sm:p-[26px] rounded-[22px] cursor-pointer border backdrop-blur-2xl transition-colors duration-500 flex flex-col justify-between select-none ${
                    isCenter
                      ? 'bg-[#0D0E11]/95 border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
                      : 'bg-[#0B0C0E]/80 border-white/15 shadow-xl'
                  }`}
                >
                  {/* Subtle Top Metallic Reflection Highlight */}
                  <div className="absolute top-0 left-5 right-5 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  
                  {/* Hover Sweep Reflection on Center */}
                  {isCenter && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-[22px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none mix-blend-overlay overflow-hidden"
                    />
                  )}

                  {/* CARD TOP CONTENT */}
                  <div>
                    {/* Top Row: Icon & SPEC Badge */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white shadow-inner flex items-center justify-center">
                        {IconComponent}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono tracking-widest text-[#D0D0D0] uppercase font-bold">
                        SPEC #0{idx + 1}
                      </span>
                    </div>

                    {/* Small Label */}
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#888888] uppercase block mb-1">
                      TECHNICAL BREAKTHROUGH
                    </span>

                    {/* Title */}
                    <h3 className="font-heading text-2xl sm:text-[26px] text-titanium font-bold uppercase leading-[1.05] tracking-tight mb-2">
                      {item.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#C0C0C0] font-normal leading-relaxed mb-3">
                      {item.shortDesc}
                    </p>

                    {/* Two Specification Bullets */}
                    <div className="space-y-1.5">
                      {bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-[11px] font-mono text-[#D0D0D0]">
                          <CheckCircle2 className="w-3 h-3 text-titanium shrink-0 mt-0.5" />
                          <span className="leading-tight">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CARD BOTTOM CONTENT */}
                  <div>
                    {/* Divider */}
                    <div className="w-full h-[1px] bg-white/15 my-3" />

                    {/* Bottom Row: Benchmark & Circular Arrow Button */}
                    <div className="flex items-end justify-between">
                      <BenchmarkCounter statText={item.highlightStat} isActive={isCenter} />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalInnovation(item);
                        }}
                        className="w-9 h-9 rounded-full border border-white/25 bg-white/10 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center text-white shrink-0 shadow-md group"
                        aria-label={`Explore ${item.title}`}
                      >
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}

          </div>
        </div>

        {/* BOTTOM PAGINATION INDICATOR */}
        <div className="flex items-center justify-center mt-6 gap-2">
          {ENGINEERING_INNOVATIONS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-500 ${
                idx === activeIndex
                  ? 'w-7 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]'
                  : 'w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to innovation ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* DETAILED SPECIFICATION MODAL */}
      <AnimatePresence>
        {activeModalInnovation && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto"
            data-lenis-prevent="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 sm:p-12 max-w-2xl w-full border border-white/25 relative shadow-2xl my-auto bg-[#0C0D10]/95 rounded-[26px]"
            >
              <button
                onClick={() => setActiveModalInnovation(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full border border-white/20 text-[#BDBDBD] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 border border-white/20 bg-white/10 rounded-2xl">
                  {getIcon(activeModalInnovation.iconName)}
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-[0.3em] text-[#C0C0C0] uppercase">
                    AEROSPACE TECHNICAL BREAKTHROUGH
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl text-titanium font-bold uppercase">
                    {activeModalInnovation.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#BDBDBD] font-light leading-relaxed mb-8 border-t border-b border-white/10 py-6">
                <p>{activeModalInnovation.fullDesc}</p>
              </div>

              <div className="p-4 bg-white/5 border border-white/15 rounded-xl flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#C0C0C0]" />
                  <span className="text-xs font-mono text-[#C0C0C0] uppercase tracking-widest">
                    VERIFIED BENCHMARK
                  </span>
                </div>
                <span className="text-base font-mono font-bold text-white">
                  {activeModalInnovation.highlightStat}
                </span>
              </div>

              <button
                onClick={() => setActiveModalInnovation(null)}
                className="w-full py-3.5 text-xs font-mono font-bold tracking-[0.25em] uppercase bg-[#FAFAFA] text-[#0A0A0A] hover:bg-[#C0C0C0] transition-colors rounded-xl"
              >
                CLOSE SPECIFICATION
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
