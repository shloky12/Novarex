import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Globe, Shield, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { icon: <Instagram className="w-4 h-4" />, name: 'Instagram' },
    { icon: <Twitter className="w-4 h-4" />, name: 'Twitter / X' },
    { icon: <Youtube className="w-4 h-4" />, name: 'Youtube' },
    { icon: <Linkedin className="w-4 h-4" />, name: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#050505] text-[#BDBDBD] py-20 border-t border-white/10 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                <span className="font-heading text-sm text-[#FAFAFA] tracking-widest">N</span>
              </div>
              <span className="font-heading text-3xl tracking-[0.25em] text-titanium font-bold uppercase">
                NOVAREX
              </span>
            </div>
            <p className="text-xs text-[#BDBDBD] font-light leading-relaxed max-w-sm">
              Born From Speed. Perfected By Precision.
              Handcrafted European hypercars combining timeless artisan mastery with aerospace telemetry.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#C0C0C0] flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              <span>HEADQUARTERS: MONACO • STUTTGART • MARANELLO</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono tracking-[0.25em] text-[#FAFAFA] uppercase font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#performance" className="hover:text-[#FAFAFA] transition-colors">
                  PERFORMANCE TELEMETRY
                </a>
              </li>
              <li>
                <a href="#design" className="hover:text-[#FAFAFA] transition-colors">
                  DESIGN PHILOSOPHY
                </a>
              </li>
              <li>
                <a href="#engineering" className="hover:text-[#FAFAFA] transition-colors">
                  AEROSPACE ENGINEERING
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#FAFAFA] transition-colors">
                  VISUAL ARCHIVE
                </a>
              </li>
              <li>
                <a href="#whynovarex" className="hover:text-[#FAFAFA] transition-colors">
                  EXCLUSIVITY & HERITAGE
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels & Back to Top */}
          <div className="md:col-span-4 space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono tracking-[0.25em] text-[#FAFAFA] uppercase font-bold mb-3">
                CONNECT
              </h4>
              <div className="flex items-center gap-3">
                {socials.map((soc, sIdx) => (
                  <motion.a
                    key={soc.name}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + sIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.4)' }}
                    className="p-3 border border-white/10 text-[#BDBDBD] hover:text-[#FAFAFA] transition-colors"
                    aria-label={soc.name}
                  >
                    {soc.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="self-start flex items-center gap-2 text-xs font-mono tracking-widest text-[#BDBDBD] hover:text-[#FAFAFA] transition-colors pt-4 group"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-[#C0C0C0]" />
            </button>
          </div>
        </div>

        {/* Sub-footer Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8E8E8E]">
          <div>
            © {new Date().getFullYear()} NOVAREX AUTOMOBILI S.A. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#FAFAFA] transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#FAFAFA] transition-colors">
              TERMS OF ALLOCATION
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#FAFAFA] transition-colors">
              COOKIES PREFERENCES
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
