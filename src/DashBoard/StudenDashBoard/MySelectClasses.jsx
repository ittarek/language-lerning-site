import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import useClass from "../../Hooks/useClass";
// import Spinner from './../../Componets/Spinner';

const MySelectClasses = () => {
  const { user, spinner } = useContext(AuthContext);
  // const [classes] = useClass()
  const { data: classData = [], refetch } = useQuery({
    queryKey: ["classData", user?.email],
    // enabled: !Spinner,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/getSelectedClass`
      );

      // console.log("classData", classData);
      return res.json();
    },
  });

  const filterClass = classData.filter(
    (emailFiled) => user?.email === emailFiled.studentEmail
  );
  console.log(filterClass);

  // delete class by function
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "are you sure Delete This Class ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add !",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/payment/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Delete Successful",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div className="w-full h-full mt-10">
      <h2 className="h2 pl-2 text-slate-700 ">
        {" "}
        My selected Classes :{" "}
        <span className="text-green-800 text-3xl">{filterClass.length}</span>
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
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterClass.map((singleClass, index) => (
              <tr key={singleClass._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="avatar mask mask-squircle w-12 h-12"
                    src={singleClass.class_imgUrl}
                    alt="Class Image"
                  />
                </td>
                <td>{singleClass.class_name}</td>
                <td>{singleClass.instructor_name}</td>
                <td>{singleClass.price}</td>
                <th>
                  <button className="btn">
                    <Link to={`payment/${singleClass._id}`}>Pay</Link>
                  </button>
                </th>
                <th>
                  <button
                    className="btn "
                    onClick={() => handleDelete(singleClass._id)}
                  >
                    Delete
                  </button>
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
