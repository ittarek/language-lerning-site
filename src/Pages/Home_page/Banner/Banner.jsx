// import bgImage from "../../../assets/slider/slider-4.png";

// const Banner = () => {
//     return (
//         <div className=" mt-[70px] relative overflow-hidden rounded-lg">
//             {/* Background Image with Overlay */}
//             <div
//                 className="absolute inset-0 bg-cover bg-center bg-no-repeat h-100vh rounded"
//                 style={{ backgroundImage: `url(${bgImage})` }}
//             >
//                 {/* Dark overlay for better text readability */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/60 to-pink-900/60"></div>
//             </div>

//             {/* Animated decorative shapes */}
//             <div className="absolute inset-0 pointer-events-none">
//                 <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
//                 <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//             </div>

//             {/* Main Content Container */}
//             <div className="relative w-full  mx-auto px-4 sm:px-6 lg:px-8  py-16 lg:py-20">
//                 <div className="flex flex-col md:flex-row justify-between items-center">

//                     {/* Left Content */}
//                     <div className="text-left space-y-4 sm:space-y-6 order-2 lg:order-1">
//                         {/* Badge */}
//                         <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-white/30">
//                             <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
//                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
//                                 <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-yellow-400"></span>
//                             </span>
//                             <span className="text-white text-xs sm:text-sm font-semibold">10,000+ Active Learners</span>
//                         </div>

//                         {/* Heading */}
//                         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
//                             Mastering Your Guide to
//                             <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-2">
//                                 Language Learning
//                             </span>
//                         </h1>

//                         {/* Description */}
//                         <p className="text-base sm:text-lg text-white/90 leading-relaxed">
//                             Our interactive and engaging classes will inspire and challenge you.
//                             With our user-friendly platform and supportive community, you'll embark
//                             on a fulfilling educational adventure. Join us today and unlock your full potential!
//                         </p>

//                         {/* Stats */}
//                         <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 py-4">
//                             <div>
//                                 <div className="text-2xl sm:text-3xl font-bold text-white">50+</div>
//                                 <div className="text-xs sm:text-sm text-white/80">Courses</div>
//                             </div>
//                             <div className="border-l border-white/30 pl-4 sm:pl-6 lg:pl-8">
//                                 <div className="text-2xl sm:text-3xl font-bold text-white">20+</div>
//                                 <div className="text-xs sm:text-sm text-white/80">Instructors</div>
//                             </div>
//                             <div className="border-l border-white/30 pl-4 sm:pl-6 lg:pl-8">
//                                 <div className="text-2xl sm:text-3xl font-bold text-white">95%</div>
//                                 <div className="text-xs sm:text-sm text-white/80">Success Rate</div>
//                             </div>
//                         </div>

//                         {/* CTA Buttons */}
//                         <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 ">
//                             <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
//                                 Get Started
//                                 <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                                 </svg>
//                             </button>
//                             <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-base sm:text-lg border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300">
//                                 Browse Courses
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Image */}
//                     <div className="relative order-1 lg:order-2">
//                         {/* Decorative elements - hidden on mobile */}
//                         <div className="hidden md:block absolute -top-6 -right-6 w-48 h-48 lg:w-72 lg:h-72 bg-yellow-400/10 rounded-full blur-2xl"></div>
//                         <div className="hidden md:block absolute -bottom-6 -left-6 w-48 h-48 lg:w-72 lg:h-72 bg-pink-400/10 rounded-full blur-2xl"></div>

//                         {/* Main image */}
//                         <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20 backdrop-blur-sm">
//                             <img
//                                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
//                                 alt="Language Learning"
//                                 className="w-full h-auto object-cover"
//                             />

//                             {/* Floating badge on image */}
//                             <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl animate-bounce-slow">
//                                 <div className="flex items-center gap-2 sm:gap-3">
//                                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                                         <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
//                                         <div className="text-xl sm:text-2xl font-bold text-gray-900">95%</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom wave decoration */}
//             <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 ">
//                 <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//                     <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 24C1200 27 1320 37 1380 42.7L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white" fillOpacity="0.1" />
//                 </svg>
//             </div>

//             <style>{`
//                 @keyframes bounce-slow {
//                     0%, 100% {
//                         transform: translateY(0);
//                     }
//                     50% {
//                         transform: translateY(-10px);
//                     }
//                 }
//                 .animate-bounce-slow {
//                     animation: bounce-slow 3s ease-in-out infinite;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Banner;


import bgImage from "../../../assets/slider/slider-4.png";

const Banner = () => {
    return (
        <div className="mt-[70px] relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/60 to-pink-900/60"></div>
            </div>

            {/* Animated decorative shapes */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content Container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Left Content */}
                    <div className="text-left space-y-4 sm:space-y-6 order-2 lg:order-1">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-white/30">
                            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-yellow-400"></span>
                            </span>
                            <span className="text-white text-xs sm:text-sm font-semibold">10,000+ Active Learners</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                            Mastering Your Guide to
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-2">
                                Language Learning
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
                            Our interactive and engaging classes will inspire and challenge you.
                            With our user-friendly platform and supportive community, you'll embark
                            on a fulfilling educational adventure. Join us today and unlock your full potential!
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 py-4">
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-white">50+</div>
                                <div className="text-xs sm:text-sm text-white/80">Courses</div>
                            </div>
                            <div className="border-l border-white/30 pl-4 sm:pl-6 lg:pl-8">
                                <div className="text-2xl sm:text-3xl font-bold text-white">20+</div>
                                <div className="text-xs sm:text-sm text-white/80">Instructors</div>
                            </div>
                            <div className="border-l border-white/30 pl-4 sm:pl-6 lg:pl-8">
                                <div className="text-2xl sm:text-3xl font-bold text-white">95%</div>
                                <div className="text-xs sm:text-sm text-white/80">Success Rate</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                            <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                Get Started
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-base sm:text-lg border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                                Browse Courses
                            </button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative order-1 lg:order-2">
                        {/* Decorative elements - hidden on mobile */}
                        <div className="hidden md:block absolute -top-6 -right-6 w-48 h-48 lg:w-72 lg:h-72 bg-yellow-400/10 rounded-full blur-2xl"></div>
                        <div className="hidden md:block absolute -bottom-6 -left-6 w-48 h-48 lg:w-72 lg:h-72 bg-pink-400/10 rounded-full blur-2xl"></div>

                        {/* Main image */}
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20 backdrop-blur-sm">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
                                alt="Language Learning"
                                className="w-full h-auto object-cover"
                            />

                            {/* Floating badge on image */}
                            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl animate-bounce-slow">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
                                        <div className="text-xl sm:text-2xl font-bold text-gray-900">95%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 24C1200 27 1320 37 1380 42.7L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white" fillOpacity="0.1" />
                </svg>
            </div>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Banner;