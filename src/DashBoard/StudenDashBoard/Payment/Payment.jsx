import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

import SectionTitle from "../../../Componets/SectionTitle";
import PaymentForm from "./PaymentForm";
import StripeCheckout from "react-stripe-checkout";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Container from "../../../Componets/Container";
import { AuthContext } from "../../../Provider/AuthProvider";

// loadStripe

const publishableKey = import.meta.env.VITE_payment_getWay_pk;
// console.log(import.meta.env.VITE_payment_getWay_pk);
const Payment = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const price = data.price;
  //   console.log(data);

  const [product, setProduct] = useState({
    name: data.class_name || " MyAddClass",
    price: price,
  });
  const priceForStripe = product.price * 100;

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
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:5000/payment",
        method: "post",
        
        data: {
          amount: parseInt(priceForStripe),
          className: data.class_name,
          classImage: data.class_imgUrl,
          instructorName: data.instructor_name,
          email: user?.email || "unknown",
          token,
        },
      });
      if (response.status === 200) {
        console.log(response);
        handleSuccess();
      }
    } catch (error) {
      console.log(error);
      handleFailure();
    }
  };

  return (
    <Container>
      <h2>Complete payment integration</h2>
      <p>
        <span>Product: </span>
        {product.name}
      </p>
      <p>
        <span>Price: </span>${product.price}
      </p>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
    </Container>
  );

  //   return (
  //     <div className="w-full h-full mt-10">
  //       <SectionTitle title="Payment" summary="please process"></SectionTitle>
  //       {/* <h2 className="text-3xl"> You want to Payment</h2> */}
  //       <Elements stripe={stripePromise}>
  //         <PaymentForm price={price} data={data}></PaymentForm>
  //       </Elements>
  //     </div>
  //   );
  // };
};
export default Payment;
