import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: "Do I get paid for collaborations?", a: "At our current stage no, we only do gifted collaborations for the onboarded brands we have. This will always be communicated upfront and as part of the initial application form." },
        { q: "How are creators selected?", a: "We manually review every application, evaluating content quality, engagement authenticity, and alignment with our partner brands' aesthetics." },
        { q: "What is required after I receive a product?", a: "You will have a standard TAT (Turnaround Time) to produce and submit the agreed-upon content pieces for brand approval." },
        { q: "How often will I get campaigns?", a: "Campaign frequency depends on your niche and our current brand partners. High-performing creators often receive consistent monthly drops." },
        { q: "Do I have to post everything I receive?", a: "Yes, we would require you to post every item sent as this would be part of the agreement made after the onboarding process. Our goal is to not only market for the products but also to build your UGC portfolio/library." },
        { q: "What are the disclosure rules?", a: "If you do post to your own audience, you must comply with all UAE laws regarding advertising and '#gifted' or '#ad' disclosures." },
        { q: "Can brands reuse my content?", a: "Yes, you grant the brand usage rights for their marketing channels for the agreed duration, as outlined in the campaign brief." },
        { q: "What if I want to leave?", a: "You can leave the CuratedCircle community at any time without penalty, provided you have no active unfulfilled campaign commitments." }
    ];

    return (
        <section id="faq" className="py-16 bg-[#F9FAFB]">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-12 text-center tracking-tight">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <div className="px-6 py-5 flex justify-between items-center">
                                <h4 className="font-bold text-[#0F172A] text-sm">{faq.q}</h4>
                                {openIndex === index ? (
                                    <ChevronUp className="text-gray-400" style={{ width: 18, height: 18 }} />
                                ) : (
                                    <ChevronDown className="text-gray-400" style={{ width: 18, height: 18 }} />
                                )}
                            </div>

                            {openIndex === index && (
                                <div className="px-6 pb-5 pt-1 text-[#6B7280] text-sm leading-relaxed border-t border-gray-50">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
