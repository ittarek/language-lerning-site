// ✅ Language Learning Loading Spinner
const PageLoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="text-center space-y-6">
        {/* Animated Spinner */}
        <div className="flex justify-center">
          <div className="relative w-20 h-20">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-600 animate-spin"></div>

            {/* Inner ring - slower */}
            <div
              className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-600 border-l-purple-600 animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>

            {/* Center dot */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800">Learning...</h3>
          <p className="text-sm text-gray-600">Preparing your Content</p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center gap-1">
          <div
            className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: '0s' }}></div>
          <div
            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}></div>
          <div
            className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
            style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};
export default PageLoadingSpinner;