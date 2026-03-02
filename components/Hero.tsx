import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-bgMain">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 z-10 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center px-4 py-1.5 mb-8 bg-accent text-primary text-xs font-bold tracking-widest uppercase rounded-full border border-primary/10">
                Invite-only Startup
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-heading leading-[1.1] mb-8 tracking-tight">
                Premium content for <br/><span className="text-primary">curated</span> brands.
              </h1>
              <p className="text-lg lg:text-xl text-body mb-12 leading-relaxed max-w-lg">
                The Middle East's most trusted marketplace connecting high-growth brands with elite creators. Join the next generation of storytelling.
              </p>

              <div className="flex flex-col sm:space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <button 
                  onClick={onOpenModal}
                  className="px-10 py-4 bg-primary text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
                >
                  Apply to Join
                </button>
                <button 
                  className="px-10 py-4 border-2 border-primary text-primary font-bold text-lg rounded-full hover:bg-primary/5 transition-all active:scale-[0.98]"
                >
                  Learn More
                </button>
              </div>

              <div className="mt-14 flex items-center space-x-6">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
                  ].map((src, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-bgMain bg-gray-200 overflow-hidden shadow-sm">
                      <img src={src} alt="Curated Creator Profile" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <p className="text-sm font-medium text-heading">
                  Trusted by <span className="text-primary font-bold">5,000+</span> creators in the UAE
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Lifestyle Image */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative rounded-[3rem] overflow-hidden shadow-soft aspect-[4/5] lg:aspect-[5/6]"
            >
              <img 
                src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=1200" 
                alt="UGC Creator filming authentic lifestyle content in a sunlit home studio" 
                className="w-full h-full object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-heading/10 to-transparent"></div>
            </motion.div>
            
            {/* Soft decorative elements */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent/60 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;