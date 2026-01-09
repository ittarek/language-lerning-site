import { useState } from 'react';
import './OptimizedImage.css';
/**
 * Optimized Image Component - Combines aspect ratio control with image optimization
 *
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {number} props.width - Optional explicit width
 * @param {number} props.height - Optional explicit height
 * @param {string} props.aspectRatio - Aspect ratio ('1/1', '4/3', '16/9', '3/2', '21/9')
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.priority - Load image with high priority (for above-the-fold)
 * @param {string} props.sizes - Responsive image sizes attribute
 * @param {string} props.objectFit - CSS object-fit property ('cover', 'contain', 'fill')
 */

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  className = '',
  priority = false,
  sizes = '100vw',
  objectFit = 'cover',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Aspect ratio presets with optimal dimensions
  const aspectRatioPresets = {
    '1/1': { width: 400, height: 400 }, // Square (avatars, thumbnails)
    '4/3': { width: 800, height: 600 }, // Standard (cards, photos)
    '16/9': { width: 1920, height: 1080 }, // Widescreen (hero, video)
    '3/2': { width: 900, height: 600 }, // Classic photo
    '21/9': { width: 1920, height: 823 }, // Ultrawide
    '2/3': { width: 600, height: 900 }, // Portrait
    // ✅ Add custom ratios
    '18/9': { width: 1920, height: 960 }, // Taller than 21/9
    '16/10': { width: 1920, height: 1200 }, // Even taller
    '2/1': { width: 1920, height: 960 }, // Simple 2:1
  };

  // Get dimensions from aspect ratio or use explicit width/height
  const getDimensions = () => {
    if (width && height) {
      return { width, height };
    }
    if (aspectRatio && aspectRatioPresets[aspectRatio]) {
      return aspectRatioPresets[aspectRatio];
    }
    // Default fallback
    return { width: 800, height: 600 };
  };

  const dimensions = getDimensions();

  // Convert Unsplash/Freepik URLs to optimized versions
  const getOptimizedUrl = (url, targetWidth) => {
    if (!url) return '';

    // Unsplash optimization
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?w=${targetWidth}&q=75&fm=webp&fit=max&auto=format`;
    }

    // Freepik optimization
    if (url.includes('freepik.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?w=${targetWidth}&t=webp`;
    }

    // For other sources, return as-is
    return url;
  };

  // Generate srcset for responsive images
  const generateSrcSet = url => {
    // Generate multiple sizes based on the target width
    const baseWidth = dimensions.width;
    const widths = [
      Math.round(baseWidth * 0.25), // 25%
      Math.round(baseWidth * 0.5), // 50%
      Math.round(baseWidth * 0.75), // 75%
      baseWidth, // 100%
      Math.round(baseWidth * 1.5), // 150% for high-DPI
      Math.round(baseWidth * 2), // 200% for retina
    ].filter(w => w >= 320 && w <= 2560); // Reasonable bounds

    return widths.map(w => `${getOptimizedUrl(url, w)} ${w}w`).join(', ');
  };

  const handleLoad = () => setIsLoading(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Error state
  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{
          aspectRatio: aspectRatio || `${dimensions.width}/${dimensions.height}`,
          width: width ? `${width}px` : '100%',
        }}>
        <div className="text-center text-gray-400">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">Image unavailable</span>
        </div>
      </div>
    );
  }

  // Wrapper style for aspect ratio
  const wrapperStyle = aspectRatio
    ? { aspectRatio }
    : { width: dimensions.width, height: dimensions.height };

  return (
    <div className={`relative overflow-hidden ${className}`} style={wrapperStyle}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent" />
        </div>
      )}

      {/* Optimized Image */}
      <img
        src={getOptimizedUrl(src, dimensions.width)}
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`
                    w-full h-full object-${objectFit}
                    ${isLoading ? 'opacity-0' : 'opacity-100'}
                    transition-opacity duration-500
                `}
      />
    </div>
  );
};

export default OptimizedImage;
