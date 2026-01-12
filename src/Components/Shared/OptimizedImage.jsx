import { useState, useEffect, useRef } from 'react';
import './OptimizedImage.css';

/**
 * Mobile-Optimized Image Component
 * Features:
 * - Intersection Observer for lazy loading
 * - Mobile-first responsive images
 * - Automatic format detection (WebP/AVIF)
 * - Blur-up loading effect
 * - Network-aware loading (save data mode)
 * - Touch-optimized for mobile
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
  placeholder, // Optional blur placeholder
  quality = 75, // Image quality (1-100)
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);

  // Detect device pixel ratio for retina displays
  useEffect(() => {
    setDevicePixelRatio(window.devicePixelRatio || 1);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Mobile-first aspect ratio presets
  const aspectRatioPresets = {
    '1/1': { width: 400, height: 400, mobile: { width: 320, height: 320 } },
    '4/3': { width: 800, height: 600, mobile: { width: 480, height: 360 } },
    '16/9': { width: 1920, height: 1080, mobile: { width: 640, height: 360 } },
    '3/2': { width: 900, height: 600, mobile: { width: 480, height: 320 } },
    '21/9': { width: 1920, height: 823, mobile: { width: 640, height: 274 } },
    '2/3': { width: 600, height: 900, mobile: { width: 320, height: 480 } },
    '18/9': { width: 1920, height: 960, mobile: { width: 640, height: 320 } },
    '16/10': { width: 1920, height: 1200, mobile: { width: 640, height: 400 } },
    '2/1': { width: 1920, height: 960, mobile: { width: 640, height: 320 } },
  };

  // Get dimensions based on device
  const getDimensions = () => {
    const isMobile = window.innerWidth < 768;

    if (width && height) {
      return { width, height };
    }

    if (aspectRatio && aspectRatioPresets[aspectRatio]) {
      const preset = aspectRatioPresets[aspectRatio];
      return isMobile ? preset.mobile : preset;
    }

    // Mobile-first fallback
    return isMobile ? { width: 480, height: 360 } : { width: 800, height: 600 };
  };

  const dimensions = getDimensions();

  // Check if browser supports modern formats
  const supportsWebP = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };

  // Check if user has enabled data saver
  const isDataSaverEnabled = () => {
    return navigator?.connection?.saveData || false;
  };

  // Optimize image URL with mobile-specific parameters
  const getOptimizedUrl = (url, targetWidth) => {
    if (!url) return '';

    const isMobile = window.innerWidth < 768;
    const dataSaver = isDataSaverEnabled();
    const adjustedQuality = dataSaver ? Math.max(50, quality - 25) : quality;

    // Adjust for device pixel ratio (retina)
    const effectiveWidth = Math.round(targetWidth * Math.min(devicePixelRatio, 2));

    // Unsplash optimization
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      const format = supportsWebP() ? 'webp' : 'jpg';
      return `${baseUrl}?w=${effectiveWidth}&q=${adjustedQuality}&fm=${format}&fit=max&auto=format&dpr=${devicePixelRatio}`;
    }

    // Freepik optimization
    if (url.includes('freepik.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?w=${effectiveWidth}&q=${adjustedQuality}&t=${
        supportsWebP() ? 'webp' : 'jpg'
      }`;
    }

    // Cloudinary optimization
    if (url.includes('cloudinary.com')) {
      const format = supportsWebP() ? 'f_webp' : 'f_auto';
      return url.replace(
        '/upload/',
        `/upload/w_${effectiveWidth},q_${adjustedQuality},${format}/`
      );
    }

    // ImgIX optimization
    if (url.includes('imgix.net')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}w=${effectiveWidth}&q=${adjustedQuality}&auto=format&fit=max&dpr=${devicePixelRatio}`;
    }

    return url;
  };

  // Mobile-optimized srcset (fewer breakpoints for faster loading)
  const generateSrcSet = url => {
    const baseWidth = dimensions.width;
    const isMobile = window.innerWidth < 768;

    // Mobile: fewer sizes, smaller range
    // Desktop: more sizes, larger range
    const widths = isMobile
      ? [
          320, // Small phone
          480, // Large phone
          640, // Phablet
          Math.round(baseWidth * 1.5), // Retina
        ]
      : [
          Math.round(baseWidth * 0.5),
          Math.round(baseWidth * 0.75),
          baseWidth,
          Math.round(baseWidth * 1.5),
          Math.round(baseWidth * 2),
        ];

    return widths
      .filter(w => w >= 320 && w <= 2560)
      .map(w => `${getOptimizedUrl(url, w)} ${w}w`)
      .join(', ');
  };

  // Mobile-optimized sizes attribute
  const generateSizes = () => {
    if (sizes !== '100vw') return sizes;

    // More specific sizes for better performance
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  const handleLoad = () => setIsLoading(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Error state with mobile-friendly design
  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{
          aspectRatio: aspectRatio || `${dimensions.width}/${dimensions.height}`,
          minHeight: '120px', // Prevent tiny error boxes on mobile
        }}>
        <div className="text-center text-gray-400 p-4">
          <svg
            className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2"
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
          <span className="text-xs md:text-sm">Image unavailable</span>
        </div>
      </div>
    );
  }

  // Wrapper style
  const wrapperStyle = aspectRatio
    ? { aspectRatio }
    : {
        width: '100%',
        maxWidth: dimensions.width,
        aspectRatio: `${dimensions.width}/${dimensions.height}`,
      };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={wrapperStyle}>
      {/* Blur placeholder (optional) */}
      {placeholder && isLoading && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
        />
      )}

      {/* Loading skeleton with mobile-optimized animation */}
      {isLoading && !placeholder && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent" />
        </div>
      )}

      {/* Main image - only load when in view */}
      {isInView && (
        <img
          src={getOptimizedUrl(src, dimensions.width)}
          srcSet={generateSrcSet(src)}
          sizes={generateSizes()}
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
            ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
            transition-all duration-500 ease-out
          `}
          style={{
            // Prevent layout shift
            contentVisibility: 'auto',
            // Hardware acceleration for mobile
            transform: 'translateZ(0)',
            willChange: isLoading ? 'opacity, transform' : 'auto',
          }}
        />
      )}

      {/* Data saver indicator (optional) */}
      {isDataSaverEnabled() && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          💾 Data Saver
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// 1. Hero Image (Above fold - high priority)
<OptimizedImage
  src="https://images.unsplash.com/photo-1234567890"
  alt="Hero"
  aspectRatio="16/9"
  priority={true}
  quality={85}
  className="w-full"
/>

// 2. Card Image (Below fold - lazy load)
<OptimizedImage
  src="https://images.unsplash.com/photo-1234567890"
  alt="Card"
  aspectRatio="4/3"
  quality={75}
  className="rounded-lg"
/>

// 3. With blur placeholder
<OptimizedImage
  src="https://images.unsplash.com/photo-1234567890"
  placeholder="data:image/jpeg;base64,/9j/4AAQ..." // tiny base64 blur
  alt="Product"
  aspectRatio="1/1"
/>

// 4. Mobile-first card grid
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {products.map(product => (
    <OptimizedImage
      key={product.id}
      src={product.image}
      alt={product.name}
      aspectRatio="1/1"
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
    />
  ))}
</div>

// 5. Responsive hero with different images for mobile/desktop
<picture>
  <source
    media="(max-width: 767px)"
    srcSet="hero-mobile.webp"
  />
  <OptimizedImage
    src="hero-desktop.webp"
    alt="Hero"
    aspectRatio="21/9"
    priority={true}
  />
</picture>
*/
