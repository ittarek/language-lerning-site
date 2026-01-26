import React from 'react'

export const FeaturedBlogs = () => {
  return (
    <div className="mb-16 ">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
        <h2 className="text-3xl font-bold text-gray-800">Featured Article</h2>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <OptimizedImage
              src={featuredPost.image}
              alt={featuredPost.title}
              aspectRatio="4/3"
              className="w-full rounded-t-xl group-hover:scale-105 transition-transform"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                ⭐ Featured
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-4">
              {categoryIcons[featuredPost.category]}
              {featuredPost.category}
            </span>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors">
              {featuredPost.title}
            </h3>

            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {featuredPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-2">
                <FaUser className="text-indigo-600" />
                {featuredPost.author}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendar className="text-indigo-600" />
                {featuredPost.date}
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-indigo-600" />
                {featuredPost.readTime}
              </span>
            </div>

            <Link
              to={`/blog/${featuredPost.id}`}
              state={{ post: featuredPost }}
              className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 group-hover:gap-4 w-fit">
              Read More
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
