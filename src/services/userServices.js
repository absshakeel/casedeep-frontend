import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://casedeep.com:8080/",
  timeout: 10000, // Request timeout (10 seconds)
});

// List of public routes that don't require authentication
const publicRoutes = [
  '/chat/chatuser/alluser',
 
];

axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the current route is a public route
    const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));
    
    if (!isPublicRoute) {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle known error types, such as 401 Unauthorized, globally
      if (error.response.status === 401) {
        // Optionally logout or redirect to login page
        console.log("Unauthorized - Redirecting to login");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
