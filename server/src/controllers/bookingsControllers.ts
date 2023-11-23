import { RequestHandler } from "express";
import Booking from "../models/Bookings";

export const sendBookingRequest: RequestHandler = async (req, res, next) => {
  const id = req.cookies["_&!d"];
  const { _id } = req.body;
  try {
    const booking = await Booking.findOne({ _id });
  } catch (error) {
    next(error);
  }
};
