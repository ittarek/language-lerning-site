import { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            console.log('Newsletter signup:', email);
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <div className="w-full py-8 px-4 sm:px-6 lg:px-8  -mb-16 relative">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-gray-950 via-slate-500 to-pink-900  rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                    <div className="text-center space-y-4 sm:space-y-6">
                        {/* Heading */}
                        <div className="space-y-2 sm:space-y-3">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                                Stay Updated with Our Latest Courses
                            </h3>
                            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
                                Subscribe to our newsletter and get exclusive access to new courses, special offers, and learning tips
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                {/* Email Input */}
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                                />

                                {/* Subscribe Button */}
                                <button
                                    type="submit"
                                    disabled={isSubscribed}
                                    className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap ${isSubscribed
                                            ? 'bg-green-500 text-white cursor-not-allowed'
                                            : 'bg-white text-indigo-600 hover:bg-gray-100 hover:shadow-xl hover:scale-105'
                                        }`}
                                >
                                    {isSubscribed ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Subscribed!
                                        </>
                                    ) : (
                                        <>
                                            Subscribe
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Privacy Text */}
                        <p className="text-white/70 text-xs sm:text-sm">
                            Join 10,000+ subscribers. No spam, unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;