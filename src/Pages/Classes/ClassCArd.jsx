import React from "react";
import "./ClassCard.css";
import img1 from "../../assets/class-card/portfolio1.jpg";

import img2 from "../../assets/class-card/portfolio2.jpg";
import img3 from "../../assets/class-card/portfolio3.jpg";
import img4 from "../../assets/class-card/portfolio4.jpg";
import img5 from "../../assets/class-card/portfolio5.png";
import img6 from "../../assets/class-card/portfolio6.jpg";
import { Link } from "react-router-dom";
const ClassCArd = () => {
  return (
    <section id="portfolio" className="">
      <h5 className="">Out Recent Class</h5>
      <h2 className="">Classes</h2>

      <div className="container portfolio__container">
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={img1} alt="Portfolio" />
          </div>
          <h3 className="">This is Class Name</h3>
          <p>Instructors</p>
          <p>Available seats</p>
          <p>Price</p>
          <div className="">
            <Link to="">
              <button className="btn"> Select</button>
            </Link>
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
