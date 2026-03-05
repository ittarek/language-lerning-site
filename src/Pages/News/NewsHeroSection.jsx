import React from 'react'
import { FaFire, FaSearch } from 'react-icons/fa'

export const NewsHeroSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-purple-800 to-gray-900   py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaFire className="text-white text-3xl animate-pulse" />
            <span className="text-white text-xl font-bold">Latest News</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Language Learning News
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Stay updated with the latest trends, research, and innovations in language
            education
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-4 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
