import { Schema, InferSchemaType, model, Types } from "mongoose";

const acceptedBookingRequests = new Schema(
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
  },
  { timestamps: true }
);

const rejectBookingRequests = new Schema(
  {
    guest: {
      type: Types.ObjectId,
      ref: "Users",
    },
    bookingTime: {
      type: Number,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const bookingSchema = new Schema(
  {
    acceptedBookingRequests: {
      type: [acceptedBookingRequests],
    },
    rejectBookingRequests: {
      type: [rejectBookingRequests],
    },
  },
  { timestamps: true }
);

const Booking = model("Bookings", bookingSchema);

export default Booking;
