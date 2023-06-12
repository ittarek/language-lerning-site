import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useClass = () => {
  // const url ="https://b7-a12-summer-camp-server-side-inky.vercel.app/"
  const { spinner } = useContext(AuthContext);
  const {
    data: classes = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],

    // enabled: !spinner,

    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/AllClasses`);
      return res.json();
    },
  });
  return [classes, loading, refetch];
};

export default useClass;
