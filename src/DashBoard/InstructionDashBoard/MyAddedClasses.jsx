import React, { useContext } from "react";
import useClass from "../../Hooks/useClass";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const MyAddedClasses = () => {
  const [classes] = useClass();
  const { user } = useContext(AuthContext);
  const filterClass = classes.filter(
    (emailFiled) => user?.email === emailFiled.instructor_email
  );
  console.log(filterClass);
  return (
    <div className="w-full h-full mt-16 mx-4 px-4">
      <h2 className="h2">My Classes : {filterClass.length}</h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Total Enroll Students</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {filterClass.map((myClass, index) => (
                <tr key={myClass._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar mask mask-squircle w-12 h-12">
                      <img src={myClass?.class_imgUrl} alt="User" />
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{myClass.class_name}</div>
                  </td>
                  <td>
                    <div className="font-bold">{myClass.status}</div>
                  </td>
                  <td>
                    <div className="font-bold text-center">
                      {" "}
                      {myClass.enrolled_students
                        ? myClass.enrolled_students
                        : 0}
                    </div>
                  </td>
                  <th>
                    <div className="font-bold  text-2xl">
                      <Link to='/feedback'
                        className="btn text-purple-500"
                        onClick={() => handleFeedback(myClass)}
                      >
                        Feedback
                      </Link>
                    </div>
                  </th>
                  <th>
                    <button
                      onClick={() => handleUpdate(myClass)}
                      className="btn"
                    >
                      Update
                    </button>
                  </th>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAddedClasses;
