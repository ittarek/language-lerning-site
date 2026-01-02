import React from 'react';
import {
    FaUsers,
    FaChalkboardTeacher,
    FaDollarSign,
    FaStar,
    FaClock,
    FaCalendarAlt,
    FaChartLine,
    FaUserGraduate,
    FaVideo,
    FaFileAlt,
    FaBell,
    FaArrowRight,
    FaEye,
    FaEdit,
    FaComment
} from "react-icons/fa";
import { Link } from "react-router-dom";

const InstructorHome = () => {
    // Mock data - replace with real data from your API/context
    const instructorData = {
        name: "Dr. Sarah Johnson",
        totalStudents: 247,
        activeCourses: 8,
        totalEarnings: 12450,
        averageRating: 4.8,
        totalReviews: 156
    };

    const activeCourses = [
        {
            id: 1,
            title: "Advanced Spanish Conversation",
            students: 45,
            rating: 4.9,
            nextClass: "Today, 3:00 PM",
            revenue: 2340,
            image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400"
        },
        {
            id: 2,
            title: "Business English Writing",
            students: 32,
            rating: 4.7,
            nextClass: "Tomorrow, 10:00 AM",
            revenue: 1890,
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400"
        },
        {
            id: 3,
            title: "French Grammar Essentials",
            students: 28,
            rating: 4.8,
            nextClass: "Friday, 2:00 PM",
            revenue: 1650,
            image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400"
        }
    ];

    const upcomingClasses = [
        {
            id: 1,
            course: "Advanced Spanish Conversation",
            time: "3:00 PM - 4:30 PM",
            students: 18,
            type: "Live Session",
            platform: "Zoom"
        },
        {
            id: 2,
            course: "Business English Writing",
            time: "Tomorrow, 10:00 AM",
            students: 12,
            type: "Workshop",
            platform: "Google Meet"
        }
    ];

    const recentActivity = [
        { id: 1, type: "review", student: "John Doe", action: "left a 5-star review", course: "Spanish Conversation", time: "2 hours ago" },
        { id: 2, type: "enrollment", student: "Sarah Smith", action: "enrolled in", course: "Business English", time: "5 hours ago" },
        { id: 3, type: "question", student: "Mike Johnson", action: "asked a question in", course: "French Grammar", time: "1 day ago" }
    ];

    const pendingTasks = [
        { id: 1, task: "Grade 15 assignments", course: "Spanish Conversation", priority: "high" },
        { id: 2, task: "Review student questions", course: "Business English", priority: "medium" },
        { id: 3, task: "Update course materials", course: "French Grammar", priority: "low" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Welcome back, {instructorData.name}! 👨‍🏫
                    </h1>
                    <p className="text-gray-600">Here's what's happening with your courses today</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Students */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <FaUsers className="text-2xl text-blue-600" />
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{instructorData.totalStudents}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium">Total Students</h3>
                        <p className="text-sm text-green-600 mt-2">+12 this week</p>
                    </div>

                    {/* Active Courses */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 p-3 rounded-xl">
                                <FaChalkboardTeacher className="text-2xl text-purple-600" />
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{instructorData.activeCourses}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium">Active Courses</h3>
                        <p className="text-sm text-blue-600 mt-2">2 pending approval</p>
                    </div>

                    {/* Total Earnings */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 p-3 rounded-xl">
                                <FaDollarSign className="text-2xl text-green-600" />
                            </div>
                            <span className="text-3xl font-bold text-gray-800">${instructorData.totalEarnings}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium">Total Earnings</h3>
                        <p className="text-sm text-green-600 mt-2">+$850 this month</p>
                    </div>

                    {/* Average Rating */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-yellow-100 p-3 rounded-xl">
                                <FaStar className="text-2xl text-yellow-600" />
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{instructorData.averageRating}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium">Average Rating</h3>
                        <p className="text-sm text-gray-600 mt-2">{instructorData.totalReviews} reviews</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Active Courses Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <FaChalkboardTeacher className="text-purple-600" />
                                    Your Active Courses
                                </h2>
                                <Link to="/instructor/courses" className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2">
                                    Manage All <FaArrowRight />
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {activeCourses.map((course) => (
                                    <div key={course.id} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 hover:shadow-md transition-all duration-300 border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-24 h-24 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 mb-2">{course.title}</h3>

                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                    <span className="flex items-center gap-1">
                                                        <FaUsers className="text-blue-600" />
                                                        {course.students} students
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaStar className="text-yellow-500" />
                                                        {course.rating}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaDollarSign className="text-green-600" />
                                                        ${course.revenue}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-purple-600 flex items-center gap-1">
                                                    <FaClock />
                                                    Next class: {course.nextClass}
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    to={`/instructor/course/${course.id}`}
                                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 text-center flex items-center gap-2"
                                                >
                                                    <FaEye /> View
                                                </Link>
                                                <Link
                                                    to={`/instructor/course/${course.id}/edit`}
                                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-300 text-center flex items-center gap-2"
                                                >
                                                    <FaEdit /> Edit
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Classes */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaCalendarAlt className="text-blue-600" />
                                Upcoming Classes
                            </h2>

                            <div className="space-y-4">
                                {upcomingClasses.map((classItem) => (
                                    <div key={classItem.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 mb-2">{classItem.course}</h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <FaClock className="text-blue-600" />
                                                        {classItem.time}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaUserGraduate className="text-purple-600" />
                                                        {classItem.students} students
                                                    </span>
                                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                                        {classItem.type}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs">
                                                        <FaVideo className="text-green-600" />
                                                        {classItem.platform}
                                                    </span>
                                                </div>
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2">
                                                <FaVideo /> Start Class
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaBell className="text-orange-500" />
                                Recent Activity
                            </h2>

                            <div className="space-y-3">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                        <div className={`p-2 rounded-lg ${activity.type === 'review' ? 'bg-yellow-100' :
                                                activity.type === 'enrollment' ? 'bg-green-100' : 'bg-blue-100'
                                            }`}>
                                            {activity.type === 'review' ? <FaStar className="text-yellow-600" /> :
                                                activity.type === 'enrollment' ? <FaUserGraduate className="text-green-600" /> :
                                                    <FaComment className="text-blue-600" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800">
                                                <span className="font-semibold">{activity.student}</span> {activity.action} <span className="font-semibold">{activity.course}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="space-y-8">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <Link to="/instructor/course/create" className="block bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-xl transition-all duration-300 text-center font-medium">
                                    + Create New Course
                                </Link>
                                <Link to="/instructor/schedule" className="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl transition-all duration-300 text-center font-medium">
                                    View Schedule
                                </Link>
                                <Link to="/instructor/students" className="block bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white p-4 rounded-xl transition-all duration-300 text-center font-medium">
                                    Manage Students
                                </Link>
                            </div>
                        </div>

                        {/* Pending Tasks */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FaFileAlt className="text-orange-500" />
                                Pending Tasks
                            </h2>
                            <div className="space-y-3">
                                {pendingTasks.map((task) => (
                                    <div key={task.id} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-800 text-sm">{task.task}</h3>
                                                <p className="text-xs text-gray-600 mt-1">{task.course}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Performance Stats */}
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <FaChartLine />
                                This Month
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm opacity-90 mb-1">New Students</p>
                                    <p className="text-3xl font-bold">+24</p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-90 mb-1">Course Completions</p>
                                    <p className="text-3xl font-bold">18</p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-90 mb-1">Revenue Growth</p>
                                    <p className="text-3xl font-bold">+15%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorHome;