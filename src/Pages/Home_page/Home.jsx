import { Helmet } from "react-helmet-async";
import Container from "../../Componets/Container";
import Slider from "./Slider/Slider";

import AboutUs from "./AboutUs/AboutUs";

import Popular_classes from './Popular_section/Popular_classes';
import Teachers from './Teachers/Teachers ';

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
      <AboutUs></AboutUs>
    </div>
  );
};

export default Home;
