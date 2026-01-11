import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { getApiUrl } from '../config/api/Config';
const useClass = () => {
  const { spinner } = useContext(AuthContext);

  const {
    data: classes = [],
    isLoading: loading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['classes'],
    enabled: !spinner,

    queryFn: async () => {
      try {
        const API_URL = getApiUrl();
        const apiUrl = `${API_URL}/classes`;

        // console.log('📡 Fetching from:', apiUrl);

        const res = await fetch(apiUrl);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        // console.log('✅ Classes:', data);
        return data;
      } catch (error) {
        console.error('❌ Error:', error);
        throw error;
      }
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return [classes, loading, refetch, error];
};

export default useClass;
