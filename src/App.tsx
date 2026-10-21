import { useState, useEffect } from 'react';
import { usePageRouter, type PageId } from './hooks/usePageRouter';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProjectModal } from './components/ProjectModal';
import { BookingModal } from './components/BookingModal';
import { HawkFlightCanvas } from './components/HawkFlightCanvas';
import { SpotlightCursor } from './components/SpotlightCursor';
import { KineticAurora } from './components/ui/KineticAurora';
import { AnimatePresence } from 'framer-motion';
import { trackEvent } from './utils/analytics';
import { SERVICES_DATA, PORTFOLIO_DATA } from './data/agencyData';

// Distinct Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { StartProjectPage } from './pages/StartProjectPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';

// Portal & Authentication Pages
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ClientDashboardPage } from './pages/ClientDashboardPage';

const PAGE_METADATA: Record<PageId, { title: string; description: string }> = {
  home: {
    title: 'Evo Hawks | Creative Production, Branding, Marketing & Web Agency',
    description: 'Evo Hawks delivers high-converting websites, cinematic video production, data-driven paid advertising, and comprehensive digital marketing.',
  },
  services: {
    title: 'Complete Services Catalogue | Evo Hawks Digital Agency',
    description: 'Explore all 12 core agency disciplines: Creative Production, Social Media, Meta Ads, Influencer Marketing, SEO, Web Development, Shopify, YouTube, Branding, Email & WhatsApp, Strategy, and Maintenance.',
  },
  'service-detail': {
    title: 'Service Deep-Dive & Deliverables | Evo Hawks',
    description: 'Detailed scope, concrete deliverables, working process, and pricing references for Evo Hawks services.',
  },
  work: {
    title: 'Portfolio & Verified Case Studies | Evo Hawks',
    description: 'Explore real client deliverables and production-grade concept projects across web development, brand identity, and video production.',
  },
  portfolio: {
    title: 'Portfolio & Verified Case Studies | Evo Hawks',
    description: 'Explore real client deliverables and production-grade concept projects across web development, brand identity, and video production.',
  },
  'case-study-detail': {
    title: 'Case Study Breakdown | Evo Hawks Portfolio',
    description: 'Explore client challenges, strategic approaches, deliverables, and technical implementation details.',
  },
  packages: {
    title: 'Transparent Packages & Pricing | Evo Hawks',
    description: 'Explore clear, itemized packages for web development, video production, social media management, SEO, and Meta ads with zero hidden markups.',
  },
  'start-project': {
    title: 'Start a Project Intake | Evo Hawks',
    description: 'Qualify your project scope, budget, and timeline to receive an itemized proposal and kick-off roadmap from Evo Hawks.',
  },
  'why-us': {
    title: 'Why Choose Evo Hawks | Architecture & Velocity',
    description: 'Direct senior engineer communication, sub-second web performance, 100% IP ownership, and transparent sprint cycles.',
  },
  about: {
    title: 'About Us & Leadership Disciplines | Evo Hawks',
    description: 'The engineering, creative direction, and growth marketing disciplines behind Evo Hawks digital agency.',
  },
  process: {
    title: 'Transparent 5-Stage Sprint Workflow | Evo Hawks',
    description: 'Our structured 5-stage sprint framework: Discovery, Scope Approval, Production, Revisions, and Launch Handover.',
  },
  faq: {
    title: 'Agency FAQs & Operational Policies | Evo Hawks',
    description: 'Clear answers on project scope, timelines, revision limits, ad spend billing, code ownership, and analytics reporting.',
  },
  contact: {
    title: 'Contact Us | Evo Hawks Digital Agency',
    description: 'Connect with our team directly via email, phone, or verified WhatsApp for project inquiries and consultations.',
  },
  'privacy-policy': {
    title: 'Privacy Policy | Evo Hawks',
    description: 'Transparent privacy and data handling practices. We do not sell client data or track without consent.',
  },
  terms: {
    title: 'Terms of Service | Commercial Agreement | Evo Hawks',
    description: 'Clear commercial terms, 100% intellectual property ownership handover, revision policies, and billing structures.',
  },
  'refund-policy': {
    title: 'Cancellation & Refund Policy | Evo Hawks',
    description: 'Fair professional services cancellation terms and pro-rata milestone accounting policies.',
  },
  login: {
    title: 'Client & Admin Portal Demo | Evo Hawks',
    description: 'Preview client milestone tracking and admin workspace capabilities.',
  },
  'client-portal': {
    title: 'Client Workspace | Evo Hawks',
    description: 'Review project milestones, deliverables, and assets.',
  },
  'admin-portal': {
    title: 'Agency Ops Portal | Evo Hawks',
    description: 'Internal workspace for agency operations and client management.',
  },
};

function AppContent() {
  const { currentPage, currentSlug, navigateTo } = usePageRouter();
  const { user } = useAuth();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>('Website Development');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTopic, setBookingTopic] = useState<string>('');

  // Synchronize document title, meta description, and page view analytics
  useEffect(() => {
    let title = PAGE_METADATA[currentPage]?.title || PAGE_METADATA.home.title;
    let description = PAGE_METADATA[currentPage]?.description || PAGE_METADATA.home.description;

    // Dynamic SEO metadata for specific service detail pages
    if (currentPage === 'service-detail' && currentSlug) {
      const match = SERVICES_DATA.find(s => s.slug === currentSlug);
      if (match) {
        title = `${match.title} | Evo Hawks Digital Agency`;
        description = `${match.tagline} Deliverables, prerequisites, process, and transparent scopes from Evo Hawks.`;
      }
    }

    // Dynamic SEO metadata for specific case studies
    if (currentPage === 'case-study-detail' && currentSlug) {
      const match = PORTFOLIO_DATA.find(p => p.slug === currentSlug);
      if (match) {
        title = `${match.title} (${match.client}) | Case Study | Evo Hawks`;
        description = `${match.overview} Work delivered: ${match.deliverables.slice(0, 3).join(', ')}.`;
      }
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Privacy-preserving page view tracking
    trackEvent('page_view', { page: currentPage, slug: currentSlug || '', title });

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage, currentSlug]);

  const handleOpenProjectModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForModal(serviceName);
    } else {
      setSelectedServiceForModal('Website Development');
    }
    setProjectModalOpen(true);
  };

  const handleOpenBookingModal = (topic?: string) => {
    setBookingTopic(topic || '');
    setBookingModalOpen(true);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'start-project':
        return <StartProjectPage key="start-project" onNavigate={navigateTo} />;
      case 'packages':
        return (
          <PackagesPage 
            key="packages" 
            onOpenProjectModal={handleOpenProjectModal} 
            onNavigate={navigateTo} 
          />
        );
      case 'service-detail':
        return (
          <ServiceDetailPage 
            key={`service-${currentSlug || 'index'}`} 
            slug={currentSlug || ''} 
            onOpenProjectModal={handleOpenProjectModal}
            onOpenBookingModal={handleOpenBookingModal}
            onNavigate={navigateTo}
          />
        );
      case 'case-study-detail':
        return (
          <CaseStudyDetailPage 
            key={`case-study-${currentSlug || 'index'}`} 
            slug={currentSlug || ''} 
            onOpenProjectModal={handleOpenProjectModal}
            onNavigate={navigateTo}
          />
        );
      case 'privacy-policy':
        return <PrivacyPolicyPage key="privacy-policy" onNavigate={navigateTo} />;
      case 'terms':
        return <TermsPage key="terms" onNavigate={navigateTo} />;
      case 'refund-policy':
        return <RefundPolicyPage key="refund-policy" onNavigate={navigateTo} />;
      case 'login':
        return <LoginPage key="login" onNavigate={navigateTo} />;
      case 'admin-portal':
        if (user && user.role === 'admin') {
          return <AdminDashboardPage key="admin-portal" onNavigate={navigateTo} />;
        }
        return <LoginPage key="login-admin-guard" onNavigate={navigateTo} />;
      case 'client-portal':
        if (user) {
          return <ClientDashboardPage key="client-portal" onNavigate={navigateTo} />;
        }
        return <LoginPage key="login-client-guard" onNavigate={navigateTo} />;
      case 'services':
        return (
          <ServicesPage 
            key="services" 
            onOpenProjectModal={handleOpenProjectModal} 
            onOpenBookingModal={handleOpenBookingModal} 
            onNavigate={navigateTo}
          />
        );
      case 'work':
        return <WorkPage key="work" onOpenProjectModal={handleOpenProjectModal} onNavigate={navigateTo} />;
      case 'why-us':
        return <WhyUsPage key="why-us" onOpenProjectModal={handleOpenProjectModal} />;
      case 'about':
        return <AboutPage key="about" onOpenProjectModal={handleOpenProjectModal} />;
      case 'process':
        return <ProcessPage key="process" onOpenProjectModal={handleOpenProjectModal} />;
      case 'faq':
        return <FAQPage key="faq" onOpenProjectModal={handleOpenProjectModal} />;
      case 'contact':
        return <ContactPage key="contact" preselectedService={selectedServiceForModal} />;
      case 'home':
      default:
        return (
          <HomePage
            key="home"
            onOpenProjectModal={handleOpenProjectModal}
            onNavigate={navigateTo}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0284C7] selection:text-white font-sans-clean overflow-x-hidden flex flex-col">
      {/* Skip to Content for Screen Readers & Keyboard Nav */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Living Motion Graphic Aurora Mesh */}
      <KineticAurora />

      {/* Interactive Aerodynamic Ambient Canvas Background */}
      <HawkFlightCanvas />

      {/* Desktop Luxury Ambient Cursor Spotlight */}
      <SpotlightCursor />

      {/* Sticky Frosted Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenProjectModal={() => handleOpenProjectModal()}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Main Dynamic Page Router Container with Smooth Transitions */}
      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 outline-none">
        <AnimatePresence mode="wait">
          {renderActivePage()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsApp />

      {/* Instant Project Inquiry Modal */}
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        preselectedService={selectedServiceForModal}
      />

      {/* Consultation Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedTopic={bookingTopic}
      />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
