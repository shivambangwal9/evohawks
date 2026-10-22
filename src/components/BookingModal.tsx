import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  ShieldCheck,
  Send
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { 
  submitConsultation, 
  buildWhatsAppConsultationUrl, 
  buildMailtoConsultationUrl,
  type ConsultationPayload, 
  type ConsultationValidationErrors,
  type SubmissionResult 
} from '../utils/leadService';
import { trackEvent } from '../utils/analytics';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTopic?: string;
}

const BookingModalContent: React.FC<{ onClose: () => void; preselectedTopic: string }> = ({
  onClose,
  preselectedTopic
}) => {
  const [formData, setFormData] = useState<ConsultationPayload>(() => ({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    format: 'Google Meet',
    timeSlot: 'Morning (09:00 - 12:00 IST)',
    topic: preselectedTopic,
    acceptedPrivacy: true,
    botField: ''
  }));

  const [errors, setErrors] = useState<ConsultationValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    trackEvent('booking_modal_opened', { topic: preselectedTopic || 'general' });
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, preselectedTopic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setResult(null);

    const submission = await submitConsultation(formData);
    setIsSubmitting(false);
    setResult(submission);

    if (submission.success) {
      trackEvent('booking_submitted', { format: formData.format, timeSlot: formData.timeSlot });
    }
  };

  const isConfiguredCalendar = AGENCY_CONFIG.booking.isConfigured && AGENCY_CONFIG.booking.bookingUrl;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto backdrop-blur-md bg-black/85"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#0A0D18] rounded-[2.75rem] rounded-tl-sm border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden my-auto text-white"
        >
          <BorderBeam size={160} duration={12} colorFrom="#0099FF" colorTo="#FF1361" />

          {/* Modal Header */}
          <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-2 shadow-[0_0_15px_rgba(0,153,255,0.15)]">
                <Calendar className="w-3.5 h-3.5 text-[#0099FF]" />
                <span>30-MINUTE DIGITAL STRATEGY SESSION</span>
              </div>
              <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-display font-black text-white tracking-tight">
                Schedule a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] to-[#FF1361]">1-on-1 Consultation</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-sans-clean mt-1">
                Zero sales pressure. A direct technical and strategic review of your digital presence.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 pt-5 max-h-[75vh] overflow-y-auto">
            {/* If live calendar is configured */}
            {isConfiguredCalendar ? (
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  Select a live time slot directly on our calendar:
                </p>
                <div className="p-6 rounded-[2rem] bg-[#060810] border border-white/10 text-center">
                  <a
                    href={AGENCY_CONFIG.booking.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] text-white font-bold text-sm shadow-[0_0_25px_rgba(255,19,97,0.35)] transition-all"
                  >
                    <span>Open Calendar in New Tab</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              /* Honest Direct Consultation Request Flow */
              <>
                {/* 3-Step Clear Explainer */}
                <div className="mb-6 p-4.5 rounded-[2rem] rounded-tl-sm bg-[#060810] border border-white/10">
                  <div className="text-[11px] font-tech font-bold text-[#38BDF8] uppercase tracking-wider mb-2.5">
                    What happens next:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#0099FF]/15 text-[#38BDF8] border border-[#0099FF]/30 font-tech font-bold flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                      <span>We review your requirements within 24 business hours.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#FF1361]/15 text-[#FF2A85] border border-[#FF1361]/30 font-tech font-bold flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                      <span>We email a calendar invite matching your preferred slot.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-tech font-bold flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                      <span>30-minute actionable audit &amp; scope alignment.</span>
                    </div>
                  </div>
                </div>

                {/* Success or Unconfigured Fallback Notice */}
                {result && (
                  <div className={`p-4 rounded-[1.75rem] border mb-6 ${
                    result.status === 'sent' 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                      : result.status === 'unconfigured'
                      ? 'bg-[#FF1361]/10 border-[#FF1361]/30 text-rose-200'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}>
                    <div className="flex items-start gap-3">
                      {result.status === 'sent' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-[#FF1361] flex-shrink-0 mt-0.5" />
                      )}
                      <div className="text-xs sm:text-sm">
                        <div className="font-bold mb-1 text-white">
                          {result.status === 'sent' ? 'Consultation Request Logged' : 'Direct Dispatch Available'}
                        </div>
                        <p className="leading-relaxed mb-3">
                          {result.message}
                        </p>

                        {/* Direct fallback buttons if server endpoint unconfigured */}
                        {result.status !== 'sent' && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            <a
                              href={buildWhatsAppConsultationUrl(formData)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Dispatch via WhatsApp</span>
                            </a>
                            <a
                              href={buildMailtoConsultationUrl(formData)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Dispatch via Email</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Consultation Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from real users) */}
                  <input
                    type="text"
                    name="botField"
                    value={formData.botField}
                    onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                    className="sr-only"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF]/40"
                      />
                      {errors.fullName && <p className="text-[11px] text-[#FF2A85] mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Work / Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF]/40"
                      />
                      {errors.email && <p className="text-[11px] text-[#FF2A85] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF]/40"
                      />
                      {errors.phone && <p className="text-[11px] text-[#FF2A85] mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Brand or Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Acme Studio"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF]/40"
                      />
                    </div>
                  </div>

                  {/* Format Selection */}
                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Preferred Consultation Format
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Google Meet', 'WhatsApp Call', 'Phone Call'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setFormData({ ...formData, format: fmt })}
                          className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            formData.format === fmt
                              ? 'bg-[#0099FF]/15 border-[#0099FF] text-white shadow-[0_0_15px_rgba(0,153,255,0.25)]'
                              : 'bg-[#060810] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {fmt === 'Google Meet' && <Video className="w-4 h-4 text-[#0099FF]" />}
                          {fmt === 'WhatsApp Call' && <MessageSquare className="w-4 h-4 text-emerald-400" />}
                          {fmt === 'Phone Call' && <Phone className="w-4 h-4 text-[#FF2A85]" />}
                          <span>{fmt}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Time Window */}
                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Preferred Time Slot (IST)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(['Morning (09:00 - 12:00 IST)', 'Afternoon (12:00 - 16:00 IST)', 'Evening (16:00 - 20:00 IST)'] as const).map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={`p-2.5 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            formData.timeSlot === slot
                              ? 'bg-[#FF1361]/15 border-[#FF1361] text-white shadow-[0_0_15px_rgba(255,19,97,0.25)]'
                              : 'bg-[#060810] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>{slot.split(' ')[0]}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({slot.split('(')[1].split(' ')[0]})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Objective Textarea */}
                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      What is your primary goal or challenge? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      placeholder="e.g. We need to rebuild our website for higher speed and conversion, and launch a targeted ad campaign for Q3."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF]/40 resize-none"
                    />
                    {errors.topic && <p className="text-[11px] text-[#FF2A85] mt-1">{errors.topic}</p>}
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="booking-privacy"
                      checked={formData.acceptedPrivacy}
                      onChange={(e) => setFormData({ ...formData, acceptedPrivacy: e.target.checked })}
                      className="mt-1 rounded border-white/20 text-[#0099FF] focus:ring-[#0099FF] accent-[#0099FF] cursor-pointer"
                    />
                    <label htmlFor="booking-privacy" className="text-xs text-slate-400 cursor-pointer">
                      I agree to receive a calendar invitation and strategy brief from Evo Hawks. We respect your privacy and never sell contact data.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_30px_rgba(255,19,97,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <span>Request Consultation Slot</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center pt-1 font-tech">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0099FF]" />
                    <span>30 Minutes • Senior Strategist • Actionable Takeaways</span>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedTopic = ''
}) => {
  if (!isOpen) return null;
  return (
    <BookingModalContent 
      key={preselectedTopic || 'consultation-modal'} 
      onClose={onClose} 
      preselectedTopic={preselectedTopic} 
    />
  );
};
