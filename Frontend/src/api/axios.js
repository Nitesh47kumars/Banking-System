import axios from "axios";

const api = axios.create({
  baseURL: "https://banking-system-agm4.onrender.com",
  withCredentials: true,
});

export const registerUser = (form) =>{
  return api.post("api/auth/register", form);
}
export const loginUser = (form) =>{
  return api.post("api/auth/login", form);
}