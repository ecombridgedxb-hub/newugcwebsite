import React from 'react';
import { X } from 'lucide-react';

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#0F172A]">Privacy Policy</h2>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition-colors"
                    >
                        <X style={{ width: 20, height: 20 }} />
                    </button>
                </div>

                <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
                    <div className="prose prose-sm max-w-none text-[#6B7280]">
                        <p className="font-bold text-[#0F172A] mb-4">Last Updated: March 2026</p>

                        <h3 className="text-lg font-bold text-[#0F172A] mt-8 mb-3">1. Introduction</h3>
                        <p>Welcome to CuratedCircle by EcomBridge ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you apply to our community and use our platform.</p>

                        <h3 className="text-lg font-bold text-[#0F172A] mt-8 mb-3">2. The Data We Collect</h3>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                        <ul className="list-disc pl-5 my-4 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, age, gender.</li>
                            <li><strong>Contact Data:</strong> includes email address, telephone numbers, and delivery address in the UAE.</li>
                            <li><strong>Profile Data:</strong> includes your social media handles (Instagram, TikTok, YouTube, etc.), portfolio links, and content niches.</li>
                        </ul>

                        <h3 className="text-lg font-bold text-[#0F172A] mt-8 mb-3">3. How We Use Your Data</h3>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className="list-disc pl-5 my-4 space-y-2">
                            <li>To evaluate your application to join the CuratedCircle community.</li>
                            <li>To match you with relevant brand campaigns and arrange product deliveries.</li>
                            <li>To communicate with you regarding campaign briefs, approvals, and platform updates.</li>
                        </ul>

                        <h3 className="text-lg font-bold text-[#0F172A] mt-8 mb-3">4. Data Sharing</h3>
                        <p>We may share your Identity and Profile Data with our curated brand partners solely for the purpose of executing agreed-upon UGC campaigns. We do not sell your personal data to third parties.</p>

                        <h3 className="text-lg font-bold text-[#0F172A] mt-8 mb-3">5. Your Legal Rights</h3>
                        <p>Under UAE data protection regulations, you have rights in relation to your personal data, including the right to request access, correction, erasure, or restriction of processing. To exercise these rights, please contact us at <a href="mailto:hello@curatedcircle.co" className="text-[#1FAE9A] font-bold">hello@curatedcircle.co</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
