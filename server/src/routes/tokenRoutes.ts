import { Router } from "express";
import { verifyToken } from "../controllers/tokenControllers";
const router = Router();

router.post("/verify", verifyToken);

export { router as tokenRoutes };
