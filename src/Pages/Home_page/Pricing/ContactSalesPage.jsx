import { useState } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaBuilding,
  FaPaperPlane,
  FaWhatsapp,
  FaSkype,
  FaLinkedin,
  FaCheckCircle,
} from 'react-icons/fa';

export default function ContactSalesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    message: '',
    interest: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          employees: '',
          message: '',
          interest: 'general',
        });
      }, 3000);
    }, 1500);
  };

  const salesTeam = [
    {
      name: 'Sarah Johnson',
      role: 'Head of Sales',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      image: 'https://i.pravatar.cc/150?img=5',
      specialty: 'Enterprise Solutions',
    },
    {
      name: 'Michael Chen',
      role: 'Senior Sales Executive',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 234-5678',
      image: 'https://i.pravatar.cc/150?img=12',
      specialty: 'SMB & Startups',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Sales Consultant',
      email: 'emily.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      image: 'https://i.pravatar.cc/150?img=9',
      specialty: 'Custom Solutions',
    },
  ];

  const contactMethods = [
    {
      icon: FaPhone,
      title: 'Call Us',
      value: '+1 (555) 100-2000',
      description: 'Mon-Fri 9AM-6PM EST',
      color: 'from-blue-500 to-blue-600',
      action: 'tel:+15551002000',
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      value: 'sales@company.com',
      description: 'We reply within 24 hours',
      color: 'from-purple-500 to-purple-600',
      action: 'mailto:sales@company.com',
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: '+1 (555) 100-2000',
      description: 'Quick messaging',
      color: 'from-green-500 to-green-600',
      action: 'https://wa.me/15551002000',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      value: '123 Business Ave, NY 10001',
      description: 'Headquarters',
      color: 'from-red-500 to-red-600',
      action: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Grow Your Business Together
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Our expert sales team is ready to help you find the perfect solution for your
            needs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Quick Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 mb-16">
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <a
                key={i}
                href={method.action}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-indigo-600 font-semibold mb-1">{method.value}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </a>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-600">
                Fill out the form and our team will get back to you within 24 hours
              </p>
            </div>

            {isSuccess ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h3>
                <p className="text-green-700">We'll get back to you soon.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none">
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      I'm interested in
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none">
                      <option value="general">General Inquiry</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="demo">Request a Demo</option>
                      <option value="enterprise">Enterprise Solutions</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your needs..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Office Info & Sales Team */}
          <div className="space-y-8">
            {/* Office Hours */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaClock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="font-semibold">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="font-semibold">Saturday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-indigo-100">
                  🌍 We support customers globally across all time zones
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FaLinkedin, name: 'LinkedIn', color: 'bg-blue-600' },
                  { icon: FaWhatsapp, name: 'WhatsApp', color: 'bg-green-500' },
                  { icon: FaSkype, name: 'Skype', color: 'bg-blue-500' },
                  { icon: FaEnvelope, name: 'Email', color: 'bg-purple-600' },
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={i}
                      className={`${social.color} text-white p-4 rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 font-semibold`}>
                      <Icon className="w-5 h-5" />
                      {social.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">Our Promise</h3>
              </div>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>No pushy sales tactics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Free consultation & demo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Custom solutions for your needs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sales Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Meet Our Sales Team
            </h2>
            <p className="text-lg text-gray-600">
              Experienced professionals ready to help you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {salesTeam.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-100"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-semibold mb-3">{member.role}</p>
                <div className="inline-block bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {member.specialty}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center gap-2 hover:text-indigo-600 transition-colors">
                    <FaEnvelope className="w-4 h-4" />
                    {member.email}
                  </a>
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 hover:text-indigo-600 transition-colors">
                    <FaPhone className="w-4 h-4" />
                    {member.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Check out our FAQ section or schedule a call with our team to discuss your
            specific needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all">
              View FAQ
            </button>
            <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 hover:shadow-lg transition-all">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
