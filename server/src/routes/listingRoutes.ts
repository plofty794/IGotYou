import { Router } from "express";
import {
  addListing,
  getListings,
  getUserListings,
} from "../controllers/listingsControllers";
import { authToken } from "../middlewares/authToken";
const router = Router();

router.get("/listings/:id", authToken, getUserListings);
router.get("/listings/", authToken, getListings);
router.post("/listings/make-a-listing", authToken, addListing);

export { router as listingRoutes };
