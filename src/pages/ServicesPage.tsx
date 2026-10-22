import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import { trackEvent } from '../utils/analytics';
import { 
  Globe, 
  Palette, 
  Video, 
  Share2, 
  Search, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Calculator, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  FileCheck, 
  Users, 
  ShoppingBag, 
  Film, 
  Mail, 
  LineChart, 
  Wrench 
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';

const ServiceIcon: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
  switch (iconName) {
    case 'Globe': return <Globe className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Video': return <Video className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'Search': return <Search className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Youtube': return <Film className={className} />;
    case 'Mail': return <Mail className={className} />;
    case 'LineChart': return <LineChart className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    case 'Users': return <Users className={className} />;
    default: return <Sparkles className={className} />;
  }
};

interface ServicesPageProps {
  onOpenProjectModal: (service?: string) => void;
  onOpenBookingModal?: (topic?: string) => void;
  onNavigate?: (page: PageId, slug?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onOpenProjectModal,
  onOpenBookingModal,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<string>('web-development');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Interactive Scope & Cost Estimator State
  const [selectedWebsite, setSelectedWebsite] = useState<'none' | 'landing' | 'custom' | 'enterprise'>('custom');
  const [selectedVideo, setSelectedVideo] = useState<'none' | 'starter' | 'pro' | 'viral'>('pro');
  const [selectedMarketing, setSelectedMarketing] = useState<'none' | 'seo' | 'ads' | 'full'>('full');
  const [rushDelivery, setRushDelivery] = useState<boolean>(false);

  // Cost calculation helper
  const calculateEstimate = () => {
    let base = 0;
    let days = 0;

    if (selectedWebsite === 'landing') { base += 25000; days += 5; }
    else if (selectedWebsite === 'custom') { base += 45000; days += 10; }
    else if (selectedWebsite === 'enterprise') { base += 85000; days += 18; }

    if (selectedVideo === 'starter') { base += 15000; days += 3; }
    else if (selectedVideo === 'pro') { base += 30000; days += 5; }
    else if (selectedVideo === 'viral') { base += 55000; days += 8; }

    if (selectedMarketing === 'seo') { base += 20000; days += 7; }
    else if (selectedMarketing === 'ads') { base += 25000; days += 7; }
    else if (selectedMarketing === 'full') { base += 40000; days += 10; }

    if (base === 0) { base = 25000; days += 7; }

    if (rushDelivery) {
      base = Math.round(base * 1.25);
      days = Math.max(3, Math.round(days * 0.6));
    }

    return {
      priceStr: `₹${base.toLocaleString('en-IN')}`,
      timelineStr: `${days} Days`,
    };
  };

  const estimate = calculateEstimate();
  const activeService = SERVICES_DATA.find(s => s.id === activeTab) || SERVICES_DATA[0];

  const filteredServices = categoryFilter === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category.toLowerCase().includes(categoryFilter.toLowerCase()));

  // Track service discovery analytics
  useEffect(() => {
    trackEvent('service_viewed', {
      service_id: activeService.id,
      service_title: activeService.title,
    });
  }, [activeService]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pt-28 pb-20 overflow-hidden"
    >
      {/* Services Custom Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent bg-grid-cyber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D1A]/90 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-6 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-[#FF1361]" />
            <span className="tracking-wider">FULL-STACK DIGITAL CAPABILITIES &bull; 12 SPECIALIZED DISCIPLINES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight mb-6">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Digital Powerhouses</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            From modern responsive websites and headless e-commerce to cinematic video production, performance ads, and YouTube growth. Explore all 12 specialized agency disciplines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              onClick={() => {
                if (onNavigate) {
                  onNavigate('start-project');
                } else {
                  onOpenProjectModal();
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
            >
              <span>Start a Project Intake</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <a
              href="#catalogue"
              className="px-6 py-4 rounded-full text-sm font-semibold text-slate-300 bg-[#0A0D18] border border-white/10 hover:border-[#0099FF] hover:text-white shadow-xs transition-colors"
            >
              View Service Catalogue &darr;
            </a>
          </div>
        </div>
      </section>

      {/* Interactive 12 Services Detailed Deep-Dive Hub */}
      <section className="relative py-20 bg-transparent border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">12 Disciplines</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Select any capability below to preview deliverables, specifications, and execution standards.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { id: 'all', label: 'All 12 Disciplines' },
                { id: 'creative', label: 'Creative & Video' },
                { id: 'marketing', label: 'Paid & Social Marketing' },
                { id: 'development', label: 'Web & E-Commerce' },
                { id: 'strategy', label: 'Strategy & Care' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white shadow-[0_0_20px_rgba(255,19,97,0.35)] font-bold'
                      : 'bg-[#0A0D18] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Selector Tabs with layoutId - Asymmetric creative stadium pods */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-8 sm:mb-12">
            {filteredServices.map((srv) => {
              const isActive = activeTab === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`relative p-3.5 rounded-[1.75rem] rounded-tl-sm rounded-br-sm border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[92px] ${
                    isActive
                      ? 'bg-[#0E1224] border-[#0099FF] shadow-[0_0_25px_rgba(0,153,255,0.3)] scale-[1.02]'
                      : 'bg-[#0A0D18]/90 border-white/10 hover:border-[#0099FF]/40 hover:bg-[#0D1020]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTabLine"
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-tech font-bold ${isActive ? 'text-[#FF2A85]' : 'text-slate-500'}`}>
                      0{srv.number}
                    </span>
                    <ServiceIcon iconName={srv.icon} className={`w-3.5 h-3.5 ${isActive ? 'text-[#38BDF8]' : 'text-slate-500'}`} />
                  </div>
                  <div className="text-xs font-display font-bold text-white leading-tight">
                    {srv.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Service Showcase Card - Asymmetric Cockpit Pod */}
          <div className="relative rounded-[3rem] rounded-tl-lg rounded-br-lg bg-[#0A0D18]/95 border border-white/10 p-5 sm:p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
            <BorderBeam size={160} duration={10} colorFrom="#0099FF" colorTo="#FF1361" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start"
              >
                {/* Left Specs & Deliverables */}
                <div className="lg:col-span-7 flex flex-col items-start space-y-6">
                  <div>
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0099FF]/10 border border-[#0099FF]/30 flex items-center justify-center text-[#38BDF8] shadow-[0_0_20px_rgba(0,153,255,0.25)] flex-shrink-0">
                        <ServiceIcon iconName={activeService.icon} className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <span className="text-[11px] sm:text-xs font-tech text-[#38BDF8] font-bold tracking-widest uppercase">
                          SERVICE 0{activeService.number} &bull; {activeService.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white">
                          {activeService.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-[#FF2A85] dark:from-white dark:via-slate-200 dark:to-[#FF2A85] mb-2 font-sans-clean">
                      {activeService.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans-clean leading-relaxed">
                      {activeService.description}
                    </p>
                  </div>

                  {/* Included Deliverables */}
                  <div className="w-full pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs font-tech uppercase text-[#38BDF8] font-bold tracking-wider mb-3">
                      <FileCheck className="w-4 h-4 text-[#FF1361]" />
                      <span>Concrete Client Deliverables:</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeService.deliverables && activeService.deliverables.map((deliv, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-[#060810] p-3 rounded-2xl border border-white/10">
                          <div className="w-4 h-4 rounded-full bg-[#FF1361]/20 flex items-center justify-center text-[#FF2A85] shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Who It's For & Prerequisites */}
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-[#060810] border border-white/10 text-xs">
                      <div className="flex items-center gap-1.5 font-tech font-bold text-white uppercase tracking-wider mb-1.5">
                        <Users className="w-3.5 h-3.5 text-[#0099FF]" />
                        <span>Who This Service Suits:</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {activeService.whoItsFor || "Businesses and founders wanting high quality and predictable velocity."}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#060810] border border-white/10 text-xs">
                      <div className="flex items-center gap-1.5 font-tech font-bold text-white uppercase tracking-wider mb-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-[#FF1361]" />
                        <span>Client Materials Needed:</span>
                      </div>
                      <ul className="text-slate-300 text-[11px] leading-relaxed list-disc list-inside space-y-0.5">
                        {activeService.clientPrerequisites && activeService.clientPrerequisites.slice(0, 2).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="w-full pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={`#services/${activeService.slug}`}
                      onClick={(e) => {
                        if (onNavigate) {
                          e.preventDefault();
                          onNavigate('service-detail', activeService.slug);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
                    >
                      <span>Read Dedicated Service Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => onOpenProjectModal(activeService.title)}
                      className="px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#060810] border border-white/15 hover:border-[#0099FF] hover:bg-[#0099FF]/10 transition-all cursor-pointer"
                    >
                      Quick Enquiry
                    </button>

                    {onOpenBookingModal && (
                      <button
                        type="button"
                        onClick={() => onOpenBookingModal(`Service Consultation: ${activeService.title}`)}
                        className="px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#38BDF8] bg-[#0A0D18] border border-[#0099FF]/30 hover:border-[#0099FF] hover:bg-[#0099FF]/15 transition-all cursor-pointer"
                      >
                        Book Strategy Call &rarr;
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Interactive Card: Standards & Service FAQs */}
                <div className="lg:col-span-5 bg-[#060810] rounded-[2.25rem] rounded-tr-sm border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0099FF]/15 border border-[#0099FF]/30 text-[#38BDF8] text-xs font-tech font-bold mb-3 shadow-[0_0_15px_rgba(0,153,255,0.2)]">
                      <ShieldCheck className="w-4 h-4 text-[#FF1361]" />
                      <span>QUALITY ASSURANCE</span>
                    </div>
                    <h4 className="text-lg font-display font-bold text-white mb-2">
                      Execution Guarantees
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans-clean mb-4">
                      Every project includes senior leadership oversight, 100% asset and code ownership upon completion, and milestone sign-off.
                    </p>

                    <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs font-tech text-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Typical Sprint Delivery</span>
                        <span className="text-[#38BDF8] font-bold">5 - 14 Days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Revisions Model</span>
                        <span className="text-white font-bold">2 Structured Review Rounds</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Source Ownership</span>
                        <span className="text-[#FF2A85] font-bold">100% Client Owned</span>
                      </div>
                    </div>
                  </div>

                  {/* Discipline-Specific FAQs */}
                  {activeService.serviceFaqs && activeService.serviceFaqs.length > 0 && (
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-tech font-bold text-white uppercase tracking-wider">
                        <HelpCircle className="w-3.5 h-3.5 text-[#0099FF]" />
                        <span>Common Questions on This Service:</span>
                      </div>
                      <div className="space-y-2">
                        {activeService.serviceFaqs.map((faq, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-[#0A0D18] border border-white/10 text-xs">
                            <strong className="block text-white mb-1">{faq.q}</strong>
                            <p className="text-slate-300 leading-relaxed text-[11px]">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Complete Agency Services Directory Matrix (All 12 Disciplines) */}
      <section id="catalogue" className="relative py-20 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0D1A]/90 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF1361]" />
              <span className="tracking-wider">CENTRALIZED SERVICE DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">
              All 12 Core Agency <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Disciplines</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Every main discipline features dedicated deliverables, transparent scopes, verified workflow steps, and SEO-friendly deep dive specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((srv, idx) => (
              <div
                key={srv.id}
                className={`group relative rounded-[2.5rem] ${
                  idx % 2 === 0 ? 'rounded-tl-sm' : 'rounded-tr-sm'
                } bg-[#0A0D18]/90 border border-white/10 p-7 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(0,153,255,0.25)] hover:border-[#0099FF]/50 transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#0099FF]/10 border border-[#0099FF]/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 group-hover:bg-[#0099FF]/20 transition-all shadow-[0_0_15px_rgba(0,153,255,0.2)]">
                      <ServiceIcon iconName={srv.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#FF2A85] bg-[#FF1361]/15 border border-[#FF1361]/30 px-3 py-1 rounded-full">
                      {srv.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-1.5 group-hover:text-[#38BDF8] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#38BDF8] font-medium mb-3 line-clamp-1">
                    {srv.tagline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {srv.description}
                  </p>

                  <div className="border-t border-white/10 pt-3 mb-4 space-y-1.5">
                    <span className="text-[10px] font-tech uppercase text-slate-400 font-bold tracking-wider block">
                      Core Scope:
                    </span>
                    {srv.deliverables.slice(0, 3).map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <Check className="w-3 h-3 text-[#FF1361] shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={`/services/${srv.slug}`}
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('service-detail', srv.slug);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] hover:text-white transition-colors"
                  >
                    <span>Dedicated Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onOpenProjectModal(srv.title)}
                    className="text-xs text-slate-300 hover:text-white font-medium px-3 py-1.5 rounded-full bg-[#060810] border border-white/10 hover:border-[#0099FF] transition-all cursor-pointer"
                  >
                    Quick Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Scope & Cost Estimator Calculator */}
      <section id="estimator" className="relative py-20 bg-transparent overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0D1A]/90 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
              <Calculator className="w-3.5 h-3.5 text-[#FF1361]" />
              <span className="tracking-wider">INTERACTIVE SCOPE CALCULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              Estimate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Project Scope</span>
            </h2>
            <p className="text-sm text-slate-300">
              Customize your requirements in real-time to preview ballpark pricing and sprint timelines.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-[3rem] rounded-tl-lg rounded-br-lg bg-[#0A0D18]/95 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <BorderBeam size={150} duration={14} colorFrom="#0099FF" colorTo="#FF1361" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
              
              {/* Left Controls */}
              <div className="md:col-span-8 space-y-5 sm:space-y-6">
                
                {/* 1. Website Option */}
                <div>
                  <label className="block text-xs font-tech uppercase text-slate-300 font-bold mb-2 tracking-wider">
                    1. Website &amp; Technical Development
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'none', label: 'None' },
                      { id: 'landing', label: 'Landing Page' },
                      { id: 'custom', label: 'Full Website' },
                      { id: 'enterprise', label: 'App / Store' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedWebsite(opt.id as any)}
                        className={`py-2.5 px-3 rounded-2xl text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer text-center leading-tight ${
                          selectedWebsite === opt.id
                            ? 'bg-gradient-to-r from-[#0099FF]/25 to-[#FF1361]/25 border-[#0099FF] text-white shadow-[0_0_15px_rgba(0,153,255,0.3)] font-bold'
                            : 'bg-[#060810] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Video Editing Option */}
                <div>
                  <label className="block text-xs font-tech uppercase text-slate-300 font-bold mb-2 tracking-wider">
                    2. Video &amp; Reels Content Production
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'none', label: 'None' },
                      { id: 'starter', label: '5 Reels Pack' },
                      { id: 'pro', label: '15 Viral Cuts' },
                      { id: 'viral', label: 'Full Month Media' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedVideo(opt.id as any)}
                        className={`py-2.5 px-3 rounded-2xl text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer text-center leading-tight ${
                          selectedVideo === opt.id
                            ? 'bg-gradient-to-r from-[#0099FF]/25 to-[#FF1361]/25 border-[#FF1361] text-white shadow-[0_0_15px_rgba(255,19,97,0.3)] font-bold'
                            : 'bg-[#060810] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Marketing & SEO Option */}
                <div>
                  <label className="block text-xs font-tech uppercase text-slate-300 font-bold mb-2 tracking-wider">
                    3. Search SEO &amp; Paid Lead Funnels
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'none', label: 'None' },
                      { id: 'seo', label: 'SEO Audit & Rank' },
                      { id: 'ads', label: 'Meta & Google Ads' },
                      { id: 'full', label: 'Complete Synergy' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedMarketing(opt.id as any)}
                        className={`py-2.5 px-3 rounded-2xl text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer text-center leading-tight ${
                          selectedMarketing === opt.id
                            ? 'bg-gradient-to-r from-[#0099FF]/25 to-[#FF1361]/25 border-[#0099FF] text-white shadow-[0_0_15px_rgba(0,153,255,0.3)] font-bold'
                            : 'bg-[#060810] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rush Delivery Toggle */}
                <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-[#060810] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Priority Rush Delivery (Express 48h kick-off)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={rushDelivery}
                    onChange={(e) => setRushDelivery(e.target.checked)}
                    className="w-4 h-4 accent-[#FF1361] cursor-pointer"
                  />
                </div>

              </div>

              {/* Right Output Panel */}
              <div className="md:col-span-4 bg-[#060810] rounded-[2.5rem] border border-[#0099FF]/30 p-6 sm:p-7 flex flex-col justify-between text-center shadow-[0_0_30px_rgba(0,153,255,0.15)]">
                <div>
                  <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                    Estimated Package Budget
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361] mb-1">
                    {estimate.priceStr}
                  </div>
                  <div className="text-xs font-tech text-[#38BDF8] font-bold mb-6">
                    Est. Timeline: {estimate.timelineStr}
                  </div>

                  <div className="text-[11px] text-slate-300 space-y-2.5 text-left border-t border-white/10 pt-4 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
                      <span>Dedicated Senior Project Lead</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
                      <span>100% Client Ownership of Code &amp; Assets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
                      <span>Milestone-Based Fixed Quote</span>
                    </div>
                  </div>
                </div>

                <MagneticButton
                  onClick={() => onOpenProjectModal(`Custom Estimate (${estimate.priceStr})`)}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] text-white font-bold text-xs sm:text-sm hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
                >
                  Request Official Scope Lock &rarr;
                </MagneticButton>
              </div>

            </div>

            {/* Scope & Cost Transparency Notice (Phase 8) */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-2xl bg-[#060810]/80 border border-white/10 text-xs">
                <div className="font-tech font-bold text-white uppercase tracking-wider mb-1">
                  1. Creative &amp; Engineering Scope
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Estimator reflects Evo Hawks creative, technical design, production, and implementation service fees.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#060810]/80 border border-white/10 text-xs">
                <div className="font-tech font-bold text-white uppercase tracking-wider mb-1">
                  2. Direct Ad Spend &amp; Media Fees
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Paid advertising budgets (Meta, Google) and influencer payouts are paid directly by client to platforms. No hidden markup.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#060810]/80 border border-white/10 text-xs">
                <div className="font-tech font-bold text-white uppercase tracking-wider mb-1">
                  3. Infrastructure &amp; Licensing
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Domain registrations, server hosting fees, and third-party SaaS/API licenses remain registered under client ownership.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </motion.div>
  );
};
