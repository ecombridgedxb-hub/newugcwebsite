import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import HowItWorks from './components/HowItWorks';
import BrandPartners from './components/BrandPartners';
import AIFeature from './components/AIFeature';
import Footer from './components/Footer';
import CreatorModal from './components/CreatorModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#6B7280]">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <ValueProp />
        <HowItWorks />
        <BrandPartners />
        <AIFeature />
      </main>

      <Footer />
      
      <CreatorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;
