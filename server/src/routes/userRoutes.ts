import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserProfile,
  getUsers,
  logInUser,
  logOutUser,
} from "../controllers/usersControllers";
const router = Router();

router.get("/users", getUsers);
router.get("/users/profile/:id", getUserProfile);
router.post("/users/login", logInUser);
router.post("/users/register", createUser);
router.delete("/users/logout", logOutUser);
router.delete("/users/:id", deleteUser);

export { router as userRoutes };
