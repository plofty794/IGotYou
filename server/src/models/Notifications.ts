import { Schema, model, Types } from "mongoose";

const contentSchema = new Schema(
  {
    requestedBookingDateStartsAt: {
      type: Date,
    },
    requestedBookingDateEndsAt: {
      type: Date,
    },
    message: {
      type: String,
    },
    listingID: {
      type: Types.ObjectId,
      ref: "Listings",
    },
  },
  { timestamps: true }
);

const notificationSchema = new Schema(
  {
    notificationType: {
      type: String,
      enum: [
        "New-Message",
        "Booking-Confirmed",
        "Booking-Rejected",
        "Booking-Request",
        "Subscription-Status",
      ],
      required: true,
    },
    content: {
      type: contentSchema,
      required: true,
    },
    senderID: {
      type: Types.ObjectId,
      ref: "Users",
    },
    receiverID: {
      type: Types.ObjectId,
      ref: "Users",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, expires: 3000 }
);

const Notifications = model("Notifications", notificationSchema);
export default Notifications;
