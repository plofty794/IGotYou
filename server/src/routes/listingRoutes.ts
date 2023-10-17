import { Router } from "express";
import {
  getListings,
  getUserListings,
} from "../controllers/listingsControllers";
const router = Router();

router.get("/listings/:id", getUserListings);
router.get("/listings/", getListings);

export { router as listingRoutes };
