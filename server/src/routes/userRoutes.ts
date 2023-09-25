import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserProfile,
  getUsers,
  logInUser,
  logOutUser,
  updateUser,
} from "../controllers/usersControllers";
import { verifyUserUpdates } from "../middlewares/verifyUserUpdates";
import { authToken } from "../middlewares/authToken";
const router = Router();

router.get("/users", getUsers);
router.get("/users/profile/:id", authToken, getUserProfile);
router.post("/users/login", logInUser);
router.post("/users/register", createUser);
router.patch("/users/update/:id", authToken, verifyUserUpdates, updateUser);
router.delete("/users/logout", logOutUser);
router.delete("/users/:id", deleteUser);

export { router as userRoutes };
