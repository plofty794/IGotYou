import { auth } from "../firebase admin config/config";

export async function verifyAccessToken(accessToken: string) {
  const { email, email_verified } = await auth.verifyIdToken(accessToken, true);

  return { email, email_verified };
}
