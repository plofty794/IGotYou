import axios from "axios";

const baseURL = import.meta.env.VITE_PROD_SERVER_URL as string;

export const axiosPrivateRoute = axios.create({
  baseURL: "https://admin.igot-you.online/api/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
