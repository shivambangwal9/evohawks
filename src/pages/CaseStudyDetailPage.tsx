import React from 'react';
import { PORTFOLIO_DATA } from '../data/agencyData';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Cpu, 
  AlertTriangle 
} from 'lucide-react';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import type { PageId } from '../hooks/usePageRouter';

interface CaseStudyDetailPageProps {
  slug: string;
  onNavigate: (page: PageId, slug?: string) => void;
  onOpenProjectModal?: (service?: string) => void;
}

export const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenProjectModal
}) => {
  const project = PORTFOLIO_DATA.find(p => p.id === slug) || PORTFOLIO_DATA[0];

  // Related projects
  const relatedProjects = PORTFOLIO_DATA.filter(p => 
    p.id !== project.id && (project.relatedProjectIds?.includes(p.id) || p.category === project.category)
  ).slice(0, 2);

  return (
    <div className="pt-28 pb-20 overflow-hidden min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs font-tech text-slate-500">
          <button 
            onClick={() => onNavigate('portfolio')}
            className="hover:text-sky-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </button>
          <span>/</span>
          <span className="text-sky-600 font-bold">{project.category}</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{project.title}</span>
        </div>
      </div>

      {/* Case Study Header & Hero */}
      <section className="relative py-12 sm:py-16 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-tech font-extrabold uppercase bg-sky-100 text-sky-800 border border-sky-200">
              {project.category}
            </span>

            {project.isConcept ? (
              <span className="px-3 py-1 rounded-full text-[11px] font-tech font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 shadow-2xs">
                <AlertTriangle className="w-3 h-3 text-amber-700" />
                <span>{project.badge || 'CONCEPT BENCHMARK'}</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-[11px] font-tech font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                PRODUCTION CLIENT WORK
              </span>
            )}

            <span className="px-3 py-1 rounded-full text-[11px] font-tech font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              {project.industry}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean leading-relaxed mb-8 max-w-3xl">
            {project.overview}
          </p>

          {/* Featured Visual Media */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl aspect-video max-h-[520px] w-full bg-slate-950">
            <img
              src={project.image}
              alt={`${project.title} - ${project.industry}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white">
                <div className="text-xs font-tech text-sky-300 font-bold uppercase tracking-wider mb-1">
                  Deliverable Highlight
                </div>
                <div className="text-sm sm:text-lg font-display font-bold">
                  {project.metricsPreview || `${project.title} architecture overview`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Objectives */}
      <section className="relative py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* The Challenge */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
              <div className="text-xs font-tech font-bold uppercase tracking-wider text-rose-600 mb-2">
                01. The Problem Context
              </div>
              <h2 className="text-2xl font-display font-black text-slate-900 mb-4">
                The Client Challenge
              </h2>
              <p className="text-sm text-slate-700 font-sans-clean leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Strategic Objectives */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
              <div className="text-xs font-tech font-bold uppercase tracking-wider text-sky-700 mb-2">
                02. Success Metrics
              </div>
              <h2 className="text-2xl font-display font-black text-slate-900 mb-4">
                Project Objectives
              </h2>
              <div className="space-y-2.5">
                {project.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <Target className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy & Work Delivered */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Strategy */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
            <BorderBeam size={140} duration={14} colorFrom="#0284C7" colorTo="#7C3AED" />
            <div className="text-xs font-tech font-bold uppercase tracking-wider text-sky-600 mb-2">
              03. Execution Approach
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-4">
              Strategic &amp; Creative Approach
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-sans-clean leading-relaxed">
              {project.strategy}
            </p>
          </div>

          {/* Work Delivered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">
                Work Delivered
              </h3>
              <div className="space-y-2.5">
                {project.workDelivered.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">
                Final Tangible Deliverables
              </h3>
              <div className="space-y-2.5">
                {project.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-sky-50 text-sky-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results and Key Learnings */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="text-xs font-tech font-bold uppercase tracking-wider text-slate-500 mb-2">
              04. Key Takeaways &amp; Learnings
            </div>
            <h2 className="text-2xl font-display font-black text-slate-900 mb-3">
              Observations &amp; Practical Results
            </h2>
            <p className="text-sm text-slate-700 font-sans-clean leading-relaxed">
              {project.resultsAndLearnings}
            </p>
          </div>

          {/* Tools & Technologies Used */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-tech font-bold text-slate-700 uppercase">
              <Cpu className="w-4 h-4 text-sky-600" />
              <span>Technologies &amp; Tools Used:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.concat(project.toolsUsed || []).map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="relative py-16 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-black text-slate-900">
                Related Case Studies
              </h2>
              <button 
                onClick={() => onNavigate('portfolio')}
                className="text-xs font-tech text-sky-600 font-bold hover:underline"
              >
                View All Case Studies &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <div 
                  key={rel.id}
                  onClick={() => onNavigate('case-study-detail', rel.id)}
                  className="group p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sky-300 transition-all cursor-pointer shadow-xs hover:shadow-md"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-900">
                    <img 
                      src={rel.image} 
                      alt={rel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <span className="text-[10px] font-tech text-sky-600 font-bold uppercase">{rel.category}</span>
                  <h3 className="text-lg font-display font-bold text-slate-900 mb-1">{rel.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{rel.overview}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA to discuss similar project */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-sky-200 shadow-xl relative overflow-hidden">
            <BorderBeam size={160} duration={10} colorFrom="#0284C7" colorTo="#7C3AED" />
            <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              Need a Similar Sprint for Your Brand?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-8 font-sans-clean leading-relaxed">
              Partner with Evo Hawks for clean code, high-retention video production, or conversion-focused advertising.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                onClick={() => onNavigate('start-project')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Start a Project Discussion</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              {onOpenProjectModal && (
                <button
                  onClick={() => onOpenProjectModal(project.title)}
                  className="px-6 py-4 rounded-full text-sm font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer"
                >
                  Quick Project Quote
                </button>
              )}
              <button
                onClick={() => onNavigate('portfolio')}
                className="px-6 py-4 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
