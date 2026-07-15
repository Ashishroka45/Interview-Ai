import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://interview-ai-to7w.onrender.com/api",
  withCredentials: true,
  timeout: 45000, // 45 seconds timeout for heavy AI generations
}); 

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if it's a network error (no response received)
    if (!error.response) {
      const networkError = {
        success: false,
        message: "You're Offline. Please check your internet connection and try again.",
        code: "NETWORK_ERROR",
        isNetworkError: true,
        status: 0,
      };
      return Promise.reject(networkError);
    }

    // Extract backend-formatted error data
    const status = error.response.status;
    const data = error.response.data || {};
    
    const formattedError = {
      success: false,
      message: data.message || "An unexpected error occurred.",
      code: data.code || "UNKNOWN_ERROR",
      detail: data.error || null,
      status: status,
    };

    // If 401 Unauthorized, dispatch a custom event to notify the application
    if (status === 401) {
      window.dispatchEvent(new CustomEvent("auth:session-expired", { detail: formattedError }));
    }

    return Promise.reject(formattedError);
  }
);

export default apiClient;
