import React from 'react';
import type { PageId } from '../hooks/usePageRouter';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useTheme } from '../context/ThemeContext';
import { AGENCY_CONFIG } from '../data/agencyData';
import { motion } from 'framer-motion';
import { 
  Home, 
  Sparkles, 
  Briefcase, 
  MessageCircle, 
  ArrowUpRight 
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface MobileBottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenProjectModal?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenProjectModal
}) => {
  const { siteConfig } = useSiteConfig();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const cleanNum = siteConfig.whatsappCleanNumber || AGENCY_CONFIG.contact.whatsappCleanNumber;
  const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent("Hi Evo Hawks! I'm interested in discussing a project.")}`;

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', {
      trigger_source: 'mobile_bottom_dock',
      page: currentPage
    });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const isHome = currentPage === 'home';
  const isServices = currentPage === 'services' || currentPage === 'service-detail';
  const isWork = currentPage === 'work' || currentPage === 'portfolio' || currentPage === 'case-study-detail';

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-3 inset-x-3 sm:inset-x-6 z-40 lg:hidden pointer-events-none pb-safe"
    >
      <div 
        className={`pointer-events-auto max-w-md mx-auto p-1.5 rounded-full ${
          isLight 
            ? 'bg-white/90 border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.18)]' 
            : 'bg-[#070912]/92 border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(0,153,255,0.15)]'
        } border backdrop-blur-2xl flex items-center justify-between gap-1`}
      >
        {/* 1. Home Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (isHome) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              onNavigate('home');
            }
          }}
          className={`relative flex-1 py-2 px-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-tech font-bold transition-all cursor-pointer ${
            isHome
              ? (isLight ? 'text-[#0284C7]' : 'text-white')
              : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
          }`}
        >
          {isHome && (
            <motion.div
              layoutId="mobileActiveDockPill"
              className={`absolute inset-0 rounded-full -z-10 ${
                isLight 
                  ? 'bg-sky-100/90 border border-sky-300/80 shadow-xs' 
                  : 'bg-gradient-to-r from-[#0099FF]/25 to-[#FF1361]/25 border border-[#0099FF]/40 shadow-[0_0_15px_rgba(0,153,255,0.3)]'
              }`}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}
          <Home className={`w-4 h-4 ${isHome ? (isLight ? 'text-[#0284C7]' : 'text-[#38BDF8]') : ''}`} />
          <span>Home</span>
        </motion.button>

        {/* 2. Services Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('services')}
          className={`relative flex-1 py-2 px-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-tech font-bold transition-all cursor-pointer ${
            isServices
              ? (isLight ? 'text-[#0284C7]' : 'text-white')
              : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
          }`}
        >
          {isServices && (
            <motion.div
              layoutId="mobileActiveDockPill"
              className={`absolute inset-0 rounded-full -z-10 ${
                isLight 
                  ? 'bg-sky-100/90 border border-sky-300/80 shadow-xs' 
                  : 'bg-gradient-to-r from-[#0099FF]/25 to-[#FF1361]/25 border border-[#0099FF]/40 shadow-[0_0_15px_rgba(0,153,255,0.3)]'
              }`}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}
          <Sparkles className={`w-4 h-4 ${isServices ? 'text-[#FF1361]' : ''}`} />
          <span>Services</span>
        </motion.button>

        {/* 3. Work / Portfolio Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('work')}
          className={`relative flex-1 py-2 px-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-tech font-bold transition-all cursor-pointer ${
            isWork
              ? (isLight ? 'text-[#0284C7]' : 'text-white')
              : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
          }`}
        >
          {isWork && (
            <motion.div
              layoutId="mobileActiveDockPill"
              className={`absolute inset-0 rounded-full -z-10 ${
                isLight 
                  ? 'bg-sky-100/90 border border-sky-300/80 shadow-xs' 
                  : 'bg-gradient-to-r from-[#0099FF]/25 to-[#FF1361]/25 border border-[#0099FF]/40 shadow-[0_0_15px_rgba(0,153,255,0.3)]'
              }`}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}
          <Briefcase className={`w-4 h-4 ${isWork ? (isLight ? 'text-sky-600' : 'text-[#38BDF8]') : ''}`} />
          <span>Work</span>
        </motion.button>

        {/* 4. WhatsApp Direct Quick Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleWhatsApp}
          className={`relative flex-1 py-2 px-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-tech font-bold cursor-pointer ${
            isLight ? 'text-emerald-700 hover:text-emerald-800' : 'text-emerald-400 hover:text-emerald-300'
          }`}
          title="Direct WhatsApp with Lead Partner"
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span>Chat</span>
        </motion.button>

        {/* 5. Start Project Primary CTA Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            if (onOpenProjectModal) {
              onOpenProjectModal();
            } else {
              onNavigate('start-project');
            }
          }}
          className="py-2.5 px-3.5 sm:px-4 rounded-full bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] text-white text-[11px] font-tech font-black tracking-wide shadow-[0_0_20px_rgba(255,19,97,0.45)] flex items-center gap-1 cursor-pointer shrink-0 active:scale-95 transition-transform"
        >
          <span>Start</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </nav>
  );
};
