
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import HowItWorks from './components/HowItWorks';
import BrandPartners from './components/BrandPartners';
import AIFeature from './components/AIFeature';
import Footer from './components/Footer';
import CreatorModal from './components/CreatorModal';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for admin flag in URL to show hidden dashboard
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen">
      <Navbar onOpenModal={openModal} />
      
      <main>
        <Hero onOpenModal={openModal} />
        <ValueProp />
        <HowItWorks />
        <BrandPartners />
        <AIFeature />
      </main>

      <Footer />

      <AnimatePresence>
        {isModalOpen && <CreatorModal isOpen={isModalOpen} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
};

// Simple import for AnimatePresence since it was used but not imported in the original App.tsx snippet provided
import { AnimatePresence } from 'framer-motion';

export default App;
