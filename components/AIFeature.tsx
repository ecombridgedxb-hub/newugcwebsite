import React from 'react';
import { Cpu, Zap, Activity } from 'lucide-react';

const AIFeature: React.FC = () => {
  return (
    <section className="py-32 bg-bgMain overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center gap-24 lg:gap-32">
          
          <div className="w-full md:w-1/2">
            <div className="inline-block px-4 py-1.5 mb-8 bg-accent text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-full border border-primary/10">
              Technology Stack
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-heading mb-10 leading-tight tracking-tight">
              Aesthetic matching, <br/><span className="text-primary italic">automated.</span>
            </h2>
            <p className="text-lg text-body mb-12 leading-relaxed font-medium">
              Our proprietary Smart Match™ engine ensures that brand aesthetics and creator styles are perfectly aligned for every campaign.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: <Cpu size={24} />, title: "Pattern Recognition", desc: "Automated analysis of visual consistency and creative style profiles." },
                { icon: <Activity size={24} />, title: "Engagement Auditing", desc: "Real-time auditing of reach and authentic audience demographics." }
              ].map((item, idx) => (
                <div key={idx} className="flex space-x-6 items-start group">
                  <div className="text-primary mt-1 p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-heading text-lg mb-2">{item.title}</h4>
                    <p className="text-body text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-white p-14 rounded-[4rem] shadow-soft border border-gray-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -translate-y-24 translate-x-24 blur-2xl"></div>
               <div className="space-y-8 relative z-10">
                  <div className="flex items-center justify-between p-6 bg-accent/40 rounded-[2rem] border border-primary/10">
                    <span className="text-sm font-bold text-heading">Visual Alignment</span>
                    <span className="text-primary font-bold text-lg">98.2%</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full w-[94%] bg-primary rounded-full shadow-[0_0_10px_rgba(31,174,154,0.4)]"></div>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                    <span className="text-sm font-bold text-heading">Market Reach</span>
                    <span className="text-heading font-bold text-lg">High</span>
                  </div>
                  <button className="w-full py-5 bg-heading text-white font-bold rounded-[2rem] group-hover:bg-primary transition-all duration-500 transform group-hover:scale-[1.02] shadow-xl">
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