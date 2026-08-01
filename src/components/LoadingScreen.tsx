import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) onComplete();
    }, 1900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center select-none pointer-events-auto"
        >
          {/* Subtle ambient central spotlight glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-white/10 to-transparent blur-3xl pointer-events-none" />

          {/* Center Brand Identity */}
          <div className="relative z-10 flex flex-col items-center space-y-6 px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-md">
                <span className="font-heading text-lg text-[#FAFAFA] tracking-widest font-bold">N</span>
              </div>
            </motion.div>

            {/* Brand Name Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="font-heading text-3xl sm:text-4xl tracking-[0.35em] text-titanium font-bold uppercase italic">
                NOVAREX
              </h1>
              <p className="text-[10px] font-mono tracking-[0.4em] text-[#BDBDBD] uppercase mt-1">
                EUROPEAN HYPERCARS
              </p>
            </motion.div>

            {/* Thin Metallic Loading Progress Line */}
            <div className="w-48 sm:w-64 h-[1px] bg-white/15 relative overflow-hidden mt-4">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAFAFA] to-transparent"
              />
            </div>

            {/* Subtle Tagline */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[9px] font-mono tracking-[0.35em] text-[#C0C0C0] uppercase pt-2"
            >
              INITIALIZING TELEMETRY // 2027
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
