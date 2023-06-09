import { useQuery } from "@tanstack/react-query";
import React from "react";

const ManageUsers = () => {
  // user get by tansTa query
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      return res.json();
    },
  });
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
                  <div className="font-bold"></div>
                </th>
                <th>
                  {" "}
                  <select name="" id="">
                    <option value="Admin">Admin</option>
                    <option value="Instructor">Instructor</option>
                  </select>
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
