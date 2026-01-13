import { useState, useEffect } from 'react';

export const MoveToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Scroll to top clicked'); // Debug

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <>
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 sm:bottom-20 md:bottom-8 right-4 sm:right-6 md:right-8 z-[10000] p-3 sm:p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 group animate-bounce-in cursor-pointer touch-manipulation"
        aria-label="Scroll to top"
        type="button">
        {/* Arrow Icon */}
        <svg
          className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>

        {/* Pulse ring effect */}
        <span className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20 pointer-events-none"></span>
      </button>

      <style>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </>
  );
};
