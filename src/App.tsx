import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import HowItWorks from './components/HowItWorks';
import WhatIs from './components/WhatIs';
import FAQ from './components/FAQ';
import BrandPartners from './components/BrandPartners';
import Footer from './components/Footer';
import CreatorModal from './components/CreatorModal';
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';
import ContactModal from './components/ContactModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#6B7280]">
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <WhatIs />
        <HowItWorks />
        <ValueProp />
        <BrandPartners />
        <FAQ />
      </main>

      <Footer
        onOpenModal={() => setIsModalOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <CreatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;
