import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Globe, Hammer, Crown } from 'lucide-react';

interface FinalCTAProps {
  onOpenReserve: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenReserve }) => {
  // Information blocks details
  const infoBlocks = [
    {
      icon: Hammer,
      title: 'Handcrafted in Europe',
      subtitle: 'Bespoke European Atelier'
    },
    {
      icon: Globe,
      title: 'Limited to 50 Worldwide',
      subtitle: 'Strict Serialized Chassis'
    },
    {
      icon: Crown,
      title: 'Invitation-Based Ownership',
      subtitle: 'Private Collector Registry'
    }
  ];

  return (
    <section
      id="reserve"
      className="py-32 sm:py-44 bg-[#080808] relative overflow-hidden border-t border-white/10 text-center select-none"
    >
      {/* Background Soft Studio Lighting & Subtle Metallic Sweep */}
      <div className="absolute inset-0 bg-carbon opacity-20 pointer-events-none" />

      {/* Gentle Center Studio Lighting Aura */}
      <motion.div
        initial={{ opacity: 0.2, scale: 0.8 }}
        whileInView={{ opacity: 0.45, scale: 1.1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(180,180,190,0.02)_55%,transparent_80%)] blur-[120px] pointer-events-none"
      />

      {/* Subtle Metallic Sweep Line */}
      <motion.div
        animate={{
          x: ['-100%', '200%']
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatDelay: 8,
          ease: 'linear'
        }}
        className="absolute top-1/3 inset-x-0 h-32 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transform -rotate-12 pointer-events-none mix-blend-overlay"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Eyebrow badge */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] sm:text-[12px] font-mono tracking-[0.35em] text-[#C0C0C0] uppercase mb-6 block"
        >
          EXCLUSIVE ALLOCATION REGISTRY
        </motion.span>

        {/* Main Headline: "LIMITED TO 50 VEHICLES WORLDWIDE" */}
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl sm:text-6xl lg:text-[68px] text-titanium font-bold tracking-[0.08em] uppercase mb-8 leading-[1.02] max-w-3xl"
        >
          LIMITED TO<br />
          <span className="text-white drop-shadow-[0_4px_25px_rgba(255,255,255,0.15)]">
            50 VEHICLES
          </span><br />
          WORLDWIDE
        </motion.h2>

        {/* Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg lg:text-[18px] text-[#BDBDBD] font-light max-w-2xl mx-auto leading-relaxed space-y-3 mb-14"
        >
          <p>
            Every NOVAREX is handcrafted in extremely limited numbers.
          </p>
          <p>
            Ownership is reserved for a select few who appreciate precision engineering, timeless craftsmanship, and uncompromising performance.
          </p>
          <p className="text-white font-normal">
            This is not simply purchasing a vehicle. It is becoming part of an exclusive legacy.
          </p>
        </motion.div>

        {/* Information Blocks - 3 Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-14"
        >
          {infoBlocks.map((block, idx) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="p-4 rounded border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col items-center justify-center text-center group hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
              >
                <Icon className="w-5 h-5 text-[#C0C0C0] group-hover:text-white transition-colors mb-2.5" />
                <span className="font-heading text-xs font-bold uppercase text-white tracking-wider mb-0.5">
                  {block.title}
                </span>
                <span className="text-[10px] font-mono text-[#999999]">
                  {block.subtitle}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Primary CTA Button: "Request Your Allocation" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full sm:w-auto"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: '0 10px 40px rgba(255, 255, 255, 0.25)',
              borderColor: 'rgba(255, 255, 255, 0.8)'
            }}
            whileTap={{
              scale: 0.97,
              y: 0
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={onOpenReserve}
            className="relative overflow-hidden w-full sm:w-auto px-12 py-5 text-[12px] sm:text-[13px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FAFAFA] text-[#0A0A0A] border border-white/40 shadow-[0_4px_25px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 group"
          >
            {/* Metallic shine animation moving across button surface on hover */}
            <motion.div
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none mix-blend-overlay"
            />

            <span className="relative z-10">Request Your Allocation</span>
            <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
