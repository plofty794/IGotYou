import { FirebaseError } from "firebase-admin";
import { auth } from "../firebase admin config/config";

export function verifyAccessToken(accessToken: string) {
  return auth
    .verifyIdToken(accessToken, true)
    .then((decodedToken) => decodedToken)
    .catch((err) => err);
}
