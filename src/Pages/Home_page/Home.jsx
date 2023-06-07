
import { Helmet } from "react-helmet-async";
import Container from "../../Componets/Container";
import Slider from "./Slider/Slider";

import AboutUs from "./AboutUs/AboutUs";
import Popular_section from "./Popular_section/Popular_section";

const Home = () => {
  return (
    <div>
          <Helmet><title>Summer | Home</title></Helmet>
<Container><Slider></Slider></Container>
<Popular_section></Popular_section>
<AboutUs></AboutUs>
   
    </div>
  );
};

export default Home;
