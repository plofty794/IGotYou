import cloudinary from "cloudinary";
import env from "../utils/envalid";
import { RequestHandler } from "express";
import Listings from "../models/Listings";
import Users from "../models/Users";
import createHttpError from "http-errors";
import { clearCookieAndThrowError } from "../utils/clearCookieAndThrowError";
import { add } from "date-fns";

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

export const getUserListing: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw createHttpError(400, "Invalid listing id");
    }
    const listing = await Listings.findById(id).populate("host");
    res.status(200).json({ listing });
  } catch (error) {
    next(error);
  }
};

export const addListing: RequestHandler = async (req, res, next) => {
  const id = req.cookies["_&!d"];

  try {
    if (!id) {
      clearCookieAndThrowError(
        res,
        "A _id cookie is required to access this resource."
      );
    }

    const newListing = await Listings.create({
      ...req.body,
      availableAt: new Date(req.body.date.from),
      endsAt: add(new Date(req.body.date.to), {
        hours: new Date(req.body.date.from).getHours(),
        minutes: new Date(req.body.date.from).getMinutes(),
        seconds: new Date(req.body.date.from).getSeconds(),
      }),
      host: id,
    });

    await newListing.populate({ path: "host", select: "email" });

    console.log(newListing.availableAt, newListing.endsAt);

    if (!newListing) {
      throw createHttpError(400, "Error creating a listing");
    }
    const user = await Users.findById(id);
    if (!user?.userStatus && user != null) {
      await Users.findByIdAndUpdate(
        id,
        {
          hostStatus: "host",
          $push: {
            listings: newListing._id,
          },
        },
        { new: true }
      );
      return res.status(200).json({ newListing });
    }
    await Users.findByIdAndUpdate(
      id,
      {
        $push: {
          listings: newListing._id,
        },
      },
      { new: true }
    );
    res.status(200).json({ newListing });
  } catch (error) {
    next(error);
  }
};
