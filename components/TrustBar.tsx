
import React from 'react';

const TrustBar: React.FC = () => {
  const logos = [
    "EMAAR", "NAMSHI", "NOON", "6THSTREET", "CHALHOUB", "DAMAC"
  ];

  return (
    <div className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
          Trusted by top brands across the Emirates
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
          {logos.map((name) => (
            <div key={name} className="text-2xl md:text-3xl font-black text-gray-600 tracking-tighter">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
