import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Maximize2, Shield, Eye } from 'lucide-react';

import heroImg from '../assets/images/hero_hypercar_1785576913617.jpg';
import sideImg from '../assets/images/side_profile_1785576927726.jpg';
import rearImg from '../assets/images/rear_view_1785576940530.jpg';
import interiorImg from '../assets/images/interior_cockpit_1785576953821.jpg';
import detailImg from '../assets/images/detail_shot_1785576969140.jpg';
import windTunnelImg from '../assets/images/wind_tunnel_aero_1785583025972.jpg';

interface ArchiveCard {
  id: string;
  frameLabel: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

interface PhaseData {
  id: string;
  phaseNumber: string;
  pillLabel: string;
  statusBadge: string;
  titleLine1: string;
  titleLine2: string;
  featuredImg: string;
  featuredCaption: string;
  cards: ArchiveCard[];
}

const GALLERY_PHASES: PhaseData[] = [
  {
    id: 'exterior',
    phaseNumber: '01',
    pillLabel: 'PHASE 01 / EXTERIOR',
    statusBadge: 'ARCHIVE PHASE 01 ACTIVE',
    titleLine1: 'EXTERIOR',
    titleLine2: 'ARCHITECTURE',
    featuredImg: heroImg,
    featuredCaption: 'SCULPTED AERODYNAMIC MONOLITH SILHOUETTE',
    cards: [
      {
        id: 'ext-1',
        frameLabel: 'FRAME 01 — EXTERIOR',
        title: 'GOLDEN HOUR SILHOUETTE',
        description: 'Low-slung profile formed from bespoke exposed carbon composite.',
        thumbnailUrl: heroImg
      },
      {
        id: 'ext-2',
        frameLabel: 'FRAME 02 — SILHOUETTE',
        title: 'GROUND-EFFECT PROFILE',
        description: 'Formula 1 proportioned side intakes and boundary air channels.',
        thumbnailUrl: sideImg
      },
      {
        id: 'ext-3',
        frameLabel: 'FRAME 03 — REAR DIFFUSER',
        title: 'ACTIVE LED TAIL DIFFUSER',
        description: 'Continuous aerodynamic blade casting high-intensity ground reflections.',
        thumbnailUrl: rearImg
      }
    ]
  },
  {
    id: 'interior',
    phaseNumber: '02',
    pillLabel: 'PHASE 02 / INTERIOR',
    statusBadge: 'ARCHIVE PHASE 02 ACTIVE',
    titleLine1: 'INTERIOR',
    titleLine2: 'SANCTUARY',
    featuredImg: interiorImg,
    featuredCaption: 'TACTILE HANDCRAFTED MONOCOQUE COCKPIT',
    cards: [
      {
        id: 'int-1',
        frameLabel: 'FRAME 01 — COCKPIT',
        title: 'BILLET TITANIUM DIALS',
        description: 'Machined analog controls designed for tactile precision with zero latency.',
        thumbnailUrl: interiorImg
      },
      {
        id: 'int-2',
        frameLabel: 'FRAME 02 — MATERIALS',
        title: 'ANILINE LEATHER & WEAVE',
        description: 'Hand-stitched Italian leather fused with structural dry carbon trim.',
        thumbnailUrl: detailImg
      },
      {
        id: 'int-3',
        frameLabel: 'FRAME 03 — SEATING',
        title: 'F1 DUAL MONOCOQUE SEATING',
        description: 'Fixed 18-degree reclined seating angle directly integrated into chassis.',
        thumbnailUrl: interiorImg
      }
    ]
  },
  {
    id: 'aerodynamics',
    phaseNumber: '03',
    pillLabel: 'PHASE 03 / AERODYNAMICS',
    statusBadge: 'ARCHIVE PHASE 03 ACTIVE',
    titleLine1: 'AERODYNAMIC',
    titleLine2: 'STREAMLINES',
    featuredImg: windTunnelImg,
    featuredCaption: 'WIND TUNNEL LASER SMOKE FLOW VISUALIZATION',
    cards: [
      {
        id: 'aero-1',
        frameLabel: 'FRAME 01 — WIND TUNNEL',
        title: 'ACTIVE VENTURI TUNNELS',
        description: 'Dual underbody tunnels generating 1,200kg downforce at top speed.',
        thumbnailUrl: windTunnelImg
      },
      {
        id: 'aero-2',
        frameLabel: 'FRAME 02 — WING ACTUATION',
        title: '12MS REAR WING FLAPS',
        description: 'Real-time active flap adjustments based on high-G lateral forces.',
        thumbnailUrl: rearImg
      },
      {
        id: 'aero-3',
        frameLabel: 'FRAME 03 — BOUNDARY LAYER',
        title: 'SUPERSONIC FLOW CHANNELS',
        description: 'Vortex generators keeping laminar airflow attached across roofline.',
        thumbnailUrl: sideImg
      }
    ]
  }
];

export const GallerySection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  const activePhase = GALLERY_PHASES[activePhaseIndex];

  return (
    <section
      id="gallery"
      className="py-24 lg:py-32 bg-[#08080A] relative overflow-hidden border-t border-b border-white/10 select-none"
    >
      {/* Subtle Showroom Ambient Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(250,250,255,0.04)_0%,rgba(180,180,200,0.01)_60%,transparent_80%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* TOP SECTION: PERFECTLY CENTERED EDITORIAL HEADER */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          
          {/* Small Rounded Capsule Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[12px] font-mono tracking-[0.25em] text-[#E0E0E0] uppercase font-semibold">
              VISUAL ARCHIVE & ARTISTRY
            </span>
          </div>

          {/* Large Centered Heading (~88px) */}
          <h2 className="font-heading text-4xl sm:text-6xl lg:text-[88px] text-titanium font-bold tracking-[0.04em] leading-[0.98] uppercase mb-6">
            GALLERY OF ARTISTRY
          </h2>

          {/* Centered Supporting Paragraph */}
          <p className="text-base sm:text-lg text-[#BDBDBD] font-medium leading-relaxed max-w-[760px] mx-auto">
            An exclusive, curated museum archive exploring the engineering mastery, carbon architecture, and silhouette of NOVAREX.
          </p>

          {/* Large Whitespace & Phase Navigation Pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {GALLERY_PHASES.map((phase, idx) => {
              const isActive = idx === activePhaseIndex;

              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`relative px-6 py-3 rounded-full text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-black font-bold shadow-[0_4px_20px_rgba(255,255,255,0.25)]'
                      : 'text-[#A0A0A0] hover:text-white bg-white/[0.04] border border-white/15 hover:border-white/35'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGalleryPill"
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-white rounded-full z-0"
                    />
                  )}
                  <span className="relative z-10">{phase.pillLabel}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* MAIN CONTENT: TWO-COLUMN EDITORIAL LAYOUT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* LEFT COLUMN (~42% / 5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#999999] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span>{activePhase.statusBadge}</span>
              </div>

              {/* Large Editorial Title (56px) */}
              <h3 className="font-heading text-3xl sm:text-4xl lg:text-[56px] text-titanium font-bold uppercase leading-[1.0] tracking-tight mb-8">
                {activePhase.titleLine1} <br />
                {activePhase.titleLine2}
              </h3>

              {/* Large Featured Image Frame */}
              <div
                onClick={() =>
                  setEnlargedImage({
                    url: activePhase.featuredImg,
                    title: `${activePhase.titleLine1} ${activePhase.titleLine2}`,
                    subtitle: activePhase.featuredCaption
                  })
                }
                className="relative group cursor-pointer overflow-hidden rounded-[22px] border border-white/20 bg-[#0B0C0E] shadow-2xl transition-all duration-500 hover:border-white/40"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <motion.img
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1.0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    src={activePhase.featuredImg}
                    alt={activePhase.titleLine1}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Caption & ENLARGE Action */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                    <span className="text-[10px] font-mono tracking-widest text-[#D0D0D0] uppercase truncate max-w-[200px] sm:max-w-[260px]">
                      {activePhase.featuredCaption}
                    </span>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-[10px] font-mono tracking-widest uppercase text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                      <span>ENLARGE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (~58% / 7 Cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-5">
              {activePhase.cards.map((card, cIdx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: cIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.35)' }}
                  onClick={() =>
                    setEnlargedImage({
                      url: card.thumbnailUrl,
                      title: card.title,
                      subtitle: card.description
                    })
                  }
                  className="glass-card p-6 rounded-[22px] border border-white/15 bg-[#0D0E11]/90 backdrop-blur-xl shadow-xl hover:bg-[#121318] transition-all duration-500 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative group overflow-hidden"
                >
                  {/* Surface Reflection Sweep on Hover */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none mix-blend-overlay"
                  />

                  <div className="flex items-center gap-5 z-10 w-full sm:w-auto">
                    {/* Small Landscape Thumbnail */}
                    <div className="w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-[#08080A]">
                      <img
                        src={card.thumbnailUrl}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      {/* Small Category Label */}
                      <span className="text-[11px] font-mono tracking-[0.2em] text-[#888888] uppercase block mb-1">
                        {card.frameLabel}
                      </span>

                      {/* Large Bold Title (32px) */}
                      <h4 className="font-heading text-xl sm:text-2xl lg:text-[30px] text-titanium font-bold uppercase leading-[1.05] tracking-tight mb-1 group-hover:text-white transition-colors">
                        {card.title}
                      </h4>

                      {/* One-line Supporting Description */}
                      <p className="text-xs sm:text-sm text-[#BDBDBD] font-light leading-snug line-clamp-1">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* VIEW Action Button */}
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs font-mono tracking-widest text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0 z-10 self-end sm:self-center">
                    <span>VIEW</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Footer Archive Note */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#888888]">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-titanium" />
            <span className="tracking-widest uppercase">
              NOVAREX ARCHIVAL VAULT // PRIVATE EXHIBITION
            </span>
          </div>
          <span className="mt-2 sm:mt-0 text-[#666666]">
            SPEC SPECIFICATION REF #NVR-ARCHIVE-2027
          </span>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR ENLARGING GALLERY IMAGES */}
      <AnimatePresence>
        {enlargedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl"
            data-lenis-prevent="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#0B0C0E] border border-white/20 rounded-[26px] overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setEnlargedImage(null)}
                className="absolute top-5 right-5 z-20 p-3 rounded-full bg-black/80 border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Image */}
              <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center max-h-[70vh]">
                <img
                  src={enlargedImage.url}
                  alt={enlargedImage.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption Footer */}
              <div className="p-6 bg-[#0D0E11] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#888888] uppercase block mb-1">
                    NOVAREX ARCHIVAL MASTERPIECE
                  </span>
                  <h3 className="font-heading text-2xl text-titanium font-bold uppercase">
                    {enlargedImage.title}
                  </h3>
                  <p className="text-xs text-[#BDBDBD] font-light mt-1">
                    {enlargedImage.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setEnlargedImage(null)}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#CCCCCC] transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
