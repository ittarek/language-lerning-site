import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useStudents = () => {
  const { user, spinner } = useContext(AuthContext);
  const { data: isStudent, isLoading: isStudentLoading } = useQuery({
    queryKey: ["isStudent", user?.email],
    enabled: !spinner,
    queryFn: async () => {
      const res = await fetch(`/user/admin/${user?.email}`);

      return res.data.admin;
    },
  });
  return [isStudent, isStudentLoading];
};

export default useStudents;
