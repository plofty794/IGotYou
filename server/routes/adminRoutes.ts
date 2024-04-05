import { Router } from "express";
import {
  getAdminInfo,
  getActiveUsers,
  loginAdmin,
  getUsers,
  getAdminOverview,
  adminLogOut,
  getUserReports,
  disableUser,
  enableUser,
  getCancelledReservations,
  getIdentityVerificationRequests,
  getServicePayments,
} from "../controllers/adminControllers";
const router = Router();

router.get("/admin", getAdminInfo);
router.get("/admin/overview", getAdminOverview);
router.get("/admin/active-users/:page", getActiveUsers);
router.get("/admin/users/:page", getUsers);
router.get("/admin/users-reports/:page", getUserReports);
router.get(
  "/admin/users-identity-verifications/:page",
  getIdentityVerificationRequests
);
router.get("/admin/service-payments/:page", getServicePayments);
router.get("/admin/refunds/:page", getCancelledReservations);
router.post("/admin/login", loginAdmin);
router.patch("/admin/disable-user/:userUID", disableUser);
router.patch("/admin/enable-user/:userUID", enableUser);
router.delete("/admin/logout", adminLogOut);

export { router as adminRoutes };
