export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  services: string[];
  deliverables: string[];
  whoItsFor: string;
  clientPrerequisites: string[];
  serviceFaqs: ServiceFAQ[];
  cta: string;
  icon: string;
  badge?: string;
  accentColor: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Websites' | 'Design' | 'Video' | 'Social' | 'Marketing';
  isConcept: boolean;
  badge: string;
  industry: string;
  services: string[];
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  deliverables: string[];
  metricsPreview?: string;
  image: string;
  accent: string;
}

export interface ValuePillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Process' | 'Pricing';
}

export interface TestimonialItem {
  id: string;
  isPlaceholder: boolean;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  serviceReceived: string;
  avatarText: string;
}

export interface QualityCommitment {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export const AGENCY_CONFIG = {
  name: "Evo Hawks",
  tagline: "We Build. We Create. We Grow.",
  slogan: "See higher. Move faster. Grow further.",
  badge: "DIGITAL CREATIVE & MARKETING AGENCY",
  heroDescription: "Evo Hawks helps businesses build powerful digital experiences through websites, creative content, video and performance-driven marketing.",
  heroSubServices: ["Websites", "Design", "Video", "Social", "SEO", "Marketing"],
  
  trustHeadline: "Your Digital Presence. One Creative Partner.",
  trustText: "From designing your website to creating content and growing your reach, Evo Hawks brings creative, technology and marketing together under one roof.",
  
  aboutHeadline: "Built for Businesses That Want to Move Forward.",
  aboutText: "Evo Hawks combines design, technology, content and marketing to help businesses create a stronger digital presence. We are not just another vendor that delivers isolated posts and pages — we position ourselves as your long-term digital growth partner.",
  
  ecosystemHeadline: "One Service Is Good. A Complete Digital System Is Better.",
  ecosystemText: "Your website, content and marketing shouldn't operate independently. We connect them into one seamless digital ecosystem designed to maximize conversions, brand authority, and revenue.",

  // Centralized Contact & Socials (Change easily here)
  contact: {
    email: "teamevohawks@gmail.com",
    phone: "+91 98765 43210", // Note: Pending verified business telephone line
    whatsapp: "+91 98765 43210",
    whatsappCleanNumber: "919876543210", // for direct WhatsApp API link
    isPhoneConfigured: false, // Flag indicating phone number is placeholder
    location: "Mumbai & Bangalore, India",
    globalReach: "Serving Businesses Globally (Remote-First Agency)",
    workingHours: "Mon – Sat: 9:30 AM – 7:30 PM IST",
    responseTime: "Usually responds within 24 business hours"
  },

  // Consultation Booking Configuration (Item 10)
  booking: {
    isConfigured: false, // Set to true when VITE_CAL_BOOKING_URL is set in environment
    bookingUrl: "",
    defaultDurationMinutes: 30,
    modes: ["Google Meet", "WhatsApp Call", "Direct Phone Call"],
    responseExpectation: "Session confirmation within 24 business hours"
  },

  // Authentic Leadership & Operations Focus (Item 3)
  leadership: [
    {
      role: "Design Systems & Digital Experience",
      discipline: "Full-Fidelity UI/UX Systems, Responsive Components, Brand Systems",
      focus: "High-contrast UI/UX, brand typography, responsive web interactions, and design systems built for clarity and conversion."
    },
    {
      role: "Engineering & Technical Architecture",
      discipline: "Full-Stack Web Architecture, React/TypeScript, Cloud Deployments",
      focus: "Modern responsive web development, React/TypeScript architecture, Core Web Vitals optimization, and clean code handover."
    },
    {
      role: "Creative Content & Video Production",
      discipline: "Cinematic Vertical Video, Motion Design, Kinetic Typography",
      focus: "High-retention vertical video pacing, sound engineering, visual storytelling, and kinetic motion cuts."
    },
    {
      role: "Growth Strategy & Performance Marketing",
      discipline: "Technical SEO, Search Intent Modeling, Paid Acquisition Funnels",
      focus: "Audience intent mapping, Meta/Google ad funnel architecture, technical SEO, and conversion analytics."
    }
  ],

  socials: {
    instagram: "https://instagram.com/evohawks",
    facebook: "https://facebook.com/evohawks",
    linkedin: "https://linkedin.com/company/evohawks",
    youtube: "https://youtube.com/@evohawks",
    twitter: "https://x.com/evohawks"
  },

  pricingTerms: {
    revisions: "Standard packages include 2 structured revision rounds during review.",
    adSpendNotice: "Paid advertising budgets (Meta Ads, Google Ads) are funded directly by the client to the advertising platforms and are strictly separated from creative agency service fees.",
    infrastructureNotice: "Domain names, third-party subscriptions, and hosting expenses are client responsibilities.",
    milestones: "Standard sprints operate on a 50% mobilization deposit / 50% final sign-off prior to asset handover."
  },

  budgetRanges: [
    { label: "Under ₹10,000", value: "under-10k" },
    { label: "₹10,000 – ₹25,000", value: "10k-25k" },
    { label: "₹25,000 – ₹50,000", value: "25k-50k" },
    { label: "₹50,000 – ₹1,00,000", value: "50k-100k" },
    { label: "₹1,00,000+", value: "100k-plus" }
  ],

  serviceOptions: [
    "Website Development",
    "Graphic Design",
    "Video Editing & Reels",
    "Social Media Management",
    "SEO (Search Engine Optimization)",
    "Digital Marketing / Paid Ads",
    "Complete Full-Stack Package",
    "Other"
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-development",
    number: "01",
    title: "WEBSITE DEVELOPMENT",
    tagline: "Modern websites designed to turn visitors into customers.",
    description: "High-speed, responsive, conversion-focused websites built with clean code and modern aesthetics to give your business an undeniable digital edge.",
    services: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "E-commerce websites",
      "Website redesign",
      "Website maintenance",
      "Domain & hosting setup"
    ],
    deliverables: [
      "Production-ready responsive website code (HTML5/React/Vite)",
      "Mobile-optimized layout for 320px–1440px viewports",
      "Core Web Vitals & speed optimization pass",
      "Lead generation contact form with validation",
      "Full source code & asset repository handover"
    ],
    whoItsFor: "Startups, agencies, consultants, and established brands needing high performance and conversion-focused web presence.",
    clientPrerequisites: [
      "Brand logo & brand guideline files (SVG/PNG)",
      "Draft page content & service descriptions",
      "High-resolution product/team photos",
      "Domain & hosting provider credentials (when deployment is included)"
    ],
    serviceFaqs: [
      {
        q: "Do you build custom designs or use standard templates?",
        a: "We craft custom, bespoke layouts built with clean code and modern CSS. We do not use bloated or generic templates that hurt performance."
      },
      {
        q: "Who owns the code upon project completion?",
        a: "You own 100% of all source code, assets, and repository files upon milestone sign-off with zero vendor lock-in."
      }
    ],
    cta: "Build Your Website →",
    icon: "Globe",
    accentColor: "#00F0FF"
  },
  {
    id: "graphic-design",
    number: "02",
    title: "GRAPHIC DESIGN",
    tagline: "Visuals that make your brand impossible to ignore.",
    description: "Distinct visual design tailored to grab attention, establish authority, and communicate your brand's unique message with precision across all touchpoints.",
    services: [
      "Social media posts",
      "Posters & banners",
      "Brochures & decks",
      "Digital advertisements",
      "YouTube thumbnails",
      "Marketing creatives",
      "Basic branding & identity"
    ],
    deliverables: [
      "Exported high-res PNG/JPG creatives for mobile and desktop",
      "Layered source files (Figma / Adobe Illustrator)",
      "Cohesive brand color palette & typography tokens",
      "Standard banner & ad dimension adaptations (1:1, 9:16, 16:9)"
    ],
    whoItsFor: "Brands seeking consistent visual identity, high-CTR ad creatives, pitch decks, or engaging social media graphic suites.",
    clientPrerequisites: [
      "Vector brand logo",
      "Key text copy / headline requirements",
      "Reference styles or mood boards (optional but encouraged)"
    ],
    serviceFaqs: [
      {
        q: "In what formats do you deliver design files?",
        a: "We deliver web-optimized JPG/PNG files alongside complete Figma or vector master files."
      },
      {
        q: "How many design revisions are included?",
        a: "Standard creative deliverables include 2 structured revision rounds prior to final export."
      }
    ],
    cta: "Create With Us →",
    icon: "Palette",
    accentColor: "#818CF8"
  },
  {
    id: "video-reels",
    number: "03",
    title: "VIDEO & REELS",
    tagline: "Turn ideas and raw footage into content people want to watch.",
    description: "Dynamic pacing, motion graphics, clean cuts, sound design, and viral hooks engineered to capture audience attention within the first 3 seconds.",
    services: [
      "Instagram Reels",
      "YouTube videos",
      "Short-form TikTok / Shorts",
      "Promotional brand videos",
      "Video advertisements",
      "Motion graphics & title cards",
      "Podcast & interview editing",
      "Social media video series"
    ],
    deliverables: [
      "Final color-graded 1080x1920 (9:16) or 1920x1080 (16:9) MP4 video exports",
      "Dynamic synced captions and animated motion text",
      "Commercial-safe sound design, audio leveling & sound effects",
      "First 3-second hook variations for A/B testing"
    ],
    whoItsFor: "Founders, content creators, ecommerce brands, and educators wanting high-retention video content.",
    clientPrerequisites: [
      "Raw video footage via Google Drive / Dropbox",
      "Script or talking points outline",
      "Brand assets and logo animations"
    ],
    serviceFaqs: [
      {
        q: "What raw video quality do you require?",
        a: "Standard smartphone 4K or 1080p footage with clear audio is completely sufficient for viral short-form content."
      },
      {
        q: "Are the background music and sound effects commercial-safe?",
        a: "Yes. All audio and music tracks used are licensed for commercial social media use."
      }
    ],
    cta: "Edit Your Content →",
    icon: "Video",
    accentColor: "#38BDF8"
  },
  {
    id: "social-media",
    number: "04",
    title: "SOCIAL MEDIA",
    tagline: "Build a consistent social presence that keeps your brand visible.",
    description: "Strategic content planning, daily execution, and engagement playbooks that transform passive viewers into an active, loyal community.",
    services: [
      "Instagram management",
      "Facebook management",
      "Content planning & strategy",
      "Content calendars",
      "Engaging captions & copy",
      "Reels & story strategy",
      "Regular scheduled posting",
      "Account & bio optimization"
    ],
    deliverables: [
      "Monthly structured content calendar with scheduled publishing dates",
      "Engaging caption copywriting with relevant hashtag research",
      "Bio overhaul and highlight cover set",
      "Monthly activity review and top-performing post breakdown"
    ],
    whoItsFor: "Local businesses, clinics, cafes, brands, and service professionals seeking a polished and active digital footprint.",
    clientPrerequisites: [
      "Instagram / Facebook page access (Manager role)",
      "Product/service pricing and promotion schedules",
      "Monthly updates on new offerings or events"
    ],
    serviceFaqs: [
      {
        q: "Do you handle responding to direct messages and comments?",
        a: "We provide community monitoring and flag high-intent sales queries directly to your team via WhatsApp or email."
      },
      {
        q: "Can we review posts before they are published?",
        a: "Yes. Monthly content calendars are submitted 5–7 days in advance for your review and approval before scheduling."
      }
    ],
    cta: "Grow Your Socials →",
    icon: "Share2",
    accentColor: "#A78BFA"
  },
  {
    id: "seo",
    number: "05",
    title: "SEO",
    tagline: "Help your business get discovered by the people searching for it.",
    description: "Data-backed search engine optimization that puts your website in front of high-intent buyers exactly when they are ready to purchase.",
    services: [
      "Keyword research & intent mapping",
      "On-page SEO & meta structure",
      "Technical SEO & Core Web Vitals",
      "Local SEO & map pack ranking",
      "Google Business Profile optimization",
      "SEO content strategy",
      "Performance & rank tracking"
    ],
    deliverables: [
      "Baseline technical SEO audit & fix roadmap",
      "Keyword mapping document targeting high-intent buyer searches",
      "On-page metadata optimization (Title, meta description, H1/H2 hierarchy)",
      "Google Business Profile local optimization pass",
      "Monthly keyword ranking & search impressions report"
    ],
    whoItsFor: "Businesses seeking sustainable, long-term organic traffic that compounds over time without recurring ad clicks.",
    clientPrerequisites: [
      "Website CMS / repository access for technical tag deployment",
      "Google Search Console & Google Analytics access (or permission to configure)",
      "Google Business Profile manager access (for local SEO)"
    ],
    serviceFaqs: [
      {
        q: "How soon do SEO results appear?",
        a: "Technical fixes take effect within 2–4 weeks upon re-indexing; competitive organic ranking improvements typically mature over 3 to 6 months of compounding optimization."
      },
      {
        q: "Do you guarantee #1 ranking on Google?",
        a: "No reputable agency can guarantee #1 rankings because search engine algorithms evolve constantly. We implement transparent, white-hat best practices that maximize ranking potential."
      }
    ],
    cta: "Improve Your SEO →",
    icon: "Search",
    accentColor: "#00F0FF"
  },
  {
    id: "digital-marketing",
    number: "06",
    title: "DIGITAL MARKETING",
    tagline: "Reach the right audience and turn attention into leads and customers.",
    description: "Targeted paid campaigns across Meta and Google focused strictly on measurable return on ad spend (ROAS) and quality lead acquisition.",
    services: [
      "Meta Ads (Facebook & Instagram)",
      "Google Search & Display Ads",
      "Lead generation funnels",
      "Audience targeting & lookalikes",
      "Campaign strategy & A/B testing",
      "Conversion rate optimization",
      "In-depth analytics & pixel tracking",
      "Transparent performance reporting"
    ],
    deliverables: [
      "Targeted campaign structure setup (TOF, MOF, BOF retargeting)",
      "Ad creatives (copy variants, graphic cards, video cut adaptations)",
      "Meta Pixel & Google Conversion tracking verification",
      "A/B creative testing matrix",
      "Weekly performance summary detailing spend, clicks, leads, and CPA"
    ],
    whoItsFor: "Businesses with validated offerings ready to scale customer acquisition with direct paid media budgets.",
    clientPrerequisites: [
      "Meta Business Manager / Google Ads account access (client payment method linked)",
      "Minimum recommended monthly ad budget of ₹15,000 paid directly to platforms",
      "Clear lead qualification criteria or target cost-per-acquisition (CPA)"
    ],
    serviceFaqs: [
      {
        q: "Is the advertising budget paid to Evo Hawks or directly to the platform?",
        a: "Your advertising budget is billed directly by Meta and Google to your own payment method. Our fee covers strategy, creative production, management, and optimization."
      },
      {
        q: "How do you track whether ads are generating real leads?",
        a: "We configure conversion tracking pixels and form submission events to trace inquiries directly to the campaign and creative variant that produced them."
      }
    ],
    cta: "Grow Your Business →",
    icon: "TrendingUp",
    accentColor: "#60A5FA"
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "project-1",
    title: "Apex Architecture Studio",
    category: "Websites",
    isConcept: true,
    badge: "CONCEPT BENCHMARK",
    industry: "Luxury Architecture & Interiors",
    services: ["UI/UX Design", "Next.js Web Development", "Interactive 3D Walkthrough"],
    description: "A dark, editorial, ultra-fast website concept designed for an elite architectural studio featuring smooth scroll transitions and project galleries.",
    challenge: "High-resolution architectural photography frequently causes layout shifts, bloated bundle sizes, and slow mobile loading.",
    solution: "Engineered with Next.js image optimization, progressive blur placeholders, and CSS grid layouts that achieve smooth 60fps scrolling on mobile devices.",
    technologies: ["React 19", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    deliverables: ["Responsive Web Platform", "Project Showcase System", "Fast Page Loading Architecture", "Inquiry Lead Capture"],
    metricsPreview: "Editorial layout with responsive project showcase",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    accent: "#00F0FF"
  },
  {
    id: "project-2",
    title: "Pulse Energy Beverage",
    category: "Design",
    isConcept: true,
    badge: "CONCEPT BENCHMARK",
    industry: "Consumer Goods & Fitness",
    services: ["Brand Visual Identity", "Product Packaging Concept", "Social Media Creatives"],
    description: "High-contrast visual design and dynamic social creatives developed for a clean-energy performance beverage targeted at high-output creators.",
    challenge: "Standing out in saturated beverage retail feeds without falling into generic gym-supplement tropes.",
    solution: "Created high-contrast typography, electric neon color systems, and modular social media templates designed specifically for rapid feed scannability.",
    technologies: ["Figma", "Adobe Illustrator", "Vector Graphics", "Brand Style Guide"],
    deliverables: ["3D Product Renders", "Instagram Post & Story Templates", "Launch Banner Graphics", "Ad Creative Suite"],
    metricsPreview: "Cohesive visual identity across 20+ creative assets",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
    accent: "#8B5CF6"
  },
  {
    id: "project-3",
    title: "Vortex SaaS - Product Launch",
    category: "Video",
    isConcept: true,
    badge: "CONCEPT BENCHMARK",
    industry: "B2B SaaS & Tech",
    services: ["Short-form Video Editing", "Motion Graphics", "Reels & Shorts Strategy"],
    description: "Fast-paced, kinetic product demo reels with custom sound design, highlight callouts, and punchy motion typography built for social virality.",
    challenge: "Technical software features are difficult to explain in under 30 seconds without losing viewer attention.",
    solution: "Produced kinetic screen zooms, custom Foley sound effects, and animated UI overlays that communicate core software utility in the first 3 seconds.",
    technologies: ["DaVinci Resolve", "Adobe After Effects", "Motion Typography", "Audio Mastering"],
    deliverables: ["6x High-Retention Reels", "YouTube Shorts Series", "Audio Mastered Sound FX", "Animated UI Overlays"],
    metricsPreview: "Kinetic short-form reels with custom sound engineering",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
    accent: "#38BDF8"
  },
  {
    id: "project-4",
    title: "Komorebi Artisan Café",
    category: "Social",
    isConcept: true,
    badge: "CONCEPT BENCHMARK",
    industry: "Hospitality & Specialty Coffee",
    services: ["Social Media Management", "Content Calendar", "Community Engagement"],
    description: "A 30-day comprehensive organic social blueprint that pairs aesthetic visual storytelling with local community growth strategies.",
    challenge: "Translating an in-person artisan atmosphere into an active digital community that drives physical foot traffic.",
    solution: "Designed a 30-day publishing calendar alternating between barista craft closeups, seasonal origin stories, and geo-targeted Instagram stories.",
    technologies: ["Content Calendar", "Meta Business Suite", "Canva Pro", "Hashtag Analysis"],
    deliverables: ["30-Day Content Calendar", "Bio & Highlight Overhaul", "Grid Aesthetic Template", "Local Hashtag & Location Playbook"],
    metricsPreview: "Multi-platform aesthetic consistency & content calendars",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    accent: "#A78BFA"
  },
  {
    id: "project-5",
    title: "Solara Health Clinics",
    category: "Marketing",
    isConcept: true,
    badge: "CONCEPT BENCHMARK",
    industry: "Healthcare & Wellness",
    services: ["Meta Paid Ads", "Google Search Ads", "Conversion Landing Page"],
    description: "A multi-channel performance marketing funnel targeted at local health and wellness patient acquisition with strict cost-per-lead optimization.",
    challenge: "High cost-per-click on healthcare search terms and strict privacy compliance on medical advertising.",
    solution: "Combined focused local Google Search intent ads with a HIPAA-compliant consultation scheduler and lightweight landing page.",
    technologies: ["Google Ads Manager", "Meta Pixel", "Unbounce / Custom HTML", "Google Tag Manager"],
    deliverables: ["Ad Copy Variants & Creative", "Retargeting Pixel Setup", "Appointment Booking Landing Page", "Performance Tracking Setup"],
    metricsPreview: "Targeted patient consultation booking architecture",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    accent: "#00F0FF"
  },
  {
    id: "project-6",
    title: "Urban Aura Fashion",
    category: "Websites",
    isConcept: true,
    badge: "CONCEPT BENCHMARK",
    industry: "E-commerce & Streetwear",
    services: ["E-commerce Development", "Shopify Setup", "Speed Optimization"],
    description: "An ultra-minimalist, sleek e-commerce storefront tailored for streetwear drops with express checkout, size guides, and instant stock alerts.",
    challenge: "Spike traffic during streetwear drop announcements causing slow checkout times and abandoned carts on mobile.",
    solution: "Designed a headless mobile-first checkout flow with one-click payment integration and instant stock status indicators.",
    technologies: ["Shopify Liquid", "Tailwind CSS", "JavaScript ES6+", "Stripe Elements"],
    deliverables: ["Custom E-commerce Store", "Mobile-First Cart Flow", "Inventory Management", "Integrated Analytics"],
    metricsPreview: "Frictionless mobile storefront & checkout UX",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    accent: "#60A5FA"
  }
];

export const WHY_US_DATA: ValuePillar[] = [
  {
    id: "one-team",
    number: "01",
    title: "ONE TEAM",
    tagline: "Zero friction. Total cohesion.",
    description: "Website, content, design and marketing handled by one creative partner. No chasing multiple freelancers or misaligned agencies.",
    icon: "Users"
  },
  {
    id: "creative-strategy",
    number: "02",
    title: "CREATIVE + STRATEGY",
    tagline: "Beauty backed by intent.",
    description: "We combine striking visual execution with business-focused strategy so every creative asset directly supports your commercial objectives.",
    icon: "Brain"
  },
  {
    id: "built-for-performance",
    number: "03",
    title: "BUILT FOR PERFORMANCE",
    tagline: "Engineered to deliver measurable results.",
    description: "Every website, creative and campaign has a purpose beyond simply looking good — from fast loading speeds to high conversion rates.",
    icon: "Zap"
  },
  {
    id: "flexible",
    number: "04",
    title: "FLEXIBLE",
    tagline: "Agile engagement models.",
    description: "Hire us for one specific project, launch a targeted campaign, or build an ongoing, long-term digital growth partnership as your brand scales.",
    icon: "Layers"
  }
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    step: "01",
    title: "DISCOVERY & REQUIREMENTS",
    tagline: "Listen, analyze, and align.",
    description: "We conduct a thorough intake session to understand your business objectives, target audience demographics, competitive landscape, and functional requirements.",
    deliverables: [
      "Requirements specification brief",
      "Competitive digital positioning review",
      "Asset & dependency checklist",
      "Target audience profile"
    ],
    icon: "Compass"
  },
  {
    step: "02",
    title: "PROPOSAL & SCOPE APPROVAL",
    tagline: "Transparent deliverables and sprint milestones.",
    description: "We compile a structured proposal with itemized deliverables, revision rounds, timeline milestones, and fixed pricing terms. Work begins only upon your sign-off.",
    deliverables: [
      "Itemized Scope of Work (SOW)",
      "Milestone schedule & delivery dates",
      "Pricing breakdown & payment terms",
      "Dedicated communication channel setup"
    ],
    icon: "Target"
  },
  {
    step: "03",
    title: "PLANNING & PRODUCTION",
    tagline: "Precision execution across design and code.",
    description: "Our team drafts wireframes, crafts design systems, writes clean code, or cuts dynamic video assets according to the approved scope specifications.",
    deliverables: [
      "Figma UI wireframes & style guides",
      "Clean responsive codebase development",
      "Raw video rough cuts & audio mastering",
      "Staging preview environment deployment"
    ],
    icon: "Sparkles"
  },
  {
    step: "04",
    title: "CLIENT REVIEW & REVISIONS",
    tagline: "Structured feedback and refinement.",
    description: "You review the work in a live staging environment. Standard packages include 2 structured revision cycles to refine copy, visual elements, or styling until approved.",
    deliverables: [
      "Interactive staging URL or video review link",
      "Itemized revision tracking log",
      "Cross-browser and mobile device QA checks",
      "Final milestone sign-off"
    ],
    icon: "Activity"
  },
  {
    step: "05",
    title: "DELIVERY, LAUNCH & OPTIMIZATION",
    tagline: "Seamless deployment and 100% asset handover.",
    description: "We push the project live to production, verify domain SSL and analytics tags, and hand over 100% of source code, design files, and production assets with zero vendor lock-in.",
    deliverables: [
      "Production deployment & SSL verification",
      "Complete Git repository & asset package handover",
      "Admin walkthrough & documentation",
      "Post-launch support & ongoing growth options"
    ],
    icon: "Rocket"
  }
];

export const SYSTEM_NODES = [
  {
    id: "website",
    name: "Website",
    role: "The Digital Hub",
    description: "High-speed, conversion-optimized anchor for all your digital traffic.",
    metric: "High Conversion Base",
    icon: "Globe"
  },
  {
    id: "content",
    name: "Creative Content",
    role: "The Brand Voice",
    description: "Visuals and videos that captivate attention and communicate value.",
    metric: "High Retention Assets",
    icon: "Palette"
  },
  {
    id: "social",
    name: "Social Media",
    role: "The Community Engine",
    description: "Consistent presence that keeps your brand top-of-mind daily.",
    metric: "Organic Reach & Trust",
    icon: "Share2"
  },
  {
    id: "seo",
    name: "SEO Engine",
    role: "The Organic Magnet",
    description: "Ongoing discoverability for high-intent search queries.",
    metric: "Compounding Traffic",
    icon: "Search"
  },
  {
    id: "marketing",
    name: "Paid Marketing",
    role: "The Scale Accelerator",
    description: "Laser-targeted ads driving predictable visitor volume.",
    metric: "Measurable ROAS",
    icon: "TrendingUp"
  },
  {
    id: "growth",
    name: "Leads & Growth",
    role: "The Commercial Output",
    description: "Qualified enquiries, loyal customers, and business expansion.",
    metric: "Sustainable Revenue",
    icon: "CheckCircle2"
  }
];

export const QUALITY_STANDARDS: QualityCommitment[] = [
  {
    id: "qs-1",
    title: "Direct Strategic Lead",
    tagline: "Senior partner collaboration",
    description: "You work directly with dedicated design and technical leads throughout your sprint, ensuring rapid alignment and decisive execution.",
    icon: "Users"
  },
  {
    id: "qs-2",
    title: "100% Asset & Code Ownership",
    tagline: "Zero vendor lock-in",
    description: "Upon project sign-off and milestone completion, full source code repositories, design files, and production media are completely yours.",
    icon: "ShieldCheck"
  },
  {
    id: "qs-3",
    title: "Transparent Scopes & SOWs",
    tagline: "Fixed milestone deliverables",
    description: "Every engagement begins with clear deliverables, deadlines, and milestone schedules. We never introduce hidden charges or surprise billing.",
    icon: "FileText"
  },
  {
    id: "qs-4",
    title: "Pre-Launch QA & Ongoing Support",
    tagline: "Cross-device reliability",
    description: "Every website, video cut, and ad campaign undergoes structured quality checks before launch, supported by post-delivery optimization.",
    icon: "CheckCircle2"
  }
];

// Verified Client Testimonials are published strictly upon formal client approval
// We do not publish placeholder or fabricated reviews.
export const TESTIMONIALS_DATA: TestimonialItem[] = [];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What services does Evo Hawks provide?",
    answer: "Evo Hawks is a full-service digital creative and marketing agency. We provide 6 core disciplines: Website Development (business, landing pages, e-commerce), Graphic Design (social media, branding, decks), Video Editing & Reels (short-form, promos, YouTube), Social Media Management (content calendars, captions, posting), SEO (keyword research, technical, local SEO), and Digital Marketing (Meta and Google paid ads).",
    category: "General"
  },
  {
    id: "faq-2",
    question: "Can I hire Evo Hawks for only one service?",
    answer: "Yes, absolutely! While many clients love our connected full-service ecosystem, you can hire us for a single project — such as building a new website, editing a batch of Reels, or running a targeted ad campaign. We offer flexible engagement models that fit your exact needs.",
    category: "Services"
  },
  {
    id: "faq-3",
    question: "Do you build websites from scratch or use templates?",
    answer: "Every website we build is crafted with intentional design, modern UI/UX principles, clean responsive code, and optimized performance. We do not use bloated, generic templates that slow down your site. Your website will be unique, fast, and built to convert.",
    category: "Services"
  },
  {
    id: "faq-4",
    question: "What happens if our project scope changes mid-sprint?",
    answer: "Scope changes are handled with complete transparency. If you wish to add new features or pages not specified in the initial Scope of Work (SOW), we review the request, calculate the timeline and budget impact, and proceed only upon your written approval of an addendum.",
    category: "Process"
  },
  {
    id: "faq-5",
    question: "How do project revisions work?",
    answer: "Standard production packages include 2 structured rounds of revisions during the staging phase. We share live staging links or video drafts where you can compile all feedback. This ensures revisions are implemented methodically and completed within the sprint timeline.",
    category: "Process"
  },
  {
    id: "faq-6",
    question: "Is advertising budget included in your digital marketing fee?",
    answer: "No. Advertising spend is paid directly by your business to advertising platforms (Meta Ads, Google Ads) through your own linked payment card. Our agency fee strictly covers campaign strategy, audience targeting, creative asset production, weekly optimization, and conversion tracking.",
    category: "Pricing"
  },
  {
    id: "faq-7",
    question: "Who owns the code, graphics, and video files upon completion?",
    answer: "You own 100% of all deliverables upon final milestone payment and sign-off. We provide full Git repository access, exported production files, and layered design assets with zero vendor lock-in.",
    category: "General"
  },
  {
    id: "faq-8",
    question: "What third-party expenses should we expect?",
    answer: "Third-party infrastructure costs — such as domain names (approx. ₹800–₹1,500/year), web server hosting (approx. ₹300–₹2,000/month depending on traffic), and any premium third-party API or font licenses — are paid directly by the client to maintain complete ownership.",
    category: "Pricing"
  },
  {
    id: "faq-9",
    question: "How often will we receive project updates and reporting?",
    answer: "For project sprints, we provide milestone updates at each key checkpoint along with a live staging preview. For ongoing marketing and SEO retainers, we provide bi-weekly or monthly performance reports detailing traffic, leads, CPA, and optimization recommendations.",
    category: "Process"
  },
  {
    id: "faq-10",
    question: "How long does a website take from start to finish?",
    answer: "A standard responsive business website or high-converting landing page typically takes 1 to 3 weeks depending on scope, number of pages, and prompt receipt of brand assets and copy feedback. Timelines are confirmed during the Discovery phase.",
    category: "Process"
  },
  {
    id: "faq-11",
    question: "Do you guarantee #1 rankings or specific ROAS figures?",
    answer: "No reputable agency can guarantee #1 rankings or exact return on ad spend, as search algorithms and market conditions fluctuate. We commit to proven, data-backed best practices, rigorous A/B creative testing, and transparent analytics so you can verify real performance.",
    category: "Services"
  },
  {
    id: "faq-12",
    question: "How can I start a project with Evo Hawks?",
    answer: "Starting is simple: click 'Start a Project', choose your service discipline and budget range, and submit your project brief. You can also contact us directly via WhatsApp or email (teamevohawks@gmail.com). We will review your brief and respond within 24 business hours.",
    category: "General"
  }
];
