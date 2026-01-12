import { useState, useEffect, useRef } from 'react';
import { GlassNavButton } from '../Components/ui/GlassNavButton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GlassNavigation = ({ items, onNavigate, navbarHeight = 80, onSectionClick }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  // Default navigation items if not provided
  const defaultItems = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      sectionId: 'home',
    },
    {
      id: 'events',
      label: 'Events',
      icon: '📅',
      sectionId: 'events',
    },
    {
      id: 'starting_course',
      label: 'Course',
      icon: '✍️',
      sectionId: 'starting_course',
    },
    {
      id: 'pricing',
      label: 'Pricing',
      icon: '💰',
      sectionId: 'pricing',
    },
    {
      id: 'article',
      label: 'Article',
      icon: '📰',
      sectionId: 'article',
    },
    {
      id: 'about',
      label: 'About',
      icon: '📋',
      sectionId: 'about',
    },
  ];

  const navigationItems = items || defaultItems;

  // Check scroll position for arrows
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Handle horizontal scroll
  const handleScroll = direction => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200; // pixels to scroll
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  // Setup scroll listener for arrows
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Check initial state
    checkScrollPosition();

    // Add scroll event listener
    container.addEventListener('scroll', checkScrollPosition);

    // Add resize listener to recheck on window resize
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [navigationItems]);

  // Detect active section on scroll
  useEffect(() => {
    const handlePageScroll = () => {
      const sections = navigationItems
        .map(item => document.getElementById(item.sectionId))
        .filter(Boolean);

      let current = 'home';

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handlePageScroll);
    handlePageScroll();

    return () => window.removeEventListener('scroll', handlePageScroll);
  }, [navigationItems]);

  // Scroll to section with retry mechanism
  const scrollToSection = (sectionId, retryCount = 0) => {
    const element = document.getElementById(sectionId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      return true;
    } else if (retryCount < 5) {
      // Section not loaded yet, retry
      setTimeout(() => {
        scrollToSection(sectionId, retryCount + 1);
      }, 200);
      return false;
    }

    console.warn(`Section ${sectionId} not found after ${retryCount} retries`);
    return false;
  };

  // Handle click with force load mechanism
  const handleClick = (e, item) => {
    e.preventDefault();

    // Notify parent component to load section
    if (onSectionClick) {
      onSectionClick(item.sectionId);
    }

    // Delay scroll to allow section to load
    setTimeout(() => {
      scrollToSection(item.sectionId);
    }, 100);

    // Optional callback
    if (onNavigate) {
      onNavigate(item);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[1000] px-4 w-full max-w-full">
      <div className="relative max-w-fit mx-auto">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 lg:hidden"
            aria-label="Scroll left">
            <FaChevronLeft className="text-gray-700 text-lg" />
          </button>
        )}

        {/* Navigation Container */}
        <nav className="bg-black/20 backdrop-blur-lg border border-white/30 rounded-full px-3 py-2 shadow-2xl">
          <ul
            ref={scrollContainerRef}
            className="flex gap-2 list-none m-0 p-0 items-center overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{
              maxWidth: 'calc(100vw - 80px)', // Leave space for arrows
              WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
            }}>
            {navigationItems.map(item => {
              const isActive = activeSection === item.sectionId;

              return (
                <li key={item.id} className="m-0 snap-center flex-shrink-0">
                  <GlassNavButton
                    item={item}
                    isActive={isActive}
                    onClick={e => handleClick(e, item)}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 lg:hidden"
            aria-label="Scroll right">
            <FaChevronRight className="text-gray-700 text-lg" />
          </button>
        )}
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default GlassNavigation;
