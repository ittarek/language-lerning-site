import React from "react";

import courseImg1 from "../../../assets/images/web-design.png";
import courseImg2 from "../../../assets/images/graphics-design.png";
import courseImg3 from "../../../assets/images/ui-ux.png";

import  './CoursesCard.css'
import CourseCard from "./CourseCard";
import Container from "../../../Componets/Container";

const Popular_section = () => {
  const coursesData = [
    {
      id: "01",
      title: "Web Design BootCamp-2022 for Beginners",
      lesson: 12,
      students: 12.5,
      rating: 5.9,
      imgUrl: courseImg1,
    },

    {
      id: "02",
      title: "Professional Graphics Design, PhotoShop, Adobe XD, Figma",
      lesson: 12,
      students: 12.5,
      rating: 5.9,
      imgUrl: courseImg2,
    },

    {
      id: "03",
      title: "UI/UX BootCamp for Beginners in 2022",
      lesson: 12,
      students: 12.5,
      rating: 5.9,
      imgUrl: courseImg3,
    },
  ];
  return (
    <Container>
      <div className="my-10">
     
          <div className="course__top flex justify-between items-center">
            <div className="course__top__left w-2/3 mb-20">
              <h2>Our Popular Classes</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                consequatur libero <br /> quod voluptatibus ullam quia quas, vitae
                voluptatem recusandae reprehenderit!
              </p>
            </div>

            <div className="w-50 text-end">
              <button className="btn">See All</button>
            </div>
          </div>
       
       <div className="lg:flex justify-between items-center gap-11">
       {coursesData.map((item) => (
          <CourseCard key={item.id} item={item} />
        ))}
       </div>
      </div>
    </Container>
  );
};

export default Popular_section;
