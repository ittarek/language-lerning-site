import { Helmet } from 'react-helmet-async';
import { lazy, Suspense, useEffect, useState } from 'react';
import Container from '../../Components/Container';
import Banner from './Banner/Banner';
import PricingPage from './Pricing/PricingPage';

// ✅ Lazy imports
const AboutUs = lazy(() => import('./AboutUs/AboutUs'));
const Popular_classes = lazy(() => import('./Popular_section/Popular_classes'));
const Teachers = lazy(() => import('./Instructor/Instructor'));
const Event = lazy(() => import('../../Components/Event/Event'));
const StartingCourse = lazy(() => import('./StartingCourse'));
const TradingArticle = lazy(() => import('./TradingArticle/TradingArticle'));

// ✅ Lightweight Skeleton
const SectionSkeleton = () => (
  <div className="py-8 sm:py-12 max-w-7xl mx-auto">
    <div className="h-6 sm:h-8 bg-gray-200 rounded w-48 sm:w-64 mx-auto mb-6 sm:mb-8 animate-pulse"></div>
  </div>
);

const Home = () => {
  const [shouldPreload, setShouldPreload] = useState(false);

  // ✅ Preload all sections after initial render
  useEffect(() => {
    // Small delay to let Banner load first
    const timer = setTimeout(() => {
      setShouldPreload(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Preload components in background
  useEffect(() => {
    if (shouldPreload) {
      // Force all lazy components to start loading
      const preloadComponents = async () => {
        try {
          await Promise.all([
            import('./AboutUs/AboutUs'),
            import('./Popular_section/Popular_classes'),
            import('./Instructor/Instructor'),
            import('../../Components/Event/Event'),
            import('./StartingCourse'),
            import('./TradingArticle/TradingArticle'),
          ]);
        } catch (error) {
          console.error('Preload error:', error);
        }
      };

      preloadComponents();
    }
  }, [shouldPreload]);

  return (
    <main id="home">
      <Helmet>
        <title>Learning | Home</title>
      </Helmet>

      {/* ✅ Banner loads first - priority */}
      <Banner />

      <Container>
        {/* ✅ All sections with fixed heights for CLS prevention */}

        {/* Popular Classes - First visible section */}
        <section
          id="popular-classes"
          className="min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          <Suspense fallback={<SectionSkeleton />}>
            <Popular_classes />
          </Suspense>
        </section>

        {/* Teachers */}
        <section
          id="teachers"
          className="min-h-[350px] sm:min-h-[400px] md:min-h-[500px]">
          <Suspense fallback={<SectionSkeleton />}>
            {shouldPreload && <Teachers />}
          </Suspense>
        </section>

        {/* Events */}
        <section id="events" className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
          <Suspense fallback={<SectionSkeleton />}>{shouldPreload && <Event />}</Suspense>
        </section>

        {/* Starting Course */}
        <section
          id="starting_course"
          className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
          <Suspense fallback={<SectionSkeleton />}>
            {shouldPreload && <StartingCourse />}
          </Suspense>
        </section>

        {/* Pricing */}
        <section id="pricing" className="min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
          <Suspense fallback={<SectionSkeleton />}>
            {shouldPreload && <PricingPage />}
          </Suspense>
        </section>

        {/* Trading Article */}
        <section id="article" className="min-h-[350px] sm:min-h-[400px] md:min-h-[500px]">
          <Suspense fallback={<SectionSkeleton />}>
            {shouldPreload && <TradingArticle />}
          </Suspense>
        </section>

        {/* About Us */}
        <section id="about" className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
          <Suspense fallback={<SectionSkeleton />}>
            {shouldPreload && <AboutUs />}
          </Suspense>
        </section>
      </Container>
    </main>
  );
};

export default Home;
