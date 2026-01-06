// const API_URL = import.meta.env.MODE === 'production'
//   ? import.meta.env.VITE_API_URL_PROD
//   : import.meta.env.VITE_API_URL_DEV;

// export default API_URL;



let API_URL = null;
let API_URL_PROMISE = null;

const initializeApiUrl = async () => {
  if (API_URL_PROMISE) {
    return API_URL_PROMISE;
  }

  API_URL_PROMISE = (async () => {
    const localUrl = 'http://localhost:5000/api';
    const liveUrl = 'https://b7-a12-summer-camp-server-side-inky.vercel.app/api';

    // Production
    if (import.meta.env.MODE === 'production') {
      console.log('🌐 PRODUCTION MODE');
      API_URL = liveUrl;
      return liveUrl;
    }

    // Development - detect local server
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      await fetch(`${localUrl}/`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeout);
      console.log('✅ LOCAL SERVER DETECTED');
      API_URL = localUrl;
      return localUrl;
    } catch (error) {
      console.warn('⚠️ LOCAL SERVER DOWN - USING LIVE SERVER');
      API_URL = liveUrl;
      return liveUrl;
    }
  })();

  return API_URL_PROMISE;
};

export { initializeApiUrl };

export const getApiUrl = () => {
  if (API_URL) {
    return API_URL;
  }
  // Fallback if called before initialization
  return import.meta.env.MODE === 'production'
    ? 'https://b7-a12-summer-camp-server-side-inky.vercel.app/api'
    : 'http://localhost:5000/api';
};