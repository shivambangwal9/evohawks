import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  Briefcase, 
  User, 
  Wallet,
  Globe,
  Video,
  TrendingUp,
  Share2
} from 'lucide-react';
import { AGENCY_CONFIG, SERVICES_DATA } from '../data/agencyData';
import { 
  submitEnquiry, 
  buildWhatsAppLeadUrl, 
  buildMailtoLeadUrl, 
  type EnquiryPayload, 
  type SubmissionResult 
} from '../utils/leadService';
import { trackEvent } from '../utils/analytics';
import { BorderBeam } from '../components/ui/BorderBeam';
import type { PageId } from '../hooks/usePageRouter';

interface StartProjectPageProps {
  onNavigate: (page: PageId, slug?: string) => void;
  preselectedService?: string;
}

export const StartProjectPage: React.FC<StartProjectPageProps> = ({ 
  onNavigate,
  preselectedService 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  // Form State
  const [formData, setFormData] = useState<EnquiryPayload>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: preselectedService || 'Website Development',
    budget: '₹25,000 – ₹60,000',
    description: '',
    acceptedPrivacy: true,
    botField: '',
    websiteOrSocial: '',
    additionalServices: [],
    businessGoal: 'Increase qualified sales leads and online conversion',
    targetAudience: '',
    deadline: 'Within 2–4 weeks',
    engagementType: 'One-time project',
    preferredContactMethod: 'WhatsApp',
    conditionalDetails: {}
  });

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (minimum 2 characters).';
    }
    if (!formData.businessName.trim() || formData.businessName.trim().length < 2) {
      errors.businessName = 'Please enter your business or project name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid business email address.';
    }
    const digits = (formData.phone || '').replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      errors.phone = 'Please enter a valid phone or WhatsApp number (10–15 digits).';
    }
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.service || formData.service.trim().length === 0) {
      errors.service = 'Please select a primary service required.';
    }
    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = 'Please provide a short description of what you want to achieve (minimum 10 characters).';
    }
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (!formData.budget || formData.budget.trim().length === 0) {
      errors.budget = 'Please select an estimated budget range.';
    }
    if (!formData.acceptedPrivacy) {
      errors.acceptedPrivacy = 'You must acknowledge the privacy notice to proceed.';
    }
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        trackEvent('start_project_step', { step: 2 });
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        trackEvent('start_project_step', { step: 3 });
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setResult(null);

    const submission = await submitEnquiry(formData);
    setIsSubmitting(false);
    setResult(submission);

    if (submission.success) {
      trackEvent('start_project_submitted', { service: formData.service, budget: formData.budget });
      window.scrollTo({ top: 250, behavior: 'smooth' });
    }
  };

  const handleAdditionalServiceToggle = (srv: string) => {
    setFormData(prev => {
      const current = prev.additionalServices || [];
      const updated = current.includes(srv)
        ? current.filter(item => item !== srv)
        : [...current, srv];
      return { ...prev, additionalServices: updated };
    });
  };

  const handleConditionalDetailChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      conditionalDetails: {
        ...(prev.conditionalDetails || {}),
        [key]: value
      }
    }));
  };

  // Check which conditional questions to show
  const isVideo = formData.service.toLowerCase().includes('video');
  const isWeb = formData.service.toLowerCase().includes('website') || formData.service.toLowerCase().includes('shopify');
  const isAds = formData.service.toLowerCase().includes('ad') || formData.service.toLowerCase().includes('marketing');
  const isSocial = formData.service.toLowerCase().includes('social');

  return (
    <div className="pt-28 pb-20 overflow-hidden min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-tech text-[#38BDF8] hover:text-white font-bold cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </button>
      </div>

      {/* Hero Header */}
      <section className="relative py-10 sm:py-14 bg-transparent bg-grid-cyber">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D1A]/90 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF1361]" />
            <span className="tracking-wider">QUALIFIED PROJECT INTAKE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight mb-4">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Project Sprint</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 font-sans-clean max-w-2xl mx-auto leading-relaxed">
            Answer a few quick questions so our senior technical and creative leads can review your requirements and provide an actionable scope within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Multi-Step Form Container */}
      <section className="relative pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Progress Indicator - Asymmetric Stadium Capsule */}
          <div className="mb-10 p-4 sm:p-5 rounded-[2.5rem] bg-[#0A0D18]/90 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex items-center justify-between">
            {[
              { num: 1, label: 'Contact', icon: User },
              { num: 2, label: 'Requirements', icon: Briefcase },
              { num: 3, label: 'Budget & Scope', icon: Wallet },
            ].map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.num;
              const isDone = currentStep > step.num;
              return (
                <div key={step.num} className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-tech font-bold transition-all ${
                    isDone 
                      ? 'bg-[#0099FF] text-white shadow-[0_0_15px_rgba(0,153,255,0.4)]' 
                      : isActive 
                      ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white shadow-[0_0_20px_rgba(255,19,97,0.4)]' 
                      : 'bg-[#060810] text-slate-500 border border-white/10'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-[10px] font-tech text-slate-400 font-bold uppercase tracking-wider">
                      Step 0{step.num}
                    </div>
                    <div className={`text-xs font-display font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {step.label}
                    </div>
                  </div>
                  {step.num < 3 && (
                    <div className="w-8 sm:w-16 h-0.5 bg-white/10 mx-1 sm:mx-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Card - Asymmetric Console Pod */}
          <div className="relative rounded-[3rem] rounded-tl-lg rounded-br-lg bg-[#0A0D18]/95 border border-white/10 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <BorderBeam size={160} duration={12} colorFrom="#0099FF" colorTo="#FF1361" />

            {/* Submission Result Notice */}
            {result && (
              <div className={`p-6 rounded-2xl border mb-8 ${
                result.status === 'sent' 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
                  : result.status === 'unconfigured'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  : 'bg-[#FF1361]/10 border-[#FF1361]/30 text-rose-200'
              }`}>
                <div className="flex items-start gap-4">
                  {result.status === 'sent' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="text-base font-display font-bold mb-1 text-white">
                      {result.status === 'sent' ? 'Project Brief Delivered Successfully!' : 'Direct Delivery Dispatch Available'}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed mb-4 text-slate-300">
                      {result.message}
                    </p>

                    {result.status !== 'sent' && (
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={buildWhatsAppLeadUrl(formData)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Dispatch via WhatsApp</span>
                        </a>
                        <a
                          href={buildMailtoLeadUrl(formData)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#060810] hover:bg-[#0E1220] border border-white/20 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                        >
                          <Send className="w-4 h-4 text-[#38BDF8]" />
                          <span>Dispatch via Email</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Contact Details */}
            {currentStep === 1 && !result?.success && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNextStep}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white">
                    Step 1: Your Contact Information
                  </h2>
                  <p className="text-xs text-slate-400 font-sans-clean mt-1">
                    Who should our team contact regarding your proposal and discovery call?
                  </p>
                </div>

                {/* Honeypot field for anti-spam */}
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
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:shadow-[0_0_15px_rgba(0,153,255,0.25)] transition-all"
                    />
                    {stepErrors.fullName && <p className="text-[11px] text-[#FF2A85] mt-1 font-semibold">{stepErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Business or Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Acme Tech Studio"
                      className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:shadow-[0_0_15px_rgba(0,153,255,0.25)] transition-all"
                    />
                    {stepErrors.businessName && <p className="text-[11px] text-[#FF2A85] mt-1 font-semibold">{stepErrors.businessName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Work / Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@acmestudio.com"
                      className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:shadow-[0_0_15px_rgba(0,153,255,0.25)] transition-all"
                    />
                    {stepErrors.email && <p className="text-[11px] text-[#FF2A85] mt-1 font-semibold">{stepErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:shadow-[0_0_15px_rgba(0,153,255,0.25)] transition-all"
                    />
                    {stepErrors.phone && <p className="text-[11px] text-[#FF2A85] mt-1 font-semibold">{stepErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Current Website or Social Profile (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.websiteOrSocial}
                    onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                    placeholder="https://acmestudio.com or @acmestudio"
                    className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:shadow-[0_0_15px_rgba(0,153,255,0.25)] transition-all"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
                  >
                    <span>Next: Project Requirements</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 2: Project Requirements & Conditional Details */}
            {currentStep === 2 && !result?.success && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNextStep}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-display font-black text-white">
                    Step 2: Project Requirements &amp; Scope
                  </h2>
                  <p className="text-xs text-slate-400 font-sans-clean mt-1">
                    Select your primary service discipline and configure project parameters.
                  </p>
                </div>

                {/* Primary Service Selection Grid */}
                <div>
                  <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Primary Discipline Needed *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES_DATA.map((srv, idx) => {
                      const isSelected = formData.service === srv.title;
                      const isEven = idx % 2 === 0;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv.title })}
                          className={`p-3.5 ${isEven ? 'rounded-[1.75rem] rounded-tl-sm' : 'rounded-[1.75rem] rounded-tr-sm'} border text-left flex items-start gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#0099FF]/15 to-[#FF1361]/15 border-[#0099FF] text-white shadow-[0_0_20px_rgba(0,153,255,0.25)]'
                              : 'bg-[#060810]/80 border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? 'border-[#0099FF] bg-[#0099FF]' : 'border-white/20'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight">{srv.title}</div>
                            <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{srv.tagline}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Conditional Questions */}
                {isVideo && (
                  <div className="p-5 rounded-[2rem] rounded-tl-md bg-gradient-to-br from-[#0A0D18] to-[#060810] border border-[#0099FF]/30 space-y-3.5 shadow-[0_0_25px_rgba(0,153,255,0.08)]">
                    <div className="text-xs font-tech font-bold text-[#38BDF8] flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#0099FF]" />
                      <span>Video Production Specifications</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1.5">Shoot Location / Type</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-white/10 bg-[#050508] text-slate-200 focus:outline-none focus:border-[#0099FF]"
                          onChange={(e) => handleConditionalDetailChange('Shoot Format', e.target.value)}
                        >
                          <option value="On-location physical shoot required">On-location physical shoot required</option>
                          <option value="Editing-only (we provide footage)">Editing-only (we provide footage)</option>
                          <option value="Remote / Studio production">Remote / Studio production</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1.5">Estimated Video Length / Count</label>
                        <input
                          type="text"
                          placeholder="e.g. 8 vertical reels, 1 commercial"
                          className="w-full p-2.5 rounded-xl border border-white/10 bg-[#050508] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                          onChange={(e) => handleConditionalDetailChange('Deliverables Volume', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {isWeb && (
                  <div className="p-5 rounded-[2rem] rounded-tr-md bg-gradient-to-br from-[#0A0D18] to-[#060810] border border-[#38BDF8]/30 space-y-3.5 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
                    <div className="text-xs font-tech font-bold text-[#38BDF8] flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#38BDF8]" />
                      <span>Website Architecture Specifics</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1.5">Type of Website</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-white/10 bg-[#050508] text-slate-200 focus:outline-none focus:border-[#0099FF]"
                          onChange={(e) => handleConditionalDetailChange('Website Type', e.target.value)}
                        >
                          <option value="Custom Business Website (React / Vite)">Custom Business Website (React / Vite)</option>
                          <option value="Shopify Store / E-commerce">Shopify Store / E-commerce</option>
                          <option value="High-Converting Paid Ad Landing Page">High-Converting Paid Ad Landing Page</option>
                          <option value="Complete Website Redesign">Complete Website Redesign</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1.5">Domain &amp; Content Status</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-white/10 bg-[#050508] text-slate-200 focus:outline-none focus:border-[#0099FF]"
                          onChange={(e) => handleConditionalDetailChange('Domain Status', e.target.value)}
                        >
                          <option value="Domain and content ready">Domain and content ready</option>
                          <option value="Need assistance with domain/content">Need assistance with domain/content</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {isAds && (
                  <div className="p-5 rounded-[2rem] rounded-bl-md bg-gradient-to-br from-[#0A0D18] to-[#060810] border border-[#FF1361]/30 space-y-3.5 shadow-[0_0_25px_rgba(255,19,97,0.08)]">
                    <div className="text-xs font-tech font-bold text-[#FF2A85] flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#FF1361]" />
                      <span>Advertising Funnel Objectives</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1.5">Primary Campaign Objective</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-white/10 bg-[#050508] text-slate-200 focus:outline-none focus:border-[#FF1361]"
                          onChange={(e) => handleConditionalDetailChange('Ad Objective', e.target.value)}
                        >
                          <option value="Lead Generation (Calls / WhatsApp)">Lead Generation (Calls / WhatsApp)</option>
                          <option value="E-commerce Purchase Conversions">E-commerce Purchase Conversions</option>
                          <option value="Brand Awareness & Video Views">Brand Awareness & Video Views</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1.5">Existing Meta Ad Account?</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-white/10 bg-[#050508] text-slate-200 focus:outline-none focus:border-[#FF1361]"
                          onChange={(e) => handleConditionalDetailChange('Ad Account Status', e.target.value)}
                        >
                          <option value="Yes, active account exists">Yes, active account exists</option>
                          <option value="No, need fresh account setup">No, need fresh account setup</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {isSocial && (
                  <div className="p-5 rounded-[2rem] rounded-br-md bg-gradient-to-br from-[#0A0D18] to-[#060810] border border-[#0099FF]/30 space-y-3.5 shadow-[0_0_25px_rgba(0,153,255,0.08)]">
                    <div className="text-xs font-tech font-bold text-[#38BDF8] flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-[#0099FF]" />
                      <span>Social Media Platform Focus</span>
                    </div>
                    <div className="text-xs text-slate-300 font-semibold mb-1.5">Primary Channels to Manage</div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'X (Twitter)'].map((plat) => (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => handleConditionalDetailChange(`Platform: ${plat}`, 'Included')}
                          className="px-3.5 py-1.5 rounded-full border border-white/10 bg-[#050508] hover:border-[#FF1361] hover:text-white text-slate-300 transition-colors"
                        >
                          + {plat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Services Multi-Select */}
                <div>
                  <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Additional Complementary Services (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES_DATA.filter(s => s.title !== formData.service).map((srv) => {
                      const isChecked = formData.additionalServices?.includes(srv.title);
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => handleAdditionalServiceToggle(srv.title)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white border-transparent shadow-[0_0_15px_rgba(255,19,97,0.3)]'
                              : 'bg-[#060810] text-slate-300 border-white/10 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {isChecked ? '✓ ' : '+ '} {srv.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Brief Project Description &amp; Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your current business challenge, required deliverables, target timeline, or what a successful engagement looks like."
                    className="w-full px-4 py-3.5 rounded-[1.5rem] border border-white/10 bg-[#060810] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] resize-none"
                  />
                  {stepErrors.description && <p className="text-[11px] text-[#FF2A85] mt-1">{stepErrors.description}</p>}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-[#0A0D18] border border-white/10 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
                  >
                    <span>Next: Budget &amp; Engagement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 3: Budget, Engagement & Final Confirmation */}
            {currentStep === 3 && !result?.success && (
              <motion.form 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleFinalSubmit}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-display font-black text-white">
                    Step 3: Budget Allocation &amp; Timeline
                  </h2>
                  <p className="text-xs text-slate-400 font-sans-clean mt-1">
                    Transparent expectations ensure our initial proposal aligns precisely with your scope.
                  </p>
                </div>

                {/* Budget Selection */}
                <div>
                  <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Estimated Budget Allocation *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {AGENCY_CONFIG.budgetRanges.map((range, idx) => {
                      const isSelected = formData.budget === range.label;
                      const isEven = idx % 2 === 0;
                      return (
                        <button
                          key={range.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: range.label })}
                          className={`p-3.5 ${isEven ? 'rounded-[1.5rem] rounded-tl-sm' : 'rounded-[1.5rem] rounded-tr-sm'} border text-center transition-all cursor-pointer text-xs font-semibold ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#0099FF]/20 to-[#FF1361]/20 border-[#0099FF] text-white shadow-[0_0_20px_rgba(0,153,255,0.25)] font-bold'
                              : 'bg-[#060810] border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {range.label}
                        </button>
                      );
                    })}
                  </div>
                  {stepErrors.budget && <p className="text-[11px] text-[#FF2A85] mt-1">{stepErrors.budget}</p>}
                </div>

                {/* Engagement Model */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Engagement Model
                    </label>
                    <select
                      value={formData.engagementType}
                      onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#060810] text-xs font-semibold text-slate-200 focus:outline-none focus:border-[#0099FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                    >
                      <option value="One-time project">One-time project sprint</option>
                      <option value="Ongoing monthly support">Ongoing monthly retainer</option>
                      <option value="Not sure yet, discuss on call">Not sure yet, discuss on call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Target Start Date / Deadline
                    </label>
                    <select
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#060810] text-xs font-semibold text-slate-200 focus:outline-none focus:border-[#0099FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                    >
                      <option value="Immediately (Within 7 days)">Immediately (Within 7 days)</option>
                      <option value="Within 2–4 weeks">Within 2–4 weeks</option>
                      <option value="Next quarter / Exploratory">Next quarter / Exploratory</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-tech font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Preferred Communication Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2.5 text-xs font-semibold">
                    {['WhatsApp', 'Email', 'Phone Call'].map((method) => {
                      const isSelected = formData.preferredContactMethod === method;
                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
                          className={`p-3 rounded-full border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white border-transparent shadow-[0_0_15px_rgba(255,19,97,0.3)]'
                              : 'bg-[#060810] border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {method}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Privacy & Anti-Spam Checkbox */}
                <div className="p-5 rounded-[2rem] rounded-tl-md bg-gradient-to-br from-[#0A0D18] to-[#060810] border border-white/10">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="accept-privacy"
                      checked={formData.acceptedPrivacy}
                      onChange={(e) => setFormData({ ...formData, acceptedPrivacy: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-white/20 accent-[#FF1361] cursor-pointer"
                    />
                    <label htmlFor="accept-privacy" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                      I agree to allow Evo Hawks to review my project brief and contact me regarding this proposal. We respect strict non-disclosure, intellectual property, and zero-spam governance.
                    </label>
                  </div>
                  {stepErrors.acceptedPrivacy && <p className="text-[11px] text-[#FF2A85] mt-1.5">{stepErrors.acceptedPrivacy}</p>}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-[#0A0D18] border border-white/10 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Project Brief...</span>
                    ) : (
                      <>
                        <span>Submit Qualified Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] font-tech text-slate-400 text-center pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0099FF]" />
                  <span>24-Hour Review Turnaround • Fixed Milestone SOW • Non-Disclosure Protected</span>
                </div>
              </motion.form>
            )}

          </div>

        </div>
      </section>
    </div>
  );
};
