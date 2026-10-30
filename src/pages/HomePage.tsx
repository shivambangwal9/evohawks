import React from 'react';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { ServicesSection } from '../components/ServicesSection';
import { SystemCrossSell } from '../components/SystemCrossSell';
import { PortfolioSection } from '../components/PortfolioSection';
import { ProcessSection } from '../components/ProcessSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { PACKAGES_DATA } from '../data/agencyData';
import { motion } from 'framer-motion';
import { BorderBeam } from '../components/ui/BorderBeam';
import { ArrowRight, Sparkles, Rocket, Zap, Check, ShieldCheck, Clock } from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';

interface HomePageProps {
  onOpenProjectModal: (service?: string) => void;
  onNavigate: (page: PageId, slug?: string) => void;
  onOpenBookingModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onOpenProjectModal, 
  onNavigate,
  onOpenBookingModal: _onOpenBookingModal 
}) => {
  const previewPackages = PACKAGES_DATA.filter(p => p.popular || ['pkg-web-landing', 'pkg-video-starter', 'pkg-social-retainer'].includes(p.id)).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col bg-[#08090C] text-[#F5F7FA]"
    >
      {/* 1. Hero Section */}
      <Hero onOpenProjectModal={() => onOpenProjectModal()} />

      {/* 2. Trust & Live Technical Standards */}
      <TrustSection />

      {/* 3. Core Services Overview (All 12 Disciplines Hub) */}
      <ServicesSection onSelectService={(srv) => onOpenProjectModal(srv)} />

      {/* 4. Connected Digital Ecosystem Synergy */}
      <SystemCrossSell onOpenProjectModal={() => onOpenProjectModal()} />

      {/* 5. Selected Work & Capability Benchmarks */}
      <PortfolioSection onSelectService={(srv) => onOpenProjectModal(srv)} />

      {/* 6. The Actual Working Process (5-Stage Sprint Workflow) */}
      <ProcessSection onOpenProjectModal={() => onOpenProjectModal()} />

      {/* 7. Transparent Package Preview Section */}
      <section className="relative py-16 sm:py-24 bg-[#08090C] border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111318] border border-[#007BA7]/40 text-xs font-tech text-[#2094BF] font-semibold mb-3 shadow-[0_0_20px_rgba(0,123,167,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2E78]" />
              <span className="tracking-wider">TRANSPARENT SPRINT PACKAGES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#F5F7FA] tracking-tight mb-4">
              Clear Scopes. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BA7] via-[#2094BF] to-[#FF2E78]">Guaranteed Deliverables.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A5ADB8] font-sans-clean leading-relaxed max-w-2xl mx-auto">
              Fixed-scope sprints with defined deliverables, structured revision passes, and honest timelines. No hidden charges or opaque billing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
            {previewPackages.map((pkg, idx) => (
              <div 
                key={pkg.id}
                className="relative rounded-[2.5rem] bg-[#111318] border border-white/10 hover:border-[#007BA7]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,123,167,0.2)] group"
              >
                <BorderBeam size={100} duration={10 + idx * 2} colorFrom="#007BA7" colorTo="#FF2E78" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#2094BF]">
                      {pkg.category}
                    </span>
                    <span className="text-[10px] font-tech text-[#FF2E78] bg-[#FF2E78]/10 px-2.5 py-0.5 rounded-full border border-[#FF2E78]/30 font-bold">
                      {pkg.billingType}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-[#F5F7FA] mb-2 group-hover:text-[#2094BF] transition-colors">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-[#A5ADB8] font-sans-clean leading-relaxed mb-5">
                    {pkg.idealCustomer}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-[#08090C] border border-white/5 mb-5 flex items-baseline justify-between">
                    <span className="text-xs text-[#A5ADB8]">Starting Investment:</span>
                    <span className="text-lg font-tech font-black text-white">{pkg.priceDisplay}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-tech font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Deliverables
                    </div>
                    {pkg.includedServices.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#A5ADB8]">
                        <Check className="w-3.5 h-3.5 text-[#007BA7] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] text-[#A5ADB8] font-tech">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#007BA7]" />
                      <span>{pkg.deliveryTimeline}</span>
                    </span>
                    <span>{pkg.revisionLimit}</span>
                  </div>

                  <button
                    onClick={() => onOpenProjectModal(pkg.name)}
                    className="w-full py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#007BA7] to-[#FF2E78] hover:shadow-[0_0_25px_rgba(255,46,120,0.4)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Inquire About Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('packages')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#F5F7FA] bg-[#111318] hover:bg-[#181B22] border border-white/10 hover:border-[#007BA7] transition-all cursor-pointer shadow-sm"
            >
              <span>Explore All Packages &amp; Investment Tiers</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2094BF]" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Delivery & Quality Trust Standards */}
      <TestimonialsSection />

      {/* 9. Useful FAQs Section */}
      <FAQSection />

      {/* 10. Quick Nav Agency Exploration Grid */}
      <section className="relative py-16 bg-[#08090C] border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BA7] via-[#2094BF] to-[#FF2E78]">Specialized Portals</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => onNavigate('services')}
              className="group cursor-pointer p-6 sm:p-7 rounded-[2.5rem] bg-[#111318] border border-white/10 hover:border-[#007BA7]/50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between"
            >
              <BorderBeam size={100} duration={10} colorFrom="#007BA7" colorTo="#2094BF" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#007BA7]/10 text-[#2094BF] border border-[#007BA7]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-[#2094BF] transition-colors">
                  All 12 Core Services &rarr;
                </h3>
                <p className="text-xs text-[#A5ADB8] leading-relaxed font-sans-clean">
                  Detailed deliverables for Web, Video, Meta Ads, SEO, Social Media, and E-commerce.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs font-tech text-[#2094BF] font-semibold flex items-center gap-1">
                <span>Open Services Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('why-us')}
              className="group cursor-pointer p-6 sm:p-7 rounded-[2.5rem] bg-[#111318] border border-white/10 hover:border-[#FF2E78]/50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between"
            >
              <BorderBeam size={100} duration={12} colorFrom="#FF2E78" colorTo="#007BA7" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF2E78]/15 text-[#FF2E78] border border-[#FF2E78]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-[#FF2E78] transition-colors">
                  Why Us &amp; Comparison &rarr;
                </h3>
                <p className="text-xs text-[#A5ADB8] leading-relaxed font-sans-clean">
                  Compare our unified creative-engineering squad against traditional agencies and solo freelancers.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs font-tech text-[#FF2E78] font-semibold flex items-center gap-1">
                <span>View Comparison Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('blog')}
              className="group cursor-pointer p-6 sm:p-7 rounded-[2.5rem] bg-[#111318] border border-white/10 hover:border-[#007BA7]/50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between"
            >
              <BorderBeam size={100} duration={14} colorFrom="#007BA7" colorTo="#FF2E78" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#007BA7]/10 text-[#2094BF] border border-[#007BA7]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-[#2094BF] transition-colors">
                  Client Guides &amp; Resources &rarr;
                </h3>
                <p className="text-xs text-[#A5ADB8] leading-relaxed font-sans-clean">
                  Actionable guides on social media costs, Meta Ads budgets, and pre-production shoot checklists.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs font-tech text-[#2094BF] font-semibold flex items-center gap-1">
                <span>Read Agency Guides</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final Enquiry Section (Integrated Direct Contact Experience) */}
      <section id="contact-hub" className="relative py-16 sm:py-24 bg-[#08090C] border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111318] border border-[#FF2E78]/30 text-xs font-tech text-[#FF2E78] font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CONFIDENTIAL SPRINT INTAKE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4">
              Start Your Project with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BA7] via-[#2094BF] to-[#FF2E78]">Evo Hawks</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A5ADB8] max-w-xl mx-auto font-sans-clean leading-relaxed">
              Submit your brief below or reach us directly. Our production and engineering team responds within 24 business hours with an actionable sprint scope.
            </p>
          </div>

          <ContactSection />
        </div>
      </section>
    </motion.div>
  );
};
