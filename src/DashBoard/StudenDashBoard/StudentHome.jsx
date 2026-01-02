import React from "react";
import {
    FaBook,
    FaChalkboardTeacher,
    FaTrophy,
    FaClock,
    FaCalendarAlt,
    FaGraduationCap,
    FaStar,
    FaArrowRight,
    FaCheckCircle,
    FaChartLine
} from "react-icons/fa";
import { Link } from "react-router-dom";
import './StudentHome.css';

const StudentHome = () => {
    // Mock data - replace with real data from your API/context
    const studentData = {
        name: "John Doe",
        enrolledCourses: 5,
        completedLessons: 28,
        upcomingClasses: 3,
        achievements: 12
    };

    const recentCourses = [
        {
            id: 1,
            title: "Advanced Spanish Conversation",
            instructor: "Maria Garcia",
            progress: 75,
            nextClass: "Tomorrow, 10:00 AM",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400"
        },
        {
            id: 2,
            title: "Business English Writing",
            instructor: "James Smith",
            progress: 45,
            nextClass: "Today, 3:00 PM",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400"
        },
        {
            id: 3,
            title: "French for Beginners",
            instructor: "Sophie Laurent",
            progress: 90,
            nextClass: "Friday, 2:00 PM",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400"
        }
    ];

    const upcomingClasses = [
        {
            id: 1,
            course: "Business English",
            time: "3:00 PM",
            duration: "1 hour",
            instructor: "James Smith",
            type: "Live Session"
        },
        {
            id: 2,
            course: "Spanish Conversation",
            time: "Tomorrow, 10:00 AM",
            duration: "45 min",
            instructor: "Maria Garcia",
            type: "Group Class"
        }
    ];

    const recentAchievements = [
        { id: 1, title: "Week Streak", icon: "🔥", date: "Today" },
        { id: 2, title: "Course Completed", icon: "🎓", date: "2 days ago" },
        { id: 3, title: "Top Learner", icon: "⭐", date: "1 week ago" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Welcome back, {studentData.name}! 👋
                    </h1>
                    <p className="text-gray-600">Ready to continue your learning journey?</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stat Card 1 */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <FaBook className="text-2xl text-blue-600" />
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{studentData.enrolledCourses}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium">Enrolled Courses</h3>
                        <p className="text-sm text-green-600 mt-2">+2 this month</p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 p-3 rounded-xl">
                                <FaCheckCircle className="text-2xl text-purple-600" />
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{studentData.completedLessons}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium">Completed Lessons</h3>
                        <p className="text-sm text-green-600 mt-2">+5 this week</p>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-pink-100 p-3 rounded-xl">
                                <FaClock className="text-2xl text-pink-600" />
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{studentData.upcomingClasses}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium">Upcoming Classes</h3>
                        <p className="text-sm text-blue-600 mt-2">Next in 2 hours</p>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-yellow-100 p-3 rounded-xl">
                                <FaTrophy className="text-2xl text-yellow-600" />
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{studentData.achievements}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium">Achievements</h3>
                        <p className="text-sm text-green-600 mt-2">+3 this month</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Continue Learning Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <FaChartLine className="text-blue-600" />
                                    Continue Learning
                                </h2>
                                <Link to="/courses" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                                    View All <FaArrowRight />
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {recentCourses.map((course) => (
                                    <div key={course.id} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 hover:shadow-md transition-all duration-300 border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-20 h-20 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
                                                <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                                    <FaChalkboardTeacher />
                                                    {course.instructor}
                                                </p>

                                                {/* Progress Bar */}
                                                <div className="mb-2">
                                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                        <span>Progress</span>
                                                        <span>{course.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${course.progress}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                <p className="text-xs text-blue-600 flex items-center gap-1">
                                                    <FaClock />
                                                    Next class: {course.nextClass}
                                                </p>
                                            </div>

                                            <Link
                                                to={`/course/${course.id}`}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                                            >
                                                Continue
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Classes */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaCalendarAlt className="text-purple-600" />
                                Upcoming Classes
                            </h2>

                            <div className="space-y-4">
                                {upcomingClasses.map((classItem) => (
                                    <div key={classItem.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-800 mb-1">{classItem.course}</h3>
                                                <p className="text-sm text-gray-600 mb-2">with {classItem.instructor}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <FaClock className="text-blue-600" />
                                                        {classItem.time}
                                                    </span>
                                                    <span>• {classItem.duration}</span>
                                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                                        {classItem.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                                                Join
                                            </button>
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
                                <Link to="/courses" className="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl transition-all duration-300 text-center font-medium">
                                    Browse Courses
                                </Link>
                                <Link to="/schedule" className="block bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-xl transition-all duration-300 text-center font-medium">
                                    View Schedule
                                </Link>
                                <Link to="/assignments" className="block bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white p-4 rounded-xl transition-all duration-300 text-center font-medium">
                                    My Assignments
                                </Link>
                            </div>
                        </div>

                        {/* Recent Achievements */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FaTrophy className="text-yellow-500" />
                                Recent Achievements
                            </h2>
                            <div className="space-y-3">
                                {recentAchievements.map((achievement) => (
                                    <div key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{achievement.icon}</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                                                <p className="text-xs text-gray-600">{achievement.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Learning Streak */}
                        <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
                            <h2 className="text-xl font-bold mb-4">🔥 Learning Streak</h2>
                            <div className="text-center">
                                <p className="text-6xl font-bold mb-2">7</p>
                                <p className="text-lg opacity-90">Days in a row!</p>
                                <p className="text-sm opacity-75 mt-2">Keep it up! You're doing great!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;