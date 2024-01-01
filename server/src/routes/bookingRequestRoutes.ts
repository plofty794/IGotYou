import { Router } from "express";
import {
  getApprovedBookingRequests,
  getBookingRequests,
  getCancelledBookingRequests,
  getDeclinedBookingRequests,
  getPendingBookingRequests,
  searchBookingRequest,
  sendBookingRequest,
} from "../controllers/bookingRequestsControllers";
import { authToken } from "../middlewares/authToken";
const router = Router();

router.get("/booking-requests", authToken, searchBookingRequest);
router.get("/booking-requests/:page", authToken, getBookingRequests);
router.get(
  "/approved-booking-requests/:page",
  authToken,
  getApprovedBookingRequests
);
router.get(
  "/pending-booking-requests/:page",
  authToken,
  getPendingBookingRequests
);
router.get(
  "/declined-booking-requests/:page",
  authToken,
  getDeclinedBookingRequests
);
router.get(
  "/cancelled-booking-requests/:page",
  authToken,
  getCancelledBookingRequests
);
router.post("/booking-requests/:listingID", authToken, sendBookingRequest);

export { router as bookingRequestRoutes };
