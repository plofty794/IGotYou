import { Router } from "express";
import {
  getCurrentReservation,
  getCurrentReservationDetails,
  getPreviousReservations,
  getReservations,
  getUpcomingReservations,
  sendReservationPaymentToAdmin,
} from "../controllers/reservationControllers";
import { authToken } from "../middlewares/authToken";

const router = Router();

router.get(
  "/reservation-details/:reservationID",
  authToken,
  getCurrentReservationDetails
);
router.get("/reservations/current", authToken, getCurrentReservation);
router.get("/reservations/all/:page", authToken, getReservations);
router.get("/reservations/upcoming/:page", authToken, getUpcomingReservations);
router.get("/reservations/previous/:page", authToken, getPreviousReservations);
router.post(
  "/reservations/send-payment/:reservationID",
  authToken,
  sendReservationPaymentToAdmin
);

export { router as reservationRoutes };
