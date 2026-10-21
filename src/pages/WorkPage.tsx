import React, { useState } from 'react';
import { PORTFOLIO_DATA, type PortfolioItem } from '../data/agencyData';
import { PortfolioModal } from '../components/PortfolioModal';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  Search, 
  Layers, 
  ArrowRight, 
  AlertTriangle 
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';

interface WorkPageProps {
  onNavigate: (page: PageId, slug?: string) => void;
  onOpenProjectModal?: (service?: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ 
  onNavigate,
  onOpenProjectModal 
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filters = [
    'All', 
    'Websites', 
    'Branding', 
    'Video Production', 
    'Social Media', 
    'Paid Advertising', 
    'E-commerce', 
    'SEO and Content', 
    'Photography'
  ];

  const filteredProjects = PORTFOLIO_DATA.filter(project => {
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    const matchesSearch = searchQuery.trim() === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pt-28 pb-20 overflow-hidden"
    >
      {/* Work Page Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent bg-grid-cyber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-6 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>PORTFOLIO &amp; CASE STUDY REPOSITORY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-6">
            Engineered for <span className="text-gradient-cyan">Maximum Impact</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our production projects and concept benchmarks across web engineering, branding, video storytelling, and performance marketing.
          </p>

          {/* Search Input Bar */}
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, technology, or industry..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-tech text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-12 sm:py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-white border border-slate-200">
              <p className="text-sm text-slate-500">No case studies match your active search or category filter.</p>
              <button
                onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-tech text-sky-600 font-bold hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden relative"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
                         onClick={() => onNavigate('case-study-detail', project.id)}>
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.industry}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-tech font-bold uppercase bg-white/90 backdrop-blur-md text-slate-900 shadow-xs">
                          {project.category}
                        </span>
                        {project.isConcept && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-tech font-bold uppercase bg-amber-500/90 text-white shadow-xs flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            <span>Concept</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="text-[11px] font-tech text-slate-500 font-semibold mb-1">
                        {project.industry}
                      </div>

                      <h3 
                        onClick={() => onNavigate('case-study-detail', project.id)}
                        className="text-xl font-display font-black text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer mb-2"
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 font-sans-clean leading-relaxed mb-4">
                        {project.overview}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer CTAs */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate('case-study-detail', project.id)}
                      className="inline-flex items-center gap-1 text-xs font-tech font-bold text-sky-600 hover:text-sky-700 cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Bottom Start Project Callout */}
      <section className="relative py-16 bg-white border-t border-slate-200 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-3">
              Ready to create your brand&apos;s breakthrough case study?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6">
              Tell us about your project requirements, target deliverables, and timeline. Our team will prepare a structured Scope of Work within 24 business hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                onClick={() => onNavigate('start-project')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Submit Project Brief</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              {onOpenProjectModal && (
                <button
                  type="button"
                  onClick={() => onOpenProjectModal('Portfolio Inquiry')}
                  className="px-6 py-4 rounded-full text-sm font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer"
                >
                  Quick Quote Modal
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProject && (
        <PortfolioModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectService={() => {
            setSelectedProject(null);
            onNavigate('start-project');
          }}
        />
      )}
    </motion.div>
  );
};
