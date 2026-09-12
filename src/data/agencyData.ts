export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  services: string[];
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
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    whatsappCleanNumber: "919876543210", // for direct WhatsApp API link
    location: "Mumbai & Bangalore, India",
    globalReach: "Serving Businesses Globally (Remote & On-Site)",
    workingHours: "Mon – Sat: 9:30 AM – 7:30 PM IST",
    responseTime: "Usually responds within 2 hours"
  },

  socials: {
    instagram: "https://instagram.com/evohawks",
    facebook: "https://facebook.com/evohawks",
    linkedin: "https://linkedin.com/company/evohawks",
    youtube: "https://youtube.com/@evohawks",
    twitter: "https://x.com/evohawks"
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
    badge: "CONCEPT PROJECT",
    industry: "Luxury Architecture & Interiors",
    services: ["UI/UX Design", "Next.js Web Development", "Interactive 3D Walkthrough"],
    description: "A dark, editorial, ultra-fast website concept designed for an elite architectural studio featuring smooth scroll transitions and project galleries.",
    deliverables: ["Responsive Web Platform", "Project Showcase System", "Fast Page Loads (<0.6s)", "Inquiry Lead Capture"],
    metricsPreview: "Sub-second load times & 45% estimated inquiry lift",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    accent: "#00F0FF"
  },
  {
    id: "project-2",
    title: "Pulse Energy Beverage",
    category: "Design",
    isConcept: true,
    badge: "CONCEPT PROJECT",
    industry: "Consumer Goods & Fitness",
    services: ["Brand Visual Identity", "Product Packaging Concept", "Social Media Creatives"],
    description: "High-contrast visual design and dynamic social creatives developed for a clean-energy performance beverage targeted at high-output creators.",
    deliverables: ["3D Product Renders", "Instagram Post & Story Templates", "Launch Banner Graphics", "Ad Creative Suite"],
    metricsPreview: "Cohesive visual identity across 20+ ad formats",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
    accent: "#8B5CF6"
  },
  {
    id: "project-3",
    title: "Vortex SaaS - Product Launch",
    category: "Video",
    isConcept: true,
    badge: "CONCEPT PROJECT",
    industry: "B2B SaaS & Tech",
    services: ["Short-form Video Editing", "Motion Graphics", "Reels & Shorts Strategy"],
    description: "Fast-paced, kinetic product demo reels with custom sound design, highlight callouts, and punchy motion typography built for social virality.",
    deliverables: ["6x High-Retention Reels", "YouTube Shorts Series", "Audio Mastered Sound FX", "Animated UI Overlays"],
    metricsPreview: "Designed for >80% 3-second hook retention",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
    accent: "#38BDF8"
  },
  {
    id: "project-4",
    title: "Komorebi Artisan Café",
    category: "Social",
    isConcept: true,
    badge: "CONCEPT PROJECT",
    industry: "Hospitality & Specialty Coffee",
    services: ["Social Media Management", "Content Calendar", "Community Engagement"],
    description: "A 30-day comprehensive organic social blueprint that pairs aesthetic visual storytelling with local community growth strategies.",
    deliverables: ["30-Day Content Calendar", "Bio & Highlight Overhaul", "Grid Aesthetic Template", "Local Hashtag & Location Playbook"],
    metricsPreview: "Multi-platform consistency & authentic engagement",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    accent: "#A78BFA"
  },
  {
    id: "project-5",
    title: "Solara Health Clinics",
    category: "Marketing",
    isConcept: true,
    badge: "CONCEPT PROJECT",
    industry: "Healthcare & Wellness",
    services: ["Meta Paid Ads", "Google Search Ads", "Conversion Landing Page"],
    description: "A multi-channel performance marketing funnel targeted at local health and wellness patient acquisition with strict cost-per-lead optimization.",
    deliverables: ["Ad Copy Variants & Creative", "Retargeting Pixel Setup", "Appointment Booking Landing Page", "Weekly Performance Dashboard"],
    metricsPreview: "Targeting high-intent consultation bookings",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    accent: "#00F0FF"
  },
  {
    id: "project-6",
    title: "Urban Aura Fashion",
    category: "Websites",
    isConcept: true,
    badge: "CONCEPT PROJECT",
    industry: "E-commerce & Streetwear",
    services: ["E-commerce Development", "Shopify Setup", "Speed Optimization"],
    description: "An ultra-minimalist, sleek e-commerce storefront tailored for streetwear drops with express checkout, size guides, and instant stock alerts.",
    deliverables: ["Custom E-commerce Store", "Mobile-First Cart Flow", "Inventory Management", "Integrated Analytics"],
    metricsPreview: "Frictionless mobile checkout flow",
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
    title: "DISCOVER",
    tagline: "Listen, analyze, and align.",
    description: "We dive deep into your business model, target audience, brand goals, and specific project requirements to establish a rock-solid foundation.",
    deliverables: ["Goal alignment brief", "Target audience persona", "Competitor landscape review", "Scope & roadmap definition"],
    icon: "Compass"
  },
  {
    step: "02",
    title: "STRATEGIZE",
    tagline: "Architect the plan of attack.",
    description: "We define the creative direction, technical architecture, content themes, and marketing funnels before writing a single line of code or design file.",
    deliverables: ["Creative concept boards", "Information architecture", "Content & campaign calendars", "Tech stack selection"],
    icon: "Target"
  },
  {
    step: "03",
    title: "CREATE",
    tagline: "Craft with precision and speed.",
    description: "Our team designs, develops, edits, and produces the required digital assets with modern aesthetics, clean code, and engaging copy.",
    deliverables: ["Production-ready websites", "Graphic & video assets", "Copywriting & ad creatives", "Interactive prototypes"],
    icon: "Sparkles"
  },
  {
    step: "04",
    title: "LAUNCH",
    tagline: "Deploy seamlessly to the world.",
    description: "We deliver the website, launch the advertising campaigns, schedule the social content, and execute final QA checks across all devices.",
    deliverables: ["Live website deployment", "Active ad campaign launch", "Tracking & pixel verification", "Asset handover & walkthrough"],
    icon: "Rocket"
  },
  {
    step: "05",
    title: "OPTIMIZE",
    tagline: "Measure, refine, and accelerate.",
    description: "We analyze performance metrics, user behavior, and conversion data to continuously refine creatives, campaigns, and user flows for maximum ROI.",
    deliverables: ["Performance reports", "A/B test iterations", "Conversion rate enhancements", "Ongoing growth recommendations"],
    icon: "Activity"
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

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "testimonial-1",
    isPlaceholder: true,
    clientName: "Client Review Pending",
    role: "Founder / Marketing Director",
    company: "Future Partner Brand",
    quote: "Client testimonial will appear here. We prioritize authentic, verified reviews from businesses we partner with.",
    serviceReceived: "Website Development & SEO",
    avatarText: "EH"
  },
  {
    id: "testimonial-2",
    isPlaceholder: true,
    clientName: "Client Review Pending",
    role: "Managing Director",
    company: "Growing Enterprise",
    quote: "Client testimonial will appear here. Our commitment is delivering transparent, high-performing digital results for every project.",
    serviceReceived: "Video & Social Media Strategy",
    avatarText: "EH"
  },
  {
    id: "testimonial-3",
    isPlaceholder: true,
    clientName: "Client Review Pending",
    role: "E-Commerce Head",
    company: "Direct-to-Consumer Brand",
    quote: "Client testimonial will appear here. We build long-term partnerships focused on measurable growth and creative excellence.",
    serviceReceived: "Digital Marketing & Paid Ads",
    avatarText: "EH"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What services does Evo Hawks provide?",
    answer: "Evo Hawks is a full-service digital creative and marketing agency. We provide 6 core services: Website Development (business, landing pages, e-commerce), Graphic Design (social media, branding, decks), Video Editing & Reels (short-form, promos, YouTube), Social Media Management (content calendars, captions, posting), SEO (keyword research, technical, local SEO), and Digital Marketing (Meta and Google paid ads).",
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
    question: "Do you build websites from scratch?",
    answer: "Yes. Every website we build is crafted with intentional design, modern UI/UX principles, clean responsive code, and optimized performance. We do not use bloated, generic templates that slow down your site. Your website will be unique, fast, and built to convert.",
    category: "Services"
  },
  {
    id: "faq-4",
    question: "Do you provide website maintenance?",
    answer: "Yes. We offer ongoing website maintenance and support packages to ensure your site remains secure, updated, lightning fast, and compatible with modern web standards, including content updates, speed optimization, and backups.",
    category: "Services"
  },
  {
    id: "faq-5",
    question: "Can you manage our Instagram and Facebook?",
    answer: "Yes! Our Social Media Management covers end-to-end execution: content planning, monthly content calendars, graphic design, caption copywriting, Reels strategy, scheduled publishing, and account bio optimization to keep your brand active and credible.",
    category: "Services"
  },
  {
    id: "faq-6",
    question: "Do you edit Reels and YouTube videos?",
    answer: "Yes. We specialize in high-retention video editing for Instagram Reels, YouTube Shorts, long-form YouTube videos, brand promos, and podcast cuts. We handle pacing, sound design, motion graphics, and subtitles engineered to keep viewers hooked.",
    category: "Services"
  },
  {
    id: "faq-7",
    question: "Do you provide SEO services?",
    answer: "Yes. Our SEO services include thorough keyword research, on-page optimization, technical SEO (Core Web Vitals and site structure), Local SEO (Google Business Profile optimization), and SEO content strategy to help your business gain sustainable organic visibility.",
    category: "Services"
  },
  {
    id: "faq-8",
    question: "Do you run Meta and Google Ads?",
    answer: "Yes. We manage end-to-end paid advertising campaigns across Facebook, Instagram, Google Search, and YouTube. This includes audience research, ad creative design, copywriting, landing page optimization, tracking pixel setup, and ongoing ROAS optimization.",
    category: "Services"
  },
  {
    id: "faq-9",
    question: "How much do your services cost?",
    answer: "Our pricing depends on your specific scope, deliverables, and timeline. We offer transparent, competitive packages for startups, growing businesses, and established brands starting from under ₹10,000 up to comprehensive enterprise packages. Contact us for a clear, no-obligation quote tailored to your budget.",
    category: "Pricing"
  },
  {
    id: "faq-10",
    question: "How long does a website take?",
    answer: "A standard business website or high-converting landing page typically takes 1 to 3 weeks depending on the complexity, number of pages, and how quickly content assets are finalized. We establish a clear timeline during our Discovery phase and stick to it.",
    category: "Process"
  },
  {
    id: "faq-11",
    question: "How can I start a project?",
    answer: "Starting is simple: click the 'Start a Project' button on this website, fill out our quick project enquiry form, or reach out directly to us via WhatsApp or email. We will review your requirements and get back to you with an actionable plan within 24 hours.",
    category: "Process"
  }
];
