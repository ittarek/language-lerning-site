import { FaCalendar, FaVideo, FaGlobe } from 'react-icons/fa';

// Gradient Section Header Component
export const GradientSectionHeader = ({ title, description, badges = [] }) => (
  <div className="max-w-7xl mx-auto section-header-gradient">
    <div className="text-center mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
      <p className="text-xl text-white/90 mb-8">{description}</p>
      {badges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 text-white">
          {badges.map((badge, index) => (
            <div key={index} className="badge-white">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// Example usage for Events page
export const EventsSectionHeader = ({ eventsCount }) => (
  <GradientSectionHeader
    title="Language Learning Events"
    description="Join our community events, workshops, and practice sessions to accelerate your language learning journey"
    badges={[
      { icon: <FaCalendar />, text: `${eventsCount} Events` },
      { icon: <FaVideo />, text: 'Virtual & In-Person' },
      { icon: <FaGlobe />, text: 'All Languages' },
    ]}
  />
);
