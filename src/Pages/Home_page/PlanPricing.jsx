import React from "react";
import Container from "../../Components/Container";
import SectionTitle from "../../Components/SectionTitle";

const planing = [
    {
        name: "Monthly",
        price: 29,
        details: "Perfect for trying out our platform"
    },
    {
        name: "Yearly",
        price: 199,
        details: "Best value for serious learners"
    },
    {
        name: "Lifetime",
        price: 499,
        details: "One-time payment, unlimited access forever"
    }
];
const PlanPricing = () => {
    return (
        <Container>
            <div className="py-20 bg-gradient-to-b from-gray-50 to-white">

                {/* Section Header */}
          
                <SectionTitle
                    variant="icon"
                    subtitle="Simple & Transparent Pricing"
                    title="Choose Your Perfect Plan"
                    gradientText="Perfect Plan"
                    summary="Select the plan that best fits your learning goals. All plans include lifetime access and certificate."
                    color="indigo"
                    size="lg"
                    icon={
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                    }
                />
                {/* Pricing Cards */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:mt-24 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
                        {planing.map((plan, index) => {
                            const isPopular = plan.name === "Yearly";
                            const colors = {
                                Yearly: {
                                    gradient: "from-orange-500 to-red-500",
                                    bg: "bg-gradient-to-br from-orange-50 to-red-50",
                                    border: "border-orange-200",
                                    button: "from-orange-600 to-red-600",
                                    badge: "bg-orange-500"
                                },
                                Monthly: {
                                    gradient: "from-blue-500 to-cyan-500",
                                    bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
                                    border: "border-blue-200",
                                    button: "from-blue-600 to-cyan-600",
                                    badge: "bg-blue-500"
                                },
                                default: {
                                    gradient: "from-indigo-500 to-purple-500",
                                    bg: "bg-gradient-to-br from-indigo-50 to-purple-50",
                                    border: "border-indigo-200",
                                    button: "from-indigo-600 to-purple-600",
                                    badge: "bg-indigo-500"
                                }
                            };

                            const color = colors[plan.name] || colors.default;

                            return (
                                <div
                                    key={index}
                                    className={`relative group ${isPopular ? 'lg:scale-105 lg:z-10' : ''}`}
                                >
                                    {/* Popular Badge */}
                                    {isPopular && (
                                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                                            <div className={`bg-gradient-to-r ${color.gradient} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2`}>
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    {/* Card */}
                                    <div className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${color.border} ${isPopular ? 'border-orange-300' : ''} group-hover:-translate-y-2`}>

                                        {/* Decorative Background */}
                                        <div className={`absolute top-0 left-0 right-0 h-40 ${color.bg} opacity-50`}></div>

                                        {/* Content */}
                                        <div className="relative p-8 space-y-6">

                                            {/* Plan Name */}
                                            <div className="text-center space-y-2">
                                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${color.gradient} text-white shadow-lg`}>
                                                    {plan.name === "Yearly" ? (
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                                                    {plan.name}
                                                </h3>
                                            </div>

                                            {/* Price */}
                                            <div className="text-center py-6">
                                                <div className="flex items-start justify-center gap-1">
                                                    <span className="text-3xl font-bold text-gray-900 mt-2">$</span>
                                                    <span className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                                        {plan.price}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mt-2 text-lg">
                                                    {plan.name === "Yearly" ? "per year" : "per month"}
                                                </p>
                                                {plan.name === "Yearly" && (
                                                    <div className="mt-3 inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        Save 40%
                                                    </div>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <p className="text-center text-gray-600 text-base px-4">
                                                {plan.details}
                                            </p>

                                            {/* Features */}
                                            <div className="space-y-3 pt-4">
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.gradient} flex items-center justify-center flex-shrink-0`}>
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm">Access to all courses</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.gradient} flex items-center justify-center flex-shrink-0`}>
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm">Lifetime updates</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.gradient} flex items-center justify-center flex-shrink-0`}>
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm">Certificate of completion</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.gradient} flex items-center justify-center flex-shrink-0`}>
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm">Priority support</span>
                                                </div>
                                                {plan.name === "Yearly" && (
                                                    <div className="flex items-center gap-3 text-gray-700">
                                                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.gradient} flex items-center justify-center flex-shrink-0`}>
                                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm font-semibold text-orange-600">1-on-1 mentorship</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* CTA Button */}
                                            <button className={`w-full mt-8 py-4 bg-gradient-to-r ${color.button} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn`}>
                                                Choose {plan.name}
                                                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Corner Decoration */}
                                        <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${color.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="text-center mt-16 space-y-6">
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>No hidden fees</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Cancel anytime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>30-day money back</span>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Have questions? <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold underline">Contact our sales team</a>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default PlanPricing;
