import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../Components/Container';
import SectionTitle from '../../Components/SectionTitle';
import OptimizedImage from '../../Components/Shared/OptimizedImage';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { MdNotifications, MdArrowForward, MdInfo } from 'react-icons/md';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { courseData } from './courseData';

const StartingCourse = () => {
  const navigate = useNavigate();
  const [notifiedCourses, setNotifiedCourses] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [axiosSecure] = useAxiosSecure();

  // ✅ Notify Me Button Handler - with email sending
  const handleNotifyMe = async course => {
    if (notifiedCourses.has(course.id)) {
      toast.info("You're already notified for this course!", {
        position: 'top-right',
      });
      return;
    }

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
          // Send email via backend
          const response = await axiosSecure.post('/send-notification-email', {
            email: result.value,
            courseTitle: course.title,
            courseId: course.id,
            startDate: course.startDate,
            coursePrice: course.price,
          });

          if (response.data.success) {
            // Update UI state
            setNotifiedCourses(prev => new Set(prev).add(course.id));

            toast.success(
              `Notification enabled! We've sent a confirmation email to ${result.value}`,
              {
                position: 'top-right',
              }
            );
          } else {
            toast.error('Failed to send notification. Please try again.', {
              position: 'top-right',
            });
          }
        } catch (error) {
          console.error('Error sending notification:', error);
          toast.error(
            error.response?.data?.message || 'Failed to send notification email',
            {
              position: 'top-right',
            }
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // ✅ View Details Button Handler - Navigate to details page
  const handleViewDetails = course => {
    navigate(`/coming-soon-course/${course.id}`);
  };

  // ✅ Learn More Button Handler (Old - Optional)
  const handleLearnMore = course => {
    Swal.fire({
      title: course.title,
      html: `
        <div class="text-left space-y-4">
          <p class="text-gray-700"><strong>Description:</strong> ${course.details}</p>
          <p class="text-gray-700"><strong>Price:</strong> $${course.price}</p>
          <p class="text-gray-700"><strong>Duration:</strong> ${course.duration}</p>
          <p class="text-gray-700"><strong>Level:</strong> ${course.level}</p>
          <p class="text-gray-700"><strong>Start Date:</strong> ${new Date(
            course.startDate
          ).toLocaleDateString()}</p>
          <div class="bg-blue-50 p-3 rounded-lg mt-4">
            <p class="text-sm text-blue-800">🎓 This course includes certificate of completion and lifetime access</p>
          </div>
        </div>
      `,
      confirmButtonColor: '#4f46e5',
      confirmButtonText: 'View Full Details',
      showCancelButton: true,
      cancelButtonText: 'Close',
    }).then(result => {
      if (result.isConfirmed) {
        navigate(`/coming-soon-course/${course.id}`);
      }
    });
  };

  // ✅ View All Upcoming Courses Button
  const handleViewAllCourses = () => {
    Swal.fire({
      title: 'Coming Soon',
      html: `
        <div class="text-left space-y-3">
          <p>We have more exciting courses coming soon! Here's what's in the pipeline:</p>
          <ul class="text-left space-y-2 text-sm text-gray-700">
            <li>✓ Advanced Python Programming</li>
            <li>✓ Web Development Masterclass</li>
            <li>✓ Data Science & Analytics</li>
            <li>✓ Mobile App Development</li>
            <li>✓ AI & Machine Learning</li>
            <li>✓ Cloud Computing Essentials</li>
          </ul>
          <p class="text-indigo-600 font-semibold mt-4">Subscribe to get notified about all upcoming courses!</p>
        </div>
      `,
      confirmButtonColor: '#4f46e5',
      confirmButtonText: 'Notify Me for All',
      icon: 'info',
    }).then(result => {
      if (result.isConfirmed) {
        toast.success("You'll be notified about all upcoming courses!", {
          position: 'top-right',
        });
      }
    });
  };

  return (
    <Container>
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        {/* Section Header */}
        <SectionTitle
          variant="animated-badge"
          subtitle="Coming Soon"
          title="Course Starting Soon"
          gradientText="Soon"
          summary="Don't miss out! Register early and get exclusive access to our upcoming courses"
          color="indigo"
          size="lg"
        />

        {/* Course Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseData.map(course => (
              <div
                key={course.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-3">
                {/* "Starting Soon" Badge */}
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  Starting Soon
                </div>

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={course.img}
                    alt={course.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    aspectRatio="1/1"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xl shadow-lg">
                    {course.price === 'Free' ? 'Free' : `$${course.price}`}
                  </div>

                  {/* Hover Details Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
                    <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm leading-relaxed backdrop-blur-sm bg-black/40 p-3 rounded-xl line-clamp-3">
                        {course.details}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 min-h-[56px]">
                    {course.title}
                  </h3>

                  {/* Course Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-semibold">
                        {new Date(course.startDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-orange-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-semibold">Limited Slots</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Certificate
                    </span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg">
                      {course.duration}
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                      {course.level}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span className="font-semibold">Seats Filling Fast</span>
                      <span className="text-orange-600 font-bold">75% Booked</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full animate-pulse"
                        style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 text-sm">
                    <button
                      onClick={() => handleNotifyMe(course)}
                      disabled={loading || notifiedCourses.has(course.id)}
                      className={`flex-1 p-2 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                        notifiedCourses.has(course.id)
                          ? 'bg-green-100 text-green-600 border-2 border-green-600 cursor-not-allowed'
                          : loading
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-[1.02]'
                      }`}>
                      <MdNotifications size={18} />
                      {loading
                        ? 'Sending...'
                        : notifiedCourses.has(course.id)
                        ? 'Notified'
                        : 'Notify Me'}
                    </button>
                    <button
                      onClick={() => handleViewDetails(course)}
                      className="p-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center">
                      <MdInfo size={18} />
                    </button>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={handleViewAllCourses}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
            View All Upcoming Courses
            <MdArrowForward size={20} />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default StartingCourse;
