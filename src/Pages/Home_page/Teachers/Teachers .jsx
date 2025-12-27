// import { BsArrowRight } from "react-icons/bs";

// import SectionTitle from "../../../Components/SectionTitle";
// import { useQuery } from "@tanstack/react-query";
// import { FaUser } from "react-icons/fa";
// import Container from "../../../Components/Container";
// import { Link } from "react-router-dom";

// const Teachers = () => {
//     // TansTack query using for data fetch
//     const {
//         data: topInstructors = [],
//         isLoading: loading,
//         refetch,
//     } = useQuery({
//         queryKey: ["topInstructors"],

//         queryFn: async () => {
//             const res = await fetch(`${import.meta.env.VITE_API_URL}/TopInstructors`);
//             return res.json();
//         },
//     });

//     return (
     
//             <Container>
//             <div className=" mx-auto">
//                 {/* text */}
//                 <SectionTitle
//                     title="Top Instructors"
//                     summary="Meet our top instructors who are passionate about teaching and dedicated to helping you succeed.  "
//                 />

//                 {/* feature list */}
//                 <div className="grid grid-cols-1 gap-[100px] xl:grid-cols-3">
//                     {topInstructors.slice(0, 10).map((item) => (
//                         <div key={item._id}>
//                             <div
//                                 className="w-full max-w-[530px] h-[358px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto"
//                                 data-aos="zoom-in"
//                                 data-aos-offset="100"
//                                 data-aos-delay="400"
//                             >
//                                 {/* bg image */}
//                                 <div className=" xl:flex absolute rounded-lg top-0 right-0 -z-10">
//                                     <img className="rounded-lg" src={item?.instructor_bg_img}  alt="Teachers Image"/>
//                                 </div>

//                                 {/* icon image */}
//                                 <div className="max-w-[120px] xl:mr-7 xl:max-w-[232px]  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125">
//                                     <img
//                                         src={item?.instructor_img}

//                                     />
//                                     {/* data-aos="zoom-in-right" */}
//                                     {/* data-aos-delay="400" */}

//                                 </div>
//                                 {/* text */}
//                                 <div className="max-w-[220px]">
//                                     <h3 className="h3 mb-4">{item?.instructor_name}</h3>
//                                     <p className="font-light italic mb-4">
//                                         <FaUser></FaUser> {item.enrolled_students} Students Enrolled
//                                     </p>
//                                     {/* link & arrow */}
//                                     <div className="flex items-center gap-x-2 group">
//                                         <a className="text-primary font-bold" href="#">
//                                             {item?.linkText}
//                                         </a>
//                                         <BsArrowRight className="text-xl text-accent-primary group-hover:ml-[5px] transition-all" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                         <div className="w-50 text-end">
//                     <Link to="/instructors">  <button className="btn">See All Instructors</button> </Link>
//                                 </div>
//             </div>

//             </Container>

//     );
// };

// export default Teachers;
import { BsArrowRight } from "react-icons/bs";
import { FaUser, FaStar, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle";
import Container from "../../../Components/Container";

const Teachers = () => {
    // TanStack query using for data fetch
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

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[400px]">
                    <span className="loading loading-spinner loading-lg text-indigo-600"></span>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="py-16">
                {/* Section Title */}
                <SectionTitle
                    title="Top Instructors"
                    summary="Meet our top instructors who are passionate about teaching and dedicated to helping you succeed."
                />

                {/* Instructors Grid */}
                <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {topInstructors.slice(0, 6).map((instructor, index) => (
                        <div
                            key={instructor._id}
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Card Content */}
                            <div className="relative p-6 flex flex-col items-center text-center">
                                {/* Instructor Image Container */}
                                <div className="relative mb-6">
                                    {/* Animated ring */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>

                                    {/* Image */}
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <img
                                            src={instructor?.instructor_img || "https://via.placeholder.com/150"}
                                            alt={instructor?.instructor_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Status badge */}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                        ⭐ Top Rated
                                    </div>
                                </div>

                                {/* Instructor Info */}
                                <div className="space-y-3 w-full">
                                    {/* Name */}
                                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                        {instructor?.instructor_name}
                                    </h3>

                                    {/* Specialty/Subject */}
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                        <FaChalkboardTeacher className="text-indigo-500" />
                                        <span className="font-medium">Language Expert</span>
                                    </div>

                                    {/* Stats Container */}
                                    <div className="grid grid-cols-2 gap-3 pt-4">
                                        {/* Students */}
                                        <div className="bg-blue-50 rounded-xl p-3 group-hover:bg-blue-100 transition-colors">
                                            <FaUser className="text-blue-600 text-lg mx-auto mb-1" />
                                            <div className="text-lg font-bold text-gray-800">
                                                {instructor.enrolled_students || 0}
                                            </div>
                                            <div className="text-xs text-gray-600">Students</div>
                                        </div>

                                        {/* Rating */}
                                        <div className="bg-yellow-50 rounded-xl p-3 group-hover:bg-yellow-100 transition-colors">
                                            <FaStar className="text-yellow-500 text-lg mx-auto mb-1" />
                                            <div className="text-lg font-bold text-gray-800">4.9</div>
                                            <div className="text-xs text-gray-600">Rating</div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-gray-200 my-4"></div>

                                    {/* View Profile Button */}
                                    <Link to={`/instructor/${instructor._id}`}>
                                        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 group/btn">
                                            <span>View Profile</span>
                                            <BsArrowRight className="text-xl group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Hover border effect */}
                            <div className="absolute inset-0 border-2 border-indigo-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* See All Button */}
                <div className="flex justify-center mt-12">
                    <Link to="/instructors">
                        <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                            <span>See All Instructors</span>
                            <BsArrowRight className="text-2xl group-hover:translate-x-2 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Teachers;