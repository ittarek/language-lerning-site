import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import {
    MdPayment,
    MdDelete,
    MdSearch,
    MdShoppingCart,
    MdCheckCircle,
    MdLock,
} from "react-icons/md";

const MySelectClasses = () => {
    const { user, spinner } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("recent");

    // Fetch selected classes
    const { data: classData = [], refetch, isLoading } = useQuery({
        queryKey: ["classData", user?.email],
        enabled: !spinner && !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/getSelectedClass?email=${user?.email}`
            );
            return res.data;
        },
    });

    // ✅ Fetch enrolled classes to check which ones are already enrolled
    const { data: enrolledClasses = [] } = useQuery({
        queryKey: ["enrolledClasses", user?.email],
        enabled: !spinner && !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(
                    `/enrolledClasses/${user?.email}`
                );
                return res.data || [];
            } catch (error) {
                console.error("Error fetching enrolled classes:", error);
                return [];
            }
        },
    });

    // ✅ Check if a class is already enrolled
    const isClassEnrolled = (className) => {
        return enrolledClasses.some(
            (enrolled) =>
                enrolled.className?.toLowerCase() === className?.toLowerCase()
        );
    };

    // Filter and sort classes
    const filterClass = useMemo(() => {
        let result = classData.filter(
            (emailFiled) => user?.email === emailFiled.studentEmail
        );

        // Search by class name or instructor
        if (searchTerm) {
            result = result.filter(
                (cls) =>
                    cls.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    cls.instructor_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        if (sortBy === "recent") {
            result = [...result].reverse();
        } else if (sortBy === "price-low") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [classData, user?.email, searchTerm, sortBy]);

    // Calculate total price (only for non-enrolled classes)
    const totalPrice = filterClass
        .filter((cls) => !isClassEnrolled(cls.class_name))
        .reduce((sum, cls) => sum + cls.price, 0);

    // Delete class
    const handleDelete = (_id, className) => {
        Swal.fire({
            title: "Remove Class?",
            text: `Are you sure you want to remove "${className}" from your selection?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Remove!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(
                        `/selectedClass/${_id}`
                    );

                    console.log("Delete response:", response);

                    if (response.data.deletedCount > 0) {
                        refetch();

                        toast.success(`${className} removed successfully!`, {
                            position: "top-right",
                        });
                    } else {
                        toast.error("Failed to remove class", { position: "top-right" });
                    }
                } catch (error) {
                    console.error("Delete error:", error);

                    if (error.response?.status === 404) {
                        toast.error("Class not found", { position: "top-right" });
                    } else if (error.response?.status === 401) {
                        toast.error("Unauthorized. Please login again.", {
                            position: "top-right",
                        });
                    } else {
                        toast.error(
                            error.response?.data?.message || "Failed to remove class",
                            { position: "top-right" }
                        );
                    }
                }
            }
        });
    };

    // Handle already enrolled class click
    const handleAlreadyEnrolled = (className) => {
        Swal.fire({
            title: "Already Enrolled",
            text: `You are already enrolled in "${className}". Visit your enrolled classes to view course details.`,
            icon: "info",
            confirmButtonColor: "#3b82f6",
            confirmButtonText: "Go to My Classes",
            showCancelButton: true,
            cancelButtonText: "Stay Here",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/dashboard/myEnroll";
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <MdShoppingCart size={32} className="text-purple-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Selected Classes
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Total Classes: <span className="font-semibold text-lg text-purple-600">{filterClass.length}</span>
                    </p>
                </div>

                {/* Summary Card */}
                {filterClass.length > 0 && (
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-lg p-6 mb-8 text-white">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="text-purple-200 text-sm font-medium">
                                    Selected Classes
                                </p>
                                <p className="text-4xl font-bold mt-2">{filterClass.length}</p>
                            </div>
                            <div>
                                <p className="text-purple-200 text-sm font-medium">
                                    Total Cost (Pending)
                                </p>
                                <p className="text-4xl font-bold mt-2">${totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search and Sort */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Classes
                            </label>
                            <div className="relative">
                                <MdSearch
                                    className="absolute left-3 top-3 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Search by class name or instructor..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="recent">Recently Added</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table or Cards View */}
                {filterClass.length > 0 ? (
                    <>
                        {/* Desktop View */}
                        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                                No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                                Image
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                                Class Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                                Instructor
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filterClass.map((singleClass, index) => {
                                            const enrolled = isClassEnrolled(singleClass.class_name);

                                            return (
                                                <tr
                                                    key={singleClass._id}
                                                    className={`transition-colors ${enrolled
                                                            ? "bg-gray-100 opacity-60"
                                                            : "hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div
                                                            className={`relative ${enrolled ? "opacity-50" : ""
                                                                }`}
                                                        >
                                                            <img
                                                                src={singleClass.class_imgUrl}
                                                                alt={singleClass.class_name}
                                                                className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                                            />
                                                            {enrolled && (
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                                                                    <MdCheckCircle
                                                                        size={20}
                                                                        className="text-white"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {singleClass.class_name}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-600">
                                                            {singleClass.instructor_name}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-semibold text-purple-600">
                                                            ${singleClass.price.toFixed(2)}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {enrolled ? (
                                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                                                                <MdCheckCircle size={16} />
                                                                Enrolled
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                                                                Pending
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2 justify-center">
                                                            {enrolled ? (
                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleAlreadyEnrolled(
                                                                                singleClass.class_name
                                                                            )
                                                                        }
                                                                        title="Already Enrolled"
                                                                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors flex items-center gap-1"
                                                                    >
                                                                        <MdLock size={18} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                singleClass._id,
                                                                                singleClass.class_name
                                                                            )
                                                                        }
                                                                        title="Remove from Selection"
                                                                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                                                    >
                                                                        <MdDelete size={18} />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Link
                                                                        to={`payment/${singleClass._id}`}
                                                                        title="Proceed to Payment"
                                                                        className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                                                    >
                                                                        <MdPayment size={18} />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                singleClass._id,
                                                                                singleClass.class_name
                                                                            )
                                                                        }
                                                                        title="Remove from Selection"
                                                                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                                                    >
                                                                        <MdDelete size={18} />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile View - Cards */}
                        <div className="md:hidden space-y-4">
                            {filterClass.map((singleClass, index) => {
                                const enrolled = isClassEnrolled(singleClass.class_name);

                                return (
                                    <div
                                        key={singleClass._id}
                                        className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${enrolled ? "opacity-60 border-l-4 border-l-green-500" : ""
                                            }`}
                                    >
                                        <div className="p-4">
                                            {/* Header */}
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="relative">
                                                    <img
                                                        src={singleClass.class_imgUrl}
                                                        alt={singleClass.class_name}
                                                        className="h-20 w-20 rounded-lg object-cover"
                                                    />
                                                    {enrolled && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                                                            <MdCheckCircle
                                                                size={24}
                                                                className="text-white"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500">#{index + 1}</p>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                        {singleClass.class_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {singleClass.instructor_name}
                                                    </p>
                                                    {enrolled && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold mt-2">
                                                            <MdCheckCircle size={14} />
                                                            Enrolled
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="mb-4 pb-4 border-b border-gray-200">
                                                <p className="text-2xl font-bold text-purple-600">
                                                    ${singleClass.price.toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-3">
                                                {enrolled ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleAlreadyEnrolled(singleClass.class_name)
                                                            }
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors font-medium"
                                                        >
                                                            <MdLock size={18} />
                                                            Enrolled
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    singleClass._id,
                                                                    singleClass.class_name
                                                                )
                                                            }
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors font-medium"
                                                        >
                                                            <MdDelete size={18} />
                                                            Remove
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link
                                                            to={`payment/${singleClass._id}`}
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors font-medium"
                                                        >
                                                            <MdPayment size={18} />
                                                            Pay Now
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    singleClass._id,
                                                                    singleClass.class_name
                                                                )
                                                            }
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors font-medium"
                                                        >
                                                            <MdDelete size={18} />
                                                            Remove
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary Footer */}
                        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">
                                        Pending Payment for {filterClass.filter((cls) => !isClassEnrolled(cls.class_name)).length}{" "}
                                        {filterClass.filter((cls) => !isClassEnrolled(cls.class_name)).length === 1
                                            ? "class"
                                            : "classes"}
                                    </p>
                                    <p className="text-3xl font-bold text-purple-600 mt-2">
                                        ${totalPrice.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition">
                                        Continue Shopping
                                    </button>
                                    <Link
                                        to="/dashboard/paymentHistory"
                                        className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
                                    >
                                        <MdCheckCircle size={20} />
                                        View Payment History
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <MdShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">
                            {searchTerm
                                ? "No classes match your search"
                                : "You haven't selected any classes yet"}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Start by browsing our available classes and selecting the ones you
                            want to enroll in.
                        </p>
                        <Link
                            to="/classes"
                            className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                        >
                            Browse Classes
                        </Link>
                    </div>
                )}
            </div>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default MySelectClasses;