import { useState } from "react";
import Feature4BgImg from "../../assets/features/feature4_bg.png";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const InstructorsPageCard = ({ instructor }) => {
    const [activeSection, setActiveSection] = useState("about");


    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const isActive = activeSection !== "about";

    return (
        <div
            className="relative bg-white rounded-xl shadow-[0_0_0_8px_rgba(255,255,255,0.2)] overflow-y-auto overflow-x-hidden transition-all duration-300 flex flex-col max-w-[340px] mx-auto hover  hover:border-indigo-500"
            style={{
                height: activeSection === "about" ? "450px" :
                    activeSection === "contact" ? "430px" : "550px"
            }}
            data-aos="zoom-in"
            data-aos-delay="200"
        >
            {/* Header */}
            <div
                className="relative flex flex-shrink-0 w-full transition-all duration-300"
                style={{ height: isActive ? "80px" : "200px" }}
            >
                {/* Cover Image with Blur */}
                <div
                    className="absolute w-full bg-cover bg-center transition-all duration-500"
                    style={{
                        backgroundImage: `url(${Feature4BgImg})`,
                        filter: "blur(30px)",
                        transform: "scale(1.2)",
                        height: isActive ? "100px" : "160px",
                        top: isActive ? "-50px" : "-20%"
                    }}
                />

                {/* Avatar */}
                <img
                    className="absolute rounded-full shadow-[0_8px_8px_rgba(0,0,0,0.2)] object-cover transition-all duration-300"
                    style={{
                        width: isActive ? "50px" : "100px",
                        height: isActive ? "50px" : "100px",
                        left: isActive ? "20px" : "50%",
                        bottom: isActive ? "10px" : "0",
                        transform: isActive ? "none" : "translateX(-50%) translateY(-64px)"
                    }}
                    src={instructor.instructor_img}
                    alt={instructor.instructor_name}
                />
                <div className=" ">
                    {/* Name */}
                    <h1
                        className="absolute bottom-0 font-bold text-center whitespace-nowrap transition-all duration-300"
                        style={{
                            fontSize: isActive ? "19px" : "22px",
                            left: isActive ? "86px" : "50%",
                            transform: isActive ? "translateY(-18px)" : "translateX(-50%) translateY(-10px)"
                        }}
                    >
                        {instructor.instructor_name}
                    </h1>

                    {/* Job Title */}
                    <h2
                        className="absolute bottom-0 top-[90%] text-slate-900 whitespace-nowrap font-medium opacity-70 uppercase m-0 transition-all duration-300"
                        style={{
                            fontSize: isActive ? "10px" : "11px",
                            letterSpacing: isActive ? "1px" : "1.5px",
                            left: isActive ? "86px" : "50%",
                            transform: isActive ? "translateY(-16px)" : "translateX(-50%) translateY(-7px)"
                        }}
                    >
                        Language Instructor
                    </h2>
                </div>

            </div>

            {/* Main Content */}
            <div className="relative flex-1 flex flex-col" style={{ paddingTop: "10px" }}>
                {/* About Section */}
                <div className={`${activeSection === "about" ? "block animate-fadeIn" : "hidden"}`}>
                    <div className="p-5">
                        <div className="font-bold text-[13px] mb-2">ABOUT</div>
                        <p className="leading-relaxed text-gray-600 text-[14px] m-0 font-normal">
                            {instructor?.description || "Passionate language educator dedicated to helping students achieve fluency and cultural understanding."}
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center px-5 mb-8">
                        <a href="#" className="h-8 w-8 rounded-full inline-flex items-center justify-center transition-all duration-300 bg-blue-50 hover:bg-blue-100 mr-2.5">
                            <FaFacebook className="fill-[#a5b5ce] w-4 transition-all duration-300 hover:fill-[#637faa]" />
                        </a>
                        <a href="#" className="h-8 w-8 rounded-full inline-flex items-center justify-center transition-all duration-300 bg-blue-50 hover:bg-blue-100 mr-2.5">
                            <FaTwitter className="fill-[#a5b5ce] w-4 transition-all duration-300 hover:fill-[#637faa]" />
                        </a>
                        <a href="#" className="h-8 w-8 rounded-full inline-flex items-center justify-center transition-all duration-300 bg-blue-50 hover:bg-blue-100 mr-2.5">
                            <FaInstagram className="fill-[#a5b5ce] w-4 transition-all duration-300 hover:fill-[#637faa]" />
                        </a>
                        <a href="#" className="h-8 w-8 rounded-full inline-flex items-center justify-center transition-all duration-300 bg-blue-50 hover:bg-blue-100">
                            <FaLinkedin className="fill-[#a5b5ce] w-4 transition-all duration-300 hover:fill-[#637faa]" />
                        </a>
                    </div>
                </div>

                {/* Experience Section */}
                <div className={`${activeSection === "experience" ? "block animate-fadeIn" : "hidden"}`}>
                    <div className="p-5">
                        <div className="font-bold text-[13px] mb-2">TEACHING EXPERIENCE</div>

                        <div className="mt-8 relative">
                            {/* Timeline Line */}
                            <div className="absolute left-[42px] w-0.5 top-0 h-full bg-gradient-to-t from-transparent to-[#516acc]" />

                            {/* Timeline Items */}
                            <div className="relative pl-[60px] pr-5 pb-8 z-10">
                                <div className="absolute top-0 left-[37px] w-2 h-2 border-2 border-white rounded-full bg-gradient-to-b from-[#a0aee3] to-[#516acc]">
                                    <span className="absolute text-[11px] text-gray-500/70 -left-9 top-0">2023</span>
                                </div>
                                <div className="font-medium text-[14px] mb-1.5">Senior Language Instructor</div>
                                <div className="text-[13px] text-gray-600 leading-relaxed">
                                    Teaching advanced language courses and developing curriculum for intermediate students.
                                </div>
                            </div>

                            <div className="relative pl-[60px] pr-5 pb-8 z-10">
                                <div className="absolute top-0 left-[37px] w-2 h-2 border-2 border-white rounded-full bg-gradient-to-b from-[#a0aee3] to-[#516acc]">
                                    <span className="absolute text-[11px] text-gray-500/70 -left-9 top-0">2022</span>
                                </div>
                                <div className="font-medium text-[14px] mb-1.5">Course Developer</div>
                                <div className="text-[13px] text-gray-600 leading-relaxed">
                                    Created engaging learning materials and interactive lessons for online platforms.
                                </div>
                            </div>

                            <div className="relative pl-[60px] pr-5 pb-1.5 z-10">
                                <div className="absolute top-0 left-[37px] w-2 h-2 border-2 border-white rounded-full bg-gradient-to-b from-[#a0aee3] to-[#516acc]">
                                    <span className="absolute text-[11px] text-gray-500/70 -left-9 top-0">2021</span>
                                </div>
                                <div className="font-medium text-[14px] mb-1.5">Language Tutor</div>
                                <div className="text-[13px] text-gray-600 leading-relaxed">
                                    Provided one-on-one tutoring sessions for beginner and intermediate students.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className={`${activeSection === "contact" ? "block animate-fadeIn" : "hidden"}`}>
                    <div className="p-5">
                        <div className="font-bold text-[13px] mb-2">CONTACT</div>

                        <div className="mt-5">
                            <div className="flex items-center text-[13px] text-gray-600 leading-relaxed cursor-pointer mb-4">
                                <FaMapMarkerAlt className="flex-shrink-0 w-[30px] min-h-[34px] mr-3 pr-3 border-r border-gray-200 transition-all duration-300" />
                                <span>Language Learning Center, Building A</span>
                            </div>

                            <div className="flex items-center text-[13px] text-gray-600 leading-relaxed cursor-pointer mb-4">
                                <FaPhone className="flex-shrink-0 w-[30px] min-h-[34px] mr-3 pr-3 border-r border-gray-200 transition-all duration-300" />
                                <span>(123) 456-7890</span>
                            </div>

                            <div className="flex items-center text-[13px] text-gray-600 leading-relaxed cursor-pointer mb-4">
                                <FaEnvelope className="flex-shrink-0 w-[30px] min-h-[34px] mr-3 pr-3 border-r border-gray-200 transition-all duration-300" />
                                <span>{instructor?.instructor_email}</span>
                            </div>

                            <Link
                                to={`/classes/${instructor._id}`}
                                className="block border-0 outline-none bg-gradient-to-r from-[rgba(83,200,239,0.8)] to-[rgba(81,106,204,0.8)] shadow-[0_4px_6px_rgba(0,0,0,0.15)] text-white py-3 px-4 w-full rounded-md mt-6 cursor-pointer text-[14px] font-medium text-center transition-all duration-300 hover:shadow-lg"
                            >
                                VIEW CLASSES
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex bg-white mt-auto sticky bottom-0 left-0">
                    <button
                        onClick={() => handleSectionChange("about")}
                        className={`flex-1 select-none bg-transparent text-[13px] border-0 py-[15px] px-1.5 cursor-pointer transition-all duration-300 font-medium outline-none border-b-[3px] ${activeSection === "about"
                            ? "text-[#2b2c48] border-b-[#8a84ff] bg-gradient-to-b from-transparent via-[rgba(207,204,255,0.2)] to-[rgba(211,226,255,0.4)]"
                            : "text-[#5c5c6d] border-transparent hover:text-[#2b2c48] hover:border-b-[#8a84ff] hover:bg-gradient-to-b hover:from-transparent hover:via-[rgba(207,204,255,0.2)] hover:to-[rgba(211,226,255,0.4)]"
                            }`}
                    >
                        ABOUT
                    </button>
                    <button
                        onClick={() => handleSectionChange("experience")}
                        className={`flex-1 select-none bg-transparent text-[13px] border-0 py-[15px] px-1.5 cursor-pointer transition-all duration-300 font-medium outline-none border-b-[3px] ${activeSection === "experience"
                            ? "text-[#2b2c48] border-b-[#8a84ff] bg-gradient-to-b from-transparent via-[rgba(207,204,255,0.2)] to-[rgba(211,226,255,0.4)]"
                            : "text-[#5c5c6d] border-transparent hover:text-[#2b2c48] hover:border-b-[#8a84ff] hover:bg-gradient-to-b hover:from-transparent hover:via-[rgba(207,204,255,0.2)] hover:to-[rgba(211,226,255,0.4)]"
                            }`}
                    >
                        EXPERIENCE
                    </button>
                    <button
                        onClick={() => handleSectionChange("contact")}
                        className={`flex-1 select-none bg-transparent text-[13px] border-0 py-[15px] px-1.5 cursor-pointer transition-all duration-300 font-medium outline-none border-b-[3px] ${activeSection === "contact"
                            ? "text-[#2b2c48] border-b-[#8a84ff] bg-gradient-to-b from-transparent via-[rgba(207,204,255,0.2)] to-[rgba(211,226,255,0.4)]"
                            : "text-[#5c5c6d] border-transparent hover:text-[#2b2c48] hover:border-b-[#8a84ff] hover:bg-gradient-to-b hover:from-transparent hover:via-[rgba(207,204,255,0.2)] hover:to-[rgba(211,226,255,0.4)]"
                            }`}
                    >
                        CONTACT
                    </button>
                </div>
            </div>

            {/* Add fadeIn animation */}
            <style>{`
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s both;
                }
            `}</style>
        </div>
    );
};

export default InstructorsPageCard;