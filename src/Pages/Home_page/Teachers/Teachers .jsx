import { BsArrowRight } from "react-icons/bs";

import SectionTitle from "../../../Components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import Container from "../../../Components/Container";
import { Link } from "react-router-dom";

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
     
            <Container>
            <div className=" mx-auto">
                {/* text */}
                <SectionTitle
                    title="Top Instructors"
                    summary="Meet our top instructors who are passionate about teaching and dedicated to helping you succeed.  "
                />

                {/* feature list */}
                <div className="grid grid-cols-1 gap-[100px] xl:grid-cols-3">
                    {topInstructors.slice(0, 10).map((item) => (
                        <div key={item._id}>
                            <div
                                className="w-full max-w-[530px] h-[358px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto"
                                data-aos="zoom-in"
                                data-aos-offset="100"
                                data-aos-delay="400"
                            >
                                {/* bg image */}
                                <div className=" xl:flex absolute rounded-lg top-0 right-0 -z-10">
                                    <img className="rounded-lg" src={item?.instructor_bg_img}  alt="Teachers Image"/>
                                </div>

                                {/* icon image */}
                                <div className="max-w-[120px] xl:mr-7 xl:max-w-[232px]  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125">
                                    <img
                                        src={item?.instructor_img}

                                    />
                                    {/* data-aos="zoom-in-right" */}
                                    {/* data-aos-delay="400" */}

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
                        <div className="w-50 text-end">
                    <Link to="/instructors">  <button className="btn">See All Instructors</button> </Link>
                                </div>
            </div>

            </Container>

    );
};

export default Teachers;
