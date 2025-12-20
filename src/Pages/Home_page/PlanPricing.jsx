import React from "react";
import Container from "../../Components/Container";

const planing = [
    {
        name: "Trail",

        price: "Free",
        details: "30 Days Free",
    },
    {
        name: "Monthly ",

        price: "80",
        details: "Save 98 every year compared to the monthly plan by paying yearly",
    },
    {
        name: "Yearly",

        price: "150",
        details:
            "Save $120 every year compared to the monthly plan by paying biannually.",
    },
];
const PlanPricing = () => {
    return (
        <Container>
            <div className="my-11">
                <h1 className="text-center text-4xl text-bold mb-11">
                    Plan & Pricing{" "}
                </h1>

                <div className="lg:flex justify-between items-center gap-24  lg:mx-24 mx-6 ">
                    {planing.map((plan, index) => (
                        <div
                            key={index}
                            className={` w-full my-11 text-neutral-content h-[450px] ${plan.name === "Yearly" ? "bg-[#FFB20E]" : "bg-[#1EAACE]"
                                }
          `}
                        >
                            <div className=" text-center">
                                <div className="w-full bg-purple-100   -mt-8 ">
                                    {" "}
                                    <p
                                        className={` py-3 uppercase text-4xl  text-white ${plan.name === "Yearly" ? "bg-[#E5A00D]" : "bg-[#1B99B9]"
                                            }
          `}
                                    >
                                        {plan.name}
                                    </p>
                                </div>
                                <div className="w-full h-[200px]   flex flex-col justify-between items-center gap-11">
                                    <div>
                                        <p className="text-6xl text-white mt-24 mb-3 fw-bold">
                                            {" "}
                                            $ {plan.price}
                                        </p>
                                        <p className="text-center mx-5 text-white text-2xl">
                                            {plan.details}
                                        </p>
                                    </div>
                                    <div className="mx-auto  lg:-mb-[40%] -mt-8">
                                        <button
                                            className="btn  
                     bg-green-800"
                                        >
                                            I WANT THIS PLAN
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default PlanPricing;
