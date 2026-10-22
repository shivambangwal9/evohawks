import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';
import { ArrowUp, Mail, MapPin, ShieldCheck } from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';

interface FooterProps {
  onNavigate?: (page: PageId, slug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteConfig } = useSiteConfig();
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { name: string; id: PageId; path: string }[] = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'Services (12 Disciplines)', id: 'services', path: '/services' },
    { name: 'Portfolio & Case Studies', id: 'work', path: '/portfolio' },
    { name: 'Packages & Pricing', id: 'packages', path: '/packages' },
    { name: 'Start a Project Intake', id: 'start-project', path: '/start-project' },
    { name: 'Client Resources & Guides', id: 'blog', path: '/blog' },
    { name: 'Working Process', id: 'process', path: '/process' },
    { name: 'About Agency', id: 'about', path: '/about' },
    { name: 'Agency FAQs', id: 'faq', path: '/faq' },
    { name: 'Contact', id: 'contact', path: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, pageId: PageId, slug?: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId, slug);
    } else {
      window.location.hash = slug ? `${pageId}/${slug}` : pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#030407] border-t border-white/10 pt-16 sm:pt-20 pb-12 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-gradient-to-r from-[#0099FF]/10 via-[#FF1361]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-white/10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <div onClick={(e) => handleLinkClick(e, 'home')} className="cursor-pointer">
              <Logo size="lg" showTagline={true} lightText={theme === 'dark'} />
            </div>
            
            <p className="text-sm text-slate-300 font-sans-clean max-w-sm leading-relaxed mt-2">
              Full-service creative production, digital marketing, brand engineering, and web development agency. Built for conversion, engineered for scale.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href={siteConfig.instagramUrl || AGENCY_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evo Hawks on Instagram"
                className="w-10 h-10 rounded-2xl bg-[#0A0D18] border border-white/10 hover:border-[#FF1361] flex items-center justify-center text-slate-400 hover:text-[#FF2A85] hover:shadow-[0_0_15px_rgba(255,19,97,0.3)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={siteConfig.facebookUrl || AGENCY_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evo Hawks on Facebook"
                className="w-10 h-10 rounded-2xl bg-[#0A0D18] border border-white/10 hover:border-[#0099FF] flex items-center justify-center text-slate-400 hover:text-[#38BDF8] hover:shadow-[0_0_15px_rgba(0,153,255,0.25)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={siteConfig.linkedinUrl || AGENCY_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evo Hawks on LinkedIn"
                className="w-10 h-10 rounded-2xl bg-[#0A0D18] border border-white/10 hover:border-[#0099FF] flex items-center justify-center text-slate-400 hover:text-[#38BDF8] hover:shadow-[0_0_15px_rgba(0,153,255,0.25)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={siteConfig.youtubeUrl || AGENCY_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evo Hawks on YouTube"
                className="w-10 h-10 rounded-2xl bg-[#0A0D18] border border-white/10 hover:border-[#FF1361] flex items-center justify-center text-slate-400 hover:text-[#FF2A85] hover:shadow-[0_0_15px_rgba(255,19,97,0.3)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-tech uppercase tracking-wider text-white font-bold mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-xs sm:text-sm text-slate-400 hover:text-[#38BDF8] transition-colors cursor-pointer text-left font-medium block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-tech uppercase tracking-wider text-white font-bold mb-4">
              Dedicated Service Pages
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <a href="/services/website-development" onClick={(e) => handleLinkClick(e, 'service-detail', 'website-development')} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left block">Website Development</a>
              <a href="/services/shopify-ecommerce" onClick={(e) => handleLinkClick(e, 'service-detail', 'shopify-ecommerce')} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left block">Shopify &amp; E-commerce</a>
              <a href="/services/video-production" onClick={(e) => handleLinkClick(e, 'service-detail', 'video-production')} className="hover:text-[#FF2A85] transition-colors cursor-pointer text-left block">Video Production &amp; Reels</a>
              <a href="/services/meta-ads" onClick={(e) => handleLinkClick(e, 'service-detail', 'meta-ads')} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left block">Paid Meta &amp; Google Ads</a>
              <a href="/services/social-media-management" onClick={(e) => handleLinkClick(e, 'service-detail', 'social-media-management')} className="hover:text-[#FF2A85] transition-colors cursor-pointer text-left block">Social Media Management</a>
              <a href="/services/seo-content-marketing" onClick={(e) => handleLinkClick(e, 'service-detail', 'seo-content-marketing')} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left block">SEO &amp; Content Marketing</a>
              <a href="/services/branding-design" onClick={(e) => handleLinkClick(e, 'service-detail', 'branding-design')} className="hover:text-[#FF2A85] transition-colors cursor-pointer text-left block">Branding &amp; Identity</a>
              <a href="/services/youtube-management" onClick={(e) => handleLinkClick(e, 'service-detail', 'youtube-management')} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left block">YouTube Management</a>
              <a href="/services/influencer-marketing" onClick={(e) => handleLinkClick(e, 'service-detail', 'influencer-marketing')} className="hover:text-[#FF2A85] transition-colors cursor-pointer text-left block">Influencer Marketing</a>
              <a href="/services/website-maintenance" onClick={(e) => handleLinkClick(e, 'service-detail', 'website-maintenance')} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left block">Website Care &amp; SLA</a>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-tech text-slate-400">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0099FF]" />
                <span>{siteConfig.location || AGENCY_CONFIG.contact.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF1361]" />
                <a href={`mailto:${siteConfig.contactEmail || AGENCY_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contactEmail || AGENCY_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Large Brand Backdrop Silhouette */}
        <div className="pt-8 sm:pt-10 pb-4 sm:pb-6 flex items-center justify-center opacity-10 select-none pointer-events-none overflow-hidden">
          <span className="text-4xl sm:text-8xl md:text-9xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/5 to-transparent whitespace-nowrap">
            {siteConfig.name?.toUpperCase() || 'EVO HAWKS'}
          </span>
        </div>

        {/* Bottom Policies, Copyright, Super Admin Portal & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 {siteConfig.name || 'Evo Hawks'}. All rights reserved.</span>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={(e) => handleLinkClick(e, 'privacy-policy')}
              className="hover:text-[#38BDF8] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={(e) => handleLinkClick(e, 'terms')}
              className="hover:text-[#38BDF8] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={(e) => handleLinkClick(e, 'refund-policy')}
              className="hover:text-[#38BDF8] transition-colors cursor-pointer"
            >
              Cancellation &amp; Refund Policy
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={(e) => handleLinkClick(e, 'login')}
              className="hover:text-[#FF2A85] text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-bold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF1361]" />
              <span>Super Admin Portal</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs text-white bg-[#0A0D18] border border-white/10 hover:border-[#FF1361] px-4 py-2 rounded-full hover:shadow-[0_0_20px_rgba(255,19,97,0.3)] transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF2A85]" />
          </button>
        </div>
 
        {/* Generous physical bottom clearance so fixed bottom navigation and floating docks NEVER obscure copyright, policies, or actions */}
        <div className="h-44 sm:h-36 lg:h-16 w-full pointer-events-none select-none" aria-hidden="true" />

      </div>
    </footer>
  );
};
