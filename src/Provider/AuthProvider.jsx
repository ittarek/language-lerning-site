import React, { createContext } from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import app from "./../Firbase/Firebase.config";

const auth = getAuth(app);
// google provider
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [spinner, setSpinner] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);

  //   user create
  const registration = (email, password) => {
    setSpinner(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   user login  function
  const login = (email, password) => {
    setSpinner(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   user login  by google

  const googleLogin = () => {
    setSpinner(true);
    return signInWithPopup(auth, googleProvider);
  };

  //  user logOut
  const loggedOut = () => {
    setSpinner(true);
    signOut(auth);
  };

  // user observe
  useEffect;
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user login  ", currentUser);
      setUser(currentUser);
      setSpinner(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // user data update 
  const userUpdating = (user, name, photoUrl) => {
    updateProfile(user, {
      displayName: name,
      photoURL: photoUrl,
    })
      .then(() => {
        console.log("Your name and photo has been updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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

  return (
    <AuthContext.Provider value={authInfo}>{children} </AuthContext.Provider>
  );
};

export default AuthProvider;
