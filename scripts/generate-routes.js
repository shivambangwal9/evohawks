import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const COMMON_HEADER = `
  <header style="background: #08090C; border-bottom: 1px solid #111318; padding: 18px 24px; position: sticky; top: 0; z-index: 50;">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
      <a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #F5F7FA; font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 20px;">
        <span style="color: #007BA7;">EVO</span> <span style="color: #FF2E78;">HAWKS</span>
      </a>
      <nav aria-label="Primary Navigation" style="display: flex; align-items: center; gap: 18px; flex-wrap: wrap; font-size: 13px; font-weight: 600;">
        <a href="/" style="color: #F5F7FA; text-decoration: none;">Home</a>
        <a href="/services" style="color: #A5ADB8; text-decoration: none;">Services</a>
        <a href="/portfolio" style="color: #A5ADB8; text-decoration: none;">Portfolio</a>
        <a href="/packages" style="color: #A5ADB8; text-decoration: none;">Packages</a>
        <a href="/about" style="color: #A5ADB8; text-decoration: none;">About</a>
        <a href="/process" style="color: #A5ADB8; text-decoration: none;">Process</a>
        <a href="/blog" style="color: #A5ADB8; text-decoration: none;">Guides</a>
        <a href="/contact" style="color: #A5ADB8; text-decoration: none;">Contact</a>
      </nav>
      <div style="display: flex; align-items: center; gap: 12px;">
        <a href="/start-project" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #ffffff; padding: 10px 20px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-decoration: none;">Start a Project &rarr;</a>
      </div>
    </div>
  </header>
`;

const COMMON_FOOTER = `
  <footer style="background: #08090C; border-top: 1px solid #111318; padding: 50px 24px 30px; color: #A5ADB8; font-size: 13px;">
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; margin-bottom: 40px;">
      <div>
        <div style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 20px; color: #F5F7FA; margin-bottom: 12px;">
          <span style="color: #007BA7;">EVO</span> <span style="color: #FF2E78;">HAWKS</span>
        </div>
        <p style="line-height: 1.6; margin-bottom: 16px;">
          Creative production and digital marketing agency based in Dehradun, Uttarakhand, India, serving global leaders. We engineer high-velocity websites, produce cinematic vertical video, manage social media, and execute high-ROAS Meta Ads.
        </p>
        <p style="margin: 0; color: #F5F7FA;"><strong>Location:</strong> Dehradun, Uttarakhand 248001, India</p>
        <p style="margin: 4px 0 0; color: #F5F7FA;"><strong>Email:</strong> <a href="mailto:teamevohawks@gmail.com" style="color: #007BA7; text-decoration: none;">teamevohawks@gmail.com</a></p>
        <p style="margin: 4px 0 0; color: #A5ADB8;"><strong>Hours:</strong> Mon – Sat: 09:30 AM – 06:30 PM IST</p>
      </div>
      <div>
        <h4 style="color: #F5F7FA; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">Core Capabilities</h4>
        <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
          <li><a href="/services/website-development" style="color: #A5ADB8; text-decoration: none;">Website Design &amp; Development</a></li>
          <li><a href="/services/shopify-ecommerce" style="color: #A5ADB8; text-decoration: none;">Shopify &amp; E-commerce Engineering</a></li>
          <li><a href="/services/video-production" style="color: #A5ADB8; text-decoration: none;">Video Production &amp; Short-Form Reels</a></li>
          <li><a href="/services/meta-ads" style="color: #A5ADB8; text-decoration: none;">Meta Ads &amp; Paid Advertising</a></li>
          <li><a href="/services/social-media-management" style="color: #A5ADB8; text-decoration: none;">Social Media Content Engine</a></li>
          <li><a href="/services/seo-content-marketing" style="color: #A5ADB8; text-decoration: none;">Technical SEO &amp; Organic Search</a></li>
        </ul>
      </div>
      <div>
        <h4 style="color: #F5F7FA; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">Agency Sprints</h4>
        <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
          <li><a href="/packages" style="color: #A5ADB8; text-decoration: none;">Packages &amp; Transparent Pricing</a></li>
          <li><a href="/process" style="color: #A5ADB8; text-decoration: none;">Our 5-Stage Delivery Process</a></li>
          <li><a href="/portfolio" style="color: #A5ADB8; text-decoration: none;">Portfolio &amp; Case Studies</a></li>
          <li><a href="/why-us" style="color: #A5ADB8; text-decoration: none;">Why Choose Evo Hawks</a></li>
          <li><a href="/about" style="color: #A5ADB8; text-decoration: none;">About Our Culture &amp; Team</a></li>
          <li><a href="/faq" style="color: #A5ADB8; text-decoration: none;">Frequently Asked Questions</a></li>
        </ul>
      </div>
      <div>
        <h4 style="color: #F5F7FA; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">Guides &amp; Governance</h4>
        <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
          <li><a href="/blog" style="color: #A5ADB8; text-decoration: none;">Client Guides &amp; Insights</a></li>
          <li><a href="/contact" style="color: #A5ADB8; text-decoration: none;">Project Inquiry &amp; Briefing</a></li>
          <li><a href="/privacy-policy" style="color: #A5ADB8; text-decoration: none;">Privacy Policy</a></li>
          <li><a href="/terms" style="color: #A5ADB8; text-decoration: none;">Terms of Service</a></li>
          <li><a href="/refund-policy" style="color: #A5ADB8; text-decoration: none;">Refund &amp; Cancellation Policy</a></li>
        </ul>
      </div>
    </div>
    <div style="max-width: 1200px; margin: 0 auto; border-top: 1px solid #111318; padding-top: 20px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 12px;">
      <div>&copy; 2026 Evo Hawks. All rights reserved. 100% Client Asset Ownership.</div>
      <div>Dehradun, Uttarakhand, India &bull; Serving Global Partners</div>
    </div>
  </footer>
`;

const SERVICES = [
  {
    slug: 'video-production',
    alias: 'video-editing',
    title: 'Creative Video Production & Short-Form Reels',
    tagline: 'High-retention commercial video, studio editing, and short-form reels engineered to capture attention and convert audiences within the critical first 3 seconds.',
    deliverables: ['Master export in 4K / 1080p tailored for vertical (9:16) and widescreen (16:9)', 'High-energy hook variations for creative ad testing', 'Color-graded footage with licensed sound effects and audio', 'Burned-in animated kinetic captions and subtitle files (.srt)'],
    problems: ['Low audience retention on organic and paid video content', 'Inconsistent visual pacing, weak sound design, and flat color grading', 'High production costs with minimal focus on audience conversion'],
    pricing: 'Starting from ₹15,000 for short-form video sprint batches. Custom commercial quotes available on request.'
  },
  {
    slug: 'social-media-management',
    alias: 'social-media',
    title: 'Social Media Management & Content Engine',
    tagline: 'Full-service social media management, organic growth calendars, and content engineering across Instagram, LinkedIn, and YouTube.',
    deliverables: ['Custom monthly content calendar with 12 to 24 curated posts & reels', 'High-contrast carousel graphics and story engagement sequences', 'Hashtag research, caption copywriting, and community management', 'Monthly analytics report tracking reach, follower growth, and profile visits'],
    problems: ['Inconsistent posting schedules that erode organic algorithm reach', 'Content that looks generic and fails to spark genuine comments or saves', 'Lack of a clear distinction between organic community nurturing and paid ads'],
    pricing: 'Monthly retainers starting from ₹18,000 / month based on posting volume and asset production.'
  },
  {
    slug: 'meta-ads',
    alias: 'paid-ads',
    title: 'Meta Ads & Paid Performance Marketing',
    tagline: 'Data-driven Meta & Google ad campaigns engineered for maximum ROAS, creative scaling, and customer acquisition velocity.',
    deliverables: ['Full campaign architecture (Top-of-Funnel prospecting, Middle-of-Funnel nurturing, Retargeting)', 'High-converting ad creatives (video hooks, static cards, carousel variations)', 'Meta Pixel and Conversions API (CAPI) server-side tracking setup', 'Weekly ad spend monitoring, bid adjustments, and transparent performance reports'],
    problems: ['High cost-per-acquisition (CPA) and declining return on ad spend (ROAS)', 'Ad fatigue from running identical creatives without structured testing', 'Inaccurate conversion tracking and attribution loss after privacy updates'],
    pricing: 'Campaign management starting from ₹20,000 / month. Ad budgets are funded directly by client to ad platforms.'
  },
  {
    slug: 'influencer-marketing',
    alias: 'influencer',
    title: 'Influencer Marketing & Creator Outreach',
    tagline: 'End-to-end influencer matchmaking, brief management, contract compliance, and authentic creator campaigns with measurable ROI.',
    deliverables: ['Curated roster of vetted nano-, micro-, and macro-creators aligned with your brand', 'Standardized creative brief and brand compliance guidelines', 'End-to-end contract negotiation, product gifting logistics, and usage rights', 'Performance audit tracking impressions, link clicks, promo code redemptions, and ROI'],
    problems: ['Wasting budget on creators with fake or unengaged followers', 'Unclear deliverables leading to delayed or low-quality promotional posts', 'Lack of commercial usage rights preventing brands from whitelisting top content'],
    pricing: 'Sprint fee starting from ₹22,000 per campaign batch plus creator fees.'
  },
  {
    slug: 'seo-content-marketing',
    alias: 'seo',
    title: 'SEO & Organic Search Content Marketing',
    tagline: 'Technical SEO audits, high-intent keyword optimization, and authority-building content pipelines that compound organic revenue.',
    deliverables: ['Comprehensive technical SEO audit (crawl errors, indexability, speed, schema markup)', 'High-intent commercial keyword mapping and content gap analysis', '4 to 8 long-form, authoritative articles per month tailored for search intent', 'On-page optimization: titles, meta descriptions, semantic headings, and internal linking', 'Monthly Google Search Console organic impressions, clicks, and rankings report'],
    problems: ['Website ranks for zero high-intent search queries that drive actual sales', 'Technical errors, slow load times, and poor Core Web Vitals dragging down search rank', 'Publishing generic articles that fail to index or build domain topical authority'],
    pricing: 'Monthly organic search retainers starting from ₹22,000 / month with dedicated developer hours.'
  },
  {
    slug: 'website-development',
    alias: 'web-development',
    title: 'Custom Website Design & Modern Web Engineering',
    tagline: 'High-speed, conversion-focused websites engineered with modern frameworks, micro-interactions, and flawless Core Web Vitals.',
    deliverables: ['Custom responsive design tailored for mobile, tablet, and widescreen desktop', 'Engineered with clean modern frameworks (React 19, TypeScript, Tailwind CSS)', 'Sub-second page load times with 95+ Core Web Vitals performance score', 'Integrated contact inquiry forms with email notifications and WhatsApp routing', 'Full on-page SEO metadata, Open Graph cards, sitemap.xml, and schema markup'],
    problems: ['Slow, outdated websites that lose visitors within 3 seconds of loading', 'Clunky mobile experiences that make inquiring or purchasing frustrating', 'Vendor lock-in with proprietary CMS platforms that charge expensive monthly fees'],
    pricing: 'Landing page sprints from ₹25,000; full multi-page business websites from ₹45,000.'
  },
  {
    slug: 'shopify-ecommerce',
    alias: 'shopify',
    title: 'Shopify Store Engineering & E-commerce Optimization',
    tagline: 'High-converting Shopify stores, theme customizations, checkout optimizations, and speed tuning built for DTC brand scale.',
    deliverables: ['Custom Shopify store setup or complete visual theme redesign', 'Optimized mobile navigation, product filtering, and fast product card previews', 'High-converting product page layout with trust badges, FAQs, and reviews', 'One-click checkout and cart drawer upsell configurations', 'Speed optimization maintaining sub-2-second loads on mobile connections'],
    problems: ['High cart abandonment rates on standard out-of-the-box Shopify themes', 'Cluttered apps slowing down page loading and inflating monthly Shopify bills', 'Weak visual branding making the store look like a drop-shipping site'],
    pricing: 'Shopify setups starting from ₹35,000 based on catalog size and integrations.'
  },
  {
    slug: 'youtube-management',
    alias: 'youtube',
    title: 'YouTube Channel Production & Growth Management',
    tagline: 'End-to-end YouTube channel strategy, high-CTR thumbnail design, algorithmic packaging, and weekly video production pipelines.',
    deliverables: ['Channel visual branding: banner, profile, intro/outro cards, and playlists', 'Weekly long-form video editing with high-retention pacing and motion graphics', 'High-CTR thumbnail design and A/B test packaging variations', 'Search-optimized titles, descriptions, chapters, and relevant video tags', 'Shorts repurposing: cutting long-form videos into 3-5 vertical short clips'],
    problems: ['Spending days creating videos only to receive under 100 views', 'Low click-through rates caused by dull, non-curated thumbnails and titles', 'Burnout from attempting to research, record, edit, and optimize videos solo'],
    pricing: 'Monthly production retainers starting from ₹25,000 / month for 4 long-form videos + 8 shorts.'
  },
  {
    slug: 'branding-design',
    alias: 'branding',
    title: 'Strategic Brand Identity & Design Systems',
    tagline: 'Complete brand identities, design systems, visual guidelines, packaging, and digital assets that command industry authority.',
    deliverables: ['Master vector logo files (SVG, EPS, AI, PDF) in color, monochrome, and dark mode', 'Complete Brand Guidelines PDF with typography pairings and hex codes', 'Exported high-res PNG/JPG creatives for digital and print formats', 'Editable design templates in Figma or Adobe Illustrator'],
    problems: ['Inconsistent fonts, colors, and styling creating an amateur brand perception', 'Low visual authority making it difficult to charge premium prices', 'Lack of standardized brand guidelines slowing down internal marketing'],
    pricing: 'Brand identity packages from ₹15,000 for essentials; custom scope for full systems.'
  },
  {
    slug: 'email-whatsapp-marketing',
    alias: 'lifecycle-marketing',
    title: 'Email & WhatsApp Lifecycle Automation Systems',
    tagline: 'Automated Klaviyo & WhatsApp retention flows, cart abandonment recovery, and VIP customer engagement funnels.',
    deliverables: ['Automated email flows: Welcome series, Abandoned Cart, Post-Purchase, Re-engagement', 'WhatsApp Business API setup with automated greeting and inquiry routing', 'High-converting responsive email newsletter templates', 'Customer segmentation by purchase history, engagement level, and lifecycle stage'],
    problems: ['Relying 100% on expensive paid ads with zero automated customer retention', 'Losing 70%+ of abandoned checkout carts without automated recovery sequences', 'Generic blast emails that get marked as spam and have low open rates'],
    pricing: 'Flow automation setup from ₹18,000; monthly lifecycle retainers from ₹20,000 / month.'
  },
  {
    slug: 'digital-strategy-analytics',
    alias: 'analytics',
    title: 'Digital Growth Strategy & Analytics Infrastructure',
    tagline: 'Full-funnel attribution, Google Analytics 4 tracking, conversion rate optimization audits, and data-backed scale roadmaps.',
    deliverables: ['Complete Google Analytics 4 (GA4) and Google Tag Manager (GTM) audit & setup', 'Custom event tracking: form submissions, button clicks, video plays, purchases', 'Interactive Looker Studio KPI dashboard tracking blended CAC, ROAS, and conversions', 'Comprehensive Conversion Rate Optimization (CRO) UX audit with actionable fixes'],
    problems: ['Making marketing budget decisions based on guesswork rather than clean data', 'GA4 and ad pixel numbers that do not match actual revenue in your bank account', 'High website traffic that fails to convert into qualified customer inquiries'],
    pricing: 'Analytics setup and attribution sprints starting from ₹15,000.'
  },
  {
    slug: 'website-maintenance',
    alias: 'care-plans',
    title: 'Enterprise Website Care, Speed & SLA Maintenance',
    tagline: 'Proactive 24/7 security monitoring, automated backups, speed tuning, and guaranteed turnaround SLAs for critical web infrastructure.',
    deliverables: ['24/7 uptime monitoring with immediate incident response alerting', 'Automated off-site cloud backups stored securely on AWS / Cloudflare', 'Framework, dependency, security patch, and plugin updates tested on staging', 'Dedicated developer hours each month for content updates, banners, and enhancements'],
    problems: ['Websites crashing without notice and losing leads for hours or days', 'Outdated plugins and security vulnerabilities leaving sites open to malware', 'Having no developer available when an urgent website update or bug arises'],
    pricing: 'Maintenance retainers from ₹8,000 / month based on site complexity and developer hours.'
  }
];

const CASE_STUDIES = [
  {
    slug: 'apex-luxe',
    title: 'Apex Luxe Fashion: Luxury Editorial E-Commerce Benchmark',
    category: 'Web & E-commerce',
    industry: 'Luxury Fashion & Apparel',
    overview: 'A luxury lifestyle concept benchmark showcasing sub-second page transitions, dynamic cursor interactions, and editorial typography engineered for high-ticket apparel brands.',
    challenge: 'Most luxury fashion storefronts suffer from heavy 10MB+ video loops, slow mobile render times, and clunky navigation that drives away affluent mobile buyers.',
    solution: 'Implemented lightweight CSS hardware-accelerated transforms, modern WebP asset compression, and headless React component trees for instant client-side routing.',
    deliverables: ['High-contrast editorial lookbook design', 'Responsive navigation with touch-friendly drawer', 'Accessible product gallery with swipe controls and zoom', 'Performance benchmark report scoring 98+ on Google Lighthouse'],
    metrics: 'Sub-second page rendering benchmark with 98+ mobile speed score on Google Lighthouse.'
  },
  {
    slug: 'pulsepay-fintech',
    title: 'PulsePay Global: B2B FinTech Interactive Platform Benchmark',
    category: 'Web & E-commerce',
    industry: 'Financial Technology',
    overview: 'A clean, high-trust landing page architecture for a cross-border payments platform, featuring real-time rate comparison and enterprise compliance signals.',
    challenge: 'Fintech visitors demand instant proof of security, clear pricing calculations, and zero visual friction before initiating corporate onboarding.',
    solution: 'Built a high-trust aesthetic with slate typography, subtle border beams, interactive client-side rate sliders, and enterprise lead capture validation.',
    deliverables: ['Dynamic currency exchange calculation engine', 'Security compliance credential badges layout', 'Multi-step corporate onboarding lead qualification form', 'Accessible slider component with keyboard navigation'],
    metrics: 'Interactive client-side rate calculator with zero input latency and 100% accessible keyboard navigation.'
  },
  {
    slug: 'zenith-beverages',
    title: 'Zenith Beverage Co.: High-Retention Vertical Video Production',
    category: 'Creative Production',
    industry: 'D2C Functional Beverage',
    overview: 'High-energy vertical video cuts and motion graphics produced for social feeds, engineered to seize viewer attention within the critical first 3 seconds.',
    challenge: 'Short-form video feeds on TikTok and Instagram Reels suffer from 80%+ drop-off rates if the visual hook fails to intrigue viewers immediately.',
    solution: 'Structured the opening 3 seconds with high-tempo kinetic typography, punchy foley sound effects, and hyper-saturated color grading to stand out on mobile screens.',
    deliverables: ['4 vertical video cuts formatted for Instagram Reels and TikTok (9:16)', 'Layered sound design with sub-bass drops and can-crack foley effects', 'Animated kinetic subtitles with highlighted key benefits', 'End-card call to action promoting limited edition launch'],
    metrics: 'Engineered 4 hook variations for creative testing with high-retention audio-visual synchronization.'
  },
  {
    slug: 'lumina-dental',
    title: 'Lumina Dental Clinic: Local Patient Acquisition & Web Portal',
    category: 'Web & E-commerce',
    industry: 'Healthcare & Wellness',
    overview: 'Modern appointment booking portal and local SEO infrastructure engineered for a multi-specialty aesthetic dental practice.',
    challenge: 'Prospective dental patients felt overwhelmed by confusing clinical terminology, lack of transparent treatment pricing, and complicated phone-only booking systems.',
    solution: 'Designed a soothing, high-trust medical portal featuring transparent treatment cards, doctor credentials, and an interactive 3-step online consultation booking form.',
    deliverables: ['Responsive medical appointment booking application', 'Local schema markup (Dentist, PostalAddress, OpeningHours)', 'Service breakdown pages with patient preparation FAQs', 'WhatsApp direct appointment confirmation gateway'],
    metrics: 'Frictionless 3-step appointment booking architecture with local structured data validation.'
  },
  {
    slug: 'solaris-kinetic',
    title: 'Solaris Kinetic Architecture: Architectural Design Portfolio',
    category: 'Web & E-commerce',
    industry: 'Architecture & Design',
    overview: 'Architectural portfolio website with kinetic typography, smooth canvas animations, and global press inquiry integration.',
    challenge: 'Traditional architectural websites use heavy PDF lookbooks that fail to display projects gracefully on smartphones and high-resolution Retina displays.',
    solution: 'Engineered an interactive masonry project viewer with canvas lighting effects and fast image preloading.',
    deliverables: ['Interactive architectural masonry project viewer', 'Project case-study template with blueprints, photography, and materials spec', 'Press kit download section with high-res editorial photography', 'Bilingual project categorization (Commercial, Residential, Cultural)'],
    metrics: 'Fluid 60fps canvas animation rendering with responsive Retina image optimization.'
  },
  {
    slug: 'aura-atelier',
    title: 'Aura Atelier Couture: High-Fashion Boutique & Influencer Seeding',
    category: 'Branding & Production',
    industry: 'Haute Couture Fashion',
    overview: 'High-fashion editorial production, boutique storefront setup, and creator styling for an independent couture designer label.',
    challenge: 'Bespoke couture requires conveying fabric texture, handcrafted embroidery, and silhouette movement through digital screens.',
    solution: 'Produced 4K slow-motion detail video reels highlighting silk textures, accompanied by minimalist typography and private VIP appointment booking.',
    deliverables: ['4K slow-motion fabric detail reels for Instagram and website hero', 'Minimalist luxury lookbook design system in Figma', 'Private VIP appointment booking system for bridal consultations', 'Creator styling and outreach guidelines'],
    metrics: 'Luxury visual hierarchy showcasing handcrafted embroidery with high-resolution video clips.'
  },
  {
    slug: 'elysian-botanics',
    title: 'Elysian Botanics Skincare: Organic Branding & Packaging',
    category: 'Branding & Packaging',
    industry: 'Organic Skincare & Beauty',
    overview: 'Sustainable skincare branding, packaging design, and performance TikTok/Instagram creative sprints.',
    challenge: 'Standing out in a saturated organic skincare market dominated by generic minimalist amber-bottle aesthetics.',
    solution: 'Developed a bold, botanical visual identity featuring custom illustrated flora, eco-certified packaging specs, and vibrant social ad creatives.',
    deliverables: ['Master brand identity, primary and secondary logos, and typography guidelines', 'Sustainable cosmetic packaging labels and box die-lines', '12 direct-response social advertising creative templates', 'E-commerce product card and unboxing experience guidelines'],
    metrics: 'Distinctive botanical packaging design system engineered for shelf and digital ad impact.'
  },
  {
    slug: 'nordic-roastery',
    title: 'Nordic Roastery Coffee: Specialty Subscription Portal',
    category: 'Web & E-commerce',
    industry: 'Specialty Beverage & D2C',
    overview: 'Specialty coffee subscription portal, custom checkout, and retention email flows built for artisanal roasters.',
    challenge: 'Subscription churn was high due to rigid delivery dates, lack of grind-size customization, and confusing customer portal management.',
    solution: 'Engineered an intuitive subscription builder where customers choose their roast profile, grind size, and delivery frequency with 1-click skip or pause.',
    deliverables: ['Custom coffee subscription configuration builder', 'Customer account portal for 1-click delivery pausing and roast swapping', 'Automated Klaviyo email flows (Brewing guides, Re-order reminders)', 'High-speed headless product catalog with flavor-profile visual tags'],
    metrics: 'Flexible subscription builder allowing instant grind selection and seamless recurring deliveries.'
  }
];

const GUIDES = [
  {
    slug: 'how-much-does-social-media-management-cost-in-india',
    title: 'How Much Does Social Media Management Cost in India? (2026 Transparent Guide)',
    category: 'Social & Content',
    readTime: '7 min read',
    excerpt: 'An honest, itemized breakdown of social media management pricing across India in 2026—from solo freelancers to boutique creative agencies.',
    h2s: [
      'The Current Landscape of Social Media Pricing in India',
      'Freelancer vs In-House vs Boutique Agency: Cost Comparison',
      'What Drives the Cost: Real Deliverables vs Superficial Vanity Posts',
      'Transparent Monthly Retainer Tiers (₹15,000 to ₹1,20,000+)',
      'Questions to Ask Before Signing a Social Media Agency Retainer'
    ]
  },
  {
    slug: 'how-to-plan-small-business-meta-ads-budget',
    title: 'How to Plan a Small Business Meta Ads Budget That Actually Converts',
    category: 'Paid Performance',
    readTime: '8 min read',
    excerpt: 'Step-by-step formula for structuring your Meta advertising budget across testing, scaling, and retargeting tiers.',
    h2s: [
      'Why Most Small Business Meta Budgets Fail Within 30 Days',
      'The 70-20-10 Budget Allocation Framework (Testing vs Scaling vs Retargeting)',
      'Calculating Your Target Cost-Per-Acquisition (CPA)',
      'How Long Should an Ad Run Before You Pause or Scale?',
      'Essential Tracking Infrastructure Before Spending a Single Rupee'
    ]
  },
  {
    slug: 'how-to-prepare-for-product-photography-shoot',
    title: 'How to Prepare for a Brand Product Shoot: Complete Client Checklist',
    category: 'Creative Production',
    readTime: '6 min read',
    excerpt: 'Ensure flawless commercial photography and video production with this production preparation checklist and shot list guide.',
    h2s: [
      'Why Pre-Production Dictates 80% of Shoot Success',
      'The Complete Pre-Shoot Product Checklist',
      'Crafting an Actionable Shot List (Angles, Lighting, Props)',
      'Physical Shoot Requirements: Permits, Moodboards & Talent Briefing',
      'Post-Production Alignment: Revision Passes and Delivery Formats'
    ]
  },
  {
    slug: 'shopify-vs-custom-website-development',
    title: 'Shopify vs Custom Web Development: Which Should Your Business Choose?',
    category: 'Web & E-commerce',
    readTime: '9 min read',
    excerpt: 'In-depth comparison of Shopify vs custom web development covering total cost of ownership, scalability, and conversion speed.',
    h2s: [
      'Understanding the Architectural Differences',
      'When Shopify is the Clear Winner for D2C Brands',
      'When Custom Web Engineering (React / Next.js) Beats Off-the-Shelf Templates',
      'Total Cost of Ownership Breakdown Over 24 Months',
      'Decision Matrix: Matching Platform Architecture to Business Stage'
    ]
  },
  {
    slug: 'what-to-expect-from-an-seo-engagement',
    title: 'What to Actually Expect from a 6-Month SEO Engagement',
    category: 'Growth & Search',
    readTime: '7 min read',
    excerpt: 'Realistic timelines, technical milestones, link-building cadences, and organic search KPIs for businesses investing in SEO.',
    h2s: [
      'Why SEO is a Compounding Capital Asset, Not a Quick Fix',
      'Month 1-2: Technical Foundation & Crawlability Audits',
      'Month 3-4: Intent-Driven Content Architecture & Internal Linking',
      'Month 5-6: Commercial Keyword Domination & Conversion Optimization',
      'How to Measure Genuine SEO ROI vs Vanity Keyword Rankings'
    ]
  },
  {
    slug: 'how-to-evaluate-a-digital-marketing-agency',
    title: 'How to Evaluate and Hire a High-Performing Digital Marketing Agency',
    category: 'Strategy & Agency',
    readTime: '8 min read',
    excerpt: '10 critical questions, red flags to avoid, and SLA requirements to verify before signing a digital marketing agency retainer.',
    h2s: [
      'The State of the Agency Industry: Boutique Craft vs Bloated Retainers',
      '10 Hard Questions to Ask Agency Founders Before Signing',
      'Red Flags: Guaranteed Rankings, Opaque Markups & Locked IP',
      'Understanding Scope Boundaries and Fair Revision Limits',
      'Why Transparent Asset Ownership Matters for Long-Term Valuation'
    ]
  }
];

function generatePageHtml(baseHtml, config) {
  const { path: routePath, title, description, bodyContent, schema } = config;
  const canonicalUrl = `https://evohawks.tech${routePath ? `/${routePath}` : ''}`;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);

  let html = baseHtml;

  // 1. Update Title & Meta
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  html = html.replace(/<meta\s+name=["']title["']\s+content=["'][^"']*["']/i, `<meta name="title" content="${safeTitle}"`);
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']/i, `<meta name="description" content="${safeDesc}"`);

  // 2. Remove spammy meta-keywords if present
  html = html.replace(/<meta\s+name=["']keywords["']\s+content=["'][^"']*["']\s*\/?>\s*/gi, '');

  // 3. Open Graph
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']/i, `<meta property="og:title" content="${safeTitle}"`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']/i, `<meta property="og:description" content="${safeDesc}"`);
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']/i, `<meta property="og:url" content="${canonicalUrl}"`);

  // 4. Twitter
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']/i, `<meta name="twitter:title" content="${safeTitle}"`);
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']/i, `<meta name="twitter:description" content="${safeDesc}"`);
  html = html.replace(/<meta\s+name=["']twitter:url["']\s+content=["'][^"']*["']/i, `<meta name="twitter:url" content="${canonicalUrl}"`);

  // 5. Canonical
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']/i, `<link rel="canonical" href="${canonicalUrl}"`);

  // 6. Inject Schema if provided
  if (schema) {
    const schemaScript = `\n    <!-- Page Specific Structured Data (JSON-LD) -->\n    <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>\n`;
    html = html.replace('</head>', `${schemaScript}</head>`);
  }

  // 7. Inject Full Pre-rendered Semantic HTML directly into <div id="root">
  const preRenderedRoot = `<div id="root">
    ${COMMON_HEADER}
    <main style="min-height: 70vh; padding: 40px 24px; max-width: 1200px; margin: 0 auto; color: #F5F7FA; font-family: 'Plus Jakarta Sans', sans-serif;">
      ${bodyContent}
    </main>
    ${COMMON_FOOTER}
  </div>`;

  html = html.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, preRenderedRoot);

  return html;
}

// ----------------- CONTENT BUILDERS -----------------

function buildHomeContent() {
  return `
    <article>
      <header style="text-align: center; margin-bottom: 60px; padding: 40px 0;">
        <div style="display: inline-block; padding: 6px 16px; border-radius: 9999px; background: #111318; border: 1px solid #007BA7; color: #2094BF; font-size: 12px; font-weight: 700; margin-bottom: 20px; text-transform: uppercase;">
          Creative Production &bull; Digital Marketing &bull; Web Engineering
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 48px; font-weight: 900; line-height: 1.15; margin: 0 0 20px; color: #F5F7FA;">
          Evo Hawks | Creative Production &amp; Digital Marketing Agency
        </h1>
        <p style="font-size: 18px; color: #A5ADB8; max-width: 800px; margin: 0 auto 30px; line-height: 1.6;">
          Full-service creative production and digital marketing agency based in Dehradun, Uttarakhand, India, serving global partners. We engineer sub-second websites, produce cinematic vertical video, manage social media, run high-ROAS Meta Ads, and compound organic search rankings.
        </p>
        <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
          <a href="/start-project" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 14px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none;">Start a Project &rarr;</a>
          <a href="/portfolio" style="background: #111318; border: 1px solid #333; color: #F5F7FA; padding: 14px 28px; border-radius: 9999px; font-weight: 600; text-decoration: none;">Explore Our Work</a>
        </div>
      </header>

      <section style="margin-bottom: 70px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; color: #F5F7FA; margin-bottom: 24px; text-align: center;">
          Unified Digital Growth Engine: Web, Video &amp; Performance Ads
        </h2>
        <p style="color: #A5ADB8; line-height: 1.8; margin-bottom: 30px; max-width: 900px; margin-left: auto; margin-right: auto; text-align: center;">
          Most businesses suffer from fragmented vendor silos: a web freelancer builds a slow site, a video editor creates content that fails to convert, and an ad agency burns budget without landing page alignment. Evo Hawks unites engineering, visual storytelling, and paid distribution into one accountable, high-velocity growth squad.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          ${SERVICES.slice(0, 6).map(s => `
            <div style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 24px;">
              <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #F5F7FA; margin: 0 0 10px;">
                <a href="/services/${s.slug}" style="color: #F5F7FA; text-decoration: none;">${s.title} &rarr;</a>
              </h3>
              <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">${s.tagline}</p>
              <div style="font-size: 13px; color: #007BA7; font-weight: 600;">${s.pricing}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="margin-bottom: 70px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; color: #F5F7FA; margin-bottom: 24px; text-align: center;">
          Featured Client Case Studies &amp; Capability Benchmarks
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          ${CASE_STUDIES.slice(0, 4).map(c => `
            <div style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 24px;">
              <span style="font-size: 11px; color: #FF2E78; text-transform: uppercase; font-weight: 700;">${c.industry}</span>
              <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #F5F7FA; margin: 8px 0 12px;">
                <a href="/portfolio/${c.slug}" style="color: #F5F7FA; text-decoration: none;">${c.title}</a>
              </h3>
              <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">${c.overview}</p>
              <div style="font-size: 13px; color: #2094BF; font-weight: 600;">Benchmark: ${c.metrics}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="margin-bottom: 70px; background: #111318; padding: 40px; border-radius: 24px; border: 1px solid #222;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 30px; font-weight: 800; color: #F5F7FA; margin-bottom: 20px; text-align: center;">
          The 5-Stage Agile Sprint Workflow
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px;">
          <div style="border-left: 2px solid #007BA7; padding-left: 16px;">
            <div style="font-weight: 800; color: #007BA7; font-size: 14px;">STAGE 01</div>
            <h3 style="font-size: 16px; margin: 4px 0 8px; color: #F5F7FA;">Discovery &amp; Audit</h3>
            <p style="font-size: 13px; color: #A5ADB8; line-height: 1.5;">Technical site review, market analysis, and scope lock.</p>
          </div>
          <div style="border-left: 2px solid #007BA7; padding-left: 16px;">
            <div style="font-weight: 800; color: #007BA7; font-size: 14px;">STAGE 02</div>
            <h3 style="font-size: 16px; margin: 4px 0 8px; color: #F5F7FA;">Sprint Architecture</h3>
            <p style="font-size: 13px; color: #A5ADB8; line-height: 1.5;">Wireframes, hook storyboards, and ad funnels.</p>
          </div>
          <div style="border-left: 2px solid #007BA7; padding-left: 16px;">
            <div style="font-weight: 800; color: #007BA7; font-size: 14px;">STAGE 03</div>
            <h3 style="font-size: 16px; margin: 4px 0 8px; color: #F5F7FA;">High-Tempo Production</h3>
            <p style="font-size: 13px; color: #A5ADB8; line-height: 1.5;">Clean code builds, 4K video edits, and ad asset creation.</p>
          </div>
          <div style="border-left: 2px solid #FF2E78; padding-left: 16px;">
            <div style="font-weight: 800; color: #FF2E78; font-size: 14px;">STAGE 04</div>
            <h3 style="font-size: 16px; margin: 4px 0 8px; color: #F5F7FA;">Staged Review</h3>
            <p style="font-size: 13px; color: #A5ADB8; line-height: 1.5;">Collaborative revision passes with client sign-off.</p>
          </div>
          <div style="border-left: 2px solid #FF2E78; padding-left: 16px;">
            <div style="font-weight: 800; color: #FF2E78; font-size: 14px;">STAGE 05</div>
            <h3 style="font-size: 16px; margin: 4px 0 8px; color: #F5F7FA;">Launch &amp; Handover</h3>
            <p style="font-size: 13px; color: #A5ADB8; line-height: 1.5;">Live deployment, 100% IP ownership, and zero lock-in.</p>
          </div>
        </div>
      </section>

      <section style="margin-bottom: 70px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; color: #F5F7FA; margin-bottom: 24px; text-align: center;">
          Frequently Asked Questions About Partnering With Evo Hawks
        </h2>
        <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
          <div style="background: #111318; border: 1px solid #222; border-radius: 16px; padding: 20px;">
            <h3 style="font-size: 17px; font-weight: 700; color: #F5F7FA; margin: 0 0 8px;">How do your sprint contracts work?</h3>
            <p style="font-size: 14px; color: #A5ADB8; line-height: 1.6; margin: 0;">We operate on milestone-based sprint contracts. Every engagement starts with a defined scope, clear deliverables, and scheduled sign-offs (typically 50% mobilization deposit and 50% upon final milestone approval).</p>
          </div>
          <div style="background: #111318; border: 1px solid #222; border-radius: 16px; padding: 20px;">
            <h3 style="font-size: 17px; font-weight: 700; color: #F5F7FA; margin: 0 0 8px;">Are ad budgets included in your agency fees?</h3>
            <p style="font-size: 14px; color: #A5ADB8; line-height: 1.6; margin: 0;">No. Advertising spend on platforms like Meta Ads and Google Ads is billed directly by those platforms to your company card. Our agency fees cover creative production, campaign architecture, A/B testing, and weekly optimization.</p>
          </div>
          <div style="background: #111318; border: 1px solid #222; border-radius: 16px; padding: 20px;">
            <h3 style="font-size: 17px; font-weight: 700; color: #F5F7FA; margin: 0 0 8px;">Do I own all code and creative assets?</h3>
            <p style="font-size: 14px; color: #A5ADB8; line-height: 1.6; margin: 0;">Yes, 100%. We provide full asset handover upon final milestone payment. You retain full intellectual property ownership of every line of code, design file, raw video export, and ad account asset.</p>
          </div>
        </div>
      </section>

      <section style="text-align: center; background: #111318; padding: 50px 30px; border-radius: 24px; border: 1px solid #222;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; color: #F5F7FA; margin-bottom: 16px;">
          Start Your High-Velocity Project
        </h2>
        <p style="font-size: 16px; color: #A5ADB8; max-width: 600px; margin: 0 auto 30px; line-height: 1.6;">
          Ready to elevate your digital presence? Send us your project brief or contact our Dehradun production desk directly at <a href="mailto:teamevohawks@gmail.com" style="color: #007BA7;">teamevohawks@gmail.com</a>.
        </p>
        <a href="/contact" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 14px 32px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">Contact Our Team &rarr;</a>
      </section>
    </article>
  `;
}

function buildServicesHubContent() {
  return `
    <article>
      <header style="text-align: center; margin-bottom: 50px; padding: 30px 0;">
        <div style="display: inline-block; padding: 6px 16px; border-radius: 9999px; background: #111318; border: 1px solid #007BA7; color: #2094BF; font-size: 12px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">
          Full-Stack Capabilities &bull; 12 Specialized Disciplines
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 42px; font-weight: 900; margin: 0 0 16px; color: #F5F7FA;">
          All 12 Digital Disciplines &amp; Services | Evo Hawks Agency
        </h1>
        <p style="font-size: 17px; color: #A5ADB8; max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Browse complete service scopes for video production, social media management, Meta Ads, technical SEO, custom web engineering, and Shopify e-commerce. Each discipline features concrete deliverables and transparent pricing parameters.
        </p>
      </header>

      <section style="margin-bottom: 60px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #F5F7FA; margin-bottom: 24px;">
          Complete Agency Service Catalogue
        </h2>
        <div style="display: flex; flex-direction: column; gap: 32px;">
          ${SERVICES.map((s, idx) => `
            <div style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 30px;" id="${s.slug}">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
                <span style="font-size: 12px; color: #007BA7; font-weight: 800; font-family: monospace;">DISCIPLINE 0${idx + 1}</span>
                <span style="font-size: 12px; color: #FF2E78; font-weight: 700;">${s.pricing}</span>
              </div>
              <h3 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 700; color: #F5F7FA; margin: 0 0 10px;">
                <a href="/services/${s.slug}" style="color: #F5F7FA; text-decoration: none;">${s.title} &rarr;</a>
              </h3>
              <p style="color: #A5ADB8; font-size: 15px; line-height: 1.6; margin-bottom: 18px;">${s.tagline}</p>
              
              <div style="margin-bottom: 16px;">
                <strong style="color: #F5F7FA; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Concrete Deliverables:</strong>
                <ul style="color: #A5ADB8; font-size: 14px; line-height: 1.8; margin: 8px 0 0; padding-left: 20px;">
                  ${s.deliverables.map(d => `<li>${d}</li>`).join('')}
                </ul>
              </div>

              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px;">
                <a href="/services/${s.slug}" style="background: #007BA7; color: #fff; padding: 8px 18px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-decoration: none;">View Dedicated Service Scope &rarr;</a>
                <a href="/start-project" style="background: #181B22; border: 1px solid #333; color: #F5F7FA; padding: 8px 18px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-decoration: none;">Request Sprint Quote</a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 36px; text-align: center;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; color: #F5F7FA; margin-bottom: 14px;">
          Need a Multi-Discipline Growth Package?
        </h2>
        <p style="color: #A5ADB8; max-width: 650px; margin: 0 auto 24px; font-size: 15px; line-height: 1.6;">
          We build integrated combinations synchronizing website engineering, cinematic vertical video, and Meta advertising for compounding impact.
        </p>
        <a href="/packages" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 12px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">Explore Package Pricing &rarr;</a>
      </section>
    </article>
  `;
}

function buildServiceDetailContent(service) {
  return `
    <article>
      <nav aria-label="Breadcrumb" style="font-size: 12px; color: #A5ADB8; margin-bottom: 24px;">
        <a href="/" style="color: #A5ADB8; text-decoration: none;">Home</a> &gt; 
        <a href="/services" style="color: #A5ADB8; text-decoration: none;">Services</a> &gt; 
        <span style="color: #F5F7FA;">${service.title}</span>
      </nav>

      <header style="margin-bottom: 40px;">
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 38px; font-weight: 900; line-height: 1.2; color: #F5F7FA; margin: 0 0 16px;">
          ${service.title}
        </h1>
        <p style="font-size: 18px; color: #A5ADB8; line-height: 1.6; max-width: 800px; margin: 0 0 24px;">
          ${service.tagline}
        </p>
        <div style="background: #111318; border-left: 3px solid #007BA7; padding: 16px 20px; border-radius: 0 12px 12px 0; font-size: 14px; color: #F5F7FA;">
          <strong>Pricing Parameter:</strong> ${service.pricing}
        </div>
      </header>

      <section style="margin-bottom: 40px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; color: #F5F7FA; margin-bottom: 16px;">
          Problems This Discipline Solves
        </h2>
        <ul style="color: #A5ADB8; line-height: 1.8; font-size: 15px; padding-left: 20px;">
          ${service.problems.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </section>

      <section style="margin-bottom: 40px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; color: #F5F7FA; margin-bottom: 16px;">
          Concrete Deliverables &amp; Outputs
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${service.deliverables.map(d => `
            <div style="background: #111318; border: 1px solid #222; border-radius: 12px; padding: 18px; color: #F5F7FA; font-size: 14px; line-height: 1.5;">
              <span style="color: #007BA7; font-weight: bold; margin-right: 6px;">&bull;</span> ${d}
            </div>
          `).join('')}
        </div>
      </section>

      <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 32px; text-align: center; margin-top: 40px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">
          Start Your ${service.title} Sprint
        </h2>
        <p style="color: #A5ADB8; max-width: 600px; margin: 0 auto 20px; font-size: 14px; line-height: 1.6;">
          Partner with our specialized team to get guaranteed milestones and clean asset handover.
        </p>
        <a href="/start-project" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 12px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">Request Sprint Scope &rarr;</a>
      </section>
    </article>
  `;
}

function buildPackagesContent() {
  return `
    <article>
      <header style="text-align: center; margin-bottom: 50px; padding: 30px 0;">
        <div style="display: inline-block; padding: 6px 16px; border-radius: 9999px; background: #111318; border: 1px solid #007BA7; color: #2094BF; font-size: 12px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">
          Fixed-Scope Milestones &bull; Transparent Investment
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 42px; font-weight: 900; margin: 0 0 16px; color: #F5F7FA;">
          Packages &amp; Transparent Pricing | Evo Hawks Agency
        </h1>
        <p style="font-size: 17px; color: #A5ADB8; max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Explore clear, scope-defined packages for website development, video production, social media growth, Meta Ads, and full-funnel digital acceleration.
        </p>
      </header>

      <section style="margin-bottom: 60px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #F5F7FA; margin-bottom: 24px;">
          Scope-Defined Sprint Packages
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          <div style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 28px;">
            <span style="font-size: 11px; color: #007BA7; text-transform: uppercase; font-weight: 800;">One-Time Milestone</span>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; color: #F5F7FA; margin: 6px 0 10px;">Landing Page Sprint</h3>
            <p style="color: #A5ADB8; font-size: 14px; margin-bottom: 16px;">High-converting responsive landing page engineered for lead generation, campaigns, and conversions.</p>
            <div style="font-size: 24px; font-weight: 900; color: #F5F7FA; margin-bottom: 16px;">Starting at ₹25,000</div>
            <ul style="color: #A5ADB8; font-size: 13px; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
              <li>Custom responsive design in React 19 / TypeScript</li>
              <li>Lead form validation with email and WhatsApp routing</li>
              <li>Core Web Vitals 95+ score guarantee</li>
              <li>2 structured revision passes during staging</li>
            </ul>
            <a href="/start-project" style="display: block; text-align: center; background: #007BA7; color: #fff; padding: 10px; border-radius: 9999px; font-weight: 700; text-decoration: none;">Inquire Landing Sprint &rarr;</a>
          </div>

          <div style="background: #111318; border: 1px solid #FF2E78; border-radius: 20px; padding: 28px;">
            <span style="font-size: 11px; color: #FF2E78; text-transform: uppercase; font-weight: 800;">Popular Creative Sprint</span>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; color: #F5F7FA; margin: 6px 0 10px;">Short-Form Video Batch</h3>
            <p style="color: #A5ADB8; font-size: 14px; margin-bottom: 16px;">8 high-retention 9:16 vertical reels edited with sound design, kinetic captions, and hook variations.</p>
            <div style="font-size: 24px; font-weight: 900; color: #F5F7FA; margin-bottom: 16px;">Starting at ₹15,000</div>
            <ul style="color: #A5ADB8; font-size: 13px; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
              <li>8 edited vertical reels from client footage or shoot</li>
              <li>Licensed sound design, foley, and background audio</li>
              <li>Kinetic animated subtitles with highlighted keywords</li>
              <li>2 rounds of timing and pacing revisions</li>
            </ul>
            <a href="/start-project" style="display: block; text-align: center; background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 10px; border-radius: 9999px; font-weight: 700; text-decoration: none;">Inquire Video Batch &rarr;</a>
          </div>

          <div style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 28px;">
            <span style="font-size: 11px; color: #007BA7; text-transform: uppercase; font-weight: 800;">Monthly Retainer</span>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; color: #F5F7FA; margin: 6px 0 10px;">Meta Ads Management</h3>
            <p style="color: #A5ADB8; font-size: 14px; margin-bottom: 16px;">Full-funnel campaign architecture, weekly creative variations, and attribution reporting.</p>
            <div style="font-size: 24px; font-weight: 900; color: #F5F7FA; margin-bottom: 16px;">₹20,000 / month</div>
            <ul style="color: #A5ADB8; font-size: 13px; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
              <li>Prospecting, retargeting, and testing campaign setup</li>
              <li>Ad creative design (video hooks &amp; static graphics)</li>
              <li>Meta Pixel and Conversions API server-side setup</li>
              <li>Weekly optimization and transparent ROAS reporting</li>
            </ul>
            <a href="/start-project" style="display: block; text-align: center; background: #007BA7; color: #fff; padding: 10px; border-radius: 9999px; font-weight: 700; text-decoration: none;">Inquire Ads Retainer &rarr;</a>
          </div>
        </div>
      </section>

      <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 32px; margin-bottom: 40px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">
          Scope Boundaries &amp; Advertising Budget Separation
        </h2>
        <p style="color: #A5ADB8; font-size: 14px; line-height: 1.7; margin-bottom: 14px;">
          At Evo Hawks, we believe in complete financial transparency:
        </p>
        <ul style="color: #A5ADB8; font-size: 14px; line-height: 1.8; padding-left: 20px;">
          <li><strong>Agency Fees vs Advertising Spend:</strong> Ad spend budgets on Meta Ads and Google Ads are paid directly to the ad platforms by the client and are strictly separate from agency production fees.</li>
          <li><strong>Structured Revisions:</strong> Standard sprint packages include 2 structured revision passes to ensure quality without open-ended project drift.</li>
          <li><strong>Infrastructure Costs:</strong> Domain registrations, specialized hosting, and third-party software subscriptions are client responsibilities.</li>
        </ul>
      </section>
    </article>
  `;
}

function buildPortfolioHubContent() {
  return `
    <article>
      <header style="text-align: center; margin-bottom: 50px; padding: 30px 0;">
        <div style="display: inline-block; padding: 6px 16px; border-radius: 9999px; background: #111318; border: 1px solid #007BA7; color: #2094BF; font-size: 12px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">
          Capability Benchmarks &bull; Concept Projects &bull; Production Standards
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 42px; font-weight: 900; margin: 0 0 16px; color: #F5F7FA;">
          Portfolio &amp; Client Case Studies | Evo Hawks Agency
        </h1>
        <p style="font-size: 17px; color: #A5ADB8; max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Explore verified portfolio case studies and capability benchmarks across video production, branding, custom website development, Shopify stores, and growth campaigns.
        </p>
      </header>

      <section style="margin-bottom: 60px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #F5F7FA; margin-bottom: 24px;">
          Featured Projects &amp; Architectural Benchmarks
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          ${CASE_STUDIES.map(c => `
            <div style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 26px;">
              <span style="font-size: 11px; color: #FF2E78; text-transform: uppercase; font-weight: 800;">${c.category} &bull; ${c.industry}</span>
              <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800; color: #F5F7FA; margin: 8px 0 12px;">
                <a href="/portfolio/${c.slug}" style="color: #F5F7FA; text-decoration: none;">${c.title} &rarr;</a>
              </h3>
              <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">${c.overview}</p>
              <div style="font-size: 13px; color: #007BA7; font-weight: 600; margin-bottom: 16px;">
                <strong>Key Result:</strong> ${c.metrics}
              </div>
              <a href="/portfolio/${c.slug}" style="color: #2094BF; font-size: 13px; font-weight: 700; text-decoration: none;">View Detailed Case Study &rarr;</a>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 32px; text-align: center;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">
          Have a Project with Similar Requirements?
        </h2>
        <p style="color: #A5ADB8; max-width: 600px; margin: 0 auto 20px; font-size: 14px; line-height: 1.6;">
          Let us engineer a custom scope with transparent milestones, deliverables, and clean code handover.
        </p>
        <a href="/start-project" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 12px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">Start Your Project Intake &rarr;</a>
      </section>
    </article>
  `;
}

function buildCaseStudyDetailContent(study) {
  return `
    <article>
      <nav aria-label="Breadcrumb" style="font-size: 12px; color: #A5ADB8; margin-bottom: 24px;">
        <a href="/" style="color: #A5ADB8; text-decoration: none;">Home</a> &gt; 
        <a href="/portfolio" style="color: #A5ADB8; text-decoration: none;">Portfolio</a> &gt; 
        <span style="color: #F5F7FA;">${study.title}</span>
      </nav>

      <header style="margin-bottom: 40px;">
        <span style="font-size: 12px; color: #007BA7; font-weight: 800; text-transform: uppercase;">${study.industry} &bull; ${study.category}</span>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 36px; font-weight: 900; line-height: 1.2; color: #F5F7FA; margin: 10px 0 16px;">
          ${study.title}
        </h1>
        <p style="font-size: 18px; color: #A5ADB8; line-height: 1.6; max-width: 800px; margin: 0 0 20px;">
          ${study.overview}
        </p>
        <div style="background: #111318; border-left: 3px solid #FF2E78; padding: 16px 20px; border-radius: 0 12px 12px 0; font-size: 14px; color: #F5F7FA;">
          <strong>Verified Benchmark:</strong> ${study.metrics}
        </div>
      </header>

      <section style="margin-bottom: 36px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">
          The Project Challenge
        </h2>
        <p style="color: #A5ADB8; font-size: 15px; line-height: 1.7; margin: 0;">
          ${study.challenge}
        </p>
      </section>

      <section style="margin-bottom: 36px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">
          Our Strategic Solution
        </h2>
        <p style="color: #A5ADB8; font-size: 15px; line-height: 1.7; margin: 0;">
          ${study.solution}
        </p>
      </section>

      <section style="margin-bottom: 40px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 16px;">
          Work Delivered &amp; Assets Produced
        </h2>
        <ul style="color: #A5ADB8; line-height: 1.8; font-size: 15px; padding-left: 20px;">
          ${study.deliverables.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </section>

      <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 32px; text-align: center;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">
          Ready to Build Something Similar?
        </h2>
        <a href="/start-project" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 12px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">Start Your Project Intake &rarr;</a>
      </section>
    </article>
  `;
}

function buildAboutContent() {
  return `
    <article>
      <header style="text-align: center; margin-bottom: 50px; padding: 30px 0;">
        <div style="display: inline-block; padding: 6px 16px; border-radius: 9999px; background: #111318; border: 1px solid #007BA7; color: #2094BF; font-size: 12px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">
          Our Mission &bull; Senior Talent &bull; Dehradun to Global
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 42px; font-weight: 900; margin: 0 0 16px; color: #F5F7FA;">
          About Evo Hawks | High-Velocity Creative &amp; Marketing Agency
        </h1>
        <p style="font-size: 17px; color: #A5ADB8; max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Learn about our culture, senior talent team, and mission to engineer category-defining digital brands from Dehradun, Uttarakhand, India for modern partners worldwide.
        </p>
      </header>

      <section style="margin-bottom: 50px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #F5F7FA; margin-bottom: 16px;">
          Building Digital Velocity from Dehradun for Modern Brands
        </h2>
        <p style="color: #A5ADB8; font-size: 15px; line-height: 1.8; margin-bottom: 18px;">
          Evo Hawks was established in Dehradun with a straightforward purpose: high-growth brands were drowning in sluggish, opaque agency models with disconnected handoffs. Traditional firms split projects among junior interns, freelance contractors, and account managers who don&apos;t write code or edit footage.
        </p>
        <p style="color: #A5ADB8; font-size: 15px; line-height: 1.8;">
          We restructured the model into a unified squad of senior specialists: web developers who understand conversion psychology, video directors who understand short-form algorithmic retention, and paid media buyers who optimize landing pages.
        </p>
      </section>

      <section style="margin-bottom: 50px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #F5F7FA; margin-bottom: 24px;">
          The Hawk Flight Philosophy: See Higher, Move Faster, Grow Further
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div style="background: #111318; border: 1px solid #222; border-radius: 16px; padding: 24px;">
            <div style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #007BA7; margin-bottom: 8px;">SEE HIGHER</div>
            <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin: 0;">Bird&apos;s-eye strategic vision. We analyze market gaps, competitor landscapes, and consumer intent before designing a single screen or shooting a single frame.</p>
          </div>
          <div style="background: #111318; border: 1px solid #222; border-radius: 16px; padding: 24px;">
            <div style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #FF2E78; margin-bottom: 8px;">MOVE FASTER</div>
            <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin: 0;">Rapid agile delivery without compromising quality. Fast website loading, high-tempo content sprints, and agile campaign iterations.</p>
          </div>
          <div style="background: #111318; border: 1px solid #222; border-radius: 16px; padding: 24px;">
            <div style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #2094BF; margin-bottom: 8px;">GROW FURTHER</div>
            <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin: 0;">Sustainable digital equity. We build compounding SEO rank, scalable paid funnels, and engaged brand communities that last.</p>
          </div>
        </div>
      </section>

      <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 32px; text-align: center;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">
          Join Forces With Our Production Team
        </h2>
        <p style="color: #A5ADB8; max-width: 600px; margin: 0 auto 20px; font-size: 15px; line-height: 1.6;">
          Based in Dehradun, Uttarakhand, India, working with partners across India, the UAE, UK, and worldwide.
        </p>
        <a href="/contact" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 12px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">Contact Our Studio &rarr;</a>
      </section>
    </article>
  `;
}

function buildProcessContent() {
  return `
    <article>
      <header style="text-align: center; margin-bottom: 50px; padding: 30px 0;">
        <div style="display: inline-block; padding: 6px 16px; border-radius: 9999px; background: #111318; border: 1px solid #007BA7; color: #2094BF; font-size: 12px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">
          5-Stage Sprint Cadence &bull; Predictable Milestones
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 42px; font-weight: 900; margin: 0 0 16px; color: #F5F7FA;">
          Our 5-Stage Sprint Delivery Process | Evo Hawks Agency
        </h1>
        <p style="font-size: 17px; color: #A5ADB8; max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Discover how Evo Hawks delivers high-velocity creative and engineering sprints with weekly deliverables, dedicated PMs, and zero bureaucracy.
        </p>
      </header>

      <section style="margin-bottom: 50px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #F5F7FA; margin-bottom: 24px;">
          The 5 Sequential Stages of Project Execution
        </h2>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="background: #111318; border: 1px solid #222; border-radius: 16px; padding: 24px;">
            <div style="font-size: 12px; color: #007BA7; font-weight: 800;">STAGE 01 &bull; 2-4 DAYS</div>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #F5F7FA; margin: 6px 0 10px;">Discovery, Technical Audit &amp; Scope Lock</h3>
            <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin: 0;">We audit existing digital assets, review competitor benchmarks, lock technical requirements, and define exact deliverables in a clear milestone contract.</p>
          </div>
          <div style="background: #111318; border: 1px solid #222; border-radius: 16px; padding: 24px;">
            <div style="font-size: 12px; color: #007BA7; font-weight: 800;">STAGE 02 &bull; 3-5 DAYS</div>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #F5F7FA; margin: 6px 0 10px;">Blueprint, Architecture &amp; Wireframing</h3>
            <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin: 0;">We produce interactive wireframes, component design systems, video hook storyboards, or campaign funnel architectures before coding or shooting.</p>
          </div>
          <div style="background: #111318; border: 1px solid #222; border-radius: 16px; padding: 24px;">
            <div style="font-size: 12px; color: #007BA7; font-weight: 800;">STAGE 03 &bull; 5-14 DAYS</div>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #F5F7FA; margin: 6px 0 10px;">High-Velocity Production Sprint</h3>
            <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin: 0;">Engineering clean React/TypeScript code, filming or editing 4K video reels, configuring Meta ad funnels, and building technical schema graphs.</p>
          </div>
          <div style="background: #111318; border: 1px solid #FF2E78; border-radius: 16px; padding: 24px;">
            <div style="font-size: 12px; color: #FF2E78; font-weight: 800;">STAGE 04 &bull; 3-5 DAYS</div>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #F5F7FA; margin: 6px 0 10px;">Collaborative Staging Review &amp; Revision Passes</h3>
            <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin: 0;">You preview the live staging URL or video cut drafts. We execute 2 structured revision passes to fine-tune copy, pacing, and styling.</p>
          </div>
          <div style="background: #111318; border: 1px solid #FF2E78; border-radius: 16px; padding: 24px;">
            <div style="font-size: 12px; color: #FF2E78; font-weight: 800;">STAGE 05 &bull; 1-2 DAYS</div>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #F5F7FA; margin: 6px 0 10px;">Production Deployment &amp; 100% IP Handover</h3>
            <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin: 0;">Final DNS switch, speed verification on Google PageSpeed Insights, live ad activation, and complete handover of all source code and master files.</p>
          </div>
        </div>
      </section>

      <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 32px; text-align: center;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">
          Initiate Stage 01 Discovery Call
        </h2>
        <a href="/start-project" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 12px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">Lock Your Sprint Scope &rarr;</a>
      </section>
    </article>
  `;
}

function buildBlogHubContent() {
  return `
    <article>
      <header style="text-align: center; margin-bottom: 50px; padding: 30px 0;">
        <div style="display: inline-block; padding: 6px 16px; border-radius: 9999px; background: #111318; border: 1px solid #007BA7; color: #2094BF; font-size: 12px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">
          Tactical Blueprints &bull; Honest Pricing Data &bull; Client Checklists
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 42px; font-weight: 900; margin: 0 0 16px; color: #F5F7FA;">
          Client Guides, Insights &amp; Resources | Evo Hawks Agency
        </h1>
        <p style="font-size: 17px; color: #A5ADB8; max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Actionable guides, cost breakdowns, and strategic blueprints on social media, Meta Ads, SEO, and web development from Evo Hawks agency.
        </p>
      </header>

      <section style="margin-bottom: 60px;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #F5F7FA; margin-bottom: 24px;">
          Published Guides &amp; Strategic Blueprints
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          ${GUIDES.map(g => `
            <div style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 26px;">
              <span style="font-size: 11px; color: #007BA7; text-transform: uppercase; font-weight: 800;">${g.category} &bull; ${g.readTime}</span>
              <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800; color: #F5F7FA; margin: 8px 0 12px;">
                <a href="/blog/${g.slug}" style="color: #F5F7FA; text-decoration: none;">${g.title} &rarr;</a>
              </h3>
              <p style="color: #A5ADB8; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">${g.excerpt}</p>
              <a href="/blog/${g.slug}" style="color: #2094BF; font-size: 13px; font-weight: 700; text-decoration: none;">Read Full Blueprint &rarr;</a>
            </div>
          `).join('')}
        </div>
      </section>
    </article>
  `;
}

function buildBlogDetailContent(guide) {
  return `
    <article>
      <nav aria-label="Breadcrumb" style="font-size: 12px; color: #A5ADB8; margin-bottom: 24px;">
        <a href="/" style="color: #A5ADB8; text-decoration: none;">Home</a> &gt; 
        <a href="/blog" style="color: #A5ADB8; text-decoration: none;">Guides</a> &gt; 
        <span style="color: #F5F7FA;">${guide.title}</span>
      </nav>

      <header style="margin-bottom: 40px;">
        <span style="font-size: 12px; color: #007BA7; font-weight: 800; text-transform: uppercase;">${guide.category} &bull; ${guide.readTime}</span>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 36px; font-weight: 900; line-height: 1.25; color: #F5F7FA; margin: 10px 0 16px;">
          ${guide.title}
        </h1>
        <p style="font-size: 18px; color: #A5ADB8; line-height: 1.6; margin: 0;">
          ${guide.excerpt}
        </p>
      </header>

      <section style="margin-bottom: 40px;">
        ${guide.h2s.map(h => `
          <div style="margin-bottom: 30px;">
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">${h}</h2>
            <p style="color: #A5ADB8; font-size: 15px; line-height: 1.8;">
              Comprehensive tactical recommendations, industry benchmarks, and implementation strategies developed by the Evo Hawks engineering and growth team.
            </p>
          </div>
        `).join('')}
      </section>

      <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 32px; text-align: center;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 12px;">
          Need Hands-on Execution?
        </h2>
        <a href="/contact" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 12px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">Speak With Our Senior Strategy Desk &rarr;</a>
      </section>
    </article>
  `;
}

function buildContactContent() {
  return `
    <article>
      <header style="text-align: center; margin-bottom: 50px; padding: 30px 0;">
        <div style="display: inline-block; padding: 6px 16px; border-radius: 9999px; background: #111318; border: 1px solid #007BA7; color: #2094BF; font-size: 12px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">
          Sprint Intake &bull; 24-Hour SLA Response
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 42px; font-weight: 900; margin: 0 0 16px; color: #F5F7FA;">
          Contact Evo Hawks | Start a High-Velocity Project
        </h1>
        <p style="font-size: 17px; color: #A5ADB8; max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Reach our senior strategy team via instant WhatsApp or project inquiry form. We respond within 24 hours with actionable sprint scopes.
        </p>
      </header>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 36px; margin-bottom: 50px;">
        <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 32px;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 16px;">
            Direct Studio Channels
          </h2>
          <p style="color: #A5ADB8; font-size: 14px; line-height: 1.7; margin-bottom: 24px;">
            Prefer direct communication? Reach our project managers directly:
          </p>
          <div style="margin-bottom: 16px;">
            <div style="font-size: 12px; text-transform: uppercase; color: #007BA7; font-weight: 700;">Direct Project Email</div>
            <div style="font-size: 16px; color: #F5F7FA; font-weight: 600; margin-top: 4px;">
              <a href="mailto:teamevohawks@gmail.com" style="color: #F5F7FA; text-decoration: none;">teamevohawks@gmail.com</a>
            </div>
          </div>
          <div style="margin-bottom: 16px;">
            <div style="font-size: 12px; text-transform: uppercase; color: #007BA7; font-weight: 700;">Studio Address</div>
            <div style="font-size: 15px; color: #F5F7FA; margin-top: 4px;">
              Dehradun, Uttarakhand 248001, India (Serving Global Clients)
            </div>
          </div>
          <div>
            <div style="font-size: 12px; text-transform: uppercase; color: #007BA7; font-weight: 700;">Operating Hours</div>
            <div style="font-size: 15px; color: #F5F7FA; margin-top: 4px;">
              Monday – Saturday: 09:30 AM – 06:30 PM IST
            </div>
          </div>
        </section>

        <section style="background: #111318; border: 1px solid #222; border-radius: 20px; padding: 32px;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #F5F7FA; margin-bottom: 16px;">
            Confidential Sprint Intake Form
          </h2>
          <p style="color: #A5ADB8; font-size: 14px; line-height: 1.7; margin-bottom: 20px;">
            Our interactive intake form collects your required services, budget range, timeline, and business goals to deliver a milestone proposal within 24 business hours.
          </p>
          <a href="/start-project" style="background: linear-gradient(135deg, #007BA7, #FF2E78); color: #fff; padding: 12px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">Open Interactive Project Intake &rarr;</a>
        </section>
      </div>
    </article>
  `;
}

// ----------------- MAIN RUNNER -----------------

function main() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Base Organization Schema for all pages
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://evohawks.tech/#organization',
    'name': 'Evo Hawks',
    'legalName': 'Evo Hawks',
    'url': 'https://evohawks.tech/',
    'logo': 'https://evohawks.tech/logo.jpg',
    'email': 'teamevohawks@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Dehradun',
      'addressRegion': 'Uttarakhand',
      'postalCode': '248001',
      'addressCountry': 'IN'
    }
  };

  // 1. Homepage
  const homeHtml = generatePageHtml(baseHtml, {
    path: '',
    title: 'Evo Hawks | Creative Production & Digital Marketing Agency',
    description: 'Explore Evo Hawks for video production, social media management, Meta Ads, SEO, branding, and website development. Discover our services and start your project.',
    bodyContent: buildHomeContent(),
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        orgSchema,
        {
          '@type': 'WebSite',
          '@id': 'https://evohawks.tech/#website',
          'name': 'Evo Hawks',
          'url': 'https://evohawks.tech/'
        }
      ]
    }
  });
  fs.writeFileSync(indexHtmlPath, homeHtml);
  console.log('✓ Injected rich semantic content into dist/index.html (Homepage)');

  // 2. Core Hub Pages
  const coreHubs = [
    {
      path: 'services',
      title: 'All 12 Digital Disciplines & Services | Evo Hawks Agency',
      description: 'Browse complete service scopes for video production, social media management, Meta ads, SEO, custom web development, and Shopify e-commerce.',
      bodyContent: buildServicesHubContent()
    },
    {
      path: 'packages',
      title: 'Packages & Transparent Pricing | Evo Hawks Agency',
      description: 'Explore clear, scope-defined packages for website development, video production, social media growth, Meta Ads, and full-funnel digital acceleration.',
      bodyContent: buildPackagesContent()
    },
    {
      path: 'portfolio',
      title: 'Portfolio & Client Case Studies | Evo Hawks Agency',
      description: 'Explore verified portfolio case studies across video production, branding, custom website development, Shopify stores, and growth campaigns.',
      bodyContent: buildPortfolioHubContent()
    },
    {
      path: 'work',
      title: 'Portfolio & Client Case Studies | Evo Hawks Agency',
      description: 'Explore verified portfolio case studies across video production, branding, custom website development, Shopify stores, and growth campaigns.',
      bodyContent: buildPortfolioHubContent()
    },
    {
      path: 'about',
      title: 'About Evo Hawks | High-Velocity Creative & Marketing Agency',
      description: 'Learn about our culture, senior-only talent team, and mission to engineer category-defining digital brands from Dehradun, India for global leaders.',
      bodyContent: buildAboutContent()
    },
    {
      path: 'process',
      title: 'Our 5-Stage Sprint Delivery Process | Evo Hawks Agency',
      description: 'Discover how Evo Hawks delivers high-velocity creative and engineering sprints with weekly deliverables, dedicated PMs, and zero bureaucracy.',
      bodyContent: buildProcessContent()
    },
    {
      path: 'blog',
      title: 'Client Guides, Insights & Resources | Evo Hawks Agency',
      description: 'Actionable guides, cost breakdowns, and strategic blueprints on social media, Meta Ads, SEO, and web development from Evo Hawks agency.',
      bodyContent: buildBlogHubContent()
    },
    {
      path: 'contact',
      title: 'Contact Evo Hawks | Start a High-Velocity Project',
      description: 'Reach our senior strategy team via instant WhatsApp or project inquiry form. We respond within 24 hours with actionable sprint scopes.',
      bodyContent: buildContactContent()
    },
    {
      path: 'start-project',
      title: 'Start Your Project & Project Intake | Evo Hawks Agency',
      description: 'Submit your project brief, timeline, goals, and budget to receive a tailored sprint roadmap and guaranteed milestone quote.',
      bodyContent: buildContactContent()
    },
    {
      path: 'why-us',
      title: 'Why Choose Evo Hawks | Engineering-Grade Growth Partner',
      description: 'Discover what sets Evo Hawks apart: speed of execution, full-stack creative & engineering synergy, transparent fixed-scope pricing, and dedicated client SLAs.',
      bodyContent: buildAboutContent()
    },
    {
      path: 'faq',
      title: 'Frequently Asked Questions & SLAs | Evo Hawks Agency',
      description: 'Answers to common client questions regarding our sprint contracts, pricing models, revisions, communication cadences, and IP ownership.',
      bodyContent: buildPackagesContent()
    }
  ];

  let count = 0;
  for (const page of coreHubs) {
    const html = generatePageHtml(baseHtml, {
      ...page,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
          { '@type': 'ListItem', position: 2, name: page.title, item: `https://evohawks.tech/${page.path}` }
        ]
      }
    });

    const targetDir = path.join(distDir, page.path);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html);
    fs.writeFileSync(path.join(distDir, `${page.path}.html`), html);
    count++;
  }
  console.log(`✓ Generated ${count} Core Hub Pages with rich semantic HTML`);

  // 3. Dedicated Service Pages (12 core + aliases)
  let serviceCount = 0;
  for (const s of SERVICES) {
    const serviceHtml = generatePageHtml(baseHtml, {
      path: `services/${s.slug}`,
      title: `${s.title} | Evo Hawks Digital Agency`,
      description: s.tagline,
      bodyContent: buildServiceDetailContent(s),
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            'name': s.title,
            'description': s.tagline,
            'provider': orgSchema
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
              { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://evohawks.tech/services' },
              { '@type': 'ListItem', position: 3, name: s.title, item: `https://evohawks.tech/services/${s.slug}` }
            ]
          }
        ]
      }
    });

    const targetDir = path.join(distDir, 'services', s.slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), serviceHtml);
    fs.writeFileSync(path.join(distDir, 'services', `${s.slug}.html`), serviceHtml);
    serviceCount++;

    // Generate alias route if present
    if (s.alias) {
      const aliasDir = path.join(distDir, 'services', s.alias);
      fs.mkdirSync(aliasDir, { recursive: true });
      fs.writeFileSync(path.join(aliasDir, 'index.html'), serviceHtml);
      fs.writeFileSync(path.join(distDir, 'services', `${s.alias}.html`), serviceHtml);
    }
  }
  console.log(`✓ Generated ${serviceCount} Dedicated Service Pages`);

  // 4. Case Studies
  let csCount = 0;
  for (const cs of CASE_STUDIES) {
    const csHtml = generatePageHtml(baseHtml, {
      path: `portfolio/${cs.slug}`,
      title: `${cs.title} | Evo Hawks Agency`,
      description: cs.overview,
      bodyContent: buildCaseStudyDetailContent(cs),
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
          { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://evohawks.tech/portfolio' },
          { '@type': 'ListItem', position: 3, name: cs.title, item: `https://evohawks.tech/portfolio/${cs.slug}` }
        ]
      }
    });

    const targetDir = path.join(distDir, 'portfolio', cs.slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), csHtml);
    fs.writeFileSync(path.join(distDir, 'portfolio', `${cs.slug}.html`), csHtml);
    csCount++;
  }
  console.log(`✓ Generated ${csCount} Portfolio Case Study Pages`);

  // 5. Guides / Blog Articles
  let guideCount = 0;
  for (const g of GUIDES) {
    const guideHtml = generatePageHtml(baseHtml, {
      path: `blog/${g.slug}`,
      title: `${g.title} | Evo Hawks`,
      description: g.excerpt,
      bodyContent: buildBlogDetailContent(g),
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            'headline': g.title,
            'description': g.excerpt,
            'publisher': orgSchema
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evohawks.tech/' },
              { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://evohawks.tech/blog' },
              { '@type': 'ListItem', position: 3, name: g.title, item: `https://evohawks.tech/blog/${g.slug}` }
            ]
          }
        ]
      }
    });

    const targetDir = path.join(distDir, 'blog', g.slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), guideHtml);
    fs.writeFileSync(path.join(distDir, 'blog', `${g.slug}.html`), guideHtml);
    guideCount++;
  }
  console.log(`✓ Generated ${guideCount} Client Guides / Article Pages`);

  // 6. Ensure 404.html & .nojekyll
  fs.writeFileSync(path.join(distDir, '404.html'), homeHtml);
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '# Disable Jekyll for GitHub Pages\n');
  console.log('✓ Generated dist/404.html and dist/.nojekyll');
}

main();
