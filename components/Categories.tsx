
import React from 'react';
import { Sparkles, ShoppingBag, Smartphone, Utensils, HeartPulse, Home } from 'lucide-react';

const Categories: React.FC = () => {
  const categories = [
    { name: "Beauty & Skincare", icon: <Sparkles />, img: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=400" },
    { name: "Modest Fashion", icon: <ShoppingBag />, img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" },
    { name: "Tech & Gadgets", icon: <Smartphone />, img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400" },
    { name: "F&B (Dining)", icon: <Utensils />, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400" },
    { name: "Fitness & Wellness", icon: <HeartPulse />, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400" },
    { name: "Home & Decor", icon: <Home />, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Explore UAE Niches</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We connect creators across all major industries in the UAE. From luxury fashion to the latest tech gadgets.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-secondary p-2 rounded-lg text-primary">
                    {cat.icon}
                  </div>
                  <span className="font-bold text-lg md:text-xl">{cat.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
