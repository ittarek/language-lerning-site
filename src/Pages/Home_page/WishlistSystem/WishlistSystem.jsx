import { useState, useEffect } from 'react';
import {
  FaHeart,
  FaBook,
  FaNewspaper,
  FaCalendarAlt,
  FaShareAlt,
  FaExternalLinkAlt,
  FaSearch,
  FaUser,
  FaClock,
  FaStar,
  FaMapMarkerAlt,
  FaUsers,
  FaEye,
  FaBookOpen,
} from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SocialButton,
  TabButtonGroup,
  ViewDetailsButton,
  WishlistButton,
} from '../../../Components/ui/Button';
import useFetchData from '../../../Hooks/useFetchTeacher';

// Mock data for demonstration
const mockData = {
  classes: [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'John Doe',
      duration: '8 weeks',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      rating: 4.8,
      students: 1234,
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      instructor: 'Jane Smith',
      duration: '12 weeks',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      rating: 4.9,
      students: 2341,
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Mike Johnson',
      duration: '6 weeks',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      rating: 4.7,
      students: 987,
    },
  ],
  news: [
    {
      id: 4,
      title: 'Breaking: New AI Technology Revolutionizes Industry',
      category: 'Technology',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      author: 'Tech Daily',
    },
    {
      id: 5,
      title: 'Global Climate Summit Reaches Historic Agreement',
      category: 'Environment',
      date: '2024-01-04',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400',
      author: 'World News',
    },
    {
      id: 6,
      title: 'Stock Markets Hit All-Time High',
      category: 'Finance',
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
      author: 'Finance Today',
    },
  ],
  blogs: [
    {
      id: 7,
      title: '10 Tips for Productive Remote Work',
      author: 'Sarah Williams',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400',
      category: 'Productivity',
    },
    {
      id: 8,
      title: 'The Future of Web Development in 2024',
      author: 'David Chen',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      category: 'Technology',
    },
    {
      id: 9,
      title: 'Mindfulness Practices for Busy Professionals',
      author: 'Emily Brown',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      category: 'Wellness',
    },
  ],
  articles: [
    {
      id: 10,
      title: 'Understanding Quantum Computing',
      views: '45K',
      trending: true,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      author: 'Dr. Robert Lee',
    },
    {
      id: 11,
      title: 'The Rise of Sustainable Fashion',
      views: '38K',
      trending: true,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
      author: 'Fashion Weekly',
    },
    {
      id: 12,
      title: 'Blockchain Beyond Cryptocurrency',
      views: '52K',
      trending: true,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
      author: 'Tech Insights',
    },
  ],
  events: [
    {
      id: 13,
      title: 'Annual Tech Conference 2024',
      date: '2024-03-15',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      attendees: '5K+',
    },
    {
      id: 14,
      title: 'Digital Marketing Summit',
      date: '2024-04-20',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400',
      attendees: '3K+',
    },
    {
      id: 15,
      title: 'Global Startup Expo',
      date: '2024-05-10',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400',
      attendees: '10K+',
    },
  ],
};

const WishlistSystem = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('classes');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showWishlist, setShowWishlist] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  // TanStack query using for data fetch
  const {
    data: classes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchData('/classes/top', 'topClasses', {
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: activeTab === 'classes', // শুধু classes active হলে fetch হবে
  });

  useEffect(() => {
    // get saved IDs
    const wishlist = JSON.parse(localStorage.getItem('classData')) || {};
    console.log(Object.keys(localStorage));
    const tabs = Object.keys(wishlist);
    const activeIds = wishlist[activeTab] || [];
    console.log(tabs);

    const filteredData = classes?.filter(item => activeIds.includes(item._id));
    console.log(filteredData);

    setTabs(tabs);
    // get data
    const getWishlistData = classes?.filter(item =>
      wishlist?.classes?.includes(item._id)
    );
    setWishlistItems(getWishlistData);
    setIsBookmarked(wishlist?.classes?.includes(getWishlistData[0]?._id));
  }, []);

  const saveToLocalStorage = items => {
    localStorage.setItem('wishlistItems', JSON.stringify(items));
  };

  const addToWishlist = (item, type) => {
    const newWishlistItems = {
      ...wishlistItems,
      [type]: [...(wishlistItems[type] || []), item],
    };
    setWishlistItems(newWishlistItems);
    saveToLocalStorage(newWishlistItems);
    toast.success('Added to wishlist! ❤️', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const removeFromWishlist = (itemId, type) => {
    const newWishlistItems = {
      ...wishlistItems,
      [type]: wishlistItems[type].filter(item => item.id !== itemId),
    };
    setWishlistItems(newWishlistItems);
    saveToLocalStorage(newWishlistItems);
    toast.info('Removed from wishlist', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const isInWishlist = (itemId, type) => {
    return wishlistItems[type]?.some(item => item.id === itemId) || false;
  };

  const getTotalWishlistCount = () => {
    return Object.values(wishlistItems).reduce((acc, items) => acc + items.length, 0);
  };

  // const tabs = [
  //   {
  //     id: 'classes',
  //     label: 'Classes',
  //     icon: FaBookOpen,
  //     count: wishlistItems.classes?.length || 0,
  //   },
  //   {
  //     id: 'news',
  //     label: 'News',
  //     icon: FaNewspaper,
  //     count: wishlistItems.news?.length || 0,
  //   },
  //   {
  //     id: 'blogs',
  //     label: 'Blogs',
  //     icon: FaBookOpen,
  //     count: wishlistItems.blogs?.length || 0,
  //   },
  //   {
  //     id: 'articles',
  //     label: 'Trending Articles',
  //     icon: MdTrendingUp,
  //     count: wishlistItems.articles?.length || 0,
  //   },
  //   {
  //     id: 'events',
  //     label: 'Events',
  //     icon: FaCalendarAlt,
  //     count: wishlistItems.events?.length || 0,
  //   },
  // ];
  const [data, setData] = useState([]);
  const wishlistData = JSON.parse(localStorage.getItem('classData')) || {};
  const activeIds = wishlistData[activeTab] || [];

  let currentData = [];
  if (activeTab === 'classes') currentData = classes;
  else if (activeTab === 'news') currentData = news;
  else if (activeTab === 'blogs') currentData = blogs;

  const filteredItems = currentData.filter(item =>
    !searchTerm ? true : item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //   const filteredItems = () => {
  //   const wishlistData = JSON.parse(localStorage.getItem('classData')) || {};

  //     const ids = wishlistData[activeTab] || [];
  //     console.log("ids",ids);

  //   const sourceData = classes[activeTab] || [];

  // console.log('data', sourceData);

  //   // ID match করে full object বের করা
  //   const matchedItems = sourceData.filter(item => ids.includes(item._id));
  // console.log("match",matchedItems);

  //   // search filter
  //   if (!searchTerm) return matchedItems;

  //   return matchedItems.filter(item =>
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   };

  const renderCard = (item, type) => {
    const inWishlist = isInWishlist(item._id, type);
    const {
      available_seats,
      class_imgUrl,
      class_name,
      created_at,
      description,
      enrolled_students,
      experience,
      instructor_description,
      instructor_designation,
      instructor_email,
      instructor_img,
      instructor_name,
      instructor_rating,
      instructor_students_count,
      price,
      status,
      updated_at,
      _id,
      contact,
      social_links,
    } = item;
    return (
      <div
        key={_id}
        className="group relative bg-white h-[45vh] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={class_imgUrl}
            alt={class_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <button
            onClick={() =>
              inWishlist ? removeFromWishlist(_id, type) : addToWishlist(item, type)
            }
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
              inWishlist
                ? 'bg-red-500 text-white scale-110'
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}>
            <FaHeart className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {class_name || item.title}
          </h3>

          {type === 'classes' && (
            <div className="space-y-2">
              <p className="text-gray-600 flex items-center gap-2">
                <FaUser className="w-4 h-4" /> {instructor_name}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <FaClock className="w-4 h-4" /> 5 hours/week
                </span>
                <span className="text-sm font-semibold text-amber-500 flex items-center gap-1">
                  <FaStar className="w-4 h-4" /> {instructor_rating}
                </span>
              </div>
            </div>
          )}

          {type === 'news' && (
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {item.category}
              </span>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4" /> {item.date}
              </p>
            </div>
          )}

          {type === 'blogs' && (
            <div className="space-y-2">
              <p className="text-gray-600 flex items-center gap-2">
                <FaUser className="w-4 h-4" /> {item.author}
              </p>
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <FaClock className="w-4 h-4" /> {item.readTime}
              </span>
            </div>
          )}

          {type === 'articles' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <FaEye className="w-4 h-4" /> {item.views} views
                </span>
                {item.trending && (
                  <span className="flex items-center gap-1 text-orange-500 font-semibold">
                    <MdTrendingUp className="w-4 h-4" /> Trending
                  </span>
                )}
              </div>
            </div>
          )}

          {type === 'events' && (
            <div className="space-y-2">
              <p className="text-gray-600 flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4" /> {item.location}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" /> {item.date}
                </span>
                <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                  <FaUsers className="w-4 h-4" /> {item.attendees}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-2 absolute bottom-2 w-full left-0 px-3">
            <ViewDetailsButton text="View" icon={FaExternalLinkAlt} showIcon={true} />
            <SocialButton
              icon={<FaShareAlt className="w-5 h-5" />}
              className="p-2 border-2 border-gray-200 rounded-lg hover:border-blue-500"
              textColor="text-gray-600 hover:text-blue-500"
              bg="bg-transparent"
              hoverBg="hover:bg-blue-50"
            />
          </div>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-8">
            Please login to access your wishlist and save your favorite items.
          </p>
          <ViewDetailsButton
            onClick={() => setIsLoggedIn(true)}
            text="Login Now"
            showIcon={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Toast Container - Correctly Placed */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your{' '}
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Wishlist
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            {getTotalWishlistCount()} items saved across{' '}
            {Object.keys(wishlistItems).length} categories
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your wishlist..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-lg"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <TabButtonGroup
            tabs={tabs.map(tab => ({
              id: tab,
              label: tab.charAt(0).toUpperCase() + tab.slice(1),
            }))}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => renderCard(item, activeTab))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No items in this category
            </h3>
            <p className="text-gray-600 mb-6">Start adding items to your wishlist!</p>
            <ViewDetailsButton
              onClick={() => setShowWishlist(false)}
              text="Browse Items"
              showIcon={false}
              width={false}
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistSystem;
