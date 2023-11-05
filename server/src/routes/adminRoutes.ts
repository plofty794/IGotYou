import { Router } from "express";
import { getActiveUsers, loginAdmin } from "../controllers/adminControllers";
const router = Router();

router.get("/admin/active-users", getActiveUsers);
router.post("/admin/login", loginAdmin);

export { router as adminRoutes };
