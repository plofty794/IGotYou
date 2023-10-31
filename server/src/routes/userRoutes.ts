import { Router } from "express";
const router = Router();
import {
  createUser,
  deleteUser,
  getCurrentUserProfile,
  getUserPhone,
  getUsers,
  googleSignIn,
  logInUser,
  logOutUser,
  updateUser,
  visitUserProfile,
  userSubscription,
  checkUserEmail,
} from "../controllers/usersControllers";
import { verifyUserUpdates } from "../middlewares/verifyUserUpdates";
import { authToken } from "../middlewares/authToken";

router.get("/users", getUsers);
router.get("/users/current-user/profile", authToken, getCurrentUserProfile);
router.get("/users/profile/visit/:id", visitUserProfile);
router.get("/users/current-user/phone", getUserPhone);
router.post("/users/email-check", authToken, checkUserEmail);
router.post("/users/subscription", authToken, userSubscription);
router.post("/users/login", logInUser);
router.post("/users/login/google", googleSignIn);
router.post("/users/register", createUser);
router.patch("/users/current-user/update", verifyUserUpdates, updateUser);
router.delete("/users/current-user/logout", logOutUser);
router.delete("/users/:id", deleteUser);

export { router as userRoutes };
