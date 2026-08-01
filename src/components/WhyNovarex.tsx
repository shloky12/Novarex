import React from 'react';
import { motion } from 'motion/react';
import { WHY_NOVAREX } from '../data/novarexData';
import { Crown, Compass, Sparkles, Shield, Flame } from 'lucide-react';
import detailImg from '../assets/images/detail_shot_1785576969140.jpg';

export const WhyNovarex: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-5 h-5 text-[#FAFAFA]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#FAFAFA]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#FAFAFA]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#FAFAFA]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#FAFAFA]" />;
      default:
        return <Crown className="w-5 h-5 text-[#FAFAFA]" />;
    }
  };

  const featureMain = WHY_NOVAREX[0]; // European Craftsmanship
  const featureSide = WHY_NOVAREX[1]; // Precision Manufacturing
  const remainingFeatures = WHY_NOVAREX.slice(2); // Luxury Interior, Tech, Performance

  return (
    <section id="whynovarex" className="py-32 bg-[#08080A] relative overflow-hidden border-t border-white/10">
      {/* Editorial Watermark Background Typography */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[14vw] font-heading font-black tracking-tighter text-white/[0.02] uppercase pointer-events-none whitespace-nowrap select-none">
        HERITAGE
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-white/10 pb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-white/10 border border-white/20 mb-4">
              <Crown className="w-3.5 h-3.5 text-titanium" />
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#D0D0D0] uppercase">
                EXCLUSIVITY & DISTINCTION
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-[54px] text-titanium font-bold tracking-[0.08em] leading-[1.02] uppercase">
              WHY NOVAREX
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#BDBDBD] font-light leading-relaxed max-w-lg">
            Reserved for the discerning few who view automotive engineering not merely as transportation, but as the pinnacle of human artistry.
          </p>
        </div>

        {/* ASYMMETRICAL EDITORIAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Large Feature Panel (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 glass-panel p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between group min-h-[420px] border border-white/20 shadow-2xl"
          >
            {/* Background Photography Blend */}
            <div className="absolute inset-0 z-0">
              <img
                src={detailImg}
                alt="European Craftsmanship Detail"
                className="w-full h-full object-cover object-center opacity-25 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/80 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between mb-12">
              <div className="p-3 bg-white/10 border border-white/20 rounded">
                {getIcon(featureMain.iconName)}
              </div>
              <span className="px-3 py-1 bg-white/15 border border-white/25 text-white font-mono text-xs tracking-widest font-bold">
                {featureMain.stat}
              </span>
            </div>

            <div className="relative z-10 max-w-lg">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#AAAAAA] uppercase block mb-2">
                01 // HERITAGE & ARTISTRY
              </span>
              <h3 className="font-heading text-2xl sm:text-4xl text-titanium font-bold uppercase mb-4">
                {featureMain.title}
              </h3>
              <p className="text-sm sm:text-base text-[#D0D0D0] font-light leading-relaxed">
                {featureMain.description}
              </p>
            </div>
          </motion.div>

          {/* Secondary Feature Panel (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 glass-card p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between group border border-white/15 bg-white/[0.03]"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 bg-white/10 border border-white/20 rounded">
                {getIcon(featureSide.iconName)}
              </div>
              <span className="text-xs font-mono font-bold tracking-widest text-titanium px-3 py-1 bg-white/10 border border-white/20">
                {featureSide.stat}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#999999] uppercase block mb-2">
                02 // MICRON ACCURACY
              </span>
              <h3 className="font-heading text-xl sm:text-2xl text-white font-bold uppercase mb-3">
                {featureSide.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#BDBDBD] font-light leading-relaxed mb-6">
                {featureSide.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#888888] uppercase">
              <span>FACILITY LOCATION</span>
              <span>MARANELLO, ITALY</span>
            </div>
          </motion.div>

        </div>

        {/* Bottom 3 Asymmetrical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {remainingFeatures.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 0.35)' }}
              className="glass-card p-8 flex flex-col justify-between group border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 bg-white/10 border border-white/15 rounded">
                    {getIcon(iconNameMap(item.iconName))}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#CCCCCC] px-2.5 py-1 bg-white/5 border border-white/10">
                    {item.stat}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl text-white font-bold uppercase mb-2 group-hover:text-titanium transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#BDBDBD] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-[#777777] uppercase">
                <span>BENCHMARK VERIFIED</span>
                <span>0{idx + 3} / 05</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

function iconNameMap(name: string) {
  return name;
}
