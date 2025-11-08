// src/services/api.js
import axios from "axios";

// Prefer env var when available; fallback to your deployed backend
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://personal-portfolio-z0wr.onrender.com",
});

export default api;
