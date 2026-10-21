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

// Distinct Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

// Portal & Authentication Pages
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ClientDashboardPage } from './pages/ClientDashboardPage';

const PAGE_METADATA: Record<PageId, { title: string; description: string }> = {
  home: {
    title: 'Evo Hawks | Digital Creative & Marketing Agency',
    description: 'Full-service digital agency delivering sub-second websites, high-retention video creative, technical SEO, and paid performance marketing.',
  },
  services: {
    title: 'Services & Deliverables | Evo Hawks Digital Agency',
    description: 'Explore our 6 core disciplines: Website Engineering, Graphic Design, Video & Reels, Social Media Management, SEO, and Performance Marketing.',
  },
  work: {
    title: 'Portfolio & Verified Case Studies | Evo Hawks',
    description: 'Explore production projects and concept benchmarks across web development, brand identity, and video production.',
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
    title: 'Start a Project | Contact Evo Hawks',
    description: 'Get in touch with our team for website engineering, creative design, or digital marketing inquiries.',
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
  const { currentPage, navigateTo } = usePageRouter();
  const { user } = useAuth();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>('Website Development');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTopic, setBookingTopic] = useState<string>('');

  // Synchronize document title, meta description, and page view analytics
  useEffect(() => {
    const meta = PAGE_METADATA[currentPage] || PAGE_METADATA.home;
    document.title = meta.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', meta.description);

    // Privacy-preserving page view tracking
    trackEvent('page_view', { page: currentPage, title: meta.title });

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

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
          />
        );
      case 'work':
        return <WorkPage key="work" onOpenProjectModal={handleOpenProjectModal} />;
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
