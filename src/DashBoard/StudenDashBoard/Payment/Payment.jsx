// import StripeCheckout from "react-stripe-checkout";
// import { useLoaderData, useParams } from "react-router-dom";
// import { useContext, useState } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";
// import Container from "../../../Components/Container";
// import { AuthContext } from "../../../Provider/AuthProvider";
// import useClass from "../../../Hooks/useClass";
// import { useQuery } from "@tanstack/react-query";
// import SectionTitle from "../../../Components/SectionTitle";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { loadStripe } from "@stripe/stripe-js";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// // loadStripe
// const stripePromise = loadStripe(import.meta.env.VITE_payment_getWay_pk);

// // console.log(import.meta.env.VITE_payment_getWay_pk);
// const Payment = () => {
//     const paymentCourse = useLoaderData();

//     const price = parseFloat(paymentCourse?.price);
//     console.log("price", price);

//     return (
//         <Container>
//             <div>
//                 <SectionTitle
//                     heading={"Payment"}
//                     subHeading={"Please paid to countinue course"}
//                 ></SectionTitle>

//                 <div>
//                     <Elements stripe={stripePromise}>
//                         <CheckoutForm
//                             price={price}
//                             selectCourse={paymentCourse}
//                         // classes={classes}
//                         ></CheckoutForm>
//                     </Elements>
//                 </div>
//             </div>
//         </Container>
//     );
// };
// export default Payment;


import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import Swal from "sweetalert2";
import Container from "../../../Components/Container";
import { AuthContext } from "../../../Provider/AuthProvider";
import SectionTitle from "../../../Components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import {
    MdPayment,
    MdShoppingCart,
    MdCheckCircle,
    MdWarning,
} from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_payment_getWay_pk);

const Payment = () => {
    const paymentCourse = useLoaderData();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Validate course data
    const courseData = useMemo(() => {
        if (!paymentCourse) {
            toast.error("Course data not found", { position: "top-right" });
            return null;
        }

        const price = parseFloat(paymentCourse?.price);
        if (isNaN(price) || price <= 0) {
            toast.error("Invalid price", { position: "top-right" });
            return null;
        }

        return {
            ...paymentCourse,
            price,
        };
    }, [paymentCourse]);

    // Redirect if no course data
    if (!courseData) {
        return (
            <Container>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <MdWarning size={48} className="mx-auto text-red-500 mb-4" />
                        <p className="text-gray-600 mb-6">
                            Unable to load course information
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <MdPayment size={32} className="text-green-600" />
                            <h1 className="text-3xl font-bold text-gray-900">
                                Complete Your Payment
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            Secure payment processing with Stripe
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                                        Order Summary
                                    </h2>

                                    {/* Course Image */}
                                    <div className="mb-4">
                                        <img
                                            src={courseData?.class_imgUrl}
                                            alt={courseData?.class_name}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                    </div>

                                    {/* Course Details */}
                                    <div className="space-y-4 pb-4 border-b border-gray-200">
                                        <div>
                                            <p className="text-sm text-gray-600">Course Name</p>
                                            <p className="font-semibold text-gray-900 text-lg">
                                                {courseData?.class_name}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-600">Instructor</p>
                                            <p className="font-semibold text-gray-900">
                                                {courseData?.instructor_name}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="text-sm text-gray-700">
                                                {courseData?.instructor_email}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-600">Available Seats</p>
                                            <p className="font-semibold text-gray-900">
                                                {courseData?.available_seats || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="py-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Course Price</span>
                                            <span className="font-semibold">
                                                ${courseData?.price.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2 flex justify-between text-lg">
                                            <span className="font-bold text-gray-900">Total</span>
                                            <span className="font-bold text-green-600">
                                                ${courseData?.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Security Info */}
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex gap-2">
                                            <MdCheckCircle
                                                size={20}
                                                className="text-blue-600 flex-shrink-0"
                                            />
                                            <p className="text-xs text-blue-800">
                                                Secure payment powered by Stripe. Your payment information
                                                is encrypted and safe.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Payment Details
                                </h2>

                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        price={courseData?.price}
                                        selectCourse={courseData}
                                    />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default Payment;