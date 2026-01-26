import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cover from '../../Components/Cover';
import { Helmet } from 'react-helmet-async';
import { FaCalendar, FaUser, FaClock, FaArrowRight, FaSearch, FaBookOpen, FaGraduationCap, FaGlobe, FaLightbulb } from 'react-icons/fa';
import FilterSection from '../../Components/Shared/FilterSection/FilterSection';
import OptimizedImage from '../../Components/Shared/OptimizedImage';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const blogPosts = [
        {
            id: 1,
            title: "10 Proven Strategies to Learn a New Language Faster",
            excerpt: "Discover scientifically-backed methods that can accelerate your language learning journey. From spaced repetition to immersion techniques, these strategies will transform how you learn.",
            content: "Learning a new language doesn't have to take years. With the right strategies, you can dramatically accelerate your progress. First, embrace spaced repetition - this scientifically proven technique helps move information from short-term to long-term memory. Apps like Anki can automate this process. Second, immerse yourself in the language daily, even if just for 15 minutes. Watch shows, listen to podcasts, or read articles in your target language. Third, focus on high-frequency words first - the top 1000 words in any language cover about 80% of daily conversations. Fourth, practice speaking from day one, even if it's just talking to yourself. Don't wait until you feel 'ready.' Fifth, use mnemonics and visual associations to remember vocabulary. Sixth, find a language exchange partner for real conversation practice. Seventh, set specific, measurable goals instead of vague ones like 'become fluent.' Eighth, learn phrases, not just individual words. Ninth, make mistakes without fear - they're essential for learning. Finally, connect the language to your interests, whether it's cooking, sports, or music.",
            author: "Sarah Martinez",
            date: "December 20, 2024",
            readTime: "8 min read",
            category: "Learning Tips",
            image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
            featured: true
        },
        {
            id: 2,
            title: "The Science Behind Language Acquisition: What Research Tells Us",
            excerpt: "Explore the fascinating neuroscience and psychology behind how our brains process and learn new languages, and what it means for your learning approach.",
            content: "Neuroscience has revealed incredible insights about language learning. The brain's plasticity allows us to learn languages throughout our lives, though the process differs between children and adults. Children acquire languages through implicit learning, while adults benefit from explicit instruction combined with immersion. Research shows that bilingualism enhances cognitive flexibility, problem-solving skills, and even delays dementia. The Critical Period Hypothesis suggests that pronunciation is most easily acquired before puberty, but vocabulary and grammar can be mastered at any age. Studies on successful polyglots reveal common patterns: they study consistently, use multiple learning methods, focus on communication over perfection, and maintain strong motivation. The brain processes new languages in areas adjacent to our native language, and with practice, these neural pathways strengthen. Interestingly, sleeping after study sessions helps consolidate language learning. Music and rhythm also activate language centers, explaining why songs help us remember phrases. Understanding these mechanisms can help us optimize our learning strategies.",
            author: "Dr. James Chen",
            date: "December 18, 2024",
            readTime: "10 min read",
            category: "Research",
            image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80"
        },
        {
            id: 3,
            title: "Common Mistakes Language Learners Make (And How to Avoid Them)",
            excerpt: "Learn from the pitfalls that slow down many language learners and discover practical solutions to overcome these obstacles.",
            content: "Many learners make predictable mistakes that hinder progress. The biggest mistake? Perfectionism. Waiting until you speak perfectly before practicing with natives means you'll never start. Another common error is neglecting pronunciation early on - bad habits become harder to break later. Many learners also rely too heavily on translation, thinking word-for-word instead of in the target language. Passive learning without active practice is another trap - you can't learn to swim by reading about it. Inconsistency kills progress faster than anything else; daily 15-minute sessions beat weekly 2-hour marathons. Ignoring grammar entirely is problematic, but obsessing over it before building vocabulary is equally counterproductive. Some learners avoid difficult aspects of the language, creating permanent weak spots. Not using spaced repetition means forgetting most of what you learn. Finally, many give up too early, right before reaching the intermediate plateau where progress accelerates. The solution? Set realistic expectations, practice consistently, embrace mistakes, speak from day one, and remember that every expert was once a beginner.",
            author: "Maria Rodriguez",
            date: "December 15, 2024",
            readTime: "7 min read",
            category: "Learning Tips",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
        },
        {
            id: 4,
            title: "Immersion vs. Traditional Learning: Which Path Is Right for You?",
            excerpt: "Compare different language learning methodologies and find the approach that matches your learning style, goals, and lifestyle.",
            content: "The immersion vs. classroom debate has raged for decades. Immersion learning throws you into the deep end - surrounding yourself with native speakers and authentic content. This method mirrors how children learn languages naturally. Benefits include faster conversational skills, natural pronunciation, and cultural understanding. However, it can be overwhelming and may leave grammar gaps. Traditional structured learning provides systematic grammar instruction, clear progression, and builds a solid foundation. It's less intimidating for beginners but can feel disconnected from real-world use. The best approach? A hybrid method. Start with structure to build basics, then gradually increase immersion. Use textbooks for grammar frameworks, but practice with native content. Take formal classes but also find conversation partners. Modern technology makes this easier than ever - apps provide structure while YouTube, podcasts, and language exchange platforms offer immersion. Your personality matters too. Analytical learners might prefer structured approaches initially, while intuitive learners thrive on immersion. Consider your goals: need business proficiency? Add formal instruction. Want conversational fluency? Prioritize immersion. Most importantly, consistency beats methodology.",
            author: "David Kim",
            date: "December 12, 2024",
            readTime: "9 min read",
            category: "Methods",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
        },
        {
            id: 5,
            title: "The Role of Culture in Language Learning: Beyond Grammar and Vocabulary",
            excerpt: "Understanding cultural context is crucial for true language mastery. Discover why cultural knowledge transforms you from a speaker to a communicator.",
            content: "Language and culture are inseparable. You can memorize thousands of words and master complex grammar, but without cultural understanding, you'll always sound foreign. Cultural context determines everything from formality levels to humor, from acceptable topics to body language. For example, Spanish uses different verb forms based on your relationship with someone - understanding social hierarchies is essential. Japanese has entire grammatical structures built around politeness and social status. Even gestures vary - a thumbs up is positive in America but offensive in parts of the Middle East. Idioms rarely translate literally; they're cultural capsules. Understanding holidays, history, values, and social norms helps you grasp why people say things certain ways. Food, music, literature, and film provide windows into collective psychology. Learning about cultural taboos prevents embarrassing mistakes. Moreover, showing cultural awareness builds rapport with native speakers who appreciate your effort to understand their world beyond just their words. Study geography, history, current events, pop culture, and social customs alongside vocabulary. Watch local news, follow social media influencers, read contemporary literature, and ask native speakers about their experiences.",
            author: "Emily Foster",
            date: "December 10, 2024",
            readTime: "8 min read",
            category: "Culture",
            image: "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=800&q=80"
        },
        {
            id: 6,
            title: "Technology and Language Learning: Essential Apps and Tools for 2024",
            excerpt: "Navigate the overwhelming world of language learning technology with our curated guide to the most effective apps, websites, and tools.",
            content: "Technology has revolutionized language learning, but abundance creates confusion. For structured lessons, Duolingo offers gamification while Babbel provides more rigorous grammar. For vocabulary, Anki's spaced repetition algorithm is unbeatable, though Memrise offers ready-made courses. iTalki connects you with native tutors at various price points, while HelloTalk and Tandem facilitate free language exchanges. For listening practice, YouTube channels, podcasts, and Netflix with subtitles are invaluable. LingQ helps you learn through reading with instant translation. For pronunciation, Forvo provides native speaker recordings of individual words. Grammar resources vary by language, but resources like SpanishDict and WordReference offer comprehensive explanations. Google Translate has improved dramatically but should supplement, not replace, learning. Language learning subreddits provide community support and resources. For serious students, frequency dictionaries identify the most useful words to learn first. Browser extensions like Language Learning with Netflix enhance passive viewing. The key is using technology as a tool, not a crutch. No app replaces consistent practice and real human interaction.",
            author: "Alex Thompson",
            date: "December 8, 2024",
            readTime: "11 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&q=80"
        },
        {
            id: 7,
            title: "Maintaining Motivation: How to Stay Committed to Your Language Goals",
            excerpt: "Motivation fades, but these psychological strategies and practical tips will help you maintain consistency even when progress feels slow.",
            content: "Every language learner hits plateaus where motivation vanishes. Understanding this pattern helps you prepare. Start by examining your 'why' - is it career advancement, connecting with family, travel, or personal challenge? Write it down and revisit it during tough times. Set SMART goals: specific, measurable, achievable, relevant, and time-bound. Instead of 'become fluent,' aim for 'hold a 10-minute conversation about work by March.' Track progress visibly - apps, spreadsheets, or journals work. Celebrate small wins; finished a book chapter? Understood a movie scene without subtitles? Acknowledge it. Vary your study methods to prevent boredom - alternate between apps, videos, books, and conversation. Join online communities for accountability and support. Find content you genuinely enjoy; if soccer bores you, don't force yourself to learn sports vocabulary. Create streaks and use habit-stacking - study while drinking morning coffee. On low-motivation days, do the minimum to maintain your streak rather than skipping entirely. Remember that intermediate plateaus are normal; your brain is consolidating knowledge. Consider the sunk cost positively - all those hours won't have been wasted if you continue.",
            author: "Rachel Green",
            date: "December 5, 2024",
            readTime: "7 min read",
            category: "Motivation",
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
        },
        {
            id: 8,
            title: "From Beginner to Advanced: Realistic Timeline Expectations",
            excerpt: "Set achievable goals by understanding what different proficiency levels actually mean and how long they typically take to reach.",
            content: "The FSI (Foreign Service Institute) estimates that English speakers need 600-750 hours for 'easy' languages like Spanish and French, and 2200+ hours for 'hard' languages like Arabic and Japanese. But what do these hours translate to? With one hour daily, that's 2-3 years for Spanish or 6+ for Mandarin to reach professional proficiency. However, the journey isn't linear. A1 (beginner) to A2 (elementary) happens relatively quickly - 3-6 months of consistent study. A2 to B1 (intermediate) takes longer, often 6-12 months, but opens up real conversations. B1 to B2 (upper intermediate) is the notorious plateau where many quit - expect 1-2 years. This level lets you work in the language but not fully express nuance. B2 to C1 (advanced) requires another 1-2 years and extensive immersion. C2 (mastery) takes a lifetime; even natives continue learning. These timelines assume quality study - passive app scrolling doesn't count. Factors affecting speed include: language similarity to your native tongue, previous language learning experience, study intensity, quality of resources, immersion opportunities, natural aptitude, and motivation. Don't compare your progress to others; focus on consistent improvement.",
            author: "Michael Santos",
            date: "December 3, 2024",
            readTime: "9 min read",
            category: "Learning Tips",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
        }
    ];

    const categories = ['All', 'Learning Tips', 'Research', 'Methods', 'Culture', 'Technology', 'Motivation'];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    const categoryIcons = {
        'Learning Tips': <FaLightbulb />,
        'Research': <FaBookOpen />,
        'Methods': <FaGraduationCap />,
        'Culture': <FaGlobe />,
        'Technology': <FaSearch />,
        'Motivation': <FaLightbulb />
    };

    return (
        <div className="bg-gray-50">
            <Helmet>
                <title>Language Learner | Blog</title>
            </Helmet>



            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-950 via-purple-800 to-gray-900  py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Language Learning Blog
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            Expert tips, research insights, and inspiration for your language journey
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-4 py-4 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>



            {/* Category Filter */}
            <FilterSection
                filters={[
                    {
                        label: 'Category',
                        options: categories,
                        selected: selectedCategory,
                        onSelect: setSelectedCategory,
                        color: 'indigo'
                    }

                ]}
            />


            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">

                {/* Featured Post */}
                {selectedCategory === 'All' && featuredPost && (
                    <div className="mb-16">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-gray-800">Featured Article</h2>
                        </div>

                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group">
                            <div className="grid md:grid-cols-2 gap-0">
                                <div className="relative h-64 md:h-auto overflow-hidden">
                                    <OptimizedImage
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        aspectRatio="4/3"
                                        className="w-full rounded-t-xl group-hover:scale-105 transition-transform"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                              
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                                            ⭐ Featured
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <span className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-4">
                                        {categoryIcons[featuredPost.category]}
                                        {featuredPost.category}
                                    </span>

                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors">
                                        {featuredPost.title}
                                    </h3>

                                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                                        <span className="flex items-center gap-2">
                                            <FaUser className="text-indigo-600" />
                                            {featuredPost.author}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <FaCalendar className="text-indigo-600" />
                                            {featuredPost.date}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <FaClock className="text-indigo-600" />
                                            {featuredPost.readTime}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/blog/${featuredPost.id}`}
                                        state={{ post: featuredPost }}
                                        className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 group-hover:gap-4 w-fit"
                                    >
                                        Read More
                                        <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog Grid */}
                <div className="mb-8 ">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                        <h2 className="text-3xl font-bold text-gray-800">Latest Articles</h2>
                    </div>
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {regularPosts.map(post => (
                            <article
                                key={post.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                                        {categoryIcons[post.category]}
                                        {post.category}
                                    </span>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4 pt-4 border-t border-gray-100">
                                        <span className="flex items-center gap-1">
                                            <FaUser className="text-indigo-600" />
                                            {post.author}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaClock className="text-indigo-600" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/blog/${post.id}`}
                                        state={{ post }}
                                        className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-4 transition-all duration-300 group/btn"
                                    >
                                        Read Full Article
                                        <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Articles Found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-gray-950 via-purple-800 to-gray-900    py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Stay Updated with Learning Tips
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Subscribe to get the latest articles and exclusive resources delivered to your inbox
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-white/50"
                            />
                            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 whitespace-nowrap">
                                Subscribe Now
                            </button>
                        </div>

                        <p className="text-white/70 text-sm mt-4">
                            Join 10,000+ language learners. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;