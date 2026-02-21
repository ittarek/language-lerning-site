import { useEffect, useState } from 'react';
import {
  FaBookmark,
  FaDollarSign,
  FaUser,
  FaChartLine,
  FaRegBookmark,
  FaClock,
  FaLanguage,
  FaGraduationCap,
  FaHeart,
} from 'react-icons/fa';
import OptimizedImage from '../../../Components/Shared/OptimizedImage';
import StarRatings from 'react-star-ratings';
import { ViewDetailsButton } from '../../../Components/ui/Button';

const ClassCard = ({ singleClass }) => {
  const {
    _id,
    class_imgUrl,
    class_name,
    lesson,
    instructor_name,
    instructor_email,
    instructor_img,
    available_seats,
    rating,
    price,
    enrolled_students,
    category,
    status,
    instructor_bg_img,
  } = singleClass;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('classData')) || [];
    setIsBookmarked(wishlist.includes(_id));
  }, [_id]);
  // handle bookmark for wishlist
  const handleWishlist = id => {
    const getWistList = JSON.parse(localStorage.getItem('classData')) || [];
    if (getWistList.includes(id)) {
      // remove from wishlist
      const updatedWishlist = getWistList.filter(items => items !== id);
      localStorage.setItem('classData', JSON.stringify(updatedWishlist));
      setIsBookmarked(false);
    } else {
      //  add to wishlist
      const updated = [...getWistList, id];
      localStorage.setItem('classData', JSON.stringify(updated));
      setIsBookmarked(true);
    }
  };
  // Calculate availability percentage
  const totalSeats = available_seats + enrolled_students;
  const availabilityPercentage = Math.round(
    ((totalSeats - available_seats) / totalSeats) * 100
  );

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-aos="fade-up"
      data-aos-duration="400">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        {/* Image */}
        <OptimizedImage
          src={class_imgUrl || 'https://via.placeholder.com/400x300'}
          alt={class_name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          aspectRatio="4/3"
          quality={75}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Top badges */}
        <div className="absolute top-2 left-4 right-4 flex justify-between items-start">
          <div>
            {/* Status Badge */}
            {status === 'approved' && (
              <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full font-semibold text-xs shadow-lg">
                ✓ Available
              </div>
            )}
            {category && (
              <div className="bg-white/90 backdrop-blur-sm text-indigo-600 px-3 py-1 mt-11 rounded-full font-semibold text-xs shadow-lg flex items-center gap-1 w-fit">
                <FaLanguage size={12} />
                {category}
              </div>
            )}
          </div>
          {/* Bookmark button */}
          <button
            onClick={() => handleWishlist(_id)}
            className={`shadow-lg  hover:scale-110  p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isBookmarked
                ? 'bg-red-500 text-white scale-110'
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}>
      
            <FaHeart className="w-5 h-5" />
          </button>{' '}
        </div>

        {/* Bottom instructor name */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl inline-flex items-center gap-2 shadow-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
              {instructor_img ? (
                <img
                  src={instructor_img}
                  alt={instructor_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-white text-xs" />
              )}
            </div>
            <span className="font-semibold text-gray-800 text-sm">{instructor_name}</span>{' '}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg flex items-center gap-1">
              <FaDollarSign className="text-sm" />
              {price}
            </div>
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
            <FaClock className="text-blue-600 text-lg mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-800">{lesson}</div>
            <div className="text-xs text-gray-600">Lessons</div>
          </div>

          {/* Students */}
          <div className="bg-green-50 rounded-xl p-3 text-center hover:bg-green-100 transition-colors">
            <FaChartLine className="text-green-600 text-lg mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-800">{enrolled_students}</div>
            <div className="text-xs text-gray-600">Enrolled</div>
          </div>

          {/* Available Seats */}
          <div className="bg-purple-50 rounded-xl p-3 text-center hover:bg-purple-100 transition-colors">
            <FaGraduationCap className="text-purple-600 text-lg mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-800">{available_seats}</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
        </div>

        {/* Availability Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Enrollment Rate</span>
            <span className="text-indigo-600 font-bold">{availabilityPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${availabilityPercentage}%` }}></div>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center justify-center gap-2 py-2">
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            starHoverColor="gold"
            starEmptyColor="gray"
            starDimension="20px"
            starSpacing="2px"
            numberOfStars={5}
            name="rating"
          />
          <span className="text-sm text-gray-600 font-medium">
            ({rating?.toFixed(1)})
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* View Details Button */}

        <ViewDetailsButton _id={_id} text="View Details" className="rounded-lg" />
      </div>

      {/* Hover effect border */}
      <div
        className={`absolute inset-0 border-2 border-indigo-500 rounded-2xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
    </div>
  );
};

export default ClassCard;
