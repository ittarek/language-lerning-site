// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//     FaBook,
//     FaBookmark,
//     FaDollarSign,
//     FaRegStar,
//     FaStar,
//     FaUser,
// } from "react-icons/fa";
// import Rating from "react-rating";
// import Container from "../../../Components/Container";
// import './classesCard.css'
// const ClassCard = ({ singleClass }) => {
//     const {
//         class_imgUrl,
//         class_name,
//         lesson,
//         instructor_name,
//         available_seats,
//         rating,
//         price,
//         enrolled_students,
//     } = singleClass;
//     const [ratings, setRatings] = useState(rating);
//     return (
//         <Container>
//             <div className="single__classes__item col-span-3  card w-96  bg-base-100 shadow-xl mx-auto gap-5 mb-4" data-aos="fade-down"
//                 data-aos-easing="linear"
//                 data-aos-duration="200">
//                 <div className="course__img">
//                     <img
//                         src={class_imgUrl ? class_imgUrl : "No Image"}
//                         alt=""
//                         className="w-100"
//                     />
//                 </div>

//                 <div className="course__details">
//                     <h6 className="course__title mb-4">{class_name}</h6>

//                     <div className=" flex justify-between items-center">
//                         <p className="lesson flex items-center gap-1">
//                             <FaBook></FaBook> {available_seats} Lessons
//                         </p>
//                         <p className="lesson flex items-center gap-1">
//                             <FaUser></FaUser> {enrolled_students} student
//                         </p>

//                         {/* <p className="students flex items-center gap-1">
//               <FaUser></FaUser> {students}K
//             </p> */}
//                         <p className="students flex items-center gap-1">
//                             <FaDollarSign></FaDollarSign> {price}K
//                         </p>
//                     </div>

//                     <div className=" flex justify-between items-center">
//                         <p className="rating flex items-center gap-1">
//                             {" "}
//                             <Rating
//                                 placeholderRating={rating}
//                                 readonly
//                                 emptySymbol={<FaRegStar></FaRegStar>}
//                                 placeholderSymbol={
//                                     <FaStar className="text-orange-400"></FaStar>
//                                 }
//                                 fullSymbol={<FaStar></FaStar>}
//                             ></Rating>
//                             {rating} K
//                         </p>{" "}
//                         <p className="enroll flex items-center gap-1 my-auto">
//                             <Link to=""> Enroll Now</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </Container>
//     );
// };

// export default ClassCard;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaBook,
    FaBookmark,
    FaDollarSign,
    FaRegStar,
    FaStar,
    FaUser,
    FaChartLine,
    FaRegBookmark,
} from "react-icons/fa";
import Rating from "react-rating";

const ClassCard = ({ singleClass }) => {
    const {
        class_imgUrl,
        class_name,
        lesson,
        instructor_name,
        available_seats,
        rating,
        price,
        enrolled_students,
    } = singleClass;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-aos="fade-up"
            data-aos-duration="400"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden h-56">
                {/* Image */}
                <img
                    src={class_imgUrl || "https://via.placeholder.com/400x300"}
                    alt={class_name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'
                        }`}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    {/* Price badge */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg flex items-center gap-1">
                        <FaDollarSign className="text-sm" />
                        {price}
                    </div>

                    {/* Bookmark button */}
                    <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                    >
                        {isBookmarked ? (
                            <FaBookmark className="text-indigo-600 text-lg" />
                        ) : (
                            <FaRegBookmark className="text-gray-600 text-lg" />
                        )}
                    </button>
                </div>

                {/* Bottom instructor name */}
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl inline-flex items-center gap-2 shadow-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <FaUser className="text-white text-xs" />
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">{instructor_name}</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-[3.5rem] group-hover:text-indigo-600 transition-colors">
                    {class_name}
                </h3>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    {/* Lessons */}
                    <div className="bg-blue-50 rounded-xl p-3 text-center hover:bg-blue-100 transition-colors">
                        <FaBook className="text-blue-600 text-lg mx-auto mb-1" />
                        <div className="text-lg font-bold text-gray-800">{available_seats}</div>
                        <div className="text-xs text-gray-600">Lessons</div>
                    </div>

                    {/* Students */}
                    <div className="bg-green-50 rounded-xl p-3 text-center hover:bg-green-100 transition-colors">
                        <FaChartLine className="text-green-600 text-lg mx-auto mb-1" />
                        <div className="text-lg font-bold text-gray-800">{enrolled_students}</div>
                        <div className="text-xs text-gray-600">Students</div>
                    </div>

                    {/* Rating */}
                    <div className="bg-yellow-50 rounded-xl p-3 text-center hover:bg-yellow-100 transition-colors">
                        <FaStar className="text-yellow-500 text-lg mx-auto mb-1" />
                        <div className="text-lg font-bold text-gray-800">{rating}</div>
                        <div className="text-xs text-gray-600">Rating</div>
                    </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center justify-center gap-2 py-2">
                    <Rating
                        placeholderRating={rating}
                        readonly
                        emptySymbol={<FaRegStar className="text-gray-300" />}
                        placeholderSymbol={<FaStar className="text-yellow-400" />}
                        fullSymbol={<FaStar className="text-yellow-400" />}
                    />
                    <span className="text-sm text-gray-600 font-medium">({rating})</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Enroll Button */}
                <Link to={`/class/${singleClass._id}`}>
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 group">
                        <span>Enroll Now</span>
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </Link>
            </div>

            {/* Hover effect border */}
            <div className={`absolute inset-0 border-2 border-indigo-500 rounded-2xl transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'
                }`}></div>
        </div>
    );
};

export default ClassCard;