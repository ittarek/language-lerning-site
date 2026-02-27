import { useState, useEffect, useContext } from 'react';
import {
  FaHeart,
  FaSearch,
  FaTrash,
  FaBookOpen,
  FaNewspaper,
  FaCalendarAlt,
  FaGraduationCap,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TabButtonGroup, ViewDetailsButton } from '../../../Components/ui/Button';
import useFetchData from '../../../Hooks/useFetchTeacher';
import { RenderCard } from './RenderCard';
import { AuthContext } from '../../../Provider/AuthProvider';

const TAB_ICONS = {
  classes: <FaGraduationCap />,
  blogs: <FaBookOpen />,
  news: <FaNewspaper />,
  events: <FaCalendarAlt />,
};

const WishlistSystem = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('classes');
  const [wishlistIds, setWishlistIds] = useState({});
  const [tabs, setTabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch classes from API
  const { data: classes = [], isLoading } = useFetchData('/classes/top', 'topClasses', {
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: activeTab === 'classes',
  });

  // Load wishlist IDs from localStorage
  const loadWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('classData')) || {};
    setWishlistIds(wishlist);
    const existingTabs = Object.keys(wishlist).filter(key => wishlist[key]?.length > 0);
    setTabs(existingTabs);
    // set active tab to first available
    if (existingTabs.length > 0 && !existingTabs.includes(activeTab)) {
      setActiveTab(existingTabs[0]);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);


  // Get current tab's IDs
  const activeIds = wishlistIds[activeTab] || [];
  const blogs = JSON.parse(localStorage.getItem('classData') || '[]');
  console.log(blogs.blogs);
  
  // Filter data based on active tab
  const currentData = activeTab === 'classes' ? classes : [];

  const filteredItems = currentData
    .filter(item => activeIds.includes(item._id))
    .filter(item =>
      !searchTerm
        ? true
        : item?.class_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalCount = Object.values(wishlistIds).reduce(
    (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-8">
            Please login to access your wishlist and save your favorite items.
          </p>
          <ViewDetailsButton text="Login Now" showIcon={false} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your{' '}
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Wishlist
            </span>
          </h1>
          <p className="text-gray-500 text-lg">
            {totalCount} items saved across {tabs.length} categories
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your wishlist..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-lg bg-white"
            />
          </div>
        </div>

        {/* Tabs */}
        {tabs.length > 0 && (
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                }`}>
                {TAB_ICONS[tab] || <FaHeart />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                  {(wishlistIds[tab] || []).length}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cards */}
        {!isLoading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <RenderCard
                key={item._id}
                item={item}
                type={activeTab}
                FaExternalLinkAlt={null}
                setWishlistIds={setWishlistIds}
                setTabs={setTabs}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {tabs.length === 0 ? 'Your wishlist is empty' : 'No items in this category'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'No results match your search.'
                : 'Start adding items to your wishlist!'}
            </p>
            <ViewDetailsButton
              text="Browse Classes"
              showIcon={false}
              width={false}
              className="mx-auto"
              to="/classes"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistSystem;
