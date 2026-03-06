import React from 'react';

const BrandPartners: React.FC = () => {
  const PartnerLink = ({ href, src, alt, className }: { href: string; src: string; alt: string; className?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 cursor-pointer mx-8 md:mx-16 ${className}`}
    >
      <img src={src} alt={alt} className="h-56 md:h-[22rem] max-w-[80vw] md:max-w-none object-contain hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
    </a>
  );

  return (
    <section id="partners" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] text-center tracking-tight">
          Our Curated Partners
        </h2>
        <p className="text-[#6B7280] text-center mt-4 font-medium text-lg">
          Collaborating with innovative brands across the Middle East.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group mt-16 mb-8 py-4">
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-12 px-6 group-hover:[animation-play-state:paused]">
          {/* Logo Set 1 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles2.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista2.png" alt="CRAVISTA" className="mix-blend-multiply" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge2.jpg" alt="EcomBridge" className="mix-blend-multiply" />
          <PartnerLink href="#" src="/logos/mittalteas_logo.jpg" alt="Mittal Teas" className="mix-blend-multiply rounded-xl" />
          <PartnerLink href="#" src="/logos/wilddate.png" alt="Wild Date" />
          <PartnerLink href="#" src="/logos/athlisis.png" alt="Athlisis" />

          {/* Logo Set 2 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles2.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista2.png" alt="CRAVISTA" className="mix-blend-multiply" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge2.jpg" alt="EcomBridge" className="mix-blend-multiply" />
          <PartnerLink href="#" src="/logos/mittalteas_logo.jpg" alt="Mittal Teas" className="mix-blend-multiply rounded-xl" />
          <PartnerLink href="#" src="/logos/wilddate.png" alt="Wild Date" />
          <PartnerLink href="#" src="/logos/athlisis.png" alt="Athlisis" />
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center space-x-12 px-6 group-hover:[animation-play-state:paused] h-full">
          {/* Logo Set 3 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles2.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista2.png" alt="CRAVISTA" className="mix-blend-multiply" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge2.jpg" alt="EcomBridge" className="mix-blend-multiply" />
          <PartnerLink href="#" src="/logos/mittalteas_logo.jpg" alt="Mittal Teas" className="mix-blend-multiply rounded-xl" />
          <PartnerLink href="#" src="/logos/wilddate.png" alt="Wild Date" />
          <PartnerLink href="#" src="/logos/athlisis.png" alt="Athlisis" />

          {/* Logo Set 4 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles2.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista2.png" alt="CRAVISTA" className="mix-blend-multiply" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge2.jpg" alt="EcomBridge" className="mix-blend-multiply" />
          <PartnerLink href="#" src="/logos/mittalteas_logo.jpg" alt="Mittal Teas" className="mix-blend-multiply rounded-xl" />
          <PartnerLink href="#" src="/logos/wilddate.png" alt="Wild Date" />
          <PartnerLink href="#" src="/logos/athlisis.png" alt="Athlisis" />
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
