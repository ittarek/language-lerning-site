// import "./classesCard.css";
// import ClassCard from "./ClassCard";
// import Container from "../../../Components/Container";
// import SectionTitle from "../../../Components/SectionTitle";
// import { useQuery } from "@tanstack/react-query";
// import ClassCardSkeleton from "../../../Components/Skelton/ClassCardSkeleton ";
// import { Link } from "react-router-dom";

// const Popular_classes = () => {
//     // TansTack query using for data fetch
//     const { data: classes = [], isLoading: loading, refetch, } = useQuery({
//         queryKey: ["classes"],
//         // enable : loading,
//         queryFn: async () => {
//             const res = await fetch(`${import.meta.env.VITE_API_URL}/TopClasses`);
//             return res.json();
//         },
//     });

//     return (
//         <Container>
//             {/* Todo */}
//             <div className="mt-[50px]">
//                 <div className="course__top flex justify-between items-center">
//                     <SectionTitle
//                         title="Top Classes"
//                         summary="Learn the fundamentals of language, explore different  languages, and develop problem-solving skills."


//                     />


//                 </div>
//                 <div>
//                     <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-4 items-center mx-auto">
//                         {loading ? (
//                             // Show skeleton loaders while loading
//                             [...Array(8)].map((_, index) => (
//                                 <ClassCardSkeleton key={index} />
//                             ))
//                         ) : (
//                             // Show actual cards when data is loaded
//                             classes.slice(0, 10).map((singleClass) => (
//                                 <ClassCard key={singleClass._id} singleClass={singleClass} />
//                             ))
//                         )}
//                     </div>
//                 </div>
//                 <div className="w-50 text-end">
//                     <Link to="/classes">  <button className="btn">See All Classes</button> </Link>
//                 </div>
//             </div>
//         </Container>
//     );
// };

// export default Popular_classes;


import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BsArrowRight } from "react-icons/bs";
import ClassCard from "./ClassCard";
import Container from "../../../Components/Container";
import SectionTitle from "../../../Components/SectionTitle";
import ClassCardSkeleton from "../../../Components/Skelton/ClassCardSkeleton ";

const Popular_classes = () => {
    // TanStack query using for data fetch
    const {
        data: classes = [],
        isLoading: loading,
        refetch
    } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/TopClasses`);
            return res.json();
        },
    });

    return (
        <Container>
            <div className="py-16">
                {/* Section Header */}
                <div className="mb-12">
                    <SectionTitle
                        title="Top Classes"
                        summary="Learn the fundamentals of language, explore different languages, and develop problem-solving skills."
                    />
                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {loading ? (
                        // Skeleton loaders while loading
                        [...Array(8)].map((_, index) => (
                            <ClassCardSkeleton key={index} />
                        ))
                    ) : (
                        // Actual cards when data is loaded
                        classes.slice(0, 8).map((singleClass) => (
                            <ClassCard
                                key={singleClass._id}
                                singleClass={singleClass}
                            />
                        ))
                    )}
                </div>

                {/* See All Button */}
                <div className="flex justify-center mt-12">
                    <Link to="/classes">
                        <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                            <span>See All Classes</span>
                            <BsArrowRight className="text-2xl group-hover:translate-x-2 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Popular_classes;
