import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const registerUser = (form) =>{
  return api.post("/api/auth/register", form);
}

export const loginUser = (form) =>{
  return api.post("/api/auth/login", form);
}

export const getUserData = () =>{
  return api.get("/api/auth/getuserdata")
}

export const logoutUser = () =>{
  return api.post("/api/auth/logout")
}