const isLocalhost = window.location.hostname === "localhost";

export const API_BASE_URL = isLocalhost
  ? "http://localhost:8081"
  : "https://online-shoping-backend.onrender.com";
