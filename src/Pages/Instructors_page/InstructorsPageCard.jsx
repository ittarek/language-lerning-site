import { useState } from 'react';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGraduationCap,
  FaBriefcase,
  FaStar,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import your background image
import Feature4BgImg from '../../assets/features/feature4_bg.png';
import { ExperienceItem } from './ExperienceItem';

const tabs = [
  { label: 'ABOUT', value: 'about', icon: FaGraduationCap },
  { label: 'EXPERIENCE', value: 'experience', icon: FaBriefcase },
  { label: 'CONTACT', value: 'contact', icon: FaEnvelope },
];

// Tab Button Component
const TabButton = ({ label, value, icon: Icon, activeValue, onClick }) => {
  const isActive = activeValue === value;

  return (
    <button
      onClick={() => onClick(value)}
      className={`
        flex-1 py-4 px-2 text-center font-semibold text-xs uppercase tracking-wider
        transition-all duration-300 relative overflow-hidden group
        ${
          isActive
            ? 'text-indigo-600 bg-indigo-50'
            : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-50'
        }
      `}>
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600" />
      )}

      <div className="flex flex-col items-center gap-1">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </button>
  );
};

// Social Link Component
const SocialLink = ({ href, icon: Icon, platform }) => (
  <a
    href={href || '#'}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-110 hover:shadow-md"
    aria-label={platform}>
    <Icon className="w-4 h-4" />
  </a>
);

// Contact Info Component
const ContactInfo = ({ icon: Icon, text, href }) => (
  <a
    href={href}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-all duration-300 group">
    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
      <Icon className="w-4 h-4" />
    </div>
    <span className="text-gray-700 text-sm flex-1 break-all">{text}</span>
  </a>
);

// Main Component
const InstructorsPageCard = ({ instructor = {} }) => {
  const [activeSection, setActiveSection] = useState('about');

  /* =======================
     🔹 Destructuring (Your Original Data Structure)
  ======================== */
  const {
    _id,
    instructor_name,
    instructor_img,
    instructor_email,
    designation = 'Language Instructor',
    description,
    rating,
    students_count,
    social_links = {},
    experience = [],
    contact = {},
  } = instructor;
  const { facebook, twitter, instagram, linkedin } = social_links;
  const { address, phone } = contact;

  const handleSectionChange = section => setActiveSection(section);
  const isCompact = activeSection !== 'about';

  // Dynamic heights based on active section
  const cardHeight = {
    about: '520px',
    contact: '480px',
    experience: '580px',
  }[activeSection];

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
          animation-fill-mode: both;
        }
      `}</style>

      <div
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 flex flex-col w-full max-w-[360px] min-w-[360px] mx-auto border-2 border-gray-200 hover:border-indigo-400 hover:shadow-indigo-100"
        style={{ height: cardHeight }}
        data-aos="fade-up"
        data-aos-duration="400">
        {/* Header Section */}
        <div
          className="relative flex-shrink-0 w-full transition-all duration-500 overflow-hidden"
          style={{ height: isCompact ? '100px' : '240px' }}>
          {/* Blurred Background */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{
              backgroundImage: `url(${Feature4BgImg})`,
              filter: 'blur(40px) brightness(0.9)',
              transform: 'scale(1.2)',
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/60 via-purple-900/40 to-transparent" />

          {/* Avatar */}
          <img
            src={instructor_img}
            alt={instructor_name}
            className="absolute rounded-full shadow-2xl object-cover ring-4 ring-white transition-all duration-500 z-10"
            style={{
              width: isCompact ? '60px' : '130px',
              height: isCompact ? '60px' : '130px',
              left: isCompact ? '24px' : '50%',
              top: isCompact ? '20px' : '30px',
              transform: isCompact ? 'none' : 'translateX(-50%)',
            }}
          />

          {/* Name & Designation */}
          <div
            className="absolute transition-all duration-500 z-10"
            style={{
              left: isCompact ? '100px' : '50%',
              top: isCompact ? '32px' : '180px',
              transform: isCompact ? 'none' : 'translateX(-50%)',
              textAlign: isCompact ? 'left' : 'center',
              width: isCompact ? 'calc(100% - 120px)' : 'auto',
            }}>
            <h1
              className="font-bold text-gray-900 whitespace-nowrap transition-all duration-500 mb-1"
              style={{ fontSize: isCompact ? '18px' : '24px' }}>
              {instructor_name}
            </h1>

            <h2
              className="text-gray-600 whitespace-nowrap font-medium uppercase tracking-wider transition-all duration-500"
              style={{ fontSize: isCompact ? '10px' : '12px' }}>
              {designation}
            </h2>
          </div>

          {/* Rating Badge (Only in expanded view and if rating exists) */}
          {!isCompact && (rating || students_count) && (
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg flex items-center gap-2 animate-fadeIn z-10">
              {rating && (
                <>
                  <FaStar className="text-yellow-500 w-4 h-4" />
                  <span className="font-bold text-gray-900">{rating}</span>
                </>
              )}
              {students_count && (
                <span className="text-gray-500 text-xs">({students_count})</span>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* ABOUT */}
            {activeSection === 'about' && (
              <div className="animate-fadeIn space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900">
                      About
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {description ||
                      'Passionate language educator dedicated to helping students achieve fluency and cultural understanding.'}
                  </p>
                </div>

                {/* Stats (Only show if data exists) */}
                {(students_count || rating) && (
                  <div className="grid grid-cols-2 gap-3">
                    {students_count && (
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl text-center border border-indigo-100">
                        <div className="text-2xl font-bold text-indigo-600">
                          {students_count}+
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Students</div>
                      </div>
                    )}
                    {rating && (
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl text-center border border-orange-100">
                        <div className="text-2xl font-bold text-orange-600">{rating}</div>
                        <div className="text-xs text-gray-600 mt-1">Rating</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Social Links (Only show if links exist) */}
                {(facebook || twitter || instagram || linkedin) && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Connect
                    </div>
                    <div className="flex items-center gap-3">
                      {facebook && (
                        <SocialLink
                          href={facebook}
                          icon={FaFacebook}
                          platform="Facebook"
                        />
                      )}
                      {twitter && (
                        <SocialLink href={twitter} icon={FaTwitter} platform="Twitter" />
                      )}
                      {instagram && (
                        <SocialLink
                          href={instagram}
                          icon={FaInstagram}
                          platform="Instagram"
                        />
                      )}
                      {linkedin && (
                        <SocialLink
                          href={linkedin}
                          icon={FaLinkedin}
                          platform="LinkedIn"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* EXPERIENCE */}
            {activeSection === 'experience' && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900">
                    Teaching Experience
                  </h3>
                </div>

                {experience && experience.length > 0 ? (
                  experience.map((item, index) => (
                    <ExperienceItem
                      key={index}
                      {...item}
                      index={index}
                      year={item.year}
                      title={item.title}
                      details={item.details}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-8">
                    No experience data available
                  </p>
                )}
              </div>
            )}

            {/* CONTACT */}
            {activeSection === 'contact' && (
              <div className="animate-fadeIn space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900">
                    Contact
                  </h3>
                </div>

                <div className="space-y-2">
                  {address && (
                    <ContactInfo
                      icon={FaMapMarkerAlt}
                      text={address}
                      href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                    />
                  )}
                  {phone && (
                    <ContactInfo icon={FaPhone} text={phone} href={`tel:${phone}`} />
                  )}
                  {instructor_email && (
                    <ContactInfo
                      icon={FaEnvelope}
                      text={instructor_email}
                      href={`mailto:${instructor_email}`}
                    />
                  )}
                </div>

                {_id && (
                  <Link
                    to={`/classes/${_id}`}
                    className="block w-full mt-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    VIEW ALL CLASSES
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Tabs - Sticky at Bottom */}
          <div className="flex border-t-2 border-gray-200 bg-white shadow-lg">
            {tabs.map(tab => (
              <TabButton
                key={tab.value}
                {...tab}
                activeValue={activeSection}
                onClick={handleSectionChange}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorsPageCard;
