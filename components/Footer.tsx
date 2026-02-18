import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-extrabold tracking-tight text-heading mb-4 block">
              Curated<span className="text-primary">Circle</span>
            </span>
            <p className="text-body text-sm font-medium mb-10 leading-relaxed max-w-xs">
              A carefully curated community of UAE-based micro-influencers who collaborate with quality D2C brands.
            </p>
            <div className="flex space-x-8 text-heading">
              <Instagram className="cursor-pointer hover:text-primary transition-all duration-300 transform hover:scale-110" size={24} />
              <Linkedin className="cursor-pointer hover:text-primary transition-all duration-300 transform hover:scale-110" size={24} />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs mb-8 text-heading uppercase tracking-[0.25em]">Community</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li><a href="#" className="text-body hover:text-primary transition-colors">Apply to Join</a></li>
              <li><a href="#how-it-works" className="text-body hover:text-primary transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs mb-8 text-heading uppercase tracking-[0.25em]">Legal</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li><a href="#" className="text-body hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-body hover:text-primary transition-colors">Terms of Use</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs mb-8 text-heading uppercase tracking-[0.25em]">Contact</h4>
            <p className="text-body text-sm font-medium leading-relaxed">
              Operated by EcomBridge<br />
              Dubai, United Arab Emirates<br />
              <span className="mt-6 block font-bold text-heading text-lg">hello@curatedcircle.co</span>
            </p>
          </div>
        </div>

        <div className="pt-16 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">
          <div className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} CuratedCircle by EcomBridge</div>
          <div className="flex items-center">
            <span className="mr-2">Made in Dubai with</span>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;