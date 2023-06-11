import React from "react";
import Container from "../../Componets/Container";
import Cover from "../../Componets/Cover";
import { Helmet } from "react-helmet-async";
import ClassSlider from "./ClassSlider";
import ClassCArd from "./ClassCArd";
import useClass from "../../Hooks/useClass";

const Classes = () => {
  const [classes] = useClass()
  const approvedClass = classes.filter(filterClass => filterClass.status === "approved")
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
              </div>

              {
                approvedClass.map(classes =>        <ClassCArd key={classes._id} classes={classes}></ClassCArd>)
              }
       
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Classes;
