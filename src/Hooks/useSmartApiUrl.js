import { useEffect, useState } from 'react';

const useSmartApiUrl = () => {
  const [apiUrl, setApiUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectApiUrl = async () => {
      const localUrl = 'http://localhost:5000/api';
      const liveUrl = 'https://b7-a12-summer-camp-server-side-inky.vercel.app/api';

      // Production - always use live
      if (import.meta.env.MODE === 'production') {
        console.log('🌐 Production Mode → Using Live Server');
        setApiUrl(liveUrl);
        setIsLoading(false);
        return;
      }

      // Development - try local first, fallback to live
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000); // 3 second timeout

        const response = await fetch(`${localUrl}/`, {
          method: 'GET',
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (response.ok) {
          console.log('✅ Local Server Running → Using Localhost');
          setApiUrl(localUrl);
        } else {
          throw new Error('Server not responding');
        }
      } catch (error) {
        console.warn('⚠️ Local Server Down → Using Live Server');
        console.warn('Error:', error.message);
        setApiUrl(liveUrl);
      }

      setIsLoading(false);
    };

    detectApiUrl();
  }, []);

  return { apiUrl, isLoading };
};

export default useSmartApiUrl;
