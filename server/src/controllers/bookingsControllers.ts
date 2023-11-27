import Notifications from "../models/Notifications";
import Users from "../models/Users";

type TData = {
  guestName: string;
  host?: string;
  date: { from: string; to: string };
  message: string;
  type: string;
  listingID: string;
};

export const sendBookingRequest = async (data: TData) => {
  try {
    const guest = await Users.findOne({ username: data.guestName }).exec();
    const host = await Users.findOne({ username: data.host }).exec();

    if (!guest || !host) {
      throw new Error("User didn't exist");
    }

    const newNotification = await Notifications.create({
      content: {
        message: data.message,
        requestedBookingDateStartsAt: data.date.from,
        requestedBookingDateEndsAt: data.date.to,
        listingID: data.listingID,
      },
      senderID: guest._id,
      receiverID: host._id,
      notificationType: "Booking-Request",
    });

    await newNotification.populate([
      { select: ["username", "photoUrl"], path: "senderID" },
      { select: ["username", "photoUrl"], path: "receiverID" },
    ]);

    const updateUserNotification = await Users.findOneAndUpdate(
      { username: data.host },
      {
        $push: { notifications: newNotification._id },
      }
    );

    if (!updateUserNotification) {
      throw new Error("User didn't exist");
    }

    await guest.updateOne({
      $push: {
        bookingRequests: {
          host: updateUserNotification._id,
          requestedBookingDateStartsAt: data.date.from,
          requestedBookingDateEndsAt: data.date.to,
          message: data.message,
          listingID: data.listingID,
        },
      },
    });

    return { newNotification };
  } catch (error) {
    console.log(error);
  }
};
