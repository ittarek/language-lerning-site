import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FaCalendar,
    FaClock,
    FaArrowRight,
    FaSearch,
    FaFire,
    FaTrophy,
    FaGlobeAmericas,
    FaLaptop,
    FaChartLine,
    FaBookReader
} from 'react-icons/fa';
import FilterSection from '../../Components/Shared/FilterSection/FilterSection';

const News = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const newsArticles = [
        {
            id: 1,
            title: "Duolingo Reaches 500 Million Users Worldwide, Revolutionizing Language Learning",
            excerpt: "The popular language learning app celebrates a major milestone, with users across 195 countries learning over 40 languages through gamified lessons.",
            content: "In a groundbreaking achievement for digital education, Duolingo has announced that it has surpassed 500 million registered users worldwide, cementing its position as the world's most popular language-learning platform. The milestone comes just 12 years after the app's launch, representing unprecedented growth in the EdTech sector. According to CEO Luis von Ahn, the platform now offers courses in over 40 languages, from Spanish and French to endangered languages like Hawaiian and Navajo. The company reports that users spend an average of 34 minutes per day on the app, with daily active users exceeding 30 million. The success is attributed to Duolingo's innovative gamification approach, which transforms language learning into an engaging, game-like experience with streaks, leaderboards, and rewards. The platform's AI-powered personalization adapts to individual learning styles, while its bite-sized lessons fit into busy schedules. Recent features include conversation practice with AI characters and enhanced pronunciation feedback. Duolingo's impact extends beyond commercial success - the company has partnered with educational institutions worldwide to provide free language education to underserved communities. Studies show that 34 hours of Duolingo equals one university semester of language learning. As the platform continues to grow, it's reshaping how the world approaches language education, making it more accessible, affordable, and enjoyable than ever before.",
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
            content: "A comprehensive study published in the Journal of Neuroscience has provided compelling evidence that speaking multiple languages significantly delays the onset of Alzheimer's disease and other forms of dementia. The research, conducted by Cambridge University over 15 years with 10,000 participants, found that bilingual individuals develop dementia an average of 5 years later than monolingual peers. The study tracked cognitive function in adults aged 55-85, comparing bilingual and multilingual speakers with monolinguals. Results showed that the constant mental exercise of managing multiple languages strengthens cognitive reserve - the brain's resilience against damage. Dr. Sarah Mitchell, lead researcher, explains: 'When you speak multiple languages, your brain continuously switches between linguistic systems, strengthening executive function and mental flexibility.' The cognitive benefits extend beyond dementia prevention. Bilingual individuals showed superior multitasking abilities, enhanced problem-solving skills, and better attention control. Brain scans revealed increased gray matter density in areas responsible for language processing and executive function. The protective effect was strongest in individuals who learned a second language before age 18, but significant benefits were observed even in late learners. Researchers emphasize that it's never too late to start learning a new language. The study controlled for factors like education level, socioeconomic status, and overall health, confirming that language learning itself provides the cognitive benefits. These findings have significant implications for public health policy and education systems worldwide, suggesting that promoting multilingualism could be an effective strategy for preventing age-related cognitive decline.",
            date: "December 25, 2024",
            readTime: "6 min read",
            category: "Research",
            image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
            trending: true
        },
        {
            id: 3,
            title: "AI Language Tutors Now Match Human Teachers in Effectiveness, Study Shows",
            excerpt: "Advanced AI-powered language learning tools demonstrate comparable results to traditional human instruction, marking a new era in language education technology.",
            content: "A landmark study from MIT's Computer Science and Artificial Intelligence Laboratory has found that advanced AI language tutors are now as effective as human teachers for language instruction, potentially transforming how millions learn languages. The year-long study compared 2,000 students learning Spanish through three methods: traditional classroom instruction, AI-powered tutoring systems, and a hybrid approach. Surprisingly, students using AI tutors achieved proficiency levels statistically equivalent to those taught by human instructors. The AI systems, powered by large language models like GPT-4 and Claude, provide personalized instruction, instant feedback, and unlimited conversation practice. Key advantages include 24/7 availability, infinite patience, and ability to adapt to individual learning speeds. Modern AI tutors can engage in natural conversations, correct pronunciation, explain grammar, and even provide cultural context. They analyze speech patterns to identify specific pronunciation issues and adjust difficulty levels in real-time based on student performance. However, researchers note important caveats. AI excels at structured learning and practice but cannot fully replicate human emotional connection and cultural nuance. The study found that a hybrid model - combining AI practice with periodic human instruction - produced the best results, with students advancing 30% faster than either method alone. Dr. Robert Chen, lead researcher, states: 'AI democratizes language education, providing high-quality instruction to anyone with internet access.' This is particularly impactful in areas lacking qualified language teachers. Companies like Babbel, Rosetta Stone, and Duolingo are rapidly integrating these AI capabilities. As technology improves, the line between human and AI instruction continues to blur, promising a future where language education is more accessible and effective than ever.",
            date: "December 24, 2024",
            readTime: "7 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
            trending: true
        },
        {
            id: 4,
            title: "Japanese Government Launches Free Language Exchange Program for 100,000 International Students",
            excerpt: "Japan's Ministry of Education announces ambitious initiative to promote cultural exchange and improve English proficiency among Japanese citizens through peer learning.",
            content: "In an unprecedented move to boost international cultural exchange and improve language skills, Japan's Ministry of Education has launched a nationwide language exchange program connecting 100,000 international students with Japanese language learners. The program, called 'Language Bridge Japan,' pairs international students fluent in English, Chinese, Korean, and other languages with Japanese citizens eager to improve their foreign language skills. In exchange, international students receive structured Japanese language instruction and cultural immersion experiences. The initiative addresses two critical needs: Japan's historically low English proficiency rankings among developed nations, and international students' desire for deeper cultural integration. Participants meet weekly for conversation practice, cultural activities, and collaborative projects. The program is entirely free and includes access to online resources, organized cultural events, and language learning materials. Early results have been overwhelmingly positive. Pilot programs in Tokyo and Osaka showed remarkable improvement in conversational abilities for both groups. Participants reported increased confidence, cultural understanding, and lasting friendships across cultural boundaries. Yuki Tanaka, a program participant, shares: 'Through my language partner from Australia, I've not only improved my English but gained a friend who helps me understand Western perspectives.' The program's digital platform facilitates matching based on interests, proficiency levels, and goals, while providing structured conversation topics and progress tracking. Language exchange cafes in major cities offer physical meeting spaces. This initiative reflects Japan's broader strategy to internationalize its society ahead of increased global engagement. Education Minister Kenji Yamamoto stated: 'Language exchange isn't just about words - it's about building bridges between cultures and preparing our citizens for an interconnected world.' Other countries are watching closely, with South Korea and Taiwan considering similar programs.",
            date: "December 23, 2024",
            readTime: "6 min read",
            category: "Global Programs",
            image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80"
        },
        {
            id: 5,
            title: "Virtual Reality Language Immersion Programs Show 200% Faster Learning Results",
            excerpt: "New VR technology creates realistic immersive environments, allowing learners to practice languages in simulated real-world scenarios with remarkable effectiveness.",
            content: "Virtual reality is revolutionizing language learning, with recent studies showing that VR immersion programs help students achieve conversational fluency 200% faster than traditional methods. The breakthrough comes from companies like ImmerseMe, Mondly VR, and VirtualSpeech, which create photorealistic environments where learners practice languages in simulated real-world scenarios. Users can order food in a Parisian café, negotiate business deals in Tokyo boardrooms, or navigate Barcelona markets - all from their living rooms. The technology combines spatial audio, gesture recognition, and AI-driven characters that respond naturally to speech and body language. Dr. Maria Garcia's research at Stanford University tracked 500 students learning Spanish through three methods: classroom instruction, traditional apps, and VR immersion. VR learners achieved intermediate conversational proficiency in just 6 months - half the time of traditional learners. The key advantage is experiential learning. VR triggers the same neural pathways as real-world experiences, creating stronger memory formation. Students report feeling genuinely present in foreign environments, reducing anxiety and increasing engagement. The technology provides immediate feedback on pronunciation, grammar, and cultural appropriateness. Advanced systems track eye movement and gestures, providing holistic communication training. Recent VR programs incorporate cultural education, teaching non-verbal communication and social norms alongside language. Users learn not just what to say, but how to say it appropriately in different contexts. Cost remains a barrier, with quality VR headsets and software starting around $400. However, prices are declining rapidly, and many language schools now offer VR labs. Some programs work with smartphone-based VR headsets costing under $30. As technology improves and becomes more affordable, VR language learning may become standard practice, offering experiences previously available only through expensive international travel.",
            date: "December 22, 2024",
            readTime: "7 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&q=80"
        },
        {
            id: 6,
            title: "UNESCO Reports: 40% of World's Languages Face Extinction by 2100",
            excerpt: "Alarming new report reveals thousands of indigenous languages are disappearing, prompting urgent global preservation efforts and digital archiving initiatives.",
            content: "A sobering report from UNESCO warns that approximately 40% of the world's 7,000 languages face extinction by the end of this century, representing an unprecedented loss of human cultural heritage. The Atlas of the World's Languages in Danger identifies 3,000 languages as endangered, with one language disappearing every two weeks on average. Indigenous and minority languages are most at risk, particularly in regions experiencing rapid globalization and urbanization. Many endangered languages have fewer than 1,000 speakers, often elderly individuals in isolated communities. When languages die, humanity loses unique ways of understanding the world, traditional knowledge, and centuries of cultural wisdom. Dr. Kofi Yakubu, UNESCO's Director for Languages, explains: 'Each language embodies unique perspectives on reality, philosophy, and human experience. Losing them impoverishes all of humanity.' The crisis has sparked urgent preservation efforts. Digital archiving projects are recording native speakers, documenting grammar, and creating learning materials before languages disappear forever. The Endangered Languages Project, supported by Google, has documented over 3,000 at-risk languages with audio recordings, texts, and teaching resources. Indigenous communities are leading revitalization efforts. The Māori language in New Zealand and Hawaiian in the United States show successful revival through immersion schools and cultural programs. Technology plays a crucial role - apps like Duolingo now offer courses in endangered languages like Navajo and Irish, making them accessible to younger generations. Social media has created new spaces for minority language use, helping communities connect across distances. However, challenges remain. Many languages lack writing systems, making documentation difficult. Government support varies widely, with some countries actively suppressing minority languages. Linguists emphasize that language preservation requires more than documentation - it needs active use in communities. The report calls for urgent policy changes: recognizing linguistic rights, funding preservation programs, and supporting indigenous education in native languages.",
            date: "December 21, 2024",
            readTime: "8 min read",
            category: "Global Programs",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
        },
        {
            id: 7,
            title: "European Union Mandates Three Languages for All Citizens by 2030",
            excerpt: "Ambitious new policy requires EU citizens to speak their native language plus two additional European languages, with massive funding for education programs.",
            content: "The European Union has announced a landmark language policy requiring all citizens to achieve proficiency in three languages by 2030: their native tongue plus two additional European languages. The initiative, backed by €50 billion in funding, represents the most ambitious multilingual education program in history. The policy, called 'Polyglot Europe 2030,' responds to research showing multilingualism drives economic growth, cultural understanding, and political unity. The EU Commission cites studies demonstrating that multilingual workers earn 10-15% more than monolingual peers and that language skills facilitate the free movement of labor across member states. Under the program, language learning becomes mandatory from age 6, with standardized proficiency testing at key educational stages. Schools receive funding for exchange programs, native-speaker teachers, and digital learning resources. The policy prioritizes practical communication skills over academic grammar, focusing on real-world usage. Critics raise concerns about implementation challenges and potential disadvantages for older citizens. However, the program includes provisions for adults, offering free evening courses, online learning platforms, and workplace language training. Employers receive tax incentives for supporting employee language learning. Early adopter countries like Luxembourg and the Netherlands, where trilingualism is already common, provide models for implementation. Their experience shows that with proper support, most citizens can achieve functional proficiency in multiple languages. The policy allows flexibility in language choice, though promoting smaller languages like Estonian, Maltese, and Irish remains a priority. Digital tools play a central role - the EU has developed a unified language learning app integrating AI tutoring, conversation practice, and cultural content. The platform is free for all EU residents and includes courses in all 24 official EU languages. EU Commission President stated: 'In our interconnected Europe, multilingualism isn't just practical - it's essential for unity, understanding, and opportunity.' Success could inspire similar initiatives globally, potentially transforming language education worldwide.",
            date: "December 20, 2024",
            readTime: "7 min read",
            category: "Policy",
            image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=800&q=80"
        },
        {
            id: 8,
            title: "Chinese Language Learning Surges 300% Globally Amid Economic Growth",
            excerpt: "Mandarin Chinese becomes the fastest-growing second language worldwide, driven by China's economic influence and expanding business opportunities.",
            content: "Mandarin Chinese has emerged as the fastest-growing second language globally, with learners increasing by 300% over the past five years. This explosive growth reflects China's expanding economic influence and the increasing importance of Chinese language skills in international business. According to the International Language Learning Association, over 200 million people worldwide are now learning Chinese, compared to 67 million in 2019. The United States has seen particularly dramatic growth, with Chinese language enrollments in universities increasing by 250%. High schools are rapidly adding Chinese programs, often replacing European languages in curricula. Business professionals constitute the fastest-growing learner segment. Companies across industries - from technology to finance to manufacturing - now consider Chinese language skills essential for career advancement. LinkedIn data shows that job postings requiring Chinese proficiency have increased by 400% since 2020. Online learning platforms report unprecedented demand. Coursera's Chinese courses have 15 million active learners, while ChineseSkill and HelloChinese have gained tens of millions of users. The apps use gamification and AI to make learning the notoriously difficult language more accessible. China's government actively supports this trend through the Confucius Institute program, which operates in 162 countries, providing teachers, materials, and cultural programs. The Chinese Bridge program offers scholarships for foreigners to study in China. Technology is addressing traditional learning challenges. AI-powered apps now provide tone recognition for Chinese pronunciation, character recognition for writing practice, and contextual explanations for cultural concepts. Virtual reality programs simulate immersion in Chinese environments. Universities worldwide are expanding Chinese departments, hiring more instructors, and developing innovative teaching methods. Many offer combined business-Chinese programs preparing students for international careers. Cultural factors also drive interest. Chinese media - films, music, and literature - are gaining global popularity, motivating learners beyond professional needs. Social media platforms like TikTok expose millions to Chinese language and culture daily.",
            date: "December 19, 2024",
            readTime: "6 min read",
            category: "Trends",
            image: "https://images.unsplash.com/photo-1523540939399-141cbff6a8d7?w=800&q=80"
        }
    ];

    const categories = ['All', 'Industry News', 'Research', 'Technology', 'Global Programs', 'Policy', 'Trends'];

    const filteredNews = newsArticles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const breakingNews = newsArticles.filter(article => article.breaking);
    const trendingNews = newsArticles.filter(article => article.trending).slice(0, 4);
    const regularNews = filteredNews.filter(article => !article.breaking);

    const categoryIcons = {
        'Industry News': <FaChartLine />,
        'Research': <FaBookReader />,
        'Technology': <FaLaptop />,
        'Global Programs': <FaGlobeAmericas />,
        'Policy': <FaTrophy />,
        'Trends': <FaFire />
    };

    return (
        <div className="bg-gray-50">
            <Helmet>
                <title>Language Learner | News</title>
            </Helmet>

           {/* Hero Section */}
            <div className="bg-gradient-to-br from-gray-950 via-purple-800 to-gray-900   py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <FaFire className="text-white text-3xl animate-pulse" />
                            <span className="text-white text-xl font-bold">Latest News</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Language Learning News
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            Stay updated with the latest trends, research, and innovations in language education
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Search news..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-4 py-4 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Breaking News Ticker */}
            {breakingNews.length > 0 && (
                <div className="bg-red-800 text-white py-3 overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 animate-marquee">
                            <span className="bg-white text-red-600 px-4 py-1 rounded-full font-bold text-sm flex-shrink-0">
                                🔴 BREAKING
                            </span>
                            {breakingNews.map(news => (
                                <Link
                                    key={news.id}
                                    to={`/news/${news.id}`}
                                    state={{ article: news }}
                                    className="hover:underline flex-shrink-0"
                                >
                                    {news.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

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
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main News Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-2 h-8 bg-gradient-to-b from-gray-950 via-slate-500 to-pink-900  rounded-full"></div>
                            <h2 className="text-3xl font-bold text-gray-800">Top Stories</h2>
                        </div>

                        {filteredNews.length > 0 ? (
                            <div className="space-y-8">
                                {regularNews.map((article, index) => (
                                    <article
                                        key={article.id}
                                        className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group ${index === 0 ? 'lg:col-span-2' : ''
                                            }`}
                                    >
                                        <div className={`grid ${index === 0 ? 'md:grid-cols-2' : 'md:grid-cols-5'} gap-0`}>
                                            <div className={`relative ${index === 0 ? 'h-80 md:h-auto' : 'h-48 md:col-span-2'} overflow-hidden`}>
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                                                        {categoryIcons[article.category]}
                                                        {article.category}
                                                    </span>
                                                </div>
                                                {article.trending && (
                                                    <div className="absolute top-4 right-4">
                                                        <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                            <FaFire /> Trending
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={`p-6 ${index === 0 ? '' : 'md:col-span-3'} flex flex-col justify-center`}>
                                                <h3 className={`${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-2`}>
                                                    {article.title}
                                                </h3>

                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {article.excerpt}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                                                    <span className="flex items-center gap-1">
                                                        <FaCalendar className="text-red-600" />
                                                        {article.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaClock className="text-red-600" />
                                                        {article.readTime}
                                                    </span>
                                                </div>

                                                <Link
                                                    to={`/news/${article.id}`}
                                                    state={{ article }}
                                                    className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-4 transition-all duration-300 group/btn"
                                                >
                                                    Read Full Story
                                                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl">
                                <div className="text-6xl mb-4">📰</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No News Found</h3>
                                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">

                        {/* Trending Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <FaFire className="text-red-600 text-xl" />
                                <h3 className="text-2xl font-bold text-gray-800">Trending Now</h3>
                            </div>

                            <div className="space-y-6">
                                {trendingNews.map((article, index) => (
                                    <Link
                                        key={article.id}
                                        to={`/news/${article.id}`}
                                        state={{ article }}
                                        className="block group"
                                    >
                                        <div className="flex gap-4">
                                            <div className="text-3xl font-bold text-red-600/20 group-hover:text-red-600/40 transition-colors flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                                                    {article.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <FaClock />
                                                    {article.readTime}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-gradient-to-br from-gray-950 via-purple-800 to-gray-900       rounded-2xl shadow-lg p-6 text-white sticky">
                            <h3 className="text-2xl font-bold mb-3 text-white">Stay Informed</h3>
                            <p className="mb-6 text-white/90">
                                Get the latest language learning news delivered to your inbox
                            </p>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-3 rounded-lg mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button className="w-full bg-white text-red-600 py-3 rounded-lg font-bold hover:shadow-xl transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-gray-950 via-purple-800 to-gray-900    py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Join the Language Learning Revolution
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Stay ahead with the latest trends, tools, and techniques
                        </p>
                        <Link
                            to="/register"
                            className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300"
                        >
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;