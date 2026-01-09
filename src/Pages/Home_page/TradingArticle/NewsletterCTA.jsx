import { useState } from 'react';
import { FaCheckCircle, FaEnvelope, FaTimes } from 'react-icons/fa';
import { SubmitButton } from '../../../Components/ui/Button';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    setError('');

    // Validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - Replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would typically make an API call like:
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // Save to localStorage as backup (optional)
      const subscribers = JSON.parse(
        localStorage.getItem('newsletterSubscribers') || '[]'
      );
      subscribers.push({
        email,
        subscribedAt: new Date().toISOString(),
      });
      localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));

      setIsSuccess(true);
      setEmail('');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="bg-gradient-to-r from-gray-950 via-slate-500 to-pink-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-6">
          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-500 text-white px-6 py-4 rounded-2xl flex items-center justify-between max-w-md mx-auto animate-slideDown shadow-xl">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6" />
                <span className="font-semibold">
                  Successfully subscribed to our newsletter!
                </span>
              </div>
              <button
                onClick={() => setIsSuccess(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors">
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaEnvelope className="w-6 h-6 text-white" />
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Never Miss an Update
          </h3>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest articles delivered straight to
            your inbox
          </p>

          {/* Newsletter Input */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  className={`w-full px-6 py-4 rounded-full border-2 ${
                    error ? 'border-red-400' : 'border-white/20'
                  } bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors`}
                  disabled={isSubmitting}
                />
              </div>
              <SubmitButton
                onClick={handleSubmit}
                isLoading={isSubmitting}
                width={false}
                text="Subscribe"
                loadingText="Subscribing..."
                variant="white"
                className="px-8 py-4  rounded-full hover:bg-gray-100 "
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-3 text-red-300 text-sm bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                {error}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <span>Join 10,000+ subscribers</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <span>No spam, unsubscribe anytime</span>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-white/50 text-xs max-w-lg mx-auto">
            By subscribing, you agree to our Privacy Policy and consent to receive updates
            from our company.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
