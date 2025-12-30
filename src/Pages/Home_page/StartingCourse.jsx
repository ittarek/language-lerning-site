import Container from "../../Components/Container";
import SectionTitle from "../../Components/SectionTitle";

const courseData = [
    {
        id: 1,
        name: "Language",
        title: "Principles of Written English, Part 2",
        img: "https://images.unsplash.com/photo-1555431189-0fabf2667795?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        price: 40,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 2,
        name: "Computer",
        title: "Introduction to Computer Science",
        img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        price: 100,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 3,
        name: "Medicine",
        title: "Introduction to Biomedical Imaging",
        img: "https://images.unsplash.com/photo-1614294168453-84a363686839?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 400,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 4,
        name: "Marketing",
        title: "Entrepreneurship 101: Who is your customer?",
        img: "https://plus.unsplash.com/premium_photo-1661414415246-3e502e2fb241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 40,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 5,
        name: "Social",
        title: "Principles of Written Social, Part 2",
        img: "https://plus.unsplash.com/premium_photo-1678914045640-55a120a8f849?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: "Free",
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 6,
        name: "Digital Marketing",
        title: "Principles of Digital Marketing, Part 2",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
        price: 40,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
];
const StartingCourse = () => {
    return (
        <Container>
            <div className="py-16 bg-gradient-to-b from-white to-gray-50">

                {/* Section Header */}
        
                <SectionTitle
                    variant="animated-badge"
                    subtitle="Coming Soon"
                    title="Course Starting Soon"
                    gradientText="Soon"
                    summary="Don't miss out! Register early and get exclusive access to our upcoming courses"
                    color="indigo"
                    size="lg"
                />

                {/* Course Cards Grid */}
                <div className="max-w-xlg    mx-auto px-4 sm:px-6 ">
                    <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {courseData.map((course, id) => (
                            <div
                                key={id}
                                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-3"
                            >

                                {/* "Starting Soon" Badge */}
                                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                    Starting Soon
                                </div>

                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.img}
                                        alt={course.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Price Badge */}
                                    <div className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xl shadow-lg">
                                        ${course.price}
                                    </div>

                                    {/* Hover Details Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
                                        <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-white text-sm leading-relaxed backdrop-blur-sm bg-black/40 p-3 rounded-xl line-clamp-3">
                                                {course.details}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 space-y-4">

                                    {/* Course Title */}
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 min-h-[56px]">
                                        {course.name}
                                    </h3>

                                    {/* Course Info */}
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-semibold">Starts in 7 days</span>
                                        </div>

                                        <div className="flex items-center gap-1 text-orange-600">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-semibold">Limited Slots</span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Certificate
                                        </span>
                                        <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg">
                                            8 Weeks
                                        </span>
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                                            Beginner
                                        </span>
                                    </div>

                                    {/* Progress Bar - Seats Filling */}
                                    <div className="pt-2">
                                        <div className="flex justify-between text-xs text-gray-600 mb-2">
                                            <span className="font-semibold">Seats Filling Fast</span>
                                            <span className="text-orange-600 font-bold">75% Booked</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4 text-sm ">
                                        <button className="flex-1 p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/50 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                            Notify Me
                                        </button>
                                        <button className="p-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300">
                                            Learn More
                                        </button>
                                    </div>
                                </div>

                                {/* Corner Decoration */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 hidden">
                    <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300">
                        View All Upcoming Courses →
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default StartingCourse;
