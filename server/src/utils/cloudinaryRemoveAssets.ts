import { config } from "dotenv";
import cloudinary from "cloudinary";

config();

export const removeAsset = () =>
  cloudinary.v2.api.delete_resources(
    ["IGotYou-Listings/b3zfetdgcirdceljondm"],
    {
      invalidate: true,
      resource_type: "image",
    }
  );
