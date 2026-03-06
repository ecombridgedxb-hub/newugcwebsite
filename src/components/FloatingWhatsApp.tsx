import React from 'react';

const FloatingWhatsApp: React.FC = () => {
    const phoneNumber = '971503289387';
    const message = "I'd like to inquire about CuratedCircle.";
    const encodedMessage = encodeURIComponent(message);

    // Create the WhatsApp click-to-chat URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Contact us on WhatsApp"
        >
            <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-8 md:h-8"
            >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>

            {/* Optional: Add a subtle tooltip on desktop hover */}
            <span className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block pointer-events-none">
                Chat with us
            </span>
        </a>
    );
};

export default FloatingWhatsApp;
