
import { Helmet } from "react-helmet-async";
import Container from "../../Componets/Container";
import Slider from "./Slider/Slider";

const Home = () => {
  return (
    <div>
          <Helmet><title>Summer | Home</title></Helmet>
<Container><Slider></Slider></Container>
   
    </div>
  );
};

export default Home;
