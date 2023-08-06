import StripeCheckout from "react-stripe-checkout";
import { useLoaderData, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Container from "../../../Componets/Container";
import { AuthContext } from "../../../Provider/AuthProvider";
import useClass from "../../../Hooks/useClass";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Componets/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

// loadStripe
const stripePromise = loadStripe(import.meta.env.VITE_payment_getWay_pk);

// console.log(import.meta.env.VITE_payment_getWay_pk);
const Payment = () => {
  const { user, spinner } = useContext(AuthContext);

  const [classes] = useClass();
  const { id } = useParams();
  const paymentCourse = classes.find((course) => course._id === id);
  const price = parseFloat(paymentCourse?.price);
  console.log(price);

  const handleSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Payment was successful",
      time: 4000,
    });
  };
  const handleFailure = () => {
    Swal.fire({
      icon: "error",
      title: "Payment was not successful",
      time: 4000,
    });
  };

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
              classes={classes}
            ></CheckoutForm>
          </Elements>
        </div>
      </div>
    </Container>
  );
};
export default Payment;
