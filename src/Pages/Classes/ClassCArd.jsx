import React, { useContext } from "react";
import "./ClassCard.css";
import img1 from "../../assets/class-card/portfolio1.jpg";

import img2 from "../../assets/class-card/portfolio2.jpg";
import img3 from "../../assets/class-card/portfolio3.jpg";
import img4 from "../../assets/class-card/portfolio4.jpg";
import img5 from "../../assets/class-card/portfolio5.png";
import img6 from "../../assets/class-card/portfolio6.jpg";
import { Link } from "react-router-dom";
import SectionTitle from "../../Componets/SectionTitle";
import { AuthContext } from "./../../Provider/AuthProvider";
import { FaDollarSign, FaTable, FaUserAlt } from "react-icons/fa";
const ClassCArd = ({ classes }) => {
  const { class_name, instructor_name, available_seats, price } = classes;
  const { user } = useContext(AuthContext);
  // TODO

  return (
    <section className="">
      <SectionTitle
        title="Our Classes"
        summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quisquam. "
      >
        {" "}
      </SectionTitle>

      <div className="  grid lg:grid-cols-3 gap-5 ">
        <div className="class__item p-6 rounded-3xl hover:bg-transparent hover:border-sky-200 bg-slate-300">
          <div className="">
            <img
              className="rounded-2xl overflow-hidden"
              src={img1}
              alt="class"
            />
          </div>
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

          {available_seats < 0 ? (
            "bg-red-400"
          ) : (
            <button className="btn -mr-0 "> Select</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClassCArd;
