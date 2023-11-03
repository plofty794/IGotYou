import { Router } from "express";
import { getAdmin, loginAdmin } from "../controllers/adminControllers";
const router = Router();

router.get("/admin", getAdmin);
router.post("/admin/login", loginAdmin);

export { router as adminRoutes };
