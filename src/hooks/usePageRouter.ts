import { useState, useEffect, useCallback } from 'react';

export type PageId = 
  | 'home' 
  | 'services' 
  | 'service-detail'
  | 'portfolio' 
  | 'work' // Legacy alias for portfolio
  | 'case-study-detail'
  | 'packages'
  | 'start-project'
  | 'why-us' 
  | 'about' 
  | 'process' 
  | 'faq' 
  | 'blog'
  | 'blog-detail'
  | 'contact'
  | 'privacy-policy'
  | 'terms'
  | 'refund-policy'
  | 'login'
  | 'client-portal'
  | 'admin-portal';

export interface RouteState {
  page: PageId;
  slug?: string;
}

/**
 * Normalizes service aliases to canonical data slugs
 */
export function normalizeServiceSlug(slug?: string): string | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase().trim();
  if (s === 'seo' || s === 'seo-content' || s === 'content-marketing') {
    return 'seo-content-marketing';
  }
  if (s === 'web-development' || s === 'web' || s === 'websites') {
    return 'website-development';
  }
  if (s === 'shopify' || s === 'ecommerce') {
    return 'shopify-ecommerce';
  }
  if (s === 'video' || s === 'video-editing') {
    return 'video-production';
  }
  if (s === 'social-media' || s === 'social') {
    return 'social-media-management';
  }
  if (s === 'branding' || s === 'brand-design') {
    return 'branding-design';
  }
  if (s === 'strategy' || s === 'analytics') {
    return 'digital-strategy-analytics';
  }
  return s;
}

/**
 * Returns absolute canonical URL for search engines and head tags
 */
export function getCanonicalUrl(page: PageId, slug?: string): string {
  const base = 'https://evohawks.tech';
  switch (page) {
    case 'home':
      return `${base}/`;
    case 'services':
      return `${base}/services`;
    case 'service-detail':
      return `${base}/services/${normalizeServiceSlug(slug) || ''}`;
    case 'portfolio':
    case 'work':
      return `${base}/portfolio`;
    case 'case-study-detail':
      return `${base}/portfolio/${slug || ''}`;
    case 'packages':
      return `${base}/packages`;
    case 'start-project':
      return `${base}/start-project`;
    case 'why-us':
      return `${base}/why-us`;
    case 'about':
      return `${base}/about`;
    case 'process':
      return `${base}/process`;
    case 'faq':
      return `${base}/faq`;
    case 'blog':
      return `${base}/blog`;
    case 'blog-detail':
      return `${base}/blog/${slug || ''}`;
    case 'contact':
      return `${base}/contact`;
    case 'privacy-policy':
      return `${base}/privacy-policy`;
    case 'terms':
      return `${base}/terms`;
    case 'refund-policy':
      return `${base}/refund-policy`;
    case 'login':
      return `${base}/login`;
    case 'client-portal':
      return `${base}/client-portal`;
    case 'admin-portal':
      return `${base}/admin-portal`;
    default:
      return `${base}/`;
  }
}

/**
 * Parses route state inspecting both window.location.pathname and window.location.hash
 */
export function parseRouteFromLocation(): RouteState {
  if (typeof window === 'undefined') {
    return { page: 'home' };
  }

  // 1. Check hash first for direct hash navigation (#services/meta-ads)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  
  // 2. Check path (/services/meta-ads)
  const pathname = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '').toLowerCase().trim();

  // Prefer hash if explicitly provided by user, otherwise fall back to clean pathname
  const rawTarget = hash || pathname;

  if (!rawTarget) {
    return { page: 'home' };
  }

  const parts = rawTarget.split('/').filter(Boolean);
  const root = parts[0];
  const subSlug = parts[1];

  if (root === 'services') {
    if (subSlug) {
      return { page: 'service-detail', slug: normalizeServiceSlug(subSlug) };
    }
    return { page: 'services' };
  }

  if (root === 'portfolio' || root === 'work') {
    if (subSlug) {
      return { page: 'case-study-detail', slug: subSlug };
    }
    return { page: 'portfolio' };
  }

  if (root === 'blog' || root === 'articles' || root === 'resources') {
    if (subSlug) {
      return { page: 'blog-detail', slug: subSlug };
    }
    return { page: 'blog' };
  }

  if (root === 'packages' || root === 'pricing') {
    return { page: 'packages' };
  }

  if (root === 'start-project' || root === 'startproject' || root === 'get-started') {
    return { page: 'start-project' };
  }

  if (root === 'privacy-policy' || root === 'privacy') {
    return { page: 'privacy-policy' };
  }

  if (root === 'terms' || root === 'terms-of-service') {
    return { page: 'terms' };
  }

  if (root === 'refund-policy' || root === 'cancellation-policy') {
    return { page: 'refund-policy' };
  }

  if (root === 'why-us' || root === 'whyus') {
    return { page: 'why-us' };
  }

  if (root === 'about' || root === 'agency') {
    return { page: 'about' };
  }

  if (root === 'process' || root === 'workflow') {
    return { page: 'process' };
  }

  if (root === 'faq' || root === 'faqs') {
    return { page: 'faq' };
  }

  if (root === 'contact') {
    return { page: 'contact' };
  }

  if (root === 'login') {
    return { page: 'login' };
  }

  if (root === 'client-portal' || root === 'client-dashboard') {
    return { page: 'client-portal' };
  }

  if (root === 'admin-portal' || root === 'admin-dashboard' || root === 'admin') {
    return { page: 'admin-portal' };
  }

  return { page: 'home' };
}

export function usePageRouter() {
  const [route, setRoute] = useState<RouteState>(parseRouteFromLocation);

  const navigateTo = useCallback((page: PageId, slug?: string) => {
    const normalizedSlug = page === 'service-detail' ? normalizeServiceSlug(slug) : slug;
    const resolvedPage = page === 'work' ? 'portfolio' : page;

    let targetPath = `/${resolvedPage}`;
    if (resolvedPage === 'home') {
      targetPath = '/';
    } else if (resolvedPage === 'service-detail' && normalizedSlug) {
      targetPath = `/services/${normalizedSlug}`;
    } else if (resolvedPage === 'case-study-detail' && normalizedSlug) {
      targetPath = `/portfolio/${normalizedSlug}`;
    } else if (resolvedPage === 'blog-detail' && normalizedSlug) {
      targetPath = `/blog/${normalizedSlug}`;
    }

    setRoute({
      page: resolvedPage,
      slug: normalizedSlug
    });

    // Update browser URL state cleanly
    try {
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
      // Also update hash if user was previously using hash-based navigation
      if (window.location.hash) {
        window.location.hash = targetPath.replace(/^\//, '');
      }
    } catch {
      // Fallback to hash navigation
      window.location.hash = targetPath.replace(/^\//, '');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      const newRoute = parseRouteFromLocation();
      setRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  return {
    currentPage: route.page,
    currentSlug: route.slug,
    navigateTo,
    canonicalUrl: getCanonicalUrl(route.page, route.slug)
  };
}
