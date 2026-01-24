import { useContext, useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../config/api/Config';

const SocialLogin = () => {
  const { user, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Save user to database when user changes
  useEffect(() => {
    const saveUserToDb = async () => {
      if (user && !isProcessing) {
        console.log('💾 Saving user to database:', user.email);
        setIsProcessing(true);

        try {
          const savedUser = {
            name: user.displayName,
            email: user.email,
            PhotoURL: user.photoURL,
          };

          const API_URL = getApiUrl();
          console.log('📡 API URL:', API_URL);

          const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(savedUser),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('✅ User saved successfully:', data);

            // Small delay to ensure everything is saved
            setTimeout(() => {
              navigate(from, { replace: true });
            }, 500);
          } else {
            const errorText = await response.text();
            console.error('❌ Server error:', errorText);
            setError('Failed to save user data');
            setIsProcessing(false);
          }
        } catch (error) {
          console.error('❌ Save error:', error);
          setError(error.message);
          setIsProcessing(false);
        }
      }
    };

    saveUserToDb();
  }, [user, navigate, from]);

  const handleLogin = () => {
    if (isProcessing) return;

    console.log('🚀 Starting Google login...');
    setError(null);

    googleLogin().catch(error => {
      console.error('❌ Login error:', error);
      setError(error.message);
    });
  };

  return (
    <div className="mx-auto w-1/2">
      <button
        onClick={handleLogin}
        disabled={isProcessing}
        className="w-full -mt-20 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
        <FaGoogle className="inline" />
        {isProcessing ? ' Processing...' : ' Continue With Google'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default SocialLogin;
