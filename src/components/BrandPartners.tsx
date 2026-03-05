import React from 'react';

const BrandPartners: React.FC = () => {
  const PartnerLink = ({ href, src, alt, className }: { href: string; src: string; alt: string; className?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer mx-12 md:mx-16 ${className}`}
    >
      <img src={src} alt={alt} className="h-28 md:h-32 w-auto object-contain hover:scale-105 transition-transform duration-300" />
    </a>
  );

  return (
    <section id="partners" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] text-center tracking-tight">
          Our Curated Partners
        </h2>
        <p className="text-[#6B7280] text-center mt-4 font-medium text-lg">
          Collaborating with innovative brands across the Middle East.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group bg-[#F9FAFB] py-16 border-y border-gray-100">
        <div className="py-4 animate-marquee whitespace-nowrap flex items-center space-x-24 group-hover:[animation-play-state:paused] px-12">
          {/* Logo Set 1 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles2.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista2.png" alt="CRAVISTA" className="mx-16" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge2.jpg" alt="EcomBridge" className="mx-16 mix-blend-multiply" />

          {/* Logo Set 2 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles2.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista2.png" alt="CRAVISTA" className="mx-16" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge2.jpg" alt="EcomBridge" className="mx-16 mix-blend-multiply" />
        </div>

        <div className="absolute top-0 py-20 animate-marquee2 whitespace-nowrap flex items-center space-x-24 group-hover:[animation-play-state:paused] px-12">
          {/* Logo Set 3 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles2.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista2.png" alt="CRAVISTA" className="mx-16" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge2.jpg" alt="EcomBridge" className="mx-16 mix-blend-multiply" />

          {/* Logo Set 4 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles2.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista2.png" alt="CRAVISTA" className="mx-16" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge2.jpg" alt="EcomBridge" className="mx-16 mix-blend-multiply" />
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
