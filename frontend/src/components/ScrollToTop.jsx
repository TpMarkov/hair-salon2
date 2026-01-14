import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[99]">
            <button
                type="button"
                onClick={scrollToTop}
                className={`
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
                    flex items-center justify-center
                    w-12 h-12 rounded-full
                    bg-white/20 backdrop-blur-md
                    border border-white/30
                    shadow-2xl
                    transition-all duration-500 ease-in-out
                    hover:bg-white/30 hover:scale-110 active:scale-95
                    cursor-pointer
                `}
                aria-label="Scroll to top"
            >
                <ChevronUp size={28} strokeWidth={3} color="#eab308" />
            </button>
        </div>
    );
};

export default ScrollToTop;
