import React from 'react';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

const ValueProp: React.FC = () => {
  return (
    <section id="creators" className="py-32 bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          
          <div className="order-2 md:order-1">
            <h2 className="text-4xl lg:text-6xl font-extrabold text-[#0F172A] mb-8 tracking-tight leading-tight">
              Curated for creators with <span className="text-[#1FAE9A] italic">vision.</span>
            </h2>
            <p className="text-lg text-[#6B7280] mb-12 leading-relaxed font-medium">
              We focus on premium quality. Our platform connects you with high-end brands that value your unique perspective and aesthetic authenticity.
            </p>
            <div className="space-y-10">
              <div className="flex items-start space-x-6 group">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                  <ShieldCheck className="text-[#1FAE9A]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xl mb-2">Secure Ecosystem</h4>
                  <p className="text-[#6B7280] text-sm font-medium leading-relaxed">Transparent contracts and verified payments for every collaboration.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                  <Sparkles className="text-[#1FAE9A]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xl mb-2">Premium Access</h4>
                  <p className="text-[#6B7280] text-sm font-medium leading-relaxed">Unlock exclusive opportunities with the UAE's top luxury and lifestyle brands.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                  <Heart className="text-[#1FAE9A]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xl mb-2">Community Driven</h4>
                  <p className="text-[#6B7280] text-sm font-medium leading-relaxed">A supportive network designed to help you scale your creative influence.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="rounded-[3rem] overflow-hidden shadow-soft h-72 bg-gray-100">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" alt="UGC Creator" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-soft h-56 bg-gray-100">
                <img src="https://images.unsplash.com/photo-1606103836293-0a063ee20566?auto=format&fit=crop&q=80&w=600" alt="UGC Creator" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="pt-16 space-y-6">
              <div className="rounded-[3rem] overflow-hidden shadow-soft h-56 bg-gray-100">
                <img src="https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=80&w=600" alt="UGC Creator" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-soft h-72 bg-gray-100">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600" alt="UGC Creator" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
