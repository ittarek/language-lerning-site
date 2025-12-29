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
import axios from "axios";

const auth = getAuth(app);
// google provider
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [spinner, setSpinner] = useState(true);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [error, setError] = useState("");

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
    // user data update
    const userUpdating = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };
    // user observe

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log("user login  ", currentUser);

            // get and set token
            if (currentUser) {
                axios
                    .post(`${import.meta.env.VITE_API_URL}/jwt`, {
                        email: currentUser?.email,
                    })
                    .then((data) => {
                        // console.log(data.data.token)

                        localStorage.setItem("access-token", data.data.token);
                        setSpinner(false);
                    });
            } else {
                localStorage.removeItem("access-token");
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

    return (
        <AuthContext.Provider value={authInfo}>{children} </AuthContext.Provider>
    );
};

export default AuthProvider;
