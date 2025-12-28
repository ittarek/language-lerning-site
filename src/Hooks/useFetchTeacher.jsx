// src/Hooks/useFetchData.js
import { useQuery } from "@tanstack/react-query";

/**
 * Reusable custom hook for fetching data with error handling
 * @param {string} endpoint - API endpoint (e.g., '/TopInstructors')
 * @param {string} queryKey - Unique key for caching
 * @param {object} options - Additional React Query options
 */
const useFetchData = (endpoint, queryKey, options = {}) => {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ;

    return useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const url = `${apiUrl}${endpoint}`;
            console.log(`🔍 Fetching from: ${url}`);

            const response = await fetch(url);

            if (!response.ok) {
                const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                console.error('❌ Fetch error:', errorMessage);
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log(`✅ Fetched ${data.length || 0} items from ${endpoint}`);

            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        retry: 2, // Retry 2 times on failure
        refetchOnWindowFocus: false,
        ...options, // Override defaults if needed
    });
};

export default useFetchData;