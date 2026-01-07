import React from 'react';
import Container from '../../../Components/Container';
import OptimizedImage from '../../../Components/Shared/OptimizedImage';
import { Link } from 'react-router-dom';

const news = [
  {
    title: '10 Effective Tips for Learning a New Language Fast',
    date: 'Dec 20, 2024',
    details:
      'Discover proven strategies that can help you master a new language in record time. From immersion techniques to digital tools.',
    comments: '24',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500',
  },
  {
    title: 'The Science Behind Language Acquisition in Adults',
    date: 'Dec 18, 2024',
    details:
      'Explore the neurological processes that occur when adults learn new languages and how to optimize your learning potential.',
    comments: '18',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
  },
  {
    title: 'Why Cultural Immersion is Key to Language Mastery',
    date: 'Dec 15, 2024',
    details:
      "Understanding culture is just as important as learning grammar. Here's why immersion makes all the difference.",
    comments: '31',
    img: 'https://images.unsplash.com/photo-1763656448109-033f71551cad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Top Digital Tools Every Language Learner Should Use',
    date: 'Dec 12, 2024',
    details:
      'From AI-powered apps to virtual reality experiences, discover the best technology for accelerated language learning.',
    comments: '42',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
  },
];
const TradingArticle = () => {
  return (
    <Container>
      <div className="py-20 bg-gradient-to-b from-white to-gray-50">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
                Hot Topics
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Trending{' '}
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Articles
                </span>
              </h2>
              <p className="text-gray-600 text-lg">
                Stay updated with the latest insights and stories
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
              View All Articles
              <svg
                className="w-5 h-5"
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
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {news.map((article, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 hover:-translate-y-2">
                <div className="flex flex-col md:flex-row gap-0 md:gap-4">
                  {/* Image Section */}
                  <div className="relative w-full md:w-48 h-64 md:h-auto overflow-hidden md:rounded-l-2xl flex-shrink-0">
                    <OptimizedImage
                      src={article.img}
                      alt={article.title}
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
                      Trending
                    </div>

                    {/* Category Tag */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Language Learning
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                      {article.title}
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
                        <span>{article.date}</span>
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
                        <span>{article.comments} Comments</span>
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
                        <span>1.2k views</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {article.details}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg">
                        Education
                      </span>
                      <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-lg">
                        Tips
                      </span>
                      <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-lg">
                        Guide
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link to="/TradingArticle-article-details">
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

                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group/share">
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
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group/bookmark">
                          <svg
                            className="w-5 h-5 text-gray-400 group-hover/bookmark:text-red-600 transition-colors"
                            fill="none"
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
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-gray-950 via-slate-500 to-pink-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Never Miss an Update
              </h3>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest articles delivered straight
                to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
                />
                <button className="px-8 py-4 bg-white text-red-600 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-white/70 text-sm">
                Join 10,000+ subscribers. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TradingArticle;
