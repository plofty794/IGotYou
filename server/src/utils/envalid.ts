import { cleanEnv, num, port, str } from "envalid";
import { config } from "dotenv";

config();

export default cleanEnv(process.env, {
  MONGO_COMPASS_URI: str(),
  PORT: port(),
  SALT: num(),
  IPINFO_TOKEN: str(),
  REFRESH_TOKEN_KEY: str(),
  GOOGLE_APPLICATION_CREDENTIALS: str(),
});
