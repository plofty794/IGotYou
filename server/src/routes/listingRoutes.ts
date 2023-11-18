import { Router } from "express";
import {
  addListing,
  getListings,
  getUserListing,
} from "../controllers/listingsControllers";
import { authToken } from "../middlewares/authToken";
const router = Router();

router.get("/listings/:id", authToken, getUserListing);
router.get("/listings/", authToken, getListings);
router.post("/listings/make-a-listing", authToken, addListing);

export { router as listingRoutes };
