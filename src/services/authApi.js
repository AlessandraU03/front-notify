import axios from "axios";

// Tomamos la variable del entorno
const API_URL = import.meta.env.VITE_API_BASE_URL_AUTH;

const api = axios.create({
  baseURL: API_URL, // Ahora usa la variable del .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
