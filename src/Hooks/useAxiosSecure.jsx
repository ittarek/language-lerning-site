import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

// const ulr = import.meta.env.VITE_API_UR;
const axiosSecure = axios.create({
  baseURL:`${import.meta.env.VITE_API_UR}`
});
const useAxiosSecure = () => {
  const { loggedOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await loggedOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [loggedOut, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
