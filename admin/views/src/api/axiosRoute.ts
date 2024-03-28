import axios from "axios";

export const axiosPrivateRoute = axios.create({
  baseURL: "http://localhost:5040",
  withCredentials: true,
});

// https://admin.igot-you.online/api/
