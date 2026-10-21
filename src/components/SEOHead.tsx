import { useEffect } from 'react';
import { type PageId, getCanonicalUrl } from '../hooks/usePageRouter';
import { SERVICES_DATA, PORTFOLIO_DATA, FAQ_DATA } from '../data/agencyData';
import { BLOG_ARTICLES } from '../data/blogData';

interface SEOHeadProps {
  page: PageId;
  slug?: string;
}

export function SEOHead({ page, slug }: SEOHeadProps) {
  useEffect(() => {
    // 1. Resolve Page Metadata
    let title = 'Evo Hawks | Creative Production & Digital Marketing Agency';
    let description = 'Explore Evo Hawks for video production, social media management, Meta Ads, SEO, branding, and website development. Discover our services and start your project.';
    let isNoIndex = false;
    let schemaGraph: Record<string, unknown>[] = [];

    const canonicalUrl = getCanonicalUrl(page, slug);

    // Private routes that must never be indexed
    if (page === 'login' || page === 'client-portal' || page === 'admin-portal') {
      isNoIndex = true;
      title = 'Client & Operations Portal | Evo Hawks';
      description = 'Secure client and operations workspace.';
    } else if (page === 'home') {
      title = 'Evo Hawks | Creative Production & Digital Marketing Agency';
      description = 'Explore Evo Hawks for video production, social media management, Meta Ads, SEO, branding, and website development. Discover our services and start your project.';
      
      // FAQ schema for homepage core questions
      schemaGraph.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: FAQ_DATA.slice(0, 5).map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      });
    } else if (page === 'services') {
      title = 'All 12 Digital Disciplines & Services | Evo Hawks Agency';
      description = 'Browse complete service scopes for video production, social media management, Meta ads, SEO, custom web development, and Shopify e-commerce.';
      
      schemaGraph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://evohawks.tech/services' }
        ]
      });
    } else if (page === 'service-detail' && slug) {
      const match = SERVICES_DATA.find(s => s.slug === slug || s.id === slug);
      if (match) {
        title = `${match.title} | Evo Hawks Digital Agency`;
        description = `${match.tagline} Concrete deliverables, pricing parameters, and sprint roadmap from Evo Hawks.`;
        
        schemaGraph.push({
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://evohawks.tech/services' },
            { '@type': 'ListItem', position: 3, name: match.title, item: canonicalUrl }
          ]
        });

        schemaGraph.push({
          '@type': 'Service',
          '@id': `${canonicalUrl}#service`,
          name: match.title,
          serviceType: match.category,
          description: match.description,
          provider: {
            '@type': 'ProfessionalService',
            name: 'Evo Hawks',
            url: 'https://evohawks.tech/'
          },
          areaServed: {
            '@type': 'Country',
            name: 'India'
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            description: match.pricingNote || 'Milestone sprint quotes available on request.'
          }
        });

        if (match.serviceFaqs && match.serviceFaqs.length > 0) {
          schemaGraph.push({
            '@type': 'FAQPage',
            '@id': `${canonicalUrl}#faq`,
            mainEntity: match.serviceFaqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.a
              }
            }))
          });
        }
      }
    } else if (page === 'portfolio' || page === 'work') {
      title = 'Portfolio & Case Studies | Evo Hawks Agency';
      description = 'Explore client deliverables and verified production case studies across web engineering, video production, branding, and paid acquisition.';
      
      schemaGraph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
          { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://evohawks.tech/portfolio' }
        ]
      });
    } else if (page === 'case-study-detail' && slug) {
      const match = PORTFOLIO_DATA.find(p => p.slug === slug || p.id === slug);
      if (match) {
        title = `${match.title} | Case Study | Evo Hawks`;
        description = `${match.overview} Work delivered: ${match.deliverables.slice(0, 3).join(', ')}.`;
        
        schemaGraph.push({
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
            { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://evohawks.tech/portfolio' },
            { '@type': 'ListItem', position: 3, name: match.title, item: canonicalUrl }
          ]
        });

        schemaGraph.push({
          '@type': 'CreativeWork',
          '@id': `${canonicalUrl}#casestudy`,
          headline: match.title,
          creator: {
            '@type': 'Organization',
            name: 'Evo Hawks'
          },
          about: match.industry,
          description: match.overview
        });
      }
    } else if (page === 'blog') {
      title = 'Client Resources & Growth Guides | Evo Hawks';
      description = 'Honest agency advice on social media pricing in India, Meta ads budget planning, product photography, and technical SEO.';
      
      schemaGraph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
          { '@type': 'ListItem', position: 2, name: 'Client Resources', item: 'https://evohawks.tech/blog' }
        ]
      });
    } else if (page === 'blog-detail' && slug) {
      const match = BLOG_ARTICLES.find(a => a.slug === slug);
      if (match) {
        title = `${match.title} | Evo Hawks Guide`;
        description = match.excerpt;
        
        schemaGraph.push({
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
            { '@type': 'ListItem', position: 2, name: 'Client Resources', item: 'https://evohawks.tech/blog' },
            { '@type': 'ListItem', position: 3, name: match.title, item: canonicalUrl }
          ]
        });

        schemaGraph.push({
          '@type': 'BlogPosting',
          '@id': `${canonicalUrl}#article`,
          headline: match.title,
          description: match.excerpt,
          datePublished: match.publishedDate,
          dateModified: match.lastUpdated,
          author: {
            '@type': 'Organization',
            name: match.author.name
          },
          publisher: {
            '@type': 'Organization',
            name: 'Evo Hawks',
            url: 'https://evohawks.tech/',
            logo: {
              '@type': 'ImageObject',
              url: 'https://evohawks.tech/logo.jpg'
            }
          },
          mainEntityOfPage: canonicalUrl
        });

        if (match.faq && match.faq.length > 0) {
          schemaGraph.push({
            '@type': 'FAQPage',
            '@id': `${canonicalUrl}#faq`,
            mainEntity: match.faq.map(f => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer
              }
            }))
          });
        }
      }
    } else if (page === 'packages') {
      title = 'Transparent Packages & Pricing | Evo Hawks';
      description = 'Explore clear, itemized sprint packages for video production, social media, Meta ads, SEO, and web development with zero hidden markups.';
    } else if (page === 'start-project') {
      title = 'Start a Project Intake | Evo Hawks';
      description = 'Submit your project scope, budget, and timeline to receive an itemized proposal and delivery roadmap from Evo Hawks.';
    } else if (page === 'about') {
      title = 'About Evo Hawks | Senior Creative & Engineering Disciplines';
      description = 'Meet the design, engineering, video production, and performance marketing disciplines driving Evo Hawks.';
    } else if (page === 'process') {
      title = '5-Stage Sprint Delivery Process | Evo Hawks';
      description = 'Our transparent 5-stage sprint workflow: Discovery, Scope Approval, Production, Revisions, and Final Launch Handover.';
    } else if (page === 'why-us') {
      title = 'Why Choose Evo Hawks | Architecture, Speed & IP Ownership';
      description = 'Direct senior engineer communication, sub-second web performance, 100% client code ownership, and zero agency fluff.';
    } else if (page === 'faq') {
      title = 'Agency FAQs & Working Policies | Evo Hawks';
      description = 'Clear answers on project scopes, revision limits, ad spend billing, intellectual property ownership, and analytics reporting.';
      
      schemaGraph.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: FAQ_DATA.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      });
    } else if (page === 'contact') {
      title = 'Contact Evo Hawks | Direct Consultation & Inquiries';
      description = 'Connect with our team via email, direct phone, or verified WhatsApp for project inquiries and free scope consultations.';
    } else if (page === 'privacy-policy') {
      title = 'Privacy Policy | Evo Hawks';
      description = 'Transparent privacy practices and zero data harvesting policies from Evo Hawks.';
    } else if (page === 'terms') {
      title = 'Terms of Service | Commercial Agreement | Evo Hawks';
      description = 'Clear commercial terms, 100% IP ownership handover, and revision policies.';
    } else if (page === 'refund-policy') {
      title = 'Cancellation & Refund Policy | Evo Hawks';
      description = 'Fair professional services cancellation terms and pro-rata milestone accounting.';
    }

    // 2. Apply Title
    document.title = title;

    // 3. Apply Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 4. Apply Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 5. Apply Robots Meta Tag (noindex on private routes, index on public)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', isNoIndex ? 'noindex, nofollow' : 'index, follow');

    // 6. Apply Open Graph Tags
    const setOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOgTag('og:title', title);
    setOgTag('og:description', description);
    setOgTag('og:url', canonicalUrl);

    // 7. Apply Twitter Card Tags
    const setTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitterTag('twitter:title', title);
    setTwitterTag('twitter:description', description);
    setTwitterTag('twitter:url', canonicalUrl);

    // 8. Dynamic Structured Data Injection
    let scriptTag = document.getElementById('seo-dynamic-ldjson') as HTMLScriptElement | null;
    if (schemaGraph.length > 0) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'seo-dynamic-ldjson';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': schemaGraph
      });
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [page, slug]);

  return null;
}
