import { Router } from "express";
import {
  getPendingPayments,
  getAllPayments,
  sendSubscriptionPayment,
  updateSubscriptionPhotosStatus,
  searchUsernameVerifiedPayment,
  unsubscribeHosting,
} from "../controllers/subscriptionPaymentControllers";
import { authToken } from "../middlewares/authToken";
const router = Router();

router.get("/subscriptions/pending/:page", getPendingPayments);
router.get("/subscriptions/:page", getAllPayments);
router.get(
  "/subscriptions/verified/search/:username",
  searchUsernameVerifiedPayment
);
router.post(
  "/subscriptions/send-subscription-photos",
  authToken,
  sendSubscriptionPayment
);
router.post(
  "/subscriptions/cancel-subscription",
  authToken,
  unsubscribeHosting
);
router.patch(
  "/subscriptions/update-payment-status",
  updateSubscriptionPhotosStatus
);

export { router as subscriptionPaymentRoutes };
