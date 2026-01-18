import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ContactSection = ({ address, phone, instructor_email, _id, ContactInfo }) => {

  
  return (
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
        {phone && <ContactInfo icon={FaPhone} text={phone} href={`tel:${phone}`} />}
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
  );
};
