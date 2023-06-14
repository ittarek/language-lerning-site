import React, { useContext, useState } from "react";
import "./ClassCard.css";

import { FaDollarSign, FaTable, FaUserAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";
import Container from "../../Componets/Container";
const ClassCArd = ({ classes }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  const {
    instructor_name,
    instructor_email,
    class_name,
    class_imgUrl,
    available_seats,
    price,
    _id,
    enrolled_students,
  } = classes;

  const notify = () => {
    toast("Add This class is Selected got to dashboard !!!", {
      icon: "👏",
    });
    setDisable(false);
  };

  const handleSelect = (classes) => {
    const {
      instructor_name,
      instructor_email,
      class_name,
      class_imgUrl,
      available_seats,
      price,
      _id,
      enrolled_students,
    } = classes;
    if (!user) {
      alert("At first Login !!!");
      return navigate("/login");
    } else {
      const newSelectedClass = {
        instructor_name,
        instructor_email,
        class_name,
        class_imgUrl,
        price: parseFloat(price),
        available_seats,
        price,
        _id,
        enrolled_students,
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
    }
  };
  return (
    <Container>
      <div
        className={`class__item p-1 sm:w-full h-full card rounded-3xl hover:bg-transparent hover:border-sky-200 bg-slate-300   transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-l-4 border-white ${
          available_seats === 0 ? "bg-red-200" : ""
        }`}
        // data-aos="fade-up"
      >
        {/* class__item p-6  w-full h-full card rounded-3xl hover:bg-transparent hover:border-sky-200 bg-slate-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 */}
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

        <button
          className="btn"
          // disabled={!disable}
          disabled={isAdmin || isInstructor}
          onClick={() => handleSelect(classes)}
        >
          {!user?.email && navigate}select{" "}
          <ToastContainer position="top-center"></ToastContainer>
        </button>
      </div>
    </Container>
  );
};

export default ClassCArd;
