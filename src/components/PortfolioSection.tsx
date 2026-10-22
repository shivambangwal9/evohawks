import React, { useState } from 'react';
import type { PortfolioItem } from '../data/agencyData';
import { PortfolioModal } from './PortfolioModal';
import { PostPortfolioModal } from './PostPortfolioModal';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useAuth } from '../context/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { BorderBeam } from './ui/BorderBeam';
import { 
  Sparkles, 
  ArrowUpRight, 
  Eye, 
  Plus, 
  Trash2, 
  Edit3, 
  FolderX, 
  ShieldCheck 
} from 'lucide-react';

interface PortfolioSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectService }) => {
  const { siteConfig, portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useSiteConfig();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  
  // Post/Edit Modal state
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);

  const filters = ['All', 'Websites', 'Design', 'Video', 'Social', 'Marketing'];

  const filteredProjects = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(p => {
        if (activeFilter === 'Design') return p.category === 'Branding' || p.category === 'Photography';
        if (activeFilter === 'Video') return p.category === 'Video Production';
        if (activeFilter === 'Social') return p.category === 'Social Media';
        if (activeFilter === 'Marketing') return p.category === 'Paid Advertising' || p.category === 'SEO and Content' || p.category === 'E-commerce';
        return p.category === activeFilter;
      });

  const handleEditClick = (e: React.MouseEvent, project: PortfolioItem) => {
    e.stopPropagation();
    setEditingProject(project);
    setPostModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, project: PortfolioItem) => {
    e.stopPropagation();
    if (window.confirm(`Remove "${project.title}" from Work That Speaks?`)) {
      deletePortfolioItem(project.id);
    }
  };

  const handleSaveProject = (itemData: Omit<PortfolioItem, 'id'> & { id?: string }) => {
    if (editingProject && itemData.id) {
      updatePortfolioItem(itemData.id, itemData);
    } else {
      addPortfolioItem(itemData);
    }
    setEditingProject(null);
  };

  return (
    <section id="work" className="relative py-14 sm:py-24 lg:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0D16]/90 border border-white/10 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF1361]" />
            <span>{siteConfig.workBadge || 'PORTFOLIO & CREATIVE BENCHMARKS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4">
            {siteConfig.workHeading || 'Work That Speaks.'}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans-clean max-w-2xl mb-6">
            {siteConfig.workDescription || 'A selection of websites, creative campaigns, content and digital experiences.'}
          </p>

          {/* Super Admin Quick Post Action Button */}
          {isSuperAdmin && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 p-1.5 pl-3 rounded-full bg-[#0A0E1A]/95 border border-[#FF1361]/40 shadow-[0_0_25px_rgba(255,19,97,0.25)] mb-2"
            >
              <div className="flex items-center gap-1.5 text-xs font-tech font-bold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF2A85]" />
                <span>Super Admin</span>
              </div>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setPostModalOpen(true);
                }}
                className="py-1.5 px-4 rounded-full bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white text-xs font-tech font-bold hover:shadow-[0_0_20px_rgba(255,19,97,0.5)] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post Work to this Space</span>
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Filter Tabs with Active Animated Pill */}
        <div className="flex items-center justify-start sm:justify-center mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#0B0D16]/90 border border-white/10 backdrop-blur-md shadow-lg shrink-0">
            {filters.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap z-10 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] rounded-full shadow-[0_0_20px_rgba(255,19,97,0.45)] -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span>{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid or Maintained Space Container */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => {
                const isEven = idx % 2 === 0;
                const creativeCurve = isEven 
                  ? 'rounded-[1.75rem] sm:rounded-[2.5rem] rounded-tl-lg' 
                  : 'rounded-[1.75rem] sm:rounded-[2.5rem] rounded-tr-lg';
                
                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                  >
                    <TiltCard 
                      tiltDegree={10} 
                      glareColor={isEven ? '#0099FF' : '#FF1361'}
                      onClick={() => setSelectedProject(project)}
                      className="h-full cursor-pointer"
                    >
                      <div className={`group ${creativeCurve} bg-[#0A0D18]/90 border border-white/10 hover:border-[#0099FF]/50 overflow-hidden flex flex-col h-full transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_50px_rgba(0,153,255,0.25)] relative`}>
                        <BorderBeam size={120} duration={12} colorFrom={isEven ? '#0099FF' : '#FF1361'} colorTo={isEven ? '#FF1361' : '#38BDF8'} />

                        {/* Super Admin Quick Actions Overlay (Top Right) */}
                        {isSuperAdmin && (
                          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-[#05070C]/90 p-1 rounded-full border border-white/10 backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => handleEditClick(e, project)}
                              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-[#38BDF8] transition-colors"
                              title="Edit Project"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteClick(e, project)}
                              className="p-1.5 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {/* Project Image Viewport */}
                        <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-[#070912]">
                          <img
                            src={project.image}
                            alt={project.title}
                            width={800}
                            height={500}
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-100"
                            style={{ imageRendering: 'auto' }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                          {/* Concept or Production Project Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-tech font-bold bg-[#05070C]/90 text-[#FF2A85] border border-[#FF1361]/40 shadow-[0_0_15px_rgba(255,19,97,0.3)]">
                              {project.badge || 'Production Project'}
                            </span>
                          </div>

                          {/* Category Tag Top (if admin actions not overlapping) */}
                          {!isSuperAdmin && (
                            <div className="absolute top-4 right-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-tech font-semibold text-[#38BDF8] bg-[#05070C]/90 border border-[#0099FF]/40 shadow-[0_0_15px_rgba(0,153,255,0.2)]">
                                {project.category}
                              </span>
                            </div>
                          )}

                          {/* Hover Quick Action with spring animation - Crystal Clear (No Blur Filter) */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 pointer-events-none group-hover:pointer-events-auto">
                            <motion.span 
                              whileHover={{ scale: 1.06 }}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] text-white font-bold text-xs shadow-[0_0_25px_rgba(255,19,97,0.6)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Project Brief</span>
                            </motion.span>
                          </div>
                        </div>

                        {/* Project Card Body */}
                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-xs font-tech text-[#38BDF8] mb-1 font-semibold tracking-wider uppercase">
                              {project.industry}
                            </div>
                            
                            <h3 className="text-xl font-display font-extrabold text-white group-hover:text-[#38BDF8] transition-colors mb-2 flex items-center justify-between">
                              <span>{project.title}</span>
                              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF1361] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-300 font-sans-clean leading-relaxed line-clamp-2 mb-4">
                              {project.description || project.overview}
                            </p>
                          </div>

                          {/* Services List / Tags */}
                          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                            {project.services && project.services.slice(0, 3).map((srv, tagIdx) => (
                              <span 
                                key={tagIdx} 
                                className="px-3 py-1 rounded-full text-[11px] font-tech text-slate-300 bg-white/5 border border-white/10"
                              >
                                {srv}
                              </span>
                            ))}
                            {project.services && project.services.length > 3 && (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-tech text-[#38BDF8] bg-[#0099FF]/10 border border-[#0099FF]/20">
                                +{project.services.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Preserved Space & Empty State Container */
          <div className="min-h-[380px] rounded-[3rem] rounded-tl-lg bg-[#0A0D18]/70 border border-dashed border-white/15 p-8 sm:p-14 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <BorderBeam size={150} duration={14} colorFrom="#0099FF" colorTo="#FF1361" />
            
            <div className="w-16 h-16 rounded-3xl bg-[#0099FF]/10 border border-[#0099FF]/30 flex items-center justify-center text-[#38BDF8] mb-4 shadow-[0_0_25px_rgba(0,153,255,0.2)]">
              <FolderX className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-2">
              Portfolio Space Maintained
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 font-sans-clean">
              {isSuperAdmin
                ? 'You have cleared unnecessary showcase items. This space is primed for your live portfolio projects.'
                : 'Selected benchmarks are currently being updated by the team. Request our direct private deck or discuss your project.'}
            </p>

            {isSuperAdmin ? (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setPostModalOpen(true);
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white text-xs sm:text-sm font-tech font-bold hover:shadow-[0_0_25px_rgba(255,19,97,0.5)] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Post Your First Portfolio Item</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectService('Website Development')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white text-xs sm:text-sm font-tech font-bold hover:shadow-[0_0_25px_rgba(0,153,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Custom Case Studies</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>

      {/* Portfolio Item Detail Modal */}
      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(srv) => onSelectService(srv)}
      />

      {/* Super Admin Post / Edit Modal */}
      <PostPortfolioModal
        isOpen={postModalOpen}
        onClose={() => {
          setPostModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        initialData={editingProject}
      />
    </section>
  );
};
