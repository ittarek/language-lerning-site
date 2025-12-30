// src/Components/SectionTitle/SectionTitle.jsx
import React from "react";

/**
 * Reusable Section Title Component
 * 
 * @param {Object} props
 * @param {string} props.title - Main heading text
 * @param {string} props.subtitle - Optional subtitle above title
 * @param {string} props.summary - Description text below title
 * @param {string} props.align - Alignment: 'left', 'center', 'right' (default: 'center')
 * @param {string} props.variant - Style variant: 'default', 'gradient', 'underline', 'badge', 'modern' (default: 'default')
 * @param {string} props.color - Color theme: 'indigo', 'purple', 'red', 'green', 'blue' (default: 'indigo')
 * @param {string} props.size - Size: 'sm', 'md', 'lg', 'xl' (default: 'lg')
 * @param {boolean} props.animated - Enable entrance animation (default: false)
 * @param {React.ReactNode} props.icon - Optional icon component
 * @param {string} props.className - Additional custom classes
 */

const SectionTitle = ({
    title,
    subtitle = '',
    summary = '',
    align = 'center',
    variant = 'default',
    color = 'indigo',
    size = 'lg',
    animated = false,
    icon = null,
    className = ''
}) => {

    // Alignment classes
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };

    // Size classes for title
    const sizeClasses = {
        sm: 'text-2xl md:text-3xl',
        md: 'text-3xl md:text-4xl',
        lg: 'text-4xl md:text-5xl',
        xl: 'text-5xl md:text-6xl'
    };

    // Color themes
    const colorClasses = {
        indigo: {
            gradient: 'from-indigo-600 to-purple-600',
            text: 'text-indigo-600',
            accent: 'bg-indigo-600',
            badge: 'bg-indigo-100 text-indigo-700'
        },
        purple: {
            gradient: 'from-purple-600 to-pink-600',
            text: 'text-purple-600',
            accent: 'bg-purple-600',
            badge: 'bg-purple-100 text-purple-700'
        },
        red: {
            gradient: 'from-red-600 to-orange-600',
            text: 'text-red-600',
            accent: 'bg-red-600',
            badge: 'bg-red-100 text-red-700'
        },
        green: {
            gradient: 'from-green-600 to-teal-600',
            text: 'text-green-600',
            accent: 'bg-green-600',
            badge: 'bg-green-100 text-green-700'
        },
        blue: {
            gradient: 'from-blue-600 to-cyan-600',
            text: 'text-blue-600',
            accent: 'bg-blue-600',
            badge: 'bg-blue-100 text-blue-700'
        }
    };

    const colors = colorClasses[color] || colorClasses.indigo;

    // Variant styles
    const renderTitle = () => {
        const baseClasses = `${sizeClasses[size]} font-bold leading-tight`;

        switch (variant) {
            case 'gradient':
                return (
                    <h3 className={`${baseClasses} bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                        {title}
                    </h3>
                );

            case 'underline':
                return (
                    <div className="relative inline-block">
                        <h3 className={`${baseClasses} text-gray-800 relative z-10`}>
                            {title}
                        </h3>
                        <div className={`absolute bottom-2 left-0 right-0 h-3 ${colors.accent} opacity-30 -z-0`}></div>
                    </div>
                );

            case 'badge':
                return (
                    <div className="inline-block">
                        <span className={`${colors.badge} px-4 py-2 rounded-full text-sm font-semibold mb-3 inline-block`}>
                            {subtitle || 'Featured'}
                        </span>
                        <h3 className={`${baseClasses} text-gray-800`}>
                            {title}
                        </h3>
                    </div>
                );

            case 'modern':
                return (
                    <div className="flex items-center gap-4 justify-center">
                        <div className={`w-12 h-1 ${colors.accent} rounded-full`}></div>
                        <h3 className={`${baseClasses} text-gray-800`}>
                            {title}
                        </h3>
                        <div className={`w-12 h-1 ${colors.accent} rounded-full`}></div>
                    </div>
                );

            default: // 'default'
                return (
                    <h3 className={`${baseClasses} text-gray-800`}>
                        {title}
                    </h3>
                );
        }
    };

    return (
        <div
            className={`
                mx-auto px-4
                ${alignmentClasses[align]}
                ${align === 'center' ? 'max-w-4xl' : align === 'left' ? 'max-w-full' : 'max-w-full'}
                ${animated ? 'animate-fade-in-up' : ''}
                ${className}
            `}
        >
            {/* Icon */}
            {icon && (
                <div className={`
                    inline-flex items-center justify-center 
                    w-16 h-16 rounded-full 
                    ${colors.badge} 
                    mb-4
                `}>
                    <span className={`text-2xl ${colors.text}`}>
                        {icon}
                    </span>
                </div>
            )}

            {/* Subtitle (if not badge variant) */}
            {subtitle && variant !== 'badge' && (
                <p className={`
                    text-sm md:text-base font-semibold uppercase tracking-wider 
                    ${colors.text} 
                    mb-3
                `}>
                    {subtitle}
                </p>
            )}

            {/* Title */}
            <div className="mb-4">
                {renderTitle()}
            </div>

            {/* Summary */}
            {summary && (
                <p className={`
                    text-base md:text-lg text-gray-600 leading-relaxed
                    ${align === 'center' ? 'max-w-2xl mx-auto' : ''}
                `}>
                    {summary}
                </p>
            )}

            {/* Decorative line (for center alignment with default/gradient variant) */}
            {align === 'center' && (variant === 'default' || variant === 'gradient') && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <div className={`w-16 h-1 ${colors.accent} rounded-full`}></div>
                    <div className={`w-2 h-2 ${colors.accent} rounded-full`}></div>
                    <div className={`w-16 h-1 ${colors.accent} rounded-full`}></div>
                </div>
            )}

            {/* Animation styles */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default SectionTitle;