import React from 'react';
import { ShieldCheck, Package, Sparkles, Heart, Star, CheckCircle2 } from 'lucide-react';

const ValueProp: React.FC = () => {
  const cards = [
    {
      icon: <ShieldCheck className="text-[#1FAE9A]" style={{ width: 18, height: 18 }} />,
      title: "Curated Brands",
      desc: "We only partner with quality D2C brands in health, wellness, and lifestyle"
    },
    {
      icon: <Package className="text-[#1FAE9A]" style={{ width: 18, height: 18 }} />,
      title: "Product-Based",
      desc: "Receive products you will love. Create content on your terms"
    },
    {
      icon: <Sparkles className="text-[#1FAE9A]" style={{ width: 18, height: 18 }} />,
      title: "Creative Freedom",
      desc: "No scripts, no templates. Your voice, your style"
    },
    {
      icon: <Heart className="text-[#1FAE9A]" style={{ width: 18, height: 18 }} />,
      title: "UAE-Focused",
      desc: "Built for the UAE creator community by operators who understand the market"
    },
    {
      icon: <Star className="text-[#1FAE9A]" style={{ width: 18, height: 18 }} />,
      title: "Quality > Quantity",
      desc: "We review every creator manually. No mass invites"
    },
    {
      icon: <CheckCircle2 className="text-[#1FAE9A]" style={{ width: 18, height: 18 }} />,
      title: "Transparent Process",
      desc: "Clear expectations. No hidden requirements. Honest collaboration"
    }
  ];

  return (
    <section id="creators" className="py-24 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            What Makes Us Different
          </h2>
          <p className="text-[#6B7280] font-medium text-lg">
            Quality over quantity. Authenticity over algorithms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-transparent hover:border-gray-100 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-[#D1FAE5] rounded-xl flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="font-bold text-[#0F172A] mb-3 text-lg">{card.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
