import React from 'react';
import { ExternalLink, GraduationCap } from 'lucide-react';

const BrandPartners: React.FC = () => {
  const brands = [
    {
      name: "BrainGiggles",
      url: "https://www.braingiggles.com/",
      logo: (
        <div className="flex items-center space-x-2">
          <GraduationCap className="text-[#F59E0B]" size={36} />
          <span className="text-2xl font-black tracking-tight flex">
            <span className="text-[#6D28D9]">Brain</span>
            <span className="text-[#84CC16]">Giggles</span>
          </span>
        </div>
      ),
      description: "Spreading Smiles Across Miles",
    },
    {
      name: "Cravista",
      url: "https://www.cravista.com/",
      logo: (
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#F97316] to-[#14B8A6] shadow-sm">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <span className="text-2xl font-bold tracking-[0.2em] text-heading">CRAVISTA</span>
        </div>
      ),
      description: "Creative Visionaries",
    },
    {
      name: "Ecombridge",
      url: "https://ecombridge.ai/",
      logo: (
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-black text-[#1D4ED8]">ECO</span>
            <div className="w-9 h-9 rounded-full border-2 border-[#F59E0B] flex items-center justify-center">
              <div className="w-1.5 h-4 bg-[#1D4ED8] rounded-full rotate-45"></div>
            </div>
            <span className="text-2xl font-black text-[#1D4ED8]">BRIDGE</span>
          </div>
          <span className="text-[9px] font-bold text-heading uppercase tracking-[0.25em] mt-1 opacity-60">AI POWERED</span>
        </div>
      ),
      description: "Expand Beyond Borders",
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-heading mb-6 tracking-tight">Our Elite Partners</h2>
          <p className="text-body max-w-2xl mx-auto font-medium text-lg">
            Collaborating with the most innovative brands across the Middle East to deliver exceptional creator experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {brands.map((brand, idx) => (
            <a 
              key={idx}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[#F9FAFB] rounded-[2.5rem] p-12 h-80 flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 border border-transparent hover:border-accent"
            >
              <div className="mb-10 transform transition-transform duration-700 group-hover:scale-105">
                {brand.logo}
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-heading flex items-center justify-center">
                  {brand.name}
                  <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </h3>
                <p className="text-sm text-body mt-3 font-medium opacity-80">{brand.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;