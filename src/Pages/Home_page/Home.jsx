
import { Helmet } from "react-helmet-async";
import Container from "../../Componets/Container";
import Slider from "./Slider/Slider";
import Popular_Classes from "./AboutUs/AboutUs";

const Home = () => {
  return (
    <div>
          <Helmet><title>Summer | Home</title></Helmet>
<Container><Slider></Slider></Container>
<Popular_Classes></Popular_Classes>
   
    </div>
  );
};

export default Home;
