import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
export const ActiveSection = ({
  description,
  students_count,
  rating,
  facebook,
  twitter,
  instagram,
  linkedin,
}) => {
  return (
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
              <div className="text-2xl font-bold text-indigo-600">{students_count}+</div>
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
              <SocialLink href={facebook} icon={FaFacebook} platform="Facebook" />
            )}
            {twitter && <SocialLink href={twitter} icon={FaTwitter} platform="Twitter" />}
            {instagram && (
              <SocialLink href={instagram} icon={FaInstagram} platform="Instagram" />
            )}
            {linkedin && (
              <SocialLink href={linkedin} icon={FaLinkedin} platform="LinkedIn" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
