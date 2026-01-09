import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaTicketAlt,
  FaVideo,
  FaGlobe,
  FaArrowRight,
} from 'react-icons/fa';
import Container from '../Container';
import FilterSection from '../Shared/FilterSection/FilterSection';
import OptimizedImage from '../Shared/OptimizedImage';
import { EventsSectionHeader, GradientSectionHeader } from '../ui/SectionHeaders';
import { ViewDetailsButton } from '../ui/Button';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const events = [
    {
      id: 1,
      title: 'Spanish Conversation Night - Beginner Level',
      description:
        'Join us for an immersive Spanish conversation evening! Practice your speaking skills in a relaxed, supportive environment with native speakers and fellow learners.',
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
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
      featured: true,
      tags: ['Spanish', 'Conversation', 'Interactive'],
    },
    {
      id: 2,
      title: 'Japanese Cultural Workshop: Tea Ceremony & Language',
      description:
        'Experience authentic Japanese culture while learning essential language phrases. This workshop combines traditional tea ceremony with practical Japanese language instruction.',
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
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
      featured: true,
      tags: ['Japanese', 'Culture', 'Workshop'],
    },
    {
      id: 3,
      title: 'French Language Meetup - Advanced Speakers',
      description:
        'Weekly gathering for advanced French learners to discuss literature, current events, and culture. Sharpen your skills through engaging debates and discussions.',
      date: '2025-01-18',
      time: '6:30 PM - 8:30 PM',
      duration: '2 hours',
      location: 'Café Français, City Center',
      type: 'In-Person',
      category: 'Meetup',
      price: 'Free',
      seats: 15,
      seatsLeft: 8,
      instructor: 'Sophie Dubois',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      tags: ['French', 'Discussion', 'Advanced'],
    },
    {
      id: 4,
      title: 'Mandarin Chinese: Business Communication Masterclass',
      description:
        'Essential Mandarin phrases and cultural insights for business professionals. Learn negotiation tactics, formal greetings, and professional correspondence.',
      date: '2025-01-25',
      time: '10:00 AM - 1:00 PM',
      duration: '3 hours',
      location: 'Virtual (Google Meet)',
      type: 'Virtual',
      category: 'Masterclass',
      price: '$45',
      seats: 50,
      seatsLeft: 23,
      instructor: 'Wei Chen',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      featured: true,
      tags: ['Chinese', 'Business', 'Professional'],
    },
    {
      id: 5,
      title: 'Italian Cooking & Language Class',
      description:
        'Learn to cook authentic Italian dishes while practicing Italian language! Follow recipes in Italian and learn culinary vocabulary hands-on.',
      date: '2025-01-22',
      time: '5:00 PM - 8:00 PM',
      duration: '3 hours',
      location: 'Culinary Institute Kitchen',
      type: 'In-Person',
      category: 'Workshop',
      price: '$35',
      seats: 12,
      seatsLeft: 3,
      instructor: 'Giovanni Rossi',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80',
      tags: ['Italian', 'Cooking', 'Hands-on'],
    },
    {
      id: 6,
      title: 'German Grammar Intensive Workshop',
      description:
        'Master German grammar in one intensive session! Focus on cases, verb conjugations, and sentence structure with expert guidance and practice exercises.',
      date: '2025-01-28',
      time: '9:00 AM - 4:00 PM',
      duration: '7 hours (with breaks)',
      location: 'Virtual (Zoom)',
      type: 'Virtual',
      category: 'Workshop',
      price: '$55',
      seats: 40,
      seatsLeft: 18,
      instructor: 'Klaus Müller',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      tags: ['German', 'Grammar', 'Intensive'],
    },
    {
      id: 7,
      title: 'Language Exchange Fair - Multilingual Event',
      description:
        'Meet language learners from around the world! Practice multiple languages, make international friends, and participate in fun language games and activities.',
      date: '2025-02-05',
      time: '3:00 PM - 7:00 PM',
      duration: '4 hours',
      location: 'Community Center Hall',
      type: 'In-Person',
      category: 'Social Event',
      price: 'Free',
      seats: 100,
      seatsLeft: 67,
      instructor: 'Multiple Hosts',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
      featured: true,
      tags: ['Multilingual', 'Social', 'Networking'],
    },
    {
      id: 8,
      title: 'Portuguese for Travel: Essential Phrases Crash Course',
      description:
        'Planning a trip to Brazil or Portugal? Learn essential travel phrases, navigation terms, and cultural tips in this fast-paced, practical course.',
      date: '2025-02-10',
      time: '6:00 PM - 8:00 PM',
      duration: '2 hours',
      location: 'Virtual (Zoom)',
      type: 'Virtual',
      category: 'Crash Course',
      price: '$20',
      seats: 60,
      seatsLeft: 34,
      instructor: 'Ana Silva',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
      tags: ['Portuguese', 'Travel', 'Practical'],
    },
  ];

  const categories = [
    'All',
    'Practice Session',
    'Workshop',
    'Masterclass',
    'Meetup',
    'Cultural Workshop',
    'Social Event',
    'Crash Course',
  ];
  const types = ['All', 'Virtual', 'In-Person'];

  const filteredEvents = events.filter(event => {
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory;
    const matchesType = selectedType === 'All' || event.type === selectedType;
    return matchesCategory && matchesType;
  });

  const featuredEvents = events.filter(e => e.featured);
  const upcomingEvents = filteredEvents.filter(e => !e.featured);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Language Learner | Events</title>
      </Helmet>
      {/* Hero Section */}
      <EventsSectionHeader
        title="Language Learning Events"
        description="Join our community events, workshops, and practice sessions to accelerate your language learning journey"
        eventsCount={events.length}
      />

      {/* Filters */}
      <FilterSection
        filters={[
          {
            label: 'Category',
            options: categories,
            selected: selectedCategory,
            onSelect: setSelectedCategory,
            color: 'indigo',
          },
          {
            label: 'Event Type',
            options: types,
            selected: selectedType,
            onSelect: setSelectedType,
            color: 'purple',
          },
        ]}
      />
      <Container>
        <div className="py-16 max-w-7xl mx-auto">
          {/* Featured Events */}
          {selectedCategory === 'All' &&
            selectedType === 'All' &&
            featuredEvents.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-10 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-gray-800">Featured Events</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {featuredEvents.map(event => (
                    <div
                      key={event.id}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group ">
                      <div className="grid md:grid-cols-2 ">
                        <div className=" h-64 md:h-auto overflow-hidden">
                          <OptimizedImage
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            aspectRatio="4/3"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              ⭐ Featured
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span
                              className={`${
                                event.type === 'Virtual' ? 'bg-blue-500' : 'bg-green-500'
                              } text-white px-3 py-1 rounded-full text-sm font-bold`}>
                              {event.type === 'Virtual' ? (
                                <FaVideo className="inline mr-1" />
                              ) : (
                                <FaMapMarkerAlt className="inline mr-1" />
                              )}
                              {event.type}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col  ">
                          <span className="text-indigo-600 font-semibold text-sm mb-2">
                            {event.category}
                          </span>

                          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                            {event.title}
                          </h3>

                          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                            {event.description}
                          </p>

                          <div className="space-y-2 mb-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <FaCalendar className="text-indigo-600" />
                              <span>
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaClock className="text-indigo-600" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaUsers className="text-indigo-600" />
                              <span>
                                {event.seatsLeft} seats left out of {event.seats}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t ">
                            <div className="text-2xl font-bold text-indigo-600">
                              {event.price}
                            </div>
                            <ViewDetailsButton className='rounded-lg'
                              _id={event.id}
                              sate={event}
                              text="Details"
                              to={`/events/${event.id}`}
                              width={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* All Events */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-10 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedCategory === 'All' && selectedType === 'All'
                  ? 'Upcoming Events'
                  : 'Filtered Events'}
              </h2>
              <span className="text-gray-600 font-medium">({upcomingEvents.length})</span>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {upcomingEvents.map(event => (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group relative">
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        aspectRatio="4/3"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span
                          className={`${
                            event.type === 'Virtual' ? 'bg-blue-500' : 'bg-green-500'
                          } text-white px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1`}>
                          {event.type === 'Virtual' ? <FaVideo /> : <FaMapMarkerAlt />}
                          {event.type}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-indigo-600 font-semibold text-sm">
                          {event.category}
                        </span>
                        <span className="text-gray-500 text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                          {event.level}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-indigo-600" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock className="text-indigo-600" />
                          <span>{event.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full  border-t absolute bottom-0 left-0  bg-white px-2 py-3">
                        <div className="text-xl font-bold text-indigo-600">
                          {event.price}
                        </div>

                        <ViewDetailsButton className='rounded-lg'
                          _id={event.id}
                          sate={event}
                          text="View Details"
                          to={`/events/${event.id}`}
                          width={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Events Found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more events
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
      {/* CTA Section */}
      <div className="hidden max-w-7xl mx-auto  rounded-xl bg-gradient-to-r from-gray-950 via-purple-800 to-gray-900   py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Suggest an event or join our community to stay updated on new workshops and
              meetups
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-2xl transition-all">
                Suggest an Event
              </button>
              <button className="px-8 py-4 bg-indigo-800 text-white font-bold rounded-xl hover:bg-indigo-900 transition-all">
                Join Newsletter
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Events;
