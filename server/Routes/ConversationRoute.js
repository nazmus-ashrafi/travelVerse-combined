import express from "express";
import { createConversation,getConversation,getTwoUsersConversation,deleteConversation } from "../Controllers/ConversationController.js";

const router = express.Router()


router.post('/', createConversation)
router.get("/:userId", getConversation)
router.get("/find/:firstUserId/:secondUserId",getTwoUsersConversation)
router.delete("/:conversationId",deleteConversation)


export default router