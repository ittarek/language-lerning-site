import { Helmet } from "react-helmet-async";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Container from "../../Components/Container";
import Banner from "./Banner/Banner";
import { LoadingState } from "../../Components/Shared/FetchStates/FetchStates";

// Lazy imports
const AboutUs = lazy(() => import("./AboutUs/AboutUs"));
const Popular_classes = lazy(() => import("./Popular_section/Popular_classes"));
const Teachers = lazy(() => import("./Teachers/Teachers"));
const Event = lazy(() => import("../../Components/Event/Event"));
const StartingCourse = lazy(() => import("./StartingCourse"));
const PlanPricing = lazy(() => import("./PlanPricing"));
const TradingArticle = lazy(() => import("./TradingArticle"));

// Lazy Section Wrapper
const LazySection = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "100px" } // 100px আগেই load শুরু করবে
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={className}>
            {isVisible ? (
                <Suspense
                    fallback={
         
                            <LoadingState/>
                     
                    }
                >
                    {children}
                </Suspense>
            ) : (
                <div className="py-12"></div> // Placeholder
            )}
        </div>
    );
};

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Learning | Home</title>
            </Helmet>

            <Banner />

            <Container>
                <LazySection>
                    <Popular_classes />
                </LazySection>

                <LazySection>
                    <Teachers />
                </LazySection>

                <LazySection>
                    <Event />
                </LazySection>

                <LazySection>
                    <StartingCourse />
                </LazySection>

                <LazySection>
                    <PlanPricing />
                </LazySection>

                <LazySection>
                    <TradingArticle />
                </LazySection>

                <LazySection>
                    <AboutUs />
                </LazySection>
            </Container>
        </>
    );
};

export default Home;

// import { Helmet } from "react-helmet-async";
// import Container from "../../Components/Container";
// import Banner from "./Banner/Banner";
// import AboutUs from "./AboutUs/AboutUs";
// import Popular_classes from './Popular_section/Popular_classes';
// import Teachers from './Teachers/Teachers ';
// import StartingCourse from "./StartingCourse";
// import PlanPricing from "./PlanPricing";
// import TradingArticle from "./TradingArticle";
// import  Event  from "../../Components/Event/Event";

// const Home = () => {
//     return (
//         <>
//             <Helmet>
//                 <title>Learning | Home</title>
//             </Helmet>
//                 <Banner></Banner>
//             <Container>
//                 <Popular_classes></Popular_classes>
//                 <Teachers></Teachers>
//                 <Event />
//                 <StartingCourse />
//                 <PlanPricing />
//                 <TradingArticle />
//                 <AboutUs></AboutUs>
//          </Container>
//         </>
//     );
// };

// export default Home;
