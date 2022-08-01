import express from "express";
import { deleteUser, followUser, getUser, unFollowUser, updateUser, dismissNotifications, showNotifications } from "../Controllers/UserController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/:id', protect, getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unFollowUser)

router.get('/showNotifications', showNotifications)
router.put('/:id/dismissNotifications', dismissNotifications)

export default router;