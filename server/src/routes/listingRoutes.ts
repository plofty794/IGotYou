import { Router } from "express";
import {
  getListings,
  getUserListings,
} from "../controllers/listingsControllers";
import { authToken } from "../middlewares/authToken";
const router = Router();

router.get("/listings/:id", authToken, getUserListings);
router.get("/listings/", authToken, getListings);

export { router as listingRoutes };
