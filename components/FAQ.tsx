import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <span className="text-lg font-semibold text-heading">{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-body leading-relaxed border-t border-gray-100/50 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ: React.FC = () => {
    const faqs = [
        {
            question: "Do I get paid for collaborations?",
            answer: "No. CuratedCircle is a product-exchange community. You receive high-quality products from premium brands in exchange for authentic content. We focus on building long-term relationships rather than one-off paid transactions."
        },
        {
            question: "How are creators selected?",
            answer: "We review every application manually. We look for high-quality content, authentic engagement, and a genuine passion for the niches we serve (Wellness, Lifestyle, Parenting, etc.). Follower count is less important than the quality of your work."
        },
        {
            question: "What is required after I receive a product?",
            answer: "You are expected to create User Generated Content (UGC)—usually 1-2 videos or 3-5 high-quality photos—featuring the product in an authentic way. Specific requirements will be shared with each campaign invite."
        },
        {
            question: "How often will I get campaigns?",
            answer: "Campaign frequency depends on your niche and the current brands we are partnering with. We prioritize quality matches over quantity, so you'll only be invited to campaigns that fit your profile."
        },
        {
            question: "Do I have to post everything I receive?",
            answer: "Yes. By accepting a product, you agree to produce content for it. If you have concerns about a product after receiving it, please contact our support team."
        },
        {
            question: "What are the disclosure rules?",
            answer: "Transparency is key. You must comply with all local regulations (such as UAE NMC guidelines) regarding sponsored content, typically by tagging the brand and using #gifted or #ad where appropriate."
        },
        {
            question: "Can brands reuse my content?",
            answer: "Yes. One of the main benefits for brands is obtaining high-quality content they can use on their own social media channels, websites, or ads. You grant usage rights when you join a campaign."
        },
        {
            question: "What if I want to leave?",
            answer: "You can leave the community at any time. Simply contact us to deactivate your profile. You will not be penalized, but you must complete any active campaigns you have already accepted."
        }
    ];

    return (
        <section className="py-20 lg:py-32 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-heading mb-6 tracking-tight font-heading">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-body">
                        Everything you need to know about joining CuratedCircle.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
