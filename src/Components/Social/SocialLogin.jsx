import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../config/api/Config';

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const API_URL = getApiUrl();

  const handleLogin = async () => {
    try {
      const result = await googleLogin();
      const loggedUser = result.user;
      console.log(loggedUser);

      const savedUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        PhotoURL: loggedUser.photoURL,
      };

      // Fix: fetch() সঠিক syntax
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(savedUser),
      });

      await response.json();
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="mx-auto w-1/2">
      <button
        onClick={handleLogin}
        className="w-full -mt-20 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
        <FaGoogle className="inline" /> Continue With Google
      </button>
    </div>
  );
};

export default SocialLogin;
