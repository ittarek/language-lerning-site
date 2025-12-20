import React from "react";
import Container from "../../../Components/Container";
import aboutImg from "../../../assets/images/about-us.png";
import "./AboutUs.css";
import CountUp from "react-countup";
import SectionTitle from "../../../Components/SectionTitle";

const AboutUs = () => {
    return (
        <Container>
            {/* TODO */}
            <div>
                <SectionTitle title="about us" />
                <div className="lg:flex my-10 gap-10">
                    <div className="col">
                        <div
                            className="about__img"
                            data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000"
                        >
                            <img src={aboutImg} alt="" className="w-100" />
                        </div>
                    </div>

                    <div>
                        <div
                            className="about__content"
                            data-aos="fade-up"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1500"
                        >
                            <h2>About Us</h2>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Excepturi cupiditate animi deserunt libero nesciunt corporis
                                explicabo nobis ex quo molestiae!
                            </p>

                            <div className="about__counter flex gap-24 mt-10">
                                <div className="">
                                    <div className="single__counter">
                                        <span className="counter mb-10">
                                            <CountUp start={0} end={25} duration={2} suffix="K" />
                                        </span>

                                        <p className="counter__title">Completed Classes</p>
                                    </div>

                                    <div className="single__counter">
                                        <span className="counter">
                                            <CountUp start={0} end={12} duration={2} suffix="M" />
                                        </span>

                                        <p className="counter__title">Students Around World</p>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="single__counter">
                                        <span className="counter mb-10">
                                            <CountUp start={0} end={95} duration={2} suffix="M" />
                                        </span>

                                        <p className="counter__title">Ideas Raised Classes</p>
                                    </div>

                                    <div className="single__counter">
                                        <span className="counter">
                                            <CountUp start={0} end={5} duration={2} suffix="K" />
                                        </span>

                                        <p className="counter__title">Categories Served</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AboutUs;
