import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaUserAltSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {


  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  // make a admin
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "are you sure add this user admin ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add !",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
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
                title: `${user.name} is an Admin Now!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  console.log(users);
  return (
    <div className="w-full h-full my-10">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>ROll</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar mask mask-squircle w-12 h-12">
                    <img src={user?.PhotoURL} alt="User" />
                  </div>
                </td>
                <td>
                  <div className="font-bold">{user.name}</div>
                </td>
                <td>
                  <div className="font-bold">{user.email}</div>
                </td>
                <th>
                  <div className="font-bold text-purple-500 text-2xl">
                    {user.roll === "admin" ? (
                      "admin"
                    ) : (
                      <button
                        className="btn"
                        onClick={() => handleMakeAdmin(user)}
                      >
                        {" "}
                        Make Admin
                      </button>
                    )}
                  </div>
                </th>
                <th>
                  <button
                    onClick={() => handleInstructor(user)}
                    className="btn"
                  >
                    make Instructor
                  </button>
                </th>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
