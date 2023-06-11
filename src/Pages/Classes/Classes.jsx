import React from "react";
import Container from "../../Componets/Container";
import Cover from "../../Componets/Cover";
import { Helmet } from "react-helmet-async";
import ClassSlider from "./ClassSlider";
import ClassCArd from "./ClassCArd";
import useClass from "../../Hooks/useClass";
import SectionTitle from "../../Componets/SectionTitle";

const Classes = () => {
  const [classes] = useClass();
  const approvedClass = classes.filter(
    (filterClass) => filterClass.status === "approved"
  );
  console.log(approvedClass);
  return (
    <div>
      {" "}
      <Helmet>
        <title>Summer | Classes</title>
      </Helmet>
      <Container>
        <section className="relative -top-[69px]">
          <div className="">
            <div className="bg-dark" data-aos="fade-up" data-aos-offset="300">
              <div className="w-full h-screen bg-[#c9cbbe] flex items-center justify-center">
                <ClassSlider />
              </div>{" "}
              <SectionTitle
                title="Our Classes"
                summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quisquam. "
              >
                {" "}
              </SectionTitle>
           <div className="grid grid-cols-3 gap-10">   {approvedClass.map((classes) => (
                <ClassCArd key={classes._id} classes={classes}></ClassCArd>
              ))}</div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Classes;
