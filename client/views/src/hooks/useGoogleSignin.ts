import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuth, auth } from "@/firebase config/config";

function useGoogleSignin() {
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationFn: async () => {
      const { user } = await signInWithPopup(auth, GoogleAuth);
      return await axiosPrivate.post("/api/users/create", { ...user });
    },
  });
}

export default useGoogleSignin;
