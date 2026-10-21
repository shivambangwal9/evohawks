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
          className="inline-flex items-center gap-1.5 text-xs font-tech text-sky-600 hover:text-sky-700 font-bold cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </button>
      </div>

      {/* Hero Header */}
      <section className="relative py-10 sm:py-14 bg-transparent bg-grid-cyber">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>QUALIFIED PROJECT INTAKE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tight mb-4">
            Start Your <span className="text-gradient-hawk">Project Sprint</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 font-sans-clean max-w-2xl mx-auto leading-relaxed">
            Answer a few quick questions so our senior technical and creative leads can review your requirements and provide an actionable scope within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Multi-Step Form Container */}
      <section className="relative pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Progress Indicator */}
          <div className="mb-10 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
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
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-tech font-bold transition-all ${
                    isDone 
                      ? 'bg-emerald-500 text-white shadow-xs' 
                      : isActive 
                      ? 'bg-sky-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-[10px] font-tech text-slate-400 font-bold uppercase tracking-wider">
                      Step 0{step.num}
                    </div>
                    <div className={`text-xs font-display font-bold ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                      {step.label}
                    </div>
                  </div>
                  {step.num < 3 && (
                    <div className="w-8 sm:w-16 h-0.5 bg-slate-200 mx-1 sm:mx-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Card */}
          <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl overflow-hidden">
            <BorderBeam size={160} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />

            {/* Submission Result Notice */}
            {result && (
              <div className={`p-6 rounded-2xl border mb-8 ${
                result.status === 'sent' 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                  : result.status === 'unconfigured'
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-red-50 border-red-200 text-red-950'
              }`}>
                <div className="flex items-start gap-4">
                  {result.status === 'sent' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="text-base font-display font-bold mb-1">
                      {result.status === 'sent' ? 'Project Brief Delivered Successfully!' : 'One-Click Direct Dispatch Available'}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed mb-4">
                      {result.message}
                    </p>

                    {result.status !== 'sent' && (
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={buildWhatsAppLeadUrl(formData)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Dispatch via WhatsApp</span>
                        </a>
                        <a
                          href={buildMailtoLeadUrl(formData)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
                        >
                          <Send className="w-4 h-4" />
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
                  <h2 className="text-xl font-display font-black text-slate-900">
                    Step 1: Your Contact Information
                  </h2>
                  <p className="text-xs text-slate-500 font-sans-clean mt-1">
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
                    <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xs"
                    />
                    {stepErrors.fullName && <p className="text-[11px] text-red-600 mt-1">{stepErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Business or Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Acme Tech Studio"
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xs"
                    />
                    {stepErrors.businessName && <p className="text-[11px] text-red-600 mt-1">{stepErrors.businessName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Work / Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@acmestudio.com"
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xs"
                    />
                    {stepErrors.email && <p className="text-[11px] text-red-600 mt-1">{stepErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xs"
                    />
                    {stepErrors.phone && <p className="text-[11px] text-red-600 mt-1">{stepErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Current Website or Social Profile (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.websiteOrSocial}
                    onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                    placeholder="https://acmestudio.com or @acmestudio"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xs"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-lg transition-all cursor-pointer"
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
                  <h2 className="text-xl font-display font-black text-slate-900">
                    Step 2: Project Requirements &amp; Scope
                  </h2>
                  <p className="text-xs text-slate-500 font-sans-clean mt-1">
                    Select your primary service and specify project milestones.
                  </p>
                </div>

                {/* Primary Service Selection Grid */}
                <div>
                  <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Primary Service Needed *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES_DATA.map((srv) => {
                      const isSelected = formData.service === srv.title;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv.title })}
                          className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-sky-50 border-sky-400 text-sky-950 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'border-sky-600 bg-sky-600' : 'border-slate-300'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight">{srv.title}</div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">{srv.tagline}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Conditional Questions */}
                {isVideo && (
                  <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3">
                    <div className="text-xs font-tech font-bold text-sky-900 flex items-center gap-2">
                      <Video className="w-4 h-4 text-sky-600" />
                      <span>Video Production Details</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Shoot Location / Type</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-sky-200 bg-white"
                          onChange={(e) => handleConditionalDetailChange('Shoot Format', e.target.value)}
                        >
                          <option value="On-location physical shoot required">On-location physical shoot required</option>
                          <option value="Editing-only (we provide footage)">Editing-only (we provide footage)</option>
                          <option value="Remote / Studio production">Remote / Studio production</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Estimated Video Length / Count</label>
                        <input
                          type="text"
                          placeholder="e.g. 8 vertical reels, 1 commercial"
                          className="w-full p-2.5 rounded-xl border border-sky-200 bg-white"
                          onChange={(e) => handleConditionalDetailChange('Deliverables Volume', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {isWeb && (
                  <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-3">
                    <div className="text-xs font-tech font-bold text-cyan-900 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-600" />
                      <span>Website Architecture Specifics</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Type of Website</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-cyan-200 bg-white"
                          onChange={(e) => handleConditionalDetailChange('Website Type', e.target.value)}
                        >
                          <option value="Custom Business Website (React / Vite)">Custom Business Website (React / Vite)</option>
                          <option value="Shopify Store / E-commerce">Shopify Store / E-commerce</option>
                          <option value="High-Converting Paid Ad Landing Page">High-Converting Paid Ad Landing Page</option>
                          <option value="Complete Website Redesign">Complete Website Redesign</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Domain &amp; Content Status</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-cyan-200 bg-white"
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
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
                    <div className="text-xs font-tech font-bold text-indigo-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                      <span>Advertising Funnel Objectives</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Primary Campaign Objective</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-indigo-200 bg-white"
                          onChange={(e) => handleConditionalDetailChange('Ad Objective', e.target.value)}
                        >
                          <option value="Lead Generation (Calls / WhatsApp)">Lead Generation (Calls / WhatsApp)</option>
                          <option value="E-commerce Purchase Conversions">E-commerce Purchase Conversions</option>
                          <option value="Brand Awareness & Video Views">Brand Awareness & Video Views</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Existing Meta Ad Account?</label>
                        <select 
                          className="w-full p-2.5 rounded-xl border border-indigo-200 bg-white"
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
                  <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-3">
                    <div className="text-xs font-tech font-bold text-violet-900 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-violet-600" />
                      <span>Social Media Platform Focus</span>
                    </div>
                    <div className="text-xs text-slate-700 font-semibold mb-1">Primary Channels to Manage</div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'X (Twitter)'].map((plat) => (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => handleConditionalDetailChange(`Platform: ${plat}`, 'Included')}
                          className="px-3 py-1.5 rounded-lg border border-violet-200 bg-white hover:bg-violet-100 text-slate-700"
                        >
                          + {plat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Services Multi-Select */}
                <div>
                  <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
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
                  <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Brief Project Description &amp; Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your current business challenge, required deliverables, target timeline, or what a successful engagement looks like."
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xs resize-none"
                  />
                  {stepErrors.description && <p className="text-[11px] text-red-600 mt-1">{stepErrors.description}</p>}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-lg transition-all cursor-pointer"
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
                  <h2 className="text-xl font-display font-black text-slate-900">
                    Step 3: Budget Range &amp; Timeline
                  </h2>
                  <p className="text-xs text-slate-500 font-sans-clean mt-1">
                    Transparent expectations ensure our initial proposal aligns with your resources.
                  </p>
                </div>

                {/* Budget Selection */}
                <div>
                  <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Estimated Budget Allocation *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {AGENCY_CONFIG.budgetRanges.map((range) => (
                      <button
                        key={range.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: range.label })}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer text-xs font-semibold ${
                          formData.budget === range.label
                            ? 'bg-sky-50 border-sky-400 text-sky-800 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                  {stepErrors.budget && <p className="text-[11px] text-red-600 mt-1">{stepErrors.budget}</p>}
                </div>

                {/* Engagement Model */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Engagement Model
                    </label>
                    <select
                      value={formData.engagementType}
                      onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      <option value="One-time project">One-time project sprint</option>
                      <option value="Ongoing monthly support">Ongoing monthly retainer</option>
                      <option value="Not sure yet, discuss on call">Not sure yet, discuss on call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Target Start Date / Deadline
                    </label>
                    <select
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      <option value="Immediately (Within 7 days)">Immediately (Within 7 days)</option>
                      <option value="Within 2–4 weeks">Within 2–4 weeks</option>
                      <option value="Next quarter / Exploratory">Next quarter / Exploratory</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-tech font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Preferred Communication Method
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                    {['WhatsApp', 'Email', 'Phone Call'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          formData.preferredContactMethod === method
                            ? 'bg-sky-50 border-sky-400 text-sky-800 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Privacy & Anti-Spam Checkbox */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="accept-privacy"
                      checked={formData.acceptedPrivacy}
                      onChange={(e) => setFormData({ ...formData, acceptedPrivacy: e.target.checked })}
                      className="mt-1 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                    <label htmlFor="accept-privacy" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                      I agree to allow Evo Hawks to review my project brief and contact me regarding this proposal. We respect your confidentiality and never share client information with third parties.
                    </label>
                  </div>
                  {stepErrors.acceptedPrivacy && <p className="text-[11px] text-red-600 mt-1.5">{stepErrors.acceptedPrivacy}</p>}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
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
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>24-Hour Review Turnaround • Fixed Milestone SOW • Zero Spam</span>
                </div>
              </motion.form>
            )}

          </div>

        </div>
      </section>
    </div>
  );
};
