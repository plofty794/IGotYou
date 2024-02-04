import axios from "axios";

export const axiosRoute = axios.create({
  baseURL: "http://localhost:5030",
});

export const axiosPrivateRoute = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true,
});
