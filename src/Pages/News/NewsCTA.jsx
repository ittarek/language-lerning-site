import React from 'react'

export const NewsCTA = () => {
  return (
    <div className="bg-gradient-to-r from-gray-950 via-purple-800 to-gray-900    py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join the Language Learning Revolution
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Stay ahead with the latest trends, tools, and techniques
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300">
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}
