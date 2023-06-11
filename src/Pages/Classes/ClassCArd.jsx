import React, { useContext } from "react";
import "./ClassCard.css";

import { FaDollarSign, FaTable, FaUserAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
const ClassCArd = ({ classes }) => {
  const { user } = useContext(AuthContext);
  const { class_name, instructor_name, class_imgUrl, available_seats, price } =
    classes;

  const notify = () =>
    toast("Add This recipe is Favourite !!!", {
      icon: "👏",
    });

  const handleSelect = (classes) => {
    const { instructor_name, class_imgUrl, available_seats, price, _id } =
      classes;
    const newSelectedClass = {
      instructor_name,
      class_imgUrl,
      available_seats,
      price: parseFloat(price),
      email: user.email,
    };
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/selectedClass/${classes._id}`,
        newSelectedClass
      )
      .then((data) => {
        console.log(data.data);
        if (data.data.insertedId) {
          notify();
        }
      });
  };
  return (
    <section className="">
      <div className="class__item p-6 w-full h-full card rounded-3xl hover:bg-transparent hover:border-sky-200 bg-slate-300">
        <div className=" card-image">
          <img
            className="rounded-2xl overflow-hidden"
            src={class_imgUrl}
            alt="class"
          />
        </div>
        <div className="card-body">
          <h3 className="m-2">{class_name}</h3>
          <div className="grid grid-col-2">
            <p className="text-xl">
              Instructor Name :{" "}
              <FaUserAlt className=" inline-block"></FaUserAlt>{" "}
              {instructor_name}
            </p>
            <p className="text-xl my-2">
              Available Seats :{" "}
              <FaTable className="text-2xl inline-block"></FaTable>
              <span className="text-red-400 text-2xl"> {available_seats}</span>
            </p>
            <p className="text-xl">
              Price : <FaDollarSign className=" inline-block"></FaDollarSign>
              <span className="text-red-400 text-2xl"> {price}</span>
            </p>
          </div>
        </div>

        {available_seats < 0 ? (
          ""
        ) : (
          <button className="btn" onClick={() => handleSelect(classes)}>
            Select <ToastContainer position="top-center"></ToastContainer>
          </button>
        )}
      </div>
    </section>
  );
};

export default ClassCArd;
