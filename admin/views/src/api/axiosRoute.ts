import axios from "axios";

export const axiosPrivateRoute = axios.create({
  baseURL: "https://admin.igot-you.online/api/",
  withCredentials: true,
});

// https://admin.igot-you.online/api/
