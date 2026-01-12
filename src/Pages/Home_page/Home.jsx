import { Helmet } from 'react-helmet-async';
import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from 'react';
import Container from '../../Components/Container';
import Banner from './Banner/Banner';
import { LoadingState } from '../../Components/Shared/FetchStates/LoadingState';
import PricingPage from './Pricing/PricingPage';

// ✅ Lazy imports
const AboutUs = lazy(() => import('./AboutUs/AboutUs'));
const Popular_classes = lazy(() => import('./Popular_section/Popular_classes'));
const Teachers = lazy(() => import('./Instructor/Instructor'));
const Event = lazy(() => import('../../Components/Event/Event'));
const StartingCourse = lazy(() => import('./StartingCourse'));
const TradingArticle = lazy(() => import('./TradingArticle/TradingArticle'));

// ✅ Context for managing section loading
const SectionLoadContext = createContext();

// ✅ Skeleton Loader
const SectionSkeleton = () => (
  <div className="py-12 animate-pulse max-w-7xl mx-auto">
    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
      ))}
    </div>
  </div>
);

// ✅ Enhanced Lazy Section
const LazySection = ({
  children,
  className = '',
  minHeight = 'min-h-[400px]',
  sectionId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const { forceLoadSection } = useContext(SectionLoadContext);

  useEffect(() => {
    // ✅ Check if this section needs to be force loaded
    if (forceLoadSection === sectionId) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [forceLoadSection, sectionId]);

  return (
    <div ref={ref} className={`${className} ${minHeight}`}>
      {isVisible ? (
        <Suspense fallback={<SectionSkeleton />}>{children}</Suspense>
      ) : (
        <div className="py-12"></div>
      )}
    </div>
  );
};

const Home = () => {
  const [forceLoadSection, setForceLoadSection] = useState(null);

  // ✅ Callback for GlassNavigation
  const handleSectionClick = sectionId => {
    setForceLoadSection(sectionId);
  };

  return (
    <SectionLoadContext.Provider value={{ forceLoadSection }}>
      <main id="home">
        <Helmet>
          <title>Learning | Home</title>
        </Helmet>

        {/* ✅ Banner with GlassNavigation */}
        <Banner onSectionClick={handleSectionClick} />

        <Container>
          {/* ✅ Popular Classes - সরাসরি load */}
          <section id="popular-classes">
            <Suspense fallback={<SectionSkeleton />}>
              <Popular_classes />
            </Suspense>
          </section>

          {/* ✅ Teachers - Lazy load */}
          <LazySection
            minHeight="min-h-[350px] sm:min-h-[400px] md:min-h-[500px]"
            sectionId="teachers">
            <section id="teachers">
              <Teachers />
            </section>
          </LazySection>

          {/* ✅ Events - Lazy load */}
          <LazySection
            minHeight="min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
            sectionId="events">
            <section id="events">
              <Event />
            </section>
          </LazySection>

          {/* ✅ Starting Course - Lazy load */}
          <LazySection
            minHeight="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
            sectionId="starting_course">
            <section id="starting_course">
              <StartingCourse />
            </section>
          </LazySection>

          {/* ✅ Pricing - Lazy load */}
          <LazySection
            minHeight="min-h-[500px] sm:min-h-[600px] md:min-h-[700px]"
            sectionId="pricing">
            <section id="pricing">
              <PricingPage />
            </section>
          </LazySection>

          {/* ✅ Trading Article - Lazy load */}
          <LazySection
            minHeight="min-h-[350px] sm:min-h-[400px] md:min-h-[500px]"
            sectionId="article">
            <section id="article">
              <TradingArticle />
            </section>
          </LazySection>

          {/* ✅ About Us - Lazy load */}
          <LazySection
            minHeight="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
            sectionId="about">
            <section id="about">
              <AboutUs />
            </section>
          </LazySection>
        </Container>
      </main>
    </SectionLoadContext.Provider>
  );
};

export default Home;
