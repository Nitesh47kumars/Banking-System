import axios from "axios";

const api = axios.create({
  baseURL: "https://banking-system-agm4.onrender.com",
  withCredentials: true,
});

export default api;
