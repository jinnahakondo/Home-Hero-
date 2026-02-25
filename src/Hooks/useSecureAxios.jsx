import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://homehero-server-six.vercel.app",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const useSecureAxios = () => {
  return instance;
};

export default useSecureAxios;
