import { Router } from "express";
import {
  createConversation,
  getCurrentUserConversation,
  getCurrentUserConversations,
} from "../controllers/conversationsControllers";
import { authToken } from "../middlewares/authToken";
const router = Router();

router.get(
  "/users/current-user/conversations",
  authToken,
  getCurrentUserConversations
);
router.get(
  "/users/current-user/conversations/:conversationId",
  authToken,
  getCurrentUserConversation
);
router.post(
  "/users/current-user/conversations/create",
  authToken,
  createConversation
);

export { router as conversationRoutes };
