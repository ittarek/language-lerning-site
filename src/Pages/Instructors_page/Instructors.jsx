import Container from "../../Components/Container";
import Feature4BgImg from "../../assets/features/feature4_bg.png";
import { FaChalkboardTeacher } from "react-icons/fa";
import Cover from "../../Components/Cover";
import { Helmet } from "react-helmet-async";
import useClass from "../../Hooks/useClass";
import InstructorCard from "./InstructorCard";



const Instructors = () => {
    const [classes] = useClass();

    return (
        <>
            <Helmet>
                <title>Language Learner | Instructors</title>
            </Helmet>

            <Container>
                <div className="relative">
                    {/* Cover Section */}
                    <Cover image={Feature4BgImg} title="Meet Our Expert Instructors" />

                    {/* Instructors Grid */}
                    <div className="py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {classes.map((instructor) => (
                                <InstructorCard key={instructor._id} instructor={instructor} />
                            ))}
                        </div>

                        {/* Empty State */}
                        {classes.length === 0 && (
                            <div className="text-center py-20">
                                <FaChalkboardTeacher className="text-6xl text-gray-300 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-600 mb-2">No Instructors Found</h3>
                                <p className="text-gray-500">Check back soon for our amazing instructors!</p>
                            </div>
                        )}
                    </div>
                </div>
            </Container>


        </>
    );
};

export default Instructors;