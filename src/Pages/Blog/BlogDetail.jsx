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

const BlogDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);

    // Blog posts data (same as Blog component)
    const blogPosts = [
        {
            id: 1,
            title: "10 Proven Strategies to Learn a New Language Faster",
            excerpt: "Discover scientifically-backed methods that can accelerate your language learning journey.",
            content: `Learning a new language doesn't have to take years. With the right strategies, you can dramatically accelerate your progress.

**1. Embrace Spaced Repetition**
This scientifically proven technique helps move information from short-term to long-term memory. Apps like Anki can automate this process, ensuring you review vocabulary at optimal intervals for retention.

**2. Immerse Yourself Daily**
Even 15 minutes of daily exposure makes a difference. Watch shows, listen to podcasts, or read articles in your target language. Consistency trumps intensity every time.

**3. Focus on High-Frequency Words First**
The top 1000 words in any language cover about 80% of daily conversations. Master these before diving into specialized vocabulary. This gives you the biggest return on your time investment.

**4. Practice Speaking From Day One**
Don't wait until you feel "ready." Start speaking immediately, even if it's just talking to yourself. This builds confidence and helps you identify gaps in your knowledge early.

**5. Use Mnemonics and Visual Associations**
Create memorable mental images or stories to connect new words with their meanings. The more bizarre or emotional the association, the better you'll remember it.

**6. Find a Language Exchange Partner**
Real conversation practice is irreplaceable. Find native speakers who want to learn your language and meet regularly. This provides authentic communication practice and cultural insights.

**7. Set Specific, Measurable Goals**
Instead of vague goals like "become fluent," aim for concrete targets: "hold a 10-minute conversation about work" or "read a children's book without a dictionary."

**8. Learn Phrases, Not Just Words**
Isolated words are less useful than common phrases and expressions. Learning "How are you?" as a unit is more practical than memorizing each word separately.

**9. Make Mistakes Without Fear**
Mistakes are essential for learning. Native speakers appreciate effort and rarely judge errors harshly. Each mistake is a learning opportunity, not a failure.

**10. Connect Language to Your Interests**
Love cooking? Learn food vocabulary and watch cooking shows in your target language. Passionate about sports? Follow teams and read sports news. When language learning intersects with your hobbies, motivation stays high and learning feels natural.

The key to all these strategies is consistency. Even 20 minutes daily beats sporadic 3-hour sessions. Start implementing these techniques today, and you'll be amazed at your progress in just a few months.`,
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
            excerpt: "Explore the fascinating neuroscience and psychology behind how our brains process and learn new languages.",
            content: `Neuroscience has revealed incredible insights about how we learn languages, and understanding these mechanisms can transform your approach to language learning.

**Brain Plasticity and Language Learning**
The brain's remarkable plasticity allows us to learn languages throughout our lives, though the process differs between children and adults. Children acquire languages through implicit learning—absorbing patterns naturally through exposure. Adults benefit from explicit instruction combined with immersion, using their analytical abilities as an advantage.

**Cognitive Benefits of Bilingualism**
Research consistently shows that bilingualism enhances cognitive flexibility, problem-solving skills, and executive function. Bilingual individuals often show delayed onset of dementia and better multitasking abilities. The mental workout of switching between languages strengthens overall cognitive reserves.

**The Critical Period Hypothesis**
While controversial, evidence suggests that native-like pronunciation is most easily acquired before puberty. However, vocabulary acquisition and grammatical mastery have no age limit. Adults can absolutely achieve high proficiency—they just approach it differently than children.

**Patterns of Successful Polyglots**
Studies on successful language learners reveal common patterns: consistent daily practice, use of multiple learning methods, focus on communication over perfection, strong intrinsic motivation, and willingness to make mistakes. These behaviors matter more than innate "talent."

**Neural Processing of Multiple Languages**
Brain imaging studies show that the brain processes new languages in areas adjacent to native language centers. With practice, these neural pathways strengthen and become more efficient. Interestingly, the more languages you learn, the easier subsequent languages become due to enhanced metalinguistic awareness.

**The Role of Sleep in Language Learning**
Sleep consolidation is crucial for language learning. Studies show that sleeping after study sessions significantly improves retention. The brain processes and strengthens new linguistic information during sleep, particularly during REM cycles.

**Music, Rhythm, and Language**
Music and rhythm activate overlapping brain regions with language centers. This explains why songs help us remember phrases and why many polyglots use music in their learning. Melodic patterns create additional memory hooks for linguistic information.

**Practical Applications**
Understanding these mechanisms helps optimize learning strategies. Use your adult analytical abilities to understand grammar patterns. Practice consistently to strengthen neural pathways. Ensure adequate sleep for memory consolidation. Use music and rhythm when appropriate. Most importantly, maintain motivation by connecting language learning to meaningful personal goals.

The science of language learning reveals that our brains are remarkably adaptable. While children may have some advantages in accent acquisition, adults possess powerful analytical tools and life experience that, when properly leveraged, make language learning not just possible but highly achievable at any age.`,
            author: "Dr. James Chen",
            date: "December 18, 2024",
            readTime: "10 min read",
            category: "Research",
            image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80"
        },
        {
            id: 3,
            title: "Common Mistakes Language Learners Make (And How to Avoid Them)",
            excerpt: "Learn from the pitfalls that slow down many language learners and discover practical solutions.",
            content: `Many learners make predictable mistakes that significantly hinder their progress. Understanding these pitfalls helps you avoid them and accelerate your learning journey.

**The Perfectionism Trap**
The biggest mistake? Waiting to speak until you're perfect. This guarantees you'll never start. Native speakers make mistakes constantly—it's part of natural communication. Start speaking from day one, even if it's just to yourself. Fluency comes from practice, not from waiting until you feel ready.

**Neglecting Pronunciation Early**
Many learners ignore pronunciation initially, planning to "fix it later." Bad habits become deeply ingrained and much harder to correct. Spend time on pronunciation from the beginning. Listen carefully to native speakers and use resources like Forvo to hear correct pronunciation.

**Over-Reliance on Translation**
Constantly translating word-for-word prevents you from thinking in your target language. Your goal should be to understand concepts directly in the new language, not to always route through your native language. This mental shortcut slows you down and often leads to unnatural expressions.

**Passive Learning Without Active Practice**
Reading and listening are important, but you can't learn to swim by reading about it. You need active practice—speaking and writing. Passive consumption must be balanced with active production. Join conversation groups, find language partners, or record yourself speaking.

**Inconsistency Kills Progress**
Daily 15-minute sessions beat weekly 2-hour marathons. Language learning requires consistent exposure and practice. Long breaks cause significant regression. Make language practice a daily habit, like brushing your teeth. Even on busy days, do something small to maintain your streak.

**Grammar Obsession or Grammar Avoidance**
Both extremes are problematic. Obsessing over grammar before building vocabulary leads to paralysis. You need words to make sentences! Conversely, ignoring grammar entirely creates permanent gaps. Balance is key: learn basic grammar structures while simultaneously building vocabulary.

**Avoiding Difficult Aspects**
If you hate verb conjugations or find gendered nouns frustrating, you might skip them. This creates permanent weak spots. Address difficult aspects early and systematically. They won't get easier by avoiding them, and these gaps will limit your communication abilities.

**Not Using Spaced Repetition**
Without systematic review, you'll forget most of what you learn. Spaced repetition systems ensure you review information at optimal intervals. Use apps like Anki or create your own system. This technique is backed by cognitive science and dramatically improves retention.

**Giving Up Too Early**
Many learners quit right before reaching the intermediate plateau where progress accelerates. The beginner phase feels slow because you're building foundations. Once you reach intermediate level, everything clicks faster. Push through the tough early stages.

**The Solution: Realistic Expectations and Consistent Practice**
Accept that mistakes are essential. Practice consistently rather than intensively. Balance grammar with vocabulary. Address weaknesses instead of avoiding them. Use proven techniques like spaced repetition. Most importantly, remember that every expert was once a frustrated beginner. Your job isn't to be perfect—it's to be persistent.`,
            author: "Maria Rodriguez",
            date: "December 15, 2024",
            readTime: "7 min read",
            category: "Learning Tips",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
        },
        // Add more blog posts here (4-8) with similar detailed content structure
    ];

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
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 pt-32 pb-20">
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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
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