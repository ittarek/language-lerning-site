import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const MySelectClasses = () => {
  const { user } = useContext(AuthContext);
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes", user?.email],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/selectedClass/${user?.email}`);

 console.log(classes);
      return res.json();
    },
  });

  return (
    <div className="w-full h-full mt-10">
      <h2 className="h2 pl-2 text-slate-700 ">
        {" "}
        My selected Classes :{" "}
        <span className="text-green-800 text-3xl">{classes.length}</span>
      </h2>
      <div className="overflow-x-auto pl-2 bg-gray-400">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Instructor Name</th>
              <th>Price</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((singleClass, index) => (
              <tr key={singleClass._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="avatar mask mask-squircle w-12 h-12"
                    src={singleClass.class_imgUrl}
                    alt="Class Image"
                  />
                </td>
                <td>{singleClass.instructor_name}</td>
                <td>{singleClass.price}</td>
                <td className="btn">Pay</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectClasses;
