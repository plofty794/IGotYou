import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Reservations from "../models/Reservations";
import Ratings from "../models/Ratings";
import BookingRequests from "../models/BookingRequests";
import HostNotifications from "../models/HostNotifications";
import { createTransport } from "nodemailer";
import env from "../utils/envalid";
import {
  calculateRefund,
  emailServiceCancellationApproval,
} from "../utils/emails/emailServiceCancellationApproval";
import { emailRequestPayout } from "../utils/emails/emailRequestPayout";
import { emailRejectedServicePayment } from "../utils/emails/emailRejectedServicePayment";
import mongoose from "mongoose";

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
        confirmServiceEnded: false,
        $and: [
          {
            bookingStartsAt: {
              $lte: new Date().setHours(0, 0, 0, 0),
            },
          },
          {
            bookingEndsAt: {
              $gte: new Date().setHours(0, 0, 0, 0),
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

    res.status(200).json({
      currentReservation:
        currentReservation != null ? [currentReservation] : [],
    });
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
      status: "scheduled",
    })
      .populate([
        { path: "guestID", select: "username email" },
        {
          path: "listingID",
          select: "serviceTitle serviceType listingAssets cancellationPolicy",
        },
      ])
      .sort({
        createdAt: "desc",
      })
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
      confirmServiceEnded: true,
    })
      .populate([
        { path: "guestID", select: "username email" },
        {
          path: "listingID",
          select: "serviceTitle serviceType listingAssets cancellationPolicy",
        },
      ])
      .sort({
        createdAt: "desc",
      })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalPages = Math.ceil(previousReservations.length / limit);

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

    await Reservations.updateMany(
      {
        status: "ongoing",
        $and: [
          {
            bookingEndsAt: {
              $lt: new Date().setHours(0, 0, 0, 0),
            },
          },
          {
            confirmServiceEnded: true,
          },
        ],
      },
      {
        status: "completed",
        confirmServiceEnded: true,
      }
    );

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
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalPages = Math.ceil(allReservations.length / limit);

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

    const hasRating = await Ratings.findOne({ reservationID });

    res.status(200).json({
      reservationDetails,
      isHost: (reservationDetails.hostID as { _id: string })._id == id,
      hasRating: hasRating ?? null,
    });
  } catch (error) {
    next(error);
  }
};

export const sendReservationPaymentToAdmin: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.cookies["_&!d"];
  const { reservationID } = req.params;
  const { paymentType } = req.body;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const isReservationCancelled = await Reservations.findOne({
      _id: reservationID,
      status: "cancelled",
    });

    if (isReservationCancelled) {
      throw createHttpError(400, "This service is already cancelled.");
    }

    if (paymentType === "partial-payment") {
      const hasPreviousPartialPayment = await Reservations.findOne({
        _id: reservationID,
        paymentType: "partial-payment",
      });

      if (hasPreviousPartialPayment) {
        await hasPreviousPartialPayment.updateOne({
          fullPaymentAmount: req.body.expectedPaymentAmount,
          fullPaymentDate: new Date(),
          fullPaymentProofPhoto: req.body.paymentProofPhoto,
          fullPaymentRefNo: req.body.paymentRefNo,
          fullPaymentVerificationStatus: "pending",
        });

        return res
          .status(201)
          .json({ message: "Partial payment has been sent." });
      }

      await Reservations.findByIdAndUpdate(reservationID, {
        partialPaymentVerificationStatus: "pending",
        partialPaymentAmount: req.body.expectedPaymentAmount,
        partialPaymentDate: new Date(),
        paymentType: "partial-payment",
        partialPaymentProofPhoto: req.body.paymentProofPhoto,
        partialPaymentRefNo: req.body.paymentRefNo,
      });

      return res
        .status(201)
        .json({ message: "Partial payment has been sent." });
    }

    await Reservations.findByIdAndUpdate(reservationID, {
      fullPaymentVerificationStatus: "pending",
      fullPaymentAmount: req.body.expectedPaymentAmount,
      fullPaymentDate: new Date(),
      paymentType: "full-payment",
      fullPaymentProofPhoto: req.body.paymentProofPhoto,
      fullPaymentRefNo: req.body.paymentRefNo,
    });

    return res.status(201).json({ message: "Full payment has been sent." });
  } catch (error) {
    next(error);
  }
};

export const getPendingServicePayments: RequestHandler = async (
  req,
  res,
  next
) => {
  const page = parseInt(req.params.page ?? "1") ?? 1;
  const limit = 10;
  const admin_id = req.cookies.admin_id;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const pendingServicePayments = await Reservations.find({
      $or: [
        { partialPaymentVerificationStatus: "pending" },
        { fullPaymentVerificationStatus: "pending" },
      ],
    })
      .populate([
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
      ])
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalPages = Math.ceil(pendingServicePayments.length / limit);

    res.status(200).json({ pendingServicePayments, totalPages });
  } catch (error) {
    next(error);
  }
};

export const updatePendingServicePayment: RequestHandler = async (
  req,
  res,
  next
) => {
  const admin_id = req.cookies.admin_id;
  const { reservationID } = req.params;
  const {
    paymentType,
    paymentStatus,
    partialPaymentVerificationStatus,
    fullPaymentVerificationStatus,
    status,
  } = req.body;
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: env.ADMIN_EMAIL,
      pass: env.APP_PASSWORD,
    },
  });
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const reservation = await Reservations.findById(reservationID).populate([
      {
        path: "listingID",
        select: "serviceTitle",
      },
      {
        path: "guestID",
        select: "username email",
      },
    ]);

    if (
      (paymentType === "partial-payment" &&
        paymentStatus === "pending" &&
        partialPaymentVerificationStatus === "pending") ||
      (partialPaymentVerificationStatus === "rejected" && status === "success")
    ) {
      await Reservations.findByIdAndUpdate(reservationID, {
        partialPaymentVerificationStatus: "success",
        paymentStatus: "partially-paid",
        balance: reservation!.paymentAmount / 2,
      });

      return res
        .status(201)
        .json({ message: "Partial payment has been verified." });
    }

    if (
      (paymentType === "partial-payment" &&
        paymentStatus === "partially-paid" &&
        partialPaymentVerificationStatus === "success" &&
        fullPaymentVerificationStatus === "pending") ||
      (fullPaymentVerificationStatus === "rejected" && status === "success")
    ) {
      await Reservations.findByIdAndUpdate(reservationID, {
        fullPaymentVerificationStatus: "success",
        paymentStatus: "fully-paid",
        balance: 0,
      });

      return res
        .status(201)
        .json({ message: "Partial payment has been verified." });
    }

    if (
      (paymentType === "full-payment" &&
        paymentStatus === "pending" &&
        fullPaymentVerificationStatus === "pending") ||
      (fullPaymentVerificationStatus === "rejected" && status === "success")
    ) {
      await Reservations.findByIdAndUpdate(reservationID, {
        fullPaymentVerificationStatus: "success",
        paymentStatus: "fully-paid",
        balance: 0,
      });

      return res
        .status(201)
        .json({ message: "Partial payment has been verified." });
    }

    if (
      paymentType === "partial-payment" &&
      paymentStatus === "pending" &&
      partialPaymentVerificationStatus === "pending" &&
      status === "rejected"
    ) {
      await Reservations.findByIdAndUpdate(reservationID, {
        partialPaymentVerificationStatus: "rejected",
      });

      await transport.sendMail({
        to: (reservation.guestID as { email: string }).email,
        subject: `Service Payment for ${
          (reservation.listingID as { serviceTitle: string }).serviceTitle
        } Rejected`,
        html: emailRejectedServicePayment(
          (reservation.guestID as { username: string }).username,
          (reservation.listingID as { serviceTitle: string }).serviceTitle
        ),
      });

      return res
        .status(201)
        .json({ message: "Partial payment has been rejected." });
    }

    if (
      paymentType === "partial-payment" &&
      paymentStatus === "partially-paid" &&
      partialPaymentVerificationStatus === "success" &&
      status === "rejected"
    ) {
      await Reservations.findByIdAndUpdate(reservationID, {
        fullPaymentVerificationStatus: "rejected",
      });

      await transport.sendMail({
        to: (reservation.guestID as { email: string }).email,
        subject: `Service Payment for ${
          (reservation.listingID as { serviceTitle: string }).serviceTitle
        } Rejected`,
        html: emailRejectedServicePayment(
          (reservation.guestID as { username: string }).username,
          (reservation.listingID as { serviceTitle: string }).serviceTitle
        ),
      });

      return res
        .status(201)
        .json({ message: "Partial payment has been rejected." });
    }

    if (
      paymentType === "full-payment" &&
      paymentStatus === "pending" &&
      fullPaymentVerificationStatus === "pending" &&
      status === "rejected"
    ) {
      await Reservations.findByIdAndUpdate(reservationID, {
        fullPaymentVerificationStatus: "rejected",
      });

      await transport.sendMail({
        to: (reservation.guestID as { email: string }).email,
        subject: `Service Payment for ${
          (reservation.listingID as { serviceTitle: string }).serviceTitle
        } Rejected`,
        html: emailRejectedServicePayment(
          (reservation.guestID as { username: string }).username,
          (reservation.listingID as { serviceTitle: string }).serviceTitle
        ),
      });

      return res
        .status(201)
        .json({ message: "Full payment has been rejected." });
    }
  } catch (error) {
    next(error);
  }
};

export const requestServiceCancellation: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.cookies["_&!d"];
  const { reservationID } = req.params;
  const { guestCancelReasons } = req.body;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const reservation = await Reservations.findById(reservationID);

    if (!reservation) {
      throw createHttpError(400, "No reservation with that ID");
    }

    if (reservation.confirmServiceEnded) {
      throw createHttpError(400, "Service is already marked as completed.");
    }

    const alreadySentCancellationRequest = await BookingRequests.findOne({
      reservationID,
      type: "Service-Cancellation-Request",
      guestID: id,
      listingID: reservation?.listingID,
    });

    if (alreadySentCancellationRequest) {
      throw createHttpError(
        400,
        "Request service cancellation already been sent."
      );
    }

    const newServiceCancellationRequest = await BookingRequests.create({
      guestID: id,
      hostID: reservation?.hostID,
      type: "Service-Cancellation-Request",
      guestCancelReasons,
      listingID: reservation?.listingID,
      reservationID,
    });

    const newHostNotification = await HostNotifications.create({
      senderID: id,
      recipientID: reservation?.hostID,
      notificationType: "Service-Cancellation-Request",
      data: newServiceCancellationRequest?._id,
    });

    await newHostNotification.populate([
      {
        path: "senderID",
        select: "username",
      },
      {
        path: "recipientID",
        select: "username",
      },
    ]);

    res.status(201).json({
      receiverName: (newHostNotification.recipientID as { username: string })
        .username,
    });
  } catch (error) {
    next(error);
  }
};

export const serviceCancellationRequestApproval: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.cookies["_&!d"];
  const { reservationID } = req.params;
  const { hostCancellationReason } = req.body;
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: env.ADMIN_EMAIL,
      pass: env.APP_PASSWORD,
    },
  });
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const hasServiceCancellationRequestFromGuest =
      await BookingRequests.findOne({
        reservationID,
        type: "Service-Cancellation-Request",
      });

    if (!hasServiceCancellationRequestFromGuest) {
      throw createHttpError(400, "No service cancellation request from guest.");
    }

    const reservationAlreadyCancelled = await Reservations.findOne({
      _id: reservationID,
      status: "cancelled",
      confirmServiceEnded: true,
    });

    if (reservationAlreadyCancelled) {
      throw createHttpError(400, "Reservation already cancelled.");
    }

    const cancelledReservation = await Reservations.findByIdAndUpdate(
      reservationID,
      {
        status: "cancelled",
        confirmServiceEnded: true,
        hostCancellationReason,
      }
    ).populate([
      {
        select: "serviceTitle cancellationPolicy price",
        path: "listingID",
      },
      {
        select: "email",
        path: "guestID",
      },
      {
        select: "email username",
        path: "hostID",
      },
    ]);

    if (cancelledReservation.paymentStatus === "partially-paid") {
      const hasRefundAmount = await Reservations.findByIdAndUpdate(
        reservationID,
        {
          refundAmount: Number(
            calculateRefund(
              new Date(cancelledReservation.bookingStartsAt).toDateString(),
              new Date(
                hasServiceCancellationRequestFromGuest.createdAt
              ).toDateString(),
              (cancelledReservation.listingID as { cancellationPolicy: string })
                .cancellationPolicy,
              cancelledReservation.partialPaymentAmount
            )
          ),
        }
      );

      await hasRefundAmount.updateOne({
        earnings: Math.abs(
          hasRefundAmount.partialPaymentAmount - hasRefundAmount.refundAmount
        ),
      });
    }

    if (cancelledReservation.paymentStatus === "fully-paid") {
      const hasRefundAmount = await Reservations.findByIdAndUpdate(
        reservationID,
        {
          refundAmount: Number(
            calculateRefund(
              new Date(cancelledReservation.bookingStartsAt).toDateString(),
              new Date(
                hasServiceCancellationRequestFromGuest.createdAt
              ).toDateString(),
              (cancelledReservation.listingID as { cancellationPolicy: string })
                .cancellationPolicy,
              cancelledReservation.fullPaymentAmount
            )
          ),
        },
        {
          new: true,
        }
      );

      await hasRefundAmount.updateOne({
        earnings: Math.abs(
          hasRefundAmount.paymentAmount - hasRefundAmount.refundAmount
        ),
      });
    }

    await BookingRequests.findOneAndUpdate(
      {
        reservationID,
        type: "Service-Cancellation-Request",
      },
      {
        status: "cancelled",
      }
    );

    await BookingRequests.findOneAndUpdate(
      {
        reservationID,
        totalPrice: {
          $ne: null,
        },
      },
      {
        status: "cancelled",
        guestCancelReasons:
          hasServiceCancellationRequestFromGuest.guestCancelReasons,
      }
    );

    if (cancelledReservation.paymentStatus === "partially-paid") {
      await transport.sendMail({
        subject: `Request Reservation Cancellation for ${
          (cancelledReservation.listingID as { serviceTitle: string })
            .serviceTitle
        } Approved`,
        to: (cancelledReservation.guestID as { email: string }).email,
        html: emailServiceCancellationApproval(
          reservationID,
          [
            cancelledReservation.bookingStartsAt.toDateString(),
            cancelledReservation.bookingEndsAt.toDateString(),
          ],
          (cancelledReservation.hostID as { username: string }).username,
          (cancelledReservation.listingID as { serviceTitle: string })
            .serviceTitle,
          (cancelledReservation.listingID as { cancellationPolicy: string })
            .cancellationPolicy,
          cancelledReservation.createdAt.toDateString(),
          cancelledReservation.partialPaymentAmount
        ),
      });

      return res
        .status(200)
        .json({ message: "Reservation has been cancelled." });
    }

    if (cancelledReservation.paymentStatus === "fully-paid") {
      await transport.sendMail({
        subject: `Request Reservation Cancellation for ${
          (cancelledReservation.listingID as { serviceTitle: string })
            .serviceTitle
        } Approved`,
        to: (cancelledReservation.guestID as { email: string }).email,
        html: emailServiceCancellationApproval(
          reservationID,
          [
            cancelledReservation.bookingStartsAt.toDateString(),
            cancelledReservation.bookingEndsAt.toDateString(),
          ],
          (cancelledReservation.hostID as { username: string }).username,
          (cancelledReservation.listingID as { serviceTitle: string })
            .serviceTitle,
          (cancelledReservation.listingID as { cancellationPolicy: string })
            .cancellationPolicy,
          cancelledReservation.createdAt.toDateString(),
          cancelledReservation.fullPaymentAmount
        ),
      });

      return res
        .status(200)
        .json({ message: "Reservation has been cancelled." });
    }

    res.status(200).json({ message: "Reservation has been cancelled." });
  } catch (error) {
    next(error);
  }
};

export const confirmServiceEnded: RequestHandler = async (req, res, next) => {
  const id = req.cookies["_&!d"];
  const { reservationID } = req.params;
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: env.ADMIN_EMAIL,
      pass: env.APP_PASSWORD,
    },
  });
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const serviceOngoing = await Reservations.findOne({
      _id: reservationID,
      fullPaymentVerificationStatus: "pending",
    });

    if (serviceOngoing) {
      throw createHttpError(400, "Your payment is not still not verified.");
    }

    const serviceEnded = await Reservations.findByIdAndUpdate(reservationID, {
      confirmServiceEnded: true,
      status: "completed",
    });

    await serviceEnded.updateOne({
      earnings: serviceEnded.paymentAmount,
    });

    res.status(200).json({ message: "Service is now confirmed to be done." });
  } catch (error) {
    next(error);
  }
};

export const sendRequestPayout: RequestHandler = async (req, res, next) => {
  const id = req.cookies["_&!d"];
  const { reservationID } = req.params;
  const { mobilePhone } = req.body;
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: env.ADMIN_EMAIL_PAYOUTS,
      pass: env.PAYOUTS_PASSWORD,
    },
  });
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const reservation = await Reservations.findById(reservationID).populate([
      {
        path: "hostID",
        select: "username email",
      },
      {
        path: "guestID",
        select: "username email",
      },
      {
        path: "listingID",
        select: "serviceTitle",
      },
    ]);

    await transport.sendMail({
      subject: `Service Payout Request for ${
        (reservation.listingID as { serviceTitle: string }).serviceTitle
      }`,
      to: env.ADMIN_EMAIL_PAYOUTS,
      html: emailRequestPayout(
        (reservation.listingID as { serviceTitle: string }).serviceTitle,
        [
          reservation.bookingStartsAt.toDateString(),
          reservation.bookingEndsAt.toDateString(),
        ],
        (reservation.guestID as { username: string }).username,
        reservation.paymentAmount,
        (reservation.hostID as { username: string }).username,
        mobilePhone
      ),
    });

    res.status(200).json({ message: "Service request payout has been sent." });
  } catch (error) {
    next(error);
  }
};

export const hostEarnings: RequestHandler = async (req, res, next) => {
  const id = req.cookies["_&!d"];
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const currentMonthEarnings = await Reservations.aggregate([
      {
        $match: {
          paymentStatus: { $in: ["fully-paid", "partially-paid"] },
          earnings: {
            $gt: 0,
          },
          hostID: mongoose.Types.ObjectId.createFromHexString(id),
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$earnings" },
        },
      },
    ]);

    const totalEarnings = await Reservations.find({
      hostID: id,
      earnings: {
        $gt: 0,
      },
    })
      .populate([
        {
          path: "listingID",
          select: "serviceTitle",
        },
      ])
      .select("listingID earnings bookingStartsAt bookingEndsAt");

    res.status(200).json({ totalEarnings, currentMonthEarnings });
  } catch (error) {
    next(error);
  }
};

export const getHostReservationPaymentsTransactions: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.cookies["_&!d"];
  const limit = 10;
  const page = parseInt(req.params.page ?? "1") ?? 1;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }
    const reservationPaymentsTransactionLog = await Reservations.find({
      hostID: id,
      $or: [
        {
          fullPaymentAmount: {
            $gt: 0,
          },
        },
        {
          partialPaymentAmount: {
            $gt: 0,
          },
        },
      ],
    })
      .populate([
        {
          path: "guestID",
          select: "username",
        },
        {
          path: "listingID",
          select: "serviceTitle",
        },
      ])
      .select(
        "status fullPaymentVerificationStatus partialPaymentVerificationStatus fullPaymentAmount partialPaymentAmount paymentType partialPaymentDate fullPaymentDate partialPaymentProofPhoto fullPaymentProofPhoto"
      )
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    if (!reservationPaymentsTransactionLog.length) {
      return res.status(400).json({ reservationPaymentsTransactionLog: [] });
    }

    res.status(200).json({ reservationPaymentsTransactionLog });
  } catch (error) {
    next(error);
  }
};
