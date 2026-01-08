import { FaGlobe, FaHandshake, FaHeart, FaLightbulb, FaRocket } from 'react-icons/fa';

// Detailed About/Company Page
export function DetailedAboutPage() {
  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to transform language learning',
    },
    {
      year: '2021',
      title: '1M Students',
      description: 'Reached our first million active learners',
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Launched in 50+ countries worldwide',
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Introduced AI-powered personalized learning',
    },
    {
      year: '2024',
      title: '10M+ Community',
      description: "Built the world's largest learning community",
    },
  ];

  const values = [
    {
      icon: FaRocket,
      title: 'Innovation',
      description: 'Constantly pushing boundaries in education technology',
    },
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'Deeply committed to student success and growth',
    },
    {
      icon: FaLightbulb,
      title: 'Excellence',
      description: 'Maintaining highest standards in everything we do',
    },
    {
      icon: FaHandshake,
      title: 'Integrity',
      description: 'Building trust through transparency and honesty',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://i.pravatar.cc/150?img=5',
    },
    { name: 'Michael Rodriguez', role: 'CTO', image: 'https://i.pravatar.cc/150?img=12' },
    {
      name: 'Emily Johnson',
      role: 'Head of Education',
      image: 'https://i.pravatar.cc/150?img=9',
    },
    {
      name: 'David Kim',
      role: 'VP of Operations',
      image: 'https://i.pravatar.cc/150?img=14',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Empowering millions to break language barriers and connect with the world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 border-2 border-indigo-200">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <FaRocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To make world-class language education accessible to everyone, everywhere.
              We believe that language learning should be engaging, effective, and
              available to all, regardless of background or location.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 border-2 border-blue-200">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
              <FaGlobe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              A world where language is never a barrier to opportunity, connection, or
              understanding. We envision a future where anyone can learn any language,
              anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-600 to-purple-600"></div>
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div
                  key={i}
                  className={`flex items-center ${
                    i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}>
                  <div
                    className={`w-5/12 ${
                      i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
                    }`}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="text-2xl font-bold text-indigo-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The principles that guide everything we do and every decision we make
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Experienced leaders passionate about transforming education
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '12M+', label: 'Active Students' },
              { number: '500+', label: 'Expert Teachers' },
              { number: '50+', label: 'Countries' },
              { number: '95%', label: 'Success Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-indigo-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of learners worldwide and discover the joy of learning a new
            language
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-xl transition-all">
              Start Learning Today
            </button>
            <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:border-gray-400 hover:shadow-lg transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
