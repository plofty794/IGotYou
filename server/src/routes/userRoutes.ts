import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  logInUser,
} from "../controllers/usersControllers";
const router = Router();

router.get("/users", getUsers);
router.post("/users/register", createUser);
router.post("/users/login", logInUser);
router.delete("/users/:id", deleteUser);

export { router as userRoutes };
