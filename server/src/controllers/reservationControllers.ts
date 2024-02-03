import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Reservations from "../models/Reservations";
import Ratings from "../models/Ratings";

export const getCurrentReservation: RequestHandler = async (req, res, next) => {
  const id = req.cookies["_&!d"];
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const currentReservation = await Reservations.findOneAndUpdate(
      {
        hostID: id,
        $and: [
          {
            bookingStartsAt: {
              $eq: new Date().setHours(0, 0, 0, 0),
            },
          },
          {
            bookingEndsAt: {
              $gt: new Date().setHours(0, 0, 0, 0),
            },
          },
        ],
      },
      { status: "ongoing" }
    )
      .populate([
        { path: "guestID", select: "username email" },
        {
          path: "listingID",
          select: "serviceTitle serviceType listingAssets cancellationPolicy ",
        },
      ])
      .exec();

    res.status(200).json({ currentReservation: [currentReservation] });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingReservations: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.cookies["_&!d"];
  const page = parseInt(req.params.page ?? "1") ?? 1;
  const limit = 10;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const upcomingReservations = await Reservations.find({
      hostID: id,
      bookingStartsAt: {
        $gt: new Date(),
      },
    })
      .populate([
        { path: "guestID", select: "username email" },
        {
          path: "listingID",
          select: "serviceTitle serviceType listingAssets cancellationPolicy",
        },
      ])
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalPages = Math.ceil(upcomingReservations.length / limit);

    res.status(200).json({ upcomingReservations, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getPreviousReservations: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.cookies["_&!d"];
  const page = parseInt(req.params.page ?? "1") ?? 1;
  const limit = 10;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const previousReservations = await Reservations.find({
      hostID: id,
      bookingEndsAt: {
        $lt: new Date().setHours(0, 0, 0, 0),
      },
    })
      .populate([
        { path: "guestID", select: "username email" },
        {
          path: "listingID",
          select: "serviceTitle serviceType listingAssets cancellationPolicy",
        },
      ])
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalPages = previousReservations.length / limit;

    res.status(200).json({ previousReservations, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getReservations: RequestHandler = async (req, res, next) => {
  const id = req.cookies["_&!d"];
  const page = parseInt(req.params.page ?? "1") ?? 1;
  const limit = 10;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const allReservations = await Reservations.find({
      hostID: id,
    })
      .populate([
        { path: "guestID", select: "username email mobilePhone" },
        {
          path: "listingID",
          select: "serviceTitle serviceType listingAssets cancellationPolicy",
        },
      ])
      .sort({ bookingStartsAt: "desc" })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalPages = allReservations.length / limit;

    res.status(200).json({ allReservations, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getCurrentReservationDetails: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.cookies["_&!d"];
  const { reservationID } = req.params;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const reservationDetails = await Reservations.findById(
      reservationID
    ).populate([
      {
        path: "hostID",
        select:
          "username email photoUrl emailVerified identityVerified mobileVerified mobilePhone educationalAttainment address work funFact mobilePhone userStatus rating",
      },
      {
        path: "guestID",
        select:
          "username email photoUrl emailVerified identityVerified mobileVerified mobilePhone educationalAttainment address work funFact mobilePhone userStatus rating",
      },
      {
        path: "listingID",
        select:
          "serviceTitle serviceType listingAssets cancellationPolicy price",
      },
    ]);

    if (!reservationDetails) {
      throw createHttpError(400, "No reservation with that ID.");
    }

    const hasRating = await Ratings.findById(reservationID);

    res.status(200).json({
      reservationDetails,
      isHost: (reservationDetails.hostID as { _id: string })._id == id,
      hasRating: hasRating ?? null,
    });
  } catch (error) {
    next(error);
  }
};
