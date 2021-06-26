import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL || "http://localhost:3003",
  headers: {
    "Content-Type": "application/json",
  },
});

// import store from "../store";

// const listener = () => {
//   const token = store.getState().token;
//   api.defaults.headers.common["Authorization"] = token;
// };

// store.subscribe(listener);

export default api;
