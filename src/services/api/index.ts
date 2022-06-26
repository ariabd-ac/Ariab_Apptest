import axios from "axios";

const instance = axios.create({
  baseURL: "https://simple-contact-crud.herokuapp.com",
  // timeout: 1000,
});

// Request interceptors
instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptors
instance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      return instance(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default instance;
