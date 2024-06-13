import apiFetch from "../api-fetch.js";
import { tokenKey } from "../config.js";

export async function loginUser(credentials = { email, password }) {
    const { token, ...user } = await apiFetch("login", { body: credentials });
    sessionStorage.setItem(tokenKey, token);
  
    return user;
}

export async function signupUser(credentials = { email, password }) {
    const { token, ...user } = await apiFetch("signup", { body: credentials });
    sessionStorage.setItem(tokenKey, token);
  
    return user;
}

export async function logoutUser(){
    sessionStorage.removeItem(tokenKey)
}