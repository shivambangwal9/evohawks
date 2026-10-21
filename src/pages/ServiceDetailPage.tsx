import React from 'react';
import { 
  SERVICES_DATA, 
  PACKAGES_DATA, 
  PORTFOLIO_DATA, 
  AGENCY_CONFIG
} from '../data/agencyData';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  AlertCircle, 
  MessageSquare, 
  Calendar, 
  Sparkles,
  Users,
  FileCheck,
  Globe,
  Video,
  Share2,
  TrendingUp,
  Search,
  ShoppingBag,
  Film,
  Palette,
  Mail,
  BarChart3,
  ShieldAlert
} from 'lucide-react';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import type { PageId } from '../hooks/usePageRouter';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (page: PageId, slug?: string) => void;
  onOpenProjectModal?: (service?: string) => void;
  onOpenBookingModal?: (topic?: string) => void;
}

const ServiceIconMap: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
  switch (iconName) {
    case 'Globe': return <Globe className={className} />;
    case 'Video': return <Video className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Search': return <Search className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Youtube': return <Film className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Mail': return <Mail className={className} />;
    case 'BarChart3': return <BarChart3 className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenProjectModal,
  onOpenBookingModal
}) => {
  const service = SERVICES_DATA.find(s => s.id === slug) || SERVICES_DATA[0];

  // Related services
  const relatedServices = SERVICES_DATA.filter(s => 
    service.relatedServiceIds?.includes(s.id) || (s.categoryGroup === service.categoryGroup && s.id !== service.id)
  ).slice(0, 3);

  // Relevant packages
  const relevantPackages = PACKAGES_DATA.filter(p => 
    p.category.toLowerCase().includes(service.category.toLowerCase().split(' ')[0]) ||
    service.title.toLowerCase().includes(p.category.toLowerCase().split(' ')[0])
  );

  // Relevant portfolio items
  const relevantWork = PORTFOLIO_DATA.filter(p => 
    p.services.some(srv => srv.toLowerCase().includes(service.title.toLowerCase().split(' ')[0])) ||
    p.category.toLowerCase().includes(service.category.toLowerCase().split(' ')[0])
  ).slice(0, 2);

  const whatsappHref = `https://wa.me/${AGENCY_CONFIG.contact.whatsappCleanNumber}?text=${encodeURIComponent(`Hi Evo Hawks, I'm inquiring about your ${service.title} services.`)}`;

  return (
    <div className="pt-28 pb-20 overflow-hidden min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs font-tech text-slate-500">
          <button 
            onClick={() => onNavigate('services')}
            className="hover:text-sky-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </button>
          <span>/</span>
          <span className="text-sky-600 font-bold">{service.category}</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{service.title}</span>
        </div>
      </div>

      {/* Service Hero */}
      <section className="relative py-12 sm:py-20 bg-transparent bg-grid-cyber">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-4 shadow-2xs">
            <ServiceIconMap iconName={service.icon} className="w-3.5 h-3.5 text-sky-600" />
            <span className="uppercase">{service.category} SPRINT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-tight mb-6">
            {service.heroHeading}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-8">
            {service.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => onNavigate('start-project')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{service.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp Inquiry</span>
            </a>

            {onOpenBookingModal && (
              <button
                type="button"
                onClick={() => onOpenBookingModal(`Service Consultation: ${service.title}`)}
                className="px-6 py-4 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
              >
                Book 30-Min Strategy Call
              </button>
            )}

            {onOpenProjectModal && (
              <button
                type="button"
                onClick={() => onOpenProjectModal(service.title)}
                className="px-6 py-4 rounded-full text-sm font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer"
              >
                Instant Modal Quote
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Problems Addressed & Who It's For Grid */}
      <section className="relative py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Problems Solved */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
              <div className="inline-flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-rose-600 mb-3">
                <AlertCircle className="w-4 h-4" />
                <span>The Bottlenecks We Eliminate</span>
              </div>
              <h2 className="text-2xl font-display font-black text-slate-900 mb-4">
                Why Standard Approaches Fail
              </h2>
              <div className="space-y-3">
                {service.problemsAddressed.map((prob, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">✕</span>
                    <span className="leading-snug">{prob}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience & Prerequisites */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-sky-700 mb-3">
                  <Users className="w-4 h-4" />
                  <span>Who This Service Suits</span>
                </div>
                <h2 className="text-2xl font-display font-black text-slate-900 mb-3">
                  Ideal Partner Profile
                </h2>
                <p className="text-sm text-slate-700 font-sans-clean leading-relaxed mb-6">
                  {service.whoItsFor}
                </p>

                <div className="text-xs font-tech font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-sky-600" />
                  <span>Materials Needed from Client:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {service.clientPrerequisites.map((pre, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">•</span>
                      <span>{pre}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope, Inclusions & Deliverables */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              Concrete Scope &amp; Tangible Deliverables
            </h2>
            <p className="text-sm text-slate-600">
              Every deliverable is verified and handed over with 100% intellectual property ownership upon completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Specific Services Included */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <BorderBeam size={100} duration={14} colorFrom="#0284C7" colorTo="#38BDF8" />
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>Core Capabilities Included</span>
              </h3>
              <div className="space-y-2.5">
                {service.services.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <Check className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tangible Client Deliverables */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <BorderBeam size={100} duration={12} colorFrom="#7C3AED" colorTo="#0284C7" />
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>Final Client Deliverables</span>
              </h3>
              <div className="space-y-2.5">
                {service.deliverables.map((del, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Disclaimers if present */}
          {service.disclaimers && service.disclaimers.length > 0 && (
            <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
              <div className="font-bold mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Operational Disclaimers &amp; Transparency:</span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {service.disclaimers.map((disc, idx) => (
                  <li key={idx}>{disc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 4-Step Working Sprint Process for this service */}
      <section className="relative py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>SPRINT WORKFLOW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              How We Execute This Sprint
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Predictable milestone rhythm from intake to handover.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 font-tech font-extrabold flex items-center justify-center text-xs mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-display font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Packages & Pricing Quick Access */}
      {relevantPackages.length > 0 && (
        <section className="relative py-20 bg-transparent border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-2">
                Available {service.title} Packages
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Choose an established sprint package or request a tailored scope.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relevantPackages.map((pkg) => (
                <div key={pkg.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-tech text-sky-600 font-bold uppercase">{pkg.category}</div>
                    <h3 className="text-xl font-display font-black text-slate-900 mb-2">{pkg.name}</h3>
                    <div className="text-2xl font-display font-black text-slate-900 mb-4">{pkg.priceDisplay}</div>
                    <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                      {pkg.includedServices.slice(0, 4).map((inc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate('start-project')}
                    className="w-full py-3 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-sky-600 transition-colors text-center cursor-pointer"
                  >
                    Select This Package &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Relevant Case Studies & Work Proof */}
      {relevantWork.length > 0 && (
        <section className="relative py-16 bg-slate-50/60 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                VERIFIED PROOF &amp; BENCHMARKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2 mb-2">
                Related {service.title} Work
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relevantWork.map((proj) => (
                <div key={proj.id} className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-[10px] font-tech font-bold text-sky-700 uppercase">{proj.badge}</span>
                    <h3 className="text-lg font-display font-bold text-slate-900 mt-1 mb-2">{proj.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4">{proj.overview}</p>
                  </div>
                  <button
                    onClick={() => onNavigate('case-study-detail', proj.slug || proj.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 cursor-pointer text-left"
                  >
                    <span>View Case Study Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service-Specific FAQs */}
      <section className="relative py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>FREQUENT QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mb-2">
              {service.title} FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {service.serviceFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="text-base font-display font-bold text-slate-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans-clean leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services Links */}
      {relatedServices.length > 0 && (
        <section className="relative py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900">
                Related Agency Disciplines
              </h2>
              <button 
                onClick={() => onNavigate('services')}
                className="text-xs font-tech text-sky-600 font-bold hover:underline"
              >
                View All 12 Services &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <div 
                  key={rel.id}
                  onClick={() => onNavigate('service-detail', rel.id)}
                  className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sky-300 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-tech text-sky-600 font-bold uppercase">{rel.category}</span>
                    <h3 className="text-lg font-display font-bold text-slate-900 mb-1">{rel.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{rel.tagline}</p>
                  </div>
                  <div className="mt-4 text-xs font-tech text-sky-600 font-semibold flex items-center gap-1">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-sky-200 shadow-xl relative overflow-hidden">
            <BorderBeam size={180} duration={10} colorFrom="#0284C7" colorTo="#7C3AED" />
            <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              Ready to Kick Off Your {service.title} Sprint?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-8 font-sans-clean leading-relaxed">
              Submit your requirements or schedule a 1-on-1 discovery consultation. We review all briefs within 24 business hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                onClick={() => onNavigate('start-project')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-4 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
              >
                Contact Strategist &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
