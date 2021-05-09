import axios from "axios";

let server = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`
  }
});

export default server;
