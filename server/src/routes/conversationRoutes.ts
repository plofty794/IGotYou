import { Router } from "express";
import {
  createConversation,
  getCurrentUserConversations,
} from "../controllers/conversationsControllers";
import { authToken } from "../middlewares/authToken";
const router = Router();

router.get(
  "/users/current-user/conversations",
  authToken,
  getCurrentUserConversations
);
router.post(
  "/users/current-user/conversations/create",
  authToken,
  createConversation
);

export { router as conversationRoutes };
