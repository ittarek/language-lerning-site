import React from "react";
import Container from "../../Components/Container";
import Cover from "../../Components/Cover";
import { Helmet } from "react-helmet-async";
import SilderClass from "./SilderClass";
import ClassCArd from "./ClassCArd";
import useClass from "../../Hooks/useClass";
import SectionTitle from "../../Components/SectionTitle";
import { useQuery } from "@tanstack/react-query";

const Classes = () => {
    const [classes, refetch] = useClass();
    const approvedClass = classes.filter(
        (filterClass) => filterClass.status === "approved"
    );

    // const { data: seatClass = [], refetch } = useQuery({
    //       queryKey: ["seatClass"],

    //       queryFn: async () => {
    //         const res = await fetch(
    //           `${import.meta.env.VITE_API_URL}/getSeat`
    //         );

    //         console.log("27",seatClass);
    //         console.log("27",seatClass.available_seats);
    //         return res.json();
    //         }})



    // console.log(approvedClass);
    return (
        <div>
            <Helmet>
                <title>Language Learner | Classes</title>
            </Helmet>
            <Container>
                <section className="relative -top-[69px]">
                    <div className="">
                        <div className="bg-dark" data-aos="fade-up" data-aos-offset="300">
                            <div className="w-full h-screen bg-[#c9cbbe] flex items-center justify-center">
                                <SilderClass />
                            </div>{" "}
                    
                            <div className="grid lg:grid-cols-3 mt-11  gap-10">
                                {" "}
                                {approvedClass.map(classes => (
                                    <ClassCArd
                                        key={classes._id}
                                        classes={classes}
                                        refetch={refetch}
                                    ></ClassCArd>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default Classes;
