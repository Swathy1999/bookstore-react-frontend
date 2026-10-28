import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

// request interceptor: handling token append to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
     return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptors: Handling Global error
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received!!!");
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status == 401) {
        console.log("Unauthorized Access");
      } else if (status == 404) {
        console.log("API not Found!!");
      } else if (status == 500) {
        console.log("Server Error");
      } else if (error.request) {
        console.log("No Response from Server");
        return error.request.response;
      } else {
        console.log("Error: ${error.message}");
      }

      return Promise.reject(error);
    }
  },
);
export default axiosInstance;
