import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EDITIONS } from '../data/novarexData';
import { X, CheckCircle, Send, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({ isOpen, onClose }) => {
  const [selectedEdition, setSelectedEdition] = useState(EDITIONS[0].name);
  const [selectedFinish, setSelectedFinish] = useState('Matte Titanium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allocationId, setAllocationId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    comments: ''
  });

  const finishes = ['Matte Titanium', 'Exposed Carbon Weave', 'Monaco Midnight Black', 'Pearl Satin White'];

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const id = 'NVX-' + Math.floor(100000 + Math.random() * 900000);
      setAllocationId(id);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory subtle metallic confetti
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#FFFFFF', '#C0C0C0', '#8A8A8A', '#FAFAFA']
        });
      } catch {
        // ignore
      }
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitting(false);
    setIsSubmitted(false);
    setFormData({ fullName: '', email: '', phone: '', country: '', comments: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel p-6 sm:p-8 max-w-2xl w-full border border-white/20 relative shadow-2xl my-auto max-h-[88vh] flex flex-col"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
        >
          {/* Header - Fixed inside modal */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6 shrink-0 relative">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#C0C0C0] uppercase block mb-1">
                PRIVATE REGISTRY ALLOCATION
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-titanium uppercase">
                RESERVE YOUR NOVAREX
              </h2>
              <p className="text-xs text-[#BDBDBD] font-light mt-1">
                Specify your preferred hypercar edition and details. Scroll down to review all specifications.
              </p>
            </div>
            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className="p-2 rounded-full border border-white/15 text-[#BDBDBD] hover:text-[#FAFAFA] hover:bg-white/10 transition-colors shrink-0 ml-4"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSubmitted ? (
            /* Scrollable Content Body */
            <div
              className="overflow-y-auto modal-scrollbar pr-3 space-y-6 flex-1 touch-pan-y"
              data-lenis-prevent="true"
            >
              {/* Scroll Helper Indicator */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] font-mono text-[#C0C0C0]">
                <span>SPECIFICATION & FORM SECTIONS</span>
                <span className="flex items-center gap-1 text-[#FAFAFA] animate-bounce">
                  SCROLL TO VIEW <ChevronDown className="w-3 h-3" />
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Select Edition */}
                <div>
                  <label className="text-xs font-mono text-[#FAFAFA] uppercase tracking-widest block mb-3 font-semibold">
                    1. SELECT SPECIFICATION EDITION
                  </label>
                  <div className="space-y-3">
                    {EDITIONS.map((edition) => (
                      <div
                        key={edition.name}
                        onClick={() => setSelectedEdition(edition.name)}
                        className={`p-4 border cursor-pointer transition-all ${
                          selectedEdition === edition.name
                            ? 'bg-white/10 border-white/50 shadow-lg'
                            : 'bg-white/5 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold font-mono text-[#FAFAFA]">
                            {edition.name}
                          </span>
                          <span className="text-xs font-num font-semibold text-[#C0C0C0]">
                            {edition.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#BDBDBD] font-light">
                          {edition.highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Finish Selection */}
                <div>
                  <label className="text-xs font-mono text-[#FAFAFA] uppercase tracking-widest block mb-3 font-semibold">
                    2. EXTERIOR FINISH SELECTION
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {finishes.map((finish) => (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`p-3 text-left text-xs font-mono border transition-all ${
                          selectedFinish === finish
                            ? 'bg-[#FAFAFA] text-[#0A0A0A] border-white font-bold'
                            : 'bg-white/5 text-[#BDBDBD] border-white/10 hover:border-white/20'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <label className="text-xs font-mono text-[#FAFAFA] uppercase tracking-widest block mb-3 font-semibold">
                    3. APPLICANT DETAILS
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 px-4 py-3 text-xs text-[#FAFAFA] placeholder-[#8E8E8E] focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 px-4 py-3 text-xs text-[#FAFAFA] placeholder-[#8E8E8E] focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 px-4 py-3 text-xs text-[#FAFAFA] placeholder-[#8E8E8E] focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Country / Region *"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 px-4 py-3 text-xs text-[#FAFAFA] placeholder-[#8E8E8E] focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="text-xs font-mono text-[#FAFAFA] uppercase tracking-widest block mb-3 font-semibold">
                    4. BESPOKE REQUESTS & NOTES
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Bespoke requests or custom delivery instructions (Optional)"
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 px-4 py-3 text-xs text-[#FAFAFA] placeholder-[#8E8E8E] focus:outline-none focus:border-white resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs font-semibold tracking-[0.25em] uppercase bg-[#FAFAFA] text-[#0A0A0A] hover:bg-[#C0C0C0] disabled:opacity-50 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>PROCESSING RESERVATION...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>CONFIRM RESERVATION</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation State - State-Based Success View replacing the form */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-6 space-y-6 overflow-y-auto modal-scrollbar flex-1"
            >
              <div className="w-20 h-20 rounded-full border border-white/40 bg-white/10 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(255,255,255,0.15)] animate-pulse">
                <CheckCircle className="w-10 h-10 text-[#FAFAFA]" />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-[0.35em] text-[#C0C0C0] uppercase block mb-1 font-semibold">
                  RESERVATION VERIFIED & REGISTERED
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl text-titanium uppercase">
                  WELCOME TO THE NOVAREX REGISTRY
                </h2>
                <p className="text-xs text-[#BDBDBD] font-light max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <span className="text-[#FAFAFA] font-medium">{formData.fullName || 'Valued Client'}</span>.
                  Your reservation for the <span className="text-[#FAFAFA] font-medium">{selectedEdition}</span> in <span className="text-[#FAFAFA] font-medium">{selectedFinish}</span> has been confirmed.
                </p>
              </div>

              <div className="p-6 bg-white/5 border border-white/15 text-left max-w-md mx-auto space-y-3 rounded-none shadow-2xl">
                <div className="flex justify-between text-xs font-mono text-[#C0C0C0] border-b border-white/10 pb-2">
                  <span>DOCKET ID:</span>
                  <span className="font-bold text-[#FAFAFA]">{allocationId}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-[#C0C0C0] border-b border-white/10 pb-2">
                  <span>EDITION:</span>
                  <span className="font-bold text-[#FAFAFA]">{selectedEdition}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-[#C0C0C0] border-b border-white/10 pb-2">
                  <span>FINISH:</span>
                  <span className="text-[#FAFAFA]">{selectedFinish}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-[#C0C0C0] border-b border-white/10 pb-2">
                  <span>STATUS:</span>
                  <span className="font-bold text-emerald-400">PRIORITY ALLOCATION ASSIGNED</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-[#C0C0C0]">
                  <span>EMAIL NOTIFICATION:</span>
                  <span className="text-[#FAFAFA] truncate max-w-[180px]">{formData.email || 'Sent'}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-10 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase bg-[#FAFAFA] text-[#0A0A0A] hover:bg-[#C0C0C0] transition-colors cursor-pointer shadow-lg"
                >
                  Return To Showroom
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
