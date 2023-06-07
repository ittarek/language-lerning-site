// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper";
import "./Slider.css";
import slider1 from "../../../assets/slider/slider-1.avif";
import slider2 from "../../../assets/slider/slider-2.png";
import slider3 from "../../../assets/slider/slider-3.png";
import slider4 from "../../../assets/slider/slider-4.png";
import { Parallax } from "react-parallax";

const Slider = () => {
  return (
    <div className="relative">
      <>
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide
            data-aos="zoom-in"
            data-aos-offset="300"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-easing="ease-in"
          >
            {" "}
            <Parallax
              blur={{ min: -50, max: 50 }}
              bgImage={slider1}
              bgImageAlt="the Menu"
              strength={-200}
            >
              <div className="hero h-[500px] ">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className=" text-white text-3xl font-bold z-10">
                      "Polyglot Playground: Embark on a Multilingual Adventure"
                    </h1>
                    <p className="mb-5 text-white">
                      Provident cupiditate voluptatem et in. Quaerat fugiat ut
                      assumenda excepturi exercitationem quasi. In deleniti
                      eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            </Parallax>
          </SwiperSlide>
          <SwiperSlide
            data-aos="zoom-in"
            data-aos-offset="300"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-easing="ease-in"
          >
            {" "}
            <Parallax
              blur={{ min: -50, max: 50 }}
              bgImage={slider2}
              bgImageAlt="the Menu"
              strength={-200}
            >
              <div className="hero h-[500px] ">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className=" text-white text-3xl font-bold z-10">
                      "The Language Oasis: Where Words Come Alive"
                    </h1>
                    <p className="mb-5 text-white">
                      Provident cupiditate voluptatem et in. Quaerat fugiat ut
                      assumenda excepturi exercitationem quasi. In deleniti
                      eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            </Parallax>
          </SwiperSlide>

          <SwiperSlide
            data-aos="zoom-in"
            data-aos-offset="300"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-easing="ease-in"
          >
            {" "}
            <Parallax
              blur={{ min: -50, max: 50 }}
              bgImage={slider3}
              bgImageAlt="the Menu"
              strength={-200}
            >
              <div className="hero h-[500px] ">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className=" text-white text-3xl font-bold z-10">
                      "Language Lab: Exploring the Wonders of Linguistics"
                    </h1>
                    <p className="mb-5 text-white">
                      Provident cupiditate voluptatem et in. Quaerat fugiat ut
                      assumenda excepturi exercitationem quasi. In deleniti
                      eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            </Parallax>
          </SwiperSlide>

          <SwiperSlide
            data-aos="zoom-in"
            data-aos-offset="300"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-easing="ease-in"
          >
            {" "}
            <Parallax
              blur={{ min: -50, max: 50 }}
              bgImage={slider4}
              bgImageAlt="the Menu"
              strength={-200}
            >
              <div className="hero h-[500px] ">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className=" text-white text-3xl font-bold z-10">
                      "Mastering Multilingualism: Your Guide to Language
                      Learning"
                    </h1>
                    <p className="mb-5 text-white">
                      Provident cupiditate voluptatem et in. Quaerat fugiat ut
                      assumenda excepturi exercitationem quasi. In deleniti
                      eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            </Parallax>
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default Slider;
