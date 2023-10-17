import cloudinary, { UploadApiResponse } from "cloudinary";
import env from "../utils/envalid";
import { RequestHandler } from "express";
import Listings from "../models/Listings";
import Users from "../models/Users";
import createHttpError from "http-errors";

cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

type TFileType = {
  public_id: string;
  secure_url: string;
  original_filename: string;
};

type TListing = {
  serviceType: string;
  serviceDescription?: string;
  listingPhotos: TFileType[];
};

export const getListings: RequestHandler = async (req, res, next) => {
  try {
    const listings = await Listings.find({})
      .populate("host")
      .sort({ created_At: "desc" })
      .exec();
    res.status(200).json({ listings });
  } catch (error) {
    next(error);
  }
};

export const getUserListings: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const listings = await Listings.find({ host: id }).populate({
      path: "host",
      select: "email",
    });
    res.status(200).json({ listings });
  } catch (error) {
    next(error);
  }
};

export const addListing: RequestHandler = async (req, res, next) => {
  const { serviceType, serviceDescription, listingPhotos }: TListing = req.body;
  const { id } = req.params;
  try {
    const newListing = await (
      await Listings.create({ ...req.body, host: id })
    ).populate({ path: "host", select: "email" });
    if (!newListing) {
      throw createHttpError(400, "Error creating a listing");
    }
    const user = await Users.findById(id);
    if (!user?.hostStatus) {
      await Users.findByIdAndUpdate(id, {
        hostStatus: true,
      });
    }
    res.json({ newListing });
  } catch (error) {
    next(error);
  }
};
