import axios from 'axios';
export const authAxiosInstance =axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URI,
    withCredentials:true
})

authAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default authAxiosInstance