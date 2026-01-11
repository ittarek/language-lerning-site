import { useState } from 'react';
import {
  FaBook,
  FaClock,
  FaStar,
  FaUsers,
  FaGraduationCap,
  FaAward,
  FaGlobe,
  FaChartLine,
  FaHeart,
  FaRocket,
  FaLightbulb,
  FaHandshake,
} from 'react-icons/fa';
import { ViewDetailsButton } from '../../../Components/ui/Button';

// Course Catalog Page
export function CourseExplorerPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses', icon: FaBook },
    { id: 'business', name: 'Business', icon: FaChartLine },
    { id: 'conversation', name: 'Conversation', icon: FaUsers },
    { id: 'academic', name: 'Academic', icon: FaGraduationCap },
    { id: 'professional', name: 'Professional', icon: FaAward },
  ];

  const courses = [
    {
      id: 1,
      title: 'Business English Mastery',
      category: 'business',
      level: 'intermediate',
      duration: '8 weeks',
      students: 2340,
      rating: 4.8,
      price: 149,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
      description: 'Master business communication and professional vocabulary',
      features: ['Live sessions', 'Certificate', 'Lifetime access'],
    },
    {
      id: 2,
      title: 'Conversational Spanish',
      category: 'conversation',
      level: 'beginner',
      duration: '6 weeks',
      students: 3120,
      rating: 4.9,
      price: 99,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      description: 'Speak Spanish confidently in everyday situations',
      features: ['Native speakers', '1-on-1 sessions', 'Mobile app'],
    },
    {
      id: 3,
      title: 'IELTS Preparation',
      category: 'academic',
      level: 'advanced',
      duration: '12 weeks',
      students: 1890,
      rating: 4.7,
      price: 299,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
      description: 'Achieve your target IELTS score with expert guidance',
      features: ['Mock tests', 'Writing feedback', 'Speaking practice'],
    },
    {
      id: 4,
      title: 'French for Professionals',
      category: 'professional',
      level: 'intermediate',
      duration: '10 weeks',
      students: 1560,
      rating: 4.6,
      price: 199,
      image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400',
      description: 'Professional French for career advancement',
      features: ['Industry focus', 'Networking', 'Career support'],
    },
    {
      id: 5,
      title: 'German A1 Complete',
      category: 'conversation',
      level: 'beginner',
      duration: '8 weeks',
      students: 2670,
      rating: 4.8,
      price: 129,
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400',
      description: 'Start your German journey from absolute beginner',
      features: ['Interactive lessons', 'Grammar focus', 'Cultural insights'],
    },
    {
      id: 6,
      title: 'Mandarin Business Course',
      category: 'business',
      level: 'advanced',
      duration: '16 weeks',
      students: 980,
      rating: 4.9,
      price: 399,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      description: 'Navigate Chinese business culture and language',
      features: ['Business etiquette', 'Negotiation skills', 'Cultural training'],
    },
  ];

  const filteredCourses = courses.filter(course => {
    const categoryMatch =
      selectedCategory === 'all' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Your Learning Journey
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Choose from our expert-crafted courses and achieve fluency faster
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaUsers className="w-5 h-5" />
              <span>12M+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBook className="w-5 h-5" />
              <span>500+ Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="w-5 h-5" />
              <span>4.8 Average Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Browse by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
                    }`}>
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Level</h3>
            <div className="flex flex-wrap gap-3">
              {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedLevel === level
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                  }`}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="relative md:h-[50vh] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-indigo-600">
                  ${course.price}
                </div>
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {course.level}
                </div>
              </div>

              <div className="p-6 space-y-4 ">
                <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaClock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers className="w-4 h-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar className="w-4 h-4" />
                    <span className="text-gray-700 font-semibold">{course.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.features.map((feature, i) => (
                    <span
                      key={i}
                      className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className=" absolute bottom-0 left-0  w-full ">
                  <ViewDetailsButton text="       Enroll Now" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="hidden mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Our learning advisors are here to help you find the perfect course for your
            goals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:shadow-xl transition-all">
              Talk to an Advisor
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold border-2 border-white/40 hover:bg-white/30 transition-all">
              View All Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
