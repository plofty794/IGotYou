import { Schema, model, Types } from "mongoose";

const bookingSchema = new Schema(
  {
    host: {
      type: Types.ObjectId,
      ref: "Users",
    },
    guest: {
      type: Types.ObjectId,
      ref: "Users",
    },
    bookingStartsAt: {
      type: Date,
      required: true,
    },
    bookingEndsAt: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    listingID: {
      type: Types.ObjectId,
      ref: "Listings",
    },
    status: {
      type: String,
      enum: ["approved", "rejected"],
    },
  },
  { timestamps: true }
);
const Booking = model("Bookings", bookingSchema);

export default Booking;
