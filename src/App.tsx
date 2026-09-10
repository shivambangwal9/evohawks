import { useState } from 'react';
import { usePageRouter } from './hooks/usePageRouter';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProjectModal } from './components/ProjectModal';
import { HawkFlightCanvas } from './components/HawkFlightCanvas';
import { SpotlightCursor } from './components/SpotlightCursor';
import { KineticAurora } from './components/ui/KineticAurora';
import { AnimatePresence } from 'framer-motion';

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

function AppContent() {
  const { currentPage, navigateTo } = usePageRouter();
  const { user } = useAuth();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>('Website Development');

  const handleOpenProjectModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForModal(serviceName);
    } else {
      setSelectedServiceForModal('Website Development');
    }
    setProjectModalOpen(true);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage key="login" onNavigate={navigateTo} />;
      case 'admin-portal':
        // If not admin, redirect or show login
        if (user && user.role === 'admin') {
          return <AdminDashboardPage key="admin-portal" onNavigate={navigateTo} />;
        }
        return <LoginPage key="login-admin-guard" onNavigate={navigateTo} />;
      case 'client-portal':
        // If not logged in, prompt login
        if (user) {
          return <ClientDashboardPage key="client-portal" onNavigate={navigateTo} />;
        }
        return <LoginPage key="login-client-guard" onNavigate={navigateTo} />;
      case 'services':
        return <ServicesPage key="services" onOpenProjectModal={handleOpenProjectModal} />;
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
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0284C7] selection:text-white font-sans-clean overflow-x-hidden flex flex-col">
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
      />

      {/* Main Dynamic Page Router Container with Smooth Transitions */}
      <main className="relative z-10 flex-1">
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
