import React from 'react';
import Container from '../../../Componets/Container';
import aboutImg from "../../../assets/images/about-us.png";
import './AboutUs.css'
import CountUp from "react-countup";

const AboutUs = () => {
          return (
             
                    <Container>
                              <h1 className='uppercase text-4xl font-bold mt-10 shadow-md text-center'>About Us</h1>
                      <div className='lg:flex my-10 gap-10'>
                        <div className='col'>
                          <div className="about__img">
                            <img src={aboutImg} alt="" className="w-100" />
                          </div>
                        </div>
              
                        <div >
                          <div className="about__content">
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
                    </Container>
              
          );
};

export default AboutUs;