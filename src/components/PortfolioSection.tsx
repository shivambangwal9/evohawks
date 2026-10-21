import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/agencyData';
import type { PortfolioItem } from '../data/agencyData';
import { PortfolioModal } from './PortfolioModal';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { BorderBeam } from './ui/BorderBeam';
import { Sparkles, ArrowUpRight, Eye } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectService }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filters = ['All', 'Websites', 'Design', 'Video', 'Social', 'Marketing'];

  const filteredProjects = activeFilter === 'All' 
    ? PORTFOLIO_DATA 
    : PORTFOLIO_DATA.filter(p => p.category === activeFilter);

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0D16]/90 border border-white/10 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF1361]" />
            <span>PORTFOLIO &amp; CREATIVE BENCHMARKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4">
            Work That Speaks.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans-clean">
            A selection of websites, creative campaigns, content and digital experiences.
          </p>
        </motion.div>

        {/* Filter Tabs with Active Animated Pill */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#0B0D16]/90 border border-white/10 backdrop-blur-md shadow-lg">
            {filters.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap z-10 ${
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

        {/* Project Grid with Smooth Layout Transitions & Creative Cinematic Decks */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              const creativeCurve = isEven ? 'rounded-[2.5rem] rounded-tl-lg' : 'rounded-[2.5rem] rounded-tr-lg';
              
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

                      {/* Project Image Viewport */}
                      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#070912]">
                        <img
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-transparent to-transparent opacity-80" />

                        {/* Concept Project Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-tech font-bold bg-[#05070C]/90 text-[#FF2A85] border border-[#FF1361]/40 shadow-[0_0_15px_rgba(255,19,97,0.3)] backdrop-blur-md">
                            {project.badge}
                          </span>
                        </div>

                        {/* Category Tag Top Right */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-tech font-semibold text-[#38BDF8] bg-[#05070C]/90 backdrop-blur-md border border-[#0099FF]/40 shadow-[0_0_15px_rgba(0,153,255,0.2)]">
                            {project.category}
                          </span>
                        </div>

                        {/* Hover Quick Action with spring animation */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#050508]/60 backdrop-blur-xs">
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
                      <div className="p-6 flex-1 flex flex-col justify-between">
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
                          {project.services.slice(0, 3).map((srv, tagIdx) => (
                            <span 
                              key={tagIdx} 
                              className="px-3 py-1 rounded-full text-[11px] font-tech text-slate-300 bg-white/5 border border-white/10"
                            >
                              {srv}
                            </span>
                          ))}
                          {project.services.length > 3 && (
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

      </div>

      {/* Concept Project Modal */}
      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(srv) => onSelectService(srv)}
      />
    </section>
  );
};
