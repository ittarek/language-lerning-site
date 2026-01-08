import { useState } from 'react';
import Container from '../../../Components/Container';
import { TradingArticleCard } from './TradingArticleCard';
import { news } from './news';
import { TradingArticleHeader } from './TradingArticleHeader';
import NewsletterCTA from './NewsletterCTA';

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
      <NewsletterCTA/>
      </div>
    </Container>
  );
};

export default TradingArticle;
