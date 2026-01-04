import Container from "../../Components/Container";
import Feature4BgImg from "../../assets/features/feature4_bg.png";
import { FaChalkboardTeacher } from "react-icons/fa";
import Cover from "../../Components/Cover";
import { Helmet } from "react-helmet-async";
import useClass from "../../Hooks/useClass";
import InstructorCard from "./InstructorsPageCard";
import { LoadingState } from "../../Components/Shared/FetchStates/FetchStates";

const Instructors = () => {
    // ✅ Get loading, refetch, and error states
    const [classes, loading, refetch, error] = useClass();

    // Filter unique instructors (avoid duplicates)
    const uniqueInstructors = classes.reduce((acc, current) => {
        const x = acc.find(
            (item) =>
                item.instructor_email === current.instructor_email
        );
        if (!x) {
            acc.push(current);
        }
        return acc;
    }, []);

    return (
        <>
            <Helmet>
                <title>Language Learner | Instructors</title>
            </Helmet>

            <Container>
                <div className="relative">
                    {/* Cover Section */}
                    <Cover
                        image={Feature4BgImg}
                        title="Meet Our Expert Instructors"
                    />

                    {/* Instructors Grid */}
                    <div className="py-16">
                        {/* ✅ Loading State */}
                        {loading ? (
                        
                                <LoadingState message="  Loading instructors..." />

           
                        ) : error ? (
                            /* ✅ Error State */
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
                                    <FaChalkboardTeacher className="text-6xl text-red-300 mx-auto mb-4" />
                                    <p className="text-red-600 font-semibold mb-2">
                                        Failed to Load Instructors
                                    </p>
                                    <p className="text-red-500 text-sm mb-4">
                                        {error.message || "Something went wrong"}
                                    </p>
                                    <button
                                        onClick={() => refetch()}
                                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        ) : uniqueInstructors.length > 0 ? (
                            /* ✅ Success State - Instructors Found */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {uniqueInstructors.map((instructor) => (
                                    <InstructorCard
                                        key={instructor._id}
                                        instructor={instructor}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* ✅ Empty State - No Instructors */
                            <div className="text-center py-20">
                                <FaChalkboardTeacher className="text-6xl text-gray-300 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-600 mb-2">
                                    No Instructors Found
                                </h3>
                                <p className="text-gray-500">
                                    Check back soon for our amazing instructors!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Instructors;