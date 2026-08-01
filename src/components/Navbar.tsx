import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { toggleSoundscape, isSoundscapePlaying } from '../utils/soundscape';

interface NavbarProps {
  onOpenReserve: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReserve }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = toggleSoundscape();
    setSoundActive(active);
  };

  const navLinks = [
    { name: 'PERFORMANCE', href: '#performance' },
    { name: 'SHOWROOM', href: '#showroom' },
    { name: 'CONFIGURATOR', href: '#configurator' },
    { name: 'ENGINEERING', href: '#engineering' },
    { name: 'COLLECTION', href: '#gallery' },
    { name: 'WHY NOVAREX', href: '#whynovarex' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top scroll progress indicator bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8E8E8E] via-[#FAFAFA] to-[#C0C0C0] z-50 origin-left"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#"
            className="group flex items-center gap-3 cursor-pointer focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent group-hover:border-white/50 transition-colors">
              <span className="font-heading text-sm text-[#FAFAFA] tracking-widest">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-[22px] tracking-[0.25em] text-titanium font-semibold leading-none">
                NOVAREX
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#BDBDBD] font-mono mt-0.5 uppercase">
                European Hypercars
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[13px] font-medium tracking-[0.22em] text-[#BDBDBD] hover:text-[#FAFAFA] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C0C0C0] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            {/* Audio Soundscape Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundActive ? 'Mute V12 Soundscape' : 'Activate V12 Soundscape'}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-[#BDBDBD] hover:text-[#FAFAFA] transition-all flex items-center gap-2 group text-xs tracking-widest font-mono"
            >
              {soundActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#C0C0C0] animate-pulse" />
                  <span className="hidden sm:inline text-[10px] text-[#C0C0C0]">V12 AUDIO</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#BDBDBD]" />
                  <span className="hidden sm:inline text-[10px]">SOUNDSCAPE</span>
                </>
              )}
            </button>

            {/* Reserve Yours CTA */}
            <button
              onClick={onOpenReserve}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase bg-[#FAFAFA] text-[#0A0A0A] hover:bg-[#C0C0C0] transition-all duration-300 rounded-none shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
            >
              <span>Reserve Yours</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#FAFAFA] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-30 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-center px-8 lg:hidden pt-20"
        >
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-heading text-3xl tracking-[0.2em] text-[#FAFAFA] hover:text-[#C0C0C0] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-8 border-t border-white/10 flex flex-col gap-4 items-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReserve();
                }}
                className="w-full py-4 text-sm font-semibold tracking-[0.25em] uppercase bg-[#FAFAFA] text-[#0A0A0A] hover:bg-[#C0C0C0] transition-colors"
              >
                Reserve Yours
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
