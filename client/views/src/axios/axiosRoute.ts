import axios from "axios";

export const axiosRoute = axios.create({
  baseURL: "http://localhost:4030",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:4030",
  withCredentials: true,
});
