import { useQuery } from "@tanstack/react-query";


const useClass = () => {
const url ="http://localhost:5000/classes"
  const { data: classes = [], isLoading:loading ,refetch } = useQuery({
    queryKey: ["classes"],

    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/classes`);
      return res.json();
    },
  });
  return [classes, loading , refetch];
};

export default useClass;
