import { RequestHandler } from "express";
import BookingRequests from "../models/BookingRequests";
import Listings from "../models/Listings";
import Notifications from "../models/Notifications";
import Users from "../models/Users";

type TSendBookingRequest = {
  guestName: string;
  hostID: string;
  date: { from: string; to: string };
  message: string;
  type: string;
  listingID: string;
};

export const updateBookingRequestNotification = async (data: any) => {
  try {
    const updateNotifications = await Notifications.findByIdAndUpdate(
      data.notification._id,
      {
        read: true,
      },
      { new: true }
    );

    const listing = await Listings.findById(
      data.notification.content.listingID._id
    );

    const updateBookingRequest = await Users.find({
      $where: function () {
        this.bookingRequests.filter;
      },
    });
    return { updateNotifications, updateBookingRequest, listing };
  } catch (error) {
    console.error(error);
  }
};

export const sendBookingRequest = async (data: TSendBookingRequest) => {
  try {
    const guestID = await Users.findOne({ username: data.guestName });

    const newBookingRequest = await BookingRequests.create({
      ...data,
      requestedBookingDateStartsAt: data.date.from,
      requestedBookingDateEndsAt: data.date.to,
      guestID: guestID && guestID._id,
    });

    const addBookingRequest = await Users.findOneAndUpdate(
      { username: data.guestName },
      {
        $push: {
          bookingRequests: newBookingRequest._id,
        },
      },
      { new: true }
    );

    const newNotification = await Notifications.create({
      bookingRequest: newBookingRequest._id,
      notificationType: data.type,
      toUserID: data.hostID,
      fromUserID: addBookingRequest && addBookingRequest._id,
    });

    await newNotification.populate([
      "bookingRequest",
      { select: ["username", "photoUrl"], path: "fromUserID" },
    ]);

    const addNotification = await Users.findByIdAndUpdate(data.hostID, {
      $push: { notifications: newNotification._id },
    });

    return {
      newBookingRequest,
      addBookingRequest,
      newNotification,
      addNotification,
    };
  } catch (error) {
    console.log(error);
  }
};
