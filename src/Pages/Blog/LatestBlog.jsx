import { FaArrowRight, FaClock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const LatestBlog = ({ filteredPosts, regularPosts, categoryIcons }) => {
  const regularPosts = filteredPosts.filter(post => !post.featured);
  return (
    <div>
      {' '}
      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {regularPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
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
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <FaUser className="text-indigo-600" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-indigo-600" />
                    {post.readTime}
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
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Articles Found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
