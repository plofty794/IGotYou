import { Router } from "express";
import {
  getPaymentProofs,
  sendPaymentProof,
  updatePaymentProofStatus,
} from "../controllers/paymentControllers";
import { authToken } from "../middlewares/authToken";
const router = Router();

router.get("/payments/:page", getPaymentProofs);
router.post("/payments/send-payment-proof", authToken, sendPaymentProof);
router.patch("/payments/update-payment-proof", updatePaymentProofStatus);

export { router as paymentRoutes };
