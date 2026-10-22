import { useState, useEffect, lazy, Suspense } from 'react';
import { usePageRouter } from './hooks/usePageRouter';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SuperAdminFloatingBar } from './components/SuperAdminFloatingBar';
import { PostPortfolioModal } from './components/PostPortfolioModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProjectModal } from './components/ProjectModal';
import { BookingModal } from './components/BookingModal';
import { HawkFlightCanvas } from './components/HawkFlightCanvas';
import { SpotlightCursor } from './components/SpotlightCursor';
import { KineticAurora } from './components/ui/KineticAurora';
import { SEOHead } from './components/SEOHead';
import { AnimatePresence } from 'framer-motion';
import { trackEvent } from './utils/analytics';

// Keep HomePage eagerly loaded for immediate First Contentful Paint
import { HomePage } from './pages/HomePage';

// Lazy-load subpages for optimal initial bundle size and sub-2.5s Core Web Vitals LCP
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then(m => ({ default: m.WorkPage })));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then(m => ({ default: m.CaseStudyDetailPage })));
const PackagesPage = lazy(() => import('./pages/PackagesPage').then(m => ({ default: m.PackagesPage })));
const StartProjectPage = lazy(() => import('./pages/StartProjectPage').then(m => ({ default: m.StartProjectPage })));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage').then(m => ({ default: m.WhyUsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then(m => ({ default: m.ProcessPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage').then(m => ({ default: m.RefundPolicyPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const ClientDashboardPage = lazy(() => import('./pages/ClientDashboardPage').then(m => ({ default: m.ClientDashboardPage })));

// Sleek Jet Black Route Loading Fallback
function RouteLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="relative w-12 h-12 flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-[#0099FF]/20 animate-ping" />
        <div className="w-8 h-8 rounded-full border-2 border-[#0099FF] border-t-transparent animate-spin" />
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Loading View...</span>
    </div>
  );
}

function AppContent() {
  const { currentPage, currentSlug, navigateTo } = usePageRouter();
  const { user } = useAuth();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>('Website Development');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTopic, setBookingTopic] = useState<string>('');

  // Page view analytics dispatch
  useEffect(() => {
    trackEvent('page_view', { 
      page: currentPage, 
      slug: currentSlug || '',
      url: window.location.href 
    });
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
      case 'blog':
        return <BlogPage key="blog" onNavigate={navigateTo} />;
      case 'blog-detail':
        return (
          <BlogDetailPage 
            key={`blog-detail-${currentSlug || 'index'}`} 
            slug={currentSlug || ''} 
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
        if (user && (user.role === 'admin' || user.role === 'superadmin')) {
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
      case 'portfolio':
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

  const { addPortfolioItem } = useSiteConfig();
  const { theme } = useTheme();
  const [floatingPostModalOpen, setFloatingPostModalOpen] = useState(false);

  return (
    <div className={`relative min-h-screen ${theme === 'light' ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#050508] text-[#F8FAFC]'} selection:bg-[#FF1361] selection:text-white font-sans-clean overflow-x-hidden flex flex-col transition-colors duration-300`}>
      {/* Dynamic SEO Head Management (Canonical, OpenGraph, JSON-LD Schemas) */}
      <SEOHead page={currentPage} slug={currentSlug} />

      {/* Skip to Content for Screen Readers & Keyboard Nav */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gradient-to-r focus:from-[#0099FF] focus:to-[#FF1361] focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none font-bold"
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

      {/* Main Dynamic Page Router Container with Suspense Code Splitting */}
      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 outline-none pb-28 lg:pb-0">
        <Suspense fallback={<RouteLoadingFallback />}>
          <AnimatePresence mode="wait">
            {renderActivePage()}
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Action Widget (Desktop) */}
      <FloatingWhatsApp />

      {/* Floating Native-Style Mobile Bottom Navigation Dock */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenProjectModal={() => handleOpenProjectModal()}
      />

      {/* Super Admin Floating Quick Control Dock */}
      <SuperAdminFloatingBar
        onOpenPostModal={() => setFloatingPostModalOpen(true)}
        onNavigate={navigateTo}
        currentPage={currentPage}
      />

      {/* Super Admin Quick Post Modal */}
      <PostPortfolioModal
        isOpen={floatingPostModalOpen}
        onClose={() => setFloatingPostModalOpen(false)}
        onSave={(item) => addPortfolioItem(item)}
      />

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
      <SiteConfigProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SiteConfigProvider>
    </AuthProvider>
  );
}

export default App;
