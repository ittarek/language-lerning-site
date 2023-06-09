import { BsArrowRight } from "react-icons/bs";

import Feature1Img from "../../../assets/features/feature1.png";
import Feature2Img from "../../../assets/features/feature2.png";
import Feature3Img from "../../../assets/features/feature3.png";
import Feature4Img from "../../../assets/features/feature4.png";
import Feature1BgImg from "../../../assets/features/feature1_bg.png";
import Feature2BgImg from "../../../assets/features/feature2_bg.png";
import Feature3BgImg from "../../../assets/features/feature3_bg.png";
import Feature4BgImg from "../../../assets/features/feature4_bg.png";
import SectionTitle from "../../../Componets/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";

const Teachers = () => {
  // TansTack query using for data fetch
  const {
    data: topInstructors = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["topInstructors"],

    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/TopInstructors`);
      return res.json();
    },
  });


  return (
    <section className="">
      {/* Todo */}
      <div className="container mx-auto">
        {/* text */}
        <SectionTitle
          title="Top 6 Popular Instructors"
          summary="With our app you can view the route of your order, from our local headquarters to the place where you are. Look for the app now!"
        />

        {/* feature list */}
        <div className="grid grid-cols-1 gap-[50px] xl:grid-cols-2">
          {topInstructors.slice(0, 6).map((item, index) => (
            <div key={index}>
              <div
                className="w-full max-w-[530px] h-[358px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto"
                data-aos="zoom-in"
                data-aos-offset="100"
                data-aos-delay="400"
              >
                {/* bg image */}
                <div className=" xl:flex absolute top-0 right-0 -z-10">
                  <img src={Feature1BgImg} />
                </div>

                {/* icon image */}
                <div
                  className="max-w-[120px] xl:mr-7 xl:max-w-[232px]"
                  data-aos="zoom-in-right"
                  data-aos-delay="400"
                >
                  <img src={item?.instructor_img} />
                </div>
                {/* text */}
                <div className="max-w-[220px]">
                  <h3 className="h3 mb-4">{item?.instructor_name}</h3>
                  <p className="font-light italic mb-4">
                    <FaUser></FaUser> {item.enrolled_students} Students Enrolled
                  </p>
                  {/* link & arrow */}
                  <div className="flex items-center gap-x-2 group">
                    <a className="text-primary font-bold" href="#">
                      {item?.linkText}
                    </a>
                    <BsArrowRight className="text-xl text-accent-primary group-hover:ml-[5px] transition-all" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
