import React from 'react'
import { NewsSidebar } from './NewsSidebar';
import { FaArrowRight, FaCalendar, FaClock, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const NewsMainContent = ({ filteredNews, regularNews, categoryIcons , trendingNews}) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main News Column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-gray-950 via-slate-500 to-pink-900  rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-800">Top Stories</h2>
          </div>

          {filteredNews.length > 0 ? (
            <div className="space-y-8">
              {regularNews.map((article, index) => (
                <article
                  key={article.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group ${
                    index === 0 ? 'lg:col-span-2' : ''
                  }`}>
                  <div
                    className={`grid ${
                      index === 0 ? 'md:grid-cols-2' : 'md:grid-cols-5'
                    } gap-0`}>
                    <div
                      className={`relative ${
                        index === 0 ? 'h-80 md:h-auto' : 'h-48 md:col-span-2'
                      } overflow-hidden`}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                          {categoryIcons[article.category]}
                          {article.category}
                        </span>
                      </div>
                      {article.trending && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <FaFire /> Trending
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className={`p-6 ${
                        index === 0 ? '' : 'md:col-span-3'
                      } flex flex-col justify-center`}>
                      <h3
                        className={`${
                          index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                        } font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-2`}>
                        {article.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-red-600" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="text-red-600" />
                          {article.readTime}
                        </span>
                      </div>

                      <Link
                        to={`/news/${article.id}`}
                        state={{ article }}
                        className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-4 transition-all duration-300 group/btn">
                        Read Full Story
                        <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No News Found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <NewsSidebar trendingNews={trendingNews} />
      </div>
    </div>
  );
};
