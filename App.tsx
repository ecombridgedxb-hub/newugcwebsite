import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Criteria from './components/Criteria';
import FAQ from './components/FAQ';
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
    <div className="min-h-screen font-body">
      <Navbar onOpenModal={openModal} />

      <main>
        <Hero onOpenModal={openModal} />
        <About />
        <HowItWorks />
        <Criteria />
        <FAQ />
      </main>

      <Footer />

      <AnimatePresence>
        {isModalOpen && <CreatorModal isOpen={isModalOpen} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
