import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FaCalendar,
  FaUser,
  FaClock,
  FaArrowLeft,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLightbulb,
  FaBookOpen,
  FaGraduationCap,
  FaGlobe,
  FaSearch,
} from 'react-icons/fa';
import { news } from './news';
import { SocialButton } from '../../../Components/ui/Button';

const TradingArticleDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [article, setArticle] = useState(location.state?.article || null);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* 🔍 article find */
  useEffect(() => {
    if (!article) {
      const found = news.find(item => item.slug === slug);
      if (found) setArticle(found);
      else navigate('/'); // fallback
    }
  }, [slug, article, navigate]);

  /* 📊 scroll progress */
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* 🔗 share */
  const handleShare = platform => {
    const url = window.location.href;
    const text = article?.title;

    const map = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(map[platform], '_blank', 'width=600,height=400');
  };

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  /* 🧩 destructuring */
  const { title, date, details, img, category, tags, views, comments } = article;

  const categoryIcons = {
    'Language Learning': <FaLightbulb />,
    Research: <FaBookOpen />,
    Practice: <FaGraduationCap />,
    Culture: <FaGlobe />,
    Technology: <FaSearch />,
    'AI & Future': <FaSearch />,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>{title} | Trending Article</title>
        <meta name="description" content={details} />
      </Helmet>

      {/* progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 to-orange-600"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* hero */}
      <div className="bg-gradient-to-br from-gray-950 via-slate-700 to-gray-900 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-white">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white">
            <FaArrowLeft /> Back
          </Link>

          <span className="inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full font-semibold mb-6">
            {categoryIcons[category]}
            {category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

          <div className="flex flex-wrap gap-6 text-white/90">
            <span className="flex items-center gap-2">
              <FaCalendar /> {date}
            </span>
            <span className="flex items-center gap-2">
              <FaClock /> {views} views
            </span>
            <span className="flex items-center gap-2">
              <FaUser /> {comments} comments
            </span>
          </div>

          {/* share */}
          <div className="flex items-center gap-4 mt-8">
            <FaShare />
            <SocialButton onClick={() => handleShare('facebook')} icon={<FaFacebook />} />
            <SocialButton onClick={() => handleShare('twitter')} icon={<FaTwitter />} />
            <SocialButton onClick={() => handleShare('linkedin')} icon={<FaLinkedin />} />
          </div>
        </div>
      </div>

      {/* image */}
      <div className="max-w-5xl mx-auto px-4 mt-10">
        <img
          src={img}
          alt={title}
          className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
        />
      </div>

      {/* content */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">{details}</p>

          {/* tags */}
          <div className="flex flex-wrap gap-3">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm font-semibold">
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default TradingArticleDetails;
