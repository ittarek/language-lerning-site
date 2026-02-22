import {
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaHeart,
  FaMapMarkerAlt,
  FaShareAlt,
  FaStar,
  FaUser,
  FaUsers,
} from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import { SocialButton, ViewDetailsButton } from '../../../Components/ui/Button';
import { handleWishlist } from '../../../utils/wishlist/wishlist';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

export const RenderCard = (
{item,
type,
FaExternalLinkAlt,}
) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const {user} = useContext(AuthContext)
  const {
    available_seats,
    class_imgUrl,
    class_name,
    created_at,
    description,
    enrolled_students,
    experience,
    instructor_description,
    instructor_designation,
    instructor_email,
    instructor_img,
    instructor_name,
    instructor_rating,
    instructor_students_count,
    price,
    status,
    updated_at,
    _id,
    contact,
    social_links,
  } = item;
  // wishlist
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('classData')) || [];
    const classId = wishlist.classes || [];
    const idSet = new Set(classId); // because we will store only IDs
    setIsBookmarked(idSet.has(_id));
  }, [_id]);

  return (
    <div
      key={_id}
      className="group relative bg-white h-[45vh] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <img
          src={class_imgUrl}
          alt={class_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <button
          onClick={() => handleWishlist(_id, type, setIsBookmarked, user)}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            isBookmarked
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}>
          <FaHeart className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {class_name || item.title}
        </h3>

        {type === 'classes' && (
          <div className="space-y-2">
            <p className="text-gray-600 flex items-center gap-2">
              <FaUser className="w-4 h-4" /> {instructor_name}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <FaClock className="w-4 h-4" /> 5 hours/week
              </span>
              <span className="text-sm font-semibold text-amber-500 flex items-center gap-1">
                <FaStar className="w-4 h-4" /> {instructor_rating}
              </span>
            </div>
          </div>
        )}

        {type === 'news' && (
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              {item.category}
            </span>
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4" /> {item.date}
            </p>
          </div>
        )}

        {type === 'blogs' && (
          <div className="space-y-2">
            <p className="text-gray-600 flex items-center gap-2">
              <FaUser className="w-4 h-4" /> {item.author}
            </p>
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <FaClock className="w-4 h-4" /> {item.readTime}
            </span>
          </div>
        )}

        {type === 'articles' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center gap-2">
                <FaEye className="w-4 h-4" /> {item.views} views
              </span>
              {item.trending && (
                <span className="flex items-center gap-1 text-orange-500 font-semibold">
                  <MdTrendingUp className="w-4 h-4" /> Trending
                </span>
              )}
            </div>
          </div>
        )}

        {type === 'events' && (
          <div className="space-y-2">
            <p className="text-gray-600 flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4" /> {item.location}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4" /> {item.date}
              </span>
              <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                <FaUsers className="w-4 h-4" /> {item.attendees}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2 absolute bottom-2 w-full left-0 px-3">
          <ViewDetailsButton text="View" icon={FaExternalLinkAlt} showIcon={true} />
          <SocialButton
            icon={<FaShareAlt className="w-5 h-5" />}
            className="p-2 border-2 border-gray-200 rounded-lg hover:border-blue-500"
            textColor="text-gray-600 hover:text-blue-500"
            bg="bg-transparent"
            hoverBg="hover:bg-blue-50"
          />
        </div>
      </div>
    </div>
  );
};
