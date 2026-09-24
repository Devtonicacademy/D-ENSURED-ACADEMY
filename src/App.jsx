import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';

import AuthModal from './components/modals/AuthModal';
import ServiceBookingModal from './components/modals/ServiceBookingModal';
import CourseDetailModal from './components/modals/CourseDetailModal';
import PaymentModal from './components/modals/PaymentModal';

import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import CoursesPage from './components/pages/CoursesPage';
import ServicesPage from './components/pages/ServicesPage';
import CBTPracticePage from './components/pages/CBTPracticePage';
import AdmissionsPage from './components/pages/AdmissionsPage';
import BlogResourcesPage from './components/pages/BlogResourcesPage';
import ResultsPage from './components/pages/ResultsPage';
import ContactPage from './components/pages/ContactPage';
import StudentDashboard from './components/pages/StudentDashboard';
import AdminDashboard from './components/pages/AdminDashboard';

function MainContent() {
  const { activeTab } = useApp();

  const renderView = () => {
    switch (activeTab) {
      case 'HOME':
        return <HomePage />;
      case 'ABOUT':
        return <AboutPage />;
      case 'COURSES':
        return <CoursesPage />;
      case 'SERVICES':
        return <ServicesPage />;
      case 'CBT':
        return <CBTPracticePage />;
      case 'ADMISSIONS':
        return <AdmissionsPage />;
      case 'BLOG':
        return <BlogResourcesPage />;
      case 'RESULTS':
        return <ResultsPage />;
      case 'CONTACT':
        return <ContactPage />;
      case 'DASHBOARD':
        return <StudentDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full">
        {renderView()}
      </main>

      <Footer />

      {/* Global Floating Action Button */}
      <FloatingWhatsApp />

      {/* Global Modals */}
      <AuthModal />
      <ServiceBookingModal />
      <CourseDetailModal />
      <PaymentModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <MainContent />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
