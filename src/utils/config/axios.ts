import { refresh } from "@services/authService";
import { useAuth } from "@stores/authStore";
import { generateEncryption } from "@utils/helper/generator";
import axios from "axios";

export const axiosOneInstance = axios.create({
  baseURL: import.meta.env.VITE_ONE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export const axiosCloudinaryInstance = axios.create({
  baseURL: `${import.meta.env.VITE_CLOUDINARY_URL}/${
    import.meta.env.VITE_CLOUDINARY_NAME
  }`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 60000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuth.getState().token;

  const skipAuth = config.skipAuth ?? false;

  if (!skipAuth && token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const username = useAuth.getState().username;
    const setAuth = useAuth.getState().setAuth;
    const resetAuth = useAuth.getState().resetAuth;

    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await refresh();

          const newAuthData = {
            token: res.data.access_token,
            username,
          };

          localStorage.setItem(
            "@data",
            generateEncryption(JSON.stringify(newAuthData))
          );

          setAuth({
            token: res.data.access_token,
            username,
          });

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.access_token}`;
        } catch (error) {
          localStorage.removeItem("@data");
          resetAuth();
          Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return axiosInstance(originalRequest);
    }

    return Promise.reject(err);
  }
);
