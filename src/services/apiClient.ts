import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    // Simplement retourner la réponse si tout va bien
    return response;
  },
  (error) => {
    console.log("ERROR", error);
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      toast(error.response.data.detail);
    } else if (error.request) {
      console.error("API No Response:", error.request);
    } else {
      console.error("API Config Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
