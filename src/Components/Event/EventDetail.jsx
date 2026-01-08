import React, { useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FaCalendar,
    FaClock,
    FaMapMarkerAlt,
    FaVideo,
    FaArrowLeft,
    FaShare,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaCheckCircle,
    FaTicketAlt,
    FaUserTie,
    FaGraduationCap,
    FaLanguage
} from 'react-icons/fa';
import Container from '../../Components/Container';
import Swal from 'sweetalert2';
import OptimizedImage from '../Shared/OptimizedImage';

const EventDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);

  // All events data
  const allEvents = [
    {
      id: 1,
      title: 'Spanish Conversation Night - Beginner Level',
      description:
        'Join us for an immersive Spanish conversation evening! Practice your speaking skills in a relaxed, supportive environment with native speakers and fellow learners.',
      fullDescription:
        "This interactive Spanish conversation night is designed for beginners who want to practice their speaking skills in a comfortable, encouraging atmosphere. You'll participate in guided conversations, fun language games, and cultural activities that will help you gain confidence in speaking Spanish. Our native speakers will be there to help you with pronunciation, grammar, and natural expressions. No pressure, just practice and fun! Whether you're preparing for travel, want to connect with Spanish-speaking communities, or simply love the language, this event is perfect for you. Light refreshments will be provided, and you'll have plenty of opportunities to make new friends who share your passion for language learning.",
      date: '2025-01-15',
      time: '7:00 PM - 9:00 PM',
      duration: '2 hours',
      location: 'Virtual (Zoom)',
      type: 'Virtual',
      category: 'Practice Session',
      price: 'Free',
      seats: 30,
      seatsLeft: 12,
      instructor: 'María Rodriguez',
      instructorBio:
        'María is a certified Spanish teacher from Madrid with over 10 years of experience. She specializes in conversational Spanish and has helped thousands of students gain confidence in speaking.',
      level: 'Beginner',
      language: 'Spanish',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
      featured: true,
      tags: ['Spanish', 'Conversation', 'Interactive'],
      agenda: [
        '7:00 PM - Welcome and Introductions',
        '7:15 PM - Warm-up Activities',
        '7:30 PM - Group Conversations',
        '8:00 PM - Break',
        '8:10 PM - Role-play Scenarios',
        '8:40 PM - Q&A Session',
        '8:55 PM - Closing Remarks',
      ],
      requirements: [
        'Basic Spanish vocabulary (A1-A2 level)',
        'Stable internet connection (for virtual events)',
        'Webcam and microphone',
        'Willingness to practice speaking',
        'Open mind and positive attitude',
      ],
      benefits: [
        'Practice real conversations',
        'Get instant feedback from native speakers',
        'Build confidence in speaking',
        'Make new friends',
        'Learn cultural nuances',
        'Free learning materials provided',
      ],
    },
    {
      id: 2,
      title: 'Japanese Cultural Workshop: Tea Ceremony & Language',
      description:
        'Experience authentic Japanese culture while learning essential language phrases.',
      fullDescription:
        "Immerse yourself in Japanese culture through this unique workshop combining traditional tea ceremony (Chanoyu) with practical language instruction. You'll learn the history and significance of the tea ceremony while practicing essential Japanese phrases used in formal settings. Our instructor will guide you through each step of the ceremony, explaining cultural etiquette and teaching you how to communicate respectfully in Japanese. This hands-on experience includes preparing and serving matcha tea, understanding the philosophy behind the ritual, and learning conversational phrases you can use in Japan or with Japanese speakers. Perfect for culture enthusiasts and language learners alike!",
      date: '2025-01-20',
      time: '2:00 PM - 5:00 PM',
      duration: '3 hours',
      location: 'Cultural Center, Downtown',
      type: 'In-Person',
      category: 'Cultural Workshop',
      price: '$25',
      seats: 20,
      seatsLeft: 5,
      instructor: 'Takeshi Yamamoto',
      instructorBio:
        'Takeshi is a tea ceremony master and Japanese language instructor. Born in Kyoto, he has been teaching Japanese culture and language for 15 years.',
      level: 'All Levels',
      language: 'Japanese',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
      featured: true,
      tags: ['Japanese', 'Culture', 'Workshop'],
      agenda: [
        '2:00 PM - Introduction to Japanese Tea Ceremony',
        '2:30 PM - Language Lesson: Formal Greetings',
        '3:00 PM - Hands-on Tea Preparation',
        '3:45 PM - Break with Traditional Sweets',
        '4:00 PM - Practice Ceremony',
        '4:30 PM - Cultural Discussion',
        '4:50 PM - Closing & Certificate',
      ],
      requirements: [
        'No prior Japanese knowledge required',
        'Comfortable clothing (sitting on floor)',
        'Respect for cultural traditions',
        'Punctuality (ceremony cannot be interrupted)',
      ],
      benefits: [
        'Authentic cultural experience',
        'Learn proper Japanese etiquette',
        'Hands-on practice',
        'Traditional tea and sweets included',
        'Cultural certificate',
        'Take-home learning materials',
      ],
    },
  ];

  // Get event from location state or find in array
  const [event, setEvent] = useState(location.state?.event || null);

  React.useEffect(() => {
    if (!event) {
      const foundEvent = allEvents.find(e => e.id === parseInt(id));
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        navigate('/events');
      }
    }
  }, [id, event, navigate]);

  const handleRegister = () => {
    setRegistering(true);

    // Simulate registration process
    setTimeout(() => {
      setRegistering(false);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        html: `
                    <p class="text-lg mb-2">You're registered for:</p>
                    <p class="font-bold text-indigo-600">${event.title}</p>
                    <p class="text-sm text-gray-600 mt-4">Check your email for confirmation and event details.</p>
                `,
        confirmButtonColor: '#4F46E5',
        confirmButtonText: 'Great!',
      });
    }, 1500);
  };

  const handleShare = platform => {
    const url = window.location.href;
    const text = event?.title || '';

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
        </div>
      </div>
    );
  }

  const seatPercentage = ((event.seats - event.seatsLeft) / event.seats) * 100;
  const isAlmostFull = event.seatsLeft <= 5;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>{event.title} | Language Learner Events</title>
        <meta name="description" content={event.description} />
      </Helmet>

      {/* Hero Image Section */}
      <div className="relative h-96 overflow-hidden mt-6 rounded-xl max-w-7xl mx-auto ">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />

        <OptimizedImage
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          aspectRatio="16/9"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

        <Container>
          <div className="absolute bottom-8 left-0 right-0 px-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Events
            </Link>
           

            <div className="flex flex-wrap gap-3 mb-4">
              {event.featured && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Featured Event
                </span>
              )}
              <span
                className={`${
                  event.type === 'Virtual' ? 'bg-blue-500' : 'bg-green-500'
                } text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2`}>
                {event.type === 'Virtual' ? <FaVideo /> : <FaMapMarkerAlt />}
                {event.type}
              </span>
              <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                {event.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {event.title}
            </h1>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {event.fullDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {event?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Agenda */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Agenda</h2>
                <div className="space-y-3">
                  {event?.agenda?.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <FaCheckCircle className="text-indigo-600" />
                      </div>
                      <p className="text-gray-700 flex-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  What You'll Gain
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {event?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {event?.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0 mt-2"></span>
                      <p className="text-gray-700">{req}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Meet Your Instructor
                </h2>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    {event.instructor.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {event.instructor}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{event.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Registration Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">
                      {event.price}
                    </div>
                    <p className="text-gray-600">per person</p>
                  </div>

                  {/* Seats Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Seats Available</span>
                      <span
                        className={`font-bold ${
                          isAlmostFull ? 'text-red-600' : 'text-green-600'
                        }`}>
                        {event.seatsLeft} / {event.seats}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isAlmostFull ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${seatPercentage}%` }}></div>
                    </div>
                    {isAlmostFull && (
                      <p className="text-red-600 text-sm font-medium mt-2 flex items-center gap-2">
                        <span className="animate-pulse">⚠️</span>
                        Almost full! Register soon
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleRegister}
                    disabled={registering || event.seatsLeft === 0}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {registering ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : event.seatsLeft === 0 ? (
                      'Event Full'
                    ) : (
                      <>
                        <FaTicketAlt />
                        Register Now
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    Secure registration • Cancel anytime
                  </p>
                </div>

                {/* Event Details */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaCalendar className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Date</p>
                        <p className="text-gray-600 text-sm">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaClock className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Time</p>
                        <p className="text-gray-600 text-sm">{event.time}</p>
                        <p className="text-gray-500 text-xs">
                          Duration: {event.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      {event.type === 'Virtual' ? (
                        <FaVideo className="text-indigo-600 mt-1 flex-shrink-0" />
                      ) : (
                        <FaMapMarkerAlt className="text-indigo-600 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">Location</p>
                        <p className="text-gray-600 text-sm">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaUserTie className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Instructor</p>
                        <p className="text-gray-600 text-sm">{event.instructor}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaGraduationCap className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Level</p>
                        <p className="text-gray-600 text-sm">{event.level}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaLanguage className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Language</p>
                        <p className="text-gray-600 text-sm">{event.language}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaShare /> Share Event
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                      <FaFacebook />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex-1 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                      <FaTwitter />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex-1 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                      <FaLinkedin />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Related Events */}
      <div className="bg-gray-100 py-16 max-w-7xl mx-auto">
        <Container>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            More Events You Might Like
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {allEvents
              ?.filter(e => e.id !== event.id)
              .slice(0, 3)
              ?.map(relatedEvent => (
                <Link
                  key={relatedEvent.id}
                  to={`/events/${relatedEvent.id}`}
                  state={{ event: relatedEvent }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      aspectRatio="4/3"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-indigo-600 font-semibold text-sm">
                      {relatedEvent.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {relatedEvent.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedEvent.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {new Date(relatedEvent.date).toLocaleDateString()}
                      </span>
                      <span className="text-indigo-600 font-bold">
                        {relatedEvent.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EventDetail;