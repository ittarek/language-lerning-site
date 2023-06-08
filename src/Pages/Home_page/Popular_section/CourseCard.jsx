import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaBookmark, FaRegStar, FaStar, FaUser } from "react-icons/fa";
import Rating from "react-rating";
import Container from "../../../Componets/Container";
import  './CoursesCard.css'
const CourseCard = ({ item }) => {
  const { imgUrl, title, lesson, students, rating } = item;
  const [ratings, setRatings] = useState(rating);
  return (
    <Container>
      <div className="single__classes__item card w-96 bg-base-100 shadow-xl mx-auto gap-5 mb-4">
        <div className="course__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="course__details">
          <h6 className="course__title mb-4">{title}</h6>

          <div className=" flex justify-between items-center">
            <p className="lesson flex items-center gap-1">
              <FaBook></FaBook> {lesson} Lessons
            </p>

            <p className="students flex items-center gap-1">
              <FaUser></FaUser> {students}K
            </p>
          </div>

          <div className=" flex justify-between items-center">
            <p className="rating flex items-center gap-1">
              {" "}
              <Rating
                placeholderRating={rating}
                readonly
                emptySymbol={<FaRegStar></FaRegStar>}
                placeholderSymbol={
                  <FaStar className="text-orange-400"></FaStar>
                }
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
    </Container>
  );
};

export default CourseCard;
