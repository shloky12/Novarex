import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Sparkles, Shield, Check, RefreshCw, Disc, Armchair, Palette } from 'lucide-react';

import obsidianBlackImg from '../assets/images/obsidian_black_car_1785589346833.jpg';
import liquidCrimsonImg from '../assets/images/liquid_crimson_car_1785589362334.jpg';
import frozenFrostImg from '../assets/images/frozen_frost_car_1785589375101.jpg';
import midnightBlueImg from '../assets/images/midnight_blue_car_1785589388595.jpg';

import forgedMagnesiumImg from '../assets/images/forged_magnesium_wheel_1785589404436.jpg';
import carbonTurbineImg from '../assets/images/carbon_turbine_wheel_1785589415727.jpg';
import titaniumCenterlockImg from '../assets/images/titanium_centerlock_wheel_1785589440152.jpg';

import jetBlackInteriorImg from '../assets/images/jet_black_interior_1785589454128.jpg';
import crimsonRacingInteriorImg from '../assets/images/crimson_racing_interior_1785589466624.jpg';
import cognacHeritageInteriorImg from '../assets/images/cognac_heritage_interior_1785589480486.jpg';

interface PaintOption {
  id: string;
  name: string;
  finish: string;
  hex: string;
  glowColor: string;
  overlayClass: string;
  imageUrl: string;
  description: string;
  referenceNote: string;
}

interface WheelOption {
  id: string;
  name: string;
  type: string;
  weight: string;
  imageUrl: string;
  description: string;
  referenceNote: string;
}

interface InteriorOption {
  id: string;
  name: string;
  material: string;
  imageUrl: string;
  description: string;
  referenceNote: string;
}

const PAINT_OPTIONS: PaintOption[] = [
  {
    id: 'obsidian-black',
    name: 'Obsidian Black',
    finish: 'Deep Gloss Studio Finish',
    hex: '#0A0B0E',
    glowColor: 'rgba(255, 255, 255, 0.08)',
    overlayClass: '',
    imageUrl: obsidianBlackImg,
    description: 'Deep glossy obsidian black finish with subtle reflections and premium European showroom lighting.',
    referenceNote: 'Inspiration: Getty Images Black Sports Cars'
  },
  {
    id: 'liquid-crimson',
    name: 'Liquid Crimson',
    finish: 'Quad-Coat Metallic Crimson',
    hex: '#8B0000',
    glowColor: 'rgba(220, 38, 38, 0.15)',
    overlayClass: '',
    imageUrl: liquidCrimsonImg,
    description: 'Rich metallic crimson finish with liquid depth and luxury paint reflections.',
    referenceNote: 'Inspiration: Aston Martin Vanquish Liquid Crimson'
  },
  {
    id: 'frozen-frost',
    name: 'Frozen Frost',
    finish: 'Satin Frozen Berry Metallic',
    hex: '#D1D5DB',
    glowColor: 'rgba(243, 244, 246, 0.18)',
    overlayClass: '',
    imageUrl: frozenFrostImg,
    description: 'Premium satin frozen finish inspired by Porsche luxury paint options, giving a velvety matte luster.',
    referenceNote: 'Inspiration: Porsche Taycan Frozen Metallic'
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    finish: 'Deep Midnight Metallic Blue',
    hex: '#172554',
    glowColor: 'rgba(30, 58, 138, 0.18)',
    overlayClass: '',
    imageUrl: midnightBlueImg,
    description: 'Deep midnight metallic blue crafted for captivating showroom reflections and controlled highlights.',
    referenceNote: 'Inspiration: Midnight Metallic Blue Supercar'
  }
];

const WHEEL_OPTIONS: WheelOption[] = [
  {
    id: 'forged-magnesium',
    name: 'Forged Magnesium',
    type: 'Ultra-Light Motorsport Spec',
    weight: '-3.8 kg / wheel',
    imageUrl: forgedMagnesiumImg,
    description: 'Lightweight forged magnesium performance wheels with a premium motorsport-inspired finish.',
    referenceNote: 'Inspiration: MP Wheels Magnesium Rims'
  },
  {
    id: 'carbon-turbine',
    name: 'Aerodynamic Carbon Turbine',
    type: 'Active Airflow Extraction',
    weight: '-4.2 kg / wheel',
    imageUrl: carbonTurbineImg,
    description: 'Futuristic aerodynamic carbon turbine wheels designed for both performance and elegance.',
    referenceNote: 'Inspiration: Aerodynamic Carbon Turbine Wheels'
  },
  {
    id: 'titanium-centerlock',
    name: 'Titanium Monoblock Centre Lock',
    type: 'Motorsport Track Telemetry',
    weight: '-4.5 kg / wheel',
    imageUrl: titaniumCenterlockImg,
    description: 'Premium titanium monoblock centre-lock wheels with a luxury engineering aesthetic.',
    referenceNote: 'Inspiration: Titanium Monoblock Centre Lock'
  }
];

const INTERIOR_OPTIONS: InteriorOption[] = [
  {
    id: 'jet-black-alcantara',
    name: 'Jet Black Leather & Alcantara',
    material: 'Aniline Leather & Anti-Glare Alcantara',
    imageUrl: jetBlackInteriorImg,
    description: 'Ultra-premium black leather interior with Alcantara inserts, carbon fibre trim, brushed aluminium accents and subtle ambient lighting.',
    referenceNote: 'Inspiration: Jet Black Leather & Alcantara Interior'
  },
  {
    id: 'crimson-racing',
    name: 'Crimson Racing Interior',
    material: 'Full Grain Leather & Titanium Weave',
    imageUrl: crimsonRacingInteriorImg,
    description: 'Crimson leather combined with titanium accents and carbon fibre detailing.',
    referenceNote: 'Inspiration: Crimson Racing & Titanium Interior'
  },
  {
    id: 'cognac-heritage',
    name: 'Cognac Heritage Interior',
    material: 'Cognac Aniline Leather & Diamond Stitch',
    imageUrl: cognacHeritageInteriorImg,
    description: 'Handcrafted cognac aniline leather interior with diamond stitching, brushed aluminium controls, open-pore wood accents and luxury craftsmanship.',
    referenceNote: 'Inspiration: Cognac Heritage Aniline Interior'
  }
];

export const ConfiguratorSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'interior'>('paint');
  const [selectedPaint, setSelectedPaint] = useState<PaintOption>(PAINT_OPTIONS[0]);
  const [selectedWheel, setSelectedWheel] = useState<WheelOption>(WHEEL_OPTIONS[0]);
  const [selectedInterior, setSelectedInterior] = useState<InteriorOption>(INTERIOR_OPTIONS[0]);

  // Reset to defaults
  const handleReset = () => {
    setSelectedPaint(PAINT_OPTIONS[0]);
    setSelectedWheel(WHEEL_OPTIONS[0]);
    setSelectedInterior(INTERIOR_OPTIONS[0]);
  };

  // Determine active displayed hero image based on current active tab and selection
  const currentShowcaseImage =
    activeTab === 'paint'
      ? selectedPaint.imageUrl
      : activeTab === 'wheels'
      ? selectedWheel.imageUrl
      : selectedInterior.imageUrl;

  const currentShowcaseTitle =
    activeTab === 'paint'
      ? selectedPaint.name
      : activeTab === 'wheels'
      ? selectedWheel.name
      : selectedInterior.name;

  return (
    <section
      id="configurator"
      className="relative w-full bg-[#070707] text-[#FAFAFA] py-16 lg:py-24 border-t border-b border-white/10 select-none overflow-hidden"
    >
      {/* Background Subtle Carbon fiber texture */}
      <div className="absolute inset-0 bg-carbon opacity-30 pointer-events-none z-0" />

      {/* Dynamic Showroom Ambient Aura */}
      <motion.div
        animate={{
          background: `radial-gradient(1000px circle at 60% 40%, ${selectedPaint.glowColor}, transparent 80%)`
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="text-[11px] sm:text-[13px] font-mono tracking-[0.3em] text-[#C0C0C0] uppercase mb-3 flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-medium border border-white/20">
                INTERACTIVE CONFIGURATOR
              </span>
              <Sliders className="w-4 h-4 text-[#C0C0C0]" />
              <span>EUROPEAN SHOWROOM BESPOKE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-[52px] text-titanium font-bold tracking-[0.1em] leading-[1.02] uppercase">
              NOVAREX CONFIGURATOR
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[10px] font-mono tracking-widest text-[#BDBDBD] hover:text-white transition-all flex items-center gap-2"
              title="Reset Configurator Specs"
            >
              <RefreshCw className="w-3 h-3 text-[#C0C0C0]" />
              <span>RESET SPECIFICATION</span>
            </button>
          </div>
        </div>

        {/* Configurator Studio Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Interactive Showcase Stage (~60% / 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4 relative">
            <div className="relative group overflow-hidden border border-white/20 bg-[#101012] shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-sm">
              {/* Aspect Ratio Container */}
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden relative">
                
                {/* Showcase Image with Smooth Crossfade & Camera Movement */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentShowcaseImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={currentShowcaseImage}
                    alt={currentShowcaseTitle}
                    className="w-full h-full object-cover filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Natural Metallic Studio Reflection Sweep */}
                <motion.div
                  key={selectedPaint.id + selectedWheel.id + selectedInterior.id + activeTab}
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay"
                />

                {/* Soft Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badge Stamp */}
                <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-20">
                  <span className="text-[10px] font-mono tracking-widest text-[#FAFAFA] bg-black/85 border border-white/20 px-3 py-1 backdrop-blur-md uppercase">
                    SHOWROOM SPEC // {currentShowcaseTitle}
                  </span>
                </div>

                {/* Bottom Left Specs Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-[#FAFAFA] bg-black/80 border border-white/15 px-4 py-2.5 backdrop-blur-md z-20">
                  <div>
                    <span className="text-[#999999] block uppercase">EXTERIOR PAINT:</span>
                    <span className="font-bold text-titanium">{selectedPaint.name}</span>
                  </div>
                  <div>
                    <span className="text-[#999999] block uppercase">WHEELS:</span>
                    <span className="font-bold text-titanium">{selectedWheel.name}</span>
                  </div>
                  <div>
                    <span className="text-[#999999] block uppercase">INTERIOR:</span>
                    <span className="font-bold text-titanium">{selectedInterior.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Callout Line Below Stage */}
            <div className="p-4 glass-card border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-[#BDBDBD] flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C0C0C0]" />
                BESPOKE ALLOCATION NO. #2027-009
              </span>
              <span className="text-titanium font-bold tracking-widest">
                HANDCRAFTED IN EUROPE
              </span>
            </div>
          </div>

          {/* RIGHT: Interactive Selector Controls Panel (~40% / 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Category Navigation Tabs: Paint, Wheels, Interior */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
              {[
                { id: 'paint', label: 'Exterior Paint', icon: Palette },
                { id: 'wheels', label: 'Wheels', icon: Disc },
                { id: 'interior', label: 'Interior', icon: Armchair }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const IconComponent = tab.icon;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2.5 px-2 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-all duration-300 rounded relative flex items-center justify-center gap-1.5 ${
                      isActive ? 'text-black font-bold' : 'text-[#BDBDBD] hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeConfigTab"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-[#FAFAFA] rounded shadow-md"
                      />
                    )}
                    <IconComponent className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT PANELS */}
            <div className="glass-panel p-6 border border-white/15 min-h-[380px] flex flex-col justify-between">
              
              {/* 1. EXTERIOR PAINT TAB */}
              {activeTab === 'paint' && (
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.25em] text-[#C0C0C0] uppercase mb-1">
                      EXTERIOR PAINT FINISH
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl text-titanium font-bold uppercase">
                      {selectedPaint.name}
                    </h3>
                    <p className="text-xs text-[#BDBDBD] font-light mt-1 leading-relaxed">
                      {selectedPaint.description}
                    </p>
                  </div>

                  {/* Swatches & Previews */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#999999] uppercase block">
                      SELECT REAL-WORLD PALETTE
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {PAINT_OPTIONS.map((paint) => {
                        const isSelected = selectedPaint.id === paint.id;
                        return (
                          <button
                            key={paint.id}
                            onClick={() => setSelectedPaint(paint)}
                            className={`p-2.5 rounded border transition-all duration-300 flex items-center gap-3 text-left ${
                              isSelected
                                ? 'bg-white/15 border-white text-white shadow-md'
                                : 'bg-white/5 border-white/10 text-[#BDBDBD] hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center relative border border-white/30 ${
                                isSelected ? 'ring-2 ring-white scale-105' : ''
                              }`}
                              style={{ backgroundColor: paint.hex }}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                            </div>
                            <div className="overflow-hidden">
                              <div className="font-heading text-xs font-bold uppercase truncate">
                                {paint.name}
                              </div>
                              <div className="text-[9px] font-mono text-[#999999] truncate">
                                {paint.finish}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 text-[11px] font-mono text-[#C0C0C0] flex items-center justify-between">
                    <span>FINISH TYPE:</span>
                    <span className="font-bold text-white">{selectedPaint.finish}</span>
                  </div>
                </div>
              )}

              {/* 2. WHEELS TAB */}
              {activeTab === 'wheels' && (
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.25em] text-[#C0C0C0] uppercase mb-1">
                      PERFORMANCE WHEELS ARCHITECTURE
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl text-titanium font-bold uppercase">
                      {selectedWheel.name}
                    </h3>
                    <p className="text-xs text-[#BDBDBD] font-light mt-1 leading-relaxed">
                      {selectedWheel.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {WHEEL_OPTIONS.map((wheel) => {
                      const isSelected = selectedWheel.id === wheel.id;
                      return (
                        <button
                          key={wheel.id}
                          onClick={() => setSelectedWheel(wheel)}
                          className={`w-full p-2.5 text-left transition-all duration-300 border flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-white/15 border-white text-white shadow-md'
                              : 'bg-white/5 border-white/10 text-[#BDBDBD] hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={wheel.imageUrl}
                              alt={wheel.name}
                              className="w-12 h-12 object-cover rounded border border-white/20 flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <div className="font-heading text-xs sm:text-sm font-bold uppercase truncate">
                                {wheel.name}
                              </div>
                              <div className="text-[10px] font-mono text-[#999999] mt-0.5 truncate">
                                {wheel.type}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-titanium bg-black/60 px-2 py-1 border border-white/10 flex-shrink-0">
                            {wheel.weight}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. INTERIOR TAB */}
              {activeTab === 'interior' && (
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.25em] text-[#C0C0C0] uppercase mb-1">
                      HANDCRAFTED COCKPIT SANCTUARY
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl text-titanium font-bold uppercase">
                      {selectedInterior.name}
                    </h3>
                    <p className="text-xs text-[#BDBDBD] font-light mt-1 leading-relaxed">
                      {selectedInterior.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {INTERIOR_OPTIONS.map((int) => {
                      const isSelected = selectedInterior.id === int.id;
                      return (
                        <button
                          key={int.id}
                          onClick={() => setSelectedInterior(int)}
                          className={`w-full p-2.5 text-left transition-all duration-300 border flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-white/15 border-white text-white shadow-md'
                              : 'bg-white/5 border-white/10 text-[#BDBDBD] hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={int.imageUrl}
                              alt={int.name}
                              className="w-12 h-12 object-cover rounded border border-white/20 flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <div className="font-heading text-xs sm:text-sm font-bold uppercase truncate">
                                {int.name}
                              </div>
                              <div className="text-[10px] font-mono text-[#999999] mt-0.5 truncate">
                                {int.material}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-white flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom CTA within panel */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#BDBDBD]">
                  SPECIFICATION STATUS: READY
                </span>
                <a
                  href="#reserve"
                  className="px-5 py-2 text-[11px] font-mono tracking-widest uppercase bg-[#FAFAFA] text-[#0A0A0A] hover:bg-[#C0C0C0] transition-colors font-bold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#0A0A0A]" />
                  <span>APPLY TO ALLOCATION</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
