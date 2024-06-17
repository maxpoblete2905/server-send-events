import axios from 'axios';

export const createBearerTokenFromUser = (accesToken: string) => {
 return btoa(JSON.stringify(accesToken));
};

export const createAuthorizationHeader = (token: string) => {
 axiosInstance.interceptors.request.use(
  (config) => {
   if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
  },
  (error) => Promise.reject(error),
 );
};

const axiosInstance = axios.create({
 headers: {
  'Content-Type': 'application/json',
 },
});

export default axiosInstance;
