import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MdArrowBack,
  MdStar,
  MdPerson,
  MdAccessTime,
  MdSchool,
  MdVerified,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import Container from '../../Components/Container';
import OptimizedImage from '../../Components/Shared/OptimizedImage';
import { courseData } from './courseData';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const ComingSoonCourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const course = courseData.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Course Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Go Back
          </button>
        </div>
      </Container>
    );
  }

  const handleNotifyMe = async () => {
    Swal.fire({
      title: 'Get Notified',
      text: `We'll send you a notification when "${course.title}" starts`,
      icon: 'info',
      input: 'email',
      inputLabel: 'Enter your email',
      inputPlaceholder: 'your@email.com',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      confirmButtonText: 'Notify Me',
      inputValidator: value => {
        if (!value) {
          return 'Please enter your email';
        }
        if (!value.includes('@')) {
          return 'Please enter a valid email';
        }
      },
    }).then(async result => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await axiosSecure.post('/send-notification-email', {
            email: result.value,
            courseTitle: course.title,
            courseId: course.id,
            startDate: course.startDate,
            coursePrice: course.price,
          });

          if (response.data.success) {
            toast.success(
              `Notification enabled! Confirmation email sent to ${result.value}`,
              {
                position: 'top-right',
              }
            );
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to send notification', { position: 'top-right' });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Learning | {course.title}</title>
      </Helmet>
      <Container>
        <div className="py-8 max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 text-indigo-600 hover:text-indigo-700 font-semibold transition">
            <MdArrowBack size={24} />
            Back to Courses
          </button>

          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Image */}
            <div className="md:col-span-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-80">
                <OptimizedImage
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Coming Soon
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    {course.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MdStar className="text-yellow-500" size={20} />
                      <span className="font-bold text-lg">{course.rating}</span>
                      <span className="text-gray-600">({course.reviews} reviews)</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-600">
                      {course.students} students enrolled
                    </span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={course.instructorImage}
                    alt={course.instructor}
                    className="w-16 h-16 rounded-full border-3 border-indigo-600"
                  />
                  <div>
                    <p className="text-sm text-gray-600">Instructor</p>
                    <p className="font-bold text-lg text-gray-900">{course.instructor}</p>
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <MdAccessTime className="text-blue-600" />
                      <span className="font-semibold text-gray-700">Duration</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{course.duration}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <MdSchool className="text-purple-600" />
                      <span className="font-semibold text-gray-700">Level</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{course.level}</p>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Price</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {course.price === 'Free' ? 'Free' : `$${course.price}`}
                    </p>
                  </div>
                  <button
                    onClick={handleNotifyMe}
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition disabled:opacity-50">
                    {loading ? 'Sending...' : 'Notify Me'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8 overflow-x-auto">
              {['overview', 'syllabus', 'materials', 'requirements'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-bold border-b-3 transition capitalize ${
                    activeTab === tab
                      ? 'text-indigo-600 border-indigo-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Course Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {course.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    What You'll Learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                        <MdVerified
                          className="text-indigo-600 flex-shrink-0 mt-1"
                          size={20}
                        />
                        <span className="text-gray-800 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Learning Outcomes
                  </h2>
                  <ul className="space-y-3">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full flex-shrink-0 text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-gray-800 text-lg">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-green-50 rounded-2xl border-2 border-green-200">
                  {course.certificate && (
                    <div className="flex items-center gap-3">
                      <MdVerified className="text-green-600" size={28} />
                      <div>
                        <p className="font-bold text-gray-900">
                          Certificate of Completion
                        </p>
                        <p className="text-sm text-gray-600">
                          Earn a certificate after finishing the course
                        </p>
                      </div>
                    </div>
                  )}
                  {course.lifetime_access && (
                    <div className="flex items-center gap-3">
                      <MdAccessTime className="text-green-600" size={28} />
                      <div>
                        <p className="font-bold text-gray-900">Lifetime Access</p>
                        <p className="text-sm text-gray-600">
                          Access course materials forever
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Syllabus</h2>
                <div className="space-y-3">
                  {course.syllabus.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 hover:border-indigo-400 transition">
                      <div>
                        <p className="font-bold text-gray-900">
                          Week {item.week}: {item.topic}
                        </p>
                      </div>
                      <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold">
                        {item.hours}h
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-gray-600 text-center">
                  Total Hours:{' '}
                  {course.syllabus.reduce((acc, item) => acc + item.hours, 0)}
                </p>
              </div>
            )}

            {activeTab === 'materials' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Course Materials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.materials.map((material, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                      <p className="font-bold text-gray-900">{material}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
                  <p className="text-lg text-gray-700 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    {course.prerequisites}
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    What You'll Get
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-800 text-lg">
                      <span className="text-indigo-600 font-bold">✓</span>
                      Full access to all course materials
                    </li>
                    <li className="flex items-center gap-3 text-gray-800 text-lg">
                      <span className="text-indigo-600 font-bold">✓</span>
                      Lifetime access to videos and resources
                    </li>
                    {course.certificate && (
                      <li className="flex items-center gap-3 text-gray-800 text-lg">
                        <span className="text-indigo-600 font-bold">✓</span>
                        Certificate of completion
                      </li>
                    )}
                    <li className="flex items-center gap-3 text-gray-800 text-lg">
                      <span className="text-indigo-600 font-bold">✓</span>
                      Downloadable resources and guides
                    </li>
                    <li className="flex items-center gap-3 text-gray-800 text-lg">
                      <span className="text-indigo-600 font-bold">✓</span>
                      Practice exercises and projects
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={handleNotifyMe}
              disabled={loading}
              className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:shadow-xl transition disabled:opacity-50">
              {loading ? 'Sending...' : 'Get Notified When Course Starts'}
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ComingSoonCourseDetails;
