import { useState, useEffect } from 'react';
import { GlassNavButton } from '../Components/ui/GlassNavButton';

const GlassNavigation = ({ items, onNavigate, navbarHeight = 80, onSectionClick }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [bgColor, setBgColor] = useState('black');

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

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  // ✅ Enhanced scroll handler with retry mechanism
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
      // ✅ Section এখনও load হয়নি, retry করো
      setTimeout(() => {
        scrollToSection(sectionId, retryCount + 1);
      }, 200); // 200ms পরে আবার চেষ্টা
      return false;
    }

    console.warn(`Section ${sectionId} not found after ${retryCount} retries`);
    return false;
  };

  // ✅ Handle click with force load mechanism
  const handleClick = (e, item) => {
    e.preventDefault();

    // ✅ 1. Parent component কে বলো section load করতে (if callback provided)
    if (onSectionClick) {
      onSectionClick(item.sectionId);
    }

    // ✅ 2. Small delay দিয়ে scroll করো (section load হওয়ার জন্য)
    setTimeout(() => {
      scrollToSection(item.sectionId);
    }, 100);

    // ✅ 3. Optional callback
    if (onNavigate) {
      onNavigate(item);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[1000] p-5">
      <nav className="bg-transparent backdrop-blur-lg border border-gray-700/50 rounded-full p-2 shadow-2xl">
        <ul className="flex gap-2.5 list-none m-0 p-0 items-center">
          {navigationItems.map(item => {
            const isActive = activeSection === item.sectionId;

            return (
              <li key={item.id} className="m-0">
                <GlassNavButton
                  item={item}
                  isActive={isActive}
                  onClick={e => handleClick(e, item)}
                  bgColor={bgColor}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default GlassNavigation;
