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
    <div className="pt-28 pb-20 overflow-hidden min-h-screen bg-[#050508] text-white">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs font-tech text-slate-400">
          <button 
            onClick={() => onNavigate('portfolio')}
            className="hover:text-[#0099FF] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </button>
          <span>/</span>
          <span className="text-[#38BDF8] font-bold">{project.category}</span>
          <span>/</span>
          <span className="text-white font-semibold truncate">{project.title}</span>
        </div>
      </div>

      {/* Case Study Header & Hero */}
      <section className="relative py-12 sm:py-16 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-tech font-extrabold uppercase bg-[#0A0D18] text-[#38BDF8] border border-[#0099FF]/30 shadow-[0_0_15px_rgba(0,153,255,0.15)]">
              {project.category}
            </span>

            {project.isConcept ? (
              <span className="px-3.5 py-1 rounded-full text-[11px] font-tech font-extrabold uppercase bg-[#FF1361]/15 text-[#FF2A85] border border-[#FF1361]/30 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,19,97,0.2)]">
                <AlertTriangle className="w-3 h-3 text-[#FF1361]" />
                <span>{project.badge || 'CONCEPT BENCHMARK'}</span>
              </span>
            ) : (
              <span className="px-3.5 py-1 rounded-full text-[11px] font-tech font-extrabold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                PRODUCTION CLIENT WORK
              </span>
            )}

            <span className="px-3.5 py-1 rounded-full text-[11px] font-tech font-semibold bg-[#0A0D18] text-slate-300 border border-white/10">
              {project.industry}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans-clean leading-relaxed mb-8 max-w-3xl">
            {project.overview}
          </p>

          {/* Featured Visual Media */}
          <div className="relative rounded-[3rem] rounded-tl-sm overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] aspect-video max-h-[520px] w-full bg-[#060810]">
            <img
              src={project.image}
              alt={`${project.title} - ${project.industry}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/90 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white">
                <div className="text-xs font-tech text-[#38BDF8] font-bold uppercase tracking-wider mb-1">
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
      <section className="relative py-16 bg-transparent border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* The Challenge */}
            <div className="p-8 sm:p-10 rounded-[2.75rem] rounded-tl-sm bg-[#060810] border border-[#FF1361]/30 shadow-[0_0_30px_rgba(255,19,97,0.08)]">
              <div className="text-xs font-tech font-bold uppercase tracking-wider text-[#FF2A85] mb-2">
                01. The Problem Context
              </div>
              <h2 className="text-2xl font-display font-black text-white mb-4">
                The Client Challenge
              </h2>
              <p className="text-sm text-slate-300 font-sans-clean leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Strategic Objectives */}
            <div className="p-8 sm:p-10 rounded-[2.75rem] rounded-tr-sm bg-[#060810] border border-[#0099FF]/30 shadow-[0_0_30px_rgba(0,153,255,0.08)]">
              <div className="text-xs font-tech font-bold uppercase tracking-wider text-[#38BDF8] mb-2">
                02. Success Metrics
              </div>
              <h2 className="text-2xl font-display font-black text-white mb-4">
                Project Objectives
              </h2>
              <div className="space-y-2.5">
                {project.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Target className="w-4 h-4 text-[#0099FF] flex-shrink-0 mt-0.5" />
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
          <div className="p-8 sm:p-10 rounded-[2.75rem] rounded-bl-sm bg-[#060810] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <BorderBeam size={140} duration={14} colorFrom="#0099FF" colorTo="#FF1361" />
            <div className="text-xs font-tech font-bold uppercase tracking-wider text-[#38BDF8] mb-2">
              03. Execution Approach
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-4">
              Strategic &amp; Creative Approach
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans-clean leading-relaxed">
              {project.strategy}
            </p>
          </div>

          {/* Work Delivered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[2.5rem] bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <h3 className="text-xl font-display font-bold text-white mb-4">
                Work Delivered
              </h3>
              <div className="space-y-2.5">
                {project.workDelivered.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#0099FF] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <h3 className="text-xl font-display font-bold text-white mb-4">
                Final Tangible Deliverables
              </h3>
              <div className="space-y-2.5">
                {project.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-[#FF1361]/15 text-[#FF2A85] border border-[#FF1361]/30 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results and Key Learnings */}
          <div className="p-8 sm:p-10 rounded-[2.75rem] rounded-br-sm bg-gradient-to-br from-[#0A0D18] to-[#060810] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="text-xs font-tech font-bold uppercase tracking-wider text-slate-400 mb-2">
              04. Key Takeaways &amp; Learnings
            </div>
            <h2 className="text-2xl font-display font-black text-white mb-3">
              Observations &amp; Practical Results
            </h2>
            <p className="text-sm text-slate-300 font-sans-clean leading-relaxed">
              {project.resultsAndLearnings}
            </p>
          </div>

          {/* Tools & Technologies Used */}
          <div className="p-6 rounded-full bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-tech font-bold text-slate-300 uppercase pl-2">
              <Cpu className="w-4 h-4 text-[#0099FF]" />
              <span>Technologies &amp; Tools Used:</span>
            </div>
            <div className="flex flex-wrap gap-2 pr-2">
              {project.technologies.concat(project.toolsUsed || []).map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-[#0A0D18] text-slate-300 border border-white/10"
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
        <section className="relative py-16 bg-transparent border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-black text-white">
                Related Case Studies
              </h2>
              <button 
                onClick={() => onNavigate('portfolio')}
                className="text-xs font-tech text-[#38BDF8] font-bold hover:underline"
              >
                View All Case Studies &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel, idx) => {
                const cornerClass = idx % 2 === 0 ? 'rounded-[2.5rem] rounded-tl-sm' : 'rounded-[2.5rem] rounded-tr-sm';
                return (
                  <div 
                    key={rel.id}
                    onClick={() => onNavigate('case-study-detail', rel.id)}
                    className={`group p-6 ${cornerClass} bg-[#060810] hover:bg-[#0A0D18] border border-white/10 hover:border-[#0099FF]/50 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.4)]`}
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-black">
                      <img 
                        src={rel.image} 
                        alt={rel.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                      />
                    </div>
                    <span className="text-[10px] font-tech text-[#38BDF8] font-bold uppercase">{rel.category}</span>
                    <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-[#38BDF8] transition-colors">{rel.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 font-sans-clean">{rel.overview}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA to discuss similar project */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-14 rounded-[3rem] rounded-tl-lg rounded-br-lg bg-gradient-to-br from-[#0A0D18] via-[#060810] to-[#0A0D18] border border-[#0099FF]/40 shadow-[0_0_50px_rgba(0,153,255,0.15)] relative overflow-hidden">
            <BorderBeam size={160} duration={10} colorFrom="#0099FF" colorTo="#FF1361" />
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-3">
              Need a Similar Sprint for Your Brand?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-8 font-sans-clean leading-relaxed">
              Partner with Evo Hawks for clean code, high-retention video production, or conversion-focused advertising.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                onClick={() => onNavigate('start-project')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
              >
                <span>Start a Project Discussion</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              {onOpenProjectModal && (
                <button
                  onClick={() => onOpenProjectModal(project.title)}
                  className="px-6 py-4 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-[#060810] hover:bg-[#12162A] border border-white/15 transition-colors cursor-pointer"
                >
                  Quick Project Quote
                </button>
              )}
              <button
                onClick={() => onNavigate('portfolio')}
                className="px-6 py-4 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-[#060810] hover:bg-[#12162A] border border-white/15 transition-colors cursor-pointer"
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
