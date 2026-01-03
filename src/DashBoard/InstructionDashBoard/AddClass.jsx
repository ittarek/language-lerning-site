// import  { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { AuthContext } from "../../Provider/AuthProvider";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const AddClass = () => {
//   const { user } = useContext(AuthContext);
//   const [axiosSecure] = useAxiosSecure();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const image_Hosting_Key = import.meta.env.VITE_IMAGE_HOSTING_URL;
//   const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_Hosting_Key}`;

//   const onSubmit = (data) => {
//     // console.log(data);
//     const formData = new FormData();
//     formData.append("image", data.image[0]);

//     fetch(img_hosting_url, {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((resultImage) => {
//         if (resultImage.success) {
//           const imgURL = resultImage.data.display_url;
//           const {
//             class_name,
//             instructor_name,
//             instructor_email,
//             price,
//             available_seats,
//             status,
//             instructor_img,
//             feedback
//           } = data;
//           const newClass = {
//             class_name,
//             instructor_name,
//             instructor_email,
//             price: parseFloat(price),
//             available_seats,
//             instructor_img,
//             class_imgUrl: imgURL,
//             status: "pending",
//             feedback
//           };
//           // console.log(newClass);
//           axiosSecure.post("/addClass", newClass).then((data) => {
//             if (data.data.insertedId) {
//               // reset();
//               Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Item added successfully",
//                 showConfirmButton: false,
//                 timer: 1500,
//               });
//             }
//           });
//         }
//       });
//   };

//   return (
//     <div className="w-full min-h-screen py-10">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12  rounded-xl mx-auto shadow-lg overflow-hidden">
//           <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-image">
//             <h1 className=" text-3xl mb-3">Welcome</h1>
//             <div>
//               <p className="">
//                 Please let me know the specific subject or topic you would like
//                 to have a class on, and I'll be happy to provide you with a
//                 detailed lesson plan. Whether it's a one-on-one session or a
//                 group class, I'll ensure that the content is structured,
//                 informative, and interactive. Together, we'll dive deep into the
//                 subject matter, explore key concepts, and engage in meaningful
//                 discussions to enhance your understanding and learning
//                 experience. Let's get started on your educational journey!
//                 <a href="#" className="text-purple-500 font-semibold">
//                   Learn more
//                 </a>
//               </p>
//             </div>
//           </div>
//           <div className="w-full lg:w-1/2 py-16 px-12">
//             <h2 className="text-3xl mb-4">Add Your Class</h2>
//             <p className="mb-4">
//               Add your Class. It’s free and only take a minute
//             </p>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="grid grid-col-2 my-1 py-1 w-full">
//                 <label htmlFor="">Class Name</label>
//                 <input
//                   type="text"
//                   placeholder="Class Name"
//                   {...register("class_name", { required: true })}
//                   className="border border-gray-400 py-1 px-2 mb-2"
//                 />
//                 <label htmlFor="">Instructor Name</label>
//                 <input
//                   type="text"
//                   placeholder={user?.displayName}
//                   {...register("instructor_name", { required: true })}
//                   value={user?.displayName}
//                   className="border border-gray-400 py-1 px-2"
//                 />
//               </div>
//               <div className="mt-5">
//                 <label htmlFor="">Instructor Email</label>
//                 <input
//                   type="text"
//                   placeholder={user?.email}
//                   {...register("instructor_email", { required: true })}
//                   value={user?.email}
//                   className="border border-gray-400 py-1 px-2 w-full"
//                 />{" "}
//               </div>
//               <div className="mt-5">
//                 <label htmlFor="">Available Seats</label>
//                 <input
//                   type="text"
//                   placeholder="Available seats"
//                   {...register("available_seats", { required: true })}
//                   className="border border-gray-400 py-1 px-2 w-full"
//                 />{" "}
//               </div>
//               <div className="mt-5">
//                 <label htmlFor="">Price</label>
//                 <input
//                   type="text"
//                   placeholder="Price"
//                   {...register("price", { required: true })}
//                   className="border border-gray-400 py-1 px-2 w-full"
//                 />{" "}
//               </div>
//               <div className="mt-5">
//                 <label htmlFor="" className="hidden">
//                   Status
//                 </label>
//                 <input
//                   type="text"
//                   name="status"
//                   placeholder="pending"
//                     //  defaultValue={pending}
//                   className="border border-gray-400 py-1 px-2 w-full hidden"
//                 />{" "}
//               </div>

//               <div className="mt-5">
//                 <label htmlFor="">Class Image</label>
//                 <input
//                   type="file"
//                   placeholder="Image"
//                   {...register("image", { required: true })}
//                   className="border border-gray-400 py-1 px-2 w-full file:hidden rounded "
//                 />
//               </div>
//               <div className="mt-5 hidden">
//                 <label htmlFor="" className="hidden">
//                   Instructor Image
//                 </label>
//                 <input
//                   type="image"
//                   name="instructor_img"
//                   placeholder={user?.photoURL}
//                   {...register("instructor_img", { required: true })}
//                   value={user?.photoURL}
//                   className="border border-gray-400 py-1 px-2 w-full image:hidden  rounded "
//                 />
//               </div>
//               <div className="hidden">
//                 <textarea
//                   name="feedback"
//                   id=""
//                   cols="30"
//                   rows="10"
//                   {...register("feedback")}
//                 ></textarea>
//               </div>

//               <div className="mt-5">
//                 <button className="w-full bg-purple-500 py-3 text-center text-white">
//                   Add Now
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddClass;
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import { MdCloudUpload, MdError } from "react-icons/md";

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        mode: "onChange",
    });

    const image_Hosting_Key = import.meta.env.VITE_IMAGE_HOSTING_URL;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_Hosting_Key}`;

    // Watch image input for preview
    const imageInput = watch("image");
    const priceValue = watch("price");
    const seatsValue = watch("available_seats");

    // Preview image
    useState(() => {
        if (imageInput && imageInput[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(imageInput[0]);
        }
    }, [imageInput]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Validate file
            if (!data.image || !data.image[0]) {
                toast.error("Please select an image", { position: "top-right" });
                return;
            }

            const file = data.image[0];
            const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                toast.error("Only JPG, PNG, JPEG, and WebP images are allowed", {
                    position: "top-right",
                });
                setLoading(false);
                return;
            }

            if (file.size > maxSize) {
                toast.error("Image size must be less than 5MB", {
                    position: "top-right",
                });
                setLoading(false);
                return;
            }

            // Upload image to imgbb
            const formData = new FormData();
            formData.append("image", file);

            const imageRes = await fetch(img_hosting_url, {
                method: "POST",
                body: formData,
            });

            const imageResult = await imageRes.json();

            if (!imageResult.success) {
                toast.error("Failed to upload image. Please try again.", {
                    position: "top-right",
                });
                setLoading(false);
                return;
            }

            const imgURL = imageResult.data.display_url;

            // Prepare class data
            const newClass = {
                class_name: data.class_name.trim(),
                instructor_name: user?.displayName || "Unknown",
                instructor_email: user?.email || "unknown@email.com",
                instructor_img: user?.photoURL || "",
                price: parseFloat(data.price),
                available_seats: parseInt(data.available_seats),
                class_imgUrl: imgURL,
                status: "pending",
                feedback: "",
                createdAt: new Date(),
            };

            // Validate data before sending
            if (
                !newClass.class_name ||
                newClass.price <= 0 ||
                newClass.available_seats <= 0
            ) {
                toast.error("Please fill all fields correctly", {
                    position: "top-right",
                });
                setLoading(false);
                return;
            }

            // Post to backend
            const response = await axiosSecure.post("/addClass", newClass);

            if (response.data.insertedId) {
                reset();
                setImagePreview(null);
                toast.success("Class added successfully!", {
                    position: "top-right",
                });

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Success!",
                    text: "Your class has been submitted for admin approval.",
                    showConfirmButton: true,
                    confirmButtonColor: "#a855f7",
                });
            } else {
                toast.error("Failed to add class. Please try again.", {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(
                error.response?.data?.message || "An error occurred. Please try again.",
                {
                    position: "top-right",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Section */}
                        <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold mb-6">Share Your Knowledge</h2>
                                <p className="text-lg mb-8 leading-relaxed">
                                    Create and share engaging classes with students around the world.
                                    Submit your class details and wait for admin approval to get started.
                                </p>
                                <div className="space-y-4 text-left text-sm">
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">✓</span>
                                        <span>Easy class creation process</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">✓</span>
                                        <span>Quick admin review and approval</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">✓</span>
                                        <span>Reach students globally</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Form */}
                        <div className="p-8 sm:p-12">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Add New Class
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Fill in the details below to create your class
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Class Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Class Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter class name"
                                        {...register("class_name", {
                                            required: "Class name is required",
                                            minLength: {
                                                value: 3,
                                                message: "Class name must be at least 3 characters",
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "Class name cannot exceed 100 characters",
                                            },
                                        })}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition ${errors.class_name
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                            }`}
                                    />
                                    {errors.class_name && (
                                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                            <MdError />
                                            {errors.class_name.message}
                                        </div>
                                    )}
                                </div>

                                {/* Instructor Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Instructor Name (Auto-filled)
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        value={user?.displayName || "Not available"}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        This field is auto-filled from your profile
                                    </p>
                                </div>

                                {/* Instructor Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Instructor Email (Auto-filled)
                                    </label>
                                    <input
                                        type="email"
                                        disabled
                                        value={user?.email || "Not available"}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        This field is auto-filled from your profile
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Available Seats */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Available Seats *
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter number of seats"
                                            {...register("available_seats", {
                                                required: "Available seats is required",
                                                min: {
                                                    value: 1,
                                                    message: "Must have at least 1 seat",
                                                },
                                                max: {
                                                    value: 500,
                                                    message: "Maximum 500 seats allowed",
                                                },
                                            })}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition ${errors.available_seats
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                                }`}
                                        />
                                        {errors.available_seats && (
                                            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                                <MdError />
                                                {errors.available_seats.message}
                                            </div>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Price ($) *
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter price"
                                            step="0.01"
                                            {...register("price", {
                                                required: "Price is required",
                                                min: {
                                                    value: 0.01,
                                                    message: "Price must be greater than 0",
                                                },
                                                max: {
                                                    value: 10000,
                                                    message: "Price cannot exceed $10,000",
                                                },
                                            })}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition ${errors.price
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                                }`}
                                        />
                                        {errors.price && (
                                            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                                <MdError />
                                                {errors.price.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Class Image */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Class Image *
                                    </label>
                                    <div className="relative">
                                        <label
                                            htmlFor="image"
                                            className={`flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition ${errors.image
                                                    ? "border-red-500 bg-red-50 hover:border-red-600"
                                                    : "border-gray-300 bg-gray-50 hover:border-purple-500"
                                                }`}
                                        >
                                            <MdCloudUpload size={24} className="text-gray-400" />
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-700">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    JPG, PNG, JPEG, WebP (Max 5MB)
                                                </p>
                                            </div>
                                        </label>
                                        <input
                                            id="image"
                                            type="file"
                                            {...register("image", {
                                                required: "Image is required",
                                            })}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">
                                                Image Preview
                                            </p>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                            />
                                        </div>
                                    )}

                                    {errors.image && (
                                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                            <MdError />
                                            {errors.image.message}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Uploading...
                                        </span>
                                    ) : (
                                        "Add Class"
                                    )}
                                </button>
                            </form>

                            <p className="text-xs text-gray-500 mt-6 text-center">
                                Your class will be reviewed by an admin before it goes live.
                                This typically takes 24-48 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default AddClass;