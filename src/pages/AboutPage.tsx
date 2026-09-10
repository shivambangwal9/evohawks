import React from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from '../components/ui/TiltCard';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  Eye, 
  Zap, 
  TrendingUp, 
  Compass, 
  Rocket, 
  ArrowRight 
} from 'lucide-react';

interface AboutPageProps {
  onOpenProjectModal: (service?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenProjectModal }) => {
  const milestones = [
    {
      year: "2024",
      title: "Genesis & Clean Code Velocity",
      desc: "Evo Hawks was founded on a simple realization: high-growth brands were drowning in slow, bloated agency retainers. We launched a rapid-deployment development squad delivering sub-second websites.",
      badge: "ORIGIN"
    },
    {
      year: "2025",
      title: "Flight Velocity & Cinematic Media",
      desc: "Expanded into high-retention vertical video, motion graphics, and viral social cuts, providing brands with visual assets that captivate audiences within the first 3 seconds.",
      badge: "EXPANSION"
    },
    {
      year: "2026",
      title: "The Ecosystem Engine",
      desc: "Synchronized website engineering, video storytelling, SEO dominance, and paid marketing funnels into one continuous compounding machine for digital scale.",
      badge: "TODAY"
    }
  ];

  const ethosPoints = [
    {
      keyword: "SEE HIGHER",
      desc: "Bird's-eye strategic vision. We analyze market gaps, competitive landscapes, and high-intent customer behavior before writing a line of code.",
      icon: Eye,
      accent: "text-sky-600"
    },
    {
      keyword: "MOVE FASTER",
      desc: "Rapid agile delivery without compromising quality. Fast website loading, high-tempo content sprints, and agile campaign iterations.",
      icon: Zap,
      accent: "text-blue-600"
    },
    {
      keyword: "GROW FURTHER",
      desc: "Sustainable digital equity. We build compounding SEO rank, scalable paid funnels, and engaged brand communities that last.",
      icon: TrendingUp,
      accent: "text-indigo-600"
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
      {/* About Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent bg-grid-cyber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-6 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>OUR VISION &amp; STORY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-6">
            Predatory Precision in a <br />
            <span className="text-gradient-hawk">Noisy Digital World</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            Inspired by the aerodynamic agility and razor-sharp focus of the hawk, we build digital presences engineered to rise above the noise.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => onOpenProjectModal()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] transition-all cursor-pointer"
            >
              <span>Build With Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Flight Philosophy Section */}
      <section className="relative py-20 bg-transparent border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 flex flex-col items-start">
              <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight mb-6">
                The Hawk Flight <br />
                <span className="text-gradient-cyan">Philosophy</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-700 font-sans-clean leading-relaxed mb-6">
                Most agencies treat digital channels as fragmented afterthoughts. A design agency builds a site that takes 6 seconds to load. A media agency cuts videos that don't convert. An ad freelancer burns budget with broken landing pages.
              </p>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
                <BorderBeam size={100} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />
                <p className="text-sm text-slate-700 font-sans-clean leading-relaxed">
                  <strong className="text-slate-900">Our Asymmetry:</strong> We synchronize engineering, cinematic video storytelling, and paid funnel architecture into one unified growth engine where every piece multiplies the other.
                </p>
              </div>

              <div className="space-y-4 w-full">
                {ethosPoints.map((ethos, idx) => {
                  const Icon = ethos.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className={`w-5 h-5 ${ethos.accent}`} />
                      </div>
                      <div>
                        <div className="text-xs font-tech font-bold text-slate-900 tracking-wider mb-1">
                          {ethos.keyword}
                        </div>
                        <p className="text-xs text-slate-600 font-sans-clean leading-relaxed">
                          {ethos.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Abstract Art */}
            <div className="lg:col-span-6 flex justify-center">
              <TiltCard tiltDegree={12} glareColor="#0284C7" className="w-full max-w-md aspect-square">
                <div className="relative w-full h-full rounded-3xl bg-white/95 border border-slate-200 p-8 flex flex-col items-center justify-center overflow-hidden shadow-xl">
                  <BorderBeam size={160} duration={10} colorFrom="#0284C7" colorTo="#7C3AED" />
                  
                  <div className="absolute w-72 h-72 rounded-full border border-sky-300/40 animate-spin-slow pointer-events-none" />
                  <div className="absolute w-88 h-88 rounded-full border border-dashed border-violet-400/30 animate-spin-slow-reverse pointer-events-none" />

                  <svg 
                    viewBox="0 0 200 200" 
                    className="w-56 h-56 drop-shadow-[0_8px_30px_rgba(2,132,199,0.3)] animate-float relative z-10"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="hawkLargeGradAnimPageLight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00B4D8" />
                        <stop offset="50%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>

                    <polygon points="100,20 30,130 90,95 30,165 100,120 170,165 110,95 170,130" fill="url(#hawkLargeGradAnimPageLight)" opacity="0.95" />
                    <polygon points="100,45 60,115 100,90 140,115" fill="#FFFFFF" fillOpacity="0.9" />
                    <circle cx="100" cy="70" r="4" fill="#00B4D8" />
                    <circle cx="100" cy="70" r="10" stroke="#00B4D8" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
                  </svg>

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-tech bg-white/90 border border-slate-200 px-4 py-2.5 rounded-xl backdrop-blur-md z-20 shadow-md">
                    <span className="text-slate-600 font-medium">Identity Principle</span>
                    <span className="text-sky-600 font-bold">Speed • Tech • Growth</span>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Evolution Timeline */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-xs">
              <Rocket className="w-3.5 h-3.5 text-sky-600" />
              <span>THE EVOLUTION TRAJECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              Our Journey &amp; Milestones
            </h2>
          </div>

          <div className="space-y-8 relative">
            <div className="hidden sm:block absolute top-0 bottom-0 left-12 w-0.5 bg-slate-200" />

            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-start gap-6 sm:gap-8 group"
              >
                <div className="w-24 h-12 rounded-xl bg-white border border-sky-300 text-sky-700 font-tech font-extrabold flex items-center justify-center text-sm shadow-xs flex-shrink-0 z-10">
                  {milestone.year}
                </div>

                <div className="flex-1 p-6 sm:p-8 rounded-2xl bg-white/90 border border-slate-200 hover:border-sky-400 transition-all shadow-sm hover:shadow-md relative overflow-hidden">
                  <BorderBeam size={100} duration={12 + idx * 2} colorFrom="#0284C7" colorTo="#7C3AED" />
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-display font-bold text-slate-900">
                      {milestone.title}
                    </h3>
                    <span className="text-[10px] font-tech bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200 font-bold">
                      {milestone.badge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 font-sans-clean leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </motion.div>
  );
};
