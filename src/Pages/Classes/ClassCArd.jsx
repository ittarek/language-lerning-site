import React, { useContext } from "react";
import "./ClassCard.css";
import img1 from "../../assets/class-card/portfolio1.jpg";

import img2 from "../../assets/class-card/portfolio2.jpg";
import img3 from "../../assets/class-card/portfolio3.jpg";
import img4 from "../../assets/class-card/portfolio4.jpg";
import img5 from "../../assets/class-card/portfolio5.png";
import img6 from "../../assets/class-card/portfolio6.jpg";
import { Link } from "react-router-dom";
import SectionTitle from "../../Componets/SectionTitle";
import { AuthContext } from "./../../Provider/AuthProvider";
const ClassCArd = () => {
  const { user } = useContext(AuthContext);
  // TODO 
  const Available_seats = 0;
  return (
    <section  className="">
      <SectionTitle
        title="Out Popular Class"
        summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quisquam. "
      >
        {" "}
      </SectionTitle>

      <div className=" portfolio__container grid lg:grid-cols-3 gap-5 ">
        <article className="class__item p-6 rounded-3xl hover:bg-transparent hover:border-sky-200 bg-slate-300">
          <div className="">
            <img
              className="rounded-2xl overflow-hidden"
              src={img1}
              alt="class"
            />
          </div>
          <h3 className="m-2">This is Class Name</h3>
          <p>Instructors</p>
          <p>Available seats</p>
          <p>Price</p>
          <div className="">
          {Available_seats>0  ||   <button className="btn">
              {" "}
              <Link to="/selectClass">Select</Link>
            </button>}
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={img2} alt="Portfolio" />
          </div>
          <h3>This is Portfolio Title</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com" className="btn">
              Github
            </a>
            <a
              href="https://www.youtube.com/c/RajacharlesSRD"
              target="_blank"
              className="btn btn-primary"
            >
              Demo
            </a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={img3} alt="Portfolio" />
          </div>
          <h3>This is Portfolio Title</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com" className="btn">
              Github
            </a>
            <a
              href="https://www.youtube.com/c/RajacharlesSRD"
              target="_blank"
              className="btn btn-primary"
            >
              Demo
            </a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={img4} alt="Portfolio" />
          </div>
          <h3>This is Portfolio Title</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com" className="btn">
              Github
            </a>
            <a
              href="https://www.youtube.com/c/RajacharlesSRD"
              target="_blank"
              className="btn btn-primary"
            >
              Demo
            </a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={img5} alt="Portfolio" />
          </div>
          <h3>This is Portfolio Title</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com" className="btn">
              Github
            </a>
            <a
              href="https://www.youtube.com/c/RajacharlesSRD"
              target="_blank"
              className="btn btn-primary"
            >
              Demo
            </a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={img6} alt="Portfolio" />
          </div>
          <h3>This is Portfolio Title</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com" className="btn">
              Github
            </a>
            <a
              href="https://www.youtube.com/c/RajacharlesSRD"
              target="_blank"
              className="btn btn-primary"
            >
              Demo
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ClassCArd;
