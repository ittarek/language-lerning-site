import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useInstructors = () => {
  const { user, spinner } = useContext(AuthContext);
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor", user?.email],
    enabled: !spinner,
    queryFn: async () => {
      const res = await fetch(`/users/instructor/${user?.email}`);
// console.log("useInstructor",res.data);
      return res.data.instructor;
    },
  });
  return [isInstructor, isInstructorLoading];
};

export default useInstructors;
