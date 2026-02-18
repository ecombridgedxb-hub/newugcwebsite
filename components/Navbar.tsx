import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-extrabold tracking-tight text-heading flex flex-col leading-none">
              <span>Curated<span className="text-primary">Circle</span></span>
              <span className="text-[10px] text-body font-medium tracking-wide mt-0.5">by EcomBridge</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-sm font-semibold text-heading hover:text-primary transition-colors">Home</a>
            <a href="#how-it-works" className="text-sm font-semibold text-heading hover:text-primary transition-colors">How It Works</a>
            <button onClick={onOpenModal} className="text-sm font-semibold text-heading hover:text-primary transition-colors">Apply</button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenModal}
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              Apply to Join
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-heading p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white fixed inset-x-0 top-[72px] h-screen shadow-2xl p-8 flex flex-col space-y-6 animate-in slide-in-from-top duration-300">
          <a href="#creators" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-heading">Creators</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-heading">How it Works</a>
          <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-heading">Pricing</a>
          <div className="pt-6">
            <button
              onClick={() => { onOpenModal(); setIsMobileMenuOpen(false); }}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg"
            >
              Apply to Join
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;