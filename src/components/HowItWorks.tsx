import React from 'react';
import { UserPlus, Package, Share2 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-24 tracking-tight">The Modern Process</h2>
        <div className="grid md:grid-cols-3 gap-20">
          <div className="relative group text-center">
            <div className="w-28 h-28 bg-[#D1FAE5] rounded-[2.5rem] flex items-center justify-center text-[#1FAE9A] mx-auto mb-10 transition-all duration-700 group-hover:-rotate-6 group-hover:shadow-2xl group-hover:shadow-[#1FAE9A]/10">
              <UserPlus style={{ width: 36, height: 36 }} />
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-5">Apply to Join</h3>
            <p className="text-[#6B7280] font-medium leading-relaxed px-6 opacity-90">Apply for access. We curate our community weekly to ensure a premium standard for brands.</p>
            <div className="hidden lg:block absolute top-14 left-[75%] w-1/2 h-px bg-gray-100"></div>
          </div>
          <div className="relative group text-center">
            <div className="w-28 h-28 bg-[#D1FAE5] rounded-[2.5rem] flex items-center justify-center text-[#1FAE9A] mx-auto mb-10 transition-all duration-700 group-hover:-rotate-6 group-hover:shadow-2xl group-hover:shadow-[#1FAE9A]/10">
              <Package style={{ width: 36, height: 36 }} />
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-5">Curated Drops</h3>
            <p className="text-[#6B7280] font-medium leading-relaxed px-6 opacity-90">Receive bespoke products from luxury partners delivered to your door in the UAE.</p>
            <div className="hidden lg:block absolute top-14 left-[75%] w-1/2 h-px bg-gray-100"></div>
          </div>
          <div className="relative group text-center">
            <div className="w-28 h-28 bg-[#D1FAE5] rounded-[2.5rem] flex items-center justify-center text-[#1FAE9A] mx-auto mb-10 transition-all duration-700 group-hover:-rotate-6 group-hover:shadow-2xl group-hover:shadow-[#1FAE9A]/10">
              <Share2 style={{ width: 36, height: 36 }} />
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-5">Create & Scale</h3>
            <p className="text-[#6B7280] font-medium leading-relaxed px-6 opacity-90">Produce authentic content and grow your portfolio with global brands.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
