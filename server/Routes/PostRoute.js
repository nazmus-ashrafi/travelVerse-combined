import express from "express";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost, getUserPosts, addComment, deleteComment} from "../Controllers/PostController.js";
const router = express.Router()
import { protect } from "../middleware/authMiddleware.js";

import multer from 'multer'


router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete("/:id", deletePost)
router.put("/:id/like", likePost)
router.get("/:id/timeline", getTimelinePosts)
router.get("/:id/posts", getUserPosts)

router.post("/:postid/addcomment", protect, addComment)
router.put("/:commentid/deletecomment", protect, deleteComment)



export default router;