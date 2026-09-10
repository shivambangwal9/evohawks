import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
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
  ShieldCheck 
} from 'lucide-react';

interface ServicesPageProps {
  onOpenProjectModal: (service?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenProjectModal }) => {
  const [activeTab, setActiveTab] = useState<string>('web-dev');

  // Interactive Scope & Cost Estimator State
  const [selectedWebsite, setSelectedWebsite] = useState<'none' | 'landing' | 'custom' | 'enterprise'>('custom');
  const [selectedVideo, setSelectedVideo] = useState<'none' | 'starter' | 'pro' | 'viral'>('pro');
  const [selectedMarketing, setSelectedMarketing] = useState<'none' | 'seo' | 'ads' | 'full'>('full');
  const [rushDelivery, setRushDelivery] = useState<boolean>(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Palette': return Palette;
      case 'Video': return Video;
      case 'Share2': return Share2;
      case 'Search': return Search;
      case 'TrendingUp': return TrendingUp;
      default: return Sparkles;
    }
  };

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
  const ActiveIcon = getIcon(activeService.icon);

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-6 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
            <span>FULL-STACK DIGITAL CAPABILITIES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-6">
            Architecting <span className="text-gradient-cyan">Digital Powerhouses</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            From modern responsive websites to high-retention cinematic video and scalable paid marketing systems. Explore our 6 specialized disciplines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              onClick={() => onOpenProjectModal()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] transition-all cursor-pointer"
            >
              <span>Build Custom Package</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <a
              href="#estimator"
              className="px-6 py-4 rounded-full text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-600 shadow-xs transition-colors"
            >
              Launch Scope Estimator &darr;
            </a>
          </div>
        </div>
      </section>

      {/* Interactive 6 Services Detailed Deep-Dive Hub */}
      <section className="relative py-20 bg-transparent border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              Explore Our 6 Disciplines
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Select any capability below to view deliverables, specs, and execution standards.
            </p>
          </div>

          {/* Service Selector Tabs with layoutId */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {SERVICES_DATA.map((srv) => {
              const Icon = getIcon(srv.icon);
              const isActive = activeTab === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`relative p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xs ${
                    isActive
                      ? 'bg-white border-sky-400 shadow-[0_6px_20px_rgba(2,132,199,0.2)]'
                      : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTabLine"
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-600"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-tech font-bold ${isActive ? 'text-sky-600' : 'text-slate-400'}`}>
                      0{srv.number}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-xs sm:text-sm font-display font-bold text-slate-900 leading-tight">
                    {srv.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Service Showcase Card */}
          <div className="relative rounded-3xl bg-white/95 border border-slate-200 p-8 sm:p-12 backdrop-blur-xl shadow-lg overflow-hidden">
            <BorderBeam size={160} duration={10} colorFrom="#0284C7" colorTo="#7C3AED" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Left Specs */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
                      <ActiveIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-tech text-sky-600 font-bold tracking-widest uppercase">
                        SERVICE 0{activeService.number} DISCIPLINE
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                        {activeService.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-base font-semibold text-slate-700 mb-3 font-sans-clean">
                    {activeService.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 font-sans-clean leading-relaxed mb-6">
                    {activeService.description}
                  </p>

                  <div className="w-full pt-4 border-t border-slate-100 mb-8">
                    <div className="text-xs font-tech uppercase text-sky-600 font-bold tracking-wider mb-3">
                      Included Capabilities &amp; Standards:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.services.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <MagneticButton
                    onClick={() => onOpenProjectModal(activeService.title)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_6px_20px_rgba(2,132,199,0.35)] transition-all cursor-pointer"
                  >
                    <span>Request {activeService.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>

                {/* Right Interactive Card / Guarantee */}
                <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-tech font-bold mb-3">
                      <ShieldCheck className="w-4 h-4" />
                      <span>QUALITY ASSURANCE</span>
                    </div>
                    <h4 className="text-lg font-display font-bold text-slate-900 mb-2">
                      Why Choose This Service
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                      Every project includes dedicated project tracking, transparent code/asset handover, and post-launch support guarantee.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-200 text-xs font-tech text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Typical Sprint Delivery</span>
                      <span className="text-sky-600 font-bold">5 - 14 Days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Revisions Model</span>
                      <span className="text-slate-900 font-bold">Iterative until approved</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Source Ownership</span>
                      <span className="text-emerald-600 font-bold">100% Client Owned</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Interactive Project Scope & Cost Estimator Calculator */}
      <section id="estimator" className="relative py-20 bg-transparent overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-xs">
              <Calculator className="w-3.5 h-3.5 text-sky-600" />
              <span>INTERACTIVE SCOPE CALCULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              Estimate Your Project Scope
            </h2>
            <p className="text-sm text-slate-600">
              Customize your requirements in real-time to preview ballpark pricing and sprint timelines.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-slate-200 shadow-xl relative overflow-hidden">
            <BorderBeam size={150} duration={14} colorFrom="#0284C7" colorTo="#7C3AED" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Controls */}
              <div className="md:col-span-8 space-y-6">
                
                {/* 1. Website Option */}
                <div>
                  <label className="block text-xs font-tech uppercase text-slate-600 font-bold mb-2">
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
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                          selectedWebsite === opt.id
                            ? 'bg-sky-50 border-sky-400 text-sky-700 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Video Editing Option */}
                <div>
                  <label className="block text-xs font-tech uppercase text-slate-600 font-bold mb-2">
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
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                          selectedVideo === opt.id
                            ? 'bg-violet-50 border-violet-400 text-violet-700 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Marketing & SEO Option */}
                <div>
                  <label className="block text-xs font-tech uppercase text-slate-600 font-bold mb-2">
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
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                          selectedMarketing === opt.id
                            ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rush Delivery Toggle */}
                <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Priority Rush Delivery (Express 48h kick-off)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={rushDelivery}
                    onChange={(e) => setRushDelivery(e.target.checked)}
                    className="w-4 h-4 accent-sky-600 cursor-pointer"
                  />
                </div>

              </div>

              {/* Right Output Panel */}
              <div className="md:col-span-4 bg-gradient-to-b from-sky-50 via-white to-indigo-50 rounded-2xl border border-sky-200 p-6 flex flex-col justify-between text-center shadow-xs">
                <div>
                  <div className="text-xs font-tech text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                    Estimated Package Budget
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-black text-gradient-cyan mb-1">
                    {estimate.priceStr}
                  </div>
                  <div className="text-xs font-tech text-sky-700 font-bold mb-6">
                    Est. Timeline: {estimate.timelineStr}
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-2 text-left border-t border-sky-100 pt-4 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dedicated Senior Lead</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Source Code &amp; Assets Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Fixed Price Guarantee</span>
                    </div>
                  </div>
                </div>

                <MagneticButton
                  onClick={() => onOpenProjectModal(`Custom Estimate (${estimate.priceStr})`)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs sm:text-sm hover:shadow-[0_6px_20px_rgba(2,132,199,0.35)] transition-all cursor-pointer"
                >
                  Lock In This Scope &rarr;
                </MagneticButton>
              </div>

            </div>

          </div>

        </div>
      </section>

    </motion.div>
  );
};
