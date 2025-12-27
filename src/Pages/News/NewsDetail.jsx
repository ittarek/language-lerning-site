import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FaCalendar,
    FaClock,
    FaArrowLeft,
    FaShare,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaFire,
    FaChartLine,
    FaLaptop,
    FaGlobeAmericas,
    FaTrophy,
    FaBookReader
} from 'react-icons/fa';

const NewsDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);

    // News articles data (same as News component)
    const newsArticles = [
        {
            id: 1,
            title: "Duolingo Reaches 500 Million Users Worldwide, Revolutionizing Language Learning",
            excerpt: "The popular language learning app celebrates a major milestone, with users across 195 countries learning over 40 languages through gamified lessons.",
            content: `In a groundbreaking achievement for digital education, Duolingo has announced that it has surpassed 500 million registered users worldwide, cementing its position as the world's most popular language-learning platform. The milestone comes just 12 years after the app's launch, representing unprecedented growth in the EdTech sector.

**Unprecedented Growth and Global Reach**

According to CEO Luis von Ahn, the platform now offers courses in over 40 languages, from Spanish and French to endangered languages like Hawaiian and Navajo. The company reports that users spend an average of 34 minutes per day on the app, with daily active users exceeding 30 million.

**The Power of Gamification**

The success is attributed to Duolingo's innovative gamification approach, which transforms language learning into an engaging, game-like experience with streaks, leaderboards, and rewards. The platform's AI-powered personalization adapts to individual learning styles, while its bite-sized lessons fit into busy schedules.

**Cutting-Edge Features**

Recent features include conversation practice with AI characters, enhanced pronunciation feedback using speech recognition technology, and personalized learning paths that adapt to user progress in real-time. The app's mascot, Duo the owl, has become a cultural icon, with millions of social media followers.

**Impact Beyond Commercial Success**

Duolingo's impact extends beyond commercial success. The company has partnered with educational institutions worldwide to provide free language education to underserved communities. Studies show that 34 hours of Duolingo equals one university semester of language learning, making quality education accessible to millions who couldn't otherwise afford it.

**Educational Validation**

Research conducted by independent educational institutions validates Duolingo's effectiveness. A study by City University of New York found that learners using Duolingo for 34 hours achieved the same reading and listening comprehension as students completing a first-semester university Spanish course.

**Global Accessibility**

The platform's free model has democratized language education. In developing countries where traditional language schools are expensive or unavailable, Duolingo provides a viable alternative. The app works offline, making it accessible even in areas with limited internet connectivity.

**Future Innovations**

Looking ahead, Duolingo plans to expand into more languages, including additional indigenous and endangered languages. The company is investing heavily in AI technology to create more sophisticated conversation partners and provide even more personalized learning experiences.

As the platform continues to grow, it's reshaping how the world approaches language education, making it more accessible, affordable, and enjoyable than ever before. The milestone represents not just a business achievement, but a significant step toward breaking down language barriers globally.`,
            date: "December 26, 2024",
            readTime: "5 min read",
            category: "Industry News",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
            trending: true,
            breaking: true
        },
        {
            id: 2,
            title: "New Study Reveals Learning Multiple Languages Delays Alzheimer's by 5 Years",
            excerpt: "Groundbreaking research from Cambridge University shows bilingualism provides significant cognitive protection against dementia and age-related cognitive decline.",
            content: `A comprehensive study published in the Journal of Neuroscience has provided compelling evidence that speaking multiple languages significantly delays the onset of Alzheimer's disease and other forms of dementia.

**Groundbreaking Research Methodology**

The research, conducted by Cambridge University over 15 years with 10,000 participants, found that bilingual individuals develop dementia an average of 5 years later than monolingual peers. The study tracked cognitive function in adults aged 55-85, comparing bilingual and multilingual speakers with monolinguals.

**Understanding Cognitive Reserve**

Results showed that the constant mental exercise of managing multiple languages strengthens cognitive reserve - the brain's resilience against damage. Dr. Sarah Mitchell, lead researcher, explains: "When you speak multiple languages, your brain continuously switches between linguistic systems, strengthening executive function and mental flexibility."

**Comprehensive Cognitive Benefits**

The cognitive benefits extend beyond dementia prevention. Bilingual individuals showed superior multitasking abilities, enhanced problem-solving skills, and better attention control. Brain scans revealed increased gray matter density in areas responsible for language processing and executive function.

**Age and Learning Impact**

The protective effect was strongest in individuals who learned a second language before age 18, but significant benefits were observed even in late learners. This finding offers hope for adults considering language learning, demonstrating that it's never too late to start.

**Controlling for Variables**

Researchers emphasize the study's rigor in controlling for factors like education level, socioeconomic status, and overall health, confirming that language learning itself provides the cognitive benefits, not merely correlation with other protective factors.

**Biological Mechanisms**

The study identified specific biological mechanisms through brain imaging. Multilingual speakers showed enhanced connectivity between brain regions, increased neural density in language centers, and more efficient neural pathways for information processing.

**Long-term Health Implications**

These findings have significant implications for public health policy and education systems worldwide, suggesting that promoting multilingualism could be an effective strategy for preventing age-related cognitive decline and reducing the societal burden of dementia.

**Recommendations for Policy Makers**

Researchers recommend that governments invest in language education programs, particularly for children, as a long-term public health strategy. They also suggest that language learning programs be made available to seniors as a form of cognitive exercise.

The study represents a major advance in understanding how language learning impacts brain health and provides strong evidence for the cognitive benefits of multilingualism throughout the lifespan.`,
            date: "December 25, 2024",
            readTime: "6 min read",
            category: "Research",
            image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
            trending: true
        },
        {
            id: 3,
            title: "AI Language Tutors Now Match Human Teachers in Effectiveness, Study Shows",
            excerpt: "Advanced AI-powered language learning tools demonstrate comparable results to traditional human instruction.",
            content: `A landmark study from MIT's Computer Science and Artificial Intelligence Laboratory has found that advanced AI language tutors are now as effective as human teachers for language instruction, potentially transforming how millions learn languages.

**Revolutionary Research Findings**

The year-long study compared 2,000 students learning Spanish through three methods: traditional classroom instruction, AI-powered tutoring systems, and a hybrid approach. Surprisingly, students using AI tutors achieved proficiency levels statistically equivalent to those taught by human instructors.

**AI Capabilities and Advantages**

The AI systems, powered by large language models like GPT-4 and Claude, provide personalized instruction, instant feedback, and unlimited conversation practice. Key advantages include 24/7 availability, infinite patience, and ability to adapt to individual learning speeds.

Modern AI tutors can engage in natural conversations, correct pronunciation with sophisticated speech recognition, explain complex grammar concepts, and even provide cultural context. They analyze speech patterns to identify specific pronunciation issues and adjust difficulty levels in real-time based on student performance.

**Important Limitations**

However, researchers note important caveats. AI excels at structured learning and practice but cannot fully replicate human emotional connection and cultural nuance. The study found that a hybrid model - combining AI practice with periodic human instruction - produced the best results, with students advancing 30% faster than either method alone.

**Democratizing Language Education**

Dr. Robert Chen, lead researcher, states: "AI democratizes language education, providing high-quality instruction to anyone with internet access." This is particularly impactful in areas lacking qualified language teachers or where private tutoring is prohibitively expensive.

**Industry Response and Integration**

Companies like Babbel, Rosetta Stone, and Duolingo are rapidly integrating these AI capabilities. New features include AI conversation partners that adapt to user proficiency, personalized curriculum generation based on learning patterns, and real-time error correction with contextual explanations.

**Future of Language Education**

As technology improves, the line between human and AI instruction continues to blur, promising a future where quality language education is accessible to anyone, anywhere, at any time. The study suggests we're entering an era where cost and access are no longer barriers to language learning.`,
            date: "December 24, 2024",
            readTime: "7 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
            trending: true
        }
    ];

    // Get article from location state or find in array
    const [article, setArticle] = useState(location.state?.article || null);

    useEffect(() => {
        if (!article) {
            const foundArticle = newsArticles.find(a => a.id === parseInt(id));
            if (foundArticle) {
                setArticle(foundArticle);
            } else {
                navigate('/news');
            }
        }
    }, [id, article, navigate]);

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
        const text = article?.title || '';

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    // Related articles (same category, excluding current)
    const relatedArticles = newsArticles
        .filter(a => a.id !== article?.id && a.category === article?.category)
        .slice(0, 3);

    const categoryIcons = {
        'Industry News': <FaChartLine />,
        'Research': <FaBookReader />,
        'Technology': <FaLaptop />,
        'Global Programs': <FaGlobeAmericas />,
        'Policy': <FaTrophy />,
        'Trends': <FaFire />
    };

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📰</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Helmet>
                <title>{article.title} | Language Learner News</title>
                <meta name="description" content={article.excerpt} />
            </Helmet>

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                <div
                    className="h-full bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link
                            to="/news"
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to News
                        </Link>

                        {/* Category & Status Badges */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-semibold">
                                {categoryIcons[article.category]}
                                {article.category}
                            </span>
                            {article.breaking && (
                                <span className="inline-flex items-center gap-2 bg-red-700 text-white px-6 py-2 rounded-full font-bold animate-pulse">
                                    🔴 BREAKING NEWS
                                </span>
                            )}
                            {article.trending && (
                                <span className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold">
                                    <FaFire /> Trending
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-white/90 mb-8">
                            <span className="flex items-center gap-2">
                                <FaCalendar />
                                {article.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaClock />
                                {article.readTime}
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
            <div className="container mx-auto px-4 mt-11 mb-16">
                <div className="max-w-5xl mx-auto">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* Excerpt/Summary */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-r-2xl mb-8">
                        <p className="text-lg text-gray-700 font-semibold italic">
                            {article.excerpt}
                        </p>
                    </div>

                    {/* Article Content */}
                    <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
                        <div className="prose prose-lg max-w-none">
                            {article.content.split('\n\n').map((paragraph, index) => {
                                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                    return (
                                        <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center gap-3">
                                            <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>
                                            {paragraph.replace(/\*\*/g, '')}
                                        </h2>
                                    );
                                }
                                return (
                                    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                                        {paragraph}
                                    </p>
                                );
                            })}
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                <span className="text-gray-600 font-semibold mr-2">Tags:</span>
                                <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
                                    {article.category}
                                </span>
                                <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium">
                                    Language Learning
                                </span>
                                <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">
                                    Education
                                </span>
                            </div>
                        </div>
                    </article>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>
                                Related News
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedArticles.map(relatedArticle => (
                                    <Link
                                        key={relatedArticle.id}
                                        to={`/news/${relatedArticle.id}`}
                                        state={{ article: relatedArticle }}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={relatedArticle.image}
                                                alt={relatedArticle.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            {relatedArticle.trending && (
                                                <div className="absolute top-3 right-3">
                                                    <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                        <FaFire className="text-xs" /> Trending
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <span className="text-sm text-red-600 font-semibold">
                                                {relatedArticle.category}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                                                {relatedArticle.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {relatedArticle.excerpt}
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
            <div className="bg-gradient-to-r from-red-600 to-orange-600 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Stay Updated with Latest News
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Subscribe to our newsletter for weekly updates on language learning trends
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-white/50"
                            />
                            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 whitespace-nowrap">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;