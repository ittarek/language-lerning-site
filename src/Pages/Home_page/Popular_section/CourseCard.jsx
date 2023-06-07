import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaRegBookmark,
  FaRegStar,
  FaShare,
  FaShareAlt,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import Rating from "react-rating";
const CourseCard = ({ item }) => {
  const { imgUrl, title, lesson, students, rating } = item;
  const [ratings, setRatings] = useState(rating);
  return (
    <div className="single__course__item card w-96 bg-base-100 shadow-xl mx-auto gap-5 mb-5">
      <div className="course__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="course__details">
        <h6 className="course__title mb-4">{title}</h6>

        <div className=" flex justify-between items-center">
          <p className="lesson flex items-center gap-1">
            <i class="ri-book-open-line"></i> {lesson} Lessons
          </p>

          <p className="students flex items-center gap-1">
            <i class="ri-user-line"></i> {students}K
          </p>
        </div>

        <div className=" flex justify-between items-center">
          <p className="rating flex items-center gap-1">
            {" "}
            <Rating
              placeholderRating={rating}
              readonly
              emptySymbol={<FaRegStar></FaRegStar>}
              placeholderSymbol={<FaStar className="text-orange-400"></FaStar>}
              fullSymbol={<FaStar></FaStar>}

            ></Rating>
            {rating}K
          </p>{" "}
          <p className="enroll flex items-center gap-1 my-auto">
            <Link to=""> Enroll Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
