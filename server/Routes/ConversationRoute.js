import express from "express";
import { createConversation,getConversation,getTwoUsersConversation } from "../Controllers/ConversationController.js";

const router = express.Router()


router.post('/', createConversation)
router.get("/:userId", getConversation)
router.get("/find/:firstUserId/:secondUserId",getTwoUsersConversation)


export default router