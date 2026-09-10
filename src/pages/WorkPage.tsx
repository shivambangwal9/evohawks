import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/agencyData';
import type { PortfolioItem } from '../data/agencyData';
import { PortfolioModal } from '../components/PortfolioModal';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from '../components/ui/TiltCard';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  ArrowUpRight, 
  Eye, 
  TrendingUp, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

interface WorkPageProps {
  onOpenProjectModal: (service?: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onOpenProjectModal }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filters = ['All', 'Websites', 'Design', 'Video', 'Social', 'Marketing'];

  const filteredProjects = activeFilter === 'All' 
    ? PORTFOLIO_DATA 
    : PORTFOLIO_DATA.filter(p => p.category === activeFilter);

  const spotlightCaseStudies = [
    {
      title: "Hyperion FinTech Platform",
      category: "Web & High-Speed Architecture",
      client: "Global Neo-Banking Concept",
      metric1: "+340% Conversions",
      metric2: "0.38s Load Time",
      desc: "Architected modern Next.js interface with biometric web authenticators and interactive portfolio charts, resulting in an unprecedented increase in sign-up conversions.",
      tags: ["Next.js 15", "Tailwind CSS", "Framer Motion 3D", "FinTech API"]
    },
    {
      title: "Verve Kinetic Brand Launch",
      category: "Reels Content & Brand Identity",
      client: "Luxury Streetwear Collective",
      metric1: "2.4M Impressions",
      metric2: "84% Retention",
      desc: "Produced high-tempo 9:16 vertical video cut series combined with a dark-mode lookbook e-commerce platform that drove organic viral reach across Instagram.",
      tags: ["4K Video Editing", "Sound Design", "Viral Hooks", "Shopify Store"]
    }
  ];

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-6 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>PORTFOLIO &amp; CREATIVE BENCHMARKS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-6">
            Engineered for <span className="text-gradient-cyan">Maximum Impact</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            A curated showcase of websites, creative campaigns, content ecosystems, and scalable digital solutions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-xs">
              <div className="text-2xl font-display font-black text-slate-900">100+</div>
              <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">Deliverables Shipped</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-xs">
              <div className="text-2xl font-display font-black text-sky-600">0.4s</div>
              <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">Average Page Speed</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-xs">
              <div className="text-2xl font-display font-black text-violet-600">4.8x</div>
              <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">Average Ad ROAS</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-xs">
              <div className="text-2xl font-display font-black text-emerald-600">99%</div>
              <div className="text-[11px] font-tech text-slate-500 uppercase font-semibold">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Portfolio Bento Grid */}
      <section className="relative py-20 bg-transparent border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 border border-slate-200/90 backdrop-blur-md shadow-xs">
              {filters.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap z-10 ${
                      isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeWorkFilterPill"
                        className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full shadow-[0_4px_15px_rgba(2,132,199,0.35)] -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      />
                    )}
                    <span>{category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
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
                    glareColor="#0284C7"
                    onClick={() => setSelectedProject(project)}
                    className="h-full cursor-pointer"
                  >
                    <div className="group rounded-3xl bg-white/90 border border-slate-200 hover:border-sky-400 overflow-hidden flex flex-col h-full transition-all duration-300 shadow-xs hover:shadow-xl relative">
                      <BorderBeam size={120} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />

                      {/* Project Image Container */}
                      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300" />

                        {/* Concept Project Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-tech font-bold bg-white/95 text-sky-700 border border-sky-200 backdrop-blur-md shadow-xs">
                            {project.badge}
                          </span>
                        </div>

                        {/* Category Tag Top Right */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-tech font-medium text-slate-800 bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs">
                            {project.category}
                          </span>
                        </div>

                        {/* Hover Quick Action */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900/30 backdrop-blur-xs">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Project Brief</span>
                          </span>
                        </div>
                      </div>

                      {/* Project Card Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-tech text-slate-500 mb-1 font-medium">
                            {project.industry}
                          </div>
                          
                          <h3 className="text-xl font-display font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 flex items-center justify-between">
                            <span>{project.title}</span>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 font-sans-clean leading-relaxed line-clamp-2 mb-4">
                            {project.description}
                          </p>
                        </div>

                        {/* Services List / Tags */}
                        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {project.services.slice(0, 3).map((srv, idx) => (
                            <span 
                              key={idx} 
                              className="px-2.5 py-1 rounded-md text-[11px] font-tech text-slate-600 bg-slate-50 border border-slate-200"
                            >
                              {srv}
                            </span>
                          ))}
                          {project.services.length > 3 && (
                            <span className="px-2 py-1 rounded-md text-[11px] font-tech text-slate-400 bg-slate-50">
                              +{project.services.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Featured Spotlight Case Studies Deep-Dive */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
              <span>MEASURABLE OUTCOMES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              Case Study Spotlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spotlightCaseStudies.map((study, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/95 border border-slate-200 shadow-md relative overflow-hidden flex flex-col justify-between"
              >
                <BorderBeam size={140} duration={12 + idx * 2} colorFrom="#0284C7" colorTo="#7C3AED" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-tech font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                      {study.category}
                    </span>
                    <span className="text-xs font-tech text-slate-500">{study.client}</span>
                  </div>

                  <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-3">
                    {study.title}
                  </h3>

                  <p className="text-sm text-slate-600 font-sans-clean leading-relaxed mb-6">
                    {study.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                    <div className="text-center">
                      <div className="text-xl font-display font-bold text-emerald-600">{study.metric1}</div>
                      <div className="text-[10px] font-tech text-slate-500 uppercase font-semibold">Metric Lift</div>
                    </div>
                    <div className="text-center border-l border-slate-200">
                      <div className="text-xl font-display font-bold text-sky-600">{study.metric2}</div>
                      <div className="text-[10px] font-tech text-slate-500 uppercase font-semibold">Benchmark</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tags.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-tech text-slate-600 bg-white border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <MagneticButton
                  onClick={() => onOpenProjectModal(study.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-600 text-slate-800 hover:text-white font-bold text-xs transition-all border border-slate-200 hover:border-transparent cursor-pointer shadow-xs"
                >
                  <span>Request Similar Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Project Modal */}
      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(srv) => onOpenProjectModal(srv)}
      />
    </motion.div>
  );
};
