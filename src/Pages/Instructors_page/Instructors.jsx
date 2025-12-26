import Container from "../../Components/Container";

import Feature4BgImg from "../../assets/features/feature4_bg.png";
import { BsArrowRight } from "react-icons/bs";
import Cover from "../../Components/Cover";
import { Helmet } from "react-helmet-async";

import useClass from "../../Hooks/useClass";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Instructors = () => {
    const { user } = useContext(AuthContext);

    const [classes] = useClass();
    // console.log(classes);
    return (
        <>
            {" "}
            <Helmet>
                <title>Language Learner | Instructor</title>
            </Helmet>
            <Container>
                {/* TOdo */}
                <div className="relative">
                    <Cover image={Feature4BgImg} title="Our Instructors"></Cover>
            
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
                                        <img src={Feature4BgImg} />
                                    </div>

                                    {/* icon image */}
                                    <div
                                        className="max-w-[120px] xl:mr-7 xl:max-w-[232px]  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"

                                    >
                                        <img src={instructor.instructor_img} />
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
        </>
    );
};

export default Instructors;
