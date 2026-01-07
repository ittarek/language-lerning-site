import { useState } from 'react';
import Container from '../../../Components/Container';
import { TradingArticleCard } from './TradingArticleCard';
import { news } from './news';
import { TradingArticleHeader } from './TradingArticleHeader';

const TradingArticle = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <Container>
      <div className="py-20 bg-gradient-to-b from-white to-gray-50">
        {/* Section Header */}
        <TradingArticleHeader showAll={showAll} setShowAll={setShowAll} />

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(showAll ? news : news.slice(0, 4)).map((article, index) => (
              <TradingArticleCard key={index} article={article} />
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
