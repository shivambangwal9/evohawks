import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { MagneticButton } from './ui/MagneticButton';
import { useAuth } from '../context/useAuth';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  UserCheck, 
  ShieldCheck, 
  LogOut,
  LayoutDashboard,
  ChevronDown
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA } from '../data/agencyData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, slug?: string) => void;
  onOpenProjectModal: () => void;
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenProjectModal: _onOpenProjectModal,
  onOpenBookingModal 
}) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<any>(null);

  const navLinks: { name: string; id: PageId }[] = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Work', id: 'work' },
    { name: 'Packages', id: 'packages' },
    { name: 'Resources', id: 'blog' },
    { name: 'About', id: 'about' },
    { name: 'Process', id: 'process' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: PageId, slug?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    onNavigate(pageId, slug);
  };

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,153,255,0.1)] py-2.5 sm:py-3' 
            : 'bg-transparent py-3.5 sm:py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div onClick={() => onNavigate('home')} className="cursor-pointer shrink-0">
            <Logo size="md" lightText={true} />
          </div>

          {/* Desktop Navigation Links with layoutId active pill & Services Mega-dropdown */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0A0C16]/85 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id || (link.id === 'services' && currentPage === 'service-detail');
              
              if (link.id === 'services') {
                return (
                  <div 
                    key={link.id} 
                    className="relative"
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-colors duration-200 z-10 flex items-center gap-1 ${
                        isActive 
                          ? 'text-[#38BDF8] font-bold' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavbarPill"
                          className="absolute inset-0 bg-gradient-to-r from-[#0099FF]/20 via-[#8B5CF6]/20 to-[#FF1361]/20 border border-[#0099FF]/50 rounded-full shadow-[0_0_15px_rgba(0,153,255,0.3)] -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-[#38BDF8]' : 'text-slate-400'}`} />
                    </a>

                    {/* Desktop Services Mega Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[620px] bg-[#070912]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,153,255,0.15)] p-5 z-50 overflow-hidden"
                        >
                          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-xs font-tech">
                            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#FF1361] animate-ping" />
                              ALL 12 CORE DISCIPLINES
                            </span>
                            <a
                              href="#services"
                              onClick={(e) => handleLinkClick(e, 'services')}
                              className="text-[#38BDF8] hover:text-[#0099FF] font-bold flex items-center gap-1 group"
                            >
                              <span>Explore Full Catalogue</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {SERVICES_DATA.map((srv) => (
                              <a
                                key={srv.id}
                                href={`#services/${srv.slug}`}
                                onClick={(e) => handleLinkClick(e, 'service-detail', srv.slug)}
                                className="p-2.5 rounded-2xl hover:bg-gradient-to-r hover:from-[#0099FF]/15 hover:to-[#FF1361]/15 border border-transparent hover:border-[#0099FF]/30 transition-all group flex flex-col"
                              >
                                <span className="font-bold text-slate-100 group-hover:text-[#38BDF8] transition-colors flex items-center justify-between">
                                  <span>{srv.title}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF1361]" />
                                </span>
                                <span className="text-[11px] text-slate-400 font-sans-clean line-clamp-1 mt-0.5">
                                  {srv.tagline}
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-colors duration-200 z-10 ${
                    isActive 
                      ? 'text-[#38BDF8] font-bold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavbarPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#0099FF]/20 via-[#8B5CF6]/20 to-[#FF1361]/20 border border-[#0099FF]/50 rounded-full shadow-[0_0_15px_rgba(0,153,255,0.3)] -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Action CTA Button & Portal Login with Magnetic effect */}
          <div className="hidden lg:flex items-center gap-3">
            {/* User Auth Status Pill */}
            {user ? (
              <div className="flex items-center gap-1.5 bg-[#0B0D16]/90 p-1 pl-3 rounded-full border border-white/10 shadow-2xs">
                <button
                  onClick={() => onNavigate(user.role === 'admin' ? 'admin-portal' : 'client-portal')}
                  className={`text-xs font-tech font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    user.role === 'admin' ? 'text-[#FF2A85] hover:text-[#FF1361]' : 'text-[#38BDF8] hover:text-white'
                  }`}
                  title="Go to Dashboard"
                >
                  {user.role === 'admin' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF1361]" />
                  ) : (
                    <UserCheck className="w-3.5 h-3.5 text-[#0099FF]" />
                  )}
                  <span className="max-w-[110px] truncate">{user.company || user.name}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    onNavigate('home');
                  }}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="py-1.5 px-3 rounded-full text-xs font-tech font-bold text-slate-300 hover:text-white bg-[#0B0D16]/90 hover:bg-[#121624] border border-white/10 hover:border-[#0099FF]/40 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="Preview client sprint tracker & admin portal"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#0099FF]" />
                <span>Portal</span>
                <span className="text-[9px] font-tech text-[#38BDF8] bg-[#0099FF]/20 px-1.5 py-0.2 rounded font-bold">DEMO</span>
              </button>
            )}

            {onOpenBookingModal && (
              <button
                onClick={onOpenBookingModal}
                className="py-1.5 px-3 rounded-full text-xs font-tech font-bold text-slate-300 hover:text-white bg-[#0B0D16]/90 hover:bg-[#121624] border border-white/10 hover:border-[#FF1361]/40 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="Schedule a 30-minute consultation"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#FF1361]" />
                <span>Book Call</span>
              </button>
            )}

            <MagneticButton
              onClick={() => onNavigate('start-project')}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold text-white bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] hover:shadow-[0_0_25px_rgba(255,19,97,0.5)] transition-all duration-300 cursor-pointer overflow-hidden animate-shimmer"
            >
              <Sparkles className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12" />
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </div>

          {/* Mobile / Tablet Actions (Visible on screens < 1024px) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {user ? (
              <button
                onClick={() => onNavigate(user.role === 'admin' ? 'admin-portal' : 'client-portal')}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#0B0D16] text-[#38BDF8] border border-white/10 text-xs font-tech font-bold flex items-center gap-1.5"
                title="Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Portal</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-2.5 py-1.5 rounded-full text-[11px] font-tech font-bold text-slate-300 bg-[#0B0D16]/90 border border-white/10 hover:border-[#0099FF]/40"
              >
                Demo
              </button>
            )}

            <button
              onClick={() => onNavigate('start-project')}
              className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF1361] to-[#0099FF] hover:shadow-[0_0_20px_rgba(255,19,97,0.4)] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Start <span className="hidden sm:inline">Project</span> →
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#0B0D16]/90 hover:bg-[#121624] border border-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF1361]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050508]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-20 pb-6 px-5 sm:px-8 border-b border-white/10 overflow-y-auto pb-safe"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex flex-col gap-2 pt-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between text-xs uppercase tracking-wider font-tech text-[#38BDF8] font-bold mb-2 px-2">
                <span>Navigation Menu</span>
                <span className="text-[10px] text-slate-500 font-normal">Tap to explore</span>
              </div>
              {navLinks.map((link, idx) => {
                const isActive = currentPage === link.id;
                return (
                  <motion.a
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.025 }}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`flex items-center justify-between px-4 py-3 min-h-[46px] rounded-2xl text-sm sm:text-base font-semibold transition-colors border ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#0099FF]/20 to-[#FF1361]/20 border-[#0099FF]/50 text-white shadow-[0_0_15px_rgba(0,153,255,0.2)]' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[#FF1361]' : 'text-slate-500'}`} />
                  </motion.a>
                );
              })}

              {/* Portal link in mobile */}
              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.025 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (user) {
                    onNavigate(user.role === 'admin' ? 'admin-portal' : 'client-portal');
                  } else {
                    onNavigate('login');
                  }
                }}
                className="flex items-center justify-between px-4 py-3 min-h-[46px] rounded-2xl text-sm sm:text-base font-semibold transition-colors border bg-[#0B0D16] border-white/10 text-slate-200 cursor-pointer mt-1"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#0099FF]" />
                  <span>{user ? `Dashboard (Demo: ${user.role})` : 'Portal Preview (Demo)'}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </motion.button>
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10 mt-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('start-project');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-[#FF1361] to-[#0099FF] shadow-[0_0_25px_rgba(255,19,97,0.4)] text-sm cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('contact');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-slate-200 hover:text-white bg-white/5 border border-white/10 text-sm cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#38BDF8]" />
                <span>Get in Touch</span>
              </button>
              {onOpenBookingModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookingModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-[#FF2A85] hover:text-white bg-[#FF1361]/10 border border-[#FF1361]/30 text-sm cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#FF1361]" />
                  <span>Book 30-Min Strategy Call</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
