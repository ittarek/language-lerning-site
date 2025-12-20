import { Helmet } from "react-helmet-async";
import Container from "../../Components/Container";
import Banner from "./Banner/Banner";

import AboutUs from "./AboutUs/AboutUs";

import Popular_classes from './Popular_section/Popular_classes';
import Teachers from './Teachers/Teachers ';
import StartingCourse from "./StartingCourse";
import PlanPricing from "./PlanPricing";
import TradingArticle from "./TradingArticle";
import { Event } from "../../Components/Event/Event";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Summer | Home</title>
            </Helmet>


                <Banner></Banner>


                <Popular_classes></Popular_classes>
                <Teachers></Teachers>
                <Event />
                <StartingCourse />
                <PlanPricing />
                <TradingArticle />
                <AboutUs></AboutUs>
        </>
    );
};

export default Home;
