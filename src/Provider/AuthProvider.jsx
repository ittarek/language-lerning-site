import { createContext } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import app from './../Firbase/Firebase.config';
import axios from 'axios';
import { getApiUrl } from '../config/api/Config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [spinner, setSpinner] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);

  // User create/registration
  const registration = (email, password) => {
    setSpinner(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // User login function
  const login = (email, password) => {
    setSpinner(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // User login by Google
  const googleLogin = () => {
    setSpinner(true);
    return signInWithPopup(auth, googleProvider);
  };

  // User logout
  const loggedOut = () => {
    setSpinner(true);
    return signOut(auth).then(() => {
      localStorage.removeItem('access-token');
      setSpinner(false);
    });
  };

  // User data update
  const userUpdating = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // User observer - watch for auth changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async currentUser => {
      // console.log('🔐 Auth State Changed:', currentUser?.email || 'No user');

      setUser(currentUser);

      if (currentUser) {
        try {
          const API_URL = getApiUrl();
          // ✅ FIXED: Use correct API endpoint with /api/auth prefix
          const jwtUrl = `${API_URL}/auth/jwt`;

          // console.log('🔑 Requesting JWT from:', jwtUrl);

          const response = await axios.post(jwtUrl, {
            email: currentUser.email,
          });

          if (response.data.token) {
            // console.log('✅ JWT Token received');
            localStorage.setItem('access-token', response.data.token);
          } else {
            console.warn('⚠️ No token in response');
          }

          setSpinner(false);
        } catch (error) {
          console.error('❌ JWT Error:', error.message);
          console.error('❌ Full Error:', error.response?.data || error);

          // Still set spinner to false even if JWT fails
          setSpinner(false);
        }
      } else {
        // No user logged in
        // console.log('ℹ️ User logged out');
        localStorage.removeItem('access-token');
        setSpinner(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    registration,
    login,
    loggedOut,
    googleLogin,
    setSpinner,
    spinner,
    photoUrl,
    userUpdating,
  };

  // console.log('🔐 AuthProvider State:', {
  //   userEmail: user?.email || 'No user',
  //   spinner,
  //   hasToken: !!localStorage.getItem('access-token'),
  // });

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
