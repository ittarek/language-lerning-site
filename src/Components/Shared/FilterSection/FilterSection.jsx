
import { FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import Container from '../../Container';
import styles from './FilterSection.module.css';
/**
 * Reusable Filter Section Component
 * 
 * @param {Object} props
 * @param {Array} props.filters - Array of filter configurations
 * @param {boolean} props.showContainer - Whether to wrap in Container component
 * @param {boolean} props.isSticky - Whether filter should stick to top
 * @param {string} props.headerText - Custom header text (default: "Filters:")
 * @param {React.ReactNode} props.headerIcon - Custom header icon
 * 
 * Filter object structure:
 * {
 *   label: string,           // Filter label (e.g., "Category")
 *   options: string[],       // Array of filter options
 *   selected: string,        // Currently selected value
 *   onSelect: function,      // Callback when option is selected
 *   color: string           // Optional: Color theme (indigo, purple, red, green, blue)
 * }
 */

const FilterSection = ({
    filters = [],
    showContainer = true,
    isSticky = true,
    headerText = "Filters:",
    headerIcon = <FaFilter />
}) => {
    const scrollRefs = useRef([]);
    const [scrollStates, setScrollStates] = useState([]);

    // Initialize scroll states
    useEffect(() => {
        setScrollStates(filters.map(() => ({
            showLeftArrow: false,
            showRightArrow: false
        })));
    }, [filters]);

    // Check scroll position for a specific filter
    const checkScrollPosition = (index) => {
        const ref = scrollRefs.current[index];
        if (!ref) return;

        const { scrollLeft, scrollWidth, clientWidth } = ref;

        setScrollStates(prev => {
            const newStates = [...prev];
            newStates[index] = {
                showLeftArrow: scrollLeft > 0,
                showRightArrow: scrollLeft < scrollWidth - clientWidth - 10
            };
            return newStates;
        });
    };

    // Scroll function
    const scroll = (index, direction) => {
        const ref = scrollRefs.current[index];
        if (!ref) return;

        const scrollAmount = 200;
        const newScrollLeft = ref.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

        ref.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    };

    // Setup scroll listeners
    useEffect(() => {
        const refs = scrollRefs.current;
        const handlers = refs.map((ref, index) => {
            const handler = () => checkScrollPosition(index);
            ref?.addEventListener('scroll', handler);
            checkScrollPosition(index);
            return { ref, handler };
        });

        return () => {
            handlers.forEach(({ ref, handler }) => {
                ref?.removeEventListener('scroll', handler);
            });
        };
    }, [filters]);

    // Color variants for different filters
    const getColorClasses = (color = 'indigo', isSelected) => {
        const colors = {
            indigo: {
                selected: 'bg-indigo-600 text-white shadow-lg',
                unselected: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            },
            purple: {
                selected: 'bg-purple-600 text-white shadow-lg',
                unselected: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            },
            red: {
                selected: 'bg-red-600 text-white shadow-lg',
                unselected: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            },
            green: {
                selected: 'bg-green-600 text-white shadow-lg',
                unselected: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            },
            blue: {
                selected: 'bg-blue-600 text-white shadow-lg',
                unselected: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            },
            orange: {
                selected: 'bg-orange-600 text-white shadow-lg',
                unselected: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
        };

        return isSelected
            ? colors[color]?.selected || colors.indigo.selected
            : colors[color]?.unselected || colors.indigo.unselected;
    };

    const content = (
        <div className="py-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
                <span className="text-indigo-600">{headerIcon}</span>
                <span className="font-semibold text-gray-700">{headerText}</span>
            </div>

            {/* Filters */}
            <div className="space-y-4">
                {filters.map((filter, filterIndex) => (
                    <div key={filterIndex}>
                        {/* Label */}
                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                            {filter.label}
                        </label>

                        {/* Filter Options */}
                        <div className="relative group">
                            {/* Left Arrow */}
                            {scrollStates[filterIndex]?.showLeftArrow && (
                                <button
                                    onClick={() => scroll(filterIndex, 'left')}
                                    className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
                                    aria-label="Scroll left"
                                >
                                    <FaChevronLeft className="text-gray-600" />
                                </button>
                            )}

                            {/* Scrollable Container */}
                            <div
                                ref={el => scrollRefs.current[filterIndex] = el}
                                className={`flex md:flex-wrap gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth ${styles.scrollbarHide}`}
                            >
                                {filter.options.map((option, optionIndex) => (
                                    <button
                                        key={optionIndex}
                                        onClick={() => filter.onSelect(option)}
                                        className={`
                                            flex-shrink-0 snap-start
                                            px-4 py-2 rounded-full text-sm font-semibold 
                                            transition-all duration-300
                                            ${getColorClasses(filter.color, filter.selected === option)}
                                            ${filter.selected === option ? 'scale-105' : ''}
                                        `}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {/* Right Arrow */}
                            {scrollStates[filterIndex]?.showRightArrow && (
                                <button
                                    onClick={() => scroll(filterIndex, 'right')}
                                    className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
                                    aria-label="Scroll right"
                                >
                                    <FaChevronRight className="text-gray-600" />
                                </button>
                            )}

                            {/* Gradient Indicators */}
                            {scrollStates[filterIndex]?.showLeftArrow && (
                                <div className="md:hidden absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                            )}
                            {scrollStates[filterIndex]?.showRightArrow && (
                                <div className="md:hidden absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

           
        </div>
    );

    // Wrapper with optional sticky and container
    const wrapperClasses = `
        ${isSticky ? 'sticky top-14 md:top-20 z-40' : ''}
        bg-white shadow-md max-w-7xl mx-auto
    `;

    if (showContainer) {
        return (
            <div className={wrapperClasses}>
                <Container>
                    {content}
                </Container>
            </div>
        );
    }

    return (
        <div className={wrapperClasses}>
            <div className="max-w-7xl mx-auto px-4">
                {content}
            </div>
        </div>
    );
};

export default FilterSection;