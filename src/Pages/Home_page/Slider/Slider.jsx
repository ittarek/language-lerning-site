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
    <div className="relative dark">
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
            data-aos="zoom-out"
            data-aos-offset="300"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-easing="ease-out"
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
                    Welcome to our learner website, your hub for transformative
                    education and personal growth. Here, we believe that
                    learning is a lifelong journey.
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
              bgImage="https://images.unsplash.com/photo-1526378787940-576a539ba69d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
              bgImageAlt="the Menu"
              strength={-200}
            >
              <div className="hero h-[500px] ">
                <div className="hero-overlay bg-opacity-25"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className=" text-white text-3xl font-bold z-10">
                      "The Language Oasis: Where Words Come Alive"
                    </h1>
                    <p className="mb-5 text-white">
                      and we are committed to empowering you with the knowledge
                      and skills you need to thrive in a rapidly changing world.
                      Our diverse range of courses.
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
              bgImage="https://images.unsplash.com/photo-1670109944124-d0772802a518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=931&q=80"
              bgImageAlt="the Menu"
              strength={-200}
            >
              <div className="hero h-[500px] ">
                <div className="hero-overlay bg-opacity-25"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className=" text-white text-3xl font-bold z-10">
                      "Language Lab: Exploring the Wonders of Linguistics"
                    </h1>
                    <p className="mb-5 text-white">
                      taught by expert instructors, caters to learners of all
                      levels and interests. Whether you're a beginner eager to
                      explore new subjects or an experienced learner seeking
                      advanced knowledge.
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
                <div className="hero-overlay bg-opacity-25"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className=" text-white text-3xl font-bold z-10">
                      "Mastering Your Guide to Language
                      Learning"
                    </h1>
                    <p className="mb-5 text-white">
                      our interactive and engaging classes will inspire and
                      challenge you. With our user-friendly platform,
                      and supportive community,
                      you'll embark on a fulfilling educational adventure. Join
                      us today and unlock your full potential!
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
