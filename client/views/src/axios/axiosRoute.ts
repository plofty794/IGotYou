import axios from "axios";

export const axiosRoute = axios.create({
  baseURL: "http://localhost:4020",
});

export const axiosPrivateRoute = axios.create({
  baseURL: "http://localhost:4020",
  withCredentials: true,
});
