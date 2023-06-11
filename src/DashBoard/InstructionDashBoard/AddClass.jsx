import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const image_Hosting_Key = import.meta.env.VITE_IMAGE_HOSTING_URL;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_Hosting_Key}`;

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resultImage) => {
        if (resultImage.success) {
          const imgURL = resultImage.data.display_url;
          const {
               class_name,
            instructor_name,
            instructor_email,
            price,
            available_seats,
            status,
          } = data;
          const newClass = {
               class_name,
            instructor_name,
            instructor_email,
            price: parseFloat(price),
            available_seats,

            class_imgUrl: imgURL,
            status: "pending",
          };
          console.log(newClass);
          axiosSecure.post("/addClass", newClass).then((data) => {
            console.log("after posting new menu item", data.data);
            if (data.data.insertedId) {
              //     reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };

  return (
    <div className="w-full min-h-screen py-10">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-image">
            <h1 className="text-white text-3xl mb-3">Welcome</h1>
            <div>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                suspendisse aliquam varius rutrum purus maecenas ac{" "}
                <a href="#" className="text-purple-500 font-semibold">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Add Your Class</h2>
            <p className="mb-4">
              Add your Class. It’s free and only take a minute
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-col-2 my-1 py-1 w-full">
                <label htmlFor="">Class Name</label>
                <input
                  type="text"
                  placeholder="Class Name"
                  {...register("class_name", { required: true })}
                  className="border border-gray-400 py-1 px-2 mb-2"
                />
                <label htmlFor="">Instructor Name</label>
                <input
                  type="text"
                  placeholder={user?.displayName}
                  {...register("instructor_name", { required: true })}
                  defaultValue={user?.displayName}
                  className="border border-gray-400 py-1 px-2"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="">Instructor Email</label>
                <input
                  type="text"
                  placeholder={user?.email}
                  {...register("instructor_email", { required: true })}
                  defaultValue={user?.email}
                  className="border border-gray-400 py-1 px-2 w-full"
                />{" "}
              </div>
              <div className="mt-5">
                <label htmlFor="">Available Seats</label>
                <input
                  type="text"
                  placeholder="Available seats"
                  {...register("available_seats", { required: true })}
                  className="border border-gray-400 py-1 px-2 w-full"
                />{" "}
              </div>
              <div className="mt-5">
                <label htmlFor="">Price</label>
                <input
                  type="text"
                  placeholder="Price"
                  {...register("price", { required: true })}
                  className="border border-gray-400 py-1 px-2 w-full"
                />{" "}
              </div>
              <div className="mt-5">
                <label htmlFor="">Status</label>
                <input
                  type="text"
                  name="status"
                  placeholder="pending"
                  //    defaultValue={pending}
                  className="border border-gray-400 py-1 px-2 w-full hidden"
                />{" "}
              </div>

              <div className="mt-5">
                <label htmlFor="">Image</label>
                <input
                  type="file"
                  placeholder="Image"
                  {...register("image", { required: true })}
                  className="border border-gray-400 py-1 px-2 w-full file:hidden rounded "
                />
              </div>

              <div className="mt-5">
                <button className="w-full bg-purple-500 py-3 text-center text-white">
                  Add Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
