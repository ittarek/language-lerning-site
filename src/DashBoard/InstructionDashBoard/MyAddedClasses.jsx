// import React, { useContext } from "react";
// import useClass from "../../Hooks/useClass";
// import { AuthContext } from "../../Provider/AuthProvider";
// import { Link } from "react-router-dom";

// const MyAddedClasses = () => {
//   const [classes] = useClass();
//   const { user } = useContext(AuthContext);
//   const filterClass = classes.filter(
//     (emailFiled) => user?.email === emailFiled.instructor_email
//   );
//   // console.log(filterClass);
//   return (
//     <div className="w-full h-full mt-16 mx-4 px-4">
//       <h2 className="h2">My Classes : {filterClass.length}</h2>

//       <div>
//         <div className="overflow-x-auto">
//           <table className="table">
//             {/* head */}
//             <thead>
//               <tr>
//                 <th>No</th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Status</th>
//                 <th>
//                   Total Enrolled
//                   Students
//                 </th>
//                 <th>Action</th>
//                 <th>Feedback</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* row 1 */}

//               {filterClass.map((myClass, index) => (
//                 <tr key={myClass._id}>
//                   <th>{index + 1}</th>
//                   <td>
//                     <div className="avatar mask mask-squircle w-12 h-12">
//                       <img src={myClass?.class_imgUrl} alt="User" />
//                     </div>
//                   </td>
//                   <td>
//                     <div className="font-bold">{myClass.class_name}</div>
//                   </td>
//                   <td>
//                    { <div className="font-bold">{myClass.status === "approved" ? <span className="text-green-600">approved</span> :myClass.status ==="pending" ? <span className="text-yellow-600">pending</span> : <span className="text-red-400">denied</span>  }</div>}
//                   </td>
//                   <td>
//                     <div className="font-bold text-center">
               
//                       {myClass.enrolled_students
//                         ? myClass.enrolled_students
//                         : 0}
//                     </div>
//                   </td>
//                   <th>
//                     <button
//                       onClick={() => handleUpdate(myClass)}
//                       className="btn"
//                     >
//                       Update
//                     </button>
//                   </th>{" "}
//                   <th>
//                     <div className="font-bold  text-2xl">
//                       <Link
//                         to="instructorFeedback"
//                         className="btn text-purple-500"
//                         onClick={() => handleFeedback(myClass)}
//                       >
//                         Feedback
//                       </Link>
//                     </div>
//                   </th>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAddedClasses;
import React, { useContext, useMemo, useState } from "react";
import useClass from "../../Hooks/useClass";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import {
    MdEdit,
    MdFeedback,
    MdSearch,
    MdInfo,
    MdCheckCircle,
    MdPending,
    MdBlock,
} from "react-icons/md";

const MyAddedClasses = () => {
    const [classes, , refetch] = useClass();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedClass, setSelectedClass] = useState(null);

    // Filter classes by instructor email
    const filterClass = useMemo(() => {
        let result = classes.filter(
            (emailFiled) => user?.email === emailFiled.instructor_email
        );

        // Filter by status
        if (filterStatus !== "all") {
            result = result.filter((cls) => cls.status === filterStatus);
        }

        // Search by class name
        if (searchTerm) {
            result = result.filter((cls) =>
                cls.class_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return result;
    }, [classes, user?.email, searchTerm, filterStatus]);

    const handleUpdate = (myClass) => {
        setSelectedClass(myClass);
        Swal.fire({
            title: "Update Class?",
            text: `Do you want to update "${myClass.class_name}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#8b5cf6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Navigate to update page or open modal
                navigate(`/dashboard/addClass`, { state: { classData: myClass } });
                toast.info("Opening update form...", { position: "top-right" });
            }
        });
    };

    const handleFeedback = (myClass) => {
        setSelectedClass(myClass);
        // The Link component will handle navigation
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold w-fit">
                        <MdCheckCircle size={16} />
                        Approved
                    </div>
                );
            case "pending":
                return (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold w-fit">
                        <MdPending size={16} />
                        Pending
                    </div>
                );
            case "denied":
                return (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold w-fit">
                        <MdBlock size={16} />
                        Denied
                    </div>
                );
            default:
                return (
                    <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold">
                        Unknown
                    </div>
                );
        }
    };

    const getEnrolledStudentsDisplay = (enrolled) => {
        const count = enrolled || 0;
        return (
            <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-bold text-blue-600">{count}</span>
                <span className="text-xs text-gray-500">
                    {count === 1 ? "student" : "students"}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Classes</h1>
                    <p className="text-gray-600">
                        Total Classes: <span className="font-semibold text-lg text-purple-600">{filterClass.length}</span>
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Classes
                            </label>
                            <div className="relative">
                                <MdSearch className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by class name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Filter by Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Status
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="denied">Denied</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {filterClass.length > 0 ? (
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
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                                            Enrolled Students
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filterClass.map((myClass, index) => (
                                        <tr
                                            key={myClass._id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img
                                                    src={myClass?.class_imgUrl}
                                                    alt={myClass?.class_name}
                                                    className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {myClass.class_name}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(myClass.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getEnrolledStudentsDisplay(myClass.enrolled_students)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 justify-center">
                                                    {/* Update Button */}
                                                    <button
                                                        onClick={() => handleUpdate(myClass)}
                                                        title="Edit Class"
                                                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                                    >
                                                        <MdEdit size={18} />
                                                    </button>

                                                    {/* Feedback Button */}
                                                    <Link
                                                        to="instructorFeedback"
                                                        state={{ classData: myClass }}
                                                        onClick={() => handleFeedback(myClass)}
                                                        title="View Feedback"
                                                        className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                                                    >
                                                        <MdFeedback size={18} />
                                                    </Link>

                                                    {/* Info Button - Show class details */}
                                                    <button
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: myClass.class_name,
                                                                html: `
                                  <div class="text-left">
                                    <p><strong>Status:</strong> ${myClass.status}</p>
                                    <p><strong>Price:</strong> $${myClass.price}</p>
                                    <p><strong>Available Seats:</strong> ${myClass.available_seats}</p>
                                    <p><strong>Enrolled Students:</strong> ${myClass.enrolled_students || 0
                                                                    }</p>
                                    ${myClass.feedback
                                                                        ? `<p><strong>Feedback:</strong> ${myClass.feedback}</p>`
                                                                        : ""
                                                                    }
                                  </div>
                                `,
                                                                icon: "info",
                                                                confirmButtonColor: "#8b5cf6",
                                                            });
                                                        }}
                                                        title="View Details"
                                                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                                    >
                                                        <MdInfo size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <p className="text-gray-500 text-lg mb-4">
                                {filterClass.length === 0 && searchTerm
                                    ? "No classes match your search"
                                    : "You haven't added any classes yet"}
                            </p>
                            <Link
                                to="/dashboard/addClass"
                                className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                            >
                                Add Your First Class
                            </Link>
                        </div>
                    )}
                </div>

                {/* Stats */}
                {filterClass.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 text-sm font-medium">Total Classes</p>
                            <p className="text-3xl font-bold text-purple-600 mt-2">
                                {filterClass.length}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 text-sm font-medium">Total Enrolled</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                                {filterClass.reduce(
                                    (sum, cls) => sum + (cls.enrolled_students || 0),
                                    0
                                )}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 text-sm font-medium">Approved</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                {filterClass.filter((cls) => cls.status === "approved").length}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default MyAddedClasses;