import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    { title: "Apply" },
    { title: "Review" },
    { title: "Onboarding" },
    { title: "Collaborate" },
    { title: "Grow" }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
          Simple Process, Transparent Expectations
        </h2>
        <p className="text-[#6B7280] font-medium mb-12 lg:mb-20 text-lg">
          From application to collaboration in 5 clear steps
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 w-full">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center bg-white justify-center w-32 relative">
                <div className="w-16 h-16 bg-[#1FAE9A] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-md z-10 relative">
                  {index + 1}
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm z-10 bg-white px-2 py-1 rounded-md text-center">{step.title}</h3>
              </div>

              {/* Render an arrow for all steps EXCEPT the last one */}
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center text-[#1FAE9A] opacity-50">
                  <ArrowRight className="hidden md:block" style={{ width: 32, height: 32 }} />
                  <ArrowDown className="block md:hidden" style={{ width: 32, height: 32 }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
