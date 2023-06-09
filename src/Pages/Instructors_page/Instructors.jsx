import Container from "../../Componets/Container";

import Feature4BgImg from "../../assets/features/feature4_bg.png";
import { BsArrowRight } from "react-icons/bs";
import Cover from "../../Componets/Cover";
import { Helmet } from "react-helmet-async";

import useClass from "../../Hooks/useClass";
import { Link } from "react-router-dom";
import SectionTitle from "../../Componets/SectionTitle";

const Instructors = () => {
  const [classes] = useClass();
  return (
    <div>
      {" "}
      <Helmet>
        <title>Summer | Instructors</title>
      </Helmet>
      <Container>
        {/* TOdo */}
        <div className="relative">
          {" "}
          <Cover image={Feature4BgImg} title="Our Instructors"></Cover>
          <div className="">
            <SectionTitle
              title=" Out Popular Instructors"
              summary="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas,
            similique?"
            />
          </div>
          <div className="grid grid-cols-1 gap-[50px] xl:grid-cols-2">
            {classes.map((instructor) => (
              <div key={instructor._id}>
                <div
                  className="w-full max-w-[530px] h-[358px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto"
                  data-aos="zoom-in"
                  data-aos-offset="100"
                  data-aos-delay="400"
                >
                  {/* bg image */}
                  <div className=" xl:flex absolute top-0 right-0 -z-10">
                    <img src={instructor?.instructor_bg_img} />
                  </div>

                  {/* icon image */}
                  <div
                    className="max-w-[120px] xl:mr-7 xl:max-w-[232px]"
                    data-aos="zoom-in-right"
                    data-aos-delay="400"
                  >
                    <img src={instructor?.instructor_img} />
                  </div>
                  {/* text */}
                  <div className="max-w-[220px]">
                    <h3 className="h3 mb-4">{instructor?.instructor_name}</h3>
                    <p className=" mb-4">{instructor?.instructor_email}</p>
                    <p className="font-light italic mb-4">
                      {instructor?.description}
                    </p>
                    {/* link & arrow */}
                    <div className="flex items-center gap-x-2 group">
                      <Link className="text-primary font-bold" href="#">
                        See Classes
                      </Link>
                      <BsArrowRight className="text-xl text-accent-primary group-hover:ml-[5px] transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Instructors;
