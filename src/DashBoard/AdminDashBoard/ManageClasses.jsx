import React, { useState } from "react";
import useClass from "../../Hooks/useClass";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import AdminFeedBack from "./AdminFeedBack";

const ManageClasses = () => {
  const [classes, , refetch] = useClass();

  const notify = () => {
    toast("This Button is Disabled !!!", {
      icon: "👏",
    });
  };

  const handleApprove = (myClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: "are you sure add this Approve ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add !",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_API_URL}/AllClasses/approved/${myClass._id}`,
          {
            method: "PATCH",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount) {
              notify();
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Approve Successful",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };
  const handleDenied = (myClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: "are you sure add this Denied ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add !",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_API_URL}/AllClasses/denied/${myClass._id}`,
          {
            method: "PATCH",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount) {
              notify();
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Denied Successful",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div className="w-full h-full mt-16 mx-4 px-4">
      <h2 className="h2">All Of The Classes : {classes.length}</h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th> Class Name</th>
                <th> Instructor Name</th>
                <th> Instructor Email</th>
                <th> Available Seats</th>
                <th>Price</th>

                <th>Status</th>
                <th>Action</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {classes.map((myClass, index) => (
                <tr key={myClass._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar mask mask-squircle w-12 h-12">
                      <img src={myClass?.class_imgUrl} alt="Image" />
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{myClass.class_name}</div>
                  </td>
                  <td>
                    <div className="font-bold">{myClass?.instructor_name}</div>
                  </td>
                  <td>
                    <div className="font-bold">{myClass?.instructor_email}</div>
                  </td>
                  <td>
                    <div className="font-bold">{myClass?.available_seats}</div>
                  </td>
                  <td>
                    <div className="font-bold">{myClass?.price}</div>
                  </td>
                  <td>
                    <div className="font-bold text-green-400">
                      {myClass.status === "pending" ? (
                        "Pending"
                      ) : myClass.status === "approved" ? (
                        "Approve"
                      ) : (
                        <p className="text-yellow-800">denied</p>
                      )}
                    </div>
                  </td>
                  <th>
                    <button
                      // disabled={!disable1}
                      onClick={() => handleApprove(myClass)}
                      className="btn"
                      disabled={myClass.status === "approved"}
                    >
                      Approve
                      <ToastContainer position="top-center"></ToastContainer>
                    </button>
                  </th>{" "}
                  <th>
                    <button
                      onClick={() => handleDenied(myClass)}
                      className="btn"
                      disabled={myClass.status === "denied"}
                    >
                      Deny
                      <ToastContainer position="top-center"></ToastContainer>
                    </button>
                  </th>
                  <th>
                    <div className="font-bold  text-2xl">
                      <button className="btn">
                        <Link
                          to={`adminFeedBack/${myClass._id}`}
                          className=" text-purple-500"
                        >
                          Feedback
                        </Link>
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageClasses;
