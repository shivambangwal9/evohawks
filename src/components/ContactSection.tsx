import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { motion } from 'framer-motion';
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
  Mail, 
  MessageCircle, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  RotateCcw,
  ShieldCheck,
  Send
} from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
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

    // Clear error for field upon typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate Form Inputs
    const { isValid, errors: validationErrors } = validateEnquiry(formData);
    if (!isValid) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(`field-${firstKey}`);
      if (element) element.focus();
      return;
    }

    setErrors({});
    setSubmissionStatus('submitting');

    // 2. Transmit via lead delivery service
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

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>START YOUR GROWTH JOURNEY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-4">
            Let's Build Something That Moves.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans-clean">
            Tell us what you're building, creating or trying to grow. We'll deliver a clear roadmap and proposal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Agency Contacts & Information */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            
            <div className="p-5 sm:p-8 rounded-3xl bg-white/95 border border-slate-200 backdrop-blur-xl space-y-5 sm:space-y-6 relative overflow-hidden shadow-lg">
              <BorderBeam size={130} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />

              <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 mb-2">
                Direct Contact &amp; Consultations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans-clean leading-relaxed">
                Connect directly with our team for strategic consultations, scope definitions, or custom enterprise requirements.
              </p>

              <div className="space-y-3 sm:space-y-4 pt-2">
                {/* Email Item */}
                <motion.a 
                  whileHover={{ x: 4 }}
                  href={`mailto:${AGENCY_CONFIG.contact.email}`}
                  className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">Official Business Email</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                      {AGENCY_CONFIG.contact.email}
                    </div>
                  </div>
                </motion.a>

                {/* WhatsApp Item */}
                <motion.a 
                  whileHover={{ x: 4 }}
                  href={`https://wa.me/${AGENCY_CONFIG.contact.whatsappCleanNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">WhatsApp Direct</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                      {AGENCY_CONFIG.contact.whatsapp}
                    </div>
                  </div>
                </motion.a>

                {/* Operating Location */}
                <div className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">Operating Model</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900">
                      {AGENCY_CONFIG.contact.globalReach}
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours & SLA */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs font-sans-clean text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>Working Hours &amp; Response SLA</span>
                </div>
                <div>{AGENCY_CONFIG.contact.workingHours}</div>
                <div className="text-slate-500 text-[11px] font-tech">{AGENCY_CONFIG.contact.responseTime}</div>
              </div>

            </div>

          </motion.div>

          {/* Right Column: Dynamic Form & Real Delivery */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-10 rounded-3xl bg-white/95 border border-slate-200 backdrop-blur-xl shadow-xl relative overflow-hidden">
              <BorderBeam size={150} duration={14} colorFrom="#0284C7" colorTo="#7C3AED" />

              {/* SUCCESS STATE */}
              {submissionStatus === 'success' && (
                <div className="text-center py-8 sm:py-10 space-y-4 sm:space-y-5 animate-in fade-in duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                    Enquiry Delivered Successfully
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-sans-clean leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Your enquiry has been received at our production desk. Our team will review your brief for <strong>{formData.service}</strong> and respond within 24 business hours.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                    <a
                      href={buildWhatsAppLeadUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-md text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Optional: Open on WhatsApp</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="px-5 py-3 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer text-center"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              )}

              {/* UNCONFIGURED ENDPOINT FALLBACK STATE */}
              {submissionStatus === 'unconfigured' && (
                <div className="py-6 sm:py-8 space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800 leading-relaxed font-sans-clean">
                      <strong className="font-semibold block mb-1">Direct Delivery Service Notice</strong>
                      The web form delivery endpoint is currently awaiting production environment configuration (<code className="text-amber-900 bg-amber-100 px-1 py-0.5 rounded">VITE_CONTACT_FORM_ENDPOINT</code>).
                      Your project brief has been compiled below — dispatch it directly to our leads via WhatsApp or Email:
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {`Name: ${formData.fullName}\nBusiness: ${formData.businessName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nBudget: ${formData.budget}\nBrief: ${formData.description || 'Discuss on call'}`}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={buildWhatsAppLeadUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Dispatch via WhatsApp</span>
                    </a>

                    <a
                      href={buildMailtoLeadUrl(formData)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send via Email Client</span>
                    </a>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => setSubmissionStatus('idle')}
                      className="text-xs font-tech text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Edit Brief Details</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ERROR STATE */}
              {submissionStatus === 'error' && (
                <div className="py-6 sm:py-8 space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-rose-800 leading-relaxed font-sans-clean">
                      <strong className="font-semibold block mb-1">Transmission Notice</strong>
                      {statusMessage || 'An unexpected error occurred while communicating with the destination service.'}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retry Transmission</span>
                    </button>

                    <a
                      href={buildWhatsAppLeadUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* ACTIVE FORM */}
              {(submissionStatus === 'idle' || submissionStatus === 'submitting') && (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  
                  {/* Honeypot field for bot spam */}
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

                  {/* Name & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="field-fullName" className="block text-xs font-tech text-slate-700 uppercase font-bold mb-1.5">
                        Full Name <span className="text-sky-600">*</span>
                      </label>
                      <input
                        id="field-fullName"
                        type="text"
                        name="fullName"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "error-fullName" : undefined}
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                          errors.fullName ? 'border-rose-400 focus:border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                        }`}
                      />
                      {errors.fullName && (
                        <p id="error-fullName" role="alert" className="text-rose-600 text-[11px] font-sans-clean mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="field-businessName" className="block text-xs font-tech text-slate-700 uppercase font-bold mb-1.5">
                        Business / Brand Name <span className="text-sky-600">*</span>
                      </label>
                      <input
                        id="field-businessName"
                        type="text"
                        name="businessName"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.businessName}
                        aria-describedby={errors.businessName ? "error-businessName" : undefined}
                        placeholder="e.g. Apex Studio"
                        value={formData.businessName}
                        onChange={handleChange}
                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                          errors.businessName ? 'border-rose-400 focus:border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                        }`}
                      />
                      {errors.businessName && (
                        <p id="error-businessName" role="alert" className="text-rose-600 text-[11px] font-sans-clean mt-1">
                          {errors.businessName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone / WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="field-email" className="block text-xs font-tech text-slate-700 uppercase font-bold mb-1.5">
                        Email Address <span className="text-sky-600">*</span>
                      </label>
                      <input
                        id="field-email"
                        type="email"
                        name="email"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "error-email" : undefined}
                        placeholder="rahul@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                          errors.email ? 'border-rose-400 focus:border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                        }`}
                      />
                      {errors.email && (
                        <p id="error-email" role="alert" className="text-rose-600 text-[11px] font-sans-clean mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="field-phone" className="block text-xs font-tech text-slate-700 uppercase font-bold mb-1.5">
                        Phone / WhatsApp <span className="text-sky-600">*</span>
                      </label>
                      <input
                        id="field-phone"
                        type="tel"
                        name="phone"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "error-phone" : undefined}
                        placeholder="+91 98765 00000"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                          errors.phone ? 'border-rose-400 focus:border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                        }`}
                      />
                      {errors.phone && (
                        <p id="error-phone" role="alert" className="text-rose-600 text-[11px] font-sans-clean mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label htmlFor="field-service" className="block text-xs font-tech text-slate-700 uppercase font-bold mb-1.5">
                      Primary Service Needed <span className="text-sky-600">*</span>
                    </label>
                    <select
                      id="field-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
                    >
                      {AGENCY_CONFIG.serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-tech text-slate-700 uppercase font-bold mb-1.5">
                      Estimated Project Budget <span className="text-sky-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 min-[480px]:grid-cols-3 gap-2">
                      {AGENCY_CONFIG.budgetRanges.map((range) => {
                        const isSelected = formData.budget === range.value;
                        return (
                          <button
                            type="button"
                            key={range.value}
                            onClick={() => setFormData(prev => ({ ...prev, budget: range.value }))}
                            className={`px-3 py-2.5 rounded-xl text-xs font-tech font-semibold border transition-all cursor-pointer text-center ${
                              isSelected
                                ? 'bg-sky-100 border-sky-400 text-sky-800 shadow-2xs font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            {range.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label htmlFor="field-description" className="block text-xs font-tech text-slate-700 uppercase font-bold mb-1.5">
                      Project Goals &amp; Description <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="field-description"
                      name="description"
                      rows={3}
                      placeholder="Briefly describe your objectives, key features, reference designs, and desired timeline..."
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Privacy Policy Agreement */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 font-sans-clean cursor-pointer select-none">
                      <input
                        id="field-acceptedPrivacy"
                        type="checkbox"
                        name="acceptedPrivacy"
                        checked={formData.acceptedPrivacy}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 accent-sky-600 cursor-pointer"
                      />
                      <span>
                        I consent to Evo Hawks storing and processing these details solely for preparing our project proposal. Confidentiality is strictly respected under our agency NDA.
                      </span>
                    </label>
                    {errors.acceptedPrivacy && (
                      <p role="alert" className="text-rose-600 text-[11px] font-sans-clean mt-1">
                        {errors.acceptedPrivacy}
                      </p>
                    )}
                  </div>

                  {/* Submit Button & WhatsApp Alternative */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <MagneticButton
                      type="submit"
                      disabled={submissionStatus === 'submitting'}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] transition-all cursor-pointer group disabled:opacity-60"
                    >
                      {submissionStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Enquiry</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </MagneticButton>

                    <a
                      href={buildWhatsAppLeadUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>

                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
