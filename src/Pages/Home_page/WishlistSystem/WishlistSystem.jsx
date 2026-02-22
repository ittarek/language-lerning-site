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
import 'react-toastify/dist/ReactToastify.css';
import {
  SocialButton,
  TabButtonGroup,
  ViewDetailsButton,
  WishlistButton,
} from '../../../Components/ui/Button';
import useFetchData from '../../../Hooks/useFetchTeacher';
import { RenderCard } from './RenderCard';

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

    const tabs = Object.keys(wishlist);
    const activeIds = wishlist[activeTab] || [];

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

  const isInWishlist = (itemId, type) => {
    return wishlistItems[type]?.some(item => item.id === itemId) || false;
  };

  const getTotalWishlistCount = () => {
    return Object.values(wishlistItems).reduce((acc, items) => acc + items.length, 0);
  };
  const wishlistData = JSON.parse(localStorage.getItem('classData')) || {};
  const activeIds = wishlistData[activeTab] || [];

  let currentData = [];
  if (activeTab === 'classes') currentData = classes;
  else if (activeTab === 'news') currentData = news;
  else if (activeTab === 'blogs') currentData = blogs;

  const filteredItems = currentData.filter(item =>
    !searchTerm
      ? true
      : item?.class_name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

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
            {filteredItems.map(item => (
              <RenderCard
                key={item._id}
                item={item}
                type={activeTab}
                isInWishlist={isInWishlist}
                FaExternalLinkAlt={FaExternalLinkAlt}
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
                saveToLocalStorage={saveToLocalStorage}
              />
            ))}
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
