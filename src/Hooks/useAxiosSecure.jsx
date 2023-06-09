import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
// const ulr = import.meta.env.VITE_API_UR;
const axiosSecure = axios.create({
  baseURL:`${import.meta.env.VITE_API_UR}`
});
const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
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
          await signOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [signOutUser, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
