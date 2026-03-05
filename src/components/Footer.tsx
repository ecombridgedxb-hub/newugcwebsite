import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
interface FooterProps {
  onOpenModal: () => void;
  onOpenPrivacy: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal, onOpenPrivacy }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
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
            <p className="text-[#6B7280] text-sm font-medium leading-relaxed max-w-xs">
              Defining the next chapter of the Middle Eastern creator economy through curation, technology, and trust.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs mb-8 text-[#0F172A] uppercase tracking-[0.25em]">Network</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li><button onClick={onOpenModal} className="text-[#6B7280] hover:text-[#1FAE9A] transition-colors">Apply to Join</button></li>
              <li><a href="#partners" className="text-[#6B7280] hover:text-[#1FAE9A] transition-colors">Curated Brands</a></li>
              <li><a href="#faq" className="text-[#6B7280] hover:text-[#1FAE9A] transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs mb-8 text-[#0F172A] uppercase tracking-[0.25em]">Ecosystem</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li><button onClick={onOpenPrivacy} className="text-[#6B7280] hover:text-[#1FAE9A] transition-colors">Privacy Policy</button></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#1FAE9A] transition-colors">Membership Terms</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#1FAE9A] transition-colors">Guidelines</a></li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="font-bold text-xs mb-8 text-[#0F172A] uppercase tracking-[0.25em]">Connect</h4>
            <div className="text-[#6B7280] text-sm font-medium leading-relaxed">
              Dubai, United Arab Emirates<br />
              <span className="mt-4 block font-bold text-[#0F172A]">hello@curatedcircle.co</span>
              <span className="mt-1 block font-bold text-[#0F172A]">+971 50 328 9387</span>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">
          <div className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} CuratedCircle Marketplace</div>
          <div className="flex items-center">
            <span className="mr-2">Curated in Dubai</span>
            <div className="w-1.5 h-1.5 bg-[#1FAE9A] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
