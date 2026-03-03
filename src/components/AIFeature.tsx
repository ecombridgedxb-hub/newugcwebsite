import React from 'react';
import { Cpu, Activity } from 'lucide-react';

const AIFeature: React.FC = () => {
  return (
    <section className="py-32 bg-[#F9FAFB] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center gap-24 lg:gap-32">
          
          <div className="w-full md:w-1/2">
            <div className="inline-block px-4 py-1.5 mb-8 bg-[#D1FAE5] text-[#1FAE9A] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full border border-[#1FAE9A]/10">
              Technology Stack
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-10 leading-tight tracking-tight">
              Aesthetic matching, <br/><span className="text-[#1FAE9A] italic">automated.</span>
            </h2>
            <p className="text-lg text-[#6B7280] mb-12 leading-relaxed font-medium">
              Our proprietary Smart Match™ engine ensures that brand aesthetics and creator styles are perfectly aligned for every campaign.
            </p>
            
            <div className="space-y-8">
              <div className="flex space-x-6 items-start group">
                <div className="text-[#1FAE9A] mt-1 p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                  <Cpu style={{ width: 24, height: 24 }} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-lg mb-2">Pattern Recognition</h4>
                  <p className="text-[#6B7280] text-sm font-medium leading-relaxed">Automated analysis of visual consistency and creative style profiles.</p>
                </div>
              </div>
              <div className="flex space-x-6 items-start group">
                <div className="text-[#1FAE9A] mt-1 p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                  <Activity style={{ width: 24, height: 24 }} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-lg mb-2">Engagement Auditing</h4>
                  <p className="text-[#6B7280] text-sm font-medium leading-relaxed">Real-time auditing of reach and authentic audience demographics.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-white p-14 rounded-[4rem] shadow-soft border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#1FAE9A]/5 rounded-full -translate-y-24 translate-x-24 blur-2xl"></div>
              <div className="space-y-8 relative z-10">
                <div className="flex items-center justify-between p-6 bg-[#D1FAE5]/40 rounded-[2rem] border border-[#1FAE9A]/10">
                  <span className="text-sm font-bold text-[#0F172A]">Visual Alignment</span>
                  <span className="text-[#1FAE9A] font-bold text-lg">98.2%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-[#1FAE9A] rounded-full shadow-[0_0_10px_rgba(31,174,154,0.4)]"></div>
                </div>
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <span className="text-sm font-bold text-[#0F172A]">Market Reach</span>
                  <span className="text-[#0F172A] font-bold text-lg">High</span>
                </div>
                <button className="w-full py-5 bg-[#0F172A] text-white font-bold rounded-[2rem] group-hover:bg-[#1FAE9A] transition-all duration-500 transform group-hover:scale-[1.02] shadow-xl">
                  Run Profile Audit
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AIFeature;
