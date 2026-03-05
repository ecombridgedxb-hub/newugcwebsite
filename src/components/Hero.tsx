import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full lg:w-1/2 z-10 text-left"
          >
            <div className="inline-flex items-center px-4 py-1.5 mb-8 bg-[#D1FAE5] text-[#1FAE9A] text-[11px] font-bold tracking-widest rounded-full border border-[#1FAE9A]/10">
              Invite-Only Community
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#0F172A] leading-[1.1] mb-6 tracking-tight">
              Collaborate with Real Brands. Not Paid Hype.
            </h1>
            <p className="text-lg text-[#6B7280] mb-10 leading-relaxed max-w-lg font-medium">
              CuratedCircle is a UAE-based, invite-only micro-influencer community operated by EcomBridge. Receive curated products and create authentic UGC—no forced scripts, no mass campaigns.
            </p>

            <div className="flex flex-col sm:space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <button
                onClick={onOpenModal}
                className="px-10 py-3.5 bg-[#1FAE9A] text-white font-bold text-lg rounded-lg hover:shadow-xl hover:shadow-[#1FAE9A]/20 transition-all active:scale-[0.98]"
              >
                Apply to Join
              </button>
              <a
                href="#how-it-works"
                className="px-10 py-3.5 border-2 border-gray-200 text-[#0F172A] font-bold text-lg rounded-lg hover:border-gray-300 transition-all active:scale-[0.98] text-center"
              >
                How It Works
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=1200"
                alt="Videographer shooting on beach"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
