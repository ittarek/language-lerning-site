import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useClass = () => {
    const { spinner } = useContext(AuthContext);

    const {
        data: classes = [],
        isLoading: loading,
        refetch,
        error,
    } = useQuery({
        queryKey: ["classes"],

        // ✅ FIXED: Query should run when spinner is FALSE (loading is complete)
        enabled: !spinner,

        queryFn: async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/AllClasses`
                );

                if (!res.ok) {
                    throw new Error(`Failed to fetch classes: ${res.status}`);
                }

                return res.json();
            } catch (error) {
                console.error("Error fetching classes:", error);
                throw error;
            }
        },

        // Optional: Add retry and caching
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        retry: 1,
        retryDelay: 1000,
    });

    return [classes, loading, refetch, error];
};

export default useClass;