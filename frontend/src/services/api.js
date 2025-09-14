// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // backend base url
});

export default api;
