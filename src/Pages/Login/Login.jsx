import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import loginImg from "../../assets/login/login.jpg";
import Container from "../../Components/Container";
import SocialLogin from "../../Components/Socail/SocailLogin";
import { AuthContext } from "../../Provider/AuthProvider";
import OptimizedImage from "../../Components/Shared/OptimizedImage";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setError("");
        setIsLoading(true);

        try {
            const result = await login(data.email, data.password);
            console.log(result.user);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Successful!",
                showConfirmButton: false,
                timer: 1500,
            });

            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message || "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden">

                        {/* Left Side - Image */}
                        <div className="hidden lg:block relative overflow-hidden">

                            <OptimizedImage
                                className="w-full h-full object-cover"
                                src={loginImg}
                                alt="Login illustration"
                                //   aspectRatio="16/9"
                                width="1200"
                                height="600"


                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-600/90 flex items-center justify-center p-12">
                                <div className="text-center space-y-6">
                                    <h2 className="text-4xl font-bold text-white">
                                        Welcome Back!
                                    </h2>
                                    <p className="text-xl text-white/90">
                                        Continue your language learning journey
                                    </p>
                                    <div className="flex items-center justify-center gap-8 pt-8">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-white">10K+</div>
                                            <div className="text-sm text-white/80">Students</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-white">50+</div>
                                            <div className="text-sm text-white/80">Courses</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-white">95%</div>
                                            <div className="text-sm text-white/80">Success</div>
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
                                    Sign In
                                </h2>
                                <p className="text-gray-600">
                                    Welcome back! Please enter your details
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

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
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
                                            type={showPassword ? "text" : "password"}
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                }
                                            })}
                                            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
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

                            {/* Sign Up Link */}
                            <p className="mt-8 text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;