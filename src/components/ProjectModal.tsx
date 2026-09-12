import React, { useState, useEffect } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { MagneticButton } from './ui/MagneticButton';
import { X, MessageCircle, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  isOpen, 
  onClose, 
  preselectedService = '' 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: preselectedService || 'Website Development',
    budget: '25k-50k',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const getWhatsAppUrl = () => {
    const text = `*New Project Lead - Evo Hawks*%0A*Name:* ${formData.fullName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Budget:* ${formData.budget}%0A*Notes:* ${formData.notes || 'N/A'}`;
    return `https://wa.me/${AGENCY_CONFIG.contact.whatsappCleanNumber}?text=${text}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white/95 border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <BorderBeam size={130} duration={10} colorFrom="#0284C7" colorTo="#7C3AED" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6 sm:py-8 space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  Inquiry Received!
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-sans-clean leading-relaxed">
                  Thanks <strong>{formData.fullName}</strong>. We've logged your request for <strong>{formData.service}</strong>. Our team will review and reply within 2 hours.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-5 sm:mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-tech font-bold mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>PROJECT ESTIMATION &amp; SCOPE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                    Start Your Project
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Tell us about your requirements to get an actionable proposal.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div>
                    <label className="block text-[11px] font-tech text-slate-600 font-bold uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-tech text-slate-600 font-bold uppercase mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-tech text-slate-600 font-bold uppercase mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech text-slate-600 font-bold uppercase mb-1">
                      Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
                    >
                      {AGENCY_CONFIG.serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech text-slate-600 font-bold uppercase mb-1">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
                    >
                      {AGENCY_CONFIG.budgetRanges.map((b) => (
                        <option key={b.value} value={b.label} className="bg-white text-slate-900">
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech text-slate-600 font-bold uppercase mb-1">
                      Quick Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share a short summary of what you need..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <MagneticButton
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm hover:shadow-[0_6px_20px_rgba(2,132,199,0.4)] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Send Project Enquiry →</span>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
