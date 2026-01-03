// import { useContext, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";

// const useAxiosSecure = () => {
//   const { loggedOut } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const axiosSecure = axios.create({
//     baseURL: `${import.meta.env.VITE_API_URL}`,
//   });

//   useEffect(() => {
//     axiosSecure.interceptors.request.use((config) => {
//       const token = localStorage.getItem("access-token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       return config;
//     });

//     axiosSecure.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (
//           error.response &&
//           (error.response.status === 401 || error.response.status === 403)
//         ) {
//           await loggedOut();
//           navigate("/login");
//         }
//         return Promise.reject(error);
//       }
//     );
//   }, [loggedOut, navigate]);

//   return [axiosSecure];
// };

// export default useAxiosSecure;


import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const useAxiosSecure = () => {
    const { loggedOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecureRef = useRef(null);
    const interceptorsSetRef = useRef(false);

    // Create axios instance only once
    if (!axiosSecureRef.current) {
        axiosSecureRef.current = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 10000, // 10 second timeout
        });
    }

    const axiosSecure = axiosSecureRef.current;

    useEffect(() => {
        // Set up interceptors only once
        if (interceptorsSetRef.current) return;

        // Request interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("access-token");

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                } else {
                    // If no token, optionally log out
                    console.warn("No access token found");
                }

                return config;
            },
            (error) => {
                // Handle request errors
                console.error("Request error:", error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                // Any status code within 2xx range
                return response;
            },
            async (error) => {
                // Any status code outside 2xx range
                const originalRequest = error.config;

                // Handle 401 Unauthorized
                if (error.response?.status === 401) {
                    console.warn("Unauthorized access - logging out");
                    await loggedOut();
                    navigate("/login");
                    return Promise.reject(error);
                }

                // Handle 403 Forbidden
                if (error.response?.status === 403) {
                    console.warn("Forbidden access");
                    await loggedOut();
                    navigate("/login");
                    return Promise.reject(error);
                }

                // Handle 500 Server Error
                if (error.response?.status === 500) {
                    console.error("Server error:", error.response.data);
                    return Promise.reject(error);
                }

                // Handle network errors
                if (!error.response) {
                    console.error("Network error:", error.message);
                    return Promise.reject(error);
                }

                return Promise.reject(error);
            }
        );

        // Mark interceptors as set
        interceptorsSetRef.current = true;

        // Cleanup function to eject interceptors on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
            interceptorsSetRef.current = false;
        };
    }, [axiosSecure, loggedOut, navigate]);

    return [axiosSecure];
};

export default useAxiosSecure;