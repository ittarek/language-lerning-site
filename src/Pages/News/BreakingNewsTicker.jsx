import React from 'react'
import { Link } from 'react-router-dom';

export const BreakingNewsTicker = ({ breakingNews }) => {
  return (
    <div>
      {' '}
      {breakingNews.length > 0 && (
        <div className="bg-red-800 text-white py-3 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 animate-marquee">
              <span className="bg-white text-red-600 px-4 py-1 rounded-full font-bold text-sm flex-shrink-0">
                🔴 BREAKING
              </span>
              {breakingNews.map(news => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  state={{ article: news }}
                  className="hover:underline flex-shrink-0">
                  {news.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
