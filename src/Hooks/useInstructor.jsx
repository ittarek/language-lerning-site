import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure.jsx";

const useInstructor = () => {
  const { user ,spinner} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor", user?.email],
    enabled: !spinner && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
      // console.log("is instructor response", res.data);
      return res.data.instructor;
    },
  });
  return [isInstructor, isInstructorLoading];
};
export default useInstructor;
