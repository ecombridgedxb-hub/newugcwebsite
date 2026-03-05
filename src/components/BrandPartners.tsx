import React from 'react';

const BrandPartners: React.FC = () => {
  const PartnerLink = ({ href, src, alt, className }: { href: string; src: string; alt: string; className?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer mx-8 ${className}`}
    >
      <img src={src} alt={alt} className="h-16 w-auto object-contain" />
    </a>
  );

  return (
    <section id="partners" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] text-center tracking-tight">
          Our Curated Partners
        </h2>
        <p className="text-[#6B7280] text-center mt-4 font-medium text-lg">
          Collaborating with innovative brands across the Middle East.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group bg-[#F9FAFB] py-12 border-y border-gray-100">
        <div className="py-4 animate-marquee whitespace-nowrap flex items-center space-x-16 group-hover:[animation-play-state:paused] px-8">
          {/* Logo Set 1 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista.png" alt="CRAVISTA" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge.png" alt="EcomBridge" className="h-20" />

          {/* Logo Set 2 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista.png" alt="CRAVISTA" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge.png" alt="EcomBridge" className="h-20" />
        </div>

        <div className="absolute top-0 py-16 animate-marquee2 whitespace-nowrap flex items-center space-x-16 group-hover:[animation-play-state:paused] px-8">
          {/* Logo Set 3 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista.png" alt="CRAVISTA" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge.png" alt="EcomBridge" className="h-20" />

          {/* Logo Set 4 */}
          <PartnerLink href="https://www.braingiggles.com/" src="/logos/braingiggles.png" alt="Brain Giggles" />
          <PartnerLink href="https://www.cravista.com/" src="/logos/cravista.png" alt="CRAVISTA" />
          <PartnerLink href="https://ecombridge.ai/" src="/logos/ecombridge.png" alt="EcomBridge" className="h-20" />
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
