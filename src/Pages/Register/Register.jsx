import { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaImage } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Container from '../../Components/Container';
import SocialLogin from '../../Components/Socail/SocailLogin';
import { AuthContext } from '../../Provider/AuthProvider';
import { SubmitButton } from '../../Components/ui/Button';
import { getApiUrl } from '../../config/api/Config';

const Register = () => {
  const { registration, userUpdating } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = getApiUrl();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async data => {
    setError('');
    setIsLoading(true);

    try {
      // Step 1: Create Firebase account
      const result = await registration(data.email, data.password);

      if (!result || !result.user) {
        throw new Error('Failed to create account');
      }

     // Step 2: Update user profile
      await userUpdating(data.name, data.photoURL);
      // Step 3: Save user to database
      const savedUser = {
        name: data.name,
        email: data.email,
        PhotoURL: data.photoURL,
        role: 'student', // Default role
        createdAt: new Date().toISOString(),
      };

   
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(savedUser),
        });


        if (!response.ok) {
          throw new Error(`Database save failed: ${response.statusText}`);
        }

        const responseData = await response.json();

        // Success - show message and redirect
        await Swal.fire({
          icon: 'success',
          title: 'Welcome! 🎉',
          html: `
            <p class="text-lg mb-2">Account Created Successfully!</p>
            <p class="text-sm text-gray-600">You can now access all features</p>
          `,
          showConfirmButton: true,
          confirmButtonColor: '#4f46e5',
          confirmButtonText: 'Get Started',
          timer: 3000,
          timerProgressBar: true,
        });

        navigate(from, { replace: true });
      } catch (dbError) {

        console.log(
          '⚠️ Backend server not running! User created in Firebase but not saved to database.'
        );

        // Firebase account is created, so redirect anyway
        await Swal.fire({
          icon: 'success',
          title: 'Account Created! ✅',
          html: `
            <p class="text-lg mb-2 text-green-600">Your account was created successfully!</p>
            <p class="text-sm text-gray-600 mb-2">You can now login and use the platform.</p>
            <p class="text-xs text-yellow-600">⚠️ Note: Profile data will sync when backend is available.</p>
          `,
          confirmButtonColor: '#4f46e5',
          confirmButtonText: 'Continue to Login',
          showCancelButton: false,
        });

        // Still redirect to home/dashboard
        navigate(from, { replace: true });
      }
    } catch (error) {
   

      // Handle specific Firebase errors
      let errorMessage = 'Failed to create account. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please login instead.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address. Please check and try again.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
        confirmButtonColor: '#4f46e5',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Left Side - Info Panel */}
            <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-indigo-600 to-purple-600">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white">Join Our Community</h2>
                <p className="text-xl text-white/90">
                  Start your language learning journey today
                </p>
                <div className="space-y-4 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Access Premium Features
                      </h3>
                      <p className="text-white/80">
                        Unlock all courses and learning materials
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Track Your Progress
                      </h3>
                      <p className="text-white/80">Monitor your learning achievements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Join the Community
                      </h3>
                      <p className="text-white/80">
                        Connect with fellow learners worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center p-8 sm:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">Sign up to get started - it's free!</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                        maxLength: {
                          value: 50,
                          message: 'Name must not exceed 50 characters',
                        },
                      })}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg outline-none transition-all ${
                        errors.name
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg outline-none transition-all ${
                        errors.email
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                        pattern: {
                          value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/,
                          message:
                            'Password must contain 1 uppercase, 1 lowercase, and 1 number',
                        },
                      })}
                      className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg outline-none transition-all ${
                        errors.password
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.password.message}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Must be 6+ characters with uppercase, lowercase, and number
                  </p>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword2 ? 'text' : 'password'}
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value =>
                          value === password.current || 'Passwords do not match',
                      })}
                      className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg outline-none transition-all ${
                        errors.confirmPassword
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword2 ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Photo URL Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Photo URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaImage className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      {...register('photoURL', {
                        required: 'Photo URL is required',
                        pattern: {
                          // value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i,
                          message:
                            'Please enter a valid image URL (jpg, png, webp, gif, svg)',
                        },
                      })}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg outline-none transition-all ${
                        errors.photoURL
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                      }`}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  {errors.photoURL && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.photoURL.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <SubmitButton
                  text="Create Account"
                  loadingText="Creating account..."
                  isLoading={isLoading}
                  className="rounded-lg"
                  variant="gradient"
                  loadingIcon={
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  }
                />
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <SocialLogin />

              {/* Login Link */}
              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
