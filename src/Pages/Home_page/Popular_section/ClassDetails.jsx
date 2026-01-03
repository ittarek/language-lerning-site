

import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import {
    FaBook,
    FaChartLine,
    FaStar,
    FaDollarSign,
    FaLanguage,
    FaClock,
    FaGraduationCap,
    FaArrowLeft,
    FaCheckCircle,
    FaPlayCircle,
    FaCalendar,
    FaUsers,
    FaTrophy,
    FaDownload,
    FaVideo,
    FaHeart,
    FaShare,
    FaBullseye,
    FaChevronDown,
    FaChevronUp,
    FaLightbulb,
    FaAward,
} from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Container from "../../../Components/Container";

const ClassDetails = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [expandedModules, setExpandedModules] = useState([]);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    // Fetch class details
    const { data: classData, isLoading: isFetchLoading, error } = useQuery({
        queryKey: ["classDetails", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/AllClasses`);
            return res.data?.find((cls) => cls._id === id);
        },
    });

    if (isFetchLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <FaBook className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 text-2xl" />
                </div>
                <p className="mt-4 text-gray-600 font-medium">Loading course details...</p>
            </div>
        );
    }

    if (error || !classData) {
        return (
            <Container>
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="bg-red-100 rounded-full p-6 mb-4">
                        <FaBook className="text-red-600 text-5xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
                    <p className="text-gray-600 mb-6">The course you're looking for doesn't exist</p>
                    <button
                        onClick={() => navigate("/classes")}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        Browse All Courses
                    </button>
                </div>
            </Container>
        );
    }

    const {
        _id,
        class_name,
        class_description,
        class_subtitle,
        class_imgUrl,
        cover_image,
        video_preview,
        instructor_name,
        instructor_email,
        instructor_img,
        instructor_bio,
        instructor_rating,
        instructor_total_students,
        price,
        original_price,
        discount_percentage,
        currency,
        category,
        language,
        target_audience,
        lesson,
        lessons,
        total_hours,
        duration_weeks,
        modules,
        curriculum,
        schedule,
        delivery_mode,
        level,
        recommended_age,
        rating,
        total_reviews,
        rating_breakdown,
        reviews,
        enrolled_students,
        available_seats,
        total_seats,
        status,
        what_you_will_learn,
        skills_gained,
        materials_included,
        requirements,
        certificate,
        features,
        tags,
    } = classData;

    const totalSeatsCalc = total_seats || available_seats + enrolled_students;
    const availabilityPercentage = Math.round(
        ((totalSeatsCalc - available_seats) / totalSeatsCalc) * 100
    );

    const toggleModule = (idx) => {
        setExpandedModules(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: class_name,
                text: class_description,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            Swal.fire({
                icon: "success",
                title: "Link Copied!",
                text: "Course link copied to clipboard",
                timer: 2000,
                showConfirmButton: false
            });
        }
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        Swal.fire({
            icon: "success",
            title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
            timer: 1500,
            showConfirmButton: false
        });
    };

    const handleEnroll = async () => {
        if (!user || !user.email) {
            Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please login to enroll in this class",
                confirmButtonColor: "#4f46e5",
                confirmButtonText: "Go to Login",
                showCancelButton: true,
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
            return;
        }

        if (available_seats <= 0) {
            Swal.fire({
                icon: "error",
                title: "Class Full",
                text: "Sorry, this class has no available seats",
                confirmButtonColor: "#4f46e5"
            });
            return;
        }

        setIsLoading(true);

        try {
            const selectedClass = {
                _id,
                classId: _id,
                class_name,
                class_imgUrl,
                instructor_name,
                instructor_email,
                price,
                category,
                lesson: lessons || lesson,
                rating,
                enrolled_students,
                available_seats,
                studentEmail: user.email,
                studentName: user.displayName || "Anonymous",
                selectedAt: new Date(),
            };

            const res = await axiosSecure.post("/selectedClass", selectedClass);

            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Class Selected Successfully!",
                    html: `
                        <p class="text-gray-600 mb-4">
                            <strong>${class_name}</strong> has been added to your selection.
                        </p>
                        <p class="text-sm text-gray-500">
                            Complete your payment in the dashboard to secure your spot.
                        </p>
                    `,
                    showCancelButton: true,
                    confirmButtonColor: "#4f46e5",
                    cancelButtonColor: "#6b7280",
                    confirmButtonText: "Go to Dashboard",
                    cancelButtonText: "Continue Browsing"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/dashboard/mySelectedClasses");
                    }
                });
            }
        } catch (error) {
            const status = error.response?.status;
            const errorData = error.response?.data;

            if (status === 409) {
                Swal.fire({
                    icon: "info",
                    title: "Already Selected",
                    html: `
                        <p class="text-gray-600 mb-4">You have already selected this class!</p>
                        <p class="text-sm text-gray-500">Check your dashboard to complete the payment.</p>
                    `,
                    confirmButtonColor: "#4f46e5",
                    confirmButtonText: "Go to Dashboard",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) navigate("/dashboard/mySelectedClasses");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Enrollment Failed",
                    text: errorData?.message || "Please try again later",
                    confirmButtonColor: "#4f46e5"
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{class_name} | Language Learner</title>
            </Helmet>

            {/* Hero Section with Video Preview */}
            <div className="relative h-[500px] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={cover_image || class_imgUrl}
                        alt={class_name}
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <Container className="relative h-full flex flex-col justify-end pb-12">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-8 left-4 flex items-center gap-2 text-white hover:text-indigo-300 font-semibold transition bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                    {/* Action Buttons */}
                    <div className="absolute top-8 right-4 flex gap-3">
                        <button
                            onClick={handleWishlist}
                            className="bg-black/30 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-black/50 transition"
                        >
                            <FaHeart className={isWishlisted ? "text-red-500" : ""} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="bg-black/30 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-black/50 transition"
                        >
                            <FaShare />
                        </button>
                    </div>

                    {/* Title and Info */}
                    <div className="text-white space-y-4">
                        {/* Category Badge */}
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 bg-indigo-500 rounded-full text-sm font-semibold">
                                {category}
                            </span>
                            {level && (
                                <span className="px-4 py-1.5 bg-purple-500 rounded-full text-sm font-semibold capitalize">
                                    {level}
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl font-bold max-w-4xl leading-tight">
                            {class_name}
                        </h1>

                        {class_subtitle && (
                            <p className="text-xl text-gray-200 max-w-3xl">{class_subtitle}</p>
                        )}

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-lg">
                            <div className="flex items-center gap-2">
                                <FaLanguage className="text-indigo-400" />
                                <span>{language || category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaChartLine className="text-green-400" />
                                <span>{enrolled_students} Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaStar className="text-yellow-400" />
                                <span>{rating?.toFixed(1)} ({total_reviews} reviews)</span>
                            </div>
                            {video_preview && (
                                <a
                                    href={video_preview}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition"
                                >
                                    <FaVideo />
                                    Watch Preview
                                </a>
                            )}
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tabs Navigation */}
                        <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2 overflow-x-auto">
                            {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 rounded-xl font-semibold capitalize whitespace-nowrap transition-all duration-300 ${activeTab === tab
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                            <div className="space-y-8">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300 shadow-lg">
                                        <FaBook className="text-3xl mx-auto mb-2 opacity-80" />
                                        <p className="text-3xl font-bold">{lessons || lesson}</p>
                                        <p className="text-sm opacity-90">Lessons</p>
                                    </div>
                                    {total_hours && (
                                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300 shadow-lg">
                                            <FaClock className="text-3xl mx-auto mb-2 opacity-80" />
                                            <p className="text-3xl font-bold">{total_hours}h</p>
                                            <p className="text-sm opacity-90">Duration</p>
                                        </div>
                                    )}
                                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300 shadow-lg">
                                        <FaUsers className="text-3xl mx-auto mb-2 opacity-80" />
                                        <p className="text-3xl font-bold">{enrolled_students}</p>
                                        <p className="text-sm opacity-90">Students</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300 shadow-lg">
                                        <FaStar className="text-3xl mx-auto mb-2 opacity-80" />
                                        <p className="text-3xl font-bold">{rating?.toFixed(1)}</p>
                                        <p className="text-sm opacity-90">Rating</p>
                                    </div>
                                </div>

                                {/* Description */}
                                {class_description && (
                                    <div className="bg-white rounded-2xl shadow-lg p-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                            <FaLightbulb className="text-yellow-500" />
                                            About This Course
                                        </h2>
                                        <p className="text-gray-700 text-lg leading-relaxed">{class_description}</p>
                                        {tags && tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-6">
                                                {tags.map((tag, idx) => (
                                                    <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-semibold hover:bg-indigo-100 transition cursor-pointer">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* What You'll Learn */}
                                {what_you_will_learn && what_you_will_learn.length > 0 && (
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border-2 border-green-200">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                            <FaBullseye className="text-green-600" />
                                            What You'll Learn
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {what_you_will_learn.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-4 hover:shadow-md transition">
                                                    <FaCheckCircle className="text-green-600 text-xl mt-1 flex-shrink-0" />
                                                    <span className="text-gray-700 font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Skills Gained */}
                                {skills_gained && skills_gained.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-lg p-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                            <FaAward className="text-purple-600" />
                                            Skills You'll Gain
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {skills_gained.map((skill, idx) => (
                                                <span key={idx} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition cursor-pointer">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Requirements */}
                                {requirements && requirements.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-lg p-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Requirements</h2>
                                        <ul className="space-y-3">
                                            {requirements.map((req, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-lg">
                                                    <span className="text-indigo-600 font-bold text-xl">•</span>
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Curriculum Tab */}
                        {activeTab === "curriculum" && (
                            <div className="space-y-6">
                                {modules && modules.length > 0 ? (
                                    modules.map((module, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-indigo-300 transition">
                                            <button
                                                onClick={() => toggleModule(idx)}
                                                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
                                            >
                                                <div className="flex items-center gap-4 text-left">
                                                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-indigo-600 font-bold text-lg">{module.module_number}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 text-lg">{module.module_name}</h3>
                                                        <p className="text-sm text-gray-600">{module.lessons} lessons • {module.duration}</p>
                                                    </div>
                                                </div>
                                                {expandedModules.includes(idx) ? (
                                                    <FaChevronUp className="text-gray-400" />
                                                ) : (
                                                    <FaChevronDown className="text-gray-400" />
                                                )}
                                            </button>
                                            {expandedModules.includes(idx) && module.topics && (
                                                <div className="px-6 pb-6 bg-gray-50 border-t">
                                                    <ul className="space-y-2 mt-4">
                                                        {module.topics.map((topic, topicIdx) => (
                                                            <li key={topicIdx} className="flex items-center gap-3 text-gray-700">
                                                                <FaPlayCircle className="text-indigo-600" />
                                                                {topic}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : curriculum && curriculum.length > 0 ? (
                                    <div className="bg-white rounded-2xl shadow-lg p-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Topics</h2>
                                        <ul className="space-y-3">
                                            {curriculum.map((topic, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-gray-700 p-3 hover:bg-gray-50 rounded-lg transition">
                                                    <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold">
                                                        {idx + 1}
                                                    </span>
                                                    {topic}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-2xl p-12 text-center">
                                        <FaBook className="text-gray-300 text-5xl mx-auto mb-4" />
                                        <p className="text-gray-500">Curriculum details coming soon</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Instructor Tab */}
                        {activeTab === "instructor" && (
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={instructor_img}
                                            alt={instructor_name}
                                            className="w-40 h-40 rounded-2xl object-cover border-4 border-indigo-600 shadow-xl"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{instructor_name}</h2>
                                        <p className="text-indigo-600 mb-4">{instructor_email}</p>
                                        {instructor_bio && (
                                            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{instructor_bio}</p>
                                        )}
                                        <div className="grid grid-cols-2 gap-4">
                                            {instructor_rating && (
                                                <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <FaStar className="text-yellow-500 text-xl" />
                                                        <span className="text-2xl font-bold text-gray-900">{instructor_rating}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">Instructor Rating</p>
                                                </div>
                                            )}
                                            {instructor_total_students && (
                                                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <FaUsers className="text-blue-600 text-xl" />
                                                        <span className="text-2xl font-bold text-gray-900">{instructor_total_students}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">Total Students</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === "reviews" && (
                            <div className="space-y-6">
                                {/* Rating Summary */}
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="text-center">
                                            <p className="text-6xl font-bold text-gray-900 mb-2">{rating?.toFixed(1)}</p>
                                            <StarRatings
                                                rating={rating}
                                                starRatedColor="gold"
                                                starDimension="28px"
                                                starSpacing="4px"
                                                numberOfStars={5}
                                                name="overall-rating"
                                            />
                                            <p className="text-gray-600 mt-2">{total_reviews} reviews</p>
                                        </div>
                                        {rating_breakdown && (
                                            <div className="space-y-2">
                                                {Object.entries(rating_breakdown).reverse().map(([key, value]) => {
                                                    const starNum = key.split('_')[0];
                                                    const percentage = total_reviews ? Math.round((value / total_reviews) * 100) : 0;
                                                    return (
                                                        <div key={key} className="flex items-center gap-3">
                                                            <span className="text-sm text-gray-600 w-16">{starNum} ⭐</span>
                                                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                                <div
                                                                    className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                                                                    style={{ width: `${percentage}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-sm font-semibold text-gray-700 w-12">{value}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Individual Reviews */}
                                {reviews && reviews.length > 0 ? (
                                    reviews.map((review, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                                    {review.user_name.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="font-semibold text-gray-900 text-lg">{review.user_name}</h4>
                                                        {review.verified_purchase && (
                                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                                                                ✓ Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                    <StarRatings
                                                        rating={review.rating}
                                                        starRatedColor="gold"
                                                        starDimension="16px"
                                                        starSpacing="2px"
                                                        numberOfStars={5}
                                                        name={`review-${idx}`}
                                                    />
                                                    <p className="text-gray-700 mt-3 leading-relaxed">{review.comment}</p>
                                                    <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-gray-50 rounded-2xl p-12 text-center">
                                        <FaStar className="text-gray-300 text-5xl mx-auto mb-4" />
                                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Pricing Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white space-y-6">
                            {/* Price Section */}
                            <div className="border-b border-white/20 pb-6">
                                <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide">Course Price</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-5xl font-bold">${price}</span>
                                    <span className="text-indigo-200">/{currency || 'USD'}</span>
                                </div>
                                {original_price && original_price > price && (
                                    <div className="mt-3 flex items-center gap-3">
                                        <span className="text-indigo-200 line-through text-xl">${original_price}</span>
                                        {discount_percentage && (
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold animate-pulse">
                                                Save {Math.round(discount_percentage)}%
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Course Features */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">This course includes:</h3>

                                <div className="flex items-center gap-3">
                                    <FaPlayCircle className="text-indigo-200 text-xl flex-shrink-0" />
                                    <span>{lessons || lesson} Interactive Lessons</span>
                                </div>

                                {total_hours && (
                                    <div className="flex items-center gap-3">
                                        <FaClock className="text-indigo-200 text-xl flex-shrink-0" />
                                        <span>{total_hours} Hours of Content</span>
                                    </div>
                                )}

                                {delivery_mode && (
                                    <div className="flex items-center gap-3">
                                        <FaVideo className="text-indigo-200 text-xl flex-shrink-0" />
                                        <span className="capitalize">{delivery_mode} Classes</span>
                                    </div>
                                )}

                                {certificate?.available && (
                                    <div className="flex items-center gap-3">
                                        <FaTrophy className="text-indigo-200 text-xl flex-shrink-0" />
                                        <span>Certificate of Completion</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <FaDownload className="text-indigo-200 text-xl flex-shrink-0" />
                                    <span>Downloadable Resources</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaUsers className="text-indigo-200 text-xl flex-shrink-0" />
                                    <span>Community Access</span>
                                </div>
                            </div>

                            {/* Enrollment Status */}
                            <div className="border-t border-b border-white/20 py-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-indigo-200">Enrollment Status</span>
                                        <span className="font-bold">{availabilityPercentage}% Full</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${availabilityPercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-indigo-200">
                                        <span className="font-semibold text-white">{available_seats}</span> seats remaining
                                    </p>
                                </div>
                            </div>

                            {/* Enroll Button */}
                            <button
                                onClick={handleEnroll}
                                disabled={isLoading || available_seats === 0 || status !== "approved"}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${isLoading
                                    ? "bg-gray-400 cursor-wait"
                                    : available_seats === 0 || status !== "approved"
                                        ? "bg-gray-400 cursor-not-allowed opacity-50"
                                        : "bg-white text-indigo-600 hover:bg-indigo-50 hover:shadow-2xl hover:scale-105 active:scale-95"
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FaGraduationCap className="text-xl" />
                                        {available_seats === 0
                                            ? "Class Full"
                                            : status !== "approved"
                                                ? "Pending Approval"
                                                : "Enroll Now"}
                                    </>
                                )}
                            </button>

                            {/* Additional Info */}
                            <div className="text-center space-y-2">
                                {recommended_age && (
                                    <p className="text-sm text-indigo-200">
                                        Recommended age: <span className="font-semibold text-white">{recommended_age}</span>
                                    </p>
                                )}
                                <p className="text-xs text-indigo-200">
                                    30-day money-back guarantee
                                </p>
                            </div>

                            {/* Extra Features */}
                            {features && features.length > 0 && (
                                <div className="border-t border-white/20 pt-6">
                                    <h3 className="font-semibold mb-3">Also includes:</h3>
                                    <ul className="space-y-2 text-sm">
                                        {features.slice(0, 5).map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <FaCheckCircle className="text-green-400 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Schedule Card */}
                        {schedule && (
                            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FaCalendar className="text-indigo-600" />
                                    Class Schedule
                                </h3>
                                <div className="space-y-3 text-sm">
                                    {schedule.start_date && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Start Date:</span>
                                            <span className="font-semibold text-gray-900">{schedule.start_date}</span>
                                        </div>
                                    )}
                                    {schedule.end_date && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">End Date:</span>
                                            <span className="font-semibold text-gray-900">{schedule.end_date}</span>
                                        </div>
                                    )}
                                    {schedule.time_slot && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Time:</span>
                                            <span className="font-semibold text-gray-900">{schedule.time_slot}</span>
                                        </div>
                                    )}
                                    {schedule.days && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Days:</span>
                                            <span className="font-semibold text-gray-900">{schedule.days.join(", ")}</span>
                                        </div>
                                    )}
                                    {duration_weeks && (
                                        <div className="flex justify-between border-t pt-3">
                                            <span className="text-gray-600">Duration:</span>
                                            <span className="font-semibold text-gray-900">{duration_weeks} weeks</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Materials Card */}
                        {materials_included && materials_included.length > 0 && (
                            <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FaDownload className="text-purple-600" />
                                    Materials Included
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    {materials_included.map((material, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                                            <FaCheckCircle className="text-green-600 flex-shrink-0" />
                                            {material}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ClassDetails;