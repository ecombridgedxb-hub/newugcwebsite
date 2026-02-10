import React from 'react';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ValueProp: React.FC = () => {
  return (
    <section id="creators" className="py-32 bg-bgMain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl lg:text-6xl font-extrabold text-heading mb-8 tracking-tight leading-tight">
              Curated for creators with <span className="text-primary italic">vision.</span>
            </h2>
            <p className="text-lg text-body mb-12 leading-relaxed font-medium">
              We focus on premium quality. Our platform connects you with high-end brands that value your unique perspective and aesthetic authenticity.
            </p>
            <div className="space-y-10">
              {[
                { icon: <ShieldCheck className="text-primary" />, title: "Secure Ecosystem", desc: "Transparent contracts and verified payments for every collaboration." },
                { icon: <Sparkles className="text-primary" />, title: "Premium Access", desc: "Unlock exclusive opportunities with the UAE's top luxury and lifestyle brands." },
                { icon: <Heart className="text-primary" />, title: "Community Driven", desc: "A supportive network designed to help you scale your creative influence." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-6 group">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-heading text-xl mb-2">{item.title}</h4>
                    <p className="text-body text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Natural Light Photography Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 grid grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              <div className="rounded-[3rem] overflow-hidden shadow-soft h-72 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" 
                  alt="UGC Creator editing a vlog on a modern workstation" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-soft h-56 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1606103836293-0a063ee20566?auto=format&fit=crop&q=80&w=600" 
                  alt="UGC Creator unboxing a premium lifestyle product" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
            </div>
            <div className="pt-16 space-y-6">
               <div className="rounded-[3rem] overflow-hidden shadow-soft h-56 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=80&w=600" 
                  alt="UGC Creator filming a product review with their smartphone" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-soft h-72 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600" 
                  alt="Authentic creator collaboration in a sun-drenched outdoor setting" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;