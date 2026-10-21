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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>TRANSPARENT PRICING &amp; DELIVERABLES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tight mb-4">
            Service Packages &amp; <span className="text-gradient-hawk">Investment Scopes</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 font-sans-clean max-w-2xl mx-auto leading-relaxed mb-8">
            Know exactly what you are investing in. Every package features clearly defined deliverables, revision passes, and honest timelines with zero surprise charges.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
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
            {filteredPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`relative rounded-3xl bg-white border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl ${
                  pkg.popular ? 'border-sky-400 ring-2 ring-sky-400/20' : 'border-slate-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-[10px] font-tech font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                    POPULAR SPRINT
                  </div>
                )}

                <div>
                  <div className="text-[10px] font-tech font-bold uppercase tracking-wider text-sky-600 mb-1">
                    {pkg.category}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-2">
                    {pkg.name}
                  </h3>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-4 font-sans-clean leading-relaxed">
                    <strong className="text-slate-900 block mb-0.5">Best Suited For:</strong>
                    {pkg.idealCustomer}
                  </div>

                  {/* Price Banner */}
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <div className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                      {pkg.priceDisplay}
                    </div>
                    <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mt-1">
                      {pkg.billingType}
                    </div>
                  </div>

                  {/* Inclusions & Quantities */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-xs font-tech font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Deliverables &amp; Inclusions:
                      </div>
                      <ul className="space-y-2">
                        {pkg.includedServices.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pkg.scopeQuantities && (
                      <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-sky-950">
                        <strong className="block text-[11px] font-tech text-sky-700 font-bold uppercase mb-1">
                          Volume Allocation:
                        </strong>
                        <ul className="space-y-1">
                          {pkg.scopeQuantities.map((qty, i) => (
                            <li key={i}>• {qty}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Operational Guardrails */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500 font-sans-clean">
                      <div className="flex items-center justify-between">
                        <span>Revision Limit:</span>
                        <strong className="text-slate-700">{pkg.revisionLimit}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Turnaround / Timeline:</span>
                        <strong className="text-slate-700">{pkg.deliveryTimeline}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Reporting Cadence:</span>
                        <strong className="text-slate-700">{pkg.reportingFrequency}</strong>
                      </div>
                    </div>

                    {/* Exclusions & Disclaimers */}
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-amber-900">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>Transparent Exclusions &amp; Direct Costs:</span>
                      </div>
                      <p className="leading-snug">
                        {pkg.additionalCostsNotice}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onNavigate('start-project')}
                    className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {onOpenBookingModal && (
                    <button
                      type="button"
                      onClick={() => onOpenBookingModal(`Package Inquiry: ${pkg.name}`)}
                      className="w-full py-2.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer text-center"
                    >
                      Discuss Customization &rarr;
                    </button>
                  )}

                  {onOpenProjectModal && (
                    <button
                      type="button"
                      onClick={() => onOpenProjectModal(pkg.name)}
                      className="w-full mt-1.5 py-1.5 text-[11px] font-semibold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer text-center"
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
      <section className="relative py-16 sm:py-20 bg-slate-50 border-t border-slate-200 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              How Our Pricing &amp; Sprints Work
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear financial principles designed to protect your capital and ensure predictability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-slate-900 mb-2">
                Itemized Scopes of Work
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                No vague retainers. Every sprint begins with an itemized document detailing deliverables, revision limits, and exact delivery dates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-slate-900 mb-2">
                Zero Hidden Ad Markups
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                You fund ad spend directly to Meta and Google on your own card. We charge only for our strategy, production, and optimization expertise.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-slate-900 mb-2">
                50% Milestone Alignment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                Standard one-time projects operate on a 50% mobilization deposit / 50% upon final sign-off prior to complete repository and asset handover.
              </p>
            </div>
          </div>

          {/* Bottom Custom Help Callout */}
          <div className="mt-12 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-display font-black text-slate-900">
                Not sure which package fits your exact growth stage?
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                Schedule a 30-minute strategy session with our senior team. We will review your current website, metrics, and funnel to recommend the most cost-effective path forward.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <button
                onClick={() => onNavigate('start-project')}
                className="px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Start a Custom Project
              </button>
              {onOpenBookingModal && (
                <button
                  onClick={() => onOpenBookingModal('Custom Package Consultation')}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
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
