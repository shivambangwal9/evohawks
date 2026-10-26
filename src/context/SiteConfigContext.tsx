import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PortfolioItem } from '../data/agencyData';
import { AGENCY_CONFIG } from '../data/agencyData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface SiteConfig {
  // Brand & Identity
  name: string;
  tagline: string;
  slogan: string;
  badge: string;

  // Hero Section Copy
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroHeadlineLine3: string;
  heroDescription: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;

  // Work That Speaks Section Copy
  workBadge: string;
  workHeading: string;
  workDescription: string;

  // Announcement Bar
  announcementEnabled: boolean;
  announcementText: string;
  announcementLinkText: string;
  announcementLinkUrl: string;

  // Contact & Business Info
  contactEmail: string;
  contactPhone: string;
  contactPhoneDisplay: string;
  whatsappNumber: string;
  whatsappCleanNumber: string;
  location: string;
  operatingHours: string;
  responseTime: string;

  // Socials
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  twitterUrl: string;

  // Key Value Metrics
  metric1Value: string;
  metric1Label: string;
  metric2Value: string;
  metric2Label: string;
  metric3Value: string;
  metric3Label: string;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  name: AGENCY_CONFIG.name || 'Evo Hawks',
  tagline: AGENCY_CONFIG.tagline || 'We Build. We Create. We Grow.',
  slogan: AGENCY_CONFIG.slogan || 'See higher. Move faster. Grow further.',
  badge: AGENCY_CONFIG.badge || 'EVO HAWKS • CREATIVE PRODUCTION & DIGITAL MARKETING AGENCY',

  heroHeadlineLine1: 'We Build.',
  heroHeadlineLine2: 'We Create.',
  heroHeadlineLine3: 'We Grow.',
  heroDescription: AGENCY_CONFIG.heroDescription || 'Evo Hawks is a full-service creative production and digital marketing agency. We engineer high-converting websites, produce cinematic video, manage social media, run high-ROAS Meta Ads, and execute technical SEO for growing brands.',
  heroPrimaryCtaText: 'Discuss Your Project',
  heroSecondaryCtaText: 'View Production Work',

  workBadge: 'PORTFOLIO & CREATIVE BENCHMARKS',
  workHeading: 'Work That Speaks.',
  workDescription: 'A selection of websites, creative campaigns, content and digital experiences.',

  announcementEnabled: false,
  announcementText: '🚀 Now booking Q2 client sprint cycles • Direct specialist collaboration',
  announcementLinkText: 'Start Your Project &rarr;',
  announcementLinkUrl: 'start-project',

  contactEmail: AGENCY_CONFIG.contact.email || 'teamevohawks@gmail.com',
  contactPhone: AGENCY_CONFIG.contact.phone || '+91 98765 43210',
  contactPhoneDisplay: AGENCY_CONFIG.contact.phoneDisplay || '+91 98765 43210 (Direct Consultation)',
  whatsappNumber: AGENCY_CONFIG.contact.whatsapp || '+91 98765 43210',
  whatsappCleanNumber: AGENCY_CONFIG.contact.whatsappCleanNumber || '919876543210',
  location: AGENCY_CONFIG.contact.location || 'Dehradun, Uttarakhand, India (Serving Global Clients)',
  operatingHours: AGENCY_CONFIG.contact.operatingHours || 'Monday – Saturday: 09:30 AM – 06:30 PM IST',
  responseTime: AGENCY_CONFIG.contact.responseTime || 'Responses within 2 business hours',

  instagramUrl: AGENCY_CONFIG.socials.instagram || 'https://instagram.com/evohawks',
  facebookUrl: AGENCY_CONFIG.socials.facebook || 'https://facebook.com/evohawks',
  linkedinUrl: AGENCY_CONFIG.socials.linkedin || 'https://linkedin.com/company/evohawks',
  youtubeUrl: AGENCY_CONFIG.socials.youtube || 'https://youtube.com/@evohawks',
  twitterUrl: AGENCY_CONFIG.socials.twitter || 'https://x.com/evohawks',

  metric1Value: '98.4%',
  metric1Label: 'Client Satisfaction',
  metric2Value: '3.8x',
  metric2Label: 'Average ROAS Multiplier',
  metric3Value: '14-Day',
  metric3Label: 'Rapid Delivery Sprints',
};

// Curated initial portfolio: Clean, high-impact items (replacing 12+ bloated mock concept benchmarks)
export const INITIAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'apex-luxe',
    slug: 'apex-luxe',
    title: 'Apex Luxe Fashion',
    clientName: 'Apex Luxe Fashion',
    client: 'Apex Luxe Fashion',
    category: 'Websites',
    isConcept: false,
    badge: 'Production Project',
    industry: 'Luxury Fashion & Retail',
    services: ['UI/UX Systems', 'React Architecture', 'Headless Commerce', 'Micro-Interactions'],
    overview: 'A luxury lifestyle storefront showcasing sub-second page transitions, dynamic cursor interactions, and editorial typography engineered for high-ticket apparel brands.',
    description: 'A luxury lifestyle storefront showcasing sub-second page transitions, dynamic cursor interactions, and editorial typography engineered for high-ticket apparel brands.',
    challenge: 'High-fashion storefronts suffer from heavy video loops, slow mobile render times, and clunky navigation that drives away affluent mobile buyers.',
    objectives: [
      'Achieve sub-second mobile page loads across full product collections',
      'Deliver fluid editorial aesthetics with micro-interactions and smooth layout shifts',
      'Build a frictionless one-click cart drawer architecture'
    ],
    strategy: 'Implemented lightweight CSS hardware-accelerated transforms, WebP compression, and headless component trees for instant client-side routing.',
    solution: 'Implemented lightweight CSS hardware-accelerated transforms, WebP compression, and headless component trees for instant client-side routing.',
    workDelivered: [
      'High-contrast editorial lookbook design',
      'Responsive navigation with touch-friendly drawer',
      'Accessible product gallery with swipe controls and zoom',
      'Optimized checkout entry flow'
    ],
    deliverables: [
      'Full interactive web application',
      'Figma design system with typography and color tokens',
      'Performance benchmark report scoring 98+ on Google Lighthouse'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    toolsUsed: ['Figma', 'VS Code', 'Lighthouse', 'Git'],
    resultsAndLearnings: 'Sub-second load times achieved with rich media, boosting checkout conversions by 42%.',
    metricsPreview: 'Sub-second mobile speed with 98+ Lighthouse score',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    accent: 'from-sky-500 to-indigo-600',
    relatedProjectIds: ['pulsepay-fintech', 'verve-studios']
  },
  {
    id: 'pulsepay-fintech',
    slug: 'pulsepay-fintech',
    title: 'PulsePay Global',
    clientName: 'PulsePay Global',
    client: 'PulsePay Global',
    category: 'Websites',
    isConcept: false,
    badge: 'Production Project',
    industry: 'B2B Financial Technology',
    services: ['Enterprise Landing Page', 'Interactive Rate Calculator', 'SOC-2 Trust Badging', 'Lead Funnel'],
    overview: 'High-trust landing page architecture for a cross-border payments platform, featuring real-time rate comparison and enterprise compliance signals.',
    description: 'High-trust landing page architecture for a cross-border payments platform, featuring real-time rate comparison and enterprise compliance signals.',
    challenge: 'Fintech visitors demand instant proof of security, clear pricing calculations, and zero visual friction before initiating corporate onboarding.',
    objectives: [
      'Eliminate customer skepticism regarding foreign exchange spreads',
      'Provide an interactive real-time currency calculator with zero latency',
      'Capture qualified corporate accounts with an intelligent multi-step form'
    ],
    strategy: 'Built a high-trust aesthetic with slate-900 typography, subtle border beams, interactive client-side rate sliders, and enterprise lead capture validation.',
    solution: 'Built a high-trust aesthetic with slate-900 typography, subtle border beams, interactive client-side rate sliders, and enterprise lead capture validation.',
    workDelivered: [
      'Dynamic currency exchange calculation engine',
      'Security compliance credential badges layout',
      'Multi-step corporate onboarding lead qualification form',
      'Interactive comparison benchmark table'
    ],
    deliverables: [
      'Production-ready B2B fintech web template',
      'Accessible slider component with keyboard navigation',
      'Lead delivery schema with server-side validation rules'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Lucide Icons'],
    toolsUsed: ['Figma', 'TypeScript', 'Tailwind CSS'],
    resultsAndLearnings: 'Interactive fee calculators increased enterprise demo booking rate by 67%.',
    metricsPreview: 'Interactive real-time conversion rates with 67% increase in demo requests',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    accent: 'from-emerald-500 to-teal-700',
    relatedProjectIds: ['apex-luxe']
  },
  {
    id: 'verve-studios',
    slug: 'verve-studios',
    title: 'Verve Studio Media',
    clientName: 'Verve Apparel & Media',
    client: 'Verve Apparel & Media',
    category: 'Video Production',
    isConcept: false,
    badge: 'Production Project',
    industry: 'Streetwear & Lifestyle Apparel',
    services: ['Short-Form Video', 'Reels Production', 'Kinetic Typography', 'Sound Design'],
    overview: 'Cinematic 9:16 vertical video production campaign featuring high-tempo beat syncing, dramatic color grades, and streetwear lookbook reels.',
    description: 'Cinematic 9:16 vertical video production campaign featuring high-tempo beat syncing, dramatic color grades, and streetwear lookbook reels.',
    challenge: 'Organic feed fatigue was leading to sub-2 second drop-offs on brand launch teasers.',
    objectives: [
      'Achieve 70%+ 3-second hook retention on Instagram Reels and TikTok',
      'Produce 15 modular video cut-downs ready for organic and paid ad scaling'
    ],
    strategy: 'Engineered high-contrast kinetic opening hooks with custom foley sound design and aggressive pace editing.',
    solution: 'Engineered high-contrast kinetic opening hooks with custom foley sound design and aggressive pace editing.',
    workDelivered: [
      '15 high-tempo 9:16 vertical video edits in 4K',
      'Custom kinetic typography title cards',
      'Color grading and multi-track audio mastering'
    ],
    deliverables: [
      '4K master video exports in 9:16 and 16:9 formats',
      'Thumbnail asset package and caption copywriting library'
    ],
    technologies: ['DaVinci Resolve Studio', 'Sony FX3 Cinema', 'Adobe Premiere Pro'],
    toolsUsed: ['DaVinci Resolve', 'Adobe After Effects', 'Audition'],
    resultsAndLearnings: 'Strong audio hooks coupled with fast cut transitions increased 3-second hook retention to 78.4%.',
    metricsPreview: '78.4% 3-second hook retention across 15 vertical video assets',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    accent: 'from-pink-500 to-rose-700',
    relatedProjectIds: ['apex-luxe']
  }
];

interface SiteConfigContextType {
  siteConfig: SiteConfig;
  portfolioItems: PortfolioItem[];
  isCloudSynced: boolean;
  updateSiteConfig: (updates: Partial<SiteConfig>) => Promise<void> | void;
  resetSiteConfig: () => void;
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'> & { id?: string }) => PortfolioItem;
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  resetPortfolioItems: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonStr: string) => boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const STORAGE_KEY_CONFIG = 'evohawks_custom_site_config';
const STORAGE_KEY_PORTFOLIO = 'evohawks_portfolio_items';

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load site config
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.contactEmail === 'contact@evohawks.tech' || !parsed.contactEmail) {
          parsed.contactEmail = 'teamevohawks@gmail.com';
        }
        return { ...DEFAULT_SITE_CONFIG, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to parse saved site config', e);
    }
    return DEFAULT_SITE_CONFIG;
  });

  // Load portfolio items
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PORTFOLIO);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved portfolio items', e);
    }
    return INITIAL_PORTFOLIO_ITEMS;
  });

  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(isSupabaseConfigured());

  // Cloud Sync: Fetch from Supabase on load and subscribe to real-time changes
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      return;
    }

    let isMounted = true;
    const client = supabase;

    const loadCloudSettings = async () => {
      try {
        const { data, error } = await client
          .from('site_settings')
          .select('config, portfolio')
          .eq('id', 'current')
          .maybeSingle();

        if (error) {
          console.warn('Supabase site_settings notice:', error.message);
          return;
        }

        if (data && isMounted) {
          setIsCloudSynced(true);
          if (data.config && typeof data.config === 'object') {
            setSiteConfig(prev => {
              const merged = { ...prev, ...data.config };
              try {
                localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(merged));
              } catch {
                // ignore
              }
              return merged;
            });
          }
          if (Array.isArray(data.portfolio) && data.portfolio.length > 0) {
            setPortfolioItems(data.portfolio);
            try {
              localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(data.portfolio));
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        console.warn('Supabase initial fetch failed:', err);
      }
    };

    loadCloudSettings();

    // Subscribe to real-time changes across devices
    const channel = client
      .channel('public:site_settings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_settings' },
        (payload: { new?: { config?: Partial<SiteConfig>; portfolio?: PortfolioItem[] } }) => {
          if (payload.new?.config && typeof payload.new.config === 'object') {
            const incomingConfig = payload.new.config;
            setSiteConfig(prev => {
              const updated = { ...prev, ...incomingConfig };
              try {
                localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
              } catch {
                // ignore
              }
              return updated;
            });
          }
          if (payload.new?.portfolio && Array.isArray(payload.new.portfolio)) {
            const incomingPortfolio = payload.new.portfolio;
            setPortfolioItems(incomingPortfolio);
            try {
              localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(incomingPortfolio));
            } catch {
              // ignore
            }
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      client.removeChannel(channel);
    };
  }, []);

  // Save config changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(siteConfig));
    } catch (e) {
      console.warn('Failed to save site config to localStorage', e);
    }
  }, [siteConfig]);

  // Save portfolio changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(portfolioItems));
    } catch (e) {
      console.warn('Failed to save portfolio items to localStorage', e);
    }
  }, [portfolioItems]);

  const updateSiteConfig = async (updates: Partial<SiteConfig>) => {
    const next = { ...siteConfig, ...updates };
    setSiteConfig(next);
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(next));
    } catch (e) {
      console.warn('Failed to save site config to localStorage', e);
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('site_settings')
          .upsert({
            id: 'current',
            config: next,
            updated_at: new Date().toISOString()
          });
        if (!error) {
          setIsCloudSynced(true);
        } else {
          console.warn('Failed to save to Supabase:', error.message);
        }
      } catch (e) {
        console.warn('Supabase update failed:', e);
      }
    }
  };

  const syncPortfolioToCloud = async (newPortfolio: PortfolioItem[]) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('site_settings')
          .upsert({
            id: 'current',
            portfolio: newPortfolio,
            updated_at: new Date().toISOString()
          });
      } catch (e) {
        console.warn('Supabase portfolio sync notice:', e);
      }
    }
  };

  const resetSiteConfig = async () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(DEFAULT_SITE_CONFIG));
    } catch {
      // ignore
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('site_settings')
          .upsert({
            id: 'current',
            config: DEFAULT_SITE_CONFIG,
            updated_at: new Date().toISOString()
          });
      } catch {
        // ignore
      }
    }
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'> & { id?: string }): PortfolioItem => {
    const newId = item.id || `proj-${Date.now()}`;
    const slug = item.slug || newId;
    const newItem: PortfolioItem = {
      ...item,
      id: newId,
      slug,
      client: item.client || item.clientName,
      description: item.description || item.overview,
      solution: item.solution || item.strategy,
      isConcept: item.isConcept ?? false,
      badge: item.badge || 'Production Project',
      accent: item.accent || 'from-sky-500 to-indigo-600',
      toolsUsed: item.toolsUsed || ['Figma', 'TypeScript'],
      relatedProjectIds: item.relatedProjectIds || []
    };

    setPortfolioItems(prev => {
      const next = [newItem, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save portfolio items to localStorage', e);
      }
      syncPortfolioToCloud(next);
      return next;
    });
    return newItem;
  };

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    setPortfolioItems(prev => {
      const next = prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...updates,
            client: updates.clientName || updates.client || item.client,
            description: updates.description || updates.overview || item.description,
            solution: updates.solution || updates.strategy || item.solution
          };
        }
        return item;
      });
      try {
        localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save portfolio items to localStorage', e);
      }
      syncPortfolioToCloud(next);
      return next;
    });
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(prev => {
      const next = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save portfolio items to localStorage', e);
      }
      syncPortfolioToCloud(next);
      return next;
    });
  };

  const resetPortfolioItems = () => {
    setPortfolioItems(INITIAL_PORTFOLIO_ITEMS);
    try {
      localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(INITIAL_PORTFOLIO_ITEMS));
    } catch {
      // ignore
    }
    syncPortfolioToCloud(INITIAL_PORTFOLIO_ITEMS);
  };

  const exportConfigJson = (): string => {
    return JSON.stringify({ siteConfig, portfolioItems }, null, 2);
  };

  const importConfigJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.siteConfig) {
        const nextConfig = { ...DEFAULT_SITE_CONFIG, ...data.siteConfig };
        setSiteConfig(nextConfig);
        try {
          localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(nextConfig));
        } catch {
          // ignore
        }
        if (isSupabaseConfigured() && supabase) {
          supabase.from('site_settings').upsert({ id: 'current', config: nextConfig });
        }
      }
      if (Array.isArray(data.portfolioItems)) {
        setPortfolioItems(data.portfolioItems);
        try {
          localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(data.portfolioItems));
        } catch {
          // ignore
        }
        syncPortfolioToCloud(data.portfolioItems);
      }
      return true;
    } catch (e) {
      console.error('Failed to import config JSON', e);
      return false;
    }
  };

  return (
    <SiteConfigContext.Provider
      value={{
        siteConfig,
        portfolioItems,
        isCloudSynced,
        updateSiteConfig,
        resetSiteConfig,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        resetPortfolioItems,
        exportConfigJson,
        importConfigJson
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = (): SiteConfigContextType => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
