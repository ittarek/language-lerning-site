import React from "react";
import Container from "../../Componets/Container";
import Cover from "../../Componets/Cover";
import { Helmet } from "react-helmet-async";
import ClassSlider from "./ClassSlider";
import ClassCArd from "./ClassCArd";

const Classes = () => {
  return (
    <Container>
      <section className="relative -top-[69px]">
        <Helmet>
          <title>Summer | Classes</title>
        </Helmet>
        {/* <Cover></Cover> */}

        <div className="">
          <div
            className="bg-dark "
            data-aos="fade-up"
            data-aos-offset="300"
          >
            <div className="w-full h-screen bg-[#c9cbbe] flex items-center justify-center">
             
              <ClassSlider />
            </div>
            <ClassCArd></ClassCArd>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Classes;
