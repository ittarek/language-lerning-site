import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MyEnroll = () => {
  const { user, spinner } = useContext(AuthContext);

  const { data: enroll = [], refetch } = useQuery({
    queryKey: ["enroll", user?.email],
    enabled: !spinner,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/enrolledClass/${user?.email}`
      );

      console.log("enroll class", enroll);
      return res.json();
    },
  });

  return (
    <div className="w-full h-full mt-10">
      <h2 className="h2 pl-2 text-slate-700 ">
        {" "}
        My Enrolled Classes :{" "}
        <span className="text-green-800 text-3xl">{enroll.length}</span>
      </h2>
      <div className="overflow-x-auto pl-2 bg-gray-400">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Instructor Name</th>
              <th>Price</th>
             
            </tr>
          </thead>
          <tbody>
            {enroll.map((singleClass, index) => (
              <tr key={singleClass._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="avatar mask mask-squircle w-12 h-12"
                    src={singleClass.classImage}
                    alt="Class Image"
                  />
                </td>
                <td>{singleClass.className}</td>
                <td>{singleClass.instructorName}</td>
                <td>{singleClass.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnroll;
