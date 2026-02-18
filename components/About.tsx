import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* What is CuratedCircle? */}
        <div className="mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-6 font-heading">
            What is CuratedCircle?
          </h2>
          <p className="text-lg text-body leading-relaxed mb-6">
            We're not an agency. We're not a marketplace. We're a carefully curated community of UAE-based micro-influencers who collaborate with quality D2C brands through product-based partnerships.
          </p>
          <p className="text-lg text-body leading-relaxed">
            Operated by <span className="font-semibold text-heading">EcomBridge</span>, we run brands like <span className="font-semibold text-heading">Cravista</span> and <span className="font-semibold text-heading">Brain Giggles</span>, and partner with selected health & wellness brands. We understand what makes great content because we're operators, not middlemen.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-6 font-heading">
            What Makes Us Different
          </h2>
          <p className="text-lg text-body leading-relaxed">
            Quality over quantity. Authenticity over algorithms.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
