import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
    MdBook,
    MdSearch,
    MdSchool,
    MdEmojiEvents,
    MdDownload,
    MdDateRange,
    MdWarning,
} from "react-icons/md";
import moment from "moment";

const MyEnroll = () => {
    const { user, spinner } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("recent");

    // ✅ Use axiosSecure instead of fetch to automatically include JWT token
    const { data: enroll = [], isLoading, error } = useQuery({
        queryKey: ["enroll", user?.email],
        enabled: !spinner && !!user?.email,
        queryFn: async () => {
            try {
                // This will automatically include the JWT token in headers
                const res = await axiosSecure.get(
                    `/enrolledClasses/${user?.email}`
                );

                if (!res.data) {
                    throw new Error("No data received");
                }

                return res.data;
            } catch (error) {
                console.error("Error fetching enrolled classes:", error);

                if (error.response?.status === 401) {
                    toast.error("Unauthorized. Please login again.", {
                        position: "top-right"
                    });
                } else if (error.response?.status === 403) {
                    toast.error("You don't have permission to access this resource.", {
                        position: "top-right"
                    });
                } else {
                    toast.error("Failed to load enrolled classes", {
                        position: "top-right"
                    });
                }

                throw error;
            }
        },
        onError: (error) => {
            console.error("Query error:", error);
        },
        retry: 1, // Retry once on failure
        retryDelay: 1000, // Wait 1 second before retry
    });

    // Filter and sort enrolled classes
    const filteredEnroll = useMemo(() => {
        let result = enroll || [];

        // Search by class name or instructor
        if (searchTerm) {
            result = result.filter(
                (cls) =>
                    cls.className?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    cls.instructorName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        if (sortBy === "recent") {
            result = [...result].reverse();
        } else if (sortBy === "price-low") {
            result = [...result].sort((a, b) => (a.amount || 0) - (b.amount || 0));
        } else if (sortBy === "price-high") {
            result = [...result].sort((a, b) => (b.amount || 0) - (a.amount || 0));
        } else if (sortBy === "name") {
            result = [...result].sort((a, b) =>
                (a.className || "").localeCompare(b.className || "")
            );
        }

        return result;
    }, [enroll, searchTerm, sortBy]);

    // Calculate total amount spent
    const totalSpent = filteredEnroll.reduce((sum, cls) => sum + (cls.amount || 0), 0);

    // Handle download certificate (placeholder)
    const handleDownloadCertificate = (className) => {
        toast.info(`Certificate for "${className}" will be downloaded soon`, {
            position: "top-right",
        });
        // Add actual download logic here
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-blue-600"></span>
                    <p className="mt-4 text-gray-600">Loading your enrolled classes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <MdEmojiEvents size={32} className="text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Enrolled Classes
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Track your enrolled courses and continue learning
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 text-sm font-medium">Total Enrolled</p>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {filteredEnroll.length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            ${totalSpent.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 text-sm font-medium">Average Price</p>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            ${
                                filteredEnroll.length > 0
                                    ? (totalSpent / filteredEnroll.length).toFixed(2)
                                    : "0.00"
                            }
                        </p>
                    </div>
                </div>

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
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="recent">Recently Enrolled</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Class Name (A-Z)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table or Cards View */}
                {filteredEnroll.length > 0 ? (
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
                                                Enrollment Date
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
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredEnroll.map((singleClass, index) => (
                                            <tr
                                                key={singleClass._id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <MdDateRange
                                                            size={16}
                                                            className="text-gray-400"
                                                        />
                                                        <span className="text-sm text-gray-700">
                                                            {singleClass?.date
                                                                ? moment(singleClass.date).format("YYYY-MM-DD")
                                                                : "N/A"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {singleClass?.classImage ? (
                                                        <img
                                                            src={singleClass.classImage}
                                                            alt={singleClass?.className}
                                                            className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                                            <MdBook className="text-gray-400" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {singleClass?.className || "N/A"}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <MdSchool size={16} className="text-blue-600" />
                                                        <p className="text-sm text-gray-600">
                                                            {singleClass?.instructorName || "N/A"}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-semibold text-blue-600">
                                                        ${(singleClass?.amount || 0).toFixed(2)}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() =>
                                                                handleDownloadCertificate(
                                                                    singleClass?.className
                                                                )
                                                            }
                                                            title="Download Certificate"
                                                            className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                                        >
                                                            <MdDownload size={18} />
                                                        </button>
                                                        <button
                                                            title="View Class Details"
                                                            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                                        >
                                                            <MdBook size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile View - Cards */}
                        <div className="md:hidden space-y-4">
                            {filteredEnroll.map((singleClass, index) => (
                                <div
                                    key={singleClass._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="p-4">
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            {singleClass?.classImage ? (
                                                <img
                                                    src={singleClass.classImage}
                                                    alt={singleClass?.className}
                                                    className="h-20 w-20 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center">
                                                    <MdBook className="text-gray-400" size={24} />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500">#{index + 1}</p>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                    {singleClass?.className || "N/A"}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MdSchool size={16} />
                                                    {singleClass?.instructorName || "N/A"}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {singleClass?.date
                                                        ? moment(singleClass.date).format("YYYY-MM-DD")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-4 pb-4 border-b border-gray-200">
                                            <p className="text-2xl font-bold text-blue-600">
                                                ${(singleClass?.amount || 0).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() =>
                                                    handleDownloadCertificate(singleClass?.className)
                                                }
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors font-medium"
                                            >
                                                <MdDownload size={18} />
                                                Certificate
                                            </button>
                                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors font-medium">
                                                <MdBook size={18} />
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Footer */}
                        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-blue-200 text-sm font-medium">
                                        Classes Enrolled
                                    </p>
                                    <p className="text-4xl font-bold mt-2">
                                        {filteredEnroll.length}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-blue-200 text-sm font-medium">
                                        Total Investment
                                    </p>
                                    <p className="text-4xl font-bold mt-2">
                                        ${totalSpent.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <MdEmojiEvents size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">
                            {searchTerm
                                ? "No classes match your search"
                                : "You haven't enrolled in any classes yet"}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Start your learning journey by enrolling in our available classes.
                        </p>
                        <Link
                            to="/classes"
                            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
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

export default MyEnroll;