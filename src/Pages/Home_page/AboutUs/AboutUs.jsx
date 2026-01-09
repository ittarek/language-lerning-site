import { useState, useEffect } from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import OptimizedImage from '../../../Components/Shared/OptimizedImage';
import { Link } from 'react-router-dom';
import { OutlineButton, ViewDetailsButton } from '../../../Components/ui/Button';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Counter animation
  const Counter = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      const animate = currentTime => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <div
      id="about-section"
      className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Section Header */}

      <SectionTitle
        variant="icon"
        subtitle="Our Story"
        title="About Our Platform"
        gradientText="Our Platform"
        summary="    Empowering learners worldwide with innovative language education"
        icon={
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <div
            className={`relative transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-indigo-200 rounded-3xl -z-10 transform rotate-6"></div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-purple-200 rounded-3xl -z-10 transform -rotate-6"></div>

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                  alt="About Us"
                  className="w-full h-auto object-cover"
                  aspectRatio="1/1"
                />
                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">98%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Since 2020</div>
                      <div className="font-semibold text-indigo-600">
                        Trusted Globally
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-8 -right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <span className="text-3xl font-bold">5+</span>
                <span className="text-sm font-semibold">Years</span>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
            {/* Main Content */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Transforming Language Learning Through Innovation
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're on a mission to make language learning accessible, engaging, and
                effective for everyone. Our platform combines cutting-edge technology with
                proven teaching methods to deliver exceptional results.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With expert instructors, interactive courses, and a supportive global
                community, we've helped thousands of students achieve their language
                learning goals and unlock new opportunities worldwide.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 md:[&>div>h4]:text-2xl [&>div>h4]:text-sm">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Expert Teachers</h4>
                <p className="text-sm text-gray-600">Certified native speakers</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Smart Learning</h4>
                <p className="text-sm text-gray-600">AI-powered courses</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Flexible Schedule</h4>
                <p className="text-sm text-gray-600">Learn at your pace</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Global Community</h4>
                <p className="text-sm text-gray-600">Connect worldwide</p>
              </div>
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {isVisible && <Counter end={25} suffix="K" />}
                </div>
                <p className="text-sm text-gray-600 font-medium">Completed Classes</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {isVisible && <Counter end={12} suffix="M" />}
                </div>
                <p className="text-sm text-gray-600 font-medium">Students Worldwide</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {isVisible && <Counter end={95} suffix="%" />}
                </div>
                <p className="text-sm text-gray-600 font-medium">Success Rate</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  {isVisible && <Counter end={50} suffix="+" />}
                </div>
                <p className="text-sm text-gray-600 font-medium">Languages</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/CourseExplorerPage">
                <ViewDetailsButton
                  text="Start Learning Today"
                  className="!rounded-full px-8 py-4"
                />
              </Link>

              <Link to="/ContactUs">
                <OutlineButton
                  text="Learn More"
                  className="px-8 py-4 bg-white border-2 rounded-full font-bold text-indigo-600 "
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
