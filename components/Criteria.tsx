import React from 'react';
import { Check, X } from 'lucide-react';

const Criteria: React.FC = () => {
    return (
        <section className="py-20 bg-bgMain">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

                <h2 className="text-4xl lg:text-5xl font-extrabold text-heading mb-4 tracking-tight font-heading">
                    Who Should Apply?
                </h2>
                <p className="text-lg text-body mb-16">
                    We're looking for micro-influencers who value quality and authenticity
                </p>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 text-left">

                    {/* Perfect Fit */}
                    <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-primary/20">
                        <h3 className="text-2xl font-bold text-heading mb-8">Perfect Fit:</h3>
                        <ul className="space-y-4">
                            {[
                                "UAE-based content creators",
                                "Focus on food, wellness, lifestyle, or parenting",
                                "Authentic engagement over follower count",
                                "Open to product-based collaborations",
                                "Value long-term partnerships over one-off deals"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 mr-4">
                                        <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                                    </div>
                                    <span className="text-body font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Not a Good Fit */}
                    <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-2xl font-bold text-heading mb-8">Not a Good Fit:</h3>
                        <ul className="space-y-4">
                            {[
                                "Looking for guaranteed paid deals",
                                "Want daily campaign opportunities",
                                "Use fake engagement or purchased followers",
                                "Not willing to share content usage rights",
                                "Based outside the UAE"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-4">
                                        <X className="w-4 h-4 text-gray-400" strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-500">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Criteria;
