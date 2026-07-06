import axios from "axios";

const baseUrl = "http://localhost:8000/api/auth";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export async function register({ userName, email, password }) {
  try {
    const response = await api.post("/register", {
      userName,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
export async function logout() {
  try {
    const response = await api.get("/logout");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getMe() {
  try {
    const res = await api.get("/me");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
}
