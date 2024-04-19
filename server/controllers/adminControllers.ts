import { RequestHandler } from "express";
import Admin from "../models/Admin";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import Users from "../models/Users";
import SubscriptionPayments from "../models/SubscriptionPayments";
import Reports from "../models/Reports";
import { auth } from "firebase-admin";
import Reservations from "../models/Reservations";
import BookingRequests from "../models/BookingRequests";
import IdentityPhotos from "../models/IdentityPhotos";
import {
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subDays,
} from "date-fns";
import Ratings from "../models/Ratings";

export const getActiveUsers: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  const limit = 10;
  const page = parseInt(req.params.page ?? "1") ?? 1;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }
    const totalActiveUsers = await Users.countDocuments();
    const totalPages = Math.ceil(totalActiveUsers / limit);
    const activeUsers = await Users.find({
      subscriptionStatus: "active",
      userStatus: "host",
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("listings")
      .sort({ createdAt: "desc" })
      .exec();
    if (!activeUsers.length) {
      return res.status(400).json({ activeUsers: [], totalPages: 0 });
    }
    res.status(200).json({ activeUsers, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  const limit = 10;
  const page = parseInt(req.params.page ?? "1") ?? 1;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const users = await Users.find({
      username: { $ne: null },
    })
      .select(
        "uid username email userStatus emailVerified identityVerified mobilePhone mobileVerified createdAt isDisabled"
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: "desc" })
      .exec();

    const totalUsers = await Users.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    if (!users.length) {
      return res.status(400).json({ users: [], totalPages: 0, totalUsers: 0 });
    }
    res.status(200).json({ users, totalPages, totalUsers });
  } catch (error) {
    next(error);
  }
};

export const getAdminInfo: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }
    const admin = await Admin.findById(admin_id);
    if (!admin) {
      throw createHttpError(400, "Something went wrong");
    }
    res.status(200).json({ admin });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const adminExist = await Admin.findOne({ username });
    if (!adminExist) {
      throw createHttpError(400, "Invalid admin credentials");
    }
    const passwordCorrect = await bcrypt.compare(password, adminExist.password);
    if (!passwordCorrect) {
      throw createHttpError(400, "Invalid admin credentials");
    }
    res.cookie("admin_id", adminExist._id.toString(), { httpOnly: true });
    res.status(200).json({ adminExist });
  } catch (error) {
    next(error);
  }
};

export const getAdminOverview: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  const { dateFrom, dateTo } = req.query;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    if (dateFrom != "" || dateTo != "") {
      const allUsers = await Users.find({
        $and: [
          {
            createdAt: {
              $lte: new Date(dateTo.toString()),
            },
          },
          {
            createdAt: {
              $gte: new Date(dateFrom.toString()),
            },
          },
        ],
      }).select("userStatus");
      const subscribedUsers = await SubscriptionPayments.find({
        paymentStatus: "success",
        $and: [
          {
            createdAt: {
              $gte: new Date(dateFrom.toString()),
            },
          },
          {
            createdAt: {
              $lte: new Date(dateTo.toString()),
            },
          },
        ],
      })
        .populate({
          path: "user",
          select: "subscriptionExpiresAt photoUrl username email",
        })
        .sort({ createdAt: "desc" });

      return res.status(200).json({ allUsers, subscribedUsers });
    }

    const allUsers = await Users.find().select("userStatus");
    const subscribedUsers = await SubscriptionPayments.find({
      paymentStatus: "success",
    })
      .populate({
        path: "user",
        select: "subscriptionExpiresAt photoUrl username email",
      })
      .sort({ createdAt: "desc" });

    res.status(200).json({
      allUsers,
      subscribedUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;

  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const lastMonth = startOfDay(subDays(new Date(), 30));
    const nextMonth = endOfDay(new Date());

    const userRegistrationStats = await Users.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth, $lte: nextMonth },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%b-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const percentageOfVerifiedEmailsIdentityMobile = await Users.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          disabledUsers: {
            $sum: { $cond: { if: "$isDisabled", then: 1, else: 0 } },
          },
          verifiedEmails: {
            $sum: { $cond: { if: "$emailVerified", then: 1, else: 0 } },
          },
          verifiedIdentity: {
            $sum: { $cond: { if: "$identityVerified", then: 1, else: 0 } },
          },
          verifiedMobile: {
            $sum: { $cond: { if: "$mobileVerified", then: 1, else: 0 } },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalUsers: 1,
          disabledUsers: 1,
          verifiedEmailPercentage: {
            $multiply: [{ $divide: ["$verifiedEmails", "$totalUsers"] }, 100],
          },
          verifiedIdentityPercentage: {
            $multiply: [{ $divide: ["$verifiedIdentity", "$totalUsers"] }, 100],
          },
          verifiedMobilePercentage: {
            $multiply: [{ $divide: ["$verifiedMobile", "$totalUsers"] }, 100],
          },
        },
      },
    ]);

    const bookingRequestsByServiceType = await BookingRequests.find({})
      .populate({
        path: "listingID",
        select: "serviceType",
      })
      .exec();

    const bookingRequestsPercentageStatus = await BookingRequests.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          percentage: {
            $multiply: [
              {
                $divide: [
                  "$count",
                  { $sum: bookingRequestsByServiceType.length },
                ],
              },
              100,
            ],
          },
        },
      },
    ]);

    const bookingRequestsPerDay = await BookingRequests.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth, $lte: nextMonth },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%b-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      userRegistrationStats,
      percentageOfVerifiedEmailsIdentityMobile,
      bookingRequestsPerDay,
      bookingRequestsPercentageStatus,
      bookingRequestsByServiceType: bookingRequestsByServiceType.reduce(
        (acc, bookingRequest) => {
          const name = (bookingRequest.listingID as { serviceType: string })
            .serviceType;

          const existingServiceType = acc.find((item) => item.name === name);

          if (existingServiceType) {
            existingServiceType.count++;
          } else {
            acc.push({ name, count: 1 });
          }

          return acc;
        },
        []
      ),
    });
  } catch (error) {
    next(error);
  }
};

export const getReports: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const lastMonth = startOfDay(subDays(new Date(), 30));
    const nextMonth = endOfDay(new Date());

    const reservationsPerDay = await Reservations.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth, $lte: nextMonth },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%b-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const reservationStatusOvertime = await Reservations.aggregate([
      {
        $group: {
          _id: null,
          scheduled: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "scheduled"] },
                then: 1,
                else: 0,
              },
            },
          },
          ongoing: {
            $sum: {
              $cond: { if: { $eq: ["$status", "ongoing"] }, then: 1, else: 0 },
            },
          },
          completed: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "completed"] },
                then: 1,
                else: 0,
              },
            },
          },
          cancelled: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "cancelled"] },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
    ]);

    const reservationsRevenue = await Reservations.aggregate([
      {
        $match: {
          paymentStatus: {
            $in: ["fully-paid", "partially-paid"],
          },
          createdAt: { $gte: lastMonth, $lte: nextMonth },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%b-%d", date: "$createdAt" } },
          totalRevenue: { $sum: "$earnings" },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    const reservationPaymentAndVerificationStatus =
      await Reservations.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            partialPayments: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$paymentType", "partial-payment"] },
                      { $eq: ["$partialPaymentVerificationStatus", "success"] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            fullPayments: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$paymentType", "full-payment"] },
                      { $eq: ["$fullPaymentVerificationStatus", "success"] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]);

    const reservationCompletionAndCancellation = await Reservations.aggregate([
      {
        $match: { $or: [{ status: "cancelled" }, { status: "completed" }] },
      },
      {
        $group: {
          _id: null,
          cancellations: {
            $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
          },
          completions: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          completionConfirmationRate: {
            $multiply: [
              {
                $divide: ["$completions", await Reservations.countDocuments()],
              },
              100,
            ],
          },
          cancellationRate: {
            $multiply: [
              {
                $divide: [
                  "$cancellations",
                  await Reservations.countDocuments(),
                ],
              },
              100,
            ],
          },
        },
      },
    ]);

    const reservationPaymentRefund = await Reservations.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth, $lte: nextMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalRefunds: { $sum: "$refundAmount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const avgRatings = await Ratings.aggregate([
      {
        $group: {
          _id: null,
          avgGuestRating: { $avg: "$guestRating" },
          avgHostRating: { $avg: "$hostRating" },
          totalHostRatings: {
            $sum: {
              $cond: { if: { $gt: ["$hostRating", 0] }, then: 1, else: 0 },
            },
          },
          totalGuestRatings: {
            $sum: {
              $cond: { if: { $gt: ["$guestRating", 0] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          avgGuestRating: 1,
          avgHostRating: 1,
          totalHostRatings: 1,
          totalGuestRatings: 1,
        },
      },
    ]);

    const guestRatingDistribution = await Ratings.aggregate([
      {
        $group: {
          _id: "$guestRating",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const hostRatingDistribution = await Ratings.aggregate([
      {
        $group: {
          _id: "$hostRating",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    let topRatedGuests = await Ratings.aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "_id",
          foreignField: "guestID",
          as: "guestDetails",
        },
      },
      {
        $project: {
          _id: 0,
          guestID: "$guestID",
          averageRating: { $avg: "$hostRating" },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    topRatedGuests = await Ratings.populate(topRatedGuests, [
      {
        path: "guestID",
        select: "username photoUrl email",
      },
    ]);

    let topRatedHosts = await Ratings.aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "_id",
          foreignField: "hostID",
          as: "hostDetails",
        },
      },
      {
        $project: {
          _id: 0,
          hostID: "$hostID",
          averageRating: { $avg: "$guestRating" },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    topRatedHosts = await Ratings.populate(topRatedHosts, [
      {
        path: "hostID",
        select: "username photoUrl email",
      },
    ]);

    res.status(200).json({
      reservationsRevenue,
      reservationPaymentAndVerificationStatus,
      reservationCompletionAndCancellation,
      reservationPaymentRefund,
      reservationStatusOvertime,
      reservationsPerDay,
      avgRatings,
      topRatedGuests: topRatedGuests
        .filter((v) => v.averageRating != null)
        .filter((item, index, arr) => {
          const existingIndex = arr.findIndex(
            (obj) => obj.guestID._id.toString() === item.guestID._id.toString()
          );
          return index === existingIndex;
        }),
      topRatedHosts: topRatedHosts
        .filter((v) => v.averageRating != null)
        .filter((item, index, arr) => {
          const existingIndex = arr.findIndex(
            (obj) => obj.hostID._id.toString() === item.hostID._id.toString()
          );
          return index === existingIndex;
        }),
      guestRatingDistribution: guestRatingDistribution.filter(
        (v) => v._id != null
      ),
      hostRatingDistribution: hostRatingDistribution.filter(
        (v) => v._id != null
      ),
    });
  } catch (error) {
    next(error);
  }
};

export const getUserReports: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  const limit = 10;
  const page = parseInt(req.params.page ?? "1") ?? 1;

  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const userReports = await Reports.find({})
      .skip((page - 1) * limit)
      .populate([
        {
          path: "reporter",
          select:
            "username email userStatus reports emailVerified identityVerified isDisabled uid",
        },
        {
          path: "reportedUser",
          select:
            "username email userStatus reports emailVerified identityVerified isDisabled uid",
        },
      ])
      .limit(limit)
      .sort({ createdAt: "desc" })
      .exec();

    const totalReports = await Reports.countDocuments();
    const totalPages = Math.ceil(totalReports / limit);

    if (!userReports.length) {
      return res
        .status(400)
        .json({ userReports: [], totalPages: 0, totalReports: 0 });
    }
    res.status(200).json({ userReports, totalPages, totalReports });
  } catch (error) {
    next(error);
  }
};

export const adminLogOut: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }
    const adminExist = await Admin.findById(admin_id);
    if (!adminExist) {
      throw createHttpError(400, "Invalid Admin ID!");
    }
    res.clearCookie("admin_id", { httpOnly: true });
    res.status(200).json({ message: "Admin has been logged out" });
  } catch (error) {
    next(error);
  }
};

export const disableUser: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  const { userUID } = req.params;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    await auth().updateUser(userUID, {
      disabled: true,
    });

    await Users.findOneAndUpdate(
      { uid: userUID },
      {
        isDisabled: true,
      }
    );

    res.status(200).json({ message: "Account has been disabled." });
  } catch (error) {
    next(error);
  }
};

export const enableUser: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  const { userUID } = req.params;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    await auth().updateUser(userUID, {
      disabled: false,
    });

    await Users.findOneAndUpdate(
      { uid: userUID },
      {
        isDisabled: false,
      }
    );

    res.status(200).json({ message: "Account has been enabled." });
  } catch (error) {
    next(error);
  }
};

export const getCancelledReservations: RequestHandler = async (
  req,
  res,
  next
) => {
  const admin_id = req.cookies.admin_id;
  const limit = 10;
  const page = parseInt(req.params.page ?? "1") ?? 1;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const cancelledReservations = await BookingRequests.find({
      type: "Service-Cancellation-Request",
      status: "cancelled",
    })
      .populate([
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
          select: "serviceTitle cancellationPolicy price",
        },
        {
          path: "reservationID",
        },
      ])
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: "desc" })
      .exec();

    const totalCancelledBookingRequests = await BookingRequests.find({
      type: "Service-Cancellation-Request",
      status: "cancelled",
    });

    const totalPages = Math.ceil(totalCancelledBookingRequests.length / limit);

    if (!cancelledReservations.length) {
      return res.status(400).json({ cancelledReservations: [], totalPages: 0 });
    }

    res.status(200).json({ cancelledReservations, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getIdentityVerificationRequests: RequestHandler = async (
  req,
  res,
  next
) => {
  const admin_id = req.cookies.admin_id;
  const limit = 10;
  const page = parseInt(req.params.page ?? "1") ?? 1;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const identityVerificationRequests = await IdentityPhotos.find()
      .populate([
        {
          path: "user",
          select:
            "username email identityVerificationStatus emailVerified identityVerified userStatus",
        },
      ])
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: "desc" })
      .exec();

    const totalIdentityVerificationRequests =
      await IdentityPhotos.countDocuments();
    const totalPages = Math.ceil(totalIdentityVerificationRequests / limit);

    if (!identityVerificationRequests.length) {
      return res
        .status(400)
        .json({ identityVerificationRequests: [], totalPages: 0 });
    }
    res.status(200).json({ identityVerificationRequests, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getServicePayments: RequestHandler = async (req, res, next) => {
  const admin_id = req.cookies.admin_id;
  const limit = 10;
  const page = parseInt(req.params.page ?? "1") ?? 1;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const allServicePayments = await Reservations.find({
      status: "completed",
    })
      .populate([
        {
          path: "hostID",
          select: "username email emailVerified identityVerified",
        },
        {
          path: "guestID",
          select: "username email emailVerified identityVerified",
        },
        {
          path: "listingID",
          select:
            "serviceTitle serviceType listingAssets cancellationPolicy price bookingStartsAt bookingEndsAt",
        },
      ])
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    if (!allServicePayments.length) {
      return res.status(400).json({ allServicePayments: [], totalPages: 0 });
    }

    const totalIServicePayments = await Reservations.countDocuments();
    const totalPages = Math.ceil(totalIServicePayments / limit);

    res.status(200).json({ allServicePayments, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getReservationPaymentsTransactions: RequestHandler = async (
  req,
  res,
  next
) => {
  const admin_id = req.cookies.admin_id;
  const limit = 10;
  const page = parseInt(req.params.page ?? "1") ?? 1;
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }

    const reservationPaymentsTransactionLog = await Reservations.find({
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
          path: "hostID",
          select: "username",
        },
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
