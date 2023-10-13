import cloudinary, { UploadApiResponse } from "cloudinary";
import env from "../utils/envalid";
import { RequestHandler } from "express";
import Listings from "../models/Listings";
import createHttpError from "http-errors";

cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

type TFileType = {
  name: string;
  id: string;
};

type TListing = {
  serviceType: string;
  serviceDescription?: string;
  listingPhotos: TFileType[];
};

export const addListing: RequestHandler = async (req, res, next) => {
  const { serviceType, serviceDescription, listingPhotos }: TListing = req.body;
  try {
    const photosPromises = listingPhotos.map((photo) =>
      cloudinary.v2.uploader.upload(photo.name, {
        folder: "IGotYou-Listings",
      })
    );
    const photos = await Promise.all(photosPromises);
    res.status(200).json({ photos });
  } catch (error) {
    next(error);
  }
};
