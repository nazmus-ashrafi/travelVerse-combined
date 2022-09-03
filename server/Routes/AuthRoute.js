
import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword } from "../Controllers/AuthController.js";

const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgotpassword', forgotPassword ) // verify email and send reset link
router.post('/reset', resetPassword) // reset password


export default router