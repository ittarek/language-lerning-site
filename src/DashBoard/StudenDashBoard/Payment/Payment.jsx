import StripeCheckout from "react-stripe-checkout";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Container from "../../../Componets/Container";
import { AuthContext } from "../../../Provider/AuthProvider";
import useClass from "../../../Hooks/useClass";
import { useQuery } from "@tanstack/react-query";

// loadStripe

const publishableKey = import.meta.env.VITE_payment_getWay_pk;
// console.log(import.meta.env.VITE_payment_getWay_pk);
const Payment = () => {
  const { user , spinner} = useContext(AuthContext);
  const data = useLoaderData();
  const price = data.price;
//   console.log(data);
//   const { data: seatClass = [], refetch } = useQuery({
//     queryKey: ["seatClass", user?.email],
//     enabled : !spinner,
//     queryFn: async () => {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/selectedClass/${user?.email}`
//       );

//       console.log("27",seatClass);
//       return res.json();
//     },
//   });const seats = seatClass.find(seatId =>seatId._id   === data._id )
//   console.log("id",seats);
//   const availableSeatMinus = seatClass.reduce((sum, item) => -sum - item.available_seats, 0);
//   console.log("sets",parseInt(availableSeatMinus));

 
  // 
  //     

  /** const total = cart.reduce((sum, item) => sum + item.price, 0);
    * const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);
    */

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
        url: `${import.meta.env.VITE_API_URL}/payment`,
        method: "post",

        data: {
          amount: parseInt(priceForStripe),

          className: data.class_name,
          classImage: data.class_imgUrl,
          date: new Date(),
          classID: data._id,
          instructorName: data.instructor_name,
          email: user?.email || "unknown",
          available_seats:data.available_seats - 1,
          token,
        },
      });
      if (response.status === 200) {
        console.log(response);
        //         const newSeats = data.available_seats - 1
        handleSuccess();
      }
    } catch (error) {
      console.log(error);
      handleFailure();
    }
  };

  return (
    <Container>
      <div className=" w-full">
        <h2 className="h2 text-purple-600 italic">
          Complete Your payment integration
        </h2>
        <p className="my-4">
          <span className="text-2xl ">Product: </span>
          <span className="text-2xl text-green-400"> {product.name}</span>
        </p>
        <h2 className="h2 mb-5">
          <span>Price: </span>{" "}
          <span className="text-green-400">${product.price}</span>
        </h2>
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
      </div>
    </Container>
  );
};
export default Payment;
