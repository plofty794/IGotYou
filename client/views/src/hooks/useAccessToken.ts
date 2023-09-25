import { auth } from "@/firebase config/config";

function useAccessToken() {
  return auth.currentUser
    ?.getIdToken()
    .then((token) => token)
    .catch((err) => console.error(err));
}

export default useAccessToken;
