import React, { useState } from "react";
import useClass from "../../Hooks/useClass";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

const ManageClasses = () => {
  const [classes, , refetch] = useClass();
  const [show, setShow] = useState(true);

//   handle Approve button
const notify = () =>
toast("Add This recipe is Favourite !!!", {
  icon: "👏",
});
const handlebtn = () => {
notify();
setShow(false);
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
        fetch(`http://localhost:5000/AllClasses/${myClass._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount) {
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
                    <div className="font-bold">
                      {myClass.status === "pending" ? "pending" : "Approve"}
                    </div>
                  </td>
                  <th>
                    {show && (
                      <button
                        onClick={() => handleApprove(myClass)}
                        className="btn"
                        onChange={handlebtn}
                      >
                        Approve  <ToastContainer position="top-center"></ToastContainer>
                      </button>
                    )}
                  </th>{" "}
                  <th>
                    <button
                      onClick={() => handleDenied(myClass)}
                      className="btn"
                    >
                      Denied
                    </button>
                  </th>{" "}
                  <th>
                    <div className="font-bold  text-2xl">
                      <Link to="/feedback" className="btn text-purple-500">
                        Feedback
                      </Link>
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
