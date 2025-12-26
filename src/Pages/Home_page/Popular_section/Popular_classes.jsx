import "./classesCard.css";
import ClassCard from "./ClassCard";
import Container from "../../../Components/Container";
import SectionTitle from "../../../Components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import ClassCardSkeleton from "../../../Components/Skelton/ClassCardSkeleton ";
import { Link } from "react-router-dom";

const Popular_classes = () => {
    // TansTack query using for data fetch
    const { data: classes = [], isLoading: loading, refetch, } = useQuery({
        queryKey: ["classes"],
        // enable : loading,
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/TopClasses`);
            return res.json();
        },
    });

    return (
        <Container>
            {/* Todo */}
            <div className="mt-[50px]">
                <div className="course__top flex justify-between items-center">
                    <SectionTitle
                        title="Top Classes"
                        summary="Learn the fundamentals of language, explore different  languages, and develop problem-solving skills."


                    />


                </div>
                <div>
                    <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-4 items-center mx-auto">
                        {loading ? (
                            // Show skeleton loaders while loading
                            [...Array(8)].map((_, index) => (
                                <ClassCardSkeleton key={index} />
                            ))
                        ) : (
                            // Show actual cards when data is loaded
                            classes.slice(0, 10).map((singleClass) => (
                                <ClassCard key={singleClass._id} singleClass={singleClass} />
                            ))
                        )}
                    </div>
                </div>
                <div className="w-50 text-end">
                    <Link to="/classes">  <button className="btn">See All Classes</button> </Link>
                </div>
            </div>
        </Container>
    );
};

export default Popular_classes;
