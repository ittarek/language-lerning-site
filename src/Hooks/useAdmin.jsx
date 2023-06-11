import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure.jsx";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider.jsx";

const useAdmin = () => {
  const {user, spinner} = useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure();
  const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
enabled: !spinner,
      queryKey: ['isAdmin', user?.email],
      queryFn: async () => {
          const res = await axiosSecure.get(`/users/admin/${user?.email}`);
          // console.log('', res)
          return res.data.admin;
      }
  })
  return [isAdmin, isAdminLoading]
}
export default useAdmin;
