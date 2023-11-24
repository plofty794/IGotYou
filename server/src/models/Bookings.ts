import { Schema, model, Types } from "mongoose";

const bookingSchema = new Schema(
  {
    guest: {
      type: Types.ObjectId,
      ref: "Users",
    },
    bookingStartsAt: {
      type: DataView,
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
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = model("Bookings", bookingSchema);

export default Booking;
