
import React from "react";
import styles from './SectionTitle.module.css'; 
/**
 * Reusable Section Title Component
 * 
 * @param {Object} props
 * @param {string} props.title - Main heading text
 * @param {string} props.subtitle - Optional subtitle above title
 * @param {string} props.summary - Description text below title
 * @param {string} props.align - Alignment: 'left', 'center', 'right' (default: 'center')
 * @param {string} props.variant - Style variant: 'default', 'gradient', 'underline', 'badge', 'modern', 'animated-badge' (default: 'default')
 * @param {string} props.color - Color theme: 'indigo', 'purple', 'red', 'green', 'blue' (default: 'indigo')
 * @param {string} props.size - Size: 'sm', 'md', 'lg', 'xl' (default: 'lg')
 * @param {boolean} props.animated - Enable entrance animation (default: false)
 * @param {React.ReactNode} props.icon - Optional icon component
 * @param {string} props.gradientText - Text to apply gradient (optional, for split gradient effect)
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
    gradientText = '',
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
            badge: 'bg-indigo-100 text-indigo-600',
            ping: 'bg-indigo-400',
            dot: 'bg-indigo-500'
        },
        purple: {
            gradient: 'from-purple-600 to-pink-600',
            text: 'text-purple-600',
            accent: 'bg-purple-600',
            badge: 'bg-purple-100 text-purple-600',
            ping: 'bg-purple-400',
            dot: 'bg-purple-500'
        },
        red: {
            gradient: 'from-red-600 to-orange-600',
            text: 'text-red-600',
            accent: 'bg-red-600',
            badge: 'bg-red-100 text-red-600',
            ping: 'bg-red-400',
            dot: 'bg-red-500'
        },
        green: {
            gradient: 'from-green-600 to-teal-600',
            text: 'text-green-600',
            accent: 'bg-green-600',
            badge: 'bg-green-100 text-green-600',
            ping: 'bg-green-400',
            dot: 'bg-green-500'
        },
        blue: {
            gradient: 'from-blue-600 to-cyan-600',
            text: 'text-blue-600',
            accent: 'bg-blue-600',
            badge: 'bg-blue-100 text-blue-600',
            ping: 'bg-blue-400',
            dot: 'bg-blue-500'
        }
    };

    const colors = colorClasses[color] || colorClasses.indigo;

    // Helper function to split title and apply gradient
    const renderTitleWithGradient = (titleText, gradientWord) => {
        if (!gradientWord) return titleText;

        const parts = titleText.split(gradientWord);
        if (parts.length === 1) return titleText;

        return (
            <>
                {parts[0]}
                <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                    {gradientWord}
                </span>
                {parts[1]}
            </>
        );
    };

    // Variant styles
    const renderTitle = () => {
        const baseClasses = `${sizeClasses[size]} font-extrabold leading-tight text-gray-900`;

        switch (variant) {
            case 'animated-badge':
                return (
                    <>
                        {/* Animated Badge */}
                        <div className={`inline-flex items-center gap-2 ${colors.badge} px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.ping} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot}`}></span>
                            </span>
                            {subtitle || 'New'}
                        </div>

                        {/* Title with optional gradient text */}
                        <h2 className={baseClasses}>
                            {renderTitleWithGradient(title, gradientText)}
                        </h2>
                    </>
                );

            case 'gradient':
                return (
                    <h3 className={`${baseClasses} bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                        {title}
                    </h3>
                );

            case 'gradient-text':
                return (
                    <h2 className={baseClasses}>
                        {renderTitleWithGradient(title, gradientText)}
                    </h2>
                );

            case 'underline':
                return (
                    <div className="relative inline-block">
                        <h3 className={`${baseClasses} relative z-10`}>
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
                        <h3 className={baseClasses}>
                            {title}
                        </h3>
                    </div>
                );

            case 'modern':
                return (
                    <div className="flex items-center gap-4 justify-center">
                        <div className={`w-12 h-1 ${colors.accent} rounded-full`}></div>
                        <h3 className={baseClasses}>
                            {title}
                        </h3>
                        <div className={`w-12 h-1 ${colors.accent} rounded-full`}></div>
                    </div>
                );

            case 'icon':
                return (
                    <>
                        {/* Badge with Icon */}
                        <div className={`inline-flex items-center gap-2 ${colors.badge} px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                            {icon && (
                                <span className="w-4 h-4">
                                    {icon}
                                </span>
                            )}
                            {subtitle || 'Featured'}
                        </div>

                        {/* Title with optional gradient text */}
                        <h2 className={baseClasses}>
                            {renderTitleWithGradient(title, gradientText)}
                        </h2>
                    </>
                );

            default:
                return (
                    <h3 className={baseClasses}>
                        {title}
                    </h3>
                );
        }
    };

    return (
        <div
            className={`
                mx-auto px-4 mb-12 space-y-4
                ${alignmentClasses[align]}
                ${align === 'center' ? 'max-w-4xl' : 'max-w-full'}
                ${animated ? styles.animateFadeInUp : ''}
                ${className}
            `}
        >
            {/* Icon (for non-animated-badge and non-icon variants) */}
            {icon && variant !== 'animated-badge' && variant !== 'icon' && (
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

            {/* Subtitle (for non-badge, non-animated-badge, and non-icon variants) */}
            {subtitle && variant !== 'badge' && variant !== 'animated-badge' && variant !== 'icon' && (
                <p className={`
                    text-sm md:text-base font-semibold uppercase tracking-wider 
                    ${colors.text} 
                    mb-3
                `}>
                    {subtitle}
                </p>
            )}

            {/* Title */}
            <div className={variant === 'animated-badge' || variant === 'icon' ? '' : 'mb-4'}>
                {renderTitle()}
            </div>

            {/* Summary */}
            {summary && (
                <p className={`
                    text-gray-600 text-lg leading-relaxed
                    ${align === 'center' ? 'max-w-2xl mx-auto' : ''}
                `}>
                    {summary}
                </p>
            )}

            {/* Decorative line (for all center-aligned variants) */}
            {align === 'center' && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <div className={`w-16 h-1 ${colors.accent} rounded-full`}></div>
                    <div className={`w-2 h-2 ${colors.accent} rounded-full`}></div>
                    <div className={`w-16 h-1 ${colors.accent} rounded-full`}></div>
                </div>
            )}

          
  
        </div>
    );
};

export default SectionTitle;