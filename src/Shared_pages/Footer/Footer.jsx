import { useState } from 'react';
import { MoveToTop } from '../../Components/MoveToTop';
import Newsletter from './NewsLatter/NewsLatter';
import { useLocation } from 'react-router-dom';






const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const pathName = location.pathname === '/';

    
    const footerLinks = {
        courses: [
            { name: 'Spanish Courses', href: '#' },
            { name: 'English Courses', href: '#' },
            { name: 'French Courses', href: '#' },
            { name: 'German Courses', href: '#' },
            { name: 'All Languages', href: '#' },
        ],
        company: [
            { name: 'About Us', href: '#' },
            { name: 'Our Team', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Press Kit', href: '#' },
            { name: 'Contact', href: '#' },
        ],
        support: [
            { name: 'Help Center', href: '#' },
            { name: 'Student Portal', href: '#' },
            { name: 'Instructor Portal', href: '#' },
            { name: 'Community', href: '#' },
            { name: 'FAQs', href: '#' },
        ],
        legal: [
            { name: 'Terms of Service', href: '#' },
            { name: 'Privacy Policy', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'Refund Policy', href: '#' },
        ],
    };

    const socialLinks = [
        {
            name: 'Facebook',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            href: '#',
        },
        {
            name: 'Twitter',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
            href: '#',
        },
        {
            name: 'Instagram',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            href: '#',
        },
        {
            name: 'LinkedIn',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
            href: '#',
        },
        {
            name: 'YouTube',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            ),
            href: '#',
        },
    ];

    return (
        <div className="relative">
            <MoveToTop />
            {pathName && <Newsletter />}

            {/* Main Footer */}
            <footer className="bg-black text-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                        {/* Brand Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                    Language Center
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Empowering learners worldwide with innovative language education.
                                    Master any language with expert instructors and cutting-edge learning methods.
                                </p>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                                <div className="flex gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* App Download */}
                            <div className="space-y-3">
                                <h4 className="text-white font-semibold">Download Our App</h4>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                        </svg>
                                        <div className="text-left">
                                            <div className="text-xs text-gray-400">Download on the</div>
                                            <div className="text-sm font-semibold">App Store</div>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                        </svg>
                                        <div className="text-left">
                                            <div className="text-xs text-gray-400">Get it on</div>
                                            <div className="text-sm font-semibold">Google Play</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Courses */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Popular Courses</h4>
                            <ul className="space-y-3">
                                {footerLinks.courses.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group">
                                            <svg className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Company</h4>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group">
                                            <svg className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support & Legal */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Support & Legal</h4>
                            <ul className="space-y-3">
                                {[...footerLinks.support.slice(0, 3), ...footerLinks.legal.slice(0, 2)].map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group">
                                            <svg className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400 text-sm text-center md:text-left">
                                © {currentYear} Language Center. All rights reserved. Made with ❤️ for learners worldwide.
                            </p>
                            <div className="flex items-center gap-6 text-sm">
                                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                                    Terms
                                </a>
                                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                                    Privacy
                                </a>
                                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                                    Cookies
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;