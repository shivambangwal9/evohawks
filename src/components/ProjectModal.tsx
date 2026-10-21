import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { MagneticButton } from './ui/MagneticButton';
import { 
  validateEnquiry, 
  submitEnquiry, 
  buildWhatsAppLeadUrl, 
  buildMailtoLeadUrl,
  type EnquiryPayload, 
  type ValidationErrors 
} from '../utils/leadService';
import { 
  X, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  RotateCcw,
  Send
} from 'lucide-react';

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
  const [formData, setFormData] = useState<EnquiryPayload>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: preselectedService || 'Website Development',
    budget: '25k-50k',
    description: '',
    acceptedPrivacy: false,
    botField: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'unconfigured' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateEnquiry(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmissionStatus('submitting');

    const result = await submitEnquiry(formData);

    if (result.success && result.status === 'sent') {
      setSubmissionStatus('success');
      setStatusMessage(result.message);
    } else if (result.status === 'unconfigured') {
      setSubmissionStatus('unconfigured');
      setStatusMessage(result.message);
    } else {
      setSubmissionStatus('error');
      setStatusMessage(result.message);
    }
  };

  const handleReset = () => {
    setSubmissionStatus('idle');
    setStatusMessage('');
    setFormData({
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      service: preselectedService || 'Website Development',
      budget: '25k-50k',
      description: '',
      acceptedPrivacy: false,
      botField: ''
    });
    setErrors({});
  };

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0A0D18] border border-white/10 rounded-[2.75rem] rounded-tl-sm p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-h-[88vh] overflow-y-auto overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <BorderBeam size={140} duration={10} colorFrom="#0099FF" colorTo="#FF1361" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10 border border-white/5"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* SUCCESS STATE */}
            {submissionStatus === 'success' && (
              <div className="text-center py-6 sm:py-8 space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Enquiry Delivered Successfully
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 font-sans-clean leading-relaxed">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. We have received your project requirements for <strong className="text-[#38BDF8]">{formData.service}</strong>. Our team will review and reply within 24 business hours.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <a
                    href={buildWhatsAppLeadUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Optional: Open on WhatsApp</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors cursor-pointer border border-white/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* UNCONFIGURED FALLBACK */}
            {submissionStatus === 'unconfigured' && (
              <div className="py-4 space-y-4">
                <div className="p-4 rounded-[1.75rem] rounded-tl-sm bg-[#FF1361]/10 border border-[#FF1361]/30 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-[#FF1361] shrink-0 mt-0.5" />
                  <div className="text-xs text-rose-200 leading-relaxed font-sans-clean">
                    <strong className="font-semibold block mb-0.5 text-white">Form Delivery Configuration Notice</strong>
                    The direct form delivery endpoint (<code className="text-[#FF2A85] bg-white/10 px-1 py-0.5 rounded font-mono">VITE_CONTACT_FORM_ENDPOINT</code>) is pending deployment. Please send your compiled brief directly to our team:
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#060810] border border-white/10 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                  {`Name: ${formData.fullName}\nBusiness: ${formData.businessName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nBudget: ${formData.budget}`}
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    href={buildWhatsAppLeadUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Dispatch via WhatsApp</span>
                  </a>

                  <a
                    href={buildMailtoLeadUrl(formData)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#0099FF] to-[#0077EE] text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </a>
                </div>

                <div className="text-center pt-1">
                  <button
                    onClick={handleReset}
                    className="text-xs font-tech text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Back to Form</span>
                  </button>
                </div>
              </div>
            )}

            {/* ERROR STATE */}
            {submissionStatus === 'error' && (
              <div className="py-4 space-y-4">
                <div className="p-4 rounded-[1.75rem] rounded-tl-sm bg-[#FF1361]/10 border border-[#FF1361]/30 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#FF1361] shrink-0 mt-0.5" />
                  <div className="text-xs text-rose-200 leading-relaxed font-sans-clean">
                    <strong className="font-semibold block mb-0.5 text-white">Transmission Error</strong>
                    {statusMessage || 'Unable to deliver message at this time.'}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 shadow-md transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retry Transmission</span>
                  </button>

                  <a
                    href={buildWhatsAppLeadUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* ACTIVE FORM */}
            {(submissionStatus === 'idle' || submissionStatus === 'submitting') && (
              <div>
                <div className="mb-5 sm:mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#38BDF8] text-[11px] font-tech font-bold mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>PROJECT ESTIMATION &amp; SCOPE</span>
                  </div>
                  <h3 id="project-modal-title" className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    Start Your Project
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Tell us about your requirements to get an actionable proposal.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4">
                  
                  {/* Honeypot field */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input
                      type="text"
                      name="botField"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.botField}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-fullName" className="block text-[11px] font-tech text-slate-300 font-bold uppercase mb-1">
                      Your Full Name <span className="text-[#FF1361]">*</span>
                    </label>
                    <input
                      id="modal-fullName"
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#060810] border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                        errors.fullName ? 'border-[#FF1361] focus:border-[#FF1361] bg-[#FF1361]/10' : 'border-white/10 focus:border-[#0099FF]'
                      }`}
                    />
                    {errors.fullName && (
                      <p role="alert" className="text-[#FF2A85] text-[11px] font-sans-clean mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="modal-businessName" className="block text-[11px] font-tech text-slate-300 font-bold uppercase mb-1">
                      Business / Brand Name <span className="text-[#FF1361]">*</span>
                    </label>
                    <input
                      id="modal-businessName"
                      type="text"
                      name="businessName"
                      required
                      placeholder="e.g. Apex Studio"
                      value={formData.businessName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#060810] border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                        errors.businessName ? 'border-[#FF1361] focus:border-[#FF1361] bg-[#FF1361]/10' : 'border-white/10 focus:border-[#0099FF]'
                      }`}
                    />
                    {errors.businessName && (
                      <p role="alert" className="text-[#FF2A85] text-[11px] font-sans-clean mt-1">
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="modal-email" className="block text-[11px] font-tech text-slate-300 font-bold uppercase mb-1">
                        Email Address <span className="text-[#FF1361]">*</span>
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        name="email"
                        required
                        placeholder="vikram@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#060810] border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                          errors.email ? 'border-[#FF1361] focus:border-[#FF1361] bg-[#FF1361]/10' : 'border-white/10 focus:border-[#0099FF]'
                        }`}
                      />
                      {errors.email && (
                        <p role="alert" className="text-[#FF2A85] text-[11px] font-sans-clean mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="modal-phone" className="block text-[11px] font-tech text-slate-300 font-bold uppercase mb-1">
                        Phone / WhatsApp <span className="text-[#FF1361]">*</span>
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 00000"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#060810] border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                          errors.phone ? 'border-[#FF1361] focus:border-[#FF1361] bg-[#FF1361]/10' : 'border-white/10 focus:border-[#0099FF]'
                        }`}
                      />
                      {errors.phone && (
                        <p role="alert" className="text-[#FF2A85] text-[11px] font-sans-clean mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="modal-service" className="block text-[11px] font-tech text-slate-300 font-bold uppercase mb-1">
                        Required Service <span className="text-[#FF1361]">*</span>
                      </label>
                      <select
                        id="modal-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#0099FF] transition-all cursor-pointer"
                      >
                        {AGENCY_CONFIG.serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0A0D18] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="modal-budget" className="block text-[11px] font-tech text-slate-300 font-bold uppercase mb-1">
                        Target Budget <span className="text-[#FF1361]">*</span>
                      </label>
                      <select
                        id="modal-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#0099FF] transition-all cursor-pointer"
                      >
                        {AGENCY_CONFIG.budgetRanges.map((range) => (
                          <option key={range.value} value={range.value} className="bg-[#0A0D18] text-white">
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-description" className="block text-[11px] font-tech text-slate-300 font-bold uppercase mb-1">
                      Project Notes / Timeline <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="modal-description"
                      name="description"
                      rows={2}
                      placeholder="Any specific features, reference links, or target deadlines..."
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] transition-all"
                    />
                  </div>

                  {/* Privacy Agreement */}
                  <div>
                    <label className="flex items-start gap-2 text-xs text-slate-400 font-sans-clean cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="acceptedPrivacy"
                        checked={formData.acceptedPrivacy}
                        onChange={handleChange}
                        className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 text-[#0099FF] focus:ring-[#0099FF] accent-[#0099FF] cursor-pointer"
                      />
                      <span>
                        I agree to Evo Hawks processing these details strictly to prepare our proposal.
                      </span>
                    </label>
                    {errors.acceptedPrivacy && (
                      <p role="alert" className="text-[#FF2A85] text-[11px] font-sans-clean mt-1">
                        {errors.acceptedPrivacy}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <MagneticButton
                      type="submit"
                      disabled={submissionStatus === 'submitting'}
                      className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {submissionStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <span>Request Proposal</span>
                      )}
                    </MagneticButton>

                    <a
                      href={buildWhatsAppLeadUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-full bg-[#060810] border border-emerald-500/30 hover:bg-emerald-500/15 text-emerald-400 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                      title="Send details directly on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
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
