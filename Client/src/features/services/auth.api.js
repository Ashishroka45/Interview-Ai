import apiClient from "./apiClient";

export async function register({ userName, email, password }) {
  const response = await apiClient.post("/auth/register", {
    userName,
    email,
    password,
  });
  return response.data;
}

export async function login({ email, password }) {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });
  return response.data;
}

export async function logout() {
  const response = await apiClient.get("/auth/logout");
  return response.data;
}

export async function getMe() {
  const response = await apiClient.get("/auth/getMe");
  return response.data;
}
