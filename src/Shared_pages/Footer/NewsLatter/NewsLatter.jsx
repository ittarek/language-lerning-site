
// const NewsLatter = () => {
//     return (

import { useState } from "react";

//         <div className="newsletter bg-[#17bf9e] w-full md:w-[850px]  -mb-8 relative mx-auto md:p-[60px] p-[10px] rounded-[16px]">
//             <div className="text-center">
//                 <h2 className="mb-4">Subscribe Our Newsletter</h2>
//                 <div className="subscribe md:w-[45%] w-full bg-[#fff] rounded-[50px] mx-auto py-[7px] px-[10px]">
//                     <input className='border-0 outline-none ' type="text" placeholder="Email" />
//                     <button className="btn">Subscribe</button>
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default NewsLatter;

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 w-full md:w-[850px]  -mb-8 relative mx-auto md:p-[60px] p-[10px] rounded-[16px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                        Stay Updated with Our Latest Courses
                    </h3>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                        Subscribe to our newsletter and get exclusive access to new courses, special offers, and learning tips
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
                        />
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Subscribe
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-white/70 text-sm">
                        Join 10,000+ subscribers. No spam, unsubscribe anytime.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Newsletter;