import { axiosPrivateRoute } from "@/axios/axiosRoute";
import { auth } from "@/firebase config/config";

async function logOutUser() {
  try {
    await axiosPrivateRoute.delete("/api/users/current-user/logout");
    auth.signOut();
    localStorage.clear();
  } catch (error) {
    console.error(error);
  }
}

export default logOutUser;
