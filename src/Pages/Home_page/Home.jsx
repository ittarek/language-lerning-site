import { Helmet } from "react-helmet-async";
import Container from "../../Componets/Container";
import Slider from "./Slider/Slider";

import AboutUs from "./AboutUs/AboutUs";

import Popular_classes from './Popular_section/Popular_classes';
import Teachers from './Teachers/Teachers ';
import StartingCourse from "./StartingCourse";
import PlanPricing from "./PlanPricing";
import TrandingArticle from "./TrandingArticle";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Summer | Home</title>
      </Helmet>
      <Container>
        <Slider></Slider>
      </Container>
      <Popular_classes></Popular_classes>
      <Teachers></Teachers>
      <StartingCourse />
      <PlanPricing />
      <TrandingArticle />
      <AboutUs></AboutUs> 
    </div>
  );
};

export default Home;
