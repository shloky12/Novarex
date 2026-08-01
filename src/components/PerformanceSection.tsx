import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { PERFORMANCE_SPECS } from '../data/novarexData';
import { Gauge, Zap, Wind, ShieldCheck, Flame } from 'lucide-react';

interface NumberCounterProps {
  value: string;
  unit: string;
  numericVal: number;
  inView: boolean;
}

const NumberCounter: React.FC<NumberCounterProps> = ({ value, unit, numericVal, inView }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000; // 2s
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Custom easeOutExpo easing for luxury feel
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (numericVal - start) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(numericVal);
        setIsFinished(true);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [inView, numericVal]);

  // Format decimal if 2.1
  const formatted = numericVal % 1 !== 0 ? displayValue.toFixed(1) : Math.round(displayValue).toString();

  return (
    <div className="flex items-baseline justify-center sm:justify-start gap-1 font-num">
      <motion.span
        animate={isFinished ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-titanium inline-block origin-left"
      >
        {inView ? formatted : '0'}
      </motion.span>
      <span className="text-xl sm:text-2xl font-light tracking-widest text-[#C0C0C0] uppercase">
        {unit}
      </span>
    </div>
  );
};

export const PerformanceSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeDriveMode, setActiveDriveMode] = useState<'stealth' | 'gt' | 'corsa' | 'track'>('corsa');

  const driveModes = [
    {
      id: 'stealth',
      name: 'STEALTH',
      desc: '100% Zero-Emission Axial Flux Electric',
      hp: '600 HP',
      range: '120 KM EV',
      sound: 'Whisper Silent',
      accent: 'border-emerald-500/30'
    },
    {
      id: 'gt',
      name: 'GRAND TOURING',
      desc: 'Balanced Active Suspension & Comfort Matrix',
      hp: '1,100 HP',
      range: 'Adaptive Highway',
      sound: 'Refined Resonance',
      accent: 'border-blue-500/30'
    },
    {
      id: 'corsa',
      name: 'CORSA',
      desc: 'Full V12 Quad-Turbo & Hybrid Vectoring',
      hp: '1,600 HP',
      range: 'Maximum Response',
      sound: 'Full V12 Exhaust Symphony',
      accent: 'border-white/40'
    },
    {
      id: 'track',
      name: 'TRACK SPEC',
      desc: '1,200kg Active Aero Downforce & Slick Prep',
      hp: '1,600 HP',
      range: 'Telemetry Unlocked',
      sound: 'Unrestricted Flame Exhaust',
      accent: 'border-[#C0C0C0]'
    }
  ];

  const currentMode = driveModes.find((m) => m.id === activeDriveMode)!;

  return (
    <section id="performance" ref={ref} className="relative py-32 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      {/* Background ambient light reflections */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-white/5 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-white/10 pb-10">
          <div>
            <div className="text-[11px] sm:text-[13px] font-mono tracking-[0.3em] text-[#C0C0C0] uppercase mb-4 flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-medium border border-white/20">CHAPTER 02</span>
              <Gauge className="w-4 h-4 text-[#C0C0C0]" />
              <span>DYNAMIC TELEMETRY</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-[54px] text-titanium font-bold tracking-[0.1em] leading-[1.02] uppercase">
              BORN FROM SPEED
            </h2>
          </div>
          <p className="max-w-lg text-base sm:text-lg lg:text-[19px] text-[#BDBDBD] font-light leading-relaxed">
            Engineered with a quad-turbocharged hybrid V12 architecture that redefines physical possibilities on road and track.
          </p>
        </div>

        {/* 4 Massive Animated Performance Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {PERFORMANCE_SPECS.map((spec, index) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 0.35)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7), 0 0 30px rgba(255,255,255,0.08)' }}
              className="glass-card p-8 flex flex-col justify-between group cursor-pointer transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle glass reflection sheen on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="font-num text-4xl text-white font-bold">0{index + 1}</span>
              </div>

              <div>
                <NumberCounter
                  value={spec.value}
                  unit={spec.unit}
                  numericVal={spec.numericValue}
                  inView={isInView}
                />

                {/* Immersive UI Telemetry Progress Bar Accent - Animates width left to right */}
                <div className="w-full h-[2px] bg-white/10 my-3 relative overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 1.4, delay: 0.4 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full origin-left bg-gradient-to-r from-white/40 via-[#C0C0C0] to-white"
                  />
                </div>

                <h3 className="text-xs font-mono tracking-[0.25em] text-[#FAFAFA] font-semibold uppercase">
                  {spec.label}
                </h3>
              </div>

              <p className="text-xs text-[#BDBDBD] font-light leading-relaxed mt-4 pt-4 border-t border-white/10">
                {spec.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Drive Mode Architecture Selector */}
        <div className="glass-panel p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-[#C0C0C0] uppercase">
                INTELLIGENT DYNAMICS
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl text-[#FAFAFA] tracking-wide mt-1 uppercase">
                Drive Mode Architectures
              </h3>
            </div>

            {/* Mode Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/60 p-1.5 border border-white/10">
              {driveModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveDriveMode(mode.id as typeof activeDriveMode)}
                  className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                    activeDriveMode === mode.id
                      ? 'bg-[#FAFAFA] text-[#0A0A0A] font-bold shadow-lg'
                      : 'text-[#BDBDBD] hover:text-[#FAFAFA] hover:bg-white/5'
                  }`}
                >
                  {mode.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Mode Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#C0C0C0] uppercase">
                ACTIVE CONFIGURATION
              </span>
              <h4 className="font-heading text-4xl text-titanium uppercase">{currentMode.name}</h4>
              <p className="text-sm text-[#BDBDBD] font-light leading-relaxed">{currentMode.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[#C0C0C0] text-xs font-mono mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>POWER OUTPUT</span>
                </div>
                <div className="text-xl font-num font-bold text-[#FAFAFA]">{currentMode.hp}</div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[#C0C0C0] text-xs font-mono mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>CHARACTER</span>
                </div>
                <div className="text-sm font-num font-medium text-[#FAFAFA]">{currentMode.range}</div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-white/10 to-white/0 border border-white/15 flex flex-col justify-between h-full">
              <div className="text-xs font-mono text-[#BDBDBD] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Wind className="w-4 h-4 text-[#C0C0C0]" />
                <span>EXHAUST SYMPHONY</span>
              </div>
              <p className="text-sm font-medium text-[#FAFAFA] italic">{currentMode.sound}</p>
              <div className="mt-4 text-[10px] font-mono text-[#C0C0C0] uppercase tracking-widest">
                Active Telemetry Engaged
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
