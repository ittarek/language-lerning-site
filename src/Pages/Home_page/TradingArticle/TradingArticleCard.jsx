import React, { useEffect, useState } from 'react';
import OptimizedImage from '../../../Components/Shared/OptimizedImage';
import { Link } from 'react-router-dom';
import { Tags } from './Tags';

export const TradingArticleCard = ({ article, index }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
  const { title, date, details, comments, views, img, category, tags, trending, slug } =
    article;
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.details,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: 'success',
        title: 'Link Copied!',
        text: 'Course link copied to clipboard',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };


  // page load হলে check করবে item আগেই wishlist এ আছে কিনা
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.some(i => i.id === article.id);
    setIsWishlisted(exists);
  }, [article.id]);
  const handleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const exists = wishlist.some(i => i.id === article.id);
    if (exists) {
      // remove
      wishlist = wishlist.filter(i => i.id !== article.id);
      setIsWishlisted(false);
    } else {
      // add
      wishlist.push(article);
      setIsWishlisted(true);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };
  return (
    <div
      key={index}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 hover:-translate-y-2">
      <div className="flex flex-col md:flex-row gap-0 md:gap-4">
        {/* Image Section */}
        <div className="relative w-full md:w-48 h-64 md:h-auto overflow-hidden md:rounded-l-2xl flex-shrink-0">
          <OptimizedImage
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            aspectRatio="1/1"
          />
          {/* Trending Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            {trending ? 'Trending' : 'Popular'}
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
            {category}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <span>{comments} Comments</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{views} views</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{details}</p>

          {/* Tags */}
          <Tags tags={tags} />

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Link to={`/trending-article/${slug}`} state={{ article }}>
              {' '}
              <button className="group/btn flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors">
                Read More
                <svg
                  className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>

            <div className="flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                className="p-4  hover:bg-gray-100 rounded-full transition-colors group/share cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover/share:text-red-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className="p-4 cursor-pointer hover:bg-gray-100 rounded-full transition-colors group/bookmark">
                <svg
                  className={`w-5 h-5 transition-colors  ${
                    isWishlisted ? 'text-red-600' : 'text-gray-400'
                  } group-hover/bookmark:text-red-600`}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Decoration */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};
