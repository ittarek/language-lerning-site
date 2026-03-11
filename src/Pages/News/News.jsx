import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaFire,
  FaTrophy,
  FaGlobeAmericas,
  FaLaptop,
  FaChartLine,
  FaBookReader,
} from 'react-icons/fa';
import FilterSection from '../../Components/Shared/FilterSection/FilterSection';
import { NewsCTA } from './NewsCTA';
import { BreakingNewsTicker } from './BreakingNewsTicker';
import { NewsHeroSection } from './NewsHeroSection';
import { NewsMainContent } from './NewsMainContent';
import { newsArticles } from './newsArticles';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Industry News',
    'Research',
    'Technology',
    'Global Programs',
    'Policy',
    'Trends',
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch =
      article?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article?.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const breakingNews = newsArticles.filter(article => article.breaking);
  const trendingNews = newsArticles.filter(article => article.trending).slice(0, 4);
  const regularNews = filteredNews.filter(article => !article.breaking);

  const categoryIcons = {
    'Industry News': <FaChartLine />,
    Research: <FaBookReader />,
    Technology: <FaLaptop />,
    'Global Programs': <FaGlobeAmericas />,
    Policy: <FaTrophy />,
    Trends: <FaFire />,
  };

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Language Learner | News</title>
      </Helmet>

      {/* Hero Section */}
      <NewsHeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Breaking News Ticker */}
      <BreakingNewsTicker breakingNews={breakingNews} />

      {/* Category Filter */}
      <FilterSection
        className="container "
        filters={[
          {
            label: 'Category',
            options: categories,
            selected: selectedCategory,
            onSelect: setSelectedCategory,
            color: 'indigo',
          },
        ]}
      />

      {/* Main Content */}
      <NewsMainContent
        trendingNews={trendingNews}
        filteredNews={filteredNews}
        regularNews={regularNews}
        categoryIcons={categoryIcons}
      />

      {/* CTA Section */}
      <NewsCTA />
    </div>
  );
};

export default News;
