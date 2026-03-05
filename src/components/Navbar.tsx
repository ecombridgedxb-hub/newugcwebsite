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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1FAE9A] rounded-xl flex items-center justify-center text-white font-bold text-xl tracking-tighter shadow-sm">
              CC
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-[#0F172A] leading-none">
                CuratedCircle
              </span>
              <span className="text-[10px] font-semibold text-[#6B7280] leading-none mt-1">
                by EcomBridge
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-sm font-bold text-[#1FAE9A] transition-colors">Home</a>
            <a href="#how-it-works" className="text-sm font-semibold text-[#6B7280] hover:text-[#0F172A] transition-colors">How It Works</a>
            <a href="#terms" className="text-sm font-semibold text-[#6B7280] hover:text-[#0F172A] transition-colors">Terms</a>
            <a href="#contact" className="text-sm font-semibold text-[#6B7280] hover:text-[#0F172A] transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenModal}
              className="px-6 py-2.5 bg-[#1FAE9A] text-white text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#1FAE9A]/20 transition-all active:scale-95"
            >
              Apply to Join
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#0F172A] p-2"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white fixed inset-x-0 top-[72px] h-screen shadow-2xl p-8 flex flex-col space-y-6">
          <a href="#creators" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#0F172A]">Creators</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#0F172A]">How it Works</a>
          <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#0F172A]">Pricing</a>
          <div className="pt-6">
            <button
              onClick={() => { onOpenModal(); setIsMobileMenuOpen(false); }}
              className="w-full py-4 bg-[#1FAE9A] text-white font-bold rounded-2xl shadow-lg"
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
