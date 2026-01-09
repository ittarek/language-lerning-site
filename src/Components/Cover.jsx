import React from 'react';
import { Parallax } from 'react-parallax';
import Container from './Container';

/**
 * Professional Hero / Cover component with parallax background
 * @param {Object} props
 * @param {string} [props.image] - Background image URL
 * @param {string} [props.title] - Main headline
 * @param {string} [props.subtitle] - Supporting text
 * @param {number} [props.overlayOpacity=45] - 0-100 darkness overlay
 * @param {number|string} [props.height='70vh'] - Height (px or vh/rem etc)
 * @param {number|{min:number, max:number}} [props.blur=0] - Blur effect
 * @param {number} [props.strength=-180] - Parallax strength
 * @param {React.ReactNode} [props.children] - Buttons / CTA content
 * @param {string} [props.className] - Additional classes for the section
 */
const Cover = ({
  image = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2400',
  title = '',
  subtitle = '',
  overlayOpacity = 45,
  height = '70vh',
  blur = 0,
  strength = -180,
  children,
  className = '',
}) => {
  // Handle both number and object blur values
  const blurValue = typeof blur === 'number' ? blur : blur.min;

  return (
    <Container className={className}>
      <section className="relative -mt-16 md:-mt-20 w-full">
        <Parallax
          blur={blurValue}
          bgImage={image}
          bgImageAlt={title || 'Hero background'}
          strength={strength}
          bgImageStyle={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}>
          <div
            className="hero relative flex items-center justify-center text-center text-white"
            style={{ height: typeof height === 'number' ? `${height}px` : height }}>
            {/* Overlay */}
            <div
              className="absolute inset-0 z-10 bg-black transition-opacity duration-700"
              style={{ opacity: overlayOpacity / 100 }}
            />

            {/* Content */}
            <div className="hero-content relative z-20 px-5 py-24 sm:py-32 md:py-40 lg:py-48 xl:py-56">
              <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
                {title && (
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase drop-shadow-xl">
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto drop-shadow-lg opacity-95">
                    {subtitle}
                  </p>
                )}

                {children && (
                  <div className="pt-6 md:pt-10 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                    {children}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Parallax>
      </section>
    </Container>
  );
};

export default Cover;
