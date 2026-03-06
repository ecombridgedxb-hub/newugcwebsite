import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"></div>

            <div className="relative bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden h-[85vh] flex flex-col">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h3 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Terms & Guidelines</h3>
                        <p className="text-[#6B7280] text-sm mt-1 font-medium">Content Creation & Usage Agreement / Terms & Conditions (Part Three)</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-50 text-gray-400 hover:text-[#0F172A] hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <X style={{ width: 24, height: 24 }} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="prose prose-sm max-w-none text-[#6B7280]">
                        <p className="italic mb-6">These guidelines form the foundation of our successful creator partnerships once you are onboarded.</p>

                        <h4 className="text-[#0F172A] font-bold text-lg mb-4">1. Content Usage & Rights</h4>
                        <ul className="list-disc pl-5 space-y-3 mb-8">
                            <li><strong>Standard Reposting:</strong> We love showcasing your creativity! By partnering with us, you allow CuratedCircle and our Brand Partners to feature your content on our social channels, helping you reach a wider audience.</li>
                            <li><strong>Platform Optimizations:</strong> To ensure your content performs best across different apps, our Brand Partners may make minor adjustments such as cropping, resizing, or framing to meet specific platform requirements (e.g., matching TikTok vs. Instagram formatting).</li>
                            <li><strong>Creative Integrity:</strong> Your creative vision matters. Any major modifications that significantly alter your narrative or core messaging will always require your prior approval.</li>
                            <li><strong>Sponsored Growth:</strong> Exceptional content may be selected for paid advertising campaigns (such as Meta Ads or TikTok Spark Ads). This is a great opportunity that brings more visibility to your profile and the brand simultaneously!</li>
                        </ul>

                        <h4 className="text-[#0F172A] font-bold text-lg mb-4">2. Creative Excellence</h4>
                        <ul className="list-disc pl-5 space-y-3 mb-8">
                            <li><strong>Authentic Voice:</strong> We partner with you because we love your unique style. We encourage you to maintain your creative freedom while ensuring you naturally cover the key talking points outlined in the brand brief.</li>
                            <li><strong>Featuring Others:</strong> If your beautiful content features friends, family, or lovely pets, please ensure you have their blessing to be included in the public campaign.</li>
                        </ul>

                        <h4 className="text-[#0F172A] font-bold text-lg mb-4">3. Delivery & Collaboration</h4>
                        <ul className="list-disc pl-5 space-y-3 mb-8">
                            <li><strong>Product Arrivals:</strong> Please drop us a quick note as soon as your gifted products arrive so we can celebrate and track the timeline accurately!</li>
                            <li><strong>Turnaround Time:</strong> To keep campaigns flowing smoothly for everyone, we aim for a first draft submission within seven (7) days of receiving the product. If you ever need a little extra time, just communicate with our team.</li>
                            <li><strong>Local Activations:</strong> From time to time, we may invite you to special on-site events in the UAE. Attendance is completely voluntary and a great way to network!</li>
                        </ul>

                        <h4 className="text-[#0F172A] font-bold text-lg mb-4">4. Open Communication</h4>
                        <ul className="list-disc pl-5 space-y-3 mb-8">
                            <li><strong>Checking In:</strong> Our team is here to support you! We will occasionally check in (around day 3 and day 5) to see if you have any questions about the brief or need assistance.</li>
                            <li><strong>Constructive Feedback:</strong> If a product isn't quite what you expected, please chat with our team privately first! We value your genuine feedback and always want the chance to find a resolution before any public reviews are posted.</li>
                        </ul>

                        <h4 className="text-[#0F172A] font-bold text-lg mb-4">5. Building a Long-Term Relationship</h4>
                        <ul className="list-disc pl-5 space-y-3 mb-8">
                            <li><strong>Creator Growth:</strong> Timeliness and high-quality deliverables positively build your internal Creator Score, putting you at the top of the list for our most premium, high-tier brand collaborations.</li>
                            <li><strong>Partnership Trust:</strong> We value mutual respect. Consistently missing deadlines without communication or failing to deliver the agreed-upon content ultimately impacts the campaigns, and may lead to a pause on future opportunities.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
