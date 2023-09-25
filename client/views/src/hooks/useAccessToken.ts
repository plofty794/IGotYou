import { auth } from "@/firebase config/config";

function useAccessToken() {
  return async function getAccessToken() {
    const accessToken = await auth.currentUser?.getIdToken();
    return accessToken;
  };
}

export default useAccessToken;
