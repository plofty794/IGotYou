import Booking from "../models/Bookings";
import Users from "../models/Users";

type TData = {
  guestName: string;
  host?: string;
  date: { from: string; to: string };
  message: string;
  type: string;
};

export const sendBookingRequest = async (data: TData) => {
  console.log(data);
  try {
    const guest = await Users.findOne({ username: data.guestName }).exec();

    if (!guest) {
      throw new Error("User didn't exist");
    }

    const newBooking = await Booking.create({
      ...data,
      guest: guest._id,
      requestedBookingDateStartsAt: data.date.from,
      requestedBookingDateEndsAt: data.date.to,
    });

    const userNotifications = await Users.findOneAndUpdate(
      { username: data.host },
      {
        $push: {
          notifications: {
            type: data.type,
            message: data.message,
            senderName: data.guestName,
          },
        },
      }
    );
    return { newBooking, userNotifications };
  } catch (error) {
    console.log(error);
  }
};
