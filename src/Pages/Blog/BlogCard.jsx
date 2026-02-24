import { FaArrowRight, FaClock, FaHeart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { handleWishlist } from '../../utils/wishlist/wishlist';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

// ✅ আলাদা card component - প্রতিটার নিজস্ব isBookmarked state থাকবে
export const BlogCard = ({ post, categoryIcons }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('classData')) || {};
    const blogIds = wishlist.blogs || [];
    setIsBookmarked(new Set(blogIds).has(post.id));
  }, [post.id]); // ✅ এখন post.id ঠিকমতো কাজ করবে

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
          {categoryIcons[post.category]}
          {post.category}
        </span>
        <button
          onClick={() => handleWishlist(post.id, 'blogs', setIsBookmarked, user)}
          className={`absolute top-4 right-4 shadow-lg hover:scale-110 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isBookmarked
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}>
          <FaHeart className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4 pt-4 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <FaUser className="text-indigo-600" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-indigo-600" /> {post.readTime}
          </span>
        </div>
        <Link
          to={`/blog/${post.id}`}
          state={{ post }}
          className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-4 transition-all duration-300 group/btn">
          Read Full Article
          <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
