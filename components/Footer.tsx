import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-extrabold tracking-tight text-heading mb-8 block">
              UAE<span className="text-primary">Creators</span>
            </span>
            <p className="text-body text-sm font-medium mb-10 leading-relaxed max-w-xs">
              Defining the next chapter of the Middle Eastern creator economy through curation, technology, and trust.
            </p>
            <div className="flex space-x-8 text-heading">
              <Instagram className="cursor-pointer hover:text-primary transition-all duration-300 transform hover:scale-110" size={24} />
              <Linkedin className="cursor-pointer hover:text-primary transition-all duration-300 transform hover:scale-110" size={24} />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs mb-8 text-heading uppercase tracking-[0.25em]">Network</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li><a href="#" className="text-body hover:text-primary transition-colors">Apply to Join</a></li>
              <li><a href="#" className="text-body hover:text-primary transition-colors">Curated Brands</a></li>
              <li><a href="#" className="text-body hover:text-primary transition-colors">Waitlist FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs mb-8 text-heading uppercase tracking-[0.25em]">Ecosystem</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li><a href="#" className="text-body hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-body hover:text-primary transition-colors">Membership Terms</a></li>
              <li><a href="#" className="text-body hover:text-primary transition-colors">Guidelines</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs mb-8 text-heading uppercase tracking-[0.25em]">Connect</h4>
            <p className="text-body text-sm font-medium leading-relaxed">
              DIFC Innovation Hub<br />
              Dubai, United Arab Emirates<br />
              <span className="mt-6 block font-bold text-heading text-lg">hello@uaecreators.co</span>
            </p>
          </div>
        </div>

        <div className="pt-16 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">
          <div className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} UAE Creators Marketplace</div>
          <div className="flex items-center">
            <span className="mr-2">Curated in Dubai</span>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;