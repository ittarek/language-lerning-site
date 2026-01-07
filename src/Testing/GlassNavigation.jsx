
import { useState, useEffect } from 'react';
import { FaDollarSign, FaPhabricator } from 'react-icons/fa';

const GlassNavigation = ({ items, onNavigate, navbarHeight = 80 }) => {
    const [activeSection, setActiveSection] = useState('home');
const [bgColor , setBgColor] =  useState("black")
    // Default navigation items if not provided
    // User should pass their own items with react-icons
    const defaultItems = [
        {
            id: 'home',
            label: 'Home',
            icon: '🏠', // Fallback emoji if no icon provided
            sectionId: 'home'
        },
        {
            id: 'about',
            label: 'About',
            icon: '📋',
            sectionId: 'about'
        },
        {
            id: 'events',
            label: 'Events',
            icon: '📅',
            sectionId: 'events'
        },
        {
            id: 'starting_course',
            label: 'Course',
            icon: '✍️',
            sectionId: 'starting_course'
        },
        {
            id: 'pricing',
            label: 'Pricing',
            icon: '💰',
            sectionId: 'pricing'
        },
        {
            id: 'article',
            label: 'Article',
            icon: '📰',
            sectionId: 'article'
        }

    ];

    const navigationItems = items || defaultItems;

    // Detect active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = navigationItems.map(item =>
                document.getElementById(item.sectionId)
            ).filter(Boolean);

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

    // Handle smooth scroll to section
    const handleClick = (e, item) => {
        e.preventDefault();

        const element = document.getElementById(item.sectionId);
        if (element) {
            // Get navbar height to offset scroll position
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        // Call optional onNavigate callback
        if (onNavigate) {
            onNavigate(item);
        }
    };

    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[1000] p-5">
            <nav className="bg-transparent backdrop-blur-lg border border-gray-700/50 rounded-full p-2 shadow-2xl">
                <ul className="flex gap-2.5 list-none m-0 p-0 items-center">
                    {navigationItems.map((item) => {
                        const isActive = activeSection === item.sectionId;

                        return (
                            <li key={item.id} className="m-0">
                                <button
                                    onClick={(e) => handleClick(e, item)}
                                    className={`
                                        flex flex-col items-center gap-1 m-auto md:w-16 md:h-16 p-2 rounded-full
                                        border-none transition-all duration-300 cursor-pointer
                                    
                                        ${isActive || bgColor === "black"
                                            ? 'bg-white/20 text-black  shadow-lg'
                                            : 'bg-transparent text-white hover:bg-white/10 hover:text-white'
                                        }
                                    `}
                                >
                                    <span className="">
                                        {item.icon}
                                    </span>
                                    <span className={`text-xs     ${isActive ? 'font-semibold' : 'font-normal'} `}>
                                        {item.label}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default GlassNavigation
