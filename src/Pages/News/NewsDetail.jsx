import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FaCalendar,
    FaClock,
    FaArrowLeft,
    FaShare,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaFire,
    FaChartLine,
    FaLaptop,
    FaGlobeAmericas,
    FaTrophy,
    FaBookReader
} from 'react-icons/fa';
import OptimizedImage from '../../Components/Shared/OptimizedImage';
import { SocialButton, SubmitButton } from '../../Components/ui/Button';
import { newsArticles } from './newsArticles';

const NewsDetail = () => {
    const { id } = useParams();
  const location = useLocation();

  
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);

    // Get article from location state or find in array
    const [article, setArticle] = useState(location.state?.article || location.state?.article.articles?.[0] || null);

    useEffect(() => {
        if (!article) {
            const foundArticle = newsArticles.find(a => a.id === parseInt(id));
            if (foundArticle) {
                setArticle(foundArticle);
            } else {
                navigate('/news');
            }
        }
    }, [id, article, navigate]);

    // Handle scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Share functionality
    const handleShare = (platform) => {
        const url = window.location.href;
        const text = article?.title || '';

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    // Related articles (same category, excluding current)
    const relatedArticles = newsArticles
        .filter(a => a.id !== article?.id && a.category === article?.category)
        .slice(0, 3);

    const categoryIcons = {
        'Industry News': <FaChartLine />,
        'Research': <FaBookReader />,
        'Technology': <FaLaptop />,
        'Global Programs': <FaGlobeAmericas />,
        'Policy': <FaTrophy />,
        'Trends': <FaFire />
    };

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📰</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
                </div>
            </div>
        );
    }

    return (
      <div className="bg-gray-50 min-h-screen">
        <Helmet>
          <title>{article.title} | Language Learner News</title>
          <meta name="description" content={article.excerpt} />
        </Helmet>

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}></div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-950 via-purple-800 to-gray-900  pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to News
              </Link>

              {/* Category & Status Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-semibold">
                  {categoryIcons[article.category]}
                  {article.category}
                </span>
                {article.breaking && (
                  <span className="inline-flex items-center gap-2 bg-red-700 text-white px-6 py-2 rounded-full font-bold animate-pulse">
                    🔴 BREAKING NEWS
                  </span>
                )}
                {article.trending && (
                  <span className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold">
                    <FaFire /> Trending
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-white/90 mb-8">
                <span className="flex items-center gap-2">
                  <FaCalendar />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock />
                  {article.readTime}
                </span>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4">
                <span className="text-white/90 flex items-center gap-2">
                  <FaShare /> Share:
                </span>
                <SocialButton
                  onClick={() => handleShare('facebook')}
                  icon={<FaFacebook />}
                  ariaLabel="Share on Facebook"
                />
                <SocialButton
                  onClick={() => handleShare('twitter')}
                  icon={<FaTwitter />}
                  ariaLabel="Share on Twitter"
                />
                <SocialButton
                  onClick={() => handleShare('linkedin')}
                  icon={<FaLinkedin />}
                  ariaLabel="Share on LinkedIn"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container mx-auto px-4 mt-11 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src={article.image}
                alt={article.title}
                aspectRatio="16/9"
                priority={true}
                className="w-full rounded-2xl shadow-2xl mb-8"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Excerpt/Summary */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-r-2xl mb-8">
              <p className="text-lg text-gray-700 font-semibold italic">
                {article.excerpt}
              </p>
            </div>

            {/* Article Content */}
            <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
              <div className="prose prose-lg max-w-none">
                {article?.content?.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h2
                        key={index}
                        className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center gap-3">
                        <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>
                        {paragraph.replace(/\*\*/g, '')}
                      </h2>
                    );
                  }
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-600 font-semibold mr-2">Tags:</span>
                  <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium">
                    Language Learning
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">
                    Education
                  </span>
                </div>
              </div>
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>
                  Related News
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map(relatedArticle => (
                    <Link
                      key={relatedArticle.id}
                      to={`/news/${relatedArticle.id}`}
                      state={{ article: relatedArticle }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {relatedArticle.trending && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <FaFire className="text-xs" /> Trending
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <span className="text-sm text-red-600 font-semibold">
                          {relatedArticle.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-950 via-purple-800 to-gray-900   py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Stay Updated with Latest News
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Subscribe to our newsletter for weekly updates on language learning trends
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-white/50"
                />
                <SubmitButton
                  text="Subscribe Now"
                  variant="white"
                  className=" text-red-600 px-8 py-4 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default NewsDetail;