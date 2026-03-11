import api from "./axios.js";

export const registerUser = (form) =>{
    return api.post("api/auth/register", form);
}
export const loginUser = (form) =>{
    return api.post("api/auth/login", form);
}