import React, { useState } from 'react';
import type { PortfolioItem } from '../data/agencyData';
import { PortfolioModal } from '../components/PortfolioModal';
import { PostPortfolioModal } from '../components/PostPortfolioModal';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useAuth } from '../context/useAuth';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  Search, 
  Layers, 
  ArrowRight, 
  AlertTriangle,
  Plus,
  Trash2,
  Edit3
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
  const { portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useSiteConfig();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);

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

  const filteredProjects = portfolioItems.filter(project => {
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
      className="pt-28 pb-20 overflow-hidden min-h-screen"
    >
      {/* Work Page Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-6 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
            <Layers className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>PORTFOLIO &amp; CASE STUDY REPOSITORY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight mb-6">
            Engineered for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Maximum Impact</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-6">
            Explore our production projects and concept benchmarks across web engineering, branding, video storytelling, and performance marketing.
          </p>

          {isSuperAdmin && (
            <div className="flex justify-center mb-8">
              <button
                onClick={() => {
                  setEditingProject(null);
                  setPostModalOpen(true);
                }}
                className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white text-xs sm:text-sm font-tech font-bold hover:shadow-[0_0_25px_rgba(255,19,97,0.5)] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Portfolio Project</span>
              </button>
            </div>
          )}

          {/* Search Input Bar */}
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, technology, or industry..."
              className="w-full pl-11 pr-16 py-3.5 rounded-full bg-[#060810] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] shadow-[0_0_25px_rgba(0,0,0,0.5)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-tech text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {filters.map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white shadow-[0_0_15px_rgba(255,19,97,0.35)] font-bold'
                      : 'bg-[#060810] text-slate-300 border border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-12 sm:py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-[2.5rem] bg-[#060810] border border-white/10">
              <p className="text-sm text-slate-400">No case studies match your active search or category filter.</p>
              <button
                onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-tech text-[#38BDF8] font-bold hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => {
                const cornerClass = idx % 2 === 0 ? 'rounded-[2.75rem] rounded-tl-sm' : 'rounded-[2.75rem] rounded-tr-sm';
                return (
                  <div
                    key={project.id}
                    className={`group ${cornerClass} bg-[#060810] border border-white/10 hover:border-[#0099FF]/50 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden relative`}
                  >
                    <div>
                      {/* Media Thumbnail */}
                      <a
                        href={`/portfolio/${project.id}`}
                        onClick={(e) => { e.preventDefault(); onNavigate('case-study-detail', project.id); }}
                        className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer block"
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} - ${project.industry}`}
                          width={800}
                          height={450}
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-tech font-bold uppercase bg-[#0A0D18]/90 backdrop-blur-md text-white border border-white/10 shadow-xs">
                            {project.category}
                          </span>
                          {project.isConcept && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-tech font-bold uppercase bg-[#FF1361]/90 text-white shadow-[0_0_12px_rgba(255,19,97,0.4)] flex items-center gap-1">
                              <AlertTriangle className="w-2.5 h-2.5" />
                              <span>Concept</span>
                            </span>
                          )}
                        </div>

                        {/* Super Admin Quick Actions */}
                        {isSuperAdmin && (
                          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#05070C]/90 p-1 rounded-full border border-white/10 backdrop-blur-md">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setEditingProject(project);
                                setPostModalOpen(true);
                              }}
                              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-[#38BDF8] transition-colors"
                              title="Edit Project"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (window.confirm(`Delete "${project.title}" from portfolio?`)) {
                                  deletePortfolioItem(project.id);
                                }
                              }}
                              className="p-1.5 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </a>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="text-[11px] font-tech text-[#38BDF8] font-semibold mb-1">
                          {project.industry}
                        </div>

                        <h3 className="text-xl font-display font-black text-white group-hover:text-[#38BDF8] transition-colors mb-2">
                          <a
                            href={`/portfolio/${project.id}`}
                            onClick={(e) => { e.preventDefault(); onNavigate('case-study-detail', project.id); }}
                          >
                            {project.title}
                          </a>
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-2 font-sans-clean leading-relaxed mb-4">
                          {project.overview}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-[#0A0D18] border border-white/10 text-slate-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer CTAs */}
                    <div className="p-6 pt-0 border-t border-white/5 mt-2 flex items-center justify-between">
                      <a
                        href={`/portfolio/${project.id}`}
                        onClick={(e) => { e.preventDefault(); onNavigate('case-study-detail', project.id); }}
                        className="inline-flex items-center gap-1 text-xs font-tech font-bold text-[#38BDF8] hover:text-[#0099FF] cursor-pointer transition-colors"
                      >
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-slate-300 hover:text-white bg-[#0A0D18] hover:bg-[#12162A] border border-white/10 cursor-pointer transition-colors"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Bottom Start Project Callout */}
      <section className="relative py-16 bg-transparent border-t border-white/5 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-[3rem] rounded-tl-lg rounded-br-lg bg-gradient-to-br from-[#0A0D18] via-[#060810] to-[#0A0D18] border border-[#0099FF]/40 shadow-[0_0_50px_rgba(0,153,255,0.15)]">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-3">
              Ready to create your brand&apos;s breakthrough case study?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 font-sans-clean leading-relaxed">
              Tell us about your project requirements, target deliverables, and timeline. Our team will prepare a structured Scope of Work within 24 business hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                onClick={() => onNavigate('start-project')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
              >
                <span>Submit Project Brief</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              {onOpenProjectModal && (
                <button
                  type="button"
                  onClick={() => onOpenProjectModal('Portfolio Inquiry')}
                  className="px-6 py-4 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-[#060810] hover:bg-[#12162A] border border-white/15 transition-colors cursor-pointer"
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

      {/* Super Admin Post / Edit Modal */}
      <PostPortfolioModal
        isOpen={postModalOpen}
        onClose={() => {
          setPostModalOpen(false);
          setEditingProject(null);
        }}
        onSave={(itemData) => {
          if (editingProject && itemData.id) {
            updatePortfolioItem(itemData.id, itemData);
          } else {
            addPortfolioItem(itemData);
          }
          setEditingProject(null);
        }}
        initialData={editingProject}
      />
    </motion.div>
  );
};
