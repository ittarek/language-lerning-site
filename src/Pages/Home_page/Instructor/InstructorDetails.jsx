import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import {
  FaArrowLeft,
  FaStar,
  FaUser,
  FaBook,
  FaGraduationCap,
  FaAward,
  FaBriefcase,
  FaClock,
  FaGlobe,
  FaCheckCircle,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChartLine,
  FaUsers,
  FaFire,
  FaLanguage,
} from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import Container from '../../../Components/Container';

const InstructorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  // Fetch instructor details (from classes collection)
  const {
    data: instructor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['instructorDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/AllClasses`);
      // Get first class from this instructor to get full details
      return res.data?.find(cls => cls._id === id);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !instructor) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-red-500 text-lg mb-4">Instructor not found</p>
          <button
            onClick={() => navigate('/instructors')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Back to Instructors
          </button>
        </div>
      </Container>
    );
  }

  const {
    instructor_name,
    instructor_email,
    instructor_phone,
    instructor_img,
    instructor_bg_img,
    instructor_bio,
    instructor_qualifications,
    years_of_experience,
    certifications,
    specializations,
    languages_spoken,
    rating,
    rating_count,
    enrolled_students,
    years_of_experience: totalStudents,
    reviews,
    teaching_methods,
    class_schedule,
    response_time_hours,
    office_hours,
    instructor_website,
    instructor_social_media,
    instructor_badges,
    success_rate,
    student_satisfaction,
    total_enrollments,
    completion_rate,
    instructor_id,
  } = instructor;

  return (
    <>
      <Helmet>
        <title>{instructor_name} | Language Learner</title>
      </Helmet>

      <Container>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-8 mt-8 transition">
          <FaArrowLeft />
          Back to Instructors
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {/* Left Column - Instructor Info */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-24">
              {/* Background Image */}
              <div
                className="h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${instructor_bg_img})`,
                }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
              </div>

              {/* Profile Content */}
              <div className="relative px-6 py-8 -mt-16">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={instructor_img}
                      alt={instructor_name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                    {instructor_badges?.length > 0 && (
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full p-2 shadow-lg">
                        <FaFire className="text-xl" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Name and Title */}
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                  {instructor_name}
                </h1>
                <p className="text-center text-indigo-600 font-semibold mb-4">
                  Language Expert
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{rating}</span>
                  <span className="text-gray-600 text-sm">({rating_count} reviews)</span>
                </div>

                {/* Quick Stats */}
                <div className="space-y-3 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaUsers className="text-blue-600" />
                      Students
                    </span>
                    <span className="font-bold text-gray-900">
                      {enrolled_students || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaBook className="text-green-600" />
                      Enrollments
                    </span>
                    <span className="font-bold text-gray-900">
                      {total_enrollments || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaChartLine className="text-purple-600" />
                      Experience
                    </span>
                    <span className="font-bold text-gray-900">
                      {years_of_experience}+ years
                    </span>
                  </div>
                </div>

                {/* Badges */}
                {instructor_badges?.length > 0 && (
                  <div className="space-y-2 pb-6 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-700">Badges</p>
                    <div className="space-y-2">
                      {instructor_badges.map((badge, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700 bg-indigo-50 p-2 rounded-lg">
                          <FaAward className="text-indigo-600" />
                          {badge}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="space-y-3">
                  {instructor_email && (
                    <a
                      href={`mailto:${instructor_email}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-indigo-50">
                      <FaEnvelope className="text-indigo-600" />
                      <span className="text-sm truncate">{instructor_email}</span>
                    </a>
                  )}
                  {instructor_phone && (
                    <a
                      href={`tel:${instructor_phone}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-indigo-50">
                      <FaPhone className="text-indigo-600" />
                      <span className="text-sm">{instructor_phone}</span>
                    </a>
                  )}
                </div>

                {/* Social Media */}
                {instructor_social_media && (
                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 justify-center">
                    {instructor_social_media.linkedin && (
                      <a
                        href={instructor_social_media.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-xl transition hover:scale-110">
                        <FaLinkedin />
                      </a>
                    )}
                    {instructor_social_media.twitter && (
                      <a
                        href={`https://twitter.com/${instructor_social_media.twitter.replace(
                          '@',
                          ''
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500 text-xl transition hover:scale-110">
                        <FaTwitter />
                      </a>
                    )}
                    {instructor_social_media.instagram && (
                      <a
                        href={`https://instagram.com/${instructor_social_media.instagram.replace(
                          '@',
                          ''
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700 text-xl transition hover:scale-110">
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {instructor_bio ||
                  'Experienced language instructor dedicated to helping students achieve their learning goals.'}
              </p>
            </div>

            {/* Experience & Qualifications */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Qualifications & Experience
              </h2>

              {/* Years of Experience */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaBriefcase className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Experience</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {years_of_experience}+ Years
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              {certifications?.length > 0 && (
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaAward className="text-yellow-600" />
                    Certifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <FaCheckCircle className="text-yellow-600" />
                        <span className="text-gray-900 font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Qualifications */}
              {instructor_qualifications?.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaGraduationCap className="text-indigo-600" />
                    Education
                  </h3>
                  <div className="space-y-4">
                    {instructor_qualifications.map((qual, idx) => (
                      <div key={idx} className="border-l-4 border-indigo-600 pl-4">
                        <h4 className="font-bold text-gray-900">{qual.title}</h4>
                        <p className="text-gray-600 text-sm">{qual.institution}</p>
                        <p className="text-gray-500 text-xs">
                          {qual.year} • {qual.field}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Specializations & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Specializations */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  Specializations
                </h3>
                <div className="space-y-2">
                  {specializations?.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-gray-700 p-2 bg-indigo-50 rounded-lg">
                      <FaCheckCircle className="text-indigo-600" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaLanguage className="text-green-600" />
                  Languages
                </h3>
                <div className="space-y-2">
                  {languages_spoken?.map((lang, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-gray-700 p-2 bg-green-50 rounded-lg">
                      <FaCheckCircle className="text-green-600" />
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <FaUsers className="text-3xl opacity-50" />
                </div>
                <p className="text-blue-100 text-sm font-medium">Success Rate</p>
                <p className="text-4xl font-bold mt-2">{success_rate || 89}%</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <FaChartLine className="text-3xl opacity-50" />
                </div>
                <p className="text-green-100 text-sm font-medium">Completion Rate</p>
                <p className="text-4xl font-bold mt-2">{completion_rate || 92}%</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <FaStar className="text-3xl opacity-50" />
                </div>
                <p className="text-purple-100 text-sm font-medium">
                  Student Satisfaction
                </p>
                <p className="text-4xl font-bold mt-2">{student_satisfaction || 4.8}/5</p>
              </div>
            </div>

            {/* Teaching Methods */}
            {teaching_methods?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Teaching Methods
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {teaching_methods.map((method, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                      <FaBook className="text-indigo-600 text-lg" />
                      <span className="text-gray-900 font-medium">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            {reviews?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">{review.student_name}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                      <p className="text-gray-500 text-xs mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default InstructorDetails;
