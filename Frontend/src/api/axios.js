import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Auth APIs

export const registerUser = (form) => {
  return api.post("/api/auth/register", form);
};

export const loginUser = (form) => {
  return api.post("/api/auth/login", form);
};

export const getUserData = () => {
  return api.get("/api/auth/getuserdata");
};

export const logoutUser = () => {
  return api.post("/api/auth/logout");
};

// Account APIs

export const createUserAccount = () => {
  return api.post("/api/account");
};

export const getUserAccount = () => {
  return api.get("/api/account");
};

export const getUserBalance = (accountId) => {
  return api.get(`/api/account/balance/${accountId}`);
};

// Transaction APIs

export const getUserTransactionHistory = () => {
  return api.get("/api/transactions");
};

export const CreateUserInitialFunds = (data) => {
  return api.post("/api/transactions/system/initial-funds", data);
};

export const makeTransaction = (data) => {
  return api.post("api/transactions/", data);
};
