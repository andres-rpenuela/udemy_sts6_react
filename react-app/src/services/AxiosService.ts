// src/api.js
import axios from "axios";

// Crear una instancia de axios con la URL base de la API
const http = axios.create({
  baseURL: "http://localhost:8083", // Cambia al endpoint de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;