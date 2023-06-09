import React from "react";

import courseImg1 from "../../../assets/images/web-design.png";
import courseImg2 from "../../../assets/images/graphics-design.png";
import courseImg3 from "../../../assets/images/ui-ux.png";

import "./CoursesCard.css";
import CourseCard from "./CourseCard";
import Container from "../../../Componets/Container";
import SectionTitle from "../../../Componets/SectionTitle";

import { useQuery } from "@tanstack/react-query";

const Popular_classes = () => {
// TansTack query using for data fetch
  const { data: classes = [], isLoading:loading ,refetch } = useQuery({
    queryKey: ["classes"],

    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/TopClasses`);
      return res.json();
    },
  });
  return (
    <Container>
      {/* Todo */}
      <div className="my-5">
        <div className="course__top flex justify-between items-center">
          <SectionTitle
            title="Top 6 Popular Classes"
            summary=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                consequatur libero quod voluptatibus ullam quia quas, vitae
                voluptatem recusandae reprehenderit!"
          />

          {/* <div className="w-50 text-end">
            <button className="btn">See All</button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 gap-[50px] xl:grid-cols-2">
          {classes.slice(0,6).map((singleClass) => (
            <CourseCard key={singleClass.id} singleClass={singleClass} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Popular_classes;
