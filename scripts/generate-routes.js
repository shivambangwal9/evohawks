import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const routes = [
  // Core Agency Hub Pages
  {
    path: 'services',
    title: 'All 12 Digital Disciplines & Services | Evo Hawks Agency',
    description: 'Browse complete service scopes for video production, social media management, Meta ads, SEO, custom web development, and Shopify e-commerce.',
  },
  {
    path: 'portfolio',
    title: 'Portfolio & Client Case Studies | Evo Hawks Agency',
    description: 'Explore verified portfolio case studies across video production, branding, custom website development, Shopify stores, and growth campaigns.',
  },
  {
    path: 'packages',
    title: 'Packages & Transparent Pricing | Evo Hawks Agency',
    description: 'Explore clear, scope-defined packages for website development, video production, social media growth, Meta Ads, and full-funnel digital acceleration.',
  },
  {
    path: 'start-project',
    title: 'Start Your Project & Project Intake | Evo Hawks Agency',
    description: 'Submit your project brief, timeline, goals, and budget to receive a tailored sprint roadmap and guaranteed milestone quote.',
  },
  {
    path: 'about',
    title: 'About Evo Hawks | High-Velocity Creative & Marketing Agency',
    description: 'Learn about our culture, senior-only talent team, and mission to engineer category-defining digital brands from Dehradun, India for global leaders.',
  },
  {
    path: 'process',
    title: 'Our 5-Stage Sprint Delivery Process | Evo Hawks Agency',
    description: 'Discover how Evo Hawks delivers high-velocity creative and engineering sprints with weekly deliverables, dedicated PMs, and zero bureaucracy.',
  },
  {
    path: 'why-us',
    title: 'Why Choose Evo Hawks | Engineering-Grade Growth Partner',
    description: 'Discover what sets Evo Hawks apart: speed of execution, full-stack creative & engineering synergy, transparent fixed-scope pricing, and dedicated client SLAs.',
  },
  {
    path: 'faq',
    title: 'Frequently Asked Questions & SLAs | Evo Hawks Agency',
    description: 'Answers to common client questions regarding our sprint contracts, pricing models, revisions, communication cadences, and IP ownership.',
  },
  {
    path: 'blog',
    title: 'Client Guides, Insights & Resources | Evo Hawks Agency',
    description: 'Actionable guides, cost breakdowns, and strategic blueprints on social media, Meta Ads, SEO, and web development from Evo Hawks agency.',
  },
  {
    path: 'contact',
    title: 'Contact Evo Hawks | Start a High-Velocity Project',
    description: 'Reach our senior strategy team via instant WhatsApp or project inquiry form. We respond within 24 hours with actionable sprint scopes.',
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | Evo Hawks Agency',
    description: 'Read the official privacy policy and data governance practices of Evo Hawks.',
  },
  {
    path: 'terms',
    title: 'Terms of Service | Evo Hawks Agency',
    description: 'Terms of service, milestone payments, SLA guarantees, and IP terms for Evo Hawks client engagements.',
  },
  {
    path: 'refund-policy',
    title: 'Refund & Cancellation Policy | Evo Hawks Agency',
    description: 'Milestone refund, project cancellation, and dispute resolution guidelines for Evo Hawks client partnerships.',
  },
  {
    path: 'login',
    title: 'Client & Operations Portal | Evo Hawks',
    description: 'Secure client and operations workspace.',
  },
  {
    path: 'client-portal',
    title: 'Client Portal | Evo Hawks',
    description: 'Secure client workspace and deliverables dashboard.',
  },
  {
    path: 'admin-portal',
    title: 'Admin Operations Portal | Evo Hawks',
    description: 'Internal operations management portal.',
  },

  // 12 Dedicated Service Pages
  {
    path: 'services/video-production',
    title: 'Creative Video Production & Short-Form Reels | Evo Hawks Digital Agency',
    description: 'High-retention commercial video, studio editing, and short-form reels engineered to capture attention and convert audiences.',
  },
  {
    path: 'services/social-media-management',
    title: 'Social Media Management & Content Engine | Evo Hawks Digital Agency',
    description: 'Full-service social media management, organic growth calendars, and content engineering across Instagram, LinkedIn, and YouTube.',
  },
  {
    path: 'services/meta-ads',
    title: 'Meta Ads & Paid Performance Marketing | Evo Hawks Digital Agency',
    description: 'Data-driven Meta & Google ad campaigns engineered for maximum ROAS, creative scaling, and customer acquisition velocity.',
  },
  {
    path: 'services/influencer-marketing',
    title: 'Influencer Marketing & Creator Outreach | Evo Hawks Digital Agency',
    description: 'End-to-end influencer matchmaking, brief management, contract compliance, and authentic creator campaigns with measurable ROI.',
  },
  {
    path: 'services/seo-content-marketing',
    title: 'SEO & Organic Search Content Marketing | Evo Hawks Digital Agency',
    description: 'Technical SEO audits, high-intent keyword optimization, and authority-building content pipelines that compound organic revenue.',
  },
  {
    path: 'services/website-development',
    title: 'Custom Website Design & Modern Web Engineering | Evo Hawks Digital Agency',
    description: 'High-speed, conversion-focused websites engineered with modern frameworks, micro-interactions, and flawless Core Web Vitals.',
  },
  {
    path: 'services/shopify-ecommerce',
    title: 'Shopify Store Engineering & E-commerce Optimization | Evo Hawks Digital Agency',
    description: 'High-converting Shopify stores, theme customizations, checkout optimizations, and speed tuning built for DTC brand scale.',
  },
  {
    path: 'services/youtube-management',
    title: 'YouTube Channel Production & Growth Management | Evo Hawks Digital Agency',
    description: 'End-to-end YouTube channel strategy, high-CTR thumbnail design, algorithmic packaging, and weekly video production pipelines.',
  },
  {
    path: 'services/branding-design',
    title: 'Strategic Brand Identity & Design Systems | Evo Hawks Digital Agency',
    description: 'Complete brand identities, design systems, visual guidelines, packaging, and digital assets that command industry authority.',
  },
  {
    path: 'services/email-whatsapp-marketing',
    title: 'Email & WhatsApp Lifecycle Automation Systems | Evo Hawks Digital Agency',
    description: 'Automated Klaviyo & WhatsApp retention flows, cart abandonment recovery, and VIP customer engagement funnels.',
  },
  {
    path: 'services/digital-strategy-analytics',
    title: 'Digital Growth Strategy & Analytics Infrastructure | Evo Hawks Digital Agency',
    description: 'Full-funnel attribution, Google Analytics 4 tracking, conversion rate optimization audits, and data-backed scale roadmaps.',
  },
  {
    path: 'services/website-maintenance',
    title: 'Enterprise Website Care, Speed & SLA Maintenance | Evo Hawks Digital Agency',
    description: 'Proactive 24/7 security monitoring, automated backups, speed tuning, and guaranteed turnaround SLAs for critical web infrastructure.',
  },

  // 8 Verified Portfolio Case Studies
  {
    path: 'portfolio/apex-luxe',
    title: 'Apex Luxe Watches Case Study | Evo Hawks Agency',
    description: 'How Evo Hawks engineered a premium luxury e-commerce experience for Apex Luxe with 3.4x ROAS and +140% organic reach.',
  },
  {
    path: 'portfolio/pulsepay-fintech',
    title: 'PulsePay FinTech Case Study | Evo Hawks Agency',
    description: 'Custom React application and brand design system engineering for next-generation B2B cross-border payments.',
  },
  {
    path: 'portfolio/zenith-beverages',
    title: 'Zenith Beverages Case Study | Evo Hawks Agency',
    description: '3D motion production and multi-channel paid Meta campaign delivering 4.8x blended ROAS for artisanal beverage launch.',
  },
  {
    path: 'portfolio/lumina-dental',
    title: 'Lumina Dental Clinic Case Study | Evo Hawks Agency',
    description: 'Local SEO acceleration, patient acquisition funnels, and modern web booking portal delivering +210% inbound consultations.',
  },
  {
    path: 'portfolio/solaris-kinetic',
    title: 'Solaris Kinetic Architecture Case Study | Evo Hawks Agency',
    description: 'Architectural portfolio website with kinetic typography, smooth canvas animations, and global press inquiry integration.',
  },
  {
    path: 'portfolio/aura-atelier',
    title: 'Aura Atelier Couture Case Study | Evo Hawks Agency',
    description: 'High-fashion editorial production, Shopify Plus boutique setup, and influencer seeding for luxury designer label.',
  },
  {
    path: 'portfolio/elysian-botanics',
    title: 'Elysian Botanics Skincare Case Study | Evo Hawks Agency',
    description: 'Sustainable skincare branding, packaging design, and performance TikTok/Instagram creative sprints with 5.2x return.',
  },
  {
    path: 'portfolio/nordic-roastery',
    title: 'Nordic Roastery Coffee Case Study | Evo Hawks Agency',
    description: 'Specialty coffee subscription portal, custom Shopify checkout, and retention email flows achieving 38% repeat customer rate.',
  },

  // Educational Resources & Guides
  {
    path: 'blog/how-much-does-social-media-management-cost-in-india',
    title: 'How Much Does Social Media Management Cost in India? (2026 Guide) | Evo Hawks',
    description: 'Transparent breakdown of agency fees, retainer tiers, deliverables, and ROI benchmarks for social media management in India.',
  },
  {
    path: 'blog/how-to-plan-small-business-meta-ads-budget',
    title: 'How to Plan a Small Business Meta Ads Budget That Actually Converts | Evo Hawks',
    description: 'Step-by-step formula for structuring your Meta advertising budget across testing, scaling, and retargeting tiers.',
  },
  {
    path: 'blog/how-to-prepare-for-product-photography-shoot',
    title: 'How to Prepare for a Brand Product Shoot: Complete Client Checklist | Evo Hawks',
    description: 'Ensure flawless commercial photography and video production with this production preparation checklist and shot list guide.',
  },
  {
    path: 'blog/shopify-vs-custom-website-development',
    title: 'Shopify vs Custom Web Development: Which Should Your Business Choose? | Evo Hawks',
    description: 'In-depth comparison of Shopify vs custom web development covering total cost of ownership, scalability, and conversion speed.',
  },
  {
    path: 'blog/what-to-expect-from-an-seo-engagement',
    title: 'What to Actually Expect from a 6-Month SEO Engagement | Evo Hawks',
    description: 'Realistic timelines, technical milestones, link-building cadences, and organic search KPIs for businesses investing in SEO.',
  },
  {
    path: 'blog/how-to-evaluate-a-digital-marketing-agency',
    title: 'How to Evaluate and Hire a High-Performing Digital Marketing Agency | Evo Hawks',
    description: '10 critical questions, red flags to avoid, and SLA requirements to verify before signing a digital marketing agency retainer.',
  }
];

function generateRoutes() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Ensure 404.html exists
  fs.writeFileSync(path.join(distDir, '404.html'), baseHtml);
  console.log('✓ Generated dist/404.html');

  // Ensure .nojekyll exists
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '# Disable Jekyll for GitHub Pages\n');
  console.log('✓ Generated dist/.nojekyll');

  let generatedCount = 0;

  for (const route of routes) {
    const canonicalUrl = `https://evohawks.tech/${route.path}`;
    const safeTitle = escapeHtml(route.title);
    const safeDesc = escapeHtml(route.description);

    let html = baseHtml;

    // Update <title>
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);

    // Update <meta name="title" ...>
    html = html.replace(/<meta\s+name=["']title["']\s+content=["'][^"']*["']/i, `<meta name="title" content="${safeTitle}"`);

    // Update <meta name="description" ...>
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']/i, `<meta name="description" content="${safeDesc}"`);

    // Update Open Graph
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']/i, `<meta property="og:title" content="${safeTitle}"`);
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']/i, `<meta property="og:description" content="${safeDesc}"`);
    html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']/i, `<meta property="og:url" content="${canonicalUrl}"`);

    // Update Twitter Cards
    html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']/i, `<meta name="twitter:title" content="${safeTitle}"`);
    html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']/i, `<meta name="twitter:description" content="${safeDesc}"`);
    html = html.replace(/<meta\s+name=["']twitter:url["']\s+content=["'][^"']*["']/i, `<meta name="twitter:url" content="${canonicalUrl}"`);

    // Update Canonical Link
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']/i, `<link rel="canonical" href="${canonicalUrl}"`);

    // Update noscript section for non-JS search crawlers and screen readers
    const noscriptContent = `    <!-- Non-JavaScript Crawlability & Accessibility Fallback for Search Engines and Screen Readers -->
    <noscript>
      <header style="padding: 24px; background: #050508; color: #ffffff; text-align: center; border-bottom: 1px solid #1E293B;">
        <h1>${safeTitle}</h1>
        <p>${safeDesc}</p>
        <nav aria-label="Noscript Directory" style="margin-top: 16px;">
          <a href="/" style="color: #0099FF; margin: 0 10px;">Home</a>
          <a href="/services" style="color: #0099FF; margin: 0 10px;">Services Catalogue</a>
          <a href="/portfolio" style="color: #0099FF; margin: 0 10px;">Portfolio Case Studies</a>
          <a href="/packages" style="color: #0099FF; margin: 0 10px;">Packages &amp; Pricing</a>
          <a href="/about" style="color: #0099FF; margin: 0 10px;">About Us</a>
          <a href="/process" style="color: #0099FF; margin: 0 10px;">Our Process</a>
          <a href="/blog" style="color: #0099FF; margin: 0 10px;">Client Resources &amp; Guides</a>
          <a href="/contact" style="color: #0099FF; margin: 0 10px;">Contact Team</a>
        </nav>
      </header>
    </noscript>`;

    html = html.replace(/<!-- Non-JavaScript Crawlability[\s\S]*?<\/noscript>/i, noscriptContent);

    // 1. Write directory index: dist/${route.path}/index.html (handles /route/ requests)
    const targetDir = path.join(distDir, route.path);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html);

    // 2. Write direct html file: dist/${route.path}.html (handles /route requests without trailing slash)
    const targetFilePath = path.join(distDir, `${route.path}.html`);
    const parentDir = path.dirname(targetFilePath);
    fs.mkdirSync(parentDir, { recursive: true });
    fs.writeFileSync(targetFilePath, html);

    generatedCount++;
  }

  console.log(`✓ Successfully generated ${generatedCount} static routes (both .html and /index.html).`);
}

generateRoutes();
