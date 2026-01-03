import Container from "../../Components/Container";
import { Helmet } from "react-helmet-async";
import ClassCArd from "./ClassCArd";
import useClass from "../../Hooks/useClass";
import SliderClass from "./SliderClass";
import { MdSchool } from "react-icons/md";
import { LoadingState } from "../../Components/Shared/FetchStates/FetchStates";

const Classes = () => {
    // ✅ Get loading state and error from hook
    const [classes, loading, refetch, error] = useClass();

    const approvedClass = classes.filter(
        (filterClass) => filterClass.status === "approved"
    );

    return (
        <div>
            <Helmet>
                <title>Language Learner | Classes</title>
            </Helmet>
            <Container>
                <section className="relative -top-[69px] ">
                    <div className="">
                        <div className="bg-dark" data-aos="fade-up" data-aos-offset="300">
                            <div className="w-full h- bg-[#c9cbb2] flex items-center justify-center">
                                <SliderClass />
                            </div>

                            {/* ✅ Loading State */}
                            {loading ? (
                                <LoadingState message="Loading classes...." />

                            ) : error ? (
                                /* ✅ Error State */
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
                                        <p className="text-red-600 font-semibold mb-2">
                                            Failed to Load Classes
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
                            ) : approvedClass.length > 0 ? (
                                /* ✅ Success State - Classes Found */
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 mt-11 gap-10">
                                    {approvedClass.map((classes) => (
                                        <ClassCArd
                                            key={classes._id}
                                            classes={classes}
                                            refetch={refetch}
                                        />
                                    ))}
                                </div>
                            ) : (
                                /* ✅ Empty State - No Classes */
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="text-center">
                                        <MdSchool size={64} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-500 text-lg font-medium">
                                            No classes available
                                        </p>
                                        <p className="text-gray-400 text-sm mt-2">
                                            Please check back later for new classes
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default Classes;