import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const PaymentHistory = () => {
  const { user, spinner } = useContext(AuthContext);
const date = new Date()
  const { data: history = [], refetch } = useQuery({
    queryKey: ["history", user?.email],
    enabled: !spinner,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/enrolledClass/${user?.email}`
      );

      console.log("enroll class", history);
      return res.json();
    },
  });

  return (
    <div className="w-full h-full mt-10">
      <h2 className="h2 pl-2 text-slate-700 ">
        {" "}
       Payment History

      </h2>
      <div className="overflow-x-auto pl-2 bg-gray-400">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Image</th>
          <th>Class Name</th>
              <th>Transection</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {history.map((ht, index) => (
              <tr key={ht._id}>
                <th>{index + 1}</th>
                
                <td> {moment(ht?.date).format("YYYY-MM-DD")}</td>
                <td>
                  <img
                    className="avatar mask mask-squircle w-12 h-12"
                    src={ht.classImage}
                    alt="Class Image"
                  />
                </td>
                <td>{ht.className}</td>
                <td>{ht.token?.card?.id}</td>
                <td>${ht.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
