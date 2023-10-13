import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserPhone,
  getUserProfile,
  getUsers,
  googleSignIn,
  logInUser,
  logOutUser,
  updateUser,
} from "../controllers/usersControllers";
import { verifyUserUpdates } from "../middlewares/verifyUserUpdates";
import { authToken } from "../middlewares/authToken";
import { addListing } from "../controllers/listingsControllers";
const router = Router();

router.get("/users", getUsers);
router.get("/users/profile/:id", authToken, getUserProfile);
router.get("/users/phone/:id", authToken, getUserPhone);
router.post("/users/login", logInUser);
router.post("/users/login/google", googleSignIn);
router.post("/users/register", createUser);
router.post("/users/:id/make-a-listing", authToken, addListing);
router.patch("/users/update/:id", authToken, verifyUserUpdates, updateUser);
router.delete("/users/logout", logOutUser);
router.delete("/users/:id", deleteUser);

export { router as userRoutes };
