import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../config/api/Config';

const SocailLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const API_URL = getApiUrl();
  const handleLogin = () => {
    googleLogin().then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      const savedUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        PhotoURL: loggedUser.photoURL,
      };
      fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(savedUser),
      })
        .then(res => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };
  return (
    <div className="mx-auto w-1/2">
      <button
        onClick={handleLogin}
        className="w-full -mt-20 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
        <FaGoogle className="inline "></FaGoogle> Continue With Google
      </button>
    </div>
  );
};

export default SocailLogin;
