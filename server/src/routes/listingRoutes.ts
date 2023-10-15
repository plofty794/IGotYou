import { Router } from "express";
import { getListings } from "../controllers/listingsControllers";
const router = Router();

router.get("/listings/:id", getListings);

export { router as listingRoutes };
