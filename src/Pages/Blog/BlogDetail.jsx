import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FaCalendar,
    FaUser,
    FaClock,
    FaArrowLeft,
    FaShare,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaBookOpen,
    FaGraduationCap,
    FaGlobe,
    FaLightbulb,
    FaSearch
} from 'react-icons/fa';
import { blogPosts } from './blogPosts';

const BlogDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);



    // Get post from location state or find in array
    const [post, setPost] = useState(location.state?.post || null);

    useEffect(() => {
        if (!post) {
            const foundPost = blogPosts.find(p => p.id === parseInt(id));
            if (foundPost) {
                setPost(foundPost);
            } else {
                navigate('/blog');
            }
        }
    }, [id, post, navigate]);

    // Handle scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Share functionality
    const handleShare = (platform) => {
        const url = window.location.href;
        const text = post?.title || '';

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    // Related posts (excluding current post)
    const relatedPosts = blogPosts
        .filter(p => p.id !== post?.id && p.category === post?.category)
        .slice(0, 3);

    const categoryIcons = {
        'Learning Tips': <FaLightbulb />,
        'Research': <FaBookOpen />,
        'Methods': <FaGraduationCap />,
        'Culture': <FaGlobe />,
        'Technology': <FaSearch />,
        'Motivation': <FaLightbulb />
    };

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Helmet>
                <title>{post.title} | Language Learner Blog</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                <div
                    className="h-full bg-gradient-to-r from-gray-950 via-purple-800 to-gray-900   transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-950 via-purple-800 to-gray-900  pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        {/* Category Badge */}
                        <div className="mb-6">
                            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-semibold">
                                {categoryIcons[post.category]}
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-white/90 mb-8">
                            <span className="flex items-center gap-2">
                                <FaUser />
                                {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaCalendar />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaClock />
                                {post.readTime}
                            </span>
                        </div>

                        {/* Share Buttons */}
                        <div className="flex items-center gap-4">
                            <span className="text-white/90 flex items-center gap-2">
                                <FaShare /> Share:
                            </span>
                            <button
                                onClick={() => handleShare('facebook')}
                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all"
                            >
                                <FaFacebook />
                            </button>
                            <button
                                onClick={() => handleShare('twitter')}
                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all"
                            >
                                <FaTwitter />
                            </button>
                            <button
                                onClick={() => handleShare('linkedin')}
                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all"
                            >
                                <FaLinkedin />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="container mx-auto px-4  mb-16 mt-6">
                <div className="max-w-5xl mx-auto">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
                        <div className="prose prose-lg max-w-none">
                            {post.content.split('\n\n').map((paragraph, index) => {
                                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                    return (
                                        <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                                            {paragraph.replace(/\*\*/g, '')}
                                        </h2>
                                    );
                                }
                                return (
                                    <p key={index} className="text-gray-700 leading-relaxed mb-6">
                                        {paragraph}
                                    </p>
                                );
                            })}
                        </div>

                        {/* Author Box */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                                        {post.author}
                                    </h3>
                                    <p className="text-gray-600">
                                        Language learning expert and educator passionate about helping students achieve their goals.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Related Articles */}
                    {relatedPosts.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                                Related Articles
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPosts.map(relatedPost => (
                                    <Link
                                        key={relatedPost.id}
                                        to={`/blog/${relatedPost.id}`}
                                        state={{ post: relatedPost }}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-sm text-indigo-600 font-semibold">
                                                {relatedPost.category}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-gray-950 via-purple-800 to-gray-900   py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to Start Learning?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join thousands of students on their language learning journey
                        </p>
                        <Link
                            to="/register"
                            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300"
                        >
                            Get Started for Free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;