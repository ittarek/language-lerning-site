import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import {
    MdDownload,
    MdSearch,
    MdPayment,
    MdCheckCircle,
    MdDateRange,
} from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user, spinner } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPeriod, setFilterPeriod] = useState("all");
    const [sortBy, setSortBy] = useState("recent");

    // ✅ Fixed Query
    const { data: history = [], isLoading, error } = useQuery({
        queryKey: ["history", user?.email],
        enabled: !spinner && !!user?.email,
        queryFn: async () => {
            try {
                // ✅ axiosSecure returns {data, status, headers, etc}
                // We need to return res.data (the actual array)
                const res = await axiosSecure.get(
                    `/enrolledClasses/${user?.email}`
                );

                console.log("Payment history response:", res);

                // ✅ Return res.data which is the array
                if (!res.data || !Array.isArray(res.data)) {
                    console.warn("Unexpected response format:", res);
                    return [];
                }

                return res.data; // ✅ Return the data array, not the full response
            } catch (error) {
                console.error("Error fetching payment history:", error);

                if (error.response?.status === 401) {
                    toast.error("Unauthorized. Please login again.", {
                        position: "top-right",
                    });
                } else if (error.response?.status === 403) {
                    toast.error("You don't have permission to access this resource.", {
                        position: "top-right",
                    });
                } else {
                    toast.error("Failed to load payment history", {
                        position: "top-right",
                    });
                }

                throw error;
            }
        },
        onError: (error) => {
            console.error("Query error:", error);
        },
        retry: 1,
        retryDelay: 1000,
    });

    // ✅ Debug logs
    console.log("History data:", history);
    console.log("History length:", history?.length);
    console.log("Is array:", Array.isArray(history));

    // Filter and sort payment history
    const filteredHistory = useMemo(() => {
        let result = Array.isArray(history) ? history : [];

        // Filter by search term
        if (searchTerm) {
            result = result.filter(
                (payment) =>
                    (payment.className?.toLowerCase() || "").includes(
                        searchTerm.toLowerCase()
                    ) || (payment.transactionId || "").includes(searchTerm)
            );
        }

        // Filter by date period
        if (filterPeriod !== "all") {
            const now = moment();
            result = result.filter((payment) => {
                const paymentDate = moment(payment.date);
                if (filterPeriod === "today") {
                    return paymentDate.isSame(now, "day");
                }
                if (filterPeriod === "week") {
                    return paymentDate.isAfter(now.clone().subtract(7, "days"));
                }
                if (filterPeriod === "month") {
                    return paymentDate.isAfter(now.clone().subtract(30, "days"));
                }
                if (filterPeriod === "year") {
                    return paymentDate.isAfter(now.clone().subtract(365, "days"));
                }
                return true;
            });
        }

        // Sort
        if (sortBy === "recent") {
            result = [...result].reverse();
        } else if (sortBy === "oldest") {
            result = [...result];
        } else if (sortBy === "highest") {
            result = [...result].sort((a, b) => (b.amount || 0) - (a.amount || 0));
        } else if (sortBy === "lowest") {
            result = [...result].sort((a, b) => (a.amount || 0) - (b.amount || 0));
        }

        return result;
    }, [history, searchTerm, filterPeriod, sortBy]);

    // Calculate statistics
    const totalAmount = filteredHistory.reduce(
        (sum, payment) => sum + (payment.amount || 0),
        0
    );
    const totalTransactions = filteredHistory.length;
    const averageAmount =
        totalTransactions > 0 ? (totalAmount / totalTransactions).toFixed(2) : 0;

    // Handle download invoice
    const handleDownloadInvoice = (payment) => {
        toast.info(`Invoice for ${payment.className} will be downloaded`, {
            position: "top-right",
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-green-600"></span>
                    <p className="mt-4 text-gray-600">Loading payment history...</p>
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
                        <MdPayment size={32} className="text-green-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Payment History
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Track all your course payments and transactions
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 text-sm font-medium">Total Paid</p>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            ${totalAmount.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 text-sm font-medium">Transactions</p>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {totalTransactions}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 text-sm font-medium">Average Payment</p>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            ${averageAmount}
                        </p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Payments
                            </label>
                            <div className="relative">
                                <MdSearch
                                    className="absolute left-3 top-3 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Search by class name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Filter by Period */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Period
                            </label>
                            <select
                                value={filterPeriod}
                                onChange={(e) => setFilterPeriod(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">Last 7 Days</option>
                                <option value="month">Last 30 Days</option>
                                <option value="year">Last Year</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="recent">Recent First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="highest">Highest Amount</option>
                                <option value="lowest">Lowest Amount</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table View */}
                {filteredHistory.length > 0 ? (
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
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                                Image
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                                Class Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                                Transaction ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredHistory.map((payment, index) => (
                                            <tr
                                                key={payment._id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <MdDateRange size={16} className="text-gray-400" />
                                                        <span className="text-sm text-gray-700">
                                                            {moment(payment?.date).format("YYYY-MM-DD")}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {payment.classImage ? (
                                                        <img
                                                            src={payment.classImage}
                                                            alt={payment.className}
                                                            className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                                            <MdPayment className="text-gray-400" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {payment.className || "N/A"}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <MdCheckCircle size={16} className="text-green-600" />
                                                        <span className="text-sm text-gray-700 font-mono">
                                                            {(payment.transactionId || "****").slice(-4)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-semibold text-green-600">
                                                        ${(payment.amount || 0).toFixed(2)}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() => handleDownloadInvoice(payment)}
                                                            title="Download Invoice"
                                                            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                                        >
                                                            <MdDownload size={18} />
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
                            {filteredHistory.map((payment, index) => (
                                <div
                                    key={payment._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="p-4">
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            {payment.classImage ? (
                                                <img
                                                    src={payment.classImage}
                                                    alt={payment.className}
                                                    className="h-20 w-20 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center">
                                                    <MdPayment className="text-gray-400" size={24} />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500">#{index + 1}</p>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                    {payment.className || "N/A"}
                                                </h3>
                                                <p className="text-xs text-gray-600">
                                                    {moment(payment?.date).format("YYYY-MM-DD")}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Amount and Status */}
                                        <div className="mb-4 pb-4 border-b border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <p className="text-2xl font-bold text-green-600">
                                                    ${(payment.amount || 0).toFixed(2)}
                                                </p>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100">
                                                    <MdCheckCircle size={16} className="text-green-600" />
                                                    <span className="text-xs font-semibold text-green-600">
                                                        Paid
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <button
                                            onClick={() => handleDownloadInvoice(payment)}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors font-medium"
                                        >
                                            <MdDownload size={18} />
                                            Download Invoice
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Footer */}
                        <div className="mt-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-6 text-white">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <p className="text-green-200 text-sm font-medium">
                                        Total Transactions
                                    </p>
                                    <p className="text-4xl font-bold mt-2">{totalTransactions}</p>
                                </div>
                                <div>
                                    <p className="text-green-200 text-sm font-medium">
                                        Total Amount Paid
                                    </p>
                                    <p className="text-4xl font-bold mt-2">
                                        ${totalAmount.toFixed(2)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-green-200 text-sm font-medium">
                                        Average Transaction
                                    </p>
                                    <p className="text-4xl font-bold mt-2">${averageAmount}</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <MdPayment size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">
                            {searchTerm
                                ? "No payments match your search"
                                : filterPeriod !== "all"
                                    ? "No payments found for this period"
                                    : "No payment history yet"}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Start enrolling in classes to see your payment history here.
                        </p>
                        <Link
                            to="/classes"
                            className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
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

export default PaymentHistory;