import React from 'react';
import { UserPlus, Package, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus size={36} />,
      title: "Apply to Join",
      desc: "Apply for access. We curate our community weekly to ensure a premium standard for brands."
    },
    {
      icon: <Package size={36} />,
      title: "Curated Drops",
      desc: "Receive bespoke products from quality brands delivered to your door in the UAE.",
    },
    {
      icon: <Share2 size={36} />,
      title: "Create & Scale",
      desc: "Produce authentic content and grow your portfolio with global brands."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-heading mb-24 tracking-tight">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-20">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative"
            >
              <div className="group text-center">
                <div className="w-28 h-28 bg-accent rounded-[2.5rem] flex items-center justify-center text-primary mx-auto mb-10 transition-all duration-700 group-hover:-rotate-6 group-hover:shadow-2xl group-hover:shadow-primary/10">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-heading mb-5">{step.title}</h3>
                <p className="text-body font-medium leading-relaxed px-6 opacity-90">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[75%] w-1/2 h-px bg-gray-100"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;