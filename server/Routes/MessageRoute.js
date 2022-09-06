import express from "express";
import {  createMessage,getMessage } from "../Controllers/MessageController.js";

const router = express.Router()


router.post("/",createMessage)
router.get("/:conversationId",getMessage)



export default router