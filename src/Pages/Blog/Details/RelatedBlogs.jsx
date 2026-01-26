import React from 'react';
import { Link } from 'react-router-dom';

export const RelatedBlogs = ({ relatedPosts }) => {
  return (
    <div>
      {' '}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
          Related Articles
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedPosts.map(relatedPost => (
            <Link
              key={relatedPost.id}
              to={`/blog/${relatedPost.id}`}
              state={{ post: relatedPost }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-indigo-600 font-semibold">
                  {relatedPost.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {relatedPost.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
