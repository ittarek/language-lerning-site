const OptimizedImage = ({
    src,
    alt,
    aspectRatio = '4/3', // Default aspect ratio
    className = '',
    priority = false,
    objectFit = 'cover'
}) => {
    // Calculate dimensions based on aspect ratio
    const getAspectDimensions = (ratio) => {
        const ratios = {
            '1/1': { width: 400, height: 400 },
            '4/3': { width: 400, height: 300 },
            '16/9': { width: 1920, height: 1080 },
            '3/2': { width: 600, height: 400 },
            '21/9': { width: 1920, height: 823 }, // Ultrawide
        };
        return ratios[ratio] || ratios['4/3'];
    };

    const dimensions = getAspectDimensions(aspectRatio);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
            <img
                src={src}
                alt={alt}
                width={dimensions.width}
                height={dimensions.height}
                loading={priority ? 'eager' : 'lazy'}
                fetchpriority={priority ? 'high' : 'auto'}
                className={`w-full h-full object-${objectFit}`}
                decoding="async"
            />
        </div>
    );
};

export default OptimizedImage;