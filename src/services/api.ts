import axios from "axios";
import { key } from "../hooks/useLocalStorage";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL || "http://localhost:3003",
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem(key);
api.defaults.headers.common["Authorization"] = token;

export default api;
