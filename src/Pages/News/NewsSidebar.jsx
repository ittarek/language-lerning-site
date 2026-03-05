import { SubmitButton } from '../../Components/ui/Button';
import { FaClock, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const NewsSidebar = () => {
  return (
    <div className="lg:col-span-1">
      {/* Trending Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-[22%]">
        <div className="flex items-center gap-2 mb-6">
          <FaFire className="text-red-600 text-xl" />
          <h3 className="text-2xl font-bold text-gray-800">Trending Now</h3>
        </div>

        <div className="space-y-6">
          {trendingNews.map((article, index) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              state={{ article }}
              className="block group">
              <div className="flex gap-4">
                <div className="text-3xl font-bold text-red-600/20 group-hover:text-red-600/40 transition-colors flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaClock />
                    {article.readTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-gray-950 via-purple-800 to-gray-900       rounded-2xl shadow-lg p-6 text-white sticky">
        <h3 className="text-2xl font-bold mb-3 text-white">Stay Informed</h3>
        <p className="mb-6 text-white/90">
          Get the latest language learning news delivered to your inbox
        </p>
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-4 py-3 rounded-lg mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <SubmitButton text="Subscribe" variant="white" className="rounded-lg" />
      </div>
    </div>
  );
}
