import React from 'react';
import { motion } from 'framer-motion';
import { AGENCY_CONFIG } from '../data/agencyData';
import { TiltCard } from '../components/ui/TiltCard';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  Eye, 
  Zap, 
  TrendingUp, 
  Compass, 
  Rocket, 
  ArrowRight,
  ShieldCheck 
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
      className="pt-28 pb-20 overflow-hidden min-h-screen"
    >
      {/* About Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-6 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
            <Compass className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>OUR VISION &amp; STORY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight mb-6">
            Predatory Precision in a <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Noisy Digital World</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            Inspired by the aerodynamic agility and razor-sharp focus of the hawk, we build digital presences engineered to rise above the noise.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => onOpenProjectModal()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
            >
              <span>Build With Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Flight Philosophy Section */}
      <section className="relative py-20 bg-transparent border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 flex flex-col items-start">
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight mb-6">
                The Hawk Flight <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099FF] to-[#38BDF8]">Philosophy</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 font-sans-clean leading-relaxed mb-6">
                Most agencies treat digital channels as fragmented afterthoughts. A design agency builds a site that takes 6 seconds to load. A media agency cuts videos that don&apos;t convert. An ad freelancer burns budget with broken landing pages.
              </p>

              <div className="p-6 sm:p-7 rounded-[2.5rem] rounded-tl-sm bg-[#060810] border border-[#FF1361]/30 shadow-[0_0_25px_rgba(255,19,97,0.1)] mb-8 relative overflow-hidden">
                <BorderBeam size={100} duration={12} colorFrom="#FF1361" colorTo="#0099FF" />
                <p className="text-sm text-slate-300 font-sans-clean leading-relaxed">
                  <strong className="text-white">Our Asymmetry:</strong> We synchronize engineering, cinematic video storytelling, and paid funnel architecture into one unified growth engine where every piece multiplies the other.
                </p>
              </div>

              <div className="space-y-4 w-full">
                {ethosPoints.map((ethos, idx) => {
                  const Icon = ethos.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-4 sm:p-5 rounded-[2rem] bg-[#060810] border border-white/10 hover:border-[#0099FF]/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.4)] flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0A0D18] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-[#38BDF8]" />
                      </div>
                      <div>
                        <div className="text-xs font-tech font-bold text-white tracking-wider mb-1">
                          {ethos.keyword}
                        </div>
                        <p className="text-xs text-slate-400 font-sans-clean leading-relaxed">
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
              <TiltCard tiltDegree={12} glareColor="#0099FF" className="w-full max-w-md aspect-square">
                <div className="relative w-full h-full rounded-[3rem] bg-[#0A0D18] border border-white/10 p-8 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                  <BorderBeam size={160} duration={10} colorFrom="#0099FF" colorTo="#FF1361" />
                  
                  <div className="absolute w-72 h-72 rounded-full border border-[#0099FF]/20 animate-spin-slow pointer-events-none" />
                  <div className="absolute w-88 h-88 rounded-full border border-dashed border-[#FF1361]/20 animate-spin-slow-reverse pointer-events-none" />

                  <svg 
                    viewBox="0 0 200 200" 
                    className="w-56 h-56 drop-shadow-[0_8px_30px_rgba(0,153,255,0.3)] animate-float relative z-10"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="hawkLargeGradAnimPageLight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0099FF" />
                        <stop offset="50%" stopColor="#0077EE" />
                        <stop offset="100%" stopColor="#FF1361" />
                      </linearGradient>
                    </defs>

                    <polygon points="100,20 30,130 90,95 30,165 100,120 170,165 110,95 170,130" fill="url(#hawkLargeGradAnimPageLight)" opacity="0.95" />
                    <polygon points="100,45 60,115 100,90 140,115" fill="#FFFFFF" fillOpacity="0.9" />
                    <circle cx="100" cy="70" r="4" fill="#FF1361" />
                    <circle cx="100" cy="70" r="10" stroke="#0099FF" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
                  </svg>

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-tech bg-[#060810]/90 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md z-20 shadow-md">
                    <span className="text-slate-400 font-medium">Identity Principle</span>
                    <span className="text-[#38BDF8] font-bold">Speed • Tech • Growth</span>
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
              <Rocket className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>THE EVOLUTION TRAJECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              Our Journey &amp; Milestones
            </h2>
          </div>

          <div className="space-y-8 relative">
            <div className="hidden sm:block absolute top-0 bottom-0 left-12 w-0.5 bg-white/10" />

            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-start gap-6 sm:gap-8 group"
              >
                <div className="w-24 h-12 rounded-2xl bg-[#0A0D18] border border-[#0099FF]/40 text-[#38BDF8] font-tech font-extrabold flex items-center justify-center text-sm shadow-[0_0_20px_rgba(0,153,255,0.2)] flex-shrink-0 z-10">
                  {milestone.year}
                </div>

                <div className="flex-1 p-6 sm:p-8 rounded-[2.5rem] rounded-tr-sm bg-[#060810] border border-white/10 hover:border-[#0099FF]/50 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  <BorderBeam size={100} duration={12 + idx * 2} colorFrom="#0099FF" colorTo="#FF1361" />
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-display font-bold text-white">
                      {milestone.title}
                    </h3>
                    <span className="text-[10px] font-tech bg-[#FF1361]/15 text-[#FF2A85] px-3 py-0.5 rounded-full border border-[#FF1361]/30 font-bold">
                      {milestone.badge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 font-sans-clean leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Squad Specializations & Discipline Matrix */}
      <section className="relative py-20 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>CORE DISCIPLINES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              Squad Specializations
            </h2>
            <p className="text-sm text-slate-400 font-sans-clean">
              Direct access to senior craft specialists—no middle managers or communication layers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AGENCY_CONFIG.leadership.map((lead, idx) => {
              const cornerRadius = idx === 0 ? 'rounded-[2.75rem] rounded-tl-sm' : idx === 1 ? 'rounded-[2.75rem] rounded-tr-sm' : 'rounded-[2.75rem] rounded-bl-sm';
              return (
                <div 
                  key={idx}
                  className={`p-6 sm:p-8 ${cornerRadius} bg-[#060810] border border-white/10 hover:border-[#0099FF]/50 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden`}
                >
                  <BorderBeam size={100} duration={12 + idx * 3} colorFrom="#0099FF" colorTo="#FF1361" />
                  <div>
                    <div className="text-[11px] font-tech text-[#38BDF8] font-bold uppercase tracking-wider mb-2">
                      DISCIPLINE PILLAR 0{idx + 1}
                    </div>
                    <h3 className="text-xl font-display font-black text-white mb-3">
                      {lead.role}
                    </h3>
                    <div className="text-xs font-sans-clean text-slate-300 font-medium mb-4 p-3.5 rounded-2xl bg-[#0A0D18] border border-white/10">
                      <strong className="text-white block mb-1">Domain Expertise:</strong>
                      {lead.discipline}
                    </div>
                    <p className="text-xs text-slate-400 font-sans-clean leading-relaxed">
                      <strong className="text-white">Sprint Focus:</strong> {lead.focus}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs font-tech text-slate-400">
                    <span>Sprint Alignment</span>
                    <span className="text-[#0099FF] font-bold">Direct Channel</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Operational Principles & Commitments */}
      <section className="relative py-20 bg-transparent border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              Operational Commitments
            </h2>
            <p className="text-sm text-slate-400 font-sans-clean">
              The professional guidelines that protect your intellectual property and project velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 sm:p-7 rounded-[2.25rem] rounded-tl-sm bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <div className="text-sm font-display font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span>100% IP &amp; Code Ownership</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                Upon final invoice settlement, full intellectual property rights, repository access, and production credentials transfer entirely to you. No proprietary locks.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-[2.25rem] rounded-tr-sm bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <div className="text-sm font-display font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
                <span>Private Slack / WhatsApp Channel</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                You communicate directly with the engineers, designers, and strategists working on your project—not account coordinators who need to pass messages.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-[2.25rem] rounded-bl-sm bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <div className="text-sm font-display font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                <span>Staging Previews Before Production</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                Every code update and video draft is deployed to an isolated staging link for your review and sign-off before anything touches your live domain.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-[2.25rem] rounded-br-sm bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <div className="text-sm font-display font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF1361] shadow-[0_0_8px_#FF1361]" />
                <span>Zero Hidden Third-Party Markups</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                Hosting (Vercel, AWS), ad budgets (Google, Meta), and SaaS tools are billed directly to your business card. You pay only our agreed service fee.
              </p>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};
