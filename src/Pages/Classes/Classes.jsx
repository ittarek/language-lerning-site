import React from "react";
import Container from "../../Componets/Container";
import Cover from "../../Componets/Cover";
import { Helmet } from "react-helmet-async";
import SilderClass from "./SilderClass";
import ClassCArd from "./ClassCArd";
import useClass from "../../Hooks/useClass";
import SectionTitle from "../../Componets/SectionTitle";
import { useQuery } from "@tanstack/react-query";

const Classes = () => {
  const [classes  , refetch] = useClass();
  const approvedClass = classes.filter(
    (filterClass) => filterClass.status === "approved"
  );

  // const { data: seatClass = [], refetch } = useQuery({
  //       queryKey: ["seatClass"],
  
  //       queryFn: async () => {
  //         const res = await fetch(
  //           `${import.meta.env.VITE_API_URL}/getSeat`
  //         );
    
  //         console.log("27",seatClass);
  //         console.log("27",seatClass.available_seats);
  //         return res.json();
  //         }})
        


  // console.log(approvedClass);
  return (
    <div>
      {" "}
      <Helmet>
        <title>Language Learner | Classes</title>
      </Helmet>
      <Container>
        <section className="relative -top-[69px]">
          <div className="">
            <div className="bg-dark" data-aos="fade-up" data-aos-offset="300">
              <div className="w-full h-screen bg-[#c9cbbe] flex items-center justify-center">
                <SilderClass />
              </div>{" "}
              <SectionTitle
                title="Our Classes"
                summary="Welcome to the world of learning! As your instructor, I am here to guide you on a transformative educational journey. Together, we will explore new ideas, expand your knowledge, and develop crucial skills. Through engaging discussions, interactive activities, and personalized support, I aim to empower you to reach your full potential. "
              >
                {" "}
              </SectionTitle>
              <div className="grid lg:grid-cols-3  gap-10">
                {" "}
                {approvedClass.map(classes => (
                  <ClassCArd
                    key={classes._id}
                    classes={classes}
                    refetch={refetch}
                  ></ClassCArd>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Classes;
