import { Router } from "express";
import { createUser, getUsers } from "../controllers/usersControllers";
const router = Router();

router.get("/users", getUsers);
router.post("/users/create", createUser);

export { router as userRoutes };
