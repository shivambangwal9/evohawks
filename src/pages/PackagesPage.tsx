import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  AlertCircle 
} from 'lucide-react';
import { PACKAGES_DATA } from '../data/agencyData';
import type { PageId } from '../hooks/usePageRouter';

interface PackagesPageProps {
  onNavigate: (page: PageId, slug?: string) => void;
  onOpenProjectModal?: (service?: string) => void;
  onOpenBookingModal?: (topic?: string) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  onNavigate,
  onOpenProjectModal,
  onOpenBookingModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Video Production',
    'Social Media',
    'Paid Advertising',
    'SEO',
    'Website Development',
    'Shopify & E-commerce',
    'Influencer Marketing',
    'Custom Integrated'
  ];

  const filteredPackages = PACKAGES_DATA.filter(pkg => {
    if (selectedCategory === 'All') return true;
    return pkg.category === selectedCategory;
  });

  return (
    <div className="pt-28 pb-20 overflow-hidden min-h-screen">
      {/* Hero Header */}
      <section className="relative py-12 sm:py-16 bg-transparent bg-grid-cyber">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D1A]/90 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF1361]" />
            <span className="tracking-wider">TRANSPARENT PRICING &amp; DELIVERABLES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight mb-4">
            Service Packages &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Investment Scopes</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 font-sans-clean max-w-2xl mx-auto leading-relaxed mb-8">
            Know exactly what you are investing in. Every package features clearly defined deliverables, revision passes, and honest timelines with zero surprise charges.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white shadow-[0_0_20px_rgba(255,19,97,0.35)] font-bold'
                    : 'bg-[#0A0D18] text-slate-400 border border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPackages.map((pkg, idx) => (
              <div 
                key={pkg.id}
                className={`relative rounded-[2.75rem] ${
                  idx % 2 === 0 ? 'rounded-tl-sm' : 'rounded-tr-sm'
                } transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between ${
                  pkg.popular 
                    ? 'bg-[#0E1224] border border-[#FF1361]/60 shadow-[0_0_40px_rgba(255,19,97,0.25)] ring-1 ring-[#FF1361]/40' 
                    : 'bg-[#0A0D18]/90 border border-white/10 hover:border-[#0099FF]/50 hover:shadow-[0_0_35px_rgba(0,153,255,0.2)]'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white text-[10px] font-tech font-extrabold uppercase px-3.5 py-1 rounded-full shadow-[0_0_20px_rgba(255,19,97,0.5)] tracking-wider">
                    POPULAR SPRINT
                  </div>
                )}

                <div>
                  <div className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#38BDF8] mb-1">
                    {pkg.category}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-2">
                    {pkg.name}
                  </h3>

                  <div className="p-3.5 rounded-2xl bg-[#060810] border border-white/10 text-xs text-slate-300 mb-4 font-sans-clean leading-relaxed">
                    <strong className="text-[#38BDF8] block mb-0.5">Best Suited For:</strong>
                    {pkg.idealCustomer}
                  </div>

                  {/* Price Banner */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="text-2xl sm:text-3xl font-display font-black text-white">
                      {pkg.priceDisplay}
                    </div>
                    <div className="text-xs font-tech text-[#FF2A85] uppercase tracking-wider mt-1 font-semibold">
                      {pkg.billingType}
                    </div>
                  </div>

                  {/* Inclusions & Quantities */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-xs font-tech font-bold text-white uppercase tracking-wider mb-2">
                        Deliverables &amp; Inclusions:
                      </div>
                      <ul className="space-y-2">
                        {pkg.includedServices.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <Check className="w-4 h-4 text-[#FF1361] flex-shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pkg.scopeQuantities && (
                      <div className="p-3.5 rounded-2xl bg-[#060810] border border-[#0099FF]/30 text-xs text-slate-300">
                        <strong className="block text-[11px] font-tech text-[#38BDF8] font-bold uppercase mb-1">
                          Volume Allocation:
                        </strong>
                        <ul className="space-y-1 text-slate-300">
                          {pkg.scopeQuantities.map((qty, i) => (
                            <li key={i}>• {qty}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Operational Guardrails */}
                    <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-slate-400 font-sans-clean">
                      <div className="flex items-center justify-between">
                        <span>Revision Limit:</span>
                        <strong className="text-white">{pkg.revisionLimit}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Turnaround / Timeline:</span>
                        <strong className="text-[#38BDF8]">{pkg.deliveryTimeline}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Reporting Cadence:</span>
                        <strong className="text-white">{pkg.reportingFrequency}</strong>
                      </div>
                    </div>

                    {/* Exclusions & Disclaimers */}
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-amber-300">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>Transparent Exclusions &amp; Direct Costs:</span>
                      </div>
                      <p className="leading-snug">
                        {pkg.additionalCostsNotice}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <button
                    onClick={() => onNavigate('start-project')}
                    className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {onOpenBookingModal && (
                    <button
                      type="button"
                      onClick={() => onOpenBookingModal(`Package Inquiry: ${pkg.name}`)}
                      className="w-full py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-[#060810] hover:bg-[#0E1220] border border-white/10 hover:border-[#0099FF] transition-all cursor-pointer text-center"
                    >
                      Discuss Customization &rarr;
                    </button>
                  )}

                  {onOpenProjectModal && (
                    <button
                      type="button"
                      onClick={() => onOpenProjectModal(pkg.name)}
                      className="w-full mt-1.5 py-1.5 text-[11px] font-semibold text-[#38BDF8] hover:text-white transition-colors cursor-pointer text-center"
                    >
                      Instant Quick Quote
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison & Clarity Section */}
      <section className="relative py-16 sm:py-20 bg-transparent border-t border-white/10 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-3">
              How Our Pricing &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Sprints Work</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Clear financial principles designed to protect your capital and ensure predictability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[2.25rem] rounded-tl-sm bg-[#0A0D18]/90 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="w-11 h-11 rounded-2xl bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#38BDF8] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,153,255,0.2)]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-white mb-2">
                Itemized Scopes of Work
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                No vague retainers. Every sprint begins with an itemized document detailing deliverables, revision limits, and exact delivery dates.
              </p>
            </div>

            <div className="p-6 rounded-[2.25rem] bg-[#0A0D18]/90 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="w-11 h-11 rounded-2xl bg-[#FF1361]/10 border border-[#FF1361]/30 text-[#FF2A85] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,19,97,0.25)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-white mb-2">
                Zero Hidden Ad Markups
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                You fund ad spend directly to Meta and Google on your own card. We charge only for our strategy, production, and optimization expertise.
              </p>
            </div>

            <div className="p-6 rounded-[2.25rem] rounded-br-sm bg-[#0A0D18]/90 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-white mb-2">
                50% Milestone Alignment
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                Standard one-time projects operate on a 50% mobilization deposit / 50% upon final sign-off prior to complete repository and asset handover.
              </p>
            </div>
          </div>

          {/* Bottom Custom Help Callout */}
          <div className="mt-12 p-8 sm:p-10 rounded-[3rem] rounded-tl-lg rounded-br-lg bg-[#0A0D18]/95 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-display font-black text-white">
                Not sure which package fits your exact growth stage?
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Schedule a 30-minute strategy session with our senior team. We will review your current website, metrics, and funnel to recommend the most cost-effective path forward.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <button
                onClick={() => onNavigate('start-project')}
                className="px-6 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] shadow-[0_0_20px_rgba(255,19,97,0.35)] hover:shadow-[0_0_30px_rgba(255,19,97,0.5)] transition-all cursor-pointer"
              >
                Start a Custom Project
              </button>
              {onOpenBookingModal && (
                <button
                  onClick={() => onOpenBookingModal('Custom Package Consultation')}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-[#060810] hover:bg-[#0E1220] border border-white/10 hover:border-[#0099FF] transition-colors cursor-pointer"
                >
                  Book 30-Min Call &rarr;
                </button>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
