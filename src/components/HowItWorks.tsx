import React from 'react';
import { UserPlus, Package, Share2 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    { title: "Apply" },
    { title: "Review" },
    { title: "Onboarding" },
    { title: "Collaborate" },
    { title: "Grow" }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
          Simple Process, Transparent Expectations
        </h2>
        <p className="text-[#6B7280] font-medium mb-20 text-lg">
          From application to collaboration in 5 clear steps
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-px bg-gray-200 -z-10"></div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center bg-white px-4">
              <div className="w-14 h-14 bg-[#1FAE9A] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-sm">
                {index + 1}
              </div>
              <h3 className="font-bold text-[#0F172A] text-sm">{step.title}</h3>
            </div>
          ))}
        </div>

        <button className="px-8 py-3 border-2 border-[#1FAE9A] text-[#1FAE9A] font-bold text-sm rounded-lg hover:bg-[#1FAE9A]/5 transition-all">
          Learn More &rarr;
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
