import StripeCheckout from "react-stripe-checkout";
import { useLoaderData, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Container from "../../../Components/Container";
import { AuthContext } from "../../../Provider/AuthProvider";
import useClass from "../../../Hooks/useClass";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// loadStripe
const stripePromise = loadStripe(import.meta.env.VITE_payment_getWay_pk);

// console.log(import.meta.env.VITE_payment_getWay_pk);
const Payment = () => {
    const paymentCourse = useLoaderData();

    const price = parseFloat(paymentCourse?.price);
    console.log("price", price);

    return (
        <Container>
            <div>
                <SectionTitle
                    heading={"Payment"}
                    subHeading={"Please paid to countinue course"}
                ></SectionTitle>

                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            price={price}
                            selectCourse={paymentCourse}
                        // classes={classes}
                        ></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </Container>
    );
};
export default Payment;
