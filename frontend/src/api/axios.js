import axios from "axios";

const API_BASE_URL = axios.create({
  baseURL: "https://task-sync-backend-henna.vercel.app/api",
});

//--Attach token 
API_BASE_URL.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default API_BASE_URL;