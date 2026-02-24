import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaDollarSign,
  FaUserAlt,
  FaChair,
  FaCheckCircle,
  FaLock,
  FaExclamationTriangle,
  FaHeart,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import useInstructor from '../../Hooks/useInstructor';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { handleWishlist } from '../../utils/wishlist/wishlist';

const AllClasses = ({ classes, refetch }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSelection, setIsCheckingSelection] = useState(true);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const {
    instructor_name,
    instructor_email,
    class_name,
    class_imgUrl,
    available_seats,
    price,
    _id,
    enrolled_students,
  } = classes;

  // Check if class is available
  const isAvailable = available_seats > 0;
  const isDisabled = isAdmin || isInstructor || !isAvailable || isSelected;

  // Check if user has already selected this class
  useEffect(() => {
    const checkIfAlreadySelected = async () => {
      if (!user?.email) {
        setIsCheckingSelection(false);
        return;
      }

      try {
        const response = await axiosSecure.get(
          `/selectedClass/check?studentEmail=${user.email}&classId=${_id}`
        );

        if (response.data.isSelected) {
          setIsSelected(true);
        }
      } catch (error) {
        console.error('Error checking selection status:', error);
      } finally {
        setIsCheckingSelection(false);
      }
    };

    checkIfAlreadySelected();
  }, [user?.email, _id, axiosSecure]);

  const handleSelect = async () => {
    // Check if user is logged in
    if (!user?.email) {
      const result = await Swal.fire({
        title: 'Login Required',
        text: 'Please login to select this class',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#4F46E5',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        navigate('/login', { state: { from: window.location.pathname } });
      }
      return;
    }

    setIsLoading(true);

    try {
      const selectedClass = {
        instructor_name,
        instructor_email,
        class_name,
        class_imgUrl,
        available_seats,
        price: parseFloat(price),
        classId: _id,
        enrolled_students,
        studentEmail: user.email,
        selectedAt: new Date().toISOString(),
      };

      const response = await axiosSecure.post('/selectedClass', selectedClass);

      if (response.data.insertedId) {
        setIsSelected(true);

        await Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Class Added Successfully!',
          text: 'Check your dashboard to proceed with enrollment',
          showConfirmButton: false,
          timer: 2000,
        });

        if (refetch) refetch();
      }
    } catch (error) {
      console.error('Error selecting class:', error);

      // Check if error is due to duplicate selection
      if (error.response?.status === 409) {
        setIsSelected(true);
        Swal.fire({
          icon: 'info',
          title: 'Already Selected',
          text: 'You have already selected this class!',
          confirmButtonColor: '#4F46E5',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:
            error.response?.data?.message || 'Something went wrong! Please try again.',
          confirmButtonColor: '#4F46E5',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  // wishlist
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('classData')) || {};
    const classId = wishlist.classes || [];
    const idSet = new Set(classId); // because we will store only IDs
    setIsBookmarked(idSet.has(_id));
  }, [_id]);
  // Get button content based on state
  const getButtonContent = () => {
    if (isCheckingSelection) {
      return (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Checking...
        </>
      );
    }

    if (isLoading) {
      return (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Adding...
        </>
      );
    }

    if (isSelected) {
      return (
        <>
          <FaCheckCircle />
          Selected
        </>
      );
    }

    if (!isAvailable) {
      return (
        <>
          <FaExclamationTriangle />
          Seats Full
        </>
      );
    }

    if (isAdmin) {
      return (
        <>
          <FaLock />
          Admin Not Allowed
        </>
      );
    }

    if (isInstructor) {
      return (
        <>
          <FaLock />
          Instructor Not Allowed
        </>
      );
    }

    return 'Select Class';
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl  shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 ${
        !isAvailable ? 'opacity-75' : ''
      } ${isDisabled ? '' : 'hover:border-indigo-200'}`}>
      {/* Unavailable Overlay */}
      <div className=" absolute top-2 left-2 z-10 inset-2">
        <div className="flex justify-between items-start">
          {' '}
          {/* Bookmark button */}
          {isAdmin || isInstructor ? null :
            <button
            onClick={() => handleWishlist(_id, 'classes', setIsBookmarked, user)}
            className={`shadow-lg  hover:scale-110  p-1 rounded-full backdrop-blur-md transition-all duration-300  ${
              isBookmarked
                ? 'bg-red-500 text-white scale-110'
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}>
            <FaHeart className="w-5 h-5" />
          </button>}
          {!isAvailable && (
            <div className="">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Seats Full
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <FaCheckCircle />
            Selected
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <img
          src={class_imgUrl || 'https://via.placeholder.com/400x300'}
          alt={class_name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isDisabled ? 'scale-100' : 'group-hover:scale-110'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {class_name}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
            <FaUserAlt className="text-indigo-600 text-sm" />
          </div>
          <span className="text-sm font-medium truncate">{instructor_name}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Available Seats */}
          <div
            className={`rounded-xl p-3 text-center transition-colors ${
              available_seats === 0 ? 'bg-red-50' : 'bg-blue-50 group-hover:bg-blue-100'
            }`}>
            <FaChair
              className={`mx-auto mb-1 text-lg ${
                available_seats === 0 ? 'text-red-600' : 'text-blue-600'
              }`}
            />
            <div
              className={`text-lg font-bold ${
                available_seats === 0 ? 'text-red-600' : 'text-gray-800'
              }`}>
              {available_seats}
            </div>
            <div className="text-xs text-gray-600">Available</div>
          </div>

          {/* Price */}
          <div className="bg-green-50 group-hover:bg-green-100 rounded-xl p-3 text-center transition-colors">
            <FaDollarSign className="text-green-600 text-lg mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-800">{price}</div>
            <div className="text-xs text-gray-600">Price</div>
          </div>
        </div>

        {/* Enrolled Students */}
        {enrolled_students > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-sm text-gray-600">Students Enrolled</span>
            <span className="text-sm font-bold text-indigo-600">{enrolled_students}</span>
          </div>
        )}

        {/* Select Button */}
        <button
          onClick={handleSelect}
          disabled={isDisabled || isLoading || isCheckingSelection}
          className={`w-full py-3 rounded-b-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 bottom-0 absolute left-0 z-20  ${
            isDisabled || isLoading || isCheckingSelection
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : isSelected
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
          }`}>
          {getButtonContent()}
        </button>

        {/* Warning Messages */}
        {isAdmin && (
          <p className="text-xs text-center text-gray-500">
            Admins cannot select classes
          </p>
        )}
        {isInstructor && (
          <p className="text-xs text-center text-gray-500">
            Instructors cannot select classes
          </p>
        )}
      </div>

      {/* Hover Border Effect */}
      {!isDisabled && (
        <div className="absolute inset-0 border-2 border-indigo-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}
    </div>
  );
};

export default AllClasses;
