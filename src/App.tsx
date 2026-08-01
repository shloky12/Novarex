import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { LuxuryStudioBackground } from './components/LuxuryStudioBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PerformanceSection } from './components/PerformanceSection';
import { ShowroomExperience } from './components/ShowroomExperience';
import { ConfiguratorSection } from './components/ConfiguratorSection';
import { EngineeringSection } from './components/EngineeringSection';
import { GallerySection } from './components/GallerySection';
import { WhyNovarex } from './components/WhyNovarex';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ReserveModal } from './components/ReserveModal';

export default function App() {
  const [reserveModalOpen, setReserveModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-[#FAFAFA] font-body min-h-screen selection:bg-[#C0C0C0] selection:text-[#0A0A0A] relative overflow-x-hidden">
      {/* Luxurious European Studio Background Atmosphere */}
      <LuxuryStudioBackground />

      {/* Luxury Loading Sequence */}
      <LoadingScreen />

      {/* Custom Luxury Precision Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar onOpenReserve={() => setReserveModalOpen(true)} />

      {/* Storyline Chapter Flow */}
      <main>
        {/* Chapter 1: Arrival */}
        <Hero onOpenReserve={() => setReserveModalOpen(true)} />

        {/* Chapter 2: Power (Dynamic Telemetry) */}
        <PerformanceSection />

        {/* Chapter 3: Craftsmanship (Showroom Unveiling) */}
        <ShowroomExperience onOpenReserve={() => setReserveModalOpen(true)} />

        {/* Signature Experience: NOVAREX Configurator */}
        <ConfiguratorSection />

        {/* Chapter 4: Innovation (Aerospace Engineering) */}
        <EngineeringSection />

        {/* Chapter 5: Experience (The NOVAREX Collection) */}
        <GallerySection />

        {/* Chapter 6: Exclusivity & Heritage */}
        <WhyNovarex />

        {/* Chapter 7: Reservation (Limited Allocation CTA) */}
        <FinalCTA onOpenReserve={() => setReserveModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Allocation Private Registry Modal */}
      <ReserveModal isOpen={reserveModalOpen} onClose={() => setReserveModalOpen(false)} />
    </div>
  );
}
