// import React from "react";
// import useClass from "../../Hooks/useClass";
// import Container from "../../Components/Container";

// const InsTructionFeedBack = () => {
//     const [classes] = useClass();

//     return (
//         <div className="w-full ">
//             <Container>
//                 <div>
//                     Feedback :{" "}
//                     {classes.map((feedback) => (
//                         <div> {feedback.feedback && <p>{feedback.feedback}</p>}</div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     );
// };

// export default InsTructionFeedBack;
import React, { useContext, useMemo, useState } from "react";
import useClass from "../../Hooks/useClass";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import {
    MdFeedback,
    MdCheckCircle,
    MdWarning,
    MdSearch,
    MdArrowBack,
} from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const InstructorFeedback = () => {
    const [classes] = useClass();
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Get current class from location state if available
    const currentClass = location.state?.classData;

    // Filter classes by instructor and get feedback
    const feedbackList = useMemo(() => {
        let result = classes
            .filter((cls) => user?.email === cls.instructor_email)
            .filter((cls) => cls.feedback && cls.feedback.trim() !== "");

        // Filter by feedback type
        if (filterType !== "all") {
            result = result.filter((cls) => {
                const feedback = cls.feedback.toLowerCase();
                if (filterType === "approved" && feedback.includes("approved"))
                    return true;
                if (filterType === "improvement" && feedback.includes("improve"))
                    return true;
                if (filterType === "other") return true;
                return false;
            });
        }

        // Search by class name
        if (searchTerm) {
            result = result.filter((cls) =>
                cls.class_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return result;
    }, [classes, user?.email, searchTerm, filterType]);

    const getTotalClasses = () => {
        return classes.filter((cls) => user?.email === cls.instructor_email).length;
    };

    const getApprovedClasses = () => {
        return classes.filter(
            (cls) => user?.email === cls.instructor_email && cls.status === "approved"
        ).length;
    };

    const getFeedbackIcon = (feedback) => {
        if (feedback.toLowerCase().includes("approved")) {
            return { icon: MdCheckCircle, color: "text-green-600", bg: "bg-green-50" };
        }
        if (feedback.toLowerCase().includes("improve")) {
            return { icon: MdWarning, color: "text-yellow-600", bg: "bg-yellow-50" };
        }
        return { icon: MdFeedback, color: "text-blue-600", bg: "bg-blue-50" };
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <Container>
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                >
                    <MdArrowBack size={20} />
                    Back
                </button>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Class Feedback
                    </h1>
                    <p className="text-gray-600">
                        Admin feedback and reviews for your classes
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 text-sm font-medium">Total Classes</p>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            {getTotalClasses()}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 text-sm font-medium">Approved Classes</p>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {getApprovedClasses()}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 text-sm font-medium">Feedbacks</p>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {feedbackList.length}
                        </p>
                    </div>
                </div>

                {/* Search and Filter */}
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
                                    placeholder="Search by class name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter Feedback
                            </label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Feedback</option>
                                <option value="approved">Approved</option>
                                <option value="improvement">Needs Improvement</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Feedback List */}
                <div className="space-y-4">
                    {feedbackList.length > 0 ? (
                        feedbackList.map((feedback) => {
                            const feedbackIconInfo = getFeedbackIcon(feedback.feedback);
                            const IconComponent = feedbackIconInfo.icon;

                            return (
                                <div
                                    key={feedback._id}
                                    className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow`}
                                >
                                    <div className="p-6">
                                        {/* Class Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img
                                                        src={feedback.class_imgUrl}
                                                        alt={feedback.class_name}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {feedback.class_name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            ${feedback.price} • Seats: {feedback.available_seats}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`flex items-center gap-2 px-3 py-1 rounded-full ${feedbackIconInfo.bg}`}
                                            >
                                                <IconComponent
                                                    size={16}
                                                    className={feedbackIconInfo.color}
                                                />
                                                <span
                                                    className={`text-xs font-semibold ${feedbackIconInfo.color}`}
                                                >
                                                    {feedback.status === "approved"
                                                        ? "Approved"
                                                        : feedback.status === "pending"
                                                            ? "Pending"
                                                            : "Denied"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Feedback Box */}
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                                Admin Feedback:
                                            </p>
                                            <p className="text-gray-700 leading-relaxed">
                                                {feedback.feedback}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                            <span>Status: {feedback.status}</span>
                                            <span>Enrolled: {feedback.enrolled_students || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <MdFeedback size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg font-medium">
                                {searchTerm
                                    ? "No feedback matches your search"
                                    : feedbackList.length === 0 && filterType !== "all"
                                        ? "No feedback found for this filter"
                                        : "No feedback yet. Keep up the good work!"}
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                                {getTotalClasses() === 0
                                    ? "Add your first class to receive feedback from admins."
                                    : "Your classes are under review. Feedback will appear here once admins review them."}
                            </p>
                        </div>
                    )}
                </div>

                {/* Info Box */}
                {feedbackList.length > 0 && (
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            <strong>ℹ️ Note:</strong> This page shows feedback from admins on
                            your classes. Review the feedback carefully to improve your class
                            quality and content. Classes marked as "Denied" may be resubmitted
                            after making improvements.
                        </p>
                    </div>
                )}
            </Container>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default InstructorFeedback;