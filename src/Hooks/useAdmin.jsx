import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure.jsx";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider.jsx";


const useAdmin = () => {
  const { user, Spinner } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !Spinner,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      // console.log("is admin response", res);
      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
