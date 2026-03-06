import React from 'react';

const WhatIs: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-8 tracking-tight">
                    What is CuratedCircle?
                </h2>
                <div className="space-y-6 text-lg text-[#6B7280] font-medium leading-relaxed">
                    <p>
                        We're not an agency. We're not a marketplace. We're a carefully curated community of UAE-based micro-influencers who collaborate with quality D2C brands through product-based partnerships.
                    </p>
                    <p>
                        Operated by <span className="font-bold text-[#0F172A]">EcomBridge</span>, we feature our own brands <a href="https://www.cravista.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1FAE9A] hover:underline">CRAVISTA</a> and <a href="https://www.braingiggles.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1FAE9A] hover:underline">Brain Giggles</a>, and onboarded selected health & wellness brands. We understand what makes great content because we're operators, not middlemen.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhatIs;
