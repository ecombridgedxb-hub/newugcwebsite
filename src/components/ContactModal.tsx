import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "2b48a85e-2094-451c-9644-9621a40e057e",
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    subject: `New Contact Form Submission from ${formData.name}`,
                    from_name: "CuratedCircle Contact Form"
                }),
            });

            const result = await response.json();
            if (result.success) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                }, 3000);
            } else {
                setSubmitMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            setSubmitMessage("Network error. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"></div>

            <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 text-gray-400 hover:text-[#0F172A] transition-colors z-20"
                >
                    <X style={{ width: 24, height: 24 }} />
                </button>

                <div className="p-10 pb-6">
                    <h3 className="text-2xl font-extrabold text-[#0F172A] mb-2 tracking-tight">Contact Us</h3>
                    <p className="text-[#6B7280] text-sm font-medium">Have a question or collaboration idea? Send us a message directly.</p>
                </div>

                <div className="flex-1 px-10 pb-10">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Full Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Jane Doe"
                                className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none focus:bg-white focus:border-[#1FAE9A]/20 transition-all text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="jane@example.com"
                                    className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none focus:bg-white focus:border-[#1FAE9A]/20 transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+971 50 XXXXXXX"
                                    className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none focus:bg-white focus:border-[#1FAE9A]/20 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Message</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="How can we help you?"
                                className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none focus:bg-white focus:border-[#1FAE9A]/20 transition-all text-sm min-h-[120px] resize-none"
                            />
                        </div>

                        {submitMessage && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 mb-4 text-center">
                                {submitMessage}
                            </div>
                        )}
                        {isSuccess ? (
                            <div className="w-full font-bold py-4 mt-2 rounded-2xl flex items-center justify-center space-x-2 bg-[#D1FAE5]/40 text-[#1FAE9A] border border-[#1FAE9A]/20">
                                <span>Message Sent Successfully!</span>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full font-bold py-4 mt-2 rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] ${isSubmitting ? 'bg-gray-100 text-gray-400' : 'bg-[#0F172A] text-white hover:bg-[#1FAE9A]'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Send style={{ width: 18, height: 18 }} />
                                    </>
                                )}
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
