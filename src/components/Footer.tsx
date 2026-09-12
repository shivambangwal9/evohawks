import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { Logo } from './Logo';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { name: string; id: PageId }[] = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Work', id: 'work' },
    { name: 'Why Us', id: 'why-us' },
    { name: 'About', id: 'about' },
    { name: 'Process', id: 'process' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, pageId: PageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    } else {
      window.location.hash = pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-white/90 border-t border-slate-200/80 pt-16 sm:pt-20 pb-12 pb-safe overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-sky-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200/80">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <div onClick={(e) => handleLinkClick(e, 'home')} className="cursor-pointer">
              <Logo size="lg" showTagline={true} lightText={false} />
            </div>
            
            <p className="text-sm text-slate-600 font-sans-clean max-w-sm leading-relaxed mt-2">
              Digital experiences, creative content and marketing solutions for businesses ready to grow online.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href={AGENCY_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evo Hawks on Instagram"
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 flex items-center justify-center text-slate-500 hover:text-sky-600 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={AGENCY_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evo Hawks on Facebook"
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 flex items-center justify-center text-slate-500 hover:text-sky-600 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={AGENCY_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evo Hawks on LinkedIn"
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 flex items-center justify-center text-slate-500 hover:text-sky-600 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={AGENCY_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evo Hawks on YouTube"
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 flex items-center justify-center text-slate-500 hover:text-sky-600 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-tech uppercase tracking-wider text-slate-900 font-bold mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-xs sm:text-sm text-slate-600 hover:text-sky-600 transition-colors cursor-pointer text-left font-medium"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-tech uppercase tracking-wider text-slate-900 font-bold mb-4">
              Capabilities
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-sky-600 transition-colors cursor-pointer text-left">Website Development</button>
              <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-sky-600 transition-colors cursor-pointer text-left">Graphic Design</button>
              <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-sky-600 transition-colors cursor-pointer text-left">Video &amp; Reels Cut</button>
              <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-sky-600 transition-colors cursor-pointer text-left">Social Media</button>
              <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-sky-600 transition-colors cursor-pointer text-left">SEO Search</button>
              <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-sky-600 transition-colors cursor-pointer text-left">Paid Meta Ads</button>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs font-tech text-slate-500">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>{AGENCY_CONFIG.contact.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-violet-600" />
                <span>{AGENCY_CONFIG.contact.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Large Brand Backdrop Silhouette */}
        <div className="pt-8 sm:pt-10 pb-4 sm:pb-6 flex items-center justify-center opacity-5 select-none pointer-events-none overflow-hidden">
          <span className="text-4xl sm:text-8xl md:text-9xl font-display font-black tracking-tighter text-slate-900 whitespace-nowrap">
            EVO HAWKS
          </span>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-slate-500">
          <div>
            © 2026 Evo Hawks. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-semibold transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
