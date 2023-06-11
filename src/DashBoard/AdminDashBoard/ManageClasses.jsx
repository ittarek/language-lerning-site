import React from "react";
import useClass from "../../Hooks/useClass";

import { Link } from "react-router-dom";

const ManageClasses = () => {
  const [classes] = useClass();

  const handleApprove = (myClass) => {
    const { status } = myClass;
    fetch(`${import.meta.env.VITE_API_URL}/AllClasses/${myClass._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
                    <div className="font-bold">{myClass?.status}</div>
                  </td>
                  <th>
                    <button
                      onClick={() => handleApprove(myClass)}
                      className="btn"
                    >
                      Approve
                    </button>
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
