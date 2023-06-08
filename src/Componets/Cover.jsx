import React from "react";
import { Parallax } from "react-parallax";
import Container from "./Container";

const Cover = ({ image, title }) => {
  return (
  
 <Container>
           <section className="relative -top-12">
              <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={image}
      bgImageAlt="the Menu"
      strength={-200}
    >
      <div
        className="hero h-[500px] "
    
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
           
          </div>
        </div>
      </div>
    </Parallax>
  </section>
 </Container>
  );
};

export default Cover;
