import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../../../assets/slider/slider-4.png';
import OptimizedImage from '../../../Components/Shared/OptimizedImage';
import GlassNavigation from '../../../Testing/GlassNavigation';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useContext } from 'react';
import { CTAPrimaryButton, CTASecondaryButton } from '../../../Components/ui/Button';

const Banner = ({ onSectionClick }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGetStarted = () => {
    if (user && user.email) {
      navigate('/classes');
    } else {
      navigate('/login');
    }
  };

  return (
    // ✅ Mobile-first responsive heights
    <div className="relative overflow-hidden -mt-6 md:mt-0 min-h-[700px] sm:min-h-[750px] md:min-h-[800px] lg:min-h-[850px]">
      <GlassNavigation onSectionClick={onSectionClick} />

      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/60 to-pink-900/60"></div>
      </div>

      {/* Animated decorative shapes - reduced on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-32 h-32 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-3 sm:space-y-4 md:space-y-6 order-2 lg:order-1">
            {/* Badge - Fixed height */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/30 h-[32px] sm:h-[36px]">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-yellow-400"></span>
              </span>
              <span className="text-white text-xs sm:text-sm font-semibold whitespace-nowrap">
                10,000+ Active Learners
              </span>
            </div>

            {/* Heading - Mobile optimized fixed height */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight min-h-[80px] sm:min-h-[100px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-start">
              <span className="block">Mastering Your Guide to</span>
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-1 sm:mt-2">
                Language Learning
              </span>
            </h1>

            {/* Description - Mobile optimized */}
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-xl min-h-[90px] sm:min-h-[100px] md:min-h-[120px]">
              Our interactive and engaging classes will inspire and challenge you. With
              our user-friendly platform and supportive community, you'll embark on a
              fulfilling educational adventure. Join us today and unlock your full
              potential!
            </p>

            {/* Stats - Mobile optimized */}
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-8 py-3 sm:py-4 min-h-[70px] sm:min-h-[80px]">
              <div className="min-w-[60px]">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-white/80">Courses</div>
              </div>
              <div className="border-l border-white/30 pl-3 sm:pl-4 md:pl-6 lg:pl-8 min-w-[70px]">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  20+
                </div>
                <div className="text-xs sm:text-sm text-white/80">Instructors</div>
              </div>
              <div className="border-l border-white/30 pl-3 sm:pl-4 md:pl-6 lg:pl-8 min-w-[70px]">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  95%
                </div>
                <div className="text-xs sm:text-sm text-white/80">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons - Mobile optimized */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 md:gap-4 min-h-[100px] sm:min-h-[60px]">
              <CTAPrimaryButton text="Get Started" onClick={handleGetStarted} />
              <CTASecondaryButton text="Browse Classes" to="/classes" />
            </div>
          </div>

          {/* Right Image - Mobile optimized */}
          <div className="relative order-1 lg:order-2">
            {/* Decorative elements - hidden on mobile */}
            <div className="hidden md:block absolute -top-6 -right-6 w-48 h-48 lg:w-72 lg:h-72 bg-yellow-400/10 rounded-full blur-2xl"></div>
            <div className="hidden md:block absolute -bottom-6 -left-6 w-48 h-48 lg:w-72 lg:h-72 bg-pink-400/10 rounded-full blur-2xl"></div>

            {/* Main image - Mobile first aspect ratio */}
            <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border sm:border-2 md:border-4 border-white/20 backdrop-blur-sm">
              {/* ✅ Mobile-specific aspect ratio */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/10]">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="Language Learning"
                  aspectRatio="16/9"
                  priority={true}
                  quality={85}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  objectFit="cover"
                />
              </div>

              {/* Floating badge - Mobile optimized */}
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 shadow-xl animate-bounce-slow w-[120px] sm:w-[140px] md:w-[160px]">
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 truncate">
                      Success Rate
                    </div>
                    <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                      95%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration - Mobile optimized */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true">
          <path
            d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 24C1200 27 1320 37 1380 42.7L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
