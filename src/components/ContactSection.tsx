import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { MagneticButton } from './ui/MagneticButton';
import { 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: preselectedService || 'Website Development',
    budget: '25k-50k',
    description: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync preselectedService if passed from props
  React.useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission and trigger confetti
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    }, 700);
  };

  const getWhatsAppEnquiryUrl = () => {
    const message = `*New Project Enquiry - Evo Hawks*%0A%0A*Name:* ${formData.fullName || 'Client'}%0A*Business:* ${formData.businessName || 'N/A'}%0A*Email:* ${formData.email || 'N/A'}%0A*Phone/WhatsApp:* ${formData.phone || 'N/A'}%0A*Service Required:* ${formData.service}%0A*Budget:* ${formData.budget}%0A*Project Brief:* ${formData.description || 'Discuss scope'}`;
    return `https://wa.me/${AGENCY_CONFIG.contact.whatsappCleanNumber}?text=${message}`;
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
          
          {/* Left Column: Direct Agency Contacts */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            
            <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 backdrop-blur-xl space-y-6 relative overflow-hidden shadow-lg">
              <BorderBeam size={130} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />

              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                Direct Contact &amp; Consultations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans-clean leading-relaxed">
                Prefer talking directly? Connect with our creative director and strategy leads through WhatsApp, email, or scheduled call.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Item */}
                <motion.a 
                  whileHover={{ x: 4 }}
                  href={`mailto:${AGENCY_CONFIG.contact.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">Email Us</div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
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
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">WhatsApp Instant Chat</div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {AGENCY_CONFIG.contact.whatsapp}
                    </div>
                  </div>
                </motion.a>

                {/* Location Item */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">Location</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {AGENCY_CONFIG.contact.location}
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">Working Hours</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {AGENCY_CONFIG.contact.workingHours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time Badge */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-tech text-emerald-700 font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{AGENCY_CONFIG.contact.responseTime}</span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: High-Conversion Form with BorderBeam */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-slate-200 backdrop-blur-xl shadow-xl relative overflow-hidden">
              <BorderBeam size={150} duration={14} colorFrom="#0284C7" colorTo="#7C3AED" />

              {isSubmitted ? (
                <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-900">
                    Project Brief Received!
                  </h3>

                  <p className="text-sm text-slate-600 max-w-md mx-auto font-sans-clean leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Our lead strategists have received your details and are analyzing your requirements. We will get back to you shortly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppEnquiryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Continue on WhatsApp Now</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          businessName: '',
                          email: '',
                          phone: '',
                          service: 'Website Development',
                          budget: '25k-50k',
                          description: ''
                        });
                      }}
                      className="px-5 py-3 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-2">
                        Full Name <span className="text-sky-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-2">
                        Business / Brand Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        placeholder="e.g. Apex Studio"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone / WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-2">
                        Email Address <span className="text-sky-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="rahul@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-2">
                        Phone / WhatsApp <span className="text-sky-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 00000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-2">
                      Primary Service Needed <span className="text-sky-600">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
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
                    <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                    <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-2">
                      Project Goals &amp; Description
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      placeholder="Briefly describe your goals, required features, timeline, and current bottlenecks..."
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Submit Button & WhatsApp Alternative with Magnetic effect */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] transition-all cursor-pointer group disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Enquiry</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </MagneticButton>

                    <a
                      href={getWhatsAppEnquiryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors"
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
